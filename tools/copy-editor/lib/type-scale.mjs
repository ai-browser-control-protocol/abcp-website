/**
 * Type scale + style overrides.
 *
 * `src/styles/tokens.css` holds the site's shared ladder; the editor exposes a
 * curated whitelist as sliders. Everything else the user wants to resize goes
 * into `src/styles/editor-overrides.css`, which is imported last so it wins.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gitDiff } from "./git.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(HERE, "..", "..", "..");
export const TOKENS_PATH = "src/styles/tokens.css";
export const OVERRIDES_PATH = "src/styles/editor-overrides.css";

const OVERRIDES_TEMPLATE = `/* ==========================================================================
   Editor overrides — written by tools/copy-editor.
   Imported after every other stylesheet (src/app/[locale]/layout.tsx), so any
   selector here wins.

   Common selectors for font-size tweaks:
     .hero-copy h1                        首页首屏主标题
     .hero-copy > p:not(.hero-footnote)   首页首屏副标题
     .home-section-heading h2             首页各区块标题
     .home-section-heading p              首页各区块导语
     .home-faq-list details summary       FAQ 问题
     .home-faq-list details p             FAQ 答案
     .user-nav-item-btn                   指南页客户端界面里的文字
     .guide-section-heading h2            指南页区块标题
     .sol-hero-title                      解决方案页主标题
     .sol-hero-lead                       解决方案页导语
     .sol-heading                         解决方案页区块标题
     .site-closing h2                     结尾 CTA 标题

   Examples:

   .home-section-heading h2 { font-size: 42px; }
   .hero-copy h1 { font-size: clamp(38px, 4.8vw, 68px); }
   .user-nav-item-btn { font-size: 13px; }
   ========================================================================== */
