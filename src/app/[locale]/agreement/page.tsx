import type { Metadata } from "next";
import { getLegalCopy } from "@/content/legal";
import { site, siteUrl } from "@/content/site";
import { HTML_LANG, LOCALES, type Locale } from "@/content/types";
import { LegalDocument } from "@/features/legal/LegalDocument";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const typed = locale as Locale;
  const copy = getLegalCopy("agreement", typed);
  const languages = Object.fromEntries(LOCALES.map((item) => [HTML_LANG[item], siteUrl(item, "agreement")]));
  languages["x-default"] = siteUrl("en", "agreement");
  return {
    title: `${copy.title} · ${site.name}`,
    description: copy.lead,
    alternates: { canonical: siteUrl(typed, "agreement"), languages },
    openGraph: {
      title: `${copy.title} · ${site.name}`,
      description: copy.lead,
      url: siteUrl(typed, "agreement"),
    },
  };
}

export default async function AgreementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = locale as Locale;
  return <LegalDocument locale={typed} copy={getLegalCopy("agreement", typed)} />;
}
