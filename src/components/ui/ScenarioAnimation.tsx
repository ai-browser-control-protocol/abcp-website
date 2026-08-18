/**
 * Demo section — "WebCross 帮助用户完成以下任务".
 *
 * Left  : the WebCross client. The original task is typed into the prompt box,
 *         then the execution trace lights up step by step.
 * Right : a browser that mimics a human working the page — navigating, typing,
 *         clicking, opening menus, uploading, scrolling, capturing.
 *
 * Both panes are driven by a single `step` counter (0…7). Every scene declares
 * which "view" each step renders and where the agent cursor sits, so the trace
 * on the left and the browser on the right can never drift apart.
 *
 * Scene switching: on wide screens the section is a tall scroll track with a
 * sticky stage — scrolling down walks through scenes A → B → C. Clicking a tab
 * scrolls to that segment. Below the breakpoint it falls back to tabs plus a
 * timed auto-cycle.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DemoCopy } from "@/content/models";
import "./scenario-animation.css";

const SCENE_KEYS = ["A", "B", "C"] as const;
type SceneKey = (typeof SCENE_KEYS)[number];

const STEP_COUNT = 8;
const STEP_MS = 1750;
const SCENE_CYCLE_MS = STEP_MS * STEP_COUNT;
const STICKY_BREAKPOINT = "(min-width: 1024px) and (min-height: 820px)";

type Copy = DemoCopy;

/** Agent cursor position per step, in % of the browser viewport. */
const CURSOR: Record<SceneKey, ReadonlyArray<readonly [number, number]>> = {
  A: [
    [50, 55],
    [26, 13],
    [63, 13],
    [30, 46],
    [46, 34],
    [80, 42],
    [40, 62],
    [82, 74],
  ],
  B: [
    [50, 50],
    [30, 22],
    [40, 33],
    [56, 45],
    [56, 57],
    [38, 66],
    [50, 76],
    [72, 86],
  ],
  C: [
    [50, 22],
    [46, 52],
    [44, 40],
    [30, 68],
    [50, 20],
    [46, 55],
    [78, 50],
    [80, 78],
  ],
};

