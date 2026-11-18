/**
 * Builds Next.js Metadata including OGP, Twitter cards, and hreflang.
 */
import type { Metadata } from "next";
import { chapterHref } from "@/content/chapters";
import { getHomeCopy } from "@/content/home";
import { getChapterModel, type ChapterViewModel } from "@/content/models";
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
      title: model.seoTitle,
      description: model.seoDescription,
      images: [{ url: image, alt: `${model.title} · ${site.name}` }],
    },
  };
}

/**
 * Builds entity-linked structured data for one localized chapter.
 * Product FAQ data is emitted only on the product page where the answers are visible.
 */
export function jsonLd(model: ChapterViewModel) {
  const canonical = siteUrl(chapterHref(model.locale, model.id));
  const image = siteUrl("og", model.locale, `${model.id}.png`);
  const organizationId = `${site.url}#organization`;
  const websiteId = `${site.url}#website`;
  const softwareId = `${site.url}#software`;
  const pageId = `${canonical}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: siteUrl("icon.png"),
      },
      email: site.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        availableLanguage: ["en", "zh-CN", "ja", "ko"],
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: site.name,
      url: site.url,
      inLanguage: HTML_LANG[model.locale],
      publisher: { "@id": organizationId },
    },
    {
      "@type": "SoftwareApplication",
      "@id": softwareId,
      name: site.name,
      applicationCategory: "BrowserApplication",
      operatingSystem: site.systems,
      url: site.url,
      description: model.seoDescription,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      name: model.seoTitle,
      description: model.seoDescription,
      url: canonical,
      inLanguage: HTML_LANG[model.locale],
      isPartOf: { "@id": websiteId },
      about: { "@id": softwareId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: image,
      },
    },
  ];

  if (model.id === "product" && model.product) {
    const faq = getHomeCopy(model.locale).faq;
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      url: `${canonical}#faq`,
      isPartOf: { "@id": pageId },
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

