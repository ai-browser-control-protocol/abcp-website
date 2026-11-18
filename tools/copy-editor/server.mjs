/**
 * Copy editor — a tiny local server for editing the site's copy and type scale.
 *
 *   node tools/copy-editor/server.mjs [--port 4310] [--no-site] [--open]
 *
 * It serves the UI in ./ui, exposes a JSON API (see API.md), and writes the
 * real source files. Only 127.0.0.1 is bound: this is a local authoring tool,
 * never something to deploy.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { gitDiff, gitRevert, gitStatus } from "./lib/git.mjs";
import { EditorError, REPO, filePath, publicFiles, readCopy, saveCopy } from "./lib/copy-store.mjs";
import {
  OVERRIDES_PATH,
  TOKENS_PATH,
  TypeScaleError,
  readOverrides,
  readTypeScale,
  saveOverrides,
  saveTypeScale,
} from "./lib/type-scale.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const UI_DIR = path.join(HERE, "ui");

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const option = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
};

let EDITOR_PORT = Number(option("port", process.env.EDITOR_PORT || 4310));
const SITE_PORT = Number(option("site-port", process.env.SITE_PORT || 3000));
const NO_SITE = flag("no-site");

const startedAt = Date.now();
let siteCheckedAt = 0;
let siteReachable = false;
/** Where the preview actually points; may settle on an already-running dev server. */
let previewBase = `http://localhost:${SITE_PORT}`;
/** Ports worth probing when the configured one does not answer (Next only runs one dev server per repo). */
const FALLBACK_SITE_PORTS = [3000, SITE_PORT];

async function probe(port) {
  try {
    const response = await fetch(`http://localhost:${port}/zh`, { signal: AbortSignal.timeout(2500) });
    return response.status < 500 ? `http://localhost:${port}` : null;
  } catch {
    return null;
  }
}

async function checkSite() {
  const now = Date.now();
  if (now - siteCheckedAt < 4000) return siteReachable;
  siteCheckedAt = now;
  const direct = await probe(Number(previewBase.split(":").pop()));
  if (direct) {
    previewBase = direct;
    siteReachable = true;
    return true;
  }
  for (const port of FALLBACK_SITE_PORTS) {
    const found = await probe(port);
    if (found) {
      if (found !== previewBase) {
        console.log(`[copy-editor] 配置的站点端口没有响应，改用已在运行的 ${found}`);
        previewBase = found;
      }
      siteReachable = true;
      return true;
    }
  }
  siteReachable = false;
  return false;
}

function startSite() {
  if (NO_SITE || process.env.COPY_EDITOR_NO_SITE === "1") return;
  const logFile = path.join(REPO, "artifacts", "copy-editor-site.log");
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
  const out = fs.openSync(logFile, "a");
  fs.writeSync(out, `\n[copy-editor] starting next dev on :${SITE_PORT} at ${new Date().toISOString()}\n`);
  const command = process.platform === "win32" ? "node_modules\\.bin\\next.cmd" : "node_modules/.bin/next";
  const child = spawn(process.platform === "win32" ? "cmd.exe" : command, process.platform === "win32" ? ["/c", `${command} dev --port ${SITE_PORT}`] : ["dev", "--port", String(SITE_PORT)], {
    cwd: REPO,
    stdio: ["ignore", out, out],
    windowsHide: true,
  });
  child.unref();
  console.log(`[copy-editor] local site was down, starting \`next dev --port ${SITE_PORT}\` (log: artifacts/copy-editor-site.log)`);
}

async function ensureSite() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await checkSite()) return true;
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  return false;
}

function resolveWritable(idOrPath) {
  if (idOrPath === TOKENS_PATH || idOrPath === OVERRIDES_PATH) return idOrPath;
  if (typeof idOrPath !== "string" || !idOrPath) throw new EditorError("缺少文件参数");
  return filePath(idOrPath);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function sendJson(response, status, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
  });
  response.end(body);
  return true;
}

function sendText(response, status, text, type = "text/plain; charset=utf-8") {
  response.writeHead(status, { "content-type": type, "cache-control": "no-store" });
  response.end(text);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 25 * 1024 * 1024) {
        reject(new EditorError("请求体过大"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new EditorError("请求体不是合法 JSON"));
      }
    });
    request.on("error", reject);
  });
}

