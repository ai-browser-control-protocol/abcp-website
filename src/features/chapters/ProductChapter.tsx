/**
 * Product chapter (home): immersive hero, live interactive playground,
 * tech metrics, 3-layer architecture, bento capabilities, comparison table,
 * and workflow use cases.
 */
"use client";

import { ArchitectureLens } from "@/components/ui/ArchitectureLens";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { TechMetrics } from "@/components/ui/TechMetrics";
import { UseCaseCards } from "@/components/ui/UseCaseCards";
import { InteractiveAgentDemo } from "@/components/mockup/InteractiveAgentDemo";
import { chapterPath } from "@/content/chapters";
import type { Messages } from "@/i18n/messages";
import { Link } from "@/i18n/navigation";
import "./product-chapter.css";

export function ProductChapter({
  copy,
  brandName,
  tagline,
  getLabel,
}: {
  copy: Messages["product"];
  brandName: string;
  tagline: string;
  getLabel: string;
}) {
  return (
    <article className="chapter hero-page">
      {/* Ambient Radial Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* Hero Section */}
      <header className="hero-header-center">
        <div className="hero-badge-pill">
          <span className="status-live-dot" />
          <span className="hero-badge-brand">{brandName}</span>
          <span className="hero-badge-sep">/</span>
          <span className="hero-badge-label">{copy.badge || "本地端自主智能体浏览器"}</span>
        </div>

        <h1 className="hero-display-title">
          <span className="hero-title-line">{copy.thesis}</span>
          {copy.thesisHighlight && (
            <span className="hero-title-highlight">{copy.thesisHighlight}</span>
          )}
        </h1>

        <p className="hero-lead-text">{copy.sub || tagline}</p>

        <div className="hero-cta-cluster">
          <Link className="ui-button-primary hero-btn-main" href={chapterPath("download")}>
            <span>{copy.ctaPrimary || getLabel}</span>
            <svg className="btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a className="ui-button-ghost hero-btn-sub" href="#workflow-demo">
            <svg className="btn-play-icon" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4.5 3.5V12.5L12.5 8L4.5 3.5Z" />
            </svg>
            <span>{copy.ctaSecondary || "探索工作流模拟演示"}</span>
          </a>
        </div>

        {copy.trustTags && copy.trustTags.length > 0 && (
          <div className="hero-trust-strip" aria-label="Key features">
            {copy.trustTags.map((tag, index) => (
              <span key={index} className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 4-Card Bento Metrics */}
      <TechMetrics metrics={copy.metrics} />

      {/* Live Interactive Agent Simulation */}
      <div id="workflow-demo">
        <InteractiveAgentDemo copy={copy.interactiveDemo} />
      </div>

      {/* 3-Layer System Architecture (Interactive Perspective Lens) */}
      <section className="architecture-three-layer">
        <div className="section-head-center">
          <span className="badge-pill">System Architecture</span>
          <h2 className="section-title">三层分立架构 · 筑牢物理隔离与协同边界</h2>
          <p className="section-subtitle">
            任务调度、专属 Harness 与定制页面引擎各司其职，兼顾极致执行吞吐与严密安全防护
          </p>
        </div>

        <ArchitectureLens layers={copy.layers} />
      </section>

      {/* Comparison Matrix */}
      <ComparisonTable copy={copy.comparison} />

      {/* Real-World Use Cases */}
      <UseCaseCards copy={copy.useCases} />
    </article>
  );
}
