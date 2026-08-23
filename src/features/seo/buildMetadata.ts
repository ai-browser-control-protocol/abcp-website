/**
 * Builds Next.js Metadata including OGP, Twitter cards, and hreflang.
 */
import type { Metadata } from "next";
import { chapterHref } from "@/content/chapters";
import { getChapterModel } from "@/content/models";
import { site, siteUrl } from "@/content/site";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  type ChapterId,
  type Locale,
} from "@/content/types";

export function buildMetadata(locale: Locale, chapter: ChapterId): Metadata {
  const model = getChapterModel(chapter, locale);
  const canonicalPath = chapterHref(locale, chapter);
  const canonical = siteUrl(canonicalPath);
  const languages = Object.fromEntries(
    LOCALES.map((item) => [HTML_LANG[item], siteUrl(chapterHref(item, chapter))]),
  ) as Record<string, string>;
  languages["x-default"] = siteUrl(chapterHref(DEFAULT_LOCALE, chapter));
  const image = siteUrl("og", locale, `${chapter}.png`);
  const alternateLocales = LOCALES.filter((item) => item !== locale).map((item) => OG_LOCALE[item]);

  return {
    title: model.seoTitle,
    description: model.seoDescription,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: model.seoTitle,
      description: model.seoDescription,
      url: canonical,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateLocales,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${model.title} · ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitterSite,
      creator: site.twitterCreator,
      title: model.seoTitle,
      description: model.seoDescription,
      images: [{ url: image, alt: `${model.title} · ${site.name}` }],
    },
  };
}

export function jsonLd(locale: Locale) {
  const company = getChapterModel("company", locale).company;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: site.name,
        applicationCategory: "BrowserApplication",
        operatingSystem: site.systems,
        url: site.url,
      },
      {
        "@type": "Organization",
        name: company?.legalName ?? site.name,
        email: company?.email,
        address: company?.city,
      },
    ],
  };
}
