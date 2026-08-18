/**
 * Locale × chapter sitemap using absolute placeholder URLs.
 */
import type { MetadataRoute } from "next";
import { chapterHref } from "@/content/chapters";
import { siteUrl } from "@/content/site";
import { CHAPTER_IDS, LOCALES } from "@/content/types";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    CHAPTER_IDS.map((chapter) => ({
      url: siteUrl(chapterHref(locale, chapter)),
      changeFrequency: "weekly" as const,
      priority: chapter === "product" ? 1 : 0.7,
    })),
  );
}