async function serveStatic(request, response, pathname) {
  const relative = pathname === "/" || pathname === "" ? "index.html" : pathname.replace(/^\//, "");
  const file = path.resolve(UI_DIR, relative);
  if (!file.startsWith(UI_DIR)) {
    sendText(response, 403, "forbidden");
    return true;
  }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return false;
  const type = MIME[path.extname(file)] || "application/octet-stream";
  sendText(response, 200, fs.readFileSync(file, "utf8"), type);
  return true;
}

async function handleApi(request, response, url) {
  const route = `${request.method} ${url.pathname}`;

  if (route === "GET /api/state") {
    const reachable = await checkSite();
    return sendJson(response, 200, {
      repo: REPO,
      previewBase,
      siteReachable: reachable,
      uptimeMs: Date.now() - startedAt,
      git: gitStatus(),
      files: publicFiles(),
      typeScalePath: TOKENS_PATH,
      overridesPath: OVERRIDES_PATH,
    });
  }

  if (route === "GET /api/copy") {
    const file = url.searchParams.get("file");
    const locale = url.searchParams.get("locale") || undefined;
    return sendJson(response, 200, readCopy(file, locale));
  }

  if (route === "POST /api/copy/save") {
    const body = await readBody(request);
    return sendJson(response, 200, saveCopy(body.file, body.locale, body.changes));
  }

  if (route === "GET /api/type-scale") {
    return sendJson(response, 200, readTypeScale());
  }

  if (route === "POST /api/type-scale/save") {
    const body = await readBody(request);
    return sendJson(response, 200, saveTypeScale(body.changes));
  }

  if (route === "GET /api/overrides") {
    return sendJson(response, 200, readOverrides());
  }

  if (route === "POST /api/overrides/save") {
    const body = await readBody(request);
    return sendJson(response, 200, saveOverrides(body.text));
  }

  if (route === "GET /api/diff") {
    const target = resolveWritable(url.searchParams.get("file"));
    return sendJson(response, 200, { path: target, diff: gitDiff(target) });
  }

  if (route === "GET /api/health") {
    return sendJson(response, 200, { ok: true, port: EDITOR_PORT });
  }

  if (route === "POST /api/revert") {
    const body = await readBody(request);
    const target = resolveWritable(body.file);
    gitRevert(target);
    return sendJson(response, 200, { ok: true, path: target });
  }

  return null;
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://127.0.0.1:${EDITOR_PORT}`);
  try {
    if (url.pathname.startsWith("/api/")) {
      const handled = await handleApi(request, response, url);
      if (!handled) sendJson(response, 404, { ok: false, error: `未知接口：${request.method} ${url.pathname}` });
      return;
    }
    const served = await serveStatic(request, response, url.pathname);
    if (!served) {
      if (url.pathname === "/favicon.ico") {
        response.writeHead(204);
        response.end();
        return;
      }
      sendText(response, 404, "not found");
    }
  } catch (error) {
    const status = error instanceof EditorError || error instanceof TypeScaleError ? 400 : 500;
    if (status === 500) console.error("[copy-editor]", error);
    if (!response.headersSent) sendJson(response, status, { ok: false, error: error.message || String(error) });
    else response.destroy();
  }
});

function listen(port) {
  return new Promise((resolve, reject) => {
    const onError = (error) => {
      server.off("listening", onListening);
      reject(error);
    };
    const onListening = () => {
      server.off("error", onError);
      resolve(port);
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(port, "127.0.0.1");
  });
}

function openBrowser(target) {
  const command =
    process.platform === "win32"
      ? ["cmd.exe", ["/c", "start", "", target]]
      : process.platform === "darwin"
        ? ["open", [target]]
        : ["xdg-open", [target]];
  try {
    const child = spawn(command[0], command[1], { detached: true, stdio: "ignore", windowsHide: true });
    child.unref();
  } catch {
    /* opening the browser is best effort */
  }
}

async function main() {
  if (flag("help")) {
    console.log(`文案修改器\n\n  node tools/copy-editor/server.mjs [--port 4310] [--no-site] [--open]\n\n  --port     编辑器端口（默认 4310）\n  --site-port 本地站点端口（默认 3000）\n  --no-site  不自动启动本地站点\n  --open     启动后打开浏览器`);
    return;
  }

  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      await listen(EDITOR_PORT);
      break;
    } catch (error) {
      if (error.code !== "EADDRINUSE") throw error;
      EDITOR_PORT += 1;
      if (attempt === 5) throw new EditorError("端口 4310-4315 都被占用，请用 --port 指定其他端口");
    }
  }

  const url = `http://localhost:${EDITOR_PORT}`;
  console.log("");
  console.log("  文案修改器");
  console.log(`  UI      ${url}`);
  console.log(`  站点    ${(await checkSite()) ? previewBase : `${previewBase} (未运行)`}`);
  console.log(`  仓库    ${REPO}`);
  console.log("  保存会直接写入源码文件（写前自动备份到 artifacts/copy-editor-backups/）");
  console.log("");

  if (flag("open")) openBrowser(url);
  if (!NO_SITE) {
    checkSite().then(async (reachable) => {
      if (reachable) return;
      startSite();
      await ensureSite();
      siteCheckedAt = 0;
      console.log(`[copy-editor] local site ${(await checkSite()) ? "is up" : "did not start in time, open it manually"}: ${previewBase}`);
    });
  }
}

main().catch((error) => {
  console.error("[copy-editor]", error.message || error);
  process.exit(1);
});
