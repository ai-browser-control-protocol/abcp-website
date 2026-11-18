/**
 * Solutions chapter — the rewrite of the former How-it-works page.
 *
 * One narrative, seven beats:
 *   hero (stealth browser) → environment isolation → fingerprint & residential
 *   IP → Chromium fork / direct engine → semantic tree token savings →
 *   1000+ environment matrix → auditable action records → reusable JS scripts.
 *
 * Section components live next to this file (`*Section.tsx`) and all receive a
 * slice of `getSolutionsCopy(locale)` as their `copy` prop. Shared rhythm and
 * heading/button/bullet utilities live in solutions-chapter.css so the sections
 * stay visually consistent while each owns its own visual.
 */
import type { SolutionsCopy } from "@/content/solutions";
import { chapterPath } from "@/content/chapters";
import type { Locale } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { EngineSection } from "./EngineSection";
import { EvidenceSection } from "./EvidenceSection";
import { FingerprintSection } from "./FingerprintSection";
import { FleetSection } from "./FleetSection";
import { IsolationSection } from "./IsolationSection";
import { ScriptSection } from "./ScriptSection";
import { SemanticSection } from "./SemanticSection";
import "./solutions-chapter.css";

function DownloadGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function ArrowGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/** Hero visual: a floating glass collage — the stealth-check HUD tilted over
 *  two small glass stat cards, with the failed scripted browser reduced to a
 *  glass chip. No slab: layers break the grid so this hero reads differently
 *  from the homepage's flat aura and the guide's contained glass card. */
function HeroStealthPanel({
  hero,
  regions,
}: {
  hero: SolutionsCopy["hero"];
  regions: string;
}) {
  return (
    <div className="sol-hero-visual">
      <span className="sol-hero-orb sol-hero-orb--a" aria-hidden="true" />
      <span className="sol-hero-orb sol-hero-orb--b" aria-hidden="true" />

      <div className="sol-glass" role="group" aria-label={hero.panelTitle}>
        <div className="sol-glass-head">
          <span className="sol-glass-live" aria-hidden="true" />
          <span className="sol-glass-label">STEALTH CHECK</span>
          <span className="sol-glass-host">shop.example</span>
          <span className="sol-glass-badge">LIVE</span>
        </div>

        <ul className="sol-glass-checks">
          <li>
            <span className="sol-glass-check-name">Proxy</span>
            <span className="sol-glass-check-value">home · residential</span>
            <span className="sol-glass-check-mark" aria-hidden="true">✓</span>
          </li>
          <li>
            <span className="sol-glass-check-name">Fingerprint</span>
            <span className="sol-glass-check-value">normal · chromium</span>
            <span className="sol-glass-check-mark" aria-hidden="true">✓</span>
          </li>
          <li className="is-soon">
            <span className="sol-glass-check-name">CAPTCHA</span>
            <span className="sol-glass-check-value">human takeover · coming soon</span>
            <span className="sol-glass-check-mark is-soon" aria-hidden="true">◷</span>
          </li>
        </ul>

        <div className="sol-glass-preview" aria-hidden="true">
          <div className="sol-glass-preview-bar">
            <span className="sol-glass-dots"><i /><i /><i /></span>
            <span className="sol-glass-preview-url">shop.example/trail-runner</span>
            <span className="sol-glass-preview-code">200 OK</span>
          </div>
          <div className="sol-glass-preview-body">
            <span className="sol-glass-thumb" />
            <span className="sol-glass-preview-copy">
              <strong>Trail runner</strong>
              <small>$109 · Free shipping</small>
              <span className="sol-glass-cart">Add to cart</span>
            </span>
          </div>
        </div>

        <div className="sol-glass-foot">
          <span className="sol-glass-passline">
            <b aria-hidden="true">✓</b>
            {hero.panelPassed} · WebCross
          </span>
          <span className="sol-glass-caption">{hero.panelTitle}</span>
        </div>
      </div>

      <div className="sol-glass-chip" aria-hidden="true">
        <b>403</b>
        <span>{hero.panelBlocked} · Headless Chrome</span>
      </div>

      <div className="sol-hero-stat sol-hero-stat--regions" aria-hidden="true">
        <span className="sol-hero-stat-glyph">◎</span>
        <span>{regions}</span>
      </div>
    </div>
  );
}

export function SolutionsChapter({ locale, copy }: { locale: Locale; copy: SolutionsCopy }) {
  return (
    <article className={`chapter solutions-page locale-${locale}`}>
      <div className="sol-aura" aria-hidden="true" />

      <header className="sol-hero">
        <div className="sol-hero-copy">
          {copy.eyebrow ? <span className="sol-eyebrow">{copy.eyebrow}</span> : null}
          <h1 className="sol-hero-title">
            <span>{copy.hero.titleA}</span>
            <span className="sol-hero-title-mark">{copy.hero.titleAccent}</span>
            <span>{copy.hero.titleB}</span>
          </h1>
          <p className="sol-hero-lead">{copy.hero.lead}</p>
          <div className="sol-hero-actions">
            <Link className="sol-btn sol-btn--primary" href={`${chapterPath("download")}#download-platforms`}>
              <DownloadGlyph />
              <span>{copy.hero.ctaPrimary}</span>
            </Link>
            <Link className="sol-btn sol-btn--ghost" href={chapterPath("guide")}>
              <span>{copy.hero.ctaSecondary}</span>
              <ArrowGlyph />
            </Link>
          </div>
          <p className="sol-hero-meta">{copy.hero.meta}</p>
        </div>
        <HeroStealthPanel hero={copy.hero} regions={copy.fingerprint.countriesLabel} />
      </header>

      <IsolationSection copy={copy.isolation} />
      <FingerprintSection copy={copy.fingerprint} />
      <EngineSection copy={copy.engine} />
      <SemanticSection copy={copy.semantic} />
      <FleetSection copy={copy.fleet} />
      <EvidenceSection copy={copy.evidence} />
      <ScriptSection copy={copy.script} />
    </article>
  );
}
