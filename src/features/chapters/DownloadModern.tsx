/** Shared release board used by every localized download page. */
"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import type { DesktopReleases, DesktopPlatform as Platform } from "@/content/releases";
import type { Locale } from "@/content/types";
import type { Messages } from "@/i18n/messages";

type DownloadCopy = Messages["download"];
type PlatformCopy = DownloadCopy["platforms"][Platform];

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    platform?: string;
  };
};

function detectPlatform(): Platform | null {
  const override = new URLSearchParams(window.location.search).get("platform");
  if (override === "macos" || override === "windows") return override;
  if (override === "unknown") return null;

  const browserNavigator = navigator as NavigatorWithUserAgentData;
  const userAgentDataPlatform = browserNavigator.userAgentData?.platform ?? "";
  const legacyPlatform = navigator.platform ?? "";
  const platformHint = userAgentDataPlatform || legacyPlatform;

  if (/mac/i.test(platformHint)) return "macos";
  if (/win/i.test(platformHint)) return "windows";
  return null;
}

function sharedReleaseValue(
  releases: DesktopReleases,
  field: "version" | "size",
  fallback: string,
): string {
  const values = Object.values(releases)
    .map((release) => release[field])
    .filter(Boolean);
  return values.length > 0 && new Set(values).size === 1 ? values[0] : fallback;
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8.92-2.85-.9.04-1.98.6-2.61 1.34-.55.63-1.03 1.67-.9 2.71.99.08 2.01-.48 2.59-1.2" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.551H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

export function DownloadModern({
  locale,
  copy,
  releases,
}: {
  locale: Locale;
  copy: DownloadCopy;
  releases: DesktopReleases;
}) {
  const [recommendedPlatform, setRecommendedPlatform] = useState<Platform | null>(null);
  const [toastPlatform, setToastPlatform] = useState<Platform | null>(null);
  const [lastTrigger, setLastTrigger] = useState<HTMLButtonElement | null>(null);

  const currentVersion = sharedReleaseValue(releases, "version", copy.currentVersion);
  const packageSize = sharedReleaseValue(releases, "size", "");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setRecommendedPlatform(detectPlatform());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!toastPlatform) return;

    const timeoutId = window.setTimeout(() => {
      setToastPlatform(null);
      window.requestAnimationFrame(() => lastTrigger?.focus());
    }, 6000);

    return () => window.clearTimeout(timeoutId);
  }, [lastTrigger, toastPlatform]);

  useEffect(() => {
    if (!toastPlatform) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setToastPlatform(null);
      window.requestAnimationFrame(() => lastTrigger?.focus());
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lastTrigger, toastPlatform]);

  const handleDownload = (platform: Platform, event: MouseEvent<HTMLButtonElement>) => {
    const release = releases[platform];
    setLastTrigger(event.currentTarget);

    if (release.url) {
      window.location.assign(release.url);
      return;
    }

    setToastPlatform(platform);
  };

  const closeToast = () => {
    setToastPlatform(null);
    window.requestAnimationFrame(() => lastTrigger?.focus());
  };

  return (
    <article className={`chapter download-page download-modern-page download-modern-page--${locale}`}>
      <section className="download-modern-hero" id="download-console" aria-labelledby="download-modern-title">
        <div className="download-modern-shell">
          <div className="download-modern-hero-grid">
            <div className="download-modern-hero-copy">
              <div className="download-modern-eyebrow">{copy.eyebrow}</div>
              <h1 className="download-modern-title" id="download-modern-title">
                {copy.titleLead}
                <span>{copy.titleAccent}</span>
              </h1>
              <p className="download-modern-lead">{copy.lead}</p>

              <div className="download-modern-beta" role="note" aria-label={`${copy.betaLabel}: ${copy.betaValue}`}>
                <div className="download-modern-beta-main">
                  <span>{copy.betaLabel}</span>
                  <strong>{copy.betaValue}</strong>
                </div>
                <div className="download-modern-beta-version">
                  <span>{currentVersion}</span>
                  {packageSize ? <strong>{packageSize}</strong> : null}
                </div>
              </div>
            </div>

            <section className="download-modern-release" id="download-platforms" aria-labelledby="download-modern-platform-title">
              <div className="download-modern-panel-header">
                <div className="download-modern-panel-heading">
                  <span className="download-modern-overline">{copy.panelOverline}</span>
                  <h2 id="download-modern-platform-title">{copy.panelTitle}</h2>
                  <p>{copy.panelLead}</p>
                </div>
                <div className="download-modern-panel-meta">
                  <span>{copy.supportedLabel}</span>
                  <strong>{copy.supportedValue}</strong>
                </div>
              </div>

              <div className="download-modern-platform-list" aria-label={copy.panelTitle}>
                <PlatformCard
                  platform="macos"
                  copy={copy.platforms.macos}
                  size={releases.macos.size}
                  recommended={recommendedPlatform === "macos"}
                  recommendation={copy.recommendation}
                  onDownload={handleDownload}
                >
                  <AppleIcon />
                </PlatformCard>
                <PlatformCard
                  platform="windows"
                  copy={copy.platforms.windows}
                  size={releases.windows.size}
                  recommended={recommendedPlatform === "windows"}
                  recommendation={copy.recommendation}
                  onDownload={handleDownload}
                >
                  <WindowsIcon />
                </PlatformCard>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="download-modern-faq" id="download-faq" aria-labelledby="download-modern-faq-title">
        <div className="download-modern-shell">
          <div className="faq-section">
            <div className="faq-rail">
              <h2 className="section-title faq-title" id="download-modern-faq-title">
                {copy.faqTitleLead}
                <em className="em-accent">{copy.faqTitleAccent}</em>
              </h2>
              <p className="section-subtitle faq-subtitle">{copy.faqIntro}</p>
            </div>

            <div className="faq-list">
              {copy.faq.map((item, index) => (
                <details className="faq-item" key={item.question} open>
                  <summary className="faq-q">
                    <span className="faq-num" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-q-text">{item.question}</span>
                    <span className="faq-mark" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                        <path d="M12 5v14" className="faq-mark-bar" />
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-a">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="download-modern-closing" aria-label="再次下载">
        <div className="download-modern-shell download-modern-closing-inner">
          <h2>
            {copy.closingQuestion}
            <br />
            <span>{copy.closingTitle}</span>
          </h2>
          <a className="download-modern-closing-link" href="#download-console">
            {copy.closingCta}
            <ReturnIcon />
          </a>
        </div>
      </section>

      <div
        className={`download-modern-toast${toastPlatform ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        hidden={!toastPlatform}
      >
        <div className="download-modern-toast-copy">
          <strong>{copy.toastTitle}</strong>
          <span>
            {copy.toastMessage.replace("%platform%", copy.platforms[toastPlatform ?? "macos"].name)}
          </span>
        </div>
        <button className="download-modern-toast-close" type="button" aria-label={copy.toastClose} onClick={closeToast}>
          ×
        </button>
      </div>
    </article>
  );
}

function PlatformCard({
  platform,
  copy,
  size,
  recommended,
  recommendation,
  onDownload,
  children,
}: {
  platform: Platform;
  copy: PlatformCopy;
  size: string;
  recommended: boolean;
  recommendation: string;
  onDownload: (platform: Platform, event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}) {
  return (
    <article className={`download-modern-platform-card${recommended ? " is-recommended" : ""}`} data-platform-card={platform}>
      {recommended ? <span className="download-modern-recommendation">{recommendation}</span> : null}
      <div>
        <div className="download-modern-platform-head">
          <div className="download-modern-platform-name">
            <span className={`download-modern-platform-icon${platform === "windows" ? " windows" : ""}`} aria-hidden="true">
              {children}
            </span>
            <span>{copy.name}</span>
          </div>
        </div>
        <p className="download-modern-platform-copy">
          {copy.requirements.map((requirement) => (
            <span key={requirement}>{requirement}</span>
          ))}
          {size ? <span className="download-modern-platform-size">{size}</span> : null}
        </p>
      </div>
      <div className="download-modern-platform-actions">
        <button
          className="download-modern-platform-download"
          type="button"
          aria-label={copy.download}
          onClick={(event) => onDownload(platform, event)}
        >
          <DownloadIcon />
          <span>{copy.download}</span>
        </button>
      </div>
    </article>
  );
}
