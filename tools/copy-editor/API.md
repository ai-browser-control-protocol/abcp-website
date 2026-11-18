# Copy Editor — API contract

Local-only tool. One Node process serves the UI and a small JSON API, then writes the
site's real source files (no database, no overlay). The Lead owns `server.mjs` + `lib/`.
The UI lives entirely in `tools/copy-editor/ui/`.

Base URL: `http://localhost:4310` (configurable with `--port`).
All endpoints return JSON. Errors use HTTP 400/404/500 with `{ "ok": false, "error": "<message>" }`.
Requests are `Content-Type: application/json`.

---

## GET /api/state

```json
{
  "repo": "C:\\Users\\69537\\Desktop\\abcp-website",
  "previewBase": "http://localhost:3000",
  "siteReachable": true,
  "git": { "branch": "master", "dirty": true },
  "typeScalePath": "src/styles/tokens.css",
  "overridesPath": "src/styles/editor-overrides.css",
  "files": [
    { "id": "messages-zh", "kind": "json", "label": "界面文案 · 简体中文",
      "path": "src/messages/zh.json", "locales": ["zh"], "fallbacks": {} },
    { "id": "content-home", "kind": "ts", "label": "首页文案",
      "path": "src/content/home.ts", "locales": ["zh", "en"], "fallbacks": {} },
    { "id": "content-solutions", "kind": "ts", "label": "解决方案页文案",
      "path": "src/content/solutions.ts", "locales": ["zh", "en"],
      "fallbacks": { "ja": "en", "ko": "en" } }
  ]
}
```

`kind`: `"json"` (locale catalog, one locale per file) or `"ts"` (content module with a
`zh` and an `en` object). `fallbacks` explains locales that reuse another locale's copy.

## GET /api/copy?file=<id>&locale=<zh|en|ja|ko>

`locale` is required for `ts` files, ignored for `json` files (their locale is in the file).

```json
{
  "file": "content-home",
  "kind": "ts",
  "locale": "zh",
  "path": "src/content/home.ts",
  "fallbackFrom": null,
  "total": 84,
  "groups": [
    {
      "id": "hero",
      "label": "首屏 Hero",
      "fields": [
        {
          "path": "hero.title",
          "label": "title",
          "section": "hero",
          "line": 239,
          "value": "把重复工作交给 WebCross，",
          "multiline": false
        }
      ]
    }
  ]
}
```

- `path` is a dotted path with numeric indices for arrays: `faq.items.3.q`,
  `cases.items[0].rows[2].value` (indices always dotted: `cases.items.0.rows.2.value`).
- `group.label` is Chinese when known, otherwise the raw key.
- `field.section` is the second path segment (or `null`), used for sub-grouping long
  groups.
- `field.label` is the last segment prettified (`items.3.q` → `items[3] › q`).
- `fallbackFrom` is `"en"` when the requested locale reuses English copy; the UI should
  show a notice and open the `en` copy of that file instead.
- Values are plain strings (may contain markdown, e.g. `**粗体**`, or `\n` inside).

## POST /api/copy/save

```json
{ "file": "content-home", "locale": "zh",
  "changes": [ { "path": "hero.title", "value": "新的标题" } ] }
```

```json
{ "ok": true, "saved": 1, "path": "src/content/home.ts",
  "changed": ["hero.title"],
  "diff": "diff --git a/... (git diff text, may be empty)" }
```

Writes only the changed string literals, preserving file formatting and line endings.
A timestamped backup is written under `artifacts/copy-editor-backups/`.

## GET /api/type-scale

```json
{
  "path": "src/styles/tokens.css",
  "groups": [
    { "id": "size", "label": "字号阶梯", "tokens": [
      { "name": "--fs-hero", "label": "Hero 主标题", "kind": "clamp",
        "raw": "clamp(34px, 4.4vw, 64px)",
        "parts": { "min": 34, "preferred": 4.4, "max": 64 }, "unit": "px", "line": 190 },
      { "name": "--fs-h3", "kind": "length", "raw": "17px",
        "parts": { "value": 17 }, "unit": "px", "line": 194 }
    ] },
    { "id": "line", "label": "行高", "tokens": [
      { "name": "--lh-hero", "kind": "number", "raw": "1.18", "parts": { "value": 1.18 }, "line": 201 }
    ] },
    { "id": "weight", "label": "字重", "tokens": [
      { "name": "--fw-h2", "kind": "number", "raw": "700", "parts": { "value": 700 }, "line": 213 }
    ] }
  ],
  "overrides": { "path": "src/styles/editor-overrides.css", "text": "/* ...css... */" }
}
```

`kind`: `clamp` (min px / preferred vw / max px), `length` (single px value),
`number` (unitless). The UI may rebuild a raw value from the parts, e.g.
`clamp(${min}px, ${preferred}vw, ${max}px)`.

## POST /api/type-scale/save

```json
{ "changes": [ { "name": "--fs-hero", "raw": "clamp(36px, 4.6vw, 70px)" } ] }
```

```json
{ "ok": true, "saved": 2, "path": "src/styles/tokens.css", "diff": "..." }
```

## POST /api/overrides/save

```json
{ "text": "/* free-form CSS appended after every other stylesheet */\n.home-section-heading h2 { font-size: 40px; }" }
```

```json
{ "ok": true, "path": "src/styles/editor-overrides.css", "bytes": 123, "diff": "..." }
```

The overrides file is imported last in `src/app/[locale]/layout.tsx`, so any selector
wins. This is where the user fine-tunes individual font sizes beyond the token scale.

## GET /api/diff?file=<id | relative path>

```json
{ "path": "src/content/home.ts", "diff": "<git diff text>" }
```

## POST /api/revert

```json
{ "file": "content-home" }
```
```json
{ "ok": true, "path": "src/content/home.ts" }
```

`git checkout -- <path>`; the UI must confirm before calling it.

---

UI notes

- Paper-and-ink editorial style, same palette as the site: paper `#f4f5f3`, ink `#111111`,
  brand orange `#ff6b35` (text-on-light variant `#c2410c`), hairlines
  `rgba(17,17,17,.1)`. Mono for keys/paths (`ui-monospace`, `JetBrains Mono` fallback).
- No frameworks, no CDN, no new npm packages. Vanilla HTML/CSS/JS in
  `tools/copy-editor/ui/`.
- It must stay usable when the local site is down (`siteReachable: false`): show a
  banner + retry, don't block editing.
- Preview: `<iframe src="{previewBase}/zh">` with a page selector
  (`/zh`, `/en`, `/zh/guide`, `/zh/solutions`, `/zh/download`, `/zh/privacy`,
  `/zh/agreement`, `/ja`, `/ko`) and a refresh button (cache-buster query).
- Keyboard: Ctrl/Cmd+S = save the active tab.
