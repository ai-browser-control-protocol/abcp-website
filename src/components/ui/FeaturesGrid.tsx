/**
 * Product capabilities — one full-width story section per capability.
 *
 * The six capabilities sit on an asymmetric bento grid rather than six identical
 * alternating rows — a lead panel, a pair, a wide/narrow split, and a closing
 * panel. Equal rows read as a spreadsheet; uneven ones give the eye somewhere to
 * land. No section heading sits above the stack; the titles carry the page.
 *
 * Each figure is an inline SVG whose animations only run once the row scrolls
 * into view (`is-visible`), so nothing burns frames off-screen.
 *
 * Every word inside those SVGs comes from `copy.figures` rather than from this
 * source, each figure's `aria-label` included. Drawing the diagrams in markup is
 * what lets them animate and stay crisp at any size, but it also makes their
 * labels content: hardcoding them left Chinese strings sitting inside the en,
 * ja and ko pages.
 */
"use client";

import { Fragment } from "react";
import { useReveal } from "./useReveal";
import type { FeaturesCopy } from "@/content/models";
import "./features-grid.css";

/** Bento plan, one entry per capability.
 *  span  — columns out of six
 *  stack — figure above the copy instead of beside it (narrow cards)
 *  flip  — figure first on wide cards
 *  ink   — dark card, for the one panel that breaks up the light run */
const LAYOUT = [
  { span: 6 },
  { span: 3, stack: true },
  { span: 3, stack: true },
  { span: 4 },
  { span: 2, stack: true, ink: true },
  { span: 6, flip: true },
] as const;

export function FeaturesGrid({ copy }: { copy: FeaturesCopy }) {
  if (!copy?.items?.length) return null;

  return (
    /* No aria-label: the only candidate was a hardcoded English string, which
       zh/ja/ko visitors would hear in the wrong language. An unnamed <section>
       is simply not exposed as a landmark, which is harmless. Give this a real
       localized heading if the section ever gets one in the copy. */
    <section className="features-section" id="features">
      {copy.items.map((item, index) => (
        <FeatureRow key={item.key} item={item} index={index} figures={copy.figures} />
      ))}
    </section>
  );
}

