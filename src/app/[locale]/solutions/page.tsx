import type { Metadata } from "next";
import { getSolutionsCopy } from "@/content/solutions";
import { site, siteUrl } from "@/content/site";
import { HTML_LANG, LOCALES, type Locale } from "@/content/types";
import { SolutionsChapter } from "@/features/solutions/SolutionsChapter";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const typed = locale as Locale;
  const copy = getSolutionsCopy(typed);
  const languages = Object.fromEntries(LOCALES.map((item) => [HTML_LANG[item], siteUrl(item, "solutions")]));
  languages["x-default"] = siteUrl("en", "solutions");
  return {
    title: `${copy.seo.title} · ${site.name}`,
    description: copy.seo.description,
    alternates: { canonical: siteUrl(typed, "solutions"), languages },
    openGraph: {
      title: `${copy.seo.title} · ${site.name}`,
      description: copy.seo.description,
      url: siteUrl(typed, "solutions"),
    },
  };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = locale as Locale;
  return <SolutionsChapter locale={typed} copy={getSolutionsCopy(typed)} />;
}
