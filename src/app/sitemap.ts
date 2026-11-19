/**
 * Locale × chapter sitemap using absolute placeholder URLs.
 */
import type { MetadataRoute } from "next";
import { chapterHref } from "@/content/chapters";
import { siteUrl } from "@/content/site";
import { CHAPTER_IDS, LOCALES } from "@/content/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = LOCALES.flatMap((locale) =>
    CHAPTER_IDS.map((chapter) => ({
      url: siteUrl(chapterHref(locale, chapter)),
      changeFrequency: "weekly" as const,
      priority: chapter === "product" ? 1 : 0.7,
    })),
  );
  const technicalPages = LOCALES.map((locale) => ({
    url: siteUrl(locale, "solutions"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const legalPages = LOCALES.flatMap((locale) =>
    ["privacy", "agreement"].map((page) => ({
      url: siteUrl(locale, page),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  );
  const caseDirectories = LOCALES.map((locale) => ({
    url: siteUrl(locale, "use-cases"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...chapters, ...caseDirectories, ...technicalPages, ...legalPages];
}
