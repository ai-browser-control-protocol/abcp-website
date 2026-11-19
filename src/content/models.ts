/**
 * Assembles read-only view models from locale catalogs. Pages pass these down.
 */
import { type ChapterId, type Locale } from "./types";
import { getMessages, type Messages } from "@/i18n/messages";

/** Copy shapes the UI layer renders. Re-exported here so components in
 *  src/components/ui never have to import from @/i18n directly. */
export type FaqCopy = Messages["guide"]["faq"];

export interface ChromeCopy {
  locale: Locale;
  brandName: string;
  thesis: string;
  tagline: string;
  nav: {
    product: string;
    useCases: string;
    guide: string;
    solutions: string;
    downloadSection: string;
    download: string;
    github: string;
  };
  localeLabels: Record<Locale, string>;
  footer: Messages["footer"];
  caseCategories: Messages["caseLibrary"]["categories"];
  a11y: Pick<Messages["a11y"], "mainNav" | "footerNav" | "localeNav" | "stage" | "menu" | "github" | "githubStars">;
}

/** Top-nav GitHub control: always a repo URL; compact count only when past 1k. */
export interface GithubNavDisplay {
  url: string;
  starCount: string | null;
}

export interface ChapterViewModel {
  id: ChapterId;
  locale: Locale;
  title: string;
  seoTitle: string;
  seoDescription: string;
  guide?: Messages["guide"];
  download?: Messages["download"];
}
export function getChromeCopy(locale: Locale): ChromeCopy {
  const t = getMessages(locale);
  return {
    locale,
    brandName: t.brand.name,
    thesis: t.brand.thesis,
    tagline: t.brand.tagline,
    nav: {
      product: t.nav.product,
      useCases: t.nav.useCases,
      guide: t.nav.guide,
      solutions: locale === "zh" ? "解决方案" : locale === "ja" ? "ソリューション" : locale === "ko" ? "솔루션" : "Solutions",
      downloadSection: t.nav.downloadSection,
      download: t.nav.download,
      github: t.nav.github,
    },
    localeLabels: t.locales,
    footer: t.footer,
    caseCategories: t.caseLibrary.categories,
    a11y: {
      mainNav: t.a11y.mainNav,
      footerNav: t.a11y.footerNav,
      localeNav: t.a11y.localeNav,
      stage: t.a11y.stage,
      menu: t.a11y.menu,
      github: t.a11y.github,
      githubStars: t.a11y.githubStars,
    },
  };
}

export function getChapterModel(chapter: ChapterId, locale: Locale): ChapterViewModel {
  const t = getMessages(locale);
  const seo = t.seo[chapter];
  const model: ChapterViewModel = {
    id: chapter,
    locale,
    title: chapterTitle(t, chapter),
    seoTitle: seo.title,
    seoDescription: seo.description,
  };
  if (chapter === "guide") model.guide = t.guide;
  if (chapter === "download") model.download = t.download;
  return model;
}

function chapterTitle(t: Messages, chapter: ChapterId): string {
  if (chapter === "product") return t.product.title;
  if (chapter === "guide") return t.guide.title;
  return t.seo.download.title;
}
