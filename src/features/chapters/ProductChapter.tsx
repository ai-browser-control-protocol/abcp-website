/**
 * Product chapter (home): white / orange / black marketing page.
 *
 * Sections, in order:
 *   hero (neon brand wordmark) → scenario demo → feature stories → comparison
 *   → FAQ → closing CTA
 *
 * The hero is deliberately light: headline, one download button, and the voxel
 * relay strip — which carries the two assurances as speech bubbles, so the claim
 * and the illustration are one object rather than two stacked ones.
 */
"use client";

import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { FaqSection } from "@/components/ui/FaqSection";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { GiftClip } from "@/components/ui/GiftClip";
import { PixelScene } from "@/components/ui/PixelFolk";
import { Emphasized } from "@/components/ui/RichText";
import { ScenarioAnimation } from "@/components/ui/ScenarioAnimation";
import { chapterPath } from "@/content/chapters";
import type { Messages } from "@/i18n/messages";
import { Link } from "@/i18n/navigation";
import "./product-chapter.css";

/** One download button for every platform; the download page handles the split. */
function DownloadButton({ label }: { label: string }) {
  return (
    <Link className="ui-button-primary hero-btn-download" href={chapterPath("download")}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M4 20h16" />
      </svg>
      <span>{label}</span>
    </Link>
  );
}

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

        <div className="hero-cta-cluster">
          <DownloadButton label={copy.ctaPrimary} />
        </div>

        <PixelScene assurances={copy.assurances} />
      </header>

      {/* ===== Demo — task panel + three scroll-linked browser scenes ===== */}
      <ScenarioAnimation copy={copy.demo} />

      {/* ===== Feature stories — one section per capability ===== */}
      <FeaturesGrid copy={copy.features} />

      {/* ===== Comparison matrix — products across, dimensions down ===== */}
      <ComparisonTable copy={copy.comparison} />

      {/* ===== FAQ — the objections the matrix above tends to raise ===== */}
      <FaqSection copy={copy.faq} />

      {/* ===== Closing CTA ===== */}
      <section className="closing-cta">
        <h2 className="closing-cta-title">
          <Emphasized text={copy.closing.title} />
        </h2>
        <p className="closing-cta-sub">{copy.closing.sub}</p>
        <div className="hero-cta-cluster">
          <DownloadButton label={copy.ctaPrimary} />
        </div>

        <GiftClip className="closing-folk" />
      </section>
    </article>
  );
}
