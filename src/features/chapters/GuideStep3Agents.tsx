/**
 * Guide Step 3 mockup — "call it from your AI agent".
 *
 * An ego-inspired workspace on a warm WebCross desk: browser "Space" cards
 * peek from behind TWO separate OS windows, and a frosted app dock at the
 * bottom switches between three agent experiences:
 *
 *   1. Claude Code CLI window      + separate WebCross browser window
 *   2. ChatGPT desktop app window  + separate WebCross browser window
 *   3. WebCross client window (AI 助手 page) + separate WebCross browser
 *
 * Every state is a pair of independent windows, each with its own titlebar.
 * The dock is the only interactive part (three real tab buttons, click +
 * keyboard, crossfade that respects prefers-reduced-motion). Everything else
 * is decorative chrome (aria-hidden); the hint caption is the visible text.
 */
"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { Messages } from "@/i18n/messages";
import "./guide-step3.css";

type GuideMockupCopy = Messages["guide"]["mockup"];
type StageView = "claude" | "chatgpt" | "webcross";
type BrowserVariant = "claude" | "chatgpt" | "webcross";

const DOCK_ITEMS: ReadonlyArray<{ id: StageView; label: string }> = [
  { id: "claude", label: "Claude Code" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "webcross", label: "WebCross" },
];

/* ---- Tiny inline glyph set (decorative, 16px grid) ----------------------- */

