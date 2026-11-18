/**
 * Section 05 — 1000+ physically isolated environments, managed in one place.
 *
 * The visual is a CSS/DOM mockup of the real WebCross client "窗口" page:
 * app titlebar, sidebar (工作区 / 系统 / 接入), page header with 工作台 and
 * 打开窗口, the fleet counters line, the search / 卡片视图·列表视图 / 调整顺序
 * toolbar and six window cards (window id, tab record link, quiet empty preview
 * panels, tab counters, 打开·编辑·删除). It is decorative (aria-hidden): the
 * argument is carried by the heading and lead in front of it, and the three
 * isolation claims close the section as its captions.
 *
 * The mockup is painted in the client's own palette (warm paper, hairline
 * borders, one orange accent), not the marketing one, so it reads as a real
 * screenshot at a glance. Every label is live text; no animation is used.
 */
"use client";

import Image from "next/image";
import type { SolutionsCopy } from "@/content/solutions";
import { useEnterMotion } from "./useEnterMotion";
import "./fleet-section.css";

interface FleetWindow {
  /** Window handle shown after "窗口" */
  id: string;
  /** Open tab count */
  tabs: number;
  /** Tabs currently executing */
  running: number;
}

/** Six sample windows; real fleets keep thousands, hence the 1,000+ counters. */
const WINDOWS: FleetWindow[] = [
  { id: "67af68f1", tabs: 5, running: 0 },
  { id: "28a9a41c", tabs: 1, running: 0 },
  { id: "7c31b0de", tabs: 3, running: 1 },
  { id: "e4a92f18", tabs: 8, running: 0 },
  { id: "1b7d3c50", tabs: 2, running: 0 },
  { id: "c09f5e2a", tabs: 4, running: 0 },
];

/** Shared sidebar chrome for the client mockup (窗口 is the active page). */
function ClientSidebar() {
  return (
    <aside className="flt-side">
      <div className="flt-brand">
        <Image className="flt-brand-logo" src="/brand/webcross-horizontal.webp" alt="" width={1200} height={314} unoptimized />
      </div>

      <div className="flt-side-group">
        <span className="flt-side-label">工作区</span>
        <span className="flt-side-item flt-side-item--active">窗口</span>
        <span className="flt-side-item">AI 助手</span>
      </div>

      <div className="flt-side-group">
        <span className="flt-side-label">系统</span>
        <span className="flt-side-item">设置</span>
        <span className="flt-side-item">指南</span>
      </div>

      <div className="flt-side-foot">
        <span className="flt-side-label">
          接入
          <em>邀请</em>
        </span>
        <span className="flt-side-status">
          <i />
          WebSocket
          <em>未连接</em>
        </span>
        <span className="flt-side-status">
          <i />
          MCP
          <em>未连接</em>
        </span>
        <span className="flt-side-status flt-side-status--on">
          <i />
          CLI
          <em>可调用</em>
        </span>
      </div>
    </aside>
  );
}

function WindowCard({ window: windowData }: { window: FleetWindow }) {
  return (
    <article className="flt-card">
      <header className="flt-card-head">
        <i className="flt-win-icon" />
        <span className="flt-card-name">
          窗口 <b>{windowData.id}</b>
        </span>
        <em className="flt-card-id">ID</em>
        <span className="flt-card-tabrec">标签页记录</span>
      </header>

      <div className="flt-card-preview">暂时无法获取画面</div>

      <footer className="flt-card-foot">
        <p className="flt-card-tabs">
          <b>{windowData.tabs}</b> 个标签页
          <i>·</i>
          <b className={windowData.running > 0 ? "flt-card-running" : undefined}>{windowData.running}</b> 个进行中
        </p>
        <div className="flt-card-actions">
          <span className="flt-mini flt-mini--open">打开</span>
          <span className="flt-mini">编辑</span>
          <span className="flt-mini flt-mini--danger">删除</span>
        </div>
      </footer>
    </article>
  );
}

/**
 * The zh fleet title is one long clause. Splitting the last phrase into its own
 * inline-block gives the browser a clean break point on narrow screens ("统一管理"
 * starts line 2) while desktop keeps the whole line; en copy has no such split
 * and renders unchanged.
 */
function FleetHeading({ title }: { title: string }) {
  const marker = "统一管理";
  const cut = title.lastIndexOf(marker);
  if (cut <= 0) return <>{title}</>;
  return (
    <>
      <span className="flt-title-seg">{title.slice(0, cut).trimEnd()}</span>{" "}
      <span className="flt-title-seg">{title.slice(cut)}</span>
    </>
  );
}

export function FleetSection({ copy }: { copy: SolutionsCopy["fleet"] }) {
  const ref = useEnterMotion<HTMLElement>();

  return (
    <section className="sol-section" id="fleet" ref={ref}>
      <div className="sol-section-head flt-head">
        <div>
          <span className="sol-kicker">{copy.kicker}</span>
          <h2 className="sol-heading">
            <FleetHeading title={copy.title} />
          </h2>
        </div>
        <p className="sol-lead">{copy.lead}</p>
      </div>

      <div className="flt-stage">
        <div className="flt-client" aria-hidden="true">
          <div className="flt-titlebar">
            <span className="flt-titlebar-login">登录</span>
            <i className="flt-winctl flt-winctl--min" />
            <i className="flt-winctl flt-winctl--max" />
            <i className="flt-winctl flt-winctl--close" />
          </div>

          <ClientSidebar />

          <div className="flt-main">
            <div className="flt-page-head">
              <div className="flt-page-copy">
                <span className="flt-page-title">窗口</span>
                <p className="flt-page-desc">
                  管理多个独立窗口：配置专属网络与环境，实时查看并跟进正在执行的操作。
                </p>
              </div>
              <div className="flt-page-actions">
                <span className="flt-btn flt-btn--ghost">
                  工作台
                  <i className="flt-btn-badge">应用</i>
                </span>
                <span className="flt-btn flt-btn--primary">打开窗口</span>
              </div>
            </div>

            <div className="flt-toolbar">
              <p className="flt-counters">
                <b>1,000+</b> 个窗口
                <i>·</i>6 个已打开
                <i>·</i>3 个执行中
              </p>
              <div className="flt-tools">
                <span className="flt-search">
                  <i className="flt-search-icon" />
                  搜索窗口名称、ID 或标签
                </span>
                <span className="flt-seg">
                  <b>卡片视图</b>
                  <span>列表视图</span>
                </span>
                <span className="flt-btn flt-btn--ghost flt-btn--sort">调整顺序</span>
              </div>
            </div>

            <div className="flt-cards">
              {WINDOWS.map((windowData) => (
                <WindowCard key={windowData.id} window={windowData} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ul className="sol-bullets flt-bullets">
        {copy.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}