export function ScenarioAnimation({ copy }: { copy: Copy }) {
  /* Scene and step live in one value so switching scenes rewinds the trace
     without a second state write. */
  const [{ scene: active, step }, setPlayback] = useState<{ scene: SceneKey; step: number }>({
    scene: "A",
    step: 0,
  });
  const [sticky, setSticky] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const showScene = useCallback((key: SceneKey) => {
    setPlayback((prev) => (prev.scene === key ? prev : { scene: key, step: 0 }));
  }, []);

  /* Sticky scroll-linked switching only above the breakpoint. */
  useEffect(() => {
    const mq = window.matchMedia(STICKY_BREAKPOINT);
    const sync = () => setSticky(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Scroll position → active scene. */
  useEffect(() => {
    if (!sticky) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const travel = track.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(Math.max(-rect.top / travel, 0), 0.9999);
      showScene(SCENE_KEYS[Math.floor(progress * SCENE_KEYS.length)]);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sticky, showScene]);

  /* Without the scroll track, cycle scenes on a timer instead. */
  useEffect(() => {
    if (sticky) return;
    const id = setInterval(() => {
      setPlayback((prev) => ({
        scene: SCENE_KEYS[(SCENE_KEYS.indexOf(prev.scene) + 1) % SCENE_KEYS.length],
        step: 0,
      }));
    }, SCENE_CYCLE_MS);
    return () => clearInterval(id);
  }, [sticky]);

  /* Step clock — restarts whenever the scene changes. */
  useEffect(() => {
    const id = setInterval(
      () => setPlayback((prev) => ({ ...prev, step: (prev.step + 1) % STEP_COUNT })),
      STEP_MS
    );
    return () => clearInterval(id);
  }, [active]);

  const selectScene = useCallback(
    (key: SceneKey) => {
      const track = trackRef.current;
      if (sticky && track) {
        const index = SCENE_KEYS.indexOf(key);
        const travel = track.offsetHeight - window.innerHeight;
        const top = window.scrollY + track.getBoundingClientRect().top;
        window.scrollTo({
          top: top + (travel * (index + 0.5)) / SCENE_KEYS.length,
          behavior: "smooth",
        });
        return;
      }
      showScene(key);
    },
    [sticky, showScene]
  );

  const scene = copy.scenes[active];

  return (
    <section className="scenario-section" id="demo">
      <div className={`scenario-track${sticky ? " is-sticky" : ""}`} ref={trackRef}>
        <div className="scenario-sticky">
          <div className="section-head-center scenario-head">
            <span className="badge-pill">{copy.badge}</span>
            <h2 className="section-title">{copy.title}</h2>
          </div>

          <div className="scenario-tabs" role="tablist" aria-label={copy.title}>
            {SCENE_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={key === active}
                className={`scenario-tab${key === active ? " is-active" : ""}`}
                onClick={() => selectScene(key)}
              >
                <span className="scenario-tab-key">{key}</span>
                <span className="scenario-tab-label">{copy.tabs[key]}</span>
                <span className="scenario-tab-rail" aria-hidden="true">
                  <span
                    className="scenario-tab-rail-fill"
                    style={{ width: key === active ? `${((step + 1) / STEP_COUNT) * 100}%` : "0%" }}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="scenario-stage">
            <ClientPanel copy={copy} scene={scene} sceneKey={active} step={step} />
            <BrowserPanel copy={copy} sceneKey={active} step={step} />
          </div>

          <p className="scenario-caption">{scene.caption}</p>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Left — WebCross client                                                      */
/* ========================================================================== */

function ClientPanel({
  copy,
  scene,
  sceneKey,
  step,
}: {
  copy: Copy;
  scene: Copy["scenes"][SceneKey];
  sceneKey: SceneKey;
  step: number;
}) {
  const done = step >= STEP_COUNT - 1;
  return (
    <div className="client-panel">
      <div className="client-titlebar">
        <span className="client-dot client-dot-r" />
        <span className="client-dot client-dot-y" />
        <span className="client-dot client-dot-g" />
        <span className="client-title">{copy.clientTitle}</span>
        <span className={`client-status${done ? " is-done" : ""}`}>
          <span className="client-status-dot" />
          {done ? copy.statusDone : copy.statusRunning}
        </span>
      </div>

      <div className="client-body">
        <div className="client-scene-tag">
          <span className="client-scene-key">{sceneKey}</span>
          <span>{copy.tabs[sceneKey]}</span>
        </div>

        <div className="client-field-label">{copy.taskLabel}</div>
        <div className="client-prompt" key={`${sceneKey}-prompt`}>
          <span className="client-prompt-caret">›</span>
          <span className="client-prompt-text">{scene.task}</span>
        </div>

        <button type="button" className="client-run" tabIndex={-1}>
          <span>{copy.runLabel}</span>
          <span className="client-run-key">⏎</span>
        </button>

        <div className="client-field-label client-log-label">
          {copy.logLabel}
          <span className="client-log-count">
            {String(Math.min(step + 1, STEP_COUNT)).padStart(2, "0")} / {STEP_COUNT}
          </span>
        </div>

        <ol className="client-steps">
          {scene.steps.map((label, i) => (
            <li
              key={i}
              className={`client-step${i === step ? " is-current" : ""}${i < step ? " is-done" : ""}`}
            >
              <span className="client-step-mark" aria-hidden="true">
                {i < step ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <span className="client-step-text">{label}</span>
              {i === step && <span className="client-step-spinner" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Right — browser                                                             */
/* ========================================================================== */

function BrowserPanel({ copy, sceneKey, step }: { copy: Copy; sceneKey: SceneKey; step: number }) {
  const [cx, cy] = CURSOR[sceneKey][step];
  const clicking =
    (sceneKey === "A" && [2, 3, 5].includes(step)) ||
    (sceneKey === "B" && [3, 4, 6, 7].includes(step)) ||
    (sceneKey === "C" && [2, 3, 6].includes(step));

  return (
    <div className="browser-panel" aria-live="polite">
      {sceneKey === "A" && <SceneAmazon data={copy.scenes.A.browser} step={step} />}
      {sceneKey === "B" && <SceneSeller data={copy.scenes.B.browser} step={step} />}
      {sceneKey === "C" && <SceneSocial data={copy.scenes.C.browser} step={step} />}

      <span
        className={`agent-cursor${clicking ? " is-clicking" : ""}`}
        style={{ left: `${cx}%`, top: `${cy}%` }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" width="20" height="20">
          <path d="M4 2 L4 16 L8 12.4 L10.6 18 L13.4 16.7 L10.8 11.2 L16 11 Z" fill="#0a0a0a" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
        <span className="agent-cursor-ring" />
      </span>
    </div>
  );
}

function BrowserChrome({ url, loading }: { url: string; loading?: boolean }) {
  return (
    <div className="browser-chrome">
      <span className="browser-dot" />
      <span className="browser-dot" />
      <span className="browser-dot" />
      <div className="browser-omnibox">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span className="browser-url" key={url}>
          {url}
        </span>
      </div>
      {loading && <span className="browser-loading" aria-hidden="true" />}
    </div>
  );
}

/* ============== Scene A — Amazon price patrol ============== */

function SceneAmazon({
  data,
  step,
}: {
  data: Copy["scenes"]["A"]["browser"];
  step: number;
}) {
  const view = step <= 2 ? "home" : step === 3 ? "serp" : step <= 5 ? "pdp" : step === 6 ? "reviews" : "done";
  const url =
    view === "home" ? data.urlHome : view === "serp" ? data.urlSerp : view === "reviews" ? data.urlReviews : data.urlPdp;
  const badReviewsDone = step >= 7;
  const scraped = step < 6 ? 0 : step === 6 ? 18 : data.capture.reviewTotal;

  return (
    <div className="scene amazon-scene">
      <BrowserChrome url={url} loading={step === 0} />

      <div className={`page-viewport${step >= 5 ? " has-capture" : ""}`}>
        {/* ---------- amazon.com home ---------- */}
        {view === "home" && (
          <div className="az-page az-home" key="home">
            <div className="az-topbar">
              <span className="az-logo">amazon</span>
              <span className="az-deliver">{data.deliverTo}</span>
              <div className={`az-searchbar${step === 2 ? " is-firing" : ""}`}>
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  {step === 0 ? (
                    <span className="az-search-placeholder">{data.searchPlaceholder}</span>
                  ) : (
                    <span className="az-typed" key={`t-${step}`}>
                      {data.keyword}
                    </span>
                  )}
                  {step >= 1 && <span className="az-caret" />}
                </span>
                <span className={`az-search-btn${step === 2 ? " is-pressed" : ""}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-navbar">
              {data.navItems.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            <div className="az-hero">
              <div className="az-hero-banner" />
              <div className="az-hero-cards">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="az-hero-card">
                    <div className="az-hero-card-img" />
                    <div className="az-hero-card-line" />
                    <div className="az-hero-card-line short" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- search results ---------- */}
        {view === "serp" && (
          <div className="az-page az-serp" key="serp">
            <div className="az-topbar az-topbar-compact">
              <span className="az-logo">amazon</span>
              <div className="az-searchbar">
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  <span>{data.keyword}</span>
                </span>
                <span className="az-search-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-serp-meta">
              <span className="az-serp-count">{data.resultsMeta}</span>
              <span className="az-serp-sort">{data.sortLabel}</span>
            </div>
            <div className="az-serp-body">
              <aside className="az-filters">
                <div className="az-filter-title">{data.filterTitle}</div>
                {data.filters.map((f) => (
                  <label key={f} className="az-filter-row">
                    <span className="az-checkbox" />
                    <span>{f}</span>
                  </label>
                ))}
                <div className="az-filter-title">Price</div>
                <div className="az-filter-slider">
                  <span className="az-filter-slider-track" />
                  <span className="az-filter-slider-knob" />
                  <span className="az-filter-slider-knob right" />
                </div>
              </aside>
              <div className="az-results">
                {data.results.map((r, i) => (
                  <article key={i} className={`az-result${i === 0 ? " is-target" : ""}`}>
                    <div className="az-result-img" />
                    <div className="az-result-info">
                      {r.badge && <span className="az-result-badge">{r.badge}</span>}
                      <div className="az-result-title">{r.title}</div>
                      <div className="az-result-rating">
                        <span className="az-stars">★★★★★</span>
                        <span>{r.rating}</span>
                        <span className="az-link">({r.reviews})</span>
                      </div>
                      <div className="az-result-bought">{r.bought}</div>
                      <div className="az-result-price-row">
                        {r.deal && <span className="az-deal">{r.deal}</span>}
                        <span className="az-price">{r.price}</span>
                        {r.listPrice && <span className="az-list-price">List: {r.listPrice}</span>}
                      </div>
                    </div>
                  </article>
                ))}
                {[0, 1].map((i) => (
                  <div key={`skel-${i}`} className="az-result az-result-skeleton" aria-hidden="true">
                    <div className="az-result-img" />
                    <div className="az-result-info">
                      <span className="az-skel-line" />
                      <span className="az-skel-line short" />
                      <span className="az-skel-line tiny" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- product detail ---------- */}
        {view === "pdp" && (
          <div className="az-page az-pdp" key="pdp">
            <div className="az-topbar az-topbar-compact">
              <span className="az-logo">amazon</span>
              <div className="az-searchbar">
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  <span>{data.keyword}</span>
                </span>
                <span className="az-search-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-pdp-body">
              <div className="az-gallery">
                <div className="az-gallery-main" />
                <div className="az-gallery-thumbs">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
              <div className="az-pdp-info">
                <div className="az-crumb">{data.pdp.crumb}</div>
                <h3 className={`az-pdp-title${step === 5 ? " is-grabbed" : ""}`}>{data.pdp.title}</h3>
                <div className={`az-result-rating${step === 5 ? " is-grabbed" : ""}`}>
                  <span className="az-stars">★★★★★</span>
                  <span>{data.pdp.rating}</span>
                  <span className="az-link">{data.pdp.reviews}</span>
                </div>
                <div className="az-result-bought">{data.pdp.bought}</div>
                <div className={`az-pdp-price-row${step === 5 ? " is-grabbed" : ""}`}>
                  <span className="az-deal">{data.pdp.deal}</span>
                  <span className="az-price az-price-lg">{data.pdp.price}</span>
                  <span className="az-list-price">List: {data.pdp.listPrice}</span>
                </div>
                <div className="az-pdp-shipping">{data.pdp.shipping}</div>
                <div className="az-pdp-actions">
                  <span className="az-btn-cart">{data.pdp.cart}</span>
                  <span className="az-btn-buy">{data.pdp.buy}</span>
                </div>
                <div className="az-pdp-reviews-link">{data.pdp.reviewsAnchor} ›</div>
              </div>
              <div className="az-pdp-about" aria-hidden="true">
                <div className="az-pdp-about-title">关于此商品</div>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`az-skel-line${i % 3 === 2 ? " short" : ""}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- reviews ---------- */}
        {(view === "reviews" || view === "done") && (
          <div className="az-page az-reviews" key="reviews">
            <div className="az-topbar az-topbar-compact">
              <span className="az-logo">amazon</span>
              <div className="az-searchbar">
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  <span>{data.keyword}</span>
                </span>
                <span className="az-search-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-reviews-body">
              <aside className="az-review-summary">
                <div className="az-review-heading">{data.reviews.title}</div>
                <div className="az-review-score">
                  <span className="az-stars">★★★★★</span>
                  <span className="az-review-score-num">{data.reviews.score}</span>
                </div>
                <div className="az-review-total">{data.reviews.total}</div>
                <div className="az-histogram">
                  {data.reviews.histogram.map((row, i) => (
                    <div key={i} className={`az-hist-row${i >= 3 ? " is-bad" : ""}`}>
                      <span className="az-hist-label">{String(row[0])}</span>
                      <span className="az-hist-track">
                        <span className="az-hist-fill" style={{ width: `${Number(row[2])}%` }} />
                      </span>
                      <span className="az-hist-pct">{String(row[1])}</span>
                    </div>
                  ))}
                </div>
                <div className="az-review-filter">{data.reviews.filterLabel}</div>
              </aside>
              <div className="az-review-list">
                {data.reviews.items.map((r, i) => (
                  <article
                    key={i}
                    className="az-review"
                    style={{ animationDelay: `${0.15 + i * 0.32}s` }}
                  >
                    <div className="az-review-head">
                      <span className="az-review-avatar" />
                      <span className="az-review-name">{r.name}</span>
                    </div>
                    <div className="az-review-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                    <div className="az-review-title">{r.title}</div>
                    <p className="az-review-body">{r.body}</p>
                    <span className="az-review-mark" style={{ animationDelay: `${0.5 + i * 0.32}s` }} />
                  </article>
                ))}
                <div className="az-review az-review-skeleton" aria-hidden="true">
                  <span className="az-skel-line tiny" />
                  <span className="az-skel-line" />
                  <span className="az-skel-line short" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- capture side panel ---------- */}
        <aside className={`capture-panel${step >= 5 ? " is-open" : ""}`}>
          <div className="capture-head">
            <span className="capture-rec" />
            <span>{data.capture.title}</span>
          </div>
          <dl className="capture-fields">
            {data.capture.fields.map((f, i) => (
              <div key={i} className="capture-field" style={{ animationDelay: `${0.1 + i * 0.22}s` }}>
                <dt>{f[0]}</dt>
                <dd>{f[1]}</dd>
              </div>
            ))}
          </dl>
          <div className="capture-progress-label">
            <span>{data.capture.reviewLabel}</span>
            <span className="capture-progress-num">
              {scraped} / {data.capture.reviewTotal}
            </span>
          </div>
          <div className="capture-progress">
            <span
              className="capture-progress-fill"
              style={{ width: `${(scraped / data.capture.reviewTotal) * 100}%` }}
            />
          </div>
          {badReviewsDone && (
            <div className="capture-done">
              <div className="capture-done-head">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{data.capture.doneTitle}</span>
              </div>
              <code>{data.capture.doneFile}</code>
              <span className="capture-done-meta">{data.capture.doneMeta}</span>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ============== Scene B — Amazon Seller Central listing ============== */

function SceneSeller({
  data,
  step,
}: {
  data: Copy["scenes"]["B"]["browser"];
  step: number;
}) {
  const brandOpen = step === 3;
  const brandFilled = step >= 4;
  const catOpen = step === 4;
  const catFilled = step >= 5;
  const numbersFilled = step >= 5;
  const uploading = step === 6;
  const uploaded = step >= 7;

  return (
    <div className="scene seller-scene">
      <BrowserChrome url={data.url} loading={step === 0} />

      <div className="page-viewport">
        <div className="sc-topbar">
          <span className="sc-logo">{data.brandbar}</span>
          <span className="sc-path">{data.path}</span>
          <span className="sc-queue">
            {data.queueLabel} <b>{data.queueValue}</b>
          </span>
        </div>

        <div className="sc-tabs">
          {data.tabs.map((t, i) => (
            <span key={t} className={`sc-tab${i === 0 ? " is-active" : ""}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="sc-form">
          {/* text input */}
          <label className={`sc-field${step >= 2 ? " is-filled" : ""}${step === 2 ? " is-focus" : ""}`}>
            <span className="sc-label">{data.nameLabel}</span>
            <span className="sc-input">
              {step >= 2 ? (
                <span className="sc-typed" key={`n-${step === 2 ? "run" : "done"}`}>
                  {data.nameValue}
                </span>
              ) : (
                <span className="sc-placeholder" />
              )}
              {step === 2 && <span className="sc-caret" />}
            </span>
          </label>

          {/* dropdown — brand */}
          <div className={`sc-field${brandFilled ? " is-filled" : ""}${brandOpen ? " is-focus" : ""}`}>
            <span className="sc-label">{data.brandLabel}</span>
            <span className={`sc-select${brandOpen ? " is-open" : ""}`}>
              <span className={brandFilled ? "sc-select-value" : "sc-select-placeholder"}>
                {brandFilled ? data.brandValue : data.brandPlaceholder}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
              {brandOpen && (
                <span className="sc-menu">
                  {data.brandOptions.map((o) => (
                    <span key={o} className={`sc-option${o === data.brandValue ? " is-target" : ""}`}>
                      {o}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </div>

          {/* dropdown — category */}
          <div className={`sc-field${catFilled ? " is-filled" : ""}${catOpen ? " is-focus" : ""}`}>
            <span className="sc-label">{data.categoryLabel}</span>
            <span className={`sc-select${catOpen ? " is-open" : ""}`}>
              <span className={catFilled ? "sc-select-value" : "sc-select-placeholder"}>
                {catFilled ? data.categoryValue : data.categoryPlaceholder}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
              {catOpen && (
                <span className="sc-menu">
                  {data.categoryOptions.map((o) => (
                    <span key={o} className={`sc-option${o === data.categoryValue ? " is-target" : ""}`}>
                      {o}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </div>

          <div className="sc-field-row">
            <label className={`sc-field${numbersFilled ? " is-filled" : ""}`}>
              <span className="sc-label">{data.priceLabel}</span>
              <span className="sc-input">
                {numbersFilled ? <span className="sc-typed">{data.priceValue}</span> : <span className="sc-placeholder" />}
              </span>
            </label>
            <label className={`sc-field${numbersFilled ? " is-filled" : ""}`}>
              <span className="sc-label">{data.stockLabel}</span>
              <span className="sc-input">
                {numbersFilled ? <span className="sc-typed">{data.stockValue}</span> : <span className="sc-placeholder" />}
              </span>
            </label>
          </div>

          {/* file upload */}
          <div className={`sc-upload${uploading ? " is-uploading" : ""}${uploaded ? " is-done" : ""}`}>
            {!uploading && !uploaded && (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="8.5" cy="9.5" r="1.6" />
                  <path d="m21 16-5-5-6 6-3-3-4 4" />
                </svg>
                <span className="sc-upload-label">{data.uploadLabel}</span>
                <span className="sc-upload-hint">{data.uploadHint}</span>
              </>
            )}
            {(uploading || uploaded) && (
              <div className="sc-upload-file">
                <span className="sc-upload-thumb" />
                <div className="sc-upload-meta">
                  <span className="sc-upload-name">{data.uploadFile}</span>
                  <span className="sc-upload-size">{data.uploadSize}</span>
                  <span className="sc-upload-bar">
                    <span className={`sc-upload-bar-fill${uploaded ? " is-full" : ""}`} />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="sc-collapsed">
            {data.tabs.slice(1).map((t) => (
              <div key={t} className="sc-collapsed-row">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span>{t}</span>
                <span className="sc-collapsed-note">—</span>
              </div>
            ))}
          </div>

          <div className="sc-submit-row">
            <span className={`sc-submit${step === 7 ? " is-pressed" : ""}`}>
              {step === 7 ? data.submitting : data.submitLabel}
            </span>
          </div>
        </div>

        {step === 7 && (
          <div className="sc-toast">
            <span className="sc-toast-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span className="sc-toast-body">
              <b>{data.success}</b>
              <span>{data.successMeta}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============== Scene C — social media capture + engagement ============== */

function SceneSocial({
  data,
  step,
}: {
  data: Copy["scenes"]["C"]["browser"];
  step: number;
}) {
  const onReddit = step >= 4;
  const platform = onReddit ? data.reddit : data.x;
  const detail = step === 2 || step === 3;
  const engaged = step === 3;
  const capturing = step >= 6;
  const archived = step === 7;
  const captured = step < 6 ? 0 : step === 6 ? 22 : 30;

  return (
    <div className={`scene social-scene${onReddit ? " is-reddit" : " is-x"}`}>
      <BrowserChrome url={platform.url} loading={step === 0 || step === 4} />

      <div className="page-viewport">
        <div className="so-topbar">
          <span className="so-logo">{onReddit ? "reddit" : "𝕏"}</span>
          <span className="so-search">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span>{platform.query}</span>
          </span>
        </div>

        <div className="so-tabs">
          {platform.tabs.map((t, i) => (
            <span key={t} className={`so-tab${i === 0 ? " is-active" : ""}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="so-body">
          <div className={`so-feed${step === 1 || step === 5 ? " is-scrolling" : ""}`} key={onReddit ? "r" : "x"}>
            {platform.posts.map((p, i) => (
              <article
                key={i}
                className={`so-post${detail && i === 0 ? " is-open" : ""}${capturing ? " is-captured" : ""}`}
                style={{ animationDelay: `${0.1 + i * 0.16}s` }}
              >
                <span className="so-avatar" />
                <div className="so-post-main">
                  <div className="so-post-meta">
                    <span className="so-name">{p.user}</span>
                    <span className="so-handle">{p.handle}</span>
                    <span className="so-time">· {p.time}</span>
                  </div>
                  <p className="so-text">{p.body}</p>
                  <div className="so-actions">
                    <span className="so-action">
                      <Bubble /> {p.comments}
                    </span>
                    <span className={`so-action${engaged && i === 0 ? " is-hit" : ""}`}>
                      <Repost /> {p.reposts}
                    </span>
                    <span className={`so-action so-like${engaged && i === 0 ? " is-hit" : ""}`}>
                      <Heart /> {p.likes}
                    </span>
                  </div>

                  {detail && i === 0 && (
                    <div className="so-reply">
                      <span className="so-reply-avatar" />
                      <span className="so-reply-box">
                        {engaged ? (
                          <span className="so-reply-text" key="typed">
                            {platform.reply}
                          </span>
                        ) : (
                          <span className="so-reply-placeholder">{data.actions.replyPlaceholder}</span>
                        )}
                        {engaged && <span className="so-caret" />}
                      </span>
                      <span className={`so-reply-btn${engaged ? " is-sent" : ""}`}>
                        {engaged ? data.actions.posted : data.actions.reply}
                      </span>
                    </div>
                  )}
                </div>
                {capturing && <span className="so-capture-mark" style={{ animationDelay: `${i * 0.18}s` }} />}
              </article>
            ))}
            {[0, 1].map((i) => (
              <div key={`so-skel-${i}`} className="so-post so-post-skeleton" aria-hidden="true">
                <span className="so-avatar" />
                <div className="so-post-main">
                  <span className="so-skel-line short" />
                  <span className="so-skel-line" />
                </div>
              </div>
            ))}
          </div>

          <aside className={`so-archive${capturing ? " is-open" : ""}`}>
            <div className="so-archive-head">
              <span className="capture-rec" />
              <span>{archived ? data.archive.title : data.archive.progressLabel}</span>
            </div>
            <div className="so-archive-num">
              {captured}
              <span> / 30</span>
            </div>
            <div className="so-archive-platforms">
              <span className={onReddit ? "" : "is-active"}>X</span>
              <span className={onReddit ? "is-active" : ""}>Reddit</span>
            </div>
            <div className="capture-progress">
              <span className="capture-progress-fill" style={{ width: `${(captured / 30) * 100}%` }} />
            </div>
            <ul className="so-archive-fields">
              {data.archive.fields.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {archived && (
              <div className="capture-done">
                <div className="capture-done-head">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{data.archive.title}</span>
                </div>
                <code>{data.archive.file}</code>
                <span className="capture-done-meta">{data.archive.meta}</span>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function Heart() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.7-9.4-9A5.3 5.3 0 0 1 12 6.3 5.3 5.3 0 0 1 21.4 12c-1.9 4.3-9.4 9-9.4 9z" />
    </svg>
  );
}

function Repost() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 2.5 21 6l-4 3.5" />
      <path d="M21 6H7a3 3 0 0 0-3 3v2" />
      <path d="M7 21.5 3 18l4-3.5" />
      <path d="M3 18h14a3 3 0 0 0 3-3v-2" />
    </svg>
  );
}

function Bubble() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" />
    </svg>
  );
}
