"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { HomeCopy } from "@/content/home";
import { chapterPath } from "@/content/chapters";
import type { Locale } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { WorkflowDemo } from "./WorkflowDemo";
import { AccountIsolation } from "./AccountIsolation";
import { PixelScene } from "@/components/ui/PixelFolk";
import "./home-chapter.css";

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9m-3-3 3 3 3-3M4 15v2h12v-2" /></svg>;
}

function Check() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>;
}

function HeroFolk() {
  return <PixelScene className="hero-pixel-scene" />;
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

function FingerprintMark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8.5a6 6 0 0 1 12 0v4.2M7 10a3 3 0 0 1 6 0v4M10 10v5.5M4.5 12v3M15.5 12v3" /></svg>;
}

function ShieldMark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.8 4 5.2v4.4c0 3.6 2.4 5.8 6 7.6 3.6-1.8 6-4 6-7.6V5.2Z" /><path d="m7.5 10 1.7 1.7 3.4-3.8" /></svg>;
}

function Environments({ copy }: { copy: HomeCopy }) {
  const environment = copy.environment;
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
                  <small>{index === environment.agents.length - 1 ? "CONNECT" : agent === "WebCross AI" ? "AI" : "AGENT"}</small>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="account-environments" data-reveal>
          <h3>{environment.accountsTitle}</h3>
          <p>{environment.accountsText}</p>
          <div className="account-profile-list">
            {environment.accounts.map((item, index) => (
              <div className={`account-profile account-profile-${index}`} key={item.account}>
                <div className="account-profile-head">
                  <span className="account-profile-avatar">{String.fromCharCode(65 + index)}</span>
                  <div><strong>{item.account}</strong><small>{item.session}</small></div>
                  <span className="account-isolated"><LockMark />独立环境</span>
                </div>
                <div className="account-profile-network">
                  <span><i>IP</i>{item.ip}</span>
                  <span>{item.region}</span>
                </div>
                <div className="account-profile-fingerprint"><FingerprintMark /><span>浏览器指纹</span><strong>{item.fingerprint}</strong></div>
              </div>
            ))}
          </div>
        </article>

        <article className="local-sessions" data-reveal>
          <h3>{environment.localTitle}</h3>
          <div className="local-copy-lines">
            {environment.localLines.map((line) => <span key={line}>{line}</span>)}
          </div>
          <div className="local-pipeline">
            <div className="pipeline-step">
              <span className="pipeline-icon pipeline-icon-task" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M4 5h12M4 10h8M4 15h5" /></svg></span>
              <div className="pipeline-step-copy"><strong>{environment.localFlow.task}</strong><small>{environment.localFlow.taskMeta}</small></div>
            </div>
            <div className="pipeline-connector" aria-hidden="true"><i /><em /></div>
            <div className="pipeline-step">
              <span className="pipeline-icon pipeline-icon-harness" aria-hidden="true"><Image src="/brand/webcross-icon.webp" alt="" width={440} height={330} unoptimized /></span>
              <div className="pipeline-step-copy"><strong>{environment.localFlow.harness}</strong><small>{environment.localFlow.harnessMeta}</small></div>
            </div>
            <div className="pipeline-connector is-gate">
              <i /><em />
              <span className="pipeline-gate"><ShieldMark /></span>
              <b>{environment.localFlow.gate}</b>
            </div>
            <div className="pipeline-step">
              <span className="pipeline-icon pipeline-icon-browser" aria-hidden="true" />
              <div className="pipeline-step-copy"><strong>{environment.localFlow.browser}</strong><small>{environment.localFlow.browserMeta}</small></div>
            </div>
            <div className="pipeline-connector" aria-hidden="true"><i /><em /></div>
            <div className="pipeline-sites">
              <small>{environment.localFlow.sitesLabel}</small>
              <div>
                {environment.localFlow.sites.map((site) => (
                  <span key={site} className="pipeline-site"><b>✓</b>{site}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="local-no-touch"><ShieldMark /><span>WebCross 不接触你的数据</span></div>
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
  const [selected, setSelected] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const category = market.categories[active];
  const selectedCard = category.cards.find((card) => card.title === selected);
  const selectCategory = (index: number) => { setActive(index); setSelected(null); setDownloaded(null); };
  const download = () => {
    if (!selectedCard) return;
    setDownloaded(selectedCard.title);
    window.setTimeout(() => setDownloaded(null), 2600);
  };
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
              {selectedCard && (
                <motion.button type="button" className="market-download" onClick={download} initial={false} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: .96 }}>
                  <DownloadIcon /><span>下载 Skill</span>
                </motion.button>
              )}
              <span className="market-window-dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
          </div>
          <div className="market-body">
            <aside className="market-sidebar">
              <div className="market-categories" role="tablist" aria-label={market.sidebarTitle}>
                {market.categories.map((item, index) => (
                  <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => selectCategory(index)} key={item.id}>
                    <PlatformMark id={item.id} />
                    <strong>{item.name}</strong>
                    <small>{item.cards.length}</small>
                  </button>
                ))}
              </div>
            </aside>

            <div className="market-content">
              <div className="market-category-head"><h3>{category.name}</h3></div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div className="market-grid" key={category.id} initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                  {category.cards.map((card, index) => (
                    <div
                      role="button"
                      tabIndex={0}
                      className={`market-card${selected === card.title ? " is-selected" : ""}`}
                      style={{ "--market-i": index } as CSSProperties}
                      aria-pressed={selected === card.title}
                      onClick={() => setSelected(selected === card.title ? null : card.title)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelected(selected === card.title ? null : card.title);
                        }
                      }}
                      key={card.title}
                    >
                      <div className="market-card-head"><MarketGlyph index={index} /><span className="market-card-kind">{market.filters.skill}</span><span className="market-card-check"><Check /></span></div>
                      <h4>{card.title}</h4>
                      <p>{card.description}</p>
                      <div className="market-card-foot"><span>@{category.id}-{String(index + 1).padStart(2, "0")}</span><span>{market.comingSoon}</span></div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence>
            {downloaded && (
              <motion.div className="market-toast" key="toast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} role="status">
                <span className="market-toast-icon"><Check /></span>
                <div><strong>下载完成</strong><small>{downloaded} 已下载到本地</small></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

type ComparisonValue = HomeCopy["comparison"]["dimensions"][number]["webcross"];

function ComparisonValueCell({ cell }: { cell: ComparisonValue }) {
  if (cell.mark) {
    const isCheck = cell.mark === "check";
    return (
      <span className={`comparison-value is-mark is-${cell.tone}`}>
        <b className={`comparison-mark ${isCheck ? "is-check" : "is-dash"}`} aria-label={isCheck ? "支持" : "不支持"}>{isCheck ? <Check /> : "—"}</b>
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
  return (
    <section className="home-section comparison-section" id="comparison">
      <div className="home-section-heading split-heading" data-reveal><h2>{copy.comparison.title}</h2><p>{copy.comparison.description}</p></div>
      <p className="comparison-promo">{copy.comparison.promo}</p>
      <div className="comparison-matrix-wrap" data-reveal>
        <table className="comparison-matrix">
          <thead>
            <tr>
              <th className="comparison-dimension-head">能力维度</th>
              <th className="comparison-webcross-head"><strong>WebCross</strong><small>fork chromium</small></th>
              {copy.comparison.columns.map((column) => <th key={column.name}><strong>{column.name}</strong><small>{column.meta}</small></th>)}
            </tr>
          </thead>
          <tbody>
            {copy.comparison.dimensions.map((row, index) => (
              <tr key={row.label} style={{ "--check-delay": `${120 + index * 45}ms` } as CSSProperties}>
                <th className="comparison-dimension">{row.label}</th>
                <td className="comparison-webcross-cell"><ComparisonValueCell cell={row.webcross} /></td>
                {row.values.map((cell, i) => <td key={`${row.label}-${i}`}><ComparisonValueCell cell={cell} /></td>)}
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
      <div className="faq-column"><div className="home-section-heading" data-reveal><h2>{copy.faq.title}</h2>{copy.faq.description ? <p>{copy.faq.description}</p> : null}</div><div className="home-faq-list">{copy.faq.items.map((item, index) => <details key={item.q} open={index === 0}><summary><span>{item.q}</span><i aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div><Link className="faq-how-link" href="/solutions"><span>{copy.common.how}</span><Arrow /></Link></div>
    </section>
  );
}

export function HomeChapter({ copy, locale }: { copy: HomeCopy; locale: Locale }) {
  const revealRef = useSectionReveal();

  return (
    <article className={`home-v2 locale-${locale}`} ref={revealRef}>
      <header className="home-hero">
        <div className="hero-copy"><h1><span>{copy.hero.titleA}</span><span>{copy.hero.titleB}</span></h1><p>{copy.hero.description}</p><div className="home-actions"><Link className="primary-button" href={chapterPath("download")}><DownloadIcon />{copy.common.download}</Link><Link className="secondary-button" href={chapterPath("guide")}>{copy.common.guide}<Arrow /></Link></div></div>
        <HeroFolk />
      </header>
      <WorkflowDemo copy={copy} />
      <AccountIsolation copy={copy} />
      <Environments copy={copy} />
      <SkillMarket copy={copy} />
      <Comparison copy={copy} />
      <FaqAndStart copy={copy} />
    </article>
  );
}
