/**
 * Download chapter: multi-platform download releases, system specs,
 * platform-specific authentic SVG icons, and quick-start instructions.
 * Pure editorial layout without excessive card boxes or thick wireframes.
 */
import { FigureSlot } from "@/components/ui/FigureSlot";
import { figures } from "@/content/figures";
import type { Messages } from "@/i18n/messages";
import "./download-chapter.css";

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.61 1.34-.55.63-1.03 1.67-.9 2.71.99.08 2.01-.48 2.59-1.2" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.551H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.8" />
    </svg>
  );
}

function DownloadArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function DownloadChapter({ copy }: { copy: Messages["download"] & { systems: string } }) {
  return (
    <article className="chapter download-page">
      {/* Background Ambient Glow */}
      <div className="download-ambient-glow" aria-hidden="true" />

      {/* Header */}
      <header className="download-header-center">
        <h1 className="download-hero-title">{copy.title}</h1>
        <p className="download-hero-lead">{copy.lead}</p>
      </header>

      {/* Main Release Showcase Grid */}
      <div className="download-showcase-grid">
        {/* Left Column: Platform Releases */}
        <div className="download-platforms-col">
          {/* macOS Primary Release Item */}
          <div className="platform-release-item is-active-channel">
            <div className="platform-header-row">
              <div className="platform-identity">
                <span className="platform-svg-icon apple-icon">
                  <AppleIcon />
                </span>
                <span className="platform-title">macOS</span>
              </div>
              <span className="platform-telemetry active">
                <span className="telemetry-dot" />
                v0.9.2 Alpha · Available
              </span>
            </div>

            <p className="platform-desc">{copy.userHint}</p>

            <div className="platform-action-row">
              <a
                href="#download-macos"
                className="download-btn-primary"
                data-download="user"
                aria-label={copy.userButton}
              >
                <DownloadArrowIcon />
                <span>{copy.userButton}</span>
              </a>
              <span className="platform-meta-tag">{copy.userMeta}</span>
            </div>
          </div>

          {/* Windows Secondary Release Item */}
          <div className="platform-release-item is-upcoming-channel">
            <div className="platform-header-row">
              <div className="platform-identity">
                <span className="platform-svg-icon windows-icon">
                  <WindowsIcon />
                </span>
                <span className="platform-title">Windows</span>
              </div>
              <span className="platform-telemetry upcoming">
                Preview · Coming Soon
              </span>
            </div>

            <p className="platform-desc">{copy.clientHint}</p>

            <div className="platform-action-row">
              <button
                type="button"
                className="download-btn-disabled"
                disabled
                aria-disabled="true"
                data-download="client"
              >
                <span>{copy.clientButton}</span>
              </button>
              <span className="platform-meta-tag">{copy.clientMeta}</span>
            </div>
          </div>

          {/* Environmental Specs & Security Strip */}
          <div className="download-trust-strip">
            <div className="trust-strip-item">
              <span className="trust-strip-label">{copy.systemLabel}</span>
              <span className="trust-strip-value">{copy.systems}</span>
            </div>
            <div className="trust-strip-item">
              <span className="trust-strip-label">{copy.dataLabel}</span>
              <span className="trust-strip-value emerald-highlight">{copy.dataValue}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual & Quick Start Roadmap */}
        <div className="download-visual-col">
          <div className="download-figure-wrap">
            <FigureSlot
              src={figures.download}
              alt={copy.figure}
              caption={copy.figure}
              ratio="wide"
            />
          </div>

          {/* Quick Start 3-Step Guide */}
          {copy.quickstart && (
            <div className="quickstart-roadmap">
              <h2 className="quickstart-heading">{copy.quickstartTitle}</h2>
              <div className="quickstart-steps-list">
                {copy.quickstart.map((item, idx) => (
                  <div className="quickstart-step-item" key={idx}>
                    <div className="step-number">{item.step}</div>
                    <div className="step-content">
                      <div className="step-title">{item.title}</div>
                      <div className="step-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
