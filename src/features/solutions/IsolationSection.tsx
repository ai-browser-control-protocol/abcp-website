/**
 * Section 01 — environment isolation: proxy / fingerprint / CAPTCHA.
 *
 * Two of the three signals ship today (proxy, fingerprint) and are drawn as
 * before → after dioramas. CAPTCHA is explicitly a roadmap item: its card keeps
 * the same anatomy but swaps the solved illustration for a dashed clock and a
 * "coming soon" pill, so the state reads as planned work rather than a bug.
 *
 * All illustration is inline SVG line art, so the section inherits the cool
 * indigo/ink palette without a single image asset.
 */
import type { ReactNode } from "react";
import type { SolutionCheck, SolutionsCopy } from "@/content/solutions";
import "./isolation-section.css";

type CheckKey = keyof SolutionsCopy["isolation"]["checks"];
type Diptych = { before: ReactNode; after: ReactNode };

const CHECK_ORDER: CheckKey[] = ["proxy", "fingerprint", "captcha"];

/** Faint dashed floor shared by every figure so the pairs sit on one baseline. */
function Ground() {
  return <path className="iso-ground" d="M15 88h90" />;
}

/** Small clock used by the "coming soon" badge and pill. */
function ClockGlyph() {
  return (
    <g>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 4.9V8l2.2 1.6" />
    </g>
  );
}

/** Left figure · proxy: a data-center rack, the tell every site learns first. */
function DataCenterArt() {
  return (
    <svg viewBox="0 0 120 96" role="presentation" focusable="false">
      <Ground />
      <rect x="26" y="14" width="68" height="64" rx="10" />
      <path d="M42 14V8h10v6M68 14V8h10v6" />
      <circle className="iso-dot" cx="39" cy="29" r="2.2" />
      <rect x="48" y="26" width="36" height="6" rx="3" />
      <circle className="iso-dot" cx="39" cy="45" r="2.2" />
      <rect x="48" y="42" width="36" height="6" rx="3" />
      <circle className="iso-dot" cx="39" cy="61" r="2.2" />
      <rect x="48" y="58" width="36" height="6" rx="3" />
      <path className="iso-soft" d="M40 71h40" />
      <path className="iso-soft" d="M48 76h30" />
      <path d="M38 78v6M82 78v6" />
    </svg>
  );
}

/** Right figure · proxy: an ordinary home line, radio waves off the roof. */
function HomeArt() {
  return (
    <svg viewBox="0 0 120 96" role="presentation" focusable="false">
      <Ground />
      <path className="iso-accent" d="M51.5 19a8.5 8.5 0 0 1 17 0" />
      <path className="iso-accent" d="M47 14a13 13 0 0 1 26 0" />
      <path d="M24 52 60 24l36 28v26a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4Z" />
      <rect x="50" y="56" width="22" height="16" rx="2.5" />
      <path className="iso-soft" d="M50 64h22M61 56v16" />
      <rect x="31" y="60" width="13" height="22" rx="2" />
      <circle className="iso-dot" cx="40.5" cy="71" r="1.1" />
    </svg>
  );
}

/** Left figure · fingerprint: a headless automation rig. */
function RobotArt() {
  return (
    <svg viewBox="0 0 120 96" role="presentation" focusable="false">
      <Ground />
      <rect x="19" y="41" width="8" height="19" rx="4" />
      <rect x="93" y="41" width="8" height="19" rx="4" />
      <rect x="27" y="24" width="66" height="60" rx="16" />
      <path d="M60 24V14" />
      <circle className="iso-dot" cx="60" cy="11" r="3" />
      <circle cx="46" cy="48" r="6.6" />
      <circle cx="74" cy="48" r="6.6" />
      <circle className="iso-dot" cx="46" cy="48" r="2.4" />
      <circle className="iso-dot" cx="74" cy="48" r="2.4" />
      <rect x="48" y="61" width="24" height="9" rx="2.6" />
      <path className="iso-soft" d="M56 61v9M64 61v9" />
    </svg>
  );
}

/** Right figure · fingerprint: the same page on an ordinary laptop. */
function LaptopArt() {
  return (
    <svg viewBox="0 0 120 96" role="presentation" focusable="false">
      <Ground />
      <rect x="26" y="16" width="68" height="50" rx="5" />
      <circle className="iso-accent-dot" cx="37" cy="28" r="1.8" />
      <circle className="iso-accent-dot" cx="43.5" cy="28" r="1.8" />
      <circle className="iso-accent-dot" cx="50" cy="28" r="1.8" />
      <path d="M37 38h20" />
      <path className="iso-soft" d="M37 45h34" />
      <path className="iso-soft" d="M37 52h26" />
      <path d="M17 66h86l-8 18H25Z" />
      <path className="iso-soft" d="M53 74h14" />
    </svg>
  );
}

