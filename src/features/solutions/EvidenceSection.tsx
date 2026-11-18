/**
 * Section 06 — auditable action records with human takeover.
 *
 * The visual is a CSS/DOM mockup of the real WebCross client on
 * x.com/compose/post: app titlebar, sidebar, 返回 / 页面来源, the 发布新贴文
 * title, the 动作记录 / 导航历史 tabs and the evidence chain for publishing a
 * post (human verification pause, composer field read, publish-button check,
 * the 18-operation workflow and the page-state binding). No bitmap and no outer
 * frame: the client window itself is the figure, which keeps the section inside
 * roughly one screen and every label crisp at any density.
 *
 * The mockup is decorative (aria-hidden) and painted in the client's own palette
 * (warm paper, hairline borders, one orange accent); meaning lives in the
 * heading, lead and the three numbered selling points under the window.
 */
"use client";

import type { SolutionsCopy } from "@/content/solutions";
import { useEnterMotion } from "./useEnterMotion";
import "./evidence-section.css";

type RecordTone = "human" | "ok" | "flow";

interface ActionRecord {
  tone: RecordTone;
  title: string;
  /** Protocol method shown under the title, like the real client */
  method?: string;
  /** Small line under a workflow title, e.g. 18 个操作 */
  sub?: string;
  state?: string;
  time: string;
  /** Inline action link on the workflow row */
  action?: string;
}

/** The publishing evidence chain, rewritten from the real client capture. */
const RECORDS: ActionRecord[] = [
  {
    tone: "human",
    title:
      "User action required: x.com 检测到登录验证，需要你在当前浏览器完成一次人工确认（约 2 分钟）。【当前实测事实】包 op…",
    method: "Hitl.requestPause",
    state: "已完成",
    time: "04:44 PM",
  },
  {
    tone: "ok",
    title: "读取页面可见字段，确认为「发布新贴文」编辑区而不是信息流首页",
    method: "DOM.getAXTree",
    state: "已完成",
    time: "04:43 PM",
  },
  {
    tone: "ok",
    title: "确认发布按钮可用：Post 按钮已启用，无禁用遮罩或二次确认",
    method: "Page.getState",
    state: "已完成",
    time: "04:43 PM",
  },
  {
    tone: "flow",
    title: "工作流详情",
    sub: "18 个操作",
    time: "04:43 PM",
    action: "查看详情",
  },
  {
    tone: "ok",
    title: "确认绑定页面当前状态（是否 x.com 发布页、是否有未保存草稿/弹窗）",
    method: "Page.getState",
    state: "已完成",
    time: "04:42 PM",
  },
];

function ClientSidebar() {
  return (
    <aside className="evd-side">
      <div className="evd-brand">
        <i className="evd-brand-mark" />
        WebCross
      </div>

      <div className="evd-side-group">
        <span className="evd-side-label">工作区</span>
        <span className="evd-side-item evd-side-item--active">窗口</span>
        <span className="evd-side-item">AI 助手</span>
      </div>

      <div className="evd-side-group">
        <span className="evd-side-label">系统</span>
        <span className="evd-side-item">设置</span>
        <span className="evd-side-item">指南</span>
      </div>

      <div className="evd-side-foot">
        <span className="evd-side-label">
          接入
          <em>邀请</em>
        </span>
        <span className="evd-side-status">
          <i />
          WebSocket
          <em>未连接</em>
        </span>
        <span className="evd-side-status">
          <i />
          MCP
          <em>未连接</em>
        </span>
        <span className="evd-side-status evd-side-status--on">
          <i />
          CLI
          <em>可调用</em>
        </span>
      </div>
    </aside>
  );
}

function RecordRow({ record }: { record: ActionRecord }) {
  return (
    <li className={`evd-row evd-row--${record.tone}`}>
      <i className="evd-row-dot" />
      <div className="evd-row-copy">
        <span className="evd-row-title">{record.title}</span>
        {record.method ? <span className="evd-row-method">{record.method}</span> : null}
        {record.sub ? <span className="evd-row-sub">{record.sub}</span> : null}
      </div>
      <span className="evd-row-state">
        {record.state ? <b>{record.state}</b> : null}
        <i>{record.time}</i>
      </span>
      {record.action ? <span className="evd-row-action">{record.action}</span> : <i className="evd-row-caret" />}
    </li>
  );
}

export function EvidenceSection({ copy }: { copy: SolutionsCopy["evidence"] }) {
  const ref = useEnterMotion<HTMLElement>();

  return (
    <section className="sol-section" id="evidence" ref={ref}>
      <div className="sol-section-head evd-head">
        <div>
          <span className="sol-kicker">{copy.kicker}</span>
          <h2 className="sol-heading">{copy.title}</h2>
        </div>
        <p className="sol-lead">{copy.lead}</p>
      </div>

      <figure className="evd-figure">
        <div className="evd-client" aria-hidden="true">
          <div className="evd-titlebar">
            <span className="evd-titlebar-login">登录</span>
            <i className="evd-winctl evd-winctl--min" />
            <i className="evd-winctl evd-winctl--max" />
            <i className="evd-winctl evd-winctl--close" />
          </div>

          <ClientSidebar />

          <div className="evd-main">
            <div className="evd-topbar">
              <span className="evd-back">
                <i className="evd-back-caret" />
                返回
              </span>
              <span className="evd-open">
                <i />
                打开现场
              </span>
            </div>

            <div className="evd-page-head">
              <div className="evd-title-block">
                <span className="evd-page-title">发布新贴文</span>
                <span className="evd-url">https://x.com/compose/post</span>
              </div>
              <div className="evd-source">
                <span className="evd-source-label">页面来源</span>
                <span className="evd-source-value">弹窗打开</span>
                <span className="evd-source-meta">来自标签页 x.com</span>
                <span className="evd-source-link">https://x.com/compose/post</span>
              </div>
            </div>

            <div className="evd-tabs">
              <span className="evd-page-pill">发布新贴文</span>
              <span className="evd-tab evd-tab--active">动作记录</span>
              <span className="evd-tab">导航历史</span>
            </div>

            <div className="evd-records">
              <div className="evd-records-head">
                <span className="evd-records-label">
                  <i />
                  动作记录
                </span>
                <span className="evd-records-tools">
                  <em>最新优先</em>
                  <em>最早优先</em>
                  <span className="evd-records-updated">最新更新: 04:44 PM</span>
                  <b className="evd-confirm">确认并继续</b>
                </span>
              </div>
              <ul className="evd-rows">
                {RECORDS.map((record) => (
                  <RecordRow key={`${record.tone}-${record.title}`} record={record} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </figure>

      <ol className="evd-points">
        {copy.callouts.map((callout, index) => (
          <li className="evd-point" key={callout.title}>
            <span className="evd-point-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="evd-point-copy">
              <h3>{callout.title}</h3>
              <p>{callout.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
