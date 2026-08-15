/**
 * Assembles read-only view models from locale catalogs. Pages pass these down.
 */
import { company } from "./company";
import { CHAPTER_IDS, type ChapterId, type Locale } from "./types";
import { site } from "./site";
import { getMessages, type Messages } from "@/i18n/messages";

export interface ChromeCopy {
  locale: Locale;
  brandName: string;
  thesis: string;
  tagline: string;
  nav: Record<ChapterId, string>;
  queueLabel: string;
  queue: Record<ChapterId, string>;
  decks: Record<ChapterId, string>;
  localeLabels: Record<Locale, string>;
  footerLocalFirst: string;
  footerGet: string;
  footer: Messages["footer"];
  a11y: Messages["a11y"];
  catalog: ChapterCatalogItem[];
}

export interface ChapterCatalogItem {
  id: ChapterId;
  nav: string;
  queue: string;
  deck: string;
  beats: string[];
}

export interface ChapterViewModel {
  id: ChapterId;
  locale: Locale;
  title: string;
  seoTitle: string;
  seoDescription: string;
  figureLabel: string;
  brandName: string;
  tagline: string;
  getLabel: string;
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
  download?: Messages["download"] & { systems: string };
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
      company: t.nav.company,
      download: t.nav.download,
    },
    queueLabel: t.queue.label,
    queue: {
      product: t.queue.product,
      company: t.queue.company,
      download: t.queue.download,
    },
    decks: t.queue.deck,
    localeLabels: t.locales,
    footerLocalFirst: t.footer.localFirst,
    footerGet: t.footer.get,
    footer: t.footer,
    a11y: t.a11y,
    catalog: CHAPTER_IDS.map((id) => ({
      id,
      nav: t.nav[id],
      queue: t.queue[id],
      deck: t.queue.deck[id],
      beats: t.beats[id],
    })),
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
    figureLabel: t.figure,
    brandName: t.brand.name,
    tagline: t.brand.tagline,
    getLabel: t.nav.download,
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
  if (chapter === "download") {
    model.download = { ...t.download, systems: site.systems };
  }
  return model;
}

function chapterTitle(t: Messages, chapter: ChapterId): string {
  if (chapter === "product") return t.product.title;
  if (chapter === "company") return t.company.title;
  return t.download.title;
}
