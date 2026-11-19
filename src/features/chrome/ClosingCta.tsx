/** Shared download invitation above the sitemap. */
"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { chapterPath } from "@/content/chapters";
import { getHomeCopy } from "@/content/home";
import type { Locale } from "@/content/types";
import { Link } from "@/i18n/navigation";

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9m-3-3 3 3 3-3M4 15v2h12v-2" /></svg>;
}

export function ClosingCta() {
  const locale = useLocale() as Locale;
  const copy = getHomeCopy(locale);
  return (
    <section className="site-closing" aria-label={copy.closing.title}>
      <div className="site-closing-inner">
        <div className="site-closing-copy">
          <h2>{copy.closing.title}{" "}<span>{copy.closing.titleAccent}</span></h2>
          <p>{copy.closing.description}</p>
          <div className="site-closing-actions">
            <Link className="site-closing-primary" href={chapterPath("download")}>
              <DownloadIcon />
              {copy.common.download}
            </Link>
            <Link className="site-closing-secondary" href={chapterPath("guide")}>
              {copy.closing.secondary}
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="site-closing-figure" aria-hidden="true">
          <Image src="/folk/gift-idle.webp" alt="" width={654} height={521} />
          <Image className="site-closing-blink" src="/folk/gift-eyes.webp" alt="" width={654} height={521} />
        </div>
      </div>
    </section>
  );
}
