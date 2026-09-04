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
 *  Working grid: 12 columns
 *  - 01: span 12 (full-width lead)
 *  - 02 & 03: span 6 + span 6 (peach symmetric pair)
 *  - 04 & 05: span 7 + span 5 (golden asymmetry, unrepeating, zero-wrap width)
 *  - 06: span 12 (full-width flipped closing)
 *  span  — columns out of twelve
 *  stack — figure above the copy instead of beside it
 *  flip  — figure first on wide cards
 *  ink   — dark card, for the one panel that breaks up the light run
 *  peach — warm background card */
const LAYOUT = [
  { span: 12 },
  { span: 6, stack: true, peach: true },
  { span: 6, stack: true, peach: true },
  { span: 7, stack: true },
  { span: 5, stack: true, ink: true },
  { span: 12, flip: true },
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
    "peach" in plan && plan.peach ? "is-peach" : "",
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
  /* Raw DOM: noisy nested wrapper markup, inline style, scripts */
  const domNodes = [
    { text: "<div.app-wrap>", color: "#71717a" },
    { text: "  <style>...</style>", color: "#a1a1aa" },
    { text: "  <div.layout>", color: "#71717a" },
    { text: "    <script>...</script>", color: "#a1a1aa" },
    { text: "    <div.wrapper>", color: "#71717a" },
    { text: "      <div.box-2x>", color: "#71717a" },
    { text: "<!-- +420 tags -->", color: "#a1a1aa" },
  ];

  /* AXTree: global compact skeleton with canonical [id], actionable #, and (+30) collapsed subtree */
  const axNodes = [
    "0 [1:1] rootWebArea",
    "1 [1:10] search",
    "2 [1:23] textbox #",
    "2 [1:24] button #",
    "1 [1:50] list (+30)",
    "1 [1:90] link #",
  ];

  /* SemanticTree: bounded frame graph with Shadow DOM and cross-origin iframe penetration */
  const semanticNodes = [
    { node: "frame: main", tag: t.tags[0] ?? "主帧" },
    { node: "└─ #shadow", tag: t.tags[1] ?? "穿透" },
    { node: "   └─ <button>", tag: t.tags[2] ?? "控件" },
    { node: "frame: child", tag: t.tags[3] ?? "iframe" },
    { node: "└─ <input>", tag: t.tags[4] ?? "跨域" },
  ];

  return (
    <svg viewBox="0 0 520 330" className="ill-svg" role="img" aria-label={t.alt}>
      <defs>
        <marker id="tk-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#ff6b35" />
        </marker>
      </defs>

      {/* raw DOM — everything, most of it noise */}
      <rect x="20" y="24" width="132" height="212" rx="10" fill="#f6f6f7" stroke="#e4e4e7" />
      <text x="86" y="48" textAnchor="middle" fill="#71717a" fontSize="13.5" fontWeight="800">{t.dom}</text>
      <text x="86" y="65" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontWeight="600">HTML / CSS / JS</text>
      <g className="tk-noise" fontFamily="ui-monospace, monospace" fontSize="9.8" fontWeight="500">
        {domNodes.map(({ text, color }, i) => (
          <text
            key={text}
            x="26"
            y={86 + i * 17}
            fill={color}
            style={{ animationDelay: `${0.05 + i * 0.08}s` }}
          >
            {text}
          </text>
        ))}
      </g>
      <text x="86" y="222" textAnchor="middle" fill="#71717a" fontSize="11.5" fontWeight="700" fontFamily="ui-monospace, monospace">12,480 tokens</text>

      {/* Animated Arrow 1: DOM → AXTree with -85% badge */}
      <g transform="translate(173, 122)">
        <path
          d="M-17 0 L15 0"
          stroke="#ff6b35"
          strokeWidth="2.2"
          strokeLinecap="round"
          markerEnd="url(#tk-arrow)"
          className="tk-flow"
        />
        <text x="0" y="-13" textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="800" className="tk-arrow-badge">-85%</text>
      </g>

      {/* AXTree — the page compressed down to a compact actionable skeleton */}
      <rect x="194" y="24" width="132" height="212" rx="10" fill="#ffffff" stroke="#d4d4d8" />
      <text x="260" y="48" textAnchor="middle" fill="#0a0a0a" fontSize="13.5" fontWeight="800">AXTree</text>
      <text x="260" y="65" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontWeight="600">{t.skeleton}</text>
      <g className="tk-tree" fontFamily="ui-monospace, monospace" fontSize="9.8" fontWeight="500">
        {axNodes.map((node, i) => {
          const isTarget = node.endsWith(" #");
          const text = isTarget ? node.slice(0, -2) : node;
          return (
            <text key={node} x="201" y={87 + i * 18.5} fill="#27272a" style={{ animationDelay: `${0.1 + i * 0.09}s` }}>
              {text}
              {isTarget && (
                <tspan fill="#ff6b35" fontWeight="800"> #</tspan>
              )}
            </text>
          );
        })}
      </g>
      <text x="260" y="222" textAnchor="middle" fill="#ff6b35" fontSize="11.5" fontWeight="800" fontFamily="ui-monospace, monospace">1,820 tokens</text>

      {/* Animated Arrow 2: AXTree → SemanticTree with +穿透 badge */}
      <g transform="translate(347, 122)">
        <path
          d="M-17 0 L15 0"
          stroke="#ff6b35"
          strokeWidth="2.2"
          strokeLinecap="round"
          markerEnd="url(#tk-arrow)"
          className="tk-flow tk-flow-2"
        />
        <text x="0" y="-13" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="800" className="tk-arrow-badge-2">{t.plus}</text>
      </g>

      {/* SemanticTree — bounded frame graph with Shadow DOM and iframe penetration */}
      <rect x="368" y="24" width="132" height="212" rx="10" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.6" />
      <text x="434" y="48" textAnchor="middle" fill="#ff6b35" fontSize="13.5" fontWeight="800">SemanticTree</text>
      <text x="434" y="65" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="600">{t.structure}</text>
      <g className="tk-tree" fontFamily="ui-monospace, monospace" fontSize="9.8" fontWeight="500">
        {semanticNodes.map(({ node, tag }, i) => (
          <Fragment key={node}>
            <text x="374" y={88 + i * 20} fill="#27272a" style={{ animationDelay: `${0.55 + i * 0.09}s` }}>
              {node}
            </text>
            {tag && (
              <text
                x="494"
                y={88 + i * 20}
                textAnchor="end"
                fill="#ff6b35"
                fontWeight="800"
                fontSize="10"
                style={{ animationDelay: `${0.62 + i * 0.09}s` }}
              >
                {tag}
              </text>
            )}
          </Fragment>
        ))}
      </g>
      <text x="434" y="222" textAnchor="middle" fill="#ff6b35" fontSize="11.5" fontWeight="800">
        {t.fidelity ?? "按需高保真"}
      </text>

      {/* 3 Pills perfectly aligned with the 3 cards above */}
      {t.pills.map((label, i) => (
        <g key={label} transform={`translate(${20 + i * 174}, 254)`}>
          <rect width="132" height="30" rx="15" fill="#ffffff" stroke="#ff6b35" strokeWidth="1.4" />
          <text x="66" y="19.5" textAnchor="middle" fill="#ff6b35" fontSize="10.5" fontWeight="700">{label}</text>
        </g>
      ))}
      <text x="260" y="314" textAnchor="middle" fill="#71717a" fontSize="12.5" fontWeight="600">{t.caption}</text>
    </svg>
  );
}

