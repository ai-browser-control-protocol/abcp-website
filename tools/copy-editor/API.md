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
`content-use-cases` (`src/content/use-cases.ts`) is also `"ts"` but stores all four
locales inline as `entries[].text.<locale>` — it lists four `locales` and no fallbacks.

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
- `fallbackFrom` is the *requested* locale (e.g. `"ja"`) when that locale has no copy of
  its own; `locale` is then the source locale actually being edited (`"en"`). The UI
  shows a notice ("ja 还没有独立文案，正在编辑 en 版") and saves with the resolved locale.
- The `fields` used by the usage endpoint are exactly this payload's groups, so the two
  responses line up by `path`.
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

The overrides file is imported in `src/app/[locale]/layout.tsx`. Next still loads
component CSS after it, so a *same-specificity* rule there wins: raise specificity
(`html .selector`) or use `!important` when an override looks ignored. This is where
the user fine-tunes individual font sizes beyond the token scale.

## GET /api/usage?file=<id>&locale=<zh|en|ja|ko>[&refresh=1]

Empirical page-occurrence check: renders the locale's pages from the local site and
reports whether each string appears in that HTML. Catalogs still carry copy from
retired layouts (e.g. `messages.product.demo`, 509 fields, no longer rendered), so
this is how the UI can label fields honestly instead of guessing from source.

Pages per file: `messages-*` → `/<locale>`, `/guide`, `/solutions`, `/download`,
`/privacy`, `/agreement`; `content-home` → `/<locale>`; `content-solutions` →
`/<locale>/solutions`; `content-legal` → `/<locale>/privacy` + `/agreement`.
Matching ignores tags, HTML entities and whitespace, so copy split across spans still
matches. Results are cached for 120s per file+locale and invalidated by any save.

```json
{
  "ok": true,
  "reachable": true,
  "file": "messages-zh",
  "locale": "zh",
  "checkedAt": "2026-11-18T11:36:12.000Z",
  "base": "http://localhost:3000",
  "pages": ["http://localhost:3000/zh", "..."],
  "missingPages": [],
  "totals": { "total": 680, "found": 235, "missing": 376, "unknown": 69 },
  "groups": [
    { "id": "brand", "found": 3, "total": 3, "unknown": 0 },
    { "id": "product", "found": 88, "total": 509, "unknown": 49 }
  ],
  "fields": {
    "brand.tagline": true,
    "product.demo.scenes.A.browser.results.1.title": false,
    "a11y.githubStars": null
  }
}
```

- `true` — the string is present in the rendered HTML.
- `false` — it never appears on those pages: either copy from a retired layout, or
  text that only exists in an interactive state the static HTML does not contain.
- `null` — cannot be decided (interpolated `{...}` placeholders, very short values).

When the local site is down the endpoint answers `{ ok: false, reachable: false,
error: "..." }` and invents nothing.

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
