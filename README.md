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

## Deploy

Production deploys run from GitHub Actions when a `v*` tag is pushed. Vercel Git auto-deploy is off in `vercel.json` so only that workflow ships production.

1. Create a [Vercel access token](https://vercel.com/account/tokens).
2. Link the project once locally and copy the IDs:

```sh
npx vercel link
cat .vercel/project.json
```

3. In the GitHub repo: **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | token from step 1 |
| `VERCEL_ORG_ID` | `orgId` from `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` |

4. Ship a release:

```sh
git tag v0.1.0
git push origin v0.1.0
```

The workflow is `.github/workflows/deploy-vercel.yml`. It builds in Actions (`vercel build --prod`) and uploads the artifact (`vercel deploy --prebuilt --prod`) so Vercel does not rebuild.

## Replace placeholders

| What | Where |
|---|---|
| Site URL, Twitter handles, docs/repo | `src/content/site.ts` or `SITE_URL` |
| Team names | `src/content/team.ts` |
| Company email | `src/content/company.ts` |
| Copy | `src/messages/{zh,ja,ko,en}.json` |
| Download links | `src/features/chapters/DownloadChapter.tsx` — enable the buttons and set `href` |
