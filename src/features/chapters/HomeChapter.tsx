"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ComparisonFeature, HomeCopy } from "@/content/home";
import { chapterPath } from "@/content/chapters";
import type { Locale } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { useDemoPlayback } from "@/features/exhibition/useDemoPlayback";
import { WorkflowDemo } from "./WorkflowDemo";
import { AccountIsolation } from "./AccountIsolation";
import "./home-chapter.css";

/**
 * Homepage layout.
 *
 * The page opens on one sentence and one pair of buttons, then hands over
 * immediately to the workflow demo: the hero no longer carries an illustration
 * of its own, so the first thing a reader sees after the headline is the
 * product actually running a task. Sections then argue the same story in order
 * (workflow → accounts → agents / environments → marketplace → comparison →
 * FAQ), each with a centred heading; only the hero keeps a (small) footnote.
 */

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9m-3-3 3 3 3-3M4 15v2h12v-2" /></svg>;
}

function Check() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>;
}

/** Arms `[data-reveal]` blocks below the fold and reveals each once as it
 *  scrolls in. Blocks already on screen at mount are marked "in" without
 *  animating, so nothing flashes in; reduced-motion and no-JS never get the
 *  hidden state at all. */
function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    for (const node of nodes) {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
        node.dataset.reveal = "in";
      } else {
        node.dataset.reveal = "armed";
        observer.observe(node);
      }
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

function AgentGlyph({ name }: { name: string }) {
  if (name === "Claude Code") return <Image src="/brand/claude.svg" alt="" width={20} height={20} unoptimized />;
  if (name === "Codex") return <Image className="agent-codex-icon" src="/brand/codex.svg" alt="" width={19} height={19} unoptimized />;
  if (name === "WebCross AI") return <Image className="agent-webcross-icon" src="/brand/webcross-icon.webp" alt="" width={440} height={330} unoptimized />;
  return <span className="agent-skill-glyph">{"{ }"}</span>;
}

function LockMark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="9" width="12" height="8" rx="2" /><path d="M7 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

function ShieldMark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 4 5.2v4.4c0 3.6 2.4 5.8 6 7.6 3.6-1.8 6-4 6-7.6V5.2Z" /><path d="m7.5 10 1.7 1.7 3.4-3.8" /></svg>;
}

