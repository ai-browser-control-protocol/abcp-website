/**
 * Locale layout: fonts, chrome, and the exhibition shell around chapter pages.
 */
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getChromeCopy } from "@/content/models";
import { site } from "@/content/site";
import { HTML_LANG, LOCALES, type Locale } from "@/content/types";
import { SiteFrame } from "@/features/chrome/SiteFrame";
import { jsonLd } from "@/features/seo/buildMetadata";
import { routing } from "@/i18n/routing";
import "@/styles/base.css";
import "@/styles/common.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const typed = locale as Locale;
  const chrome = getChromeCopy(typed);
  return (
    <html lang={HTML_LANG[typed]} className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(typed)) }}
        />
        <NextIntlClientProvider locale={typed} messages={{}}>
          <SiteFrame chrome={chrome}>{children}</SiteFrame>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: "/icon.png", apple: "/icon.png" },
};