/** Left figure · CAPTCHA: a verification card that never resolves. */
function CaptchaStuckArt() {
  return (
    <svg viewBox="0 0 120 96" role="presentation" focusable="false">
      <Ground />
      <rect x="20" y="27" width="76" height="50" rx="8" />
      <rect x="30" y="40" width="19" height="19" rx="4.5" />
      <path className="iso-line" d="M59 45h19" />
      <path className="iso-soft iso-line" d="M59 52h12" />
      <circle className="iso-soft" cx="86" cy="36" r="6" strokeDasharray="2 3" />
    </svg>
  );
}

/** Right figure · CAPTCHA roadmap: a dashed clock frame instead of a solved card. */
function ClockArt() {
  return (
    <svg viewBox="0 0 120 96" role="presentation" focusable="false">
      <Ground />
      <circle className="iso-dash-ring" cx="60" cy="52" r="32" strokeDasharray="3 6" />
      <circle cx="60" cy="52" r="23" />
      <path className="iso-hand" d="M60 52l-7-9M60 52l10-7" />
      <circle className="iso-dot" cx="60" cy="52" r="2.2" />
      <path className="iso-soft" d="M60 32v3M60 69v3M40 52h3M77 52h3" />
    </svg>
  );
}

const DIORAMAS: Record<CheckKey, Diptych> = {
  proxy: { before: <DataCenterArt />, after: <HomeArt /> },
  fingerprint: { before: <RobotArt />, after: <LaptopArt /> },
  captcha: { before: <CaptchaStuckArt />, after: <ClockArt /> },
};

type BadgeState = "before" | "after" | "soon";

function StateBadge({ state }: { state: BadgeState }) {
  return (
    <span className={`iso-badge iso-badge--${state}`} aria-hidden="true">
      <svg viewBox="0 0 16 16">
        {state === "before" ? (
          <path d="M4.6 4.6l6.8 6.8M11.4 4.6l-6.8 6.8" />
        ) : state === "soon" ? (
          <ClockGlyph />
        ) : (
          <path d="m3.4 8.3 3 3 6.2-6.8" />
        )}      </svg>
    </span>
  );
}

function CheckCard({ check, arts }: { check: SolutionCheck; arts: Diptych }) {
  const isSoon = check.status === "soon";
  return (
    <article
      className={`iso-card sol-panel${isSoon ? " iso-card--soon" : ""}`}
      data-status={isSoon ? "soon" : "ready"}
    >
      <div className="iso-card-head">
        <span className="iso-mark" aria-hidden="true" />
        <h3 className="iso-card-title">{check.title}</h3>
        {isSoon ? (
          <span className="iso-soon-pill">
            {check.soonLabel ? (
              <span className="iso-soon-pill-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <ClockGlyph />
                </svg>
              </span>
            ) : null}
            {check.soonLabel}
          </span>
        ) : null}
      </div>
      <p className="iso-question">{check.question}</p>

      <div className="iso-stage">
        <div className="iso-figure iso-figure--before">
          <div className="iso-art">
            {arts.before}
            <StateBadge state="before" />
          </div>
        </div>
        <span className="iso-arrow" aria-hidden="true">
          <span className="iso-arrow-line" />
          <svg viewBox="0 0 8 12">
            <path d="m1.4 1 4.8 5-4.8 5" />
          </svg>
        </span>
        <div className="iso-figure iso-figure--after">
          <div className="iso-art">
            {arts.after}
            <StateBadge state={isSoon ? "soon" : "after"} />
          </div>
        </div>
        <span className="iso-state iso-state--before">{check.before}</span>
        <span className="iso-state iso-state--after">{check.after}</span>
      </div>

      <p className="iso-note">{check.note}</p>
    </article>
  );
}

export function IsolationSection({ copy }: { copy: SolutionsCopy["isolation"] }) {
  return (
    <section className="sol-section iso-section" id="isolation">
      <div className="sol-section-head">
        <div>
          <span className="sol-kicker">{copy.kicker}</span>
          <h2 className="sol-heading">{copy.title}</h2>
        </div>
        <p className="sol-lead">{copy.lead}</p>
      </div>

      <div className="iso-grid">
        {CHECK_ORDER.map((key) => (
          <CheckCard key={key} check={copy.checks[key]} arts={DIORAMAS[key]} />
        ))}
      </div>
    </section>
  );
}
