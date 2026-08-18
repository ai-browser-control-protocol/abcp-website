/**
 * Shared domain types for locales, chapters, and exhibition view models.
 */

export const LOCALES = ["zh", "ja", "ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const CHAPTER_IDS = [
  "product",
  "company",
  "download",
] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

export const HTML_LANG: Record<Locale, string> = {
  zh: "zh-CN",
  ja: "ja",
  ko: "ko",
  en: "en",
};

export const OG_LOCALE: Record<Locale, string> = {
  zh: "zh_CN",
  ja: "ja_JP",
  ko: "ko_KR",
  en: "en_US",
};

export const TRACE_LOCALES: Record<Locale, string> = {
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  en: "en-US",
};

/** Timing offsets in ms from chapter-change t=0. */
export const BEAT_AT = [180, 360, 540] as const;