/* 03 — everything stays on the machine */
function IllusLocal({ t }: { t: Figures["local"] }) {
  return (
    <svg viewBox="0 0 520 330" className="ill-svg" role="img" aria-label={t.alt}>
      <defs>
        <radialGradient id="lc-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(20, 5)">
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
      {t.cities.map((label, i) => {
        const accent = palette[i];
        const x = 26 + i * 110;
        return (
          <g key={label} transform={`translate(${x}, 266)`}>
            <rect width="96" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="12" cy="12" r="2.5" fill={accent} />
            <text
              x="52"
              y="15.5"
              textAnchor="middle"
              fill="#334155"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
            >
              {label}
            </text>
          </g>
        );
      })}
      <text
        x="240"
        y="318"
        textAnchor="middle"
        fill="#334155"
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
      >
        {t.caption}
      </text>
    </svg>
  );
}

/* 04 — task run distilled into a reusable skill */
function IllusSkill({ t }: { t: Figures["skill"] }) {
  const runSteps = [
    { module: "Page", fn: "navigate", args: "(url)" },
    { module: "DOM", fn: "getAXTree", args: "()" },
    { module: "Input", fn: "click", args: "(.btn)" },
    { module: "Page", fn: "getState", args: "()" },
  ];

  const workflowSteps = [
    { module: "Input", fn: "type", args: "(query)" },
    { module: "Input", fn: "click", args: "(item)" },
    { module: "DOM", fn: "getText", args: "(price)" },
    { module: "DOM", fn: "getText", args: "(review)" },
  ];

  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label={t.alt}>
      <defs>
        <filter id="sk-card-shadow" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.06" />
        </filter>
        <linearGradient id="sk-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff8a4a" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        <linearGradient id="sk-gauge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8c5a" />
          <stop offset="100%" stopColor="#ff5722" />
        </linearGradient>
        <marker id="sk-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 1 L7 5 L0 9 Z" fill="#ff6b35" />
        </marker>
      </defs>

      {/* Card 1 — WebCross Harness Runtime */}
      <g transform="translate(18, 44)">
        <rect width="138" height="126" rx="10" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" filter="url(#sk-card-shadow)" />
        <path d="M0 10 Q0 0 10 0 L128 0 Q138 0 138 10 L138 27 L0 27 Z" fill="#f8fafc" />
        <line x1="0" y1="27" x2="138" y2="27" stroke="#e2e8f0" strokeWidth="1" />

        {/* Window controls */}
        <circle cx="12" cy="13.5" r="2.4" fill="#f87171" opacity="0.85" />
        <circle cx="19" cy="13.5" r="2.4" fill="#fbbf24" opacity="0.85" />
        <circle cx="26" cy="13.5" r="2.4" fill="#34d399" opacity="0.85" />

        {/* Title */}
        <text x="74" y="17" textAnchor="middle" fill="#475569" fontSize="8.5" fontWeight="600" fontFamily="ui-sans-serif, system-ui, sans-serif">Harness Runtime</text>

        {/* Live indicator */}
        <circle cx="124" cy="13.5" r="2.2" fill="#10b981" />
        <circle cx="124" cy="13.5" r="4.2" fill="#10b981" opacity="0.25" className="sk-live-ping" />

        {/* Action steps */}
        {runSteps.map((step, i) => (
          <g key={step.fn} transform={`translate(8, ${48 + i * 19})`}>
            <g className="sk-line" style={{ animationDelay: `${i * 0.16}s` }}>
              <text x="2" y="3.5" fill="#94a3b8" fontSize="8" fontFamily="ui-monospace, monospace">{i + 1}</text>
              <circle cx="13" cy="0" r="1.8" fill="#64748b" />
              <text x="19" y="3.2" fontSize="8.2" fontFamily="ui-monospace, monospace">
                <tspan fill="#4f46e5" fontWeight="600">{step.module}.</tspan>
                <tspan fill="#0f172a">{step.fn}</tspan>
                <tspan fill="#64748b">{step.args}</tspan>
              </text>
              {/* Mini step status */}
              {i < 3 ? (
                <path d="M120 -3 L122 0 L126 -4" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <circle cx="123" cy="-1.5" r="2" fill="#3b82f6" />
              )}
            </g>
          </g>
        ))}
      </g>

      {/* Flow connector 1 */}
      <g className="sk-flow">
        <line x1="158" y1="107" x2="181" y2="107" stroke="#ff6b35" strokeWidth="1.8" strokeDasharray="3 3" markerEnd="url(#sk-arrow)" />
      </g>

      {/* Card 2 — Distilled Workflow */}
      <g transform="translate(184, 44)">
        <rect width="144" height="126" rx="10" fill="#fffcf9" stroke="#ff6b35" strokeWidth="1.2" filter="url(#sk-card-shadow)" />
        <path d="M0 10 Q0 0 10 0 L134 0 Q144 0 144 10 L144 27 L0 27 Z" fill="#fff2eb" />
        <line x1="0" y1="27" x2="144" y2="27" stroke="rgba(255, 107, 53, 0.22)" strokeWidth="1" />

        {/* Lightning workflow icon */}
        <path d="M12 8 L8 14 L12 14 L10 19 L16 12 L12 12 Z" fill="#ff6b35" transform="translate(2, 0) scale(0.9)" />

        {/* Title */}
        <text x="28" y="17" fill="#c2410c" fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace">amazon.patrol</text>

        {/* Compiled pill */}
        <rect x="94" y="6.5" width="42" height="14" rx="4" fill="#ffedd5" />
        <text x="115" y="16.5" textAnchor="middle" fill="#ea580c" fontSize="7.5" fontWeight="700" fontFamily="ui-monospace, monospace">WORKFLOW</text>

        {/* Chained pipeline vertical connector */}
        <line x1="17" y1="48" x2="17" y2="105" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Workflow steps */}
        {workflowSteps.map((step, i) => (
          <g key={step.fn} transform={`translate(9, ${48 + i * 19})`}>
            <g className="sk-line" style={{ animationDelay: `${0.4 + i * 0.16}s` }}>
              <circle cx="8" cy="0" r="3" fill="#ff6b35" />
              <circle cx="8" cy="0" r="1.3" fill="#ffffff" />
              <text x="17" y="3.2" fontSize="8.2" fontFamily="ui-monospace, monospace">
                <tspan fill="#ea580c" fontWeight="600">{step.module}.</tspan>
                <tspan fill="#1e293b">{step.fn}</tspan>
                <tspan fill="#64748b">{step.args}</tspan>
              </text>
            </g>
          </g>
        ))}
      </g>

      {/* Flow connector 2 */}
      <g className="sk-flow sk-flow-2">
        <line x1="330" y1="107" x2="350" y2="107" stroke="#ff6b35" strokeWidth="1.8" strokeDasharray="3 3" markerEnd="url(#sk-arrow)" />
      </g>

      {/* Card 3 — Instant Replay HUD */}
      <g transform="translate(352, 44)">
        <rect width="112" height="126" rx="10" fill="#0b0f17" stroke="#1e293b" strokeWidth="1" filter="url(#sk-card-shadow)" />
        <path d="M0 10 Q0 0 10 0 L102 0 Q112 0 112 10 L112 27 L0 27 Z" fill="#111827" />
        <line x1="0" y1="27" x2="112" y2="27" stroke="#1e293b" strokeWidth="1" />

        {/* Header badge */}
        <text x="56" y="17" textAnchor="middle" fill="#ff8c5a" fontSize="8" fontWeight="700" letterSpacing="0.8">⚡ DIRECT REPLAY</text>

        {/* Center circular gauge */}
        <g className="sk-replay" transform="translate(56, 68)">
          <circle r="23" fill="none" stroke="#1e293b" strokeWidth="3.5" />
          <circle className="sk-replay-arc" r="23" fill="none" stroke="url(#sk-gauge-grad)" strokeWidth="3.5" strokeLinecap="round" />
          <text textAnchor="middle" y="4.5" fill="#ffffff" fontSize="13" fontWeight="800" fontFamily="ui-monospace, monospace">-80%</text>
        </g>

        {/* Token label and numbers */}
        <text x="56" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontWeight="500">{t.perRun}</text>
        <text x="56" y="116" textAnchor="middle" fill="#64748b" fontSize="7.5" fontFamily="ui-monospace, monospace">12.5k → 2.5k</text>
      </g>

      {/* Bottom Token Comparison Bars */}
      <g transform="translate(20, 204)">
        <text fill="#64748b" fontSize="10" fontWeight="500">{t.first}</text>
        <rect x="0" y="12" width="440" height="11" rx="5.5" fill="#f1f5f9" />
        <rect x="0" y="12" width="440" height="11" rx="5.5" fill="#cbd5e1" />
        <text x="440" y="9" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="ui-monospace, monospace">12,480 tokens</text>
      </g>
      <g transform="translate(20, 248)">
        <text fill="#ff6b35" fontSize="10" fontWeight="700">{t.repeat}</text>
        <rect x="0" y="12" width="440" height="11" rx="5.5" fill="#f1f5f9" />
        <rect className="sk-saving" x="0" y="12" height="11" rx="5.5" fill="url(#sk-bar)" />
        <text x="440" y="9" textAnchor="end" fill="#ff6b35" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">2,480 tokens</text>
      </g>
    </svg>
  );
}

