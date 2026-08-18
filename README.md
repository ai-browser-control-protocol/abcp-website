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

## Replace placeholders

| What | Where |
|---|---|
| Site URL, Twitter handles, docs/repo | `src/content/site.ts` or `SITE_URL` |
| Team names | `src/content/team.ts` |
| Company email | `src/content/company.ts` |
| Copy | `src/messages/{zh,ja,ko,en}.json` |
| Download links | `src/features/chapters/DownloadChapter.tsx` — enable the buttons and set `href` |