function FeatureRow({
  item,
  index,
  figures,
}: {
  item: FeaturesCopy["items"][number];
  index: number;
  figures: Figures;
}) {
  const [ref, visible] = useReveal<HTMLElement>();

  const plan = LAYOUT[index % LAYOUT.length];
  const className = [
    "feature-row",
    `span-${plan.span}`,
    "stack" in plan && plan.stack ? "is-stacked" : "",
    "flip" in plan && plan.flip ? "is-flipped" : "",
    "ink" in plan && plan.ink ? "is-ink" : "",
    visible ? "is-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article ref={ref} className={className}>
      <div className="feature-copy">
        <div className="feature-eyebrow">
          <span className="feature-num">{String(index + 1).padStart(2, "0")}</span>
          <span className="feature-eyebrow-text">{item.eyebrow}</span>
        </div>
        <h2 className="feature-title">{item.title}</h2>
        <p className="feature-body">{item.body}</p>
        <ul className="feature-bullets">
          {item.bullets.map((b) => (
            <li key={b}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="feature-figure">
        <span className="feature-figure-title">{item.figure}</span>
        <div className="feature-figure-card">
          <FeatureIllustration index={index} figures={figures} />
        </div>
      </div>
    </article>
  );
}

/* ========================================================================== */
/* Figures                                                                     */
/* ========================================================================== */

type Figures = FeaturesCopy["figures"];

function FeatureIllustration({ index, figures }: { index: number; figures: Figures }) {
  switch (index) {
    case 0:
      return <IllusSpeed t={figures.speed} />;
    case 1:
      return <IllusToken t={figures.tree} />;
    case 2:
      return <IllusLocal t={figures.local} />;
    case 3:
      return <IllusSkill t={figures.skill} />;
    case 4:
      return <IllusFingerprint t={figures.fingerprint} />;
    default:
      return <IllusTakeover t={figures.takeover} />;
  }
}

/* 01 — custom Chromium kernel vs Chrome + JS adapter */
function IllusSpeed({ t }: { t: Figures["speed"] }) {
  return (
    <svg viewBox="0 0 480 360" className="ill-svg" role="img" aria-label={t.alt}>
      <defs>
        <linearGradient id="sp-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff8a4a" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
      </defs>

      {/* left — WebCross: the agent talks straight to the kernel */}
      <rect x="22" y="26" width="196" height="236" rx="12" fill="#0a0a0a" />
      <text x="120" y="54" textAnchor="middle" fill="#ff6b35" fontSize="13" fontWeight="800" fontFamily="ui-monospace, monospace">WebCross</text>
      <text x="120" y="72" textAnchor="middle" fill="#ffffff" fontSize="10.5" opacity="0.6">{t.kernel}</text>
      <line x1="120" y1="104" x2="120" y2="195" stroke="#2a2a2e" strokeWidth="2" />
      {["Agent", "Kernel"].map((label, i) => (
        <g key={label} transform={"translate(120, " + (118 + i * 62) + ")"}>
          <rect x="-64" y="-15" width="128" height="30" rx="7" fill="#17171b" stroke="#2f2f36" />
          <text textAnchor="middle" y="4" fill="#e7e7ea" fontSize="10.5" fontFamily="ui-monospace, monospace">{label}</text>
        </g>
      ))}
      <circle className="sp-packet-fast" r="5" fill="#ff6b35" cx="120" cy="118" />
      <text x="120" y="246" textAnchor="middle" fill="#ffffff" fontSize="9.5" opacity="0.45" fontFamily="ui-monospace, monospace">native binding · 0 hop</text>

      {/* right — Chrome, with an adapter layer on every call */}
      <rect x="262" y="26" width="196" height="236" rx="12" fill="#ffffff" stroke="#e4e4e7" />
      <text x="360" y="54" textAnchor="middle" fill="#71717a" fontSize="13" fontWeight="700">Chrome</text>
      <text x="360" y="72" textAnchor="middle" fill="#a1a1aa" fontSize="10.5">{t.adapter}</text>
      <line x1="360" y1="86" x2="360" y2="237" stroke="#e4e4e7" strokeWidth="2" />
      {["Agent", "JS Adapter", "CDP / RPC", "Kernel"].map((label, i) => (
        <g key={label} transform={"translate(360, " + (98 + i * 42) + ")"}>
          <rect x="-64" y="-14" width="128" height="28" rx="7" fill="#f4f4f5" stroke="#e4e4e7" />
          <text textAnchor="middle" y="4" fill="#71717a" fontSize="10" fontFamily="ui-monospace, monospace">{label}</text>
        </g>
      ))}
      <circle className="sp-packet-slow" r="5" fill="#a1a1aa" cx="360" cy="98" />
      <text x="360" y="256" textAnchor="middle" fill="#a1a1aa" fontSize="9.5" fontFamily="ui-monospace, monospace">{t.serialize}</text>

      {/* same task, time spent */}
      <text x="22" y="296" fill="#71717a" fontSize="10.5" fontWeight="700">{t.caption}</text>
      <g transform="translate(22, 322)">
        <text fill="#ff6b35" fontSize="10.5" fontWeight="700">WebCross</text>
        <rect x="98" y="-9" width="290" height="10" rx="5" fill="#f0f0f2" />
        <rect className="sp-bar-fast" x="98" y="-9" height="10" rx="5" fill="url(#sp-bar)" />
        <text x="398" y="0" fill="#ff6b35" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">1.0×</text>
      </g>
      <g transform="translate(22, 348)">
        <text fill="#a1a1aa" fontSize="10.5" fontWeight="700">Chrome + JS</text>
        <rect x="98" y="-9" width="290" height="10" rx="5" fill="#f0f0f2" />
        <rect className="sp-bar-slow" x="98" y="-9" height="10" rx="5" fill="#d4d4d8" />
        <text x="398" y="0" fill="#a1a1aa" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">3.2×</text>
      </g>
    </svg>
  );
}

/* 02 — DOM → AXTree skeleton → SemanticTree structure */
function IllusToken({ t }: { t: Figures["tree"] }) {
  /* Node names are code and stay put; only the annotation beside each is copy. */
  const nodes = ["root", "├─ button", "├─ input", "├─ list", "│  └─ row", "└─ link"];
  const tree = nodes.map((node, i) => [node, i === 0 ? "" : (t.tags[i - 1] ?? "")] as const);

  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label={t.alt}>
      {/* raw DOM — everything, most of it noise */}
      <rect x="22" y="30" width="122" height="200" rx="10" fill="#f6f6f7" stroke="#e4e4e7" />
      <text x="83" y="52" textAnchor="middle" fill="#71717a" fontSize="11" fontWeight="700">{t.dom}</text>
      <g className="tk-noise">
        {Array.from({ length: 28 }).map((_, i) => (
          <rect
            key={i}
            x={30 + (i % 4) * 27}
            y={70 + Math.floor(i / 4) * 17}
            width={23}
            height={11}
            rx={2}
            fill={i % 4 === 0 ? "#a1a1aa" : "#d4d4d8"}
            style={{ animationDelay: `${(i % 11) * 0.09}s` }}
          />
        ))}
      </g>
      <text x="83" y="214" textAnchor="middle" fill="#a1a1aa" fontSize="9.5" fontFamily="ui-monospace, monospace">12,480 tokens</text>

      <g transform="translate(150, 126)">
        <path d="M0 4 L14 4" stroke="#ff6b35" strokeWidth="2.2" />
        <path d="M8 -2 L14 4 L8 10" stroke="#ff6b35" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="7" y="-10" textAnchor="middle" fill="#ff6b35" fontSize="10" fontWeight="800">-85%</text>
      </g>

      {/* AXTree — the page compressed down to a semantic skeleton */}
      <rect x="179" y="30" width="122" height="200" rx="10" fill="#ffffff" stroke="#d4d4d8" />
      <text x="240" y="52" textAnchor="middle" fill="#0a0a0a" fontSize="11" fontWeight="700">AXTree</text>
      <text x="240" y="67" textAnchor="middle" fill="#a1a1aa" fontSize="8.5">{t.skeleton}</text>
      <g className="tk-tree" fontFamily="ui-monospace, monospace" fontSize="8.5">
        {tree.map(([node], i) => (
          <text key={node} x="189" y={90 + i * 18} fill="#3f3f46" style={{ animationDelay: `${0.1 + i * 0.09}s` }}>
            {node}
          </text>
        ))}
      </g>
      <text x="240" y="214" textAnchor="middle" fill="#71717a" fontSize="9.5" fontFamily="ui-monospace, monospace">1,820 tokens</text>

      <g transform="translate(307, 126)">
        <path d="M0 4 L14 4" stroke="#ff6b35" strokeWidth="2.2" />
        <path d="M8 -2 L14 4 L8 10" stroke="#ff6b35" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="7" y="-10" textAnchor="middle" fill="#ff6b35" fontSize="10" fontWeight="800">{t.plus}</text>
      </g>

      {/* SemanticTree — the same skeleton, plus how the nodes relate */}
      <rect x="336" y="30" width="122" height="200" rx="10" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.4" />
      <text x="397" y="52" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">SemanticTree</text>
      <text x="397" y="67" textAnchor="middle" fill="#c2410c" fontSize="8.5">{t.structure}</text>
      <g className="tk-tree" fontFamily="ui-monospace, monospace" fontSize="8.5">
        {tree.map(([node, tag], i) => (
          <Fragment key={node}>
            <text x="346" y={90 + i * 18} fill="#3f3f46" style={{ animationDelay: `${0.55 + i * 0.09}s` }}>
              {node}
            </text>
            {tag && (
              <text
                x="448"
                y={90 + i * 18}
                textAnchor="end"
                fill="#ff6b35"
                fontWeight="700"
                style={{ animationDelay: `${0.62 + i * 0.09}s` }}
              >
                {tag}
              </text>
            )}
          </Fragment>
        ))}
      </g>
      <text x="397" y="214" textAnchor="middle" fill="#ff6b35" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace">1,960 tokens</text>

      {t.pills.map((label, i) => (
        <g key={label} transform={`translate(${22 + i * 157}, 252)`}>
          <rect width="122" height="26" rx="13" fill="#ffffff" stroke="#ff6b35" />
          <text x="61" y="17" textAnchor="middle" fill="#ff6b35" fontSize="9.5" fontWeight="700">{label}</text>
        </g>
      ))}
      <text x="240" y="302" textAnchor="middle" fill="#71717a" fontSize="10">{t.caption}</text>
    </svg>
  );
}

/* 03 — everything stays on the machine */
function IllusLocal({ t }: { t: Figures["local"] }) {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label={t.alt}>
      <defs>
        <radialGradient id="lc-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="lc-glow" cx="240" cy="150" r="140" fill="url(#lc-glow)" />

      {/* blocked outbound */}
      {[
        [78, 44],
        [366, 44],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`} opacity="0.65">
          <path d="M6 26 a18 18 0 0 1 0 -18 a18 18 0 0 1 36 0 a13 13 0 0 1 0 26 z" fill="#ececee" />
          <text x="24" y="48" textAnchor="middle" fill="#a1a1aa" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace">CLOUD</text>
          <g className="lc-block">
            <line x1="2" y1="4" x2="46" y2="34" stroke="#ff6b35" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="46" y1="4" x2="2" y2="34" stroke="#ff6b35" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>
      ))}

      {/* outbound attempts that bounce back */}
      <path className="lc-try" d="M200 118 C170 96 140 84 116 78" stroke="#ff6b35" strokeWidth="1.8" fill="none" strokeDasharray="4 5" />
      <path className="lc-try lc-try-2" d="M282 118 C312 96 342 84 366 78" stroke="#ff6b35" strokeWidth="1.8" fill="none" strokeDasharray="4 5" />

      {/* device */}
      <g transform="translate(178, 106)">
        <rect width="124" height="86" rx="9" fill="#0a0a0a" />
        <rect x="7" y="7" width="110" height="72" rx="5" fill="#1c1c20" />
        <rect x="16" y="16" width="58" height="7" rx="3.5" fill="#ff6b35" />
        <rect className="lc-line" x="16" y="30" width="42" height="5" rx="2.5" fill="#3f3f46" />
        <rect className="lc-line lc-line-2" x="16" y="40" width="56" height="5" rx="2.5" fill="#3f3f46" />
        <rect className="lc-line lc-line-3" x="16" y="50" width="36" height="5" rx="2.5" fill="#3f3f46" />
        <rect x="16" y="62" width="32" height="9" rx="4.5" fill="#ff6b35" opacity="0.65" />
        <rect x="52" y="62" width="24" height="9" rx="4.5" fill="#3f3f46" />
        <g className="lc-shield" transform="translate(100, 22)">
          <path d="M0 -9 l9 4.2 v6.3 c0 4.6 -3.9 8 -9 9 -5.1 -1 -9 -4.4 -9 -9 v-6.3z" fill="#ff6b35" />
          <path d="M-3.6 0.4 l2.4 2.4 l4.8 -4.8" stroke="#0a0a0a" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <rect x="152" y="98" width="176" height="102" rx="14" fill="none" stroke="#ff6b35" strokeWidth="1.6" strokeDasharray="7 6" className="lc-fence" />

      <text x="240" y="228" textAnchor="middle" fill="#ff6b35" fontSize="13" fontWeight="800" fontFamily="ui-monospace, monospace">100% LOCAL</text>
      <text x="240" y="248" textAnchor="middle" fill="#71717a" fontSize="10.5">{t.assets}</text>
      <g transform="translate(130, 268)">
        <rect width="220" height="30" rx="15" fill="#0a0a0a" />
        <text x="110" y="20" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="600">{t.banner}</text>
      </g>
    </svg>
  );
}

/* 05 — fingerprint / IP matrix */
function IllusFingerprint({ t }: { t: Figures["fingerprint"] }) {
  const palette = ["#ff6b35", "#38bdf8", "#10b981", "#a855f7"];
  return (
    <svg viewBox="0 0 480 336" className="ill-svg" role="img" aria-label={t.alt}>
      {Array.from({ length: 3 }).flatMap((_, row) =>
        Array.from({ length: 4 }).map((_, col) => {
          const x = 26 + col * 110;
          const y = 26 + row * 82;
          const accent = palette[col];
          const delay = (row * 4 + col) * 0.055;
          return (
            <g key={`${row}-${col}`} className="fp-tile" style={{ animationDelay: `${delay}s` }}>
              <rect x={x} y={y} width="96" height="66" rx="8" fill="#ffffff" stroke="#e4e4e7" />
              <rect x={x + 6} y={y + 6} width="84" height="15" rx="4" fill={accent} opacity="0.1" />
              <circle cx={x + 16} cy={y + 13.5} r="4" fill={accent} />
              <rect x={x + 26} y={y + 11} width="34" height="2.4" rx="1.2" fill={accent} opacity="0.55" />
              <rect x={x + 26} y={y + 16} width="22" height="2.4" rx="1.2" fill={accent} opacity="0.35" />
              <rect x={x + 6} y={y + 28} width="84" height="2" rx="1" fill="#eeeef0" />
              <rect x={x + 6} y={y + 36} width="58" height="3.4" rx="1.7" fill="#0a0a0a" opacity="0.68" />
              <rect x={x + 6} y={y + 45} width="78" height="2" rx="1" fill="#eeeef0" />
              <rect x={x + 6} y={y + 52} width="46" height="2" rx="1" fill="#eeeef0" />
              <g className="fp-ring" style={{ animationDelay: `${delay + 0.4}s` }} transform={`translate(${x + 80}, ${y + 50})`}>
                <circle r="8" fill="#ffffff" stroke={accent} strokeWidth="1.6" />
                <path d="M-4 -1.6 a4 4 0 0 1 8 0 M-4 1.8 a4 4 0 0 0 8 0" stroke={accent} strokeWidth="1.1" fill="none" />
              </g>
            </g>
          );
        })
      )}
      {t.cities.map((label, i) => (
        <text key={label} x={74 + i * 110} y="294" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="ui-monospace, monospace">
          {label}
        </text>
      ))}
      <text x="240" y="326" textAnchor="middle" fill="#a1a1aa" fontSize="9.5">{t.caption}</text>
    </svg>
  );
}

/* 04 — task run distilled into a reusable skill */
function IllusSkill({ t }: { t: Figures["skill"] }) {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label={t.alt}>
      <defs>
        <linearGradient id="sk-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff8a4a" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        <marker id="sk-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#ff6b35" />
        </marker>
      </defs>

      <g transform="translate(20, 52)">
        <rect width="134" height="116" rx="11" fill="#f6f6f7" stroke="#e4e4e7" />
        <text x="67" y="26" textAnchor="middle" fill="#0a0a0a" fontSize="11" fontWeight="700">{t.run}</text>
        <text x="67" y="42" textAnchor="middle" fill="#71717a" fontSize="9.5">WebCross Harness</text>
        {["goto(url)", "click(.btn)", "extract(dom)", "wait(200ms)"].map((line, i) => (
          <g key={line} transform={`translate(16, ${58 + i * 15})`}>
            <g className="sk-line" style={{ animationDelay: `${i * 0.16}s` }}>
              <circle r="3.2" fill="#0a0a0a" />
              <text x="11" y="3.4" fill="#3f3f46" fontSize="9" fontFamily="ui-monospace, monospace">{line}</text>
            </g>
          </g>
        ))}
      </g>
      <text x="87" y="188" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">01</text>

      <path d="M158 110 L186 110" stroke="#ff6b35" strokeWidth="2" markerEnd="url(#sk-arrow)" className="sk-flow" />

      <g transform="translate(190, 52)">
        <rect width="134" height="116" rx="11" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.4" />
        <text x="67" y="26" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">{t.distil}</text>
        <text x="67" y="42" textAnchor="middle" fill="#0a0a0a" fontSize="9.5" fontFamily="ui-monospace, monospace">amazon.patrol</text>
        {["input(query)", "pick(result[0])", "grab(price)", "grab(reviews)"].map((line, i) => (
          <g key={line} transform={`translate(16, ${58 + i * 15})`}>
            <g className="sk-line" style={{ animationDelay: `${0.6 + i * 0.16}s` }}>
              <circle r="3.2" fill="#ff6b35" />
              <text x="11" y="3.4" fill="#3f3f46" fontSize="9" fontFamily="ui-monospace, monospace">{line}</text>
            </g>
          </g>
        ))}
      </g>
      <text x="257" y="188" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">02</text>

      <path d="M328 110 L356 110" stroke="#ff6b35" strokeWidth="2" markerEnd="url(#sk-arrow)" className="sk-flow sk-flow-2" />

      <g transform="translate(360, 52)">
        <rect width="100" height="116" rx="11" fill="#0a0a0a" />
        <text x="50" y="26" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">{t.reuse}</text>
        <g className="sk-replay" transform="translate(50, 62)">
          <circle r="21" fill="none" stroke="#2c2c31" strokeWidth="3" />
          <circle className="sk-replay-arc" r="21" fill="none" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" />
          <text textAnchor="middle" y="5" fill="#ffffff" fontSize="14" fontWeight="800" fontFamily="ui-monospace, monospace">-80%</text>
        </g>
        <text x="50" y="102" textAnchor="middle" fill="#ffffff" fontSize="9" opacity="0.55">{t.perRun}</text>
      </g>
      <text x="410" y="188" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">03</text>

      <g transform="translate(20, 232)">
        <text fill="#71717a" fontSize="10">{t.first}</text>
        <rect x="0" y="12" width="440" height="12" rx="6" fill="#f0f0f2" />
        <rect x="0" y="12" width="440" height="12" rx="6" fill="#d4d4d8" />
        <text x="440" y="9" textAnchor="end" fill="#a1a1aa" fontSize="10" fontFamily="ui-monospace, monospace">12,480 tokens</text>
      </g>
      <g transform="translate(20, 274)">
        <text fill="#ff6b35" fontSize="10" fontWeight="700">{t.repeat}</text>
        <rect x="0" y="12" width="440" height="12" rx="6" fill="#f0f0f2" />
        <rect className="sk-saving" x="0" y="12" height="12" rx="6" fill="url(#sk-bar)" />
        <text x="440" y="9" textAnchor="end" fill="#ff6b35" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">2,480 tokens</text>
      </g>
    </svg>
  );
}

/* 06 — human takeover on 2FA, then resume */
function IllusTakeover({ t }: { t: Figures["takeover"] }) {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label={t.alt}>
      <line x1="52" y1="34" x2="52" y2="286" stroke="#e8e8ea" strokeWidth="2" />
      <line className="tv-progress" x1="52" y1="34" x2="52" y2="286" stroke="#ff6b35" strokeWidth="2" />

      <circle cx="52" cy="52" r="6" fill="#ff6b35" />
      <text x="74" y="48" fill="#0a0a0a" fontSize="11.5" fontWeight="700">{t.running}</text>
      <text x="74" y="66" fill="#71717a" fontSize="10">{t.runningNote}</text>
      <g transform="translate(74, 76)">
        <rect width="336" height="8" rx="4" fill="#f0f0f2" />
        <rect className="tv-run" width="336" height="8" rx="4" fill="#d4d4d8" />
      </g>

      <circle className="tv-alert" cx="52" cy="164" r="8" fill="#ff6b35" stroke="#ffffff" strokeWidth="2.4" />
      <g transform="translate(74, 106)">
       <g className="tv-card">
        <rect width="336" height="112" rx="11" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.4" />
        <text x="18" y="27" fill="#ff6b35" fontSize="11.5" fontWeight="800">{t.prompt}</text>
        <text x="18" y="46" fill="#3f3f46" fontSize="10">{t.promptNote}</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(${18 + i * 34}, 58)`}>
            <rect width="26" height="30" rx="6" fill="#ffffff" stroke="#ff6b35" />
            <text className="tv-digit" x="13" y="21" textAnchor="middle" fill="#0a0a0a" fontSize="13" fontWeight="700" fontFamily="ui-monospace, monospace" style={{ animationDelay: `${i * 0.07}s` }}>
              {[4, 8, 1, 6, 0, 3][i]}
            </text>
          </g>
        ))}
        <g transform="translate(240, 62)">
          <g className="tv-confirm">
            <rect width="80" height="24" rx="12" fill="#ff6b35" />
            <text x="40" y="16" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700">{t.verified}</text>
          </g>
        </g>
       </g>
      </g>
      <text x="74" y="236" fill="#a1a1aa" fontSize="9.5" fontFamily="ui-monospace, monospace">{t.latency}</text>

      <circle className="tv-resume" cx="52" cy="272" r="6" fill="#10b981" />
      <text x="74" y="268" fill="#0a0a0a" fontSize="11.5" fontWeight="700">{t.resume}</text>
      <text x="74" y="286" fill="#71717a" fontSize="10">{t.resumeNote}</text>
    </svg>
  );
}
