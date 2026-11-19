# ABCP website

Official site for ABCP, a local-first agent browser. The site is a conventional product/company site whose chapters open with a dispatch-desk transition.

## Stack

- Next.js App Router, React 19, TypeScript
- next-intl for `zh` / `ja` / `ko` / `en`
- SSR pages, OGP and Twitter cards
- Unidirectional data flow: pages → features → UI

## Develop

```sh
pnpm install
pnpm dev
```

Open `/zh`. `/` redirects there.

```sh
pnpm test
pnpm lint
pnpm build
```

## Edit copy & type sizes

A local editor (no database, no CMS) rewrites the real source files and keeps a backup before every write:

```sh
pnpm copy-editor        # http://localhost:4310, starts `next dev` if it is down
pnpm copy-editor:no-site
```

It edits the four locale catalogs (`src/messages/*.json`), the content modules (`src/content/home.ts`, `solutions.ts`, `legal.ts`), the shared type scale in `src/styles/tokens.css`, and free-form font-size overrides in `src/styles/editor-overrides.css`. See `tools/copy-editor/README.md`.

## Replace placeholders

| What | Where |
|---|---|
| Site URL, Twitter handles, docs/repo | `src/content/site.ts` or `SITE_URL` |
| GitHub nav repo | `src/content/site.ts` (`github`) or `GITHUB_REPO_OWNER` / `GITHUB_REPO_NAME` |
| Copy | `src/messages/{zh,ja,ko,en}.json` and `src/content/{home,solutions,legal}.ts` — or use `pnpm copy-editor` |
| Download links | fetched from GitHub Releases in `src/content/releases.ts` |