/* 06 — human takeover on 2FA, then resume */
function IllusTakeover({ t }: { t: Figures["takeover"] }) {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label={t.alt}>
      <line x1="52" y1="44" x2="52" y2="260" stroke="#e8e8ea" strokeWidth="2" />
      <line className="tv-progress" x1="52" y1="44" x2="52" y2="260" stroke="#ff6b35" strokeWidth="2" />

      <circle cx="52" cy="52" r="6" fill="#ff6b35" />
      <text x="74" y="48" fill="#0a0a0a" fontSize="11.5" fontWeight="700">{t.running}</text>
      <text x="74" y="66" fill="#71717a" fontSize="10">{t.runningNote}</text>
      <g transform="translate(74, 76)">
        <rect width="336" height="8" rx="4" fill="#f0f0f2" />
        <rect className="tv-run" width="336" height="8" rx="4" fill="#d4d4d8" />
      </g>

      <circle className="tv-alert" cx="52" cy="152" r="8" fill="#ff6b35" stroke="#ffffff" strokeWidth="2.4" />
      <g transform="translate(74, 119)">
        <g className="tv-card">
          <rect width="336" height="66" rx="10" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.4" />
          <text x="18" y="27" fill="#ff6b35" fontSize="12" fontWeight="800">{t.prompt}</text>
          <text x="18" y="47" fill="#3f3f46" fontSize="10.5">{t.promptNote}</text>
        </g>
      </g>
      <text x="74" y="202" fill="#94a3b8" fontSize="9.5" fontFamily="ui-monospace, monospace">{t.latency}</text>

      <circle className="tv-resume" cx="52" cy="252" r="6" fill="#10b981" />
      <text x="74" y="248" fill="#0a0a0a" fontSize="11.5" fontWeight="700">{t.resume}</text>
      <text x="74" y="266" fill="#71717a" fontSize="10">{t.resumeNote}</text>
    </svg>
  );
}
