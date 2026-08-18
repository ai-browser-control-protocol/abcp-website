/**
 * Chapter routes and beat schedules. Labels live in message files.
 */
import { BEAT_AT, LOCALES, type ChapterId, type Locale } from "./types";

export const CHAPTER_PATH: Record<ChapterId, string> = {
  product: "",
  company: "company",
  download: "download",
};

export function chapterPath(chapter: ChapterId): string {
  const path = CHAPTER_PATH[chapter];
  return path ? `/${path}` : "/";
}

export function chapterHref(locale: string, chapter: ChapterId): string {
  const path = CHAPTER_PATH[chapter];
  return path ? `/${locale}/${path}` : `/${locale}`;
}

export function chapterFromSegment(segment: string | null): ChapterId {
  if (segment === "company" || segment === "download") {
    return segment;
  }
  return "product";
}

export function parseChapter(pathname: string): ChapterId {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "";
  const slug = LOCALES.includes(first as Locale) ? (segments[1] ?? "") : first;
  if (LOCALES.includes(first as Locale) && !slug) return "product";
  if (slug === "company") return "company";
  if (slug === "download") return "download";
  return "product";
}

export function beatSchedule(): readonly number[] {
  return BEAT_AT;
}
