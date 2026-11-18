/**
 * Page-occurrence check — "is this string actually on the current site?"
 *
 * The catalogs still carry copy from retired layouts (for example the old
 * product page under `messages.product.demo`). Rendering every locale page and
 * searching the HTML is an empirical answer: if a string never appears anywhere
 * in the page HTML, the editor can say so honestly instead of guessing from
 * source references.
 *
 * Matching is deliberately lenient (tags stripped, entities decoded, all
 * whitespace removed) so copy split across inline spans still matches. Values
 * that interpolate placeholders or are very short cannot be decided and return
 * `null`.
 */

const CACHE_TTL_MS = 120_000;
const cache = new Map();

/** Which pages a file's copy can appear on, per locale. */
function pagesFor(fileId, locale) {
  if (fileId.startsWith("messages-")) {
    return [`/${locale}`, `/${locale}/guide`, `/${locale}/solutions`, `/${locale}/download`, `/${locale}/privacy`, `/${locale}/agreement`];
  }
  if (fileId === "content-home") return [`/${locale}`];
  if (fileId === "content-solutions") return [`/${locale}/solutions`];
  if (fileId === "content-legal") return [`/${locale}/privacy`, `/${locale}/agreement`];
  return [`/${locale}`];
}

function decodeEntities(html) {
  return html
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function squeeze(text) {
  return text.replace(/[\s\u00a0\u200b\u200c\u200d\ufeff]+/g, "");
}

function printable(value) {
  if (typeof value !== "string" || !value) return null;
  const squeezed = squeeze(value.replace(/\*\*/g, ""));
  if (!squeezed) return null;
  // Interpolated copy cannot be matched literally ({count}, {price}, ...).
  if (/\{[^{}]*[a-zA-Z][^{}]*\}/.test(value)) return null;
  // Too short to be meaningful (single glyphs, punctuation, "x").
  if (squeezed.length < 3) return null;
  return squeezed;
}

async function fetchCorpus(base, pages) {
  const htmls = [];
  const fetched = [];
  await Promise.all(
    pages.map(async (page) => {
      try {
        const response = await fetch(`${base}${page}`, { signal: AbortSignal.timeout(9000) });
        if (!response.ok) return;
        const html = await response.text();
        htmls.push(html);
        fetched.push(`${base}${page}`);
      } catch {
        /* page unavailable */
      }
    })
  );
  return {
    textCorpus: squeeze(decodeEntities(htmls.join(" ").replace(/<[^>]*>/g, " "))),
    rawCorpus: squeeze(decodeEntities(htmls.join(" "))),
    fetched,
    missing: pages.filter((page) => !fetched.some((url) => url.endsWith(page))),
  };
}

/**
 * @param {{ base: string, file: string, locale: string, payload: {groups: {id:string, fields:{path:string,value:string}[]}[]}, refresh?: boolean }} input
 */
export async function checkUsage({ base, file, locale, payload, refresh = false }) {
  const key = `${file}:${locale}:${base}`;
  const cached = cache.get(key);
  if (!refresh && cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return { ...cached.data, cached: true };
  }

  const pages = pagesFor(file, locale);
  const corpus = await fetchCorpus(base, pages);
  if (corpus.fetched.length === 0) {
    return {
      ok: false,
      reachable: false,
      file,
      locale,
      error: "本地站点没有响应，无法检查文案是否出现在页面上",
      pages: [],
    };
  }

  const fields = {};
  const groups = [];
  const totals = { total: 0, found: 0, missing: 0, unknown: 0 };
  for (const group of payload.groups) {
    const stat = { id: group.id, found: 0, total: 0, unknown: 0 };
    for (const field of group.fields) {
      stat.total += 1;
      totals.total += 1;
      const needle = printable(field.value);
      if (!needle) {
        fields[field.path] = null;
        stat.unknown += 1;
        totals.unknown += 1;
        continue;
      }
      const found = corpus.textCorpus.includes(needle) || corpus.rawCorpus.includes(needle);
      fields[field.path] = found;
      if (found) {
        stat.found += 1;
        totals.found += 1;
      } else {
        totals.missing += 1;
      }
    }
    groups.push(stat);
  }

  const result = {
    ok: true,
    reachable: true,
    file,
    locale,
    checkedAt: new Date().toISOString(),
    base,
    pages: corpus.fetched,
    missingPages: corpus.missing.map((page) => `${base}${page}`),
    totals,
    groups,
    fields,
  };
  cache.set(key, { at: Date.now(), data: result });
  return result;
}

/** Drop cached usage for one file (all locales). */
export function invalidateUsage(file) {
  for (const key of [...cache.keys()]) {
    if (key.startsWith(`${file}:`)) cache.delete(key);
  }
}
