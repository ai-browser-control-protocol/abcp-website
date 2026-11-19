import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { site, siteUrl } from "@/content/site";
import { HTML_LANG, LOCALES, type Locale } from "@/content/types";
import { getCases } from "@/content/use-cases";
import { getMessages } from "@/i18n/messages";
import { CaseDirectory } from "@/features/use-cases/CaseDirectory";
import "@/features/use-cases/use-cases.css";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { nav, caseLibrary } = getMessages(locale);
  const title = `${nav.useCases} · ${site.name}`;
  const canonical = siteUrl(locale, "use-cases");
  const languages = Object.fromEntries(LOCALES.map((lang) => [HTML_LANG[lang], siteUrl(lang, "use-cases")]));
  return {
    title, description: caseLibrary.intro,
    alternates: { canonical, languages: { ...languages, "x-default": siteUrl("en", "use-cases") } },
    openGraph: { title, description: caseLibrary.intro, url: canonical },
  };
}

export default async function UseCasesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { caseLibrary: copy } = getMessages(locale);
  return (
    <article className="use-cases-page">
      <header className="cases-hero">
        <div className="cases-container cases-hero-inner">
          <div className="cases-hero-copy">
            <h1>{copy.headline}</h1>
            <p className="cases-intro">{copy.intro}</p>
          </div>
          <div className="case-folder" aria-hidden="true">
            <div className="case-folder-back" />
            <div className="case-file case-file--commerce">
              <Image src="/case-icons/package.webp" width={88} height={88} alt="" />
            </div>
            <div className="case-file case-file--social">
              <span className="case-icon case-task" data-palette="coral">
                <svg viewBox="0 0 64 64" focusable="false"><use href="/case-icons/tasks.svg#trending-topics" /></svg>
              </span>
            </div>
            <div className="case-file case-file--career">
              <Image src="/case-icons/briefcase.webp" width={88} height={88} alt="" />
            </div>
            <div className="case-folder-front">
              <Image src="/brand/webcross-horizontal.webp" alt="" width={99} height={26} />
            </div>
          </div>
        </div>
      </header>
      <CaseDirectory copy={copy} cases={getCases(locale)} />
    </article>
  );
}
