/**
 * Guide chapter: interactive 3-step quick start & operating guide for WebCross.
 *
 * Implements:
 *   - Real WebCross User desktop app mockup for Step 1 (Skill Installation Dialog)
 *   - Real WebCross User desktop app mockup for Step 2 (FleetEditor / New Browser)
 *   - Standard AI Agent chat interface mockup for Step 3 (Slash command & Tool Trace)
 *   - Unified website FAQ section (FaqSection)
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaqSection } from "@/components/ui/FaqSection";
import { chapterPath } from "@/content/chapters";
import type { Locale } from "@/content/types";
import type { Messages } from "@/i18n/messages";
import { Link } from "@/i18n/navigation";
import "./guide-chapter.css";

type GuideMockupCopy = Messages["guide"]["mockup"];

/** Common User Application Window Titlebar */
function UserAppTitlebar({ mockup }: { mockup: GuideMockupCopy }) {
  return (
    <div className="user-window-titlebar">
      <div className="user-traffic-lights">
        <span className="user-traffic-dot red" />
        <span className="user-traffic-dot yellow" />
        <span className="user-traffic-dot green" />
      </div>
      <span className="user-login-badge">{mockup.navLogin}</span>
    </div>
  );
}

/** Common User Application Sidebar (Exact Match to WebCross User Sidebar in Screenshots) */
function UserAppSidebar({ mockup }: { mockup: GuideMockupCopy }) {
  return (
    <aside className="user-side-nav">
      <div>
        {/* Brand Lockup */}
        <div className="user-side-brand">
          <Image
            className="user-brand-logo-image"
            src="/brand/webcross-horizontal.webp"
            alt="WebCross"
            width={1200}
            height={314}
            sizes="100px"
          />
        </div>

        {/* Workspace Nav Group */}
        <div className="user-nav-group-section">
          <span className="user-nav-group-label">{mockup.groupWorkspace}</span>
          <div className="user-nav-items-group">
            <button type="button" className="user-nav-item-btn is-active">
              <span>{mockup.navBrowsers}</span>
            </button>

            <button type="button" className="user-nav-item-btn">
              <span>{mockup.navAgentChat}</span>
              <span className="user-coming-soon-badge">
                {mockup.badgeComingSoon}
              </span>
            </button>
          </div>
        </div>

        {/* System Nav Group */}
        <div className="user-nav-group-section">
          <span className="user-nav-group-label">{mockup.groupSystem}</span>
          <div className="user-nav-items-group">
            <button type="button" className="user-nav-item-btn">
              <span>{mockup.navSettings}</span>
            </button>
            <button type="button" className="user-nav-item-btn">
              <span>{mockup.navGuide}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Connections Section */}
      <div>
        <div className="user-side-connections">
          <div className="user-side-connections-header">
            <span className="user-side-connections-title">
              {mockup.sideAccess}
            </span>
            <span className="user-side-invite-link">{mockup.sideInvite}</span>
          </div>
          <div className="user-protocol-row">
            <span>
              <i className="user-protocol-status-dot" />
              {mockup.connWs}
            </span>
            <span>{mockup.statusNotConnected}</span>
          </div>
          <div className="user-protocol-row">
            <span>
              <i className="user-protocol-status-dot" />
              {mockup.connMcp}
            </span>
            <span>{mockup.statusNotConnected}</span>
          </div>
          <div className="user-protocol-row is-callable">
            <span>
              <i className="user-protocol-status-dot" />
              {mockup.connCli}
            </span>
            <span>{mockup.statusCallable}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/** Step 1: WebCross User 真实桌面界面 — Skill 自动就绪弹窗 (Screenshot 1) */
function UserStep1SkillMockup({ mockup }: { mockup: GuideMockupCopy }) {
  return (
    <div className="user-app-window">
      <UserAppTitlebar mockup={mockup} />

      <div className="user-workbench-shell">
        <UserAppSidebar mockup={mockup} />

        {/* Background Main Surface (faintly visible behind blur) */}
        <div
          className="user-workbench-content"
          style={{ opacity: 0.35, filter: "blur(1.5px)" }}
          aria-hidden="true"
        >
          <div className="user-page-back-btn">
            ‹ {mockup.backText}
          </div>
          <div className="user-editor-head-title">{mockup.editorTitle}</div>
        </div>

        {/* Foreground Dialog Backdrop (Exact Match to Screenshot 1) */}
        <div className="user-dialog-backdrop">
          <div className="user-skill-dialog">
            <button
              type="button"
              className="user-dialog-close-btn"
              aria-label="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>

            <h2 className="user-dialog-h2">{mockup.dialogTitle}</h2>
            <p className="user-dialog-msg">{mockup.dialogDesc}</p>

            <span className="user-skill-targets-label">
              {mockup.sectionLabel}
            </span>

            <div className="user-skill-targets-list">
              {/* Target 1: 通用 */}
              <div className="user-skill-target-card is-active">
                <div className="user-target-left">
                  <div className="user-target-icon-box">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 2 10 5-10 5-10-5Z" />
                      <path d="m2 12 10 5 10-5" />
                      <path d="m2 17 10 5 10-5" />
                    </svg>
                  </div>
                  <span className="user-target-title">{mockup.target1Name}</span>
                  <span className="user-target-badge-pill">
                    {mockup.badgeRecommended}
                  </span>
                  <span className="user-target-badge-pill install-pill">
                    {mockup.badgeInstall}
                  </span>
                </div>
                <div className="user-toggle-switch is-on" />
              </div>

              {/* Target 2: Claude */}
              <div className="user-skill-target-card is-active">
                <div className="user-target-left">
                  <div className="user-target-icon-box">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                      <path d="M12 3v3.5M12 17.5v3.5M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M5.6 18.4l2.5-2.5M15.9 8.1l2.5-2.5" />
                    </svg>
                  </div>
                  <span className="user-target-title">{mockup.target2Name}</span>
                  <span className="user-target-badge-pill">
                    {mockup.badgeRecommended}
                  </span>
                  <span className="user-target-badge-pill install-pill">
                    {mockup.badgeInstall}
                  </span>
                </div>
                <div className="user-toggle-switch is-on" />
              </div>

              {/* Target 3: Codex */}
              <div className="user-skill-target-card">
                <div className="user-target-left">
                  <div className="user-target-icon-box is-muted">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 7 5 5-5 5M13 17h6" />
                    </svg>
                  </div>
                  <span className="user-target-title">{mockup.target3Name}</span>
                  <span className="user-target-badge-pill install-pill">
                    {mockup.badgeInstall}
                  </span>
                </div>
                <div className="user-toggle-switch" />
              </div>
            </div>

            <footer className="user-dialog-footer">
              <div className="user-dialog-note">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>{mockup.dialogNote}</span>
              </div>
              <div className="user-dialog-actions">
                <button type="button" className="user-btn-quiet">
                  {mockup.btnDismiss}
                </button>
                <button type="button" className="user-btn-primary">
                  {mockup.btnInstall}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Step 2: WebCross User 真实桌面界面 — 新建浏览器 (Screenshot 2) */
function UserStep2BrowserMockup({ mockup }: { mockup: GuideMockupCopy }) {
  return (
    <div className="user-app-window">
      <UserAppTitlebar mockup={mockup} />

      <div className="user-workbench-shell">
        <UserAppSidebar mockup={mockup} />

        {/* Main Workbench Content: Matches Screenshot 2 (Simple creation: only needs name) */}
        <div className="user-workbench-content">
          <button type="button" className="user-page-back-btn">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{mockup.backText}</span>
          </button>

          <h1 className="user-editor-head-title">{mockup.editorTitle}</h1>
          <p className="user-editor-head-desc">{mockup.editorDesc}</p>

          <div className="user-card-surface">
            {/* Field: 名字 */}
            <label className="user-form-label">{mockup.nameLabel}</label>
            <div className="user-input-container">
              <div className="user-input-text">
                <span className="user-input-cursor" />
                <span>{mockup.namePlaceholder}</span>
              </div>
            </div>

            {/* Collapsed Advanced Options Toggle */}
            <button type="button" className="user-options-toggle-btn">
              <span className="user-options-arrow-circle">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
              <span>{mockup.advancedOptions}</span>
            </button>

            {/* Card Footer Actions */}
            <div className="user-card-actions">
              <button type="button" className="user-btn-quiet">
                {mockup.btnCancel}
              </button>
              <button type="button" className="user-btn-primary">
                {mockup.btnSave}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Step 3: 常规 AI Agent 界面示意图 — 白天模式 & 无具体模型 / 虚假状态 */
function AgentStep3ChatMockup({ mockup }: { mockup: GuideMockupCopy }) {
  return (
    <div className="agent-mockup-frame">
      <div className="agent-titlebar">
        <div className="user-traffic-lights">
          <span className="user-traffic-dot red" />
          <span className="user-traffic-dot yellow" />
          <span className="user-traffic-dot green" />
        </div>
        <div className="agent-window-heading">
          <span className="agent-window-title">{mockup.agentTitle}</span>
        </div>
        <div className="agent-window-status">
          <span>{mockup.agentStatus}</span>
        </div>
      </div>

      <div className="agent-chat-feed">
        {/* User Prompt */}
        <div className="agent-bubble-user">
          <span className="agent-cmd-pill">/webcross-browser</span>
          <span className="agent-bubble-user-text">{mockup.userPrompt}</span>
        </div>

        {/* Assistant Response & Execution Trace */}
        <div className="agent-bubble-assistant">
          <div className="agent-avatar-icon" aria-hidden="true">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="12" x="3" y="6" rx="2" />
              <path d="M12 2v4" />
              <line x1="8" x2="8" y1="12" y2="12" />
              <line x1="16" x2="16" y1="12" y2="12" />
              <path d="M9 16h6" />
            </svg>
          </div>

          <div className="agent-assistant-body">
            {/* Tool Execution Card: Matches Screenshot 3 */}
            <div className="agent-tool-card">
              <div className="agent-tool-head">
                <span className="agent-tool-head-title">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>{mockup.toolTitle}</span>
                </span>
                <span className="agent-tool-status-text">
                  {mockup.toolStatus}
                </span>
              </div>
              <div className="agent-tool-step-row">
                <span className="agent-tool-step-check">✓</span>
                <span>{mockup.toolStep1}</span>
              </div>
              <div className="agent-tool-step-row">
                <span className="agent-tool-step-check">✓</span>
                <span>{mockup.toolStep2}</span>
              </div>
            </div>

            {/* Loading dots indicator from Screenshot 3 */}
            <div className="agent-loading-dots" aria-hidden="true">
              <span className="agent-dot" />
              <span className="agent-dot" />
              <span className="agent-dot" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Input Dock: Matches Screenshot 3 */}
      <div className="agent-input-dock">
        <div className="agent-input-capsule">
          <span className="agent-cmd-pill">/webcross-browser</span>
          <span className="agent-input-placeholder">{mockup.inputPlaceholder}</span>
          <span className="guide-cursor" aria-hidden="true" />
        </div>
        <div className="agent-send-btn" aria-label="Send">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function GuideChapter({
  copy,
}: {
  locale: Locale;
  copy: Messages["guide"];
}) {
  const [activeStepId, setActiveStepId] = useState<number>(1);

  return (
    <article className="chapter guide-page">
      <div className="guide-ambient-glow" aria-hidden="true" />

      {/* ===== Hero Header ===== */}
      <header className="guide-header-center">
        <span className="guide-eyebrow">{copy.eyebrow}</span>
        <h1 className="guide-hero-title">{copy.heading}</h1>
        <p className="guide-hero-lead">{copy.subheading}</p>

        <div className="guide-cta-row">
          <Link
            className="guide-btn-primary"
            href={`${chapterPath("download")}#download-platforms`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 11 5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
            <span>{copy.ctaDownload}</span>
          </Link>

          <Link className="guide-btn-secondary" href={chapterPath("product")}>
            <span>{copy.ctaProduct}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      {/* ===== Interactive Stepper Section ===== */}
      <section
        className="guide-stepper-container"
        aria-label={copy.heading}
      >
        {/* Left Column: Interactive Step Cards */}
        <div className="guide-steps-column" role="tablist">
          {copy.steps.map((step) => {
            const isSelected = activeStepId === step.id;
            return (
              <div
                key={step.id}
                role="tab"
                tabIndex={0}
                aria-selected={isSelected}
                className={`guide-step-card${isSelected ? " is-active" : ""}`}
                onClick={() => setActiveStepId(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStepId(step.id);
                  }
                }}
              >
                <div className="guide-step-header">
                  <span className="guide-step-id-badge">{step.id}</span>
                  <span className="guide-step-tag">{step.tag}</span>
                </div>
                <h2 className="guide-step-title">{step.title}</h2>
                <p className="guide-step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Mockup Preview */}
        <div aria-live="polite" className="guide-mockup-column">
          {activeStepId === 1 && (
            <UserStep1SkillMockup mockup={copy.mockup} />
          )}
          {activeStepId === 2 && (
            <UserStep2BrowserMockup mockup={copy.mockup} />
          )}
          {activeStepId === 3 && (
            <AgentStep3ChatMockup mockup={copy.mockup} />
          )}
        </div>
      </section>

      {/* ===== Tips Bento Section ===== */}
      <section className="guide-tips-section">
        <h2 className="guide-section-heading">{copy.tipsTitle}</h2>
        <div className="guide-tips-grid">
          {copy.tips.map((tip, idx) => (
            <div key={idx} className="guide-tip-card">
              <h3 className="guide-tip-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--brand, #ff6b35)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                {tip.title}
              </h3>
              <p className="guide-tip-desc">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Unified FAQ Section (Matching Official QA Accordion Style) ===== */}
      <section style={{ marginTop: 40 }}>
        <FaqSection copy={copy.faq} />
      </section>
    </article>
  );
}
