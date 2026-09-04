/**
 * Shared domain types for locales, chapters, and exhibition view models.
 */

/** Menu order, not preference order — the language switcher renders this list
 *  as-is. English and Chinese lead as the primary pair. */
export const LOCALES = ["en", "zh", "ja", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

/** Where `/` lands, and the hreflang x-default. Kept here rather than in the
 *  routing config so the SEO layer and the router cannot drift apart. Note this
 *  is the *serving* default only: zh remains the authoring source. */
export const DEFAULT_LOCALE: Locale = "en";

export const CHAPTER_IDS = [
  "product",
  "company",
  "download",
] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ja: "ja",
  ko: "ko",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  ko: "ko_KR",
};

export const TRACE_LOCALES: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
};

/** Timing offsets in ms from chapter-change t=0. */
export const BEAT_AT = [180, 360, 540] as const;
