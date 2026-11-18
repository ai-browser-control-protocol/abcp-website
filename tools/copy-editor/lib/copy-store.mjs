/**
 * Copy store — reads the site's real copy sources and writes single string
 * literals back in place.
 *
 * Two kinds of source are supported:
 *   - messages catalogs (`src/messages/<locale>.json`), one locale per file;
 *   - content modules (`src/content/*.ts`) that expose `const zh` / `const en`
 *     object literals (`solutions.ts` and `legal.ts` fall back ja/ko to en).
 *
 * Parsing uses the TypeScript AST, so formatting, comments, line endings and
 * every non-edited character stay byte-identical. Only whitelisted files are
 * ever written, and every write drops a timestamped backup first.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { gitDiff } from "./git.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(HERE, "..", "..", "..");
const BACKUP_ROOT = path.join(REPO, "artifacts", "copy-editor-backups");

/** Whitelisted copy sources. `order` drives the file list in the UI. */
export const FILES = [
  {
    id: "messages-zh",
    kind: "json",
    label: "界面文案 · 简体中文",
    path: "src/messages/zh.json",
    locales: ["zh"],
  },
  {
    id: "messages-en",
    kind: "json",
    label: "界面文案 · English",
    path: "src/messages/en.json",
    locales: ["en"],
  },
  {
    id: "messages-ja",
    kind: "json",
    label: "界面文案 · 日本語",
    path: "src/messages/ja.json",
    locales: ["ja"],
  },
  {
    id: "messages-ko",
    kind: "json",
    label: "界面文案 · 한국어",
    path: "src/messages/ko.json",
    locales: ["ko"],
  },
  {
    id: "content-home",
    kind: "ts",
    label: "首页文案",
    path: "src/content/home.ts",
    locales: ["zh", "en"],
    fallbacks: {},
  },
  {
    id: "content-solutions",
    kind: "ts",
    label: "解决方案页文案",
    path: "src/content/solutions.ts",
    locales: ["zh", "en"],
    fallbacks: { ja: "en", ko: "en" },
  },
  {
    id: "content-legal",
    kind: "ts",
    label: "隐私政策 / 用户协议",
    path: "src/content/legal.ts",
    locales: ["zh", "en"],
    fallbacks: { ja: "en", ko: "en" },
  },
];

export const TYPES = {
  "src/styles/tokens.css": "type scale (read-only here, written by type-scale.mjs)",
};

const GROUP_LABELS = {
  messages: {
    brand: "品牌",
    nav: "顶部导航",
    locales: "语言切换",
    seo: "SEO 元信息",
    product: "产品页",
    guide: "使用指南页",
    download: "下载页",
    footer: "页脚",
    a11y: "无障碍文本",
  },
  "content-home": {
    navHow: "导航",
    common: "通用按钮与标签",
    hero: "首屏 Hero",
    workflow: "工作流演示",
    background: "账号隔离",
    cases: "业务场景",
    environment: "运行环境",
    marketplace: "Skill 市场",
    comparison: "方案对比",
    faq: "FAQ",
    closing: "结尾 CTA",
    tech: "技术原理",
  },
  "content-solutions": {
    seo: "SEO 元信息",
    hero: "首屏 Hero",
    isolation: "环境隔离",
    fingerprint: "指纹与 IP",
    engine: "引擎直驱",
    semantic: "语义树 / Token",
    fleet: "集群管理",
    evidence: "行动证据",
    script: "脚本复用",
    closing: "结尾 CTA",
  },
  "content-legal": {
    privacy: "隐私政策",
    agreement: "用户协议",
  },
};

const SECTION_LABELS = {
  messages: {
    "product.demo": "产品演示",
    "product.features": "功能列表",
    "product.comparison": "方案对比",
    "product.faq": "FAQ",
    "product.closing": "结尾 CTA",
    "product.assurances": "保障说明",
    "guide.steps": "三步接入",
    "guide.tips": "使用技巧",
    "guide.faq": "FAQ",
    "guide.mockup": "客户端界面",
    "download.panel": "下载面板",
    "seo.product": "产品页 SEO",
    "seo.guide": "指南页 SEO",
    "seo.download": "下载页 SEO",
  },
};

function fileMeta(id) {
  const meta = FILES.find((item) => item.id === id);
  if (!meta) throw new EditorError(`未知的文案文件：${id}`);
  return meta;
}

export class EditorError extends Error {}

function unwrap(node) {
  let current = node;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isTypeAssertionExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function keyOfName(nameNode, sf) {
  if (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode) || ts.isNumericLiteral(nameNode)) {
    return nameNode.text;
  }
  return nameNode.getText(sf).replace(/^["']|["']$/g, "");
}

function parseSource(text, meta) {
  if (meta.kind === "json") {
    const sf = ts.parseJsonText(meta.path, text);
    const root = sf.statements[0]?.expression;
    if (!root || !ts.isObjectLiteralExpression(root)) {
      throw new EditorError(`${meta.path} 不是一个 JSON 对象`);
    }
    return { sf, root, roots: { [meta.locales[0]]: root } };
  }
  const sf = ts.createSourceFile(meta.path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const roots = {};
  for (const statement of sf.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
      const name = declaration.name.text;
      if (!/^(zh|en|ja|ko)$/.test(name)) continue;
      const init = unwrap(declaration.initializer);
      if (ts.isObjectLiteralExpression(init)) roots[name] = init;
    }
  }
  return { sf, root: null, roots };
}

function humanPath(parts) {
  let out = "";
  for (const part of parts) {
    if (/^\d+$/.test(part)) out += `[${part}]`;
    else out += out ? `.${part}` : part;
  }
  return out;
}

function collect(root, sf) {
  const fields = [];
  function visit(node, parts) {
    node = unwrap(node);
    if (ts.isStringLiteral(node)) {
      fields.push({ parts, node, value: node.text });
      return;
    }
    if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (!property.name) continue;
        visit(property.initializer, [...parts, keyOfName(property.name, sf)]);
      }
      return;
    }
    if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((element, index) => visit(element, [...parts, String(index)]));
    }
  }
  visit(root, []);
  return fields;
}

