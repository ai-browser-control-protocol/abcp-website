/**
 * Assembles read-only view models from locale catalogs. Pages pass these down.
 */
import { company } from "./company";
import { type ChapterId, type Locale } from "./types";
import { getMessages, type Messages } from "@/i18n/messages";

/** Copy shapes the UI layer renders. Re-exported here so components in
 *  src/components/ui never have to import from @/i18n directly. */
export type DemoCopy = Messages["product"]["demo"];
export type FeaturesCopy = Messages["product"]["features"];
export type ComparisonCopy = Messages["product"]["comparison"];
export type FaqCopy = Messages["product"]["faq"];

export interface ChromeCopy {
  locale: Locale;
  brandName: string;
  thesis: string;
  tagline: string;
  nav: {
    product: string;
    downloadSection: string;
    download: string;
  };
  localeLabels: Record<Locale, string>;
  footer: Messages["footer"];
  a11y: Pick<Messages["a11y"], "mainNav" | "localeNav" | "stage" | "menu">;
}

export interface ChapterViewModel {
  id: ChapterId;
  locale: Locale;
  title: string;
  seoTitle: string;
  seoDescription: string;
  product?: Messages["product"];
  company?: {
    title: string;
    subtitle: string;
    lead: string;
    storyTitle: string;
    story: string;
    legalLabel: string;
    cityLabel: string;
    productLabel: string;
    productName: string;
    emailLabel: string;
    legalName: string;
    city: string;
    email: string;
    figure: string;
  };
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
      downloadSection: t.nav.downloadSection,
      download: t.nav.download,
    },
    localeLabels: t.locales,
    footer: t.footer,
    a11y: {
      mainNav: t.a11y.mainNav,
      localeNav: t.a11y.localeNav,
      stage: t.a11y.stage,
      menu: t.a11y.menu,
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
  if (chapter === "product") model.product = t.product;
  if (chapter === "company") {
    model.company = {
      title: t.company.title,
      subtitle: t.company.subtitle,
      lead: t.company.lead,
      storyTitle: t.company.storyTitle,
      story: t.company.story,
      legalLabel: t.company.legalLabel,
      cityLabel: t.company.cityLabel,
      productLabel: t.company.productLabel,
      productName: t.company.productName,
      emailLabel: t.company.emailLabel,
      legalName: t.company.legalName,
      city: t.company.city,
      email: company.email,
      figure: t.company.figure,
    };
  }
  return model;
}

function chapterTitle(t: Messages, chapter: ChapterId): string {
  if (chapter === "product") return t.product.title;
  if (chapter === "company") return t.company.title;
  return t.seo.download.title;
}
