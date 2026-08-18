/**
 * Product chapter at /{locale}. Canonical home for each language.
 */
import { getChapterModel } from "@/content/models";
import type { Locale } from "@/content/types";
import { ChapterView } from "@/features/chapters/ChapterView";
import { buildMetadata } from "@/features/seo/buildMetadata";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale as Locale, "product");
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ChapterView model={getChapterModel("product", locale as Locale)} />;
}