function groupsFor(meta, locale, rawFields, sf) {
  const groupLabels = GROUP_LABELS[meta.kind === "json" ? "messages" : meta.id] || {};
  const sectionLabels = meta.kind === "json" ? SECTION_LABELS.messages : {};
  const groups = new Map();
  for (const field of rawFields) {
    const groupKey = field.parts[0] ?? "(root)";
    const sectionKey = field.parts[1] ?? "";
    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        id: groupKey,
        label: groupLabels[groupKey] || groupKey,
        fields: [],
      });
    }
    const start = field.node.getStart(sf);
    const value = field.value;
    groups.get(groupKey).fields.push({
      path: field.parts.join("."),
      label: humanPath(field.parts),
      section: sectionKey || null,
      sectionLabel: sectionLabels[`${groupKey}.${sectionKey}`] || null,
      line: sf.getLineAndCharacterOfPosition(start).line + 1,
      value,
      multiline: value.includes("\n") || value.length > 120,
    });
  }
  return [...groups.values()];
}

/**
 * Extract editable fields for one file + locale.
 * @returns {{ meta, locale, fallbackFrom: string|null, groups, total }}
 */
export function readCopy(id, locale) {
  const meta = fileMeta(id);
  const abs = path.join(REPO, meta.path);
  const text = fs.readFileSync(abs, "utf8");
  const { sf, roots } = parseSource(text, meta);
  let requested = locale || meta.locales[0];
  let fallbackFrom = null;
  if (meta.kind === "ts" && !roots[requested]) {
    const fallback = meta.fallbacks?.[requested];
    if (!fallback || !roots[fallback]) {
      throw new EditorError(`${meta.path} 中没有 ${requested} 文案`);
    }
    fallbackFrom = requested;
    requested = fallback;
  }
  const root = roots[requested];
  const fields = collect(root, sf);
  const groups = groupsFor(meta, requested, fields, sf);
  return {
    file: meta.id,
    kind: meta.kind,
    locale: requested,
    fallbackFrom,
    path: meta.path,
    groups,
    total: fields.length,
  };
}

function backup(absPath, text) {
  const rel = path.relative(REPO, absPath);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dir = path.join(BACKUP_ROOT, stamp, path.dirname(rel));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, path.basename(absPath)), text, "utf8");
  pruneBackups();
}

function pruneBackups(keep = 30) {
  try {
    const entries = fs
      .readdirSync(BACKUP_ROOT, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    for (const name of entries.slice(0, Math.max(0, entries.length - keep))) {
      fs.rmSync(path.join(BACKUP_ROOT, name), { recursive: true, force: true });
    }
  } catch {
    /* best effort */
  }
}

/**
 * Write changed string literals. Only edited nodes are replaced; the rest of
 * the file (formatting, comments, EOLs) is untouched.
 */
export function saveCopy(id, locale, changes) {
  const meta = fileMeta(id);
  if (!Array.isArray(changes) || changes.length === 0) {
    throw new EditorError("没有需要保存的修改");
  }
  const abs = path.join(REPO, meta.path);
  const text = fs.readFileSync(abs, "utf8");
  const { sf, roots } = parseSource(text, meta);
  let requested = locale || meta.locales[0];
  if (meta.kind === "ts" && !roots[requested]) {
    const fallback = meta.fallbacks?.[requested];
    if (!fallback) throw new EditorError(`无法写入 ${requested} 文案（该语言继承自 ${JSON.stringify(meta.fallbacks)}）`);
    requested = fallback;
  }
  const fields = collect(roots[requested], sf);
  const byPath = new Map(fields.map((field) => [field.parts.join("."), field]));
  const replacements = [];
  const changed = [];
  for (const change of changes) {
    const field = byPath.get(change.path);
    if (!field) throw new EditorError(`找不到文案路径：${change.path}`);
    const value = typeof change.value === "string" ? change.value : String(change.value ?? "");
    if (value === field.value) continue;
    replacements.push({ start: field.node.getStart(sf), end: field.node.getEnd(), value });
    changed.push(change.path);
  }
  if (replacements.length === 0) {
    return { ok: true, saved: 0, path: meta.path, changed: [], diff: "" };
  }
  backup(abs, text);
  replacements.sort((a, b) => b.start - a.start);
  let next = text;
  for (const replacement of replacements) {
    next = next.slice(0, replacement.start) + JSON.stringify(replacement.value) + next.slice(replacement.end);
  }
  fs.writeFileSync(abs, next, "utf8");
  return {
    ok: true,
    saved: replacements.length,
    path: meta.path,
    changed,
    diff: gitDiff(meta.path),
  };
}

/** File metadata for /api/state, without node internals. */
export function publicFiles() {
  return FILES.map((meta) => ({
    id: meta.id,
    kind: meta.kind,
    label: meta.label,
    path: meta.path,
    locales: meta.locales,
    fallbacks: meta.fallbacks || {},
  }));
}

export function filePath(idOrPath) {
  const meta = FILES.find((item) => item.id === idOrPath || item.path === idOrPath);
  if (!meta) throw new EditorError(`未知的文件：${idOrPath}`);
  return meta.path;
}
