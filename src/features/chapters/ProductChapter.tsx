/**
 * Product chapter (home): white / orange / black marketing page.
 *
 * Sections, in order:
 *   hero (neon brand wordmark) → scenario demo → feature stories → comparison → closing CTA
 */
"use client";

import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { ScenarioAnimation } from "@/components/ui/ScenarioAnimation";
import { chapterPath } from "@/content/chapters";
import type { Messages } from "@/i18n/messages";
import { Link } from "@/i18n/navigation";
import "./product-chapter.css";

export function ProductChapter({
  copy,
}: {
  copy: Messages["product"];
  brandName: string;
  tagline: string;
  getLabel: string;
}) {
  return (
    <article className="chapter product-page">
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      {/* ===== Hero ===== */}
      <header className="hero-header-center">
        <h1 className="hero-display-title">
          <span className="hero-title-line">
            {/* Neon tube: the halo layer flickers, the letters stay solid. */}
            <span className="hero-brand-neon">
              <span className="hero-brand-bloom" aria-hidden="true" />
              <span className="hero-brand-halo" aria-hidden="true">
                {copy.thesisBrand}
              </span>
              <span className="hero-brand-core">{copy.thesisBrand}</span>
            </span>
            <span className="hero-title-lead">{copy.thesisLead}</span>
          </span>
          <span className="hero-title-line">
            <span className="hero-title-rest">{copy.thesisRest}</span>
            <span className="hero-cursor" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero-lead-text">{copy.sub}</p>

        <div className="hero-cta-cluster">
          <Link className="ui-button-primary hero-btn-mac" href={chapterPath("download")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.365 1.43c0 1.14-.464 2.234-1.226 3.04-.81.857-2.118 1.515-3.214 1.43-.144-1.117.41-2.282 1.18-3.07.857-.894 2.318-1.575 3.26-1.4zM21 17.297c-.49 1.124-.722 1.625-1.353 2.618-.88 1.388-2.124 3.114-3.668 3.13-1.37.014-1.722-.89-3.58-.879-1.857.012-2.245.894-3.614.88-1.544-.016-2.726-1.58-3.605-2.967-2.466-3.884-2.724-8.444-1.203-10.871 1.082-1.722 2.787-2.726 4.387-2.726 1.626 0 2.65.894 3.997.894 1.302 0 2.097-.895 3.984-.895 1.422 0 2.93.776 4.005 2.115-3.52 1.929-2.95 6.96.65 8.7z" />
            </svg>
            <span>{copy.ctaPrimaryMac}</span>
          </Link>
          <Link className="ui-button-ghost hero-btn-win" href={chapterPath("download")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 5.5L10.5 4.4v8.6H3v-7.5zm0 8.5h7.5v8.6L3 19.4V14zm8.5-9.6L21 3v10h-9.5V4.4zm0 9.6H21V22l-9.5-1.4V13.9z" />
            </svg>
            <span>{copy.ctaPrimaryWin}</span>
          </Link>
        </div>

        <div className="hero-assurances">
          {copy.assurances.map((line) => (
            <span key={line} className="hero-assurance">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{line}</span>
            </span>
          ))}
        </div>

        <p className="hero-system-support">{copy.systemSupport}</p>
      </header>

      {/* ===== Demo — task panel + three scroll-linked browser scenes ===== */}
      <ScenarioAnimation copy={copy.demo} />

      {/* ===== Feature stories — one section per capability ===== */}
      <FeaturesGrid copy={copy.features} />

      {/* ===== Comparison matrix — products across, dimensions down ===== */}
      <ComparisonTable copy={copy.comparison} />

      {/* ===== Closing CTA ===== */}
      <section className="closing-cta">
        <h2 className="closing-cta-title">{copy.closing.title}</h2>
        <p className="closing-cta-sub">{copy.closing.sub}</p>
        <div className="hero-cta-cluster">
          <Link className="ui-button-primary hero-btn-mac" href={chapterPath("download")}>
            <span>{copy.ctaPrimaryMac}</span>
          </Link>
          <Link className="ui-button-ghost hero-btn-win" href={chapterPath("download")}>
            <span>{copy.ctaPrimaryWin}</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
