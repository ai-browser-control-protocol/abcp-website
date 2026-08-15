/**
 * Shared page factory so each chapter route only names its id.
 */
import { getChapterModel } from "@/content/models";
import type { ChapterId, Locale } from "@/content/types";
import { ChapterView } from "@/features/chapters/ChapterView";
import { buildMetadata } from "./buildMetadata";
import { setRequestLocale } from "next-intl/server";

export function chapterMetadata(chapter: ChapterId) {
  return async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return buildMetadata(locale as Locale, chapter);
  };
}

export function ChapterPage(chapter: ChapterId) {
  return async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ChapterView model={getChapterModel(chapter, locale as Locale)} />;
  };
}