`;

/** name → { group, label, kind hint, min, max, step } */
const SCALE = [
  { group: "size", name: "--fs-hero", label: "Hero 主标题", min: 20, max: 92 },
  { group: "size", name: "--fs-hero-lead", label: "Hero 副标题", min: 12, max: 26 },
  { group: "size", name: "--fs-closing", label: "结尾 CTA 标题", min: 18, max: 60 },
  { group: "size", name: "--fs-h2", label: "章节标题（H2）", min: 20, max: 56 },
  { group: "size", name: "--fs-h3", label: "小标题（H3）", min: 12, max: 32 },
  { group: "size", name: "--fs-lead", label: "导语 / 正文强调", min: 12, max: 26 },
  { group: "size", name: "--fs-body", label: "正文", min: 11, max: 22 },
  { group: "size", name: "--fs-small", label: "小字", min: 10, max: 20 },
  { group: "size", name: "--fs-note", label: "注释 / 脚注", min: 9, max: 18 },
  { group: "size", name: "--fs-eyebrow", label: "标签字（eyebrow）", min: 8, max: 16 },
  { group: "line", name: "--lh-hero", label: "Hero 行高", min: 0.9, max: 2, step: 0.01 },
  { group: "line", name: "--lh-h2", label: "H2 行高", min: 0.9, max: 2, step: 0.01 },
  { group: "line", name: "--lh-lead", label: "导语行高", min: 1, max: 2.4, step: 0.01 },
  { group: "line", name: "--lh-body", label: "正文行高", min: 1, max: 2.4, step: 0.01 },
  { group: "weight", name: "--fw-hero", label: "Hero 字重", min: 400, max: 900, step: 10 },
  { group: "weight", name: "--fw-h2", label: "H2 字重", min: 400, max: 900, step: 10 },
  { group: "weight", name: "--fw-h3", label: "H3 字重", min: 400, max: 900, step: 10 },
];

const GROUP_LABELS = { size: "字号阶梯", line: "行高", weight: "字重" };

export class TypeScaleError extends Error {}

function abs(rel) {
  return path.join(REPO, rel);
}

/** Locate every `--name: value;` declaration in tokens.css with exact offsets. */
function scanTokens(text) {
  const map = new Map();
  const pattern = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const name = match[1];
    const valueStart = match.index + match[0].indexOf(match[2], name.length);
    const valueEnd = valueStart + match[2].length;
    map.set(name, { raw: match[2].trim(), valueStart, valueEnd });
  }
  return map;
}

function describe(name, entry, index) {
  const spec = SCALE.find((item) => item.name === name) || {};
  const raw = entry.raw;
  const clamp = raw.match(/^clamp\(\s*([\d.]+)(px)\s*,\s*([\d.]+)(vw)\s*,\s*([\d.]+)(px)\s*\)$/);
  if (clamp) {
    return {
      name,
      label: spec.label || name,
      kind: "clamp",
      raw,
      parts: { min: Number(clamp[1]), preferred: Number(clamp[3]), max: Number(clamp[5]) },
      unit: "px",
      line: index,
      bounds: { min: spec.min ?? 10, max: spec.max ?? 96 },
    };
  }
  const length = raw.match(/^([\d.]+)([a-z%]+)$/);
  if (length) {
    return {
      name,
      label: spec.label || name,
      kind: "length",
      raw,
      parts: { value: Number(length[1]) },
      unit: length[2],
      line: index,
      bounds: { min: spec.min ?? 8, max: spec.max ?? 96 },
    };
  }
  const number = raw.match(/^([\d.]+)$/);
  if (number) {
    return {
      name,
      label: spec.label || name,
      kind: "number",
      raw,
      parts: { value: Number(number[1]) },
      line: index,
      bounds: { min: spec.min ?? 0, max: spec.max ?? 1000, step: spec.step ?? 1 },
    };
  }
  return { name, label: spec.label || name, kind: "raw", raw, parts: null, line: index, bounds: {} };
}

function lineOf(text, offset) {
  return text.slice(0, offset).split(/\r?\n/).length;
}

export function readTypeScale() {
  const text = fs.readFileSync(abs(TOKENS_PATH), "utf8");
  const tokens = scanTokens(text);
  const groups = [];
  for (const group of ["size", "line", "weight"]) {
    const entries = [];
    for (const spec of SCALE) {
      if (spec.group !== group) continue;
      const entry = tokens.get(spec.name);
      if (!entry) continue;
      entries.push(describe(spec.name, entry, lineOf(text, entry.valueStart)));
    }
    groups.push({ id: group, label: GROUP_LABELS[group], tokens: entries });
  }
  const overridesFile = abs(OVERRIDES_PATH);
  const overrides = fs.existsSync(overridesFile) ? fs.readFileSync(overridesFile, "utf8") : OVERRIDES_TEMPLATE;
  return {
    path: TOKENS_PATH,
    groups,
    overrides: { path: OVERRIDES_PATH, text: overrides },
  };
}

function assertRaw(name, raw) {
  if (typeof raw !== "string" || !raw.trim()) throw new TypeScaleError(`${name} 的值不能为空`);
  if (/[;\r\n{}]/.test(raw)) throw new TypeScaleError(`${name} 的值含有非法字符`);
  if (raw.length > 160) throw new TypeScaleError(`${name} 的值过长`);
  const spec = SCALE.find((item) => item.name === name);
  if (!spec) throw new TypeScaleError(`不允许修改 ${name}`);
  return raw.trim();
}

/** Write the supplied token values back into tokens.css. */
export function saveTypeScale(changes) {
  if (!Array.isArray(changes) || changes.length === 0) throw new TypeScaleError("没有需要保存的字号修改");
  const text = fs.readFileSync(abs(TOKENS_PATH), "utf8");
  const tokens = scanTokens(text);
  const replacements = [];
  for (const change of changes) {
    const entry = tokens.get(change.name);
    if (!entry) throw new TypeScaleError(`tokens.css 中找不到 ${change.name}`);
    const raw = assertRaw(change.name, change.raw);
    if (raw === entry.raw) continue;
    replacements.push({ start: entry.valueStart, end: entry.valueEnd, raw });
  }
  if (replacements.length === 0) return { ok: true, saved: 0, path: TOKENS_PATH, diff: "" };
  replacements.sort((a, b) => b.start - a.start);
  let next = text;
  for (const replacement of replacements) {
    next = next.slice(0, replacement.start) + replacement.raw + next.slice(replacement.end);
  }
  fs.writeFileSync(abs(TOKENS_PATH), next, "utf8");
  return { ok: true, saved: replacements.length, path: TOKENS_PATH, diff: gitDiff(TOKENS_PATH) };
}

export function readOverrides() {
  const file = abs(OVERRIDES_PATH);
  return { path: OVERRIDES_PATH, text: fs.existsSync(file) ? fs.readFileSync(file, "utf8") : OVERRIDES_TEMPLATE };
}

export function saveOverrides(text) {
  if (typeof text !== "string") throw new TypeScaleError("覆盖样式必须是字符串");
  if (text.length > 40000) throw new TypeScaleError("覆盖样式过长（上限 40KB）");
  const file = abs(OVERRIDES_PATH);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const next = text.endsWith("\n") ? text : `${text}\n`;
  fs.writeFileSync(file, next, "utf8");
  return { ok: true, path: OVERRIDES_PATH, bytes: Buffer.byteLength(next, "utf8"), diff: gitDiff(OVERRIDES_PATH) };
}