function Environments({ copy }: { copy: HomeCopy }) {
  const environment = copy.environment;
  const [activeAccount, setActiveAccount] = useState(0);
  const account = environment.accounts[activeAccount];
  const labels = environment.accountLabels;
  const flowRef = useDemoPlayback<HTMLOListElement>();

  return (
    <section className="home-section environment-section" id="environment">
      <div className="home-section-heading split-heading" data-reveal><h2>{environment.title}</h2><p>{environment.description}</p></div>
      <div className="environment-layout">
        <article className="agent-connections" data-reveal>
          <h3>{environment.agentsTitle}</h3>
          <p>{environment.agentsText}</p>
          <div className="agent-connection-visual">
            <div className="agent-list">
              {environment.agents.map((agent, index) => (
                <div className={`agent-row agent-row-${index}`} key={agent}>
                  <span className={`agent-symbol agent-symbol-${index}`}><AgentGlyph name={agent} /></span>
                  <strong>{agent}</strong>
                  <small>{index === environment.agents.length - 1 ? "CONNECT" : "Agent"}</small>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="account-environments" data-reveal>
          <h3>{environment.accountsTitle}</h3>
          <p>{environment.accountsText}</p>
          <div className="account-picker" role="group" aria-label={environment.accountsTitle}>
            {environment.accounts.map((item, index) => (
              <button type="button" key={item.name} aria-pressed={index === activeAccount} onClick={() => setActiveAccount(index)}>
                {item.name}
              </button>
            ))}
          </div>
          <dl className="account-session-details" aria-live="polite" aria-atomic="true">
            <div><dt>{labels.login}</dt><dd key={account.account}>{account.account}</dd></div>
            <div><dt>{labels.session}</dt><dd key={account.session}>{account.session}</dd></div>
            <div><dt>{labels.network}</dt><dd key={account.name}>{account.ip}<small>{account.region}</small></dd></div>
            <div><dt>{labels.fingerprint}</dt><dd key={account.fingerprint}>{account.fingerprint}</dd></div>
          </dl>
        </article>

        <article className="local-sessions" data-reveal>
          <h3>{environment.localTitle}</h3>
          <div className="local-copy-lines">
            {environment.localLines.map((line) => <span key={line}>{line}</span>)}
          </div>
          <ol className="local-flow" ref={flowRef} aria-label={environment.localTitle}>
            <li className="local-flow-node local-flow-task">
              <span className="local-flow-icon"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 5h12M4 10h8M4 15h5" /></svg></span>
              <strong>{environment.localFlow.task}</strong><small>{environment.localFlow.taskMeta}</small>
            </li>
            <li className="local-flow-node local-flow-harness">
              <span className="local-flow-icon"><Image src="/brand/webcross-icon.webp" alt="" width={28} height={21} unoptimized /></span>
              <strong>{environment.localFlow.harness}</strong><small>{environment.localFlow.harnessMeta}</small>
            </li>
            <li className="local-flow-approval"><span><ShieldMark />{environment.localFlow.gate}</span></li>
            <li className="local-flow-node local-flow-browser">
              <span className="local-flow-icon"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="3" width="16" height="14" rx="3" /><path d="M2 7.5h16" /></svg></span>
              <strong>{environment.localFlow.browser}</strong><small>{environment.localFlow.browserMeta}</small>
            </li>
            <li className="local-flow-sites">
              <strong>{environment.localFlow.sitesLabel}</strong>
              <ul>{environment.localFlow.sites.map((site) => <li key={site}><span aria-hidden="true">✓</span>{site}</li>)}</ul>
            </li>
          </ol>
          <div className="local-no-touch"><ShieldMark /><span>{environment.localNotice}</span></div>
        </article>
      </div>
    </section>
  );
}

const PLATFORM_ICONS: Record<string, string[]> = {
  amazon: ["/brand/platforms/amazon.png"],
  "tiktok-shop": ["/brand/platforms/tiktok.svg"],
  airbnb: ["/brand/platforms/airbnb.svg"],
  youtube: ["/brand/platforms/youtube.svg"],
  reddit: ["/brand/platforms/reddit.svg"],
  x: ["/brand/platforms/x.svg"],
  whatsapp: ["/brand/platforms/whatsapp.svg"],
  facebook: ["/brand/platforms/facebook.svg"],
  instagram: ["/brand/platforms/instagram.svg"],
  linkedin: ["/brand/platforms/linkedin.png"],
  zillow: ["/brand/platforms/zillow.svg"],
  "google-bing-serp": ["/brand/platforms/google.svg", "/brand/platforms/bing.svg"],
};

function PlatformMark({ id }: { id: string }) {
  const icons = PLATFORM_ICONS[id] ?? [];
  return (
    <span className={`market-cat-icon${icons.length > 1 ? " is-dual" : ""}`}>
      {icons.map((icon) => <Image key={icon} src={icon} alt="" width={32} height={32} unoptimized />)}
    </span>
  );
}

function MarketGlyph({ index }: { index: number }) {
  const glyphs = [
    <><path d="M4 5h12l-5 5v5l-2-1v-4Z" /></>,
    <><path d="M4 5h12v8H9l-3 3v-3H4Z" /></>,
    <><path d="M6 4h8v13l-4-2.5L6 17Z" /></>,
    <><path d="m10 3 1.8 4.7L16 10l-4.2 2.3L10 17l-1.8-4.7L4 10l4.2-2.3Z" /></>,
  ];
  return <span className={`market-glyph market-glyph-${index % glyphs.length}`} aria-hidden="true"><svg viewBox="0 0 20 20">{glyphs[index % glyphs.length]}</svg></span>;
}

function SkillMarket({ copy }: { copy: HomeCopy }) {
  const market = copy.marketplace;
  const [active, setActive] = useState(0);
  const category = market.categories[active];
  return (
    <section className="home-section marketplace-section" id="marketplace">
      <div className="marketplace-inner">
        <header className="marketplace-heading" data-reveal>
          <h2>{market.title}</h2>
          <p>{market.description}</p>
          <span className="market-coming-badge"><LockMark />{market.comingSoon}</span>
        </header>

        <div className="market-window">
          <div className="market-window-bar">
            <span className="market-window-brand"><Image src="/brand/webcross-horizontal.webp" alt="" width={1200} height={314} /><b>MARKETPLACE</b></span>
            <div className="market-window-tools">
              <span className="market-window-dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
          </div>
          <div className="market-body">
            <aside className="market-sidebar">
              <div className="market-categories" role="tablist" aria-label={market.sidebarTitle}>
                {market.categories.map((item, index) => (
                  <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={item.id}>
                    <PlatformMark id={item.id} />
                    <strong>{item.name}</strong>
                    <small>{item.cards.length}</small>
                  </button>
                ))}
              </div>
            </aside>

            <div className="market-content">
              <div className="market-category-head">
                <h3>{category.name}</h3>
              </div>
              <div className="market-grid">
                {category.cards.map((item, index) => (
                  <article className="market-card" key={item.title}>
                    <div className="market-card-head">
                      <MarketGlyph index={index} />
                      <strong className="market-card-title">{item.title}</strong>
                    </div>
                    <span className="market-card-description">{item.description}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ComparisonValue = HomeCopy["comparison"]["dimensions"][number]["webcross"];

const featureIcons: Record<ComparisonFeature, { path: string; color: string }> = {
  tokens: { color: "#ba6b09", path: "M4 7a8 3 0 1 0 16 0 8 3 0 1 0-16 0Zm0 0v5c0 4 16 4 16 0V7M4 12v5c0 4 16 4 16 0v-5" },
  agents: { color: "#7943cc", path: "M8 3v5m8-5v5M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v4" },
  accounts: { color: "#1674b9", path: "M4 20v-2a5 5 0 0 1 10 0v2m2-7a5 5 0 0 1 5 5v2M5.5 7a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0Zm10-3a3.5 3.5 0 0 1 0 7" },
  fingerprint: { color: "#c03d89", path: "M4 12a8 8 0 0 1 16 0M6 17c1-2 1-3 1-5a5 5 0 0 1 10 0c0 4-1 7-2 9M9 20c2-3 3-6 3-8m8 3-1 4" },
  parallel: { color: "#3869c7", path: "M4 12h4c4 0 3-6 7-6h5m-3-3 3 3-3 3M8 12c4 0 3 6 7 6h5m-3-3 3 3-3 3" },
  foreground: { color: "#008378", path: "M3 4h18v13H3zM8 21h8m-4-4v4M4 8h16" },
  code: { color: "#9347b9", path: "m7 7-5 5 5 5m10-10 5 5-5 5m-4-14-2 18" },
  local: { color: "#16805e", path: "M3 14l3-9h12l3 9v5H3v-5Zm0 0h18m-5 2.5h2" },
  setup: { color: "#c95819", path: "M3 7h7m5 0h6M3 17h12m5 0h1M10 4h5v6h-5zM15 14h5v6h-5z" },
};

function ComparisonValueCell({ cell, supported, unsupported }: { cell: ComparisonValue; supported: string; unsupported: string }) {
  if (cell.mark) {
    const isCheck = cell.mark === "check";
    return (
      <span className={`comparison-value is-mark is-${cell.tone}`}>
        <b className={`comparison-mark ${isCheck ? "is-check" : "is-dash"}`} aria-label={isCheck ? supported : unsupported}>{isCheck ? <Check /> : "—"}</b>
      </span>
    );
  }
  return (
    <span className={`comparison-value is-${cell.tone}`}>
      <b>{cell.value}</b>
      {cell.note && <small>{cell.note}</small>}
    </span>
  );
}

function Comparison({ copy }: { copy: HomeCopy }) {
  const { supported, unsupported } = copy.comparison;
  return (
    <section className="home-section comparison-section" id="comparison">
      <header className="home-section-heading split-heading" data-reveal>
        <h2>{copy.comparison.title}</h2>
        <p>{copy.comparison.description}</p>
        <p>{copy.comparison.promo}</p>
      </header>
      <div className="comparison-matrix-wrap" data-reveal>
        <table className="comparison-matrix">
          <thead>
            <tr>
              <th className="comparison-dimension-head">{copy.comparison.dimension}</th>
              <th className="comparison-webcross-head"><strong>WebCross</strong><small>fork chromium</small></th>
              {copy.comparison.columns.map((column) => <th key={column.name}><strong>{column.name}</strong><small>{column.meta}</small></th>)}
            </tr>
          </thead>
          <tbody>
            {copy.comparison.dimensions.map((row, index) => (
              <tr key={row.feature} style={{ "--check-delay": `${120 + index * 45}ms` } as CSSProperties}>
                <th scope="row" className="comparison-dimension">
                  <span className="comparison-feature">
                    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: featureIcons[row.feature].color }}><path d={featureIcons[row.feature].path} /></svg>
                    {row.label}
                  </span>
                </th>
                <td className="comparison-webcross-cell"><ComparisonValueCell cell={row.webcross} supported={supported} unsupported={unsupported} /></td>
                {row.values.map((cell, i) => <td key={`${row.label}-${i}`}><ComparisonValueCell cell={cell} supported={supported} unsupported={unsupported} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="comparison-note">{copy.comparison.note}</p>
    </section>
  );
}

function FaqAndStart({ copy }: { copy: HomeCopy }) {
  return (
    <section className="home-section faq-start-section" id="faq">
      <div className="faq-column">
        <div className="home-section-heading" data-reveal>
          <h2>{copy.faq.title}</h2>
          {copy.faq.description && <p>{copy.faq.description}</p>}
        </div>
        <div className="home-faq-list">
          {copy.faq.items.map((item, index) => (
            <details key={item.q} open={index === 0}>
              <summary><span>{item.q}</span><i aria-hidden="true" /></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <Link className="faq-how-link" href="/solutions">
          <span className="faq-code-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="m7.5 8-4 4 4 4m9-8 4 4-4 4m-3-11-3 14" /></svg>
          </span>
          <span>{copy.common.how}</span>
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

export function HomeChapter({ copy, locale }: { copy: HomeCopy; locale: Locale }) {
  const revealRef = useSectionReveal();

  return (
    <article className={`home-v2 locale-${locale}`} ref={revealRef}>
      <div className="home-opening">
        <header className="home-hero">
          <div className="hero-copy">
            <h1>
              <span>{copy.hero.titleA}</span>{" "}
              <span><mark className="hero-highlight">{copy.hero.titleB}</mark><i className="hero-caret" aria-hidden="true" /></span>
            </h1>
            <div className="home-actions">
              <Link className="primary-button" href={chapterPath("download")}><DownloadIcon />{copy.common.download}</Link>
              <Link className="secondary-button" href={chapterPath("guide")}>{copy.common.guide}<Arrow /></Link>
            </div>
          </div>
        </header>
        <WorkflowDemo copy={copy} />
      </div>
      <AccountIsolation copy={copy} />
      <Environments copy={copy} />
      <SkillMarket copy={copy} />
      <Comparison copy={copy} />
      <FaqAndStart copy={copy} />
    </article>
  );
}