function MiniIcon({
  children,
  viewBox = "0 0 16 16",
}: {
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      className="gs3-icon"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const Icon = {
  home: (
    <MiniIcon>
      <path d="M2.8 7.3 8 2.9l5.2 4.4V13H2.8z" />
      <path d="M6.4 13V9.6h3.2V13" />
    </MiniIcon>
  ),
  folder: (
    <MiniIcon>
      <path d="M2.6 5.3h4.1L8 3.7h5.4v8.6h-10.8z" />
    </MiniIcon>
  ),
  clock: (
    <MiniIcon>
      <circle cx="8" cy="8" r="5.2" />
      <path d="M8 5v3.2l2.1 1.2" />
    </MiniIcon>
  ),
  globe: (
    <MiniIcon>
      <circle cx="8" cy="8" r="5.2" />
      <path d="M2.9 8h10.2M8 2.8c2.6 2.9 2.6 7.5 0 10.4M8 2.8c-2.6 2.9-2.6 7.5 0 10.4" />
    </MiniIcon>
  ),
  branch: (
    <MiniIcon>
      <circle cx="5" cy="4" r="1.3" />
      <circle cx="5" cy="12" r="1.3" />
      <circle cx="11" cy="7" r="1.3" />
      <path d="M5 5.3v5.4M11 8.3c0 1.9-2.2 2.3-4.6 2.7" />
    </MiniIcon>
  ),
  grid: (
    <MiniIcon>
      <rect x="3" y="3" width="4" height="4" rx="1" />
      <rect x="9" y="3" width="4" height="4" rx="1" />
      <rect x="3" y="9" width="4" height="4" rx="1" />
      <rect x="9" y="9" width="4" height="4" rx="1" />
    </MiniIcon>
  ),
  bell: (
    <MiniIcon>
      <path d="M4.4 11.1h7.2c-.8-.7-1.1-1.6-1.1-2.6V7a2.5 2.5 0 0 0-5 0v1.5c0 1-.3 1.9-1.1 2.6z" />
      <path d="M6.9 12.7a1.3 1.3 0 0 0 2.2 0" />
    </MiniIcon>
  ),
  search: (
    <MiniIcon>
      <circle cx="7" cy="7" r="3.6" />
      <path d="m10 10 3 3" />
    </MiniIcon>
  ),
  edit: (
    <MiniIcon>
      <path d="M3 13h2.4L13 5.4 10.6 3 3 10.6z" />
      <path d="m9.4 4.2 2.4 2.4" />
    </MiniIcon>
  ),
  share: (
    <MiniIcon>
      <path d="M8 10V2.8M5.4 5.3 8 2.7l2.6 2.6" />
      <path d="M3 9.2v3.4h10V9.2" />
    </MiniIcon>
  ),
  list: (
    <MiniIcon>
      <path d="M3 4h10M3 8h10M3 12h6" />
    </MiniIcon>
  ),
  panel: (
    <MiniIcon>
      <rect x="2.8" y="3.4" width="10.4" height="9.2" rx="1.4" />
      <path d="M9.2 3.4v9.2" />
    </MiniIcon>
  ),
  copy: (
    <MiniIcon>
      <rect x="5.2" y="5.2" width="7" height="7.8" rx="1.2" />
      <path d="M3.4 10.2V4.6c0-.7.5-1.2 1.2-1.2H10" />
    </MiniIcon>
  ),
  thumb: (
    <MiniIcon>
      <path d="M5.4 7.4 8 3.1c.8 0 1.4.6 1.4 1.4v2.2h2.4c.8 0 1.3.6 1.2 1.4l-.5 2.9c-.1.6-.6 1-1.2 1H5.4z" />
      <path d="M2.9 7.4h2.5V13H2.9z" />
    </MiniIcon>
  ),
  speaker: (
    <MiniIcon>
      <path d="M2.9 6.5v3h2L7.5 12V4L4.9 6.5z" />
      <path d="M10 6.1a2.6 2.6 0 0 1 0 3.8" />
    </MiniIcon>
  ),
  plus: (
    <MiniIcon>
      <path d="M8 3.6v8.8M3.6 8h8.8" />
    </MiniIcon>
  ),
  mic: (
    <MiniIcon>
      <rect x="6" y="2.7" width="4" height="6.4" rx="2" />
      <path d="M4.4 8a3.6 3.6 0 0 0 7.2 0M8 11.6v2" />
    </MiniIcon>
  ),
  lock: (
    <MiniIcon>
      <rect x="4" y="7" width="8" height="6" rx="1.2" />
      <path d="M6 7V5.4a2 2 0 0 1 4 0V7" />
    </MiniIcon>
  ),
  chevronDown: (
    <MiniIcon>
      <path d="m4.6 6.4 3.4 3.4 3.4-3.4" />
    </MiniIcon>
  ),
  gear: (
    <MiniIcon>
      <circle cx="8" cy="8" r="2.1" />
      <path d="M8 2.5v1.6M8 11.9v1.6M2.5 8h1.6M11.9 8h1.6M4.1 4.1l1.1 1.1M10.8 10.8l1.1 1.1M11.9 4.1l-1.1 1.1M5.2 10.8l-1.1 1.1" />
    </MiniIcon>
  ),
  history: (
    <MiniIcon>
      <path d="M2.8 8a5.2 5.2 0 1 0 1.7-3.8" />
      <path d="M2.7 2.8v2.7h2.7" />
      <path d="M8 5.4V8l1.8 1.1" />
    </MiniIcon>
  ),
  screen: (
    <MiniIcon>
      <rect x="2.4" y="3.4" width="11.2" height="7.6" rx="1.2" />
      <path d="M6 13.4h4M8 11v2.4" />
    </MiniIcon>
  ),
};

/* ---- Shared chrome ------------------------------------------------------- */

function TrafficLights({ className = "" }: { className?: string }) {
  return (
    <span className={`gs3-traffic ${className}`} aria-hidden="true">
      <i className="gs3-traffic-dot gs3-traffic-dot--red" />
      <i className="gs3-traffic-dot gs3-traffic-dot--amber" />
      <i className="gs3-traffic-dot gs3-traffic-dot--green" />
    </span>
  );
}

function LiveChip({ variant = "ok" }: { variant?: "ok" | "run" }) {
  return (
    <span className={`gs3-live${variant === "run" ? " is-run" : ""}`}>
      <Image
        src="/brand/webcross-icon.webp"
        alt=""
        width={440}
        height={330}
        unoptimized
      />
      <i />
      LIVE
    </span>
  );
}

/** Titlebar shared by the two agent app windows (Claude Code / ChatGPT). */
function AppWindowChrome({
  mark,
  title,
  detail,
  hint,
  chip,
}: {
  mark?: ReactNode;
  title: string;
  detail?: string;
  hint?: string;
  chip?: ReactNode;
}) {
  return (
    <div className="gs3-winbar">
      <TrafficLights />
      <span className="gs3-winbar-title">
        {mark && <span className="gs3-winbar-mark">{mark}</span>}
        <b>{title}</b>
        {detail && (
          <>
            <span className="gs3-title-sep">—</span>
            <span className="gs3-winbar-detail">{detail}</span>
          </>
        )}
      </span>
      {(hint || chip) && (
        <span className="gs3-winbar-right">
          {hint && <span className="gs3-winbar-hint">{hint}</span>}
          {chip}
        </span>
      )}
    </div>
  );
}

/** Titlebar of the separate WebCross browser window (brand + URL + LIVE). */
function BrowserWindowChrome({ variant }: { variant: BrowserVariant }) {
  return (
    <div className="gs3-winbar gs3-winbar--browser">
      <TrafficLights />
      <span className="gs3-browser-brand">
        <Image
          src="/brand/webcross-icon.webp"
          alt=""
          width={440}
          height={330}
          unoptimized
        />
        <b>WebCross</b>
      </span>
      <span className="gs3-burl">
        {Icon.lock}
        <span>checkout.acme-app.dev</span>
      </span>
      <LiveChip variant={variant === "chatgpt" ? "ok" : "run"} />
      <span className="gs3-winbar-menu">⋮</span>
    </div>
  );
}

/* ---- Browser Space cards peeking behind the windows ---------------------- */

function SpaceCard({
  variant,
  url,
  label,
}: {
  variant: "a" | "b" | "c";
  url: string;
  label: string;
}) {
  return (
    <div className={`gs3-space gs3-space--${variant}`}>
      <div className="gs3-space-chrome">
        <span className="gs3-space-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="gs3-space-url">{url}</span>
        <span className="gs3-space-menu" aria-hidden="true">
          ⋮
        </span>
      </div>
      <div className="gs3-space-body">
        <div className="gs3-space-meta">
          <Image
            className="gs3-space-mark"
            src="/brand/webcross-icon.webp"
            alt=""
            width={440}
            height={330}
            unoptimized
          />
          <span className="gs3-space-tag">{label}</span>
          <span className="gs3-space-live">
            <i />
            live
          </span>
        </div>
        <span className="gs3-space-bar" />
        <span className="gs3-space-bar gs3-space-bar--short" />
        <span className="gs3-space-bar gs3-space-bar--faint" />
      </div>
    </div>
  );
}

/* ---- Claude Code CLI window content -------------------------------------- */

function ClaudePane({ prompt }: { prompt: string }) {
  return (
    <section className="gs3-pane gs3-pane--claude" aria-hidden="true">
      <div className="gs3-term gs3-term--claude">
        <div className="gs3-cl-welcome">
          <span className="gs3-cl-welcome-title">
            <span className="gs3-cl-star">✻</span>
            <span>Welcome to Claude Code!</span>
          </span>
          <span className="gs3-cl-welcome-line">
            /help for help, /status for your current setup
          </span>
          <span className="gs3-cl-welcome-line">
            cwd: <b className="gs3-cl-path">~/projects/acme-app</b>
          </span>
        </div>

        <div className="gs3-cl-prompt">
          <span className="gs3-cl-caret">&gt;</span>
          <span className="gs3-cl-prompt-body">
            <span className="gs3-cl-prompt-cmd">/webcross-browser</span>
            <span className="gs3-cl-prompt-text">{prompt}</span>
          </span>
        </div>

        <div className="gs3-cl-block">
          <div className="gs3-cl-row">
            <span className="gs3-cl-bullet">⏺</span>
            <span className="gs3-cl-row-text">
              Skill(<b className="gs3-cl-accent">webcross-browser</b>)
            </span>
          </div>
          <div className="gs3-cl-row gs3-cl-row--sub">
            <span className="gs3-cl-branch">⎿</span>
            <span className="gs3-cl-row-text">Loaded WebCross skill</span>
          </div>
        </div>

        <div className="gs3-cl-block">
          <div className="gs3-cl-row">
            <span className="gs3-cl-bullet">⏺</span>
            <span className="gs3-cl-row-text">
              webcross-browser <span className="gs3-cl-dim">· open</span>{" "}
              checkout.acme-app.dev
            </span>
          </div>
          <div className="gs3-cl-row gs3-cl-row--sub">
            <span className="gs3-cl-branch">⎿</span>
            <span className="gs3-cl-row-text">
              checkout page ready <span className="gs3-cl-dim">· Space:</span>{" "}
              Checkout test
            </span>
          </div>
        </div>

        <div className="gs3-cl-row gs3-cl-row--status">
          <span className="gs3-cl-spinner is-spin">✻</span>
          <span className="gs3-cl-row-text">
            Running checkout test{" "}
            <span className="gs3-cl-dim">(esc to interrupt)</span>
          </span>
        </div>

        <div className="gs3-cl-row gs3-cl-row--done">
          <span className="gs3-cl-spinner">✻</span>
          <span className="gs3-cl-row-text">
            Checkout test passed <span className="gs3-cl-dim">· 10 checks</span>
          </span>
        </div>

        <div className="gs3-cl-composer">
          <span className="gs3-cl-caret">&gt;</span>
          <span className="gs3-cl-composer-hint">Try a follow-up task…</span>
        </div>

        <div className="gs3-cl-foot">
          <span className="gs3-cl-mode">
            ⏵⏵ accept edits on{" "}
            <span className="gs3-cl-dim">(shift+tab to cycle)</span>
          </span>
          <span className="gs3-blink" />
        </div>
      </div>
    </section>
  );
}

/* ---- Separate WebCross browser window content ---------------------------- */

function BrowserPage({ variant }: { variant: BrowserVariant }) {
  const passed = variant === "chatgpt";
  const running = variant === "webcross";

  return (
    <div className="gs3-browser-page" aria-hidden="true">
      <div className="gs3-shop-head">
        <b>acme-app</b>
        <span>Shop</span>
        <span>Cart · 3</span>
        <i className="gs3-shop-avatar" />
      </div>

      <div className="gs3-checkout-head">
        <span className="gs3-checkout-title">Checkout</span>
        <span className="gs3-checkout-meta">secure · demo data</span>
      </div>

      <div className="gs3-checkout-body">
        <div className="gs3-order-card">
          <div className="gs3-order-head">
            Order summary <span>3 items</span>
          </div>
          <div className="gs3-order-item">
            <span>Runner jacket × 1</span>
            <b>$98.00</b>
          </div>
          <div className="gs3-order-item">
            <span>Canvas tote × 2</span>
            <b>$50.00</b>
          </div>
          <div className="gs3-order-row">
            <span>Subtotal</span>
            <b>$148.00</b>
          </div>
          <div
            className={`gs3-order-row gs3-order-row--ship${
              variant === "claude" ? " is-agent" : ""
            }`}
          >
            <span>
              Shipping · <em>Express</em>
            </span>
            <b>$8.00</b>
          </div>
          <div
            className={`gs3-order-row gs3-order-row--total${
              passed ? " is-agent is-pass" : running ? " is-agent" : ""
            }`}
          >
            <span>Total</span>
            <b>$156.00</b>
          </div>
        </div>

        <div className="gs3-ship-block">
          <span className="gs3-ship-label">Delivery</span>
          <span className="gs3-ship-opt">
            <i />
            Standard · 5–7 days
            <b>Free</b>
          </span>
          <span className="gs3-ship-opt is-on">
            <i />
            Express · 2 days
            <b>$8.00</b>
          </span>
        </div>

        <div className="gs3-pay-row">
          <span>Payment</span>
          <b>Visa ···· 4242</b>
          <i />
        </div>

        <div className="gs3-bill-row">
          <span>Billing</span>
          <em>Phoenix, AZ 85034 · US</em>
          <b>Edit</b>
        </div>

        <span className={`gs3-place-order${passed ? " is-pass" : ""}`}>
          {passed ? "✓ Order placed · test passed" : "Place order"}
        </span>
      </div>
    </div>
  );
}

function BrowserWindow({ variant }: { variant: BrowserVariant }) {
  return (
    <div className="gs3-win gs3-win--browser">
      <BrowserWindowChrome variant={variant} />
      <BrowserPage variant={variant} />
    </div>
  );
}

/* ---- ChatGPT desktop app window content ---------------------------------- */

function AppSidebarProject({
  name,
  threads,
  activeThread,
}: {
  name: string;
  threads: string[];
  activeThread?: string;
}) {
  return (
    <div className="gs3-app-project">
      <span className="gs3-app-project-name">
        {Icon.folder}
        {name}
      </span>
      {threads.map((thread) => (
        <span
          key={thread}
          className={`gs3-app-thread-item${
            thread === activeThread ? " is-active" : ""
          }`}
        >
          {thread}
        </span>
      ))}
    </div>
  );
}

function ChatGPTWindow() {
  return (
    <div className="gs3-win gs3-win--agent gs3-win--app">
      <AppWindowChrome
        mark={
          <Image
            src="/brand/codex.svg"
            alt=""
            width={10}
            height={10}
            unoptimized
          />
        }
        title="ChatGPT"
        detail="结算页回归测试"
        chip={<LiveChip variant="run" />}
      />

      <div className="gs3-app">
        <div className="gs3-app-rail">
          <span className="gs3-app-rail-btn is-active">{Icon.home}</span>
          <span className="gs3-app-rail-btn">{Icon.folder}</span>
          <span className="gs3-app-rail-btn">{Icon.clock}</span>
          <span className="gs3-app-rail-btn">{Icon.globe}</span>
          <span className="gs3-app-rail-btn gs3-app-rail-dots">⋯</span>
          <span className="gs3-app-rail-gap" />
          <span className="gs3-app-rail-btn">{Icon.branch}</span>
          <span className="gs3-app-rail-btn">{Icon.grid}</span>
        </div>

        <aside className="gs3-app-side">
          <div className="gs3-app-side-head">
            <span className="gs3-app-brand">
              <Image
                src="/brand/codex.svg"
                alt=""
                width={10}
                height={10}
                unoptimized
              />
              ChatGPT {Icon.chevronDown}
            </span>
            <span className="gs3-app-side-icon">{Icon.bell}</span>
            <span className="gs3-app-side-icon">{Icon.search}</span>
          </div>

          <div className="gs3-app-side-row">
            {Icon.edit}
            <span>新聊天</span>
          </div>
          <div className="gs3-app-side-row">
            <i className="gs3-app-dot" />
            <span>你的 Dot</span>
          </div>

          <span className="gs3-app-side-label">项目</span>

          <div className="gs3-app-projects">
            <AppSidebarProject
              name="ecommerce-ops"
              threads={["结算页回归测试", "批量商品上架"]}
              activeThread="结算页回归测试"
            />
            <AppSidebarProject name="pricing-watch" threads={["竞品价格巡检"]} />
            <AppSidebarProject name="growth-lab" threads={["促销活动核对"]} />
          </div>

          <div className="gs3-app-onside">
            <div className="gs3-app-onside-head">
              <span>开始使用</span>
              <small>1/4</small>
            </div>
            <span className="gs3-app-progress">
              <i />
            </span>
            <div className="gs3-app-checklist">
              <span>
                <i className="gs3-app-check" />
                设置每日更新
                <b>∞</b>
              </span>
              <span>
                <i className="gs3-app-check" />
                快速了解 WebCross
                <b>◈</b>
              </span>
              <span>
                <i className="gs3-app-check" />
                分类处理浏览器任务
                <b>◉</b>
              </span>
              <span>
                <i className="gs3-app-check" />
                查看项目的最新决策
                <b>A</b>
              </span>
            </div>
          </div>

          <div className="gs3-app-avatar">
            <span>JP</span>
            <i />
          </div>
        </aside>

        <main className="gs3-app-main">
          <div className="gs3-app-main-head">
            <span className="gs3-app-crumb">
              {Icon.folder}
              结算页回归测试
              {Icon.chevronDown}
            </span>
            <span className="gs3-app-main-actions">
              {Icon.share}
              {Icon.list}
              {Icon.panel}
            </span>
          </div>

          <div className="gs3-app-thread">
            <div className="gs3-app-run">
              <div className="gs3-app-run-head">
                <Image
                  src="/brand/webcross-icon.webp"
                  alt=""
                  width={440}
                  height={330}
                  unoptimized
                />
                <b>WebCross 浏览器</b>
                <span>checkout.acme-app.dev</span>
                <i className="gs3-app-live">LIVE</i>
              </div>
              <div className="gs3-app-run-row">
                <span>打开结算页 · Space「Checkout test」</span>
                <b className="is-ok">✓</b>
              </div>
              <div className="gs3-app-run-row">
                <span>选择配送方式 · Express</span>
                <b className="is-ok">✓</b>
              </div>
              <div className="gs3-app-run-row">
                <span>重新计算运费 · OrderSummary.tsx</span>
                <b className="is-new">+6 −1</b>
              </div>
              <div className="gs3-app-run-row">
                <span>运行 10 项结算页检查</span>
                <b className="is-ok">全部通过</b>
              </div>
            </div>

            <span className="gs3-app-timestamp">10月26日周一 20:07</span>

            <div className="gs3-app-user">
              用 WebCross 跑一遍结算页回归，运费计算不对就修好。
            </div>

            <span className="gs3-app-duration">用时 38s ›</span>

            <p className="gs3-app-answer">
              已通过 WebCross 重新计算运费，结算页 10 项检查全部通过。
            </p>
            <span className="gs3-app-link">预览：checkout.acme-app.dev</span>

            <div className="gs3-app-preview">
              <span className="gs3-app-preview-icon">{Icon.globe}</span>
              <span className="gs3-app-preview-body">
                <b>网页预览</b>
                <small>结算页 · 运费已更新</small>
              </span>
              <span className="gs3-app-preview-open">
                打开方式 {Icon.chevronDown}
              </span>
            </div>

            <div className="gs3-app-glyphs">
              {Icon.copy}
              {Icon.thumb}
              {Icon.speaker}
              <span className="gs3-app-glyph-dots">⋯</span>
            </div>
          </div>

          <div className="gs3-app-composer">
            <span className="gs3-app-composer-hint">和 ChatGPT 一起工作</span>
            <div className="gs3-app-composer-foot">
              <span className="gs3-app-plus">{Icon.plus}</span>
              <span className="gs3-app-approve">帮我批准</span>
              <span className="gs3-app-model">
                GPT-6 Astra <span>中</span> {Icon.chevronDown}
              </span>
              <span className="gs3-app-mic">{Icon.mic}</span>
              <span className="gs3-app-wave">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---- WebCross client window: AI 助手 page -------------------------------- */

function AiAssistantWindow({ copy }: { copy: GuideMockupCopy }) {
  return (
    <div className="gs3-win gs3-win--agent gs3-win--ai">
      <div className="gs3-winbar gs3-winbar--ai">
        <span className="gs3-winbar-right">
          <span className="gs3-ai-login">登录</span>
          <span className="gs3-ai-winctl" aria-hidden="true">
            <i>—</i>
            <i>□</i>
            <i>✕</i>
          </span>
        </span>
      </div>

      <div className="gs3-ai">
        <aside className="gs3-ai-side">
          <div className="gs3-ai-brand">
            <Image
              src="/brand/webcross-horizontal.webp"
              alt=""
              width={1200}
              height={314}
              unoptimized
            />
          </div>

          <span className="gs3-ai-label">{copy.groupWorkspace}</span>
          <div className="gs3-ai-nav">
            <span className="gs3-ai-nav-item">窗口</span>
            <span className="gs3-ai-nav-item is-active">AI 助手</span>
          </div>

          <span className="gs3-ai-label">{copy.groupSystem}</span>
          <div className="gs3-ai-nav">
            <span className="gs3-ai-nav-item">{copy.navSettings}</span>
            <span className="gs3-ai-nav-item">{copy.navGuide}</span>
          </div>

          <div className="gs3-ai-access">
            <div className="gs3-ai-access-head">
              <span>{copy.sideAccess}</span>
              <b>{copy.sideInvite}</b>
            </div>
            <span className="gs3-ai-access-row">
              <i />
              {copy.connWs}
              <b>{copy.statusNotConnected}</b>
            </span>
            <span className="gs3-ai-access-row">
              <i />
              {copy.connMcp}
              <b>{copy.statusNotConnected}</b>
            </span>
            <span className="gs3-ai-access-row is-on">
              <i />
              {copy.connCli}
              <b>{copy.statusCallable}</b>
            </span>
          </div>
        </aside>

        <div className="gs3-ai-main">
          <div className="gs3-ai-toolbar">
            <span className="gs3-ai-tool">
              {Icon.history}
              历史
            </span>
            <span className="gs3-ai-tool gs3-ai-new">
              {Icon.plus}
              新建会话
            </span>
            <div className="gs3-ai-tabs">
              <span className="gs3-ai-tab is-active">会话</span>
              <span className="gs3-ai-tab">任务</span>
              <span className="gs3-ai-tab">自动化</span>
            </div>
            <span className="gs3-ai-screen">{Icon.screen}</span>
          </div>

          {/* One live agent session driving the browser, as in the reference. */}
          <div className="gs3-ai-session">
            <div className="gs3-ai-user">
              <span className="gs3-ai-user-tag">你</span>
              <span>用 WebCross 帮我在 x.com 发布一条新贴文</span>
            </div>

            <div className="gs3-ai-reply">
              <div className="gs3-ai-reply-head">
                <Image
                  src="/brand/webcross-icon.webp"
                  alt=""
                  width={440}
                  height={330}
                  unoptimized
                />
                <b>WebCross Agent</b>
                <span className="gs3-ai-reply-dot">·</span>
                <span className="gs3-ai-reply-target">x.com/compose/post</span>
              </div>

              <div className="gs3-ai-trace">
                <div className="gs3-ai-trace-row">
                  <i className="gs3-ai-step is-ok">✓</i>
                  <span className="gs3-ai-step-text">打开 x.com/compose/post</span>
                  <code className="gs3-ai-method">Page.navigate</code>
                </div>
                <div className="gs3-ai-trace-row">
                  <i className="gs3-ai-step is-ok">✓</i>
                  <span className="gs3-ai-step-text">
                    读取 AXTree 语义树 <em>· 128 元素</em>
                  </span>
                  <code className="gs3-ai-method">DOM.getAXTree</code>
                </div>
                <div className="gs3-ai-trace-row">
                  <i className="gs3-ai-step is-ok">✓</i>
                  <span className="gs3-ai-step-text">输入贴文内容</span>
                  <code className="gs3-ai-method">Input.type</code>
                </div>
                <div className="gs3-ai-trace-row">
                  <i className="gs3-ai-step is-ok">✓</i>
                  <span className="gs3-ai-step-text">点击「发布」</span>
                  <code className="gs3-ai-method">Input.click</code>
                </div>
                <div className="gs3-ai-trace-row gs3-ai-trace-row--note">
                  <i className="gs3-ai-step is-ok">✓</i>
                  <span className="gs3-ai-step-text">
                    动作记录已写入 <em>· 18 个操作</em>
                  </span>
                  <code className="gs3-ai-method">动作记录</code>
                </div>
              </div>

              <div className="gs3-ai-session-meta">
                <span>10月26日周一 20:07</span>
                <i />
                <b>执行完成 · 12.4s</b>
              </div>
            </div>
          </div>

          <div className="gs3-ai-composer">
            <div className="gs3-ai-input">
              发消息或创建任务，/ 调用指令，@ 文件或对话
            </div>
            <div className="gs3-ai-compose-row">
              <span className="gs3-ai-plus">{Icon.plus}</span>
              <span className="gs3-ai-scope">
                工作区内修改 {Icon.chevronDown}
              </span>
              <span className="gs3-ai-model">
                volcengine · deepseek-v4.1-flash {Icon.chevronDown}
              </span>
              <span className="gs3-ai-gear">{Icon.gear}</span>
              <span className="gs3-ai-send">↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- State pairs (two separate windows each) ----------------------------- */

function ClaudePair({ prompt }: { prompt: string }) {
  return (
    <div className="gs3-pair">
      <div className="gs3-win gs3-win--agent gs3-win--cli">
        <AppWindowChrome
          mark={
            <Image
              src="/brand/claude.svg"
              alt=""
              width={11}
              height={11}
              unoptimized
            />
          }
          title="Claude Code"
          detail="acme-app"
          hint="sonnet 4.5"
          chip={<LiveChip variant="run" />}
        />
        <ClaudePane prompt={prompt} />
      </div>
      <BrowserWindow variant="claude" />
    </div>
  );
}

function ChatGPTPair() {
  return (
    <div className="gs3-pair">
      <ChatGPTWindow />
      <BrowserWindow variant="chatgpt" />
    </div>
  );
}

function WebCrossPair({ copy }: { copy: GuideMockupCopy }) {
  return (
    <div className="gs3-pair">
      <AiAssistantWindow copy={copy} />
      <BrowserWindow variant="webcross" />
    </div>
  );
}

/* ---- Dock (the interactive switcher) ------------------------------------ */

function Dock({
  active,
  onSelect,
  onKeyNavigate,
  tabRefs,
}: {
  active: StageView;
  onSelect: (view: StageView) => void;
  onKeyNavigate: (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  tabRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>;
}) {
  return (
    <div className="gs3-dock" role="tablist" aria-label="Agent workspace">
      {DOCK_ITEMS.map((item, index) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`gs3-tab-${item.id}`}
            aria-selected={isActive}
            aria-controls="gs3-panel"
            tabIndex={isActive ? 0 : -1}
            data-label={item.label}
            className={`gs3-dock-btn gs3-dock-btn--${item.id}${
              isActive ? " is-active" : ""
            }`}
            onClick={() => onSelect(item.id)}
            onKeyDown={(event) => onKeyNavigate(event, index)}
          >
            <span className="gs3-dock-glyph">
              {item.id === "claude" && (
                <Image
                  src="/brand/claude.svg"
                  alt=""
                  width={17}
                  height={17}
                  unoptimized
                />
              )}
              {item.id === "chatgpt" && (
                <Image
                  src="/brand/codex.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                />
              )}
              {item.id === "webcross" && (
                <Image
                  className="gs3-dock-wc"
                  src="/brand/webcross-icon.webp"
                  alt=""
                  width={19}
                  height={15}
                  unoptimized
                />
              )}
              <i className="gs3-dock-dot" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---- Component ----------------------------------------------------------- */

export function GuideStep3Agents({ copy }: { copy: GuideMockupCopy }) {
  const prompt = copy.agentPrompt ?? "";
  const [active, setActive] = useState<StageView>("claude");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onDockKeyNavigate = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % DOCK_ITEMS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + DOCK_ITEMS.length) % DOCK_ITEMS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = DOCK_ITEMS.length - 1;
    }
    if (next === -1) return;
    event.preventDefault();
    setActive(DOCK_ITEMS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="gs3-stage" role="group" aria-label={copy.agentTitle}>
      <div className="gs3-desk" aria-hidden="true" />

      {/* Browser "Space" cards the agents are driving, peeking from behind. */}
      <div className="gs3-spaces" aria-hidden="true">
        <SpaceCard
          variant="a"
          url="checkout.acme-app.dev"
          label="Checkout test"
        />
        <SpaceCard
          variant="b"
          url="stripe.acme-app.dev"
          label="Stripe payment"
        />
        <SpaceCard
          variant="c"
          url="traffic.acme-app.dev"
          label="Traffic report"
        />
      </div>

      {/* Foreground: two separate windows per state, crossfaded as pairs. */}
      <div
        className="gs3-views"
        id="gs3-panel"
        role="tabpanel"
        aria-labelledby={`gs3-tab-${active}`}
      >
        <div
          className={`gs3-view-wrap${active === "claude" ? " is-active" : ""}`}
          aria-hidden={active !== "claude"}
        >
          <ClaudePair prompt={prompt} />
        </div>
        <div
          className={`gs3-view-wrap${active === "chatgpt" ? " is-active" : ""}`}
          aria-hidden={active !== "chatgpt"}
        >
          <ChatGPTPair />
        </div>
        <div
          className={`gs3-view-wrap${active === "webcross" ? " is-active" : ""}`}
          aria-hidden={active !== "webcross"}
        >
          <WebCrossPair copy={copy} />
        </div>
      </div>

      {/* Ego-style frosted dock = the switcher. */}
      <div className="gs3-dock-wrap">
        <Dock
          active={active}
          onSelect={setActive}
          onKeyNavigate={onDockKeyNavigate}
          tabRefs={tabRefs}
        />
        <p className="gs3-caption">
          <Image
            className="gs3-caption-mark"
            src="/brand/webcross-horizontal.webp"
            alt=""
            width={1200}
            height={314}
            unoptimized
          />
          <span>{copy.agentHint}</span>
        </p>
      </div>
    </div>
  );
}
