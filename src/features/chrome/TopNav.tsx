/**
 * The single site navigation row: wordmark, product link, language menu,
 * download CTA, and GitHub star link.
 */
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { chapterFromSegment, chapterPath } from "@/content/chapters";
import type { ChromeCopy, GithubNavDisplay } from "@/content/models";
import { LOCALES } from "@/content/types";
import { Link } from "@/i18n/navigation";
import "./top-nav.css";

export function TopNav({ chrome, github }: { chrome: ChromeCopy; github: GithubNavDisplay }) {
  const chapter = chapterFromSegment(useSelectedLayoutSegment());
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  /* The download CTA rides along in the bar; past the hero the bar goes solid
     so the button keeps its contrast over whatever scrolls under it. */
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onDown = (event: MouseEvent) => {
      if (langOpen && langRef.current && !langRef.current.contains(event.target as Node)) setLangOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const closeAll = () => {
    setNavOpen(false);
    setLangOpen(false);
  };

  return (
    <header className={`top-nav${navOpen ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="top-nav-row">
        <Link href={chapterPath("product")} aria-label={chrome.brandName} className="top-nav-brand-link">
          <Image
            className="brand-logo-image"
            src="/brand/webcross-horizontal.webp"
            alt=""
            width={1200}
            height={314}
            sizes="(max-width: 720px) 124px, 166px"
            priority
          />
        </Link>

        <nav className="top-nav-links" aria-label={chrome.a11y.mainNav}>
          <Link
            className={`nav-link${chapter === "product" ? " is-current" : ""}`}
            href={chapterPath("product")}
            aria-current={chapter === "product" ? "page" : undefined}
            onClick={closeAll}
          >
            {chrome.nav.product}
          </Link>

          <Link
            className={`nav-link${chapter === "download" ? " is-current" : ""}`}
            href={`${chapterPath("download")}#download-platforms`}
            aria-current={chapter === "download" ? "page" : undefined}
            onClick={closeAll}
          >
            {chrome.nav.downloadSection}
          </Link>

          <div className="nav-panel-langs" aria-label={chrome.a11y.localeNav}>
            <span className="nav-panel-label">{chrome.a11y.localeNav}</span>
            <div className="nav-panel-lang-list">
              {LOCALES.map((locale) => (
                <Link
                  key={locale}
                  className={`locale-link${locale === chrome.locale ? " is-current" : ""}`}
                  href={chapterPath(chapter)}
                  hrefLang={locale}
                  locale={locale}
                  aria-current={locale === chrome.locale ? "true" : undefined}
                  onClick={closeAll}
                >
                  {chrome.localeLabels[locale]}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="top-nav-tools">
          <div className={`lang-menu${langOpen ? " is-open" : ""}`} ref={langRef}>
            <button
              type="button"
              className="lang-toggle"
              aria-expanded={langOpen}
              aria-haspopup="menu"
              onClick={() => setLangOpen((value) => !value)}
            >
              <svg
                className="lang-globe-icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span className="lang-text">{chrome.localeLabels[chrome.locale]}</span>
              <svg
                className="lang-chevron-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <ul className="lang-menu-panel" role="menu">
              {LOCALES.map((locale) => (
                <li key={locale} role="none">
                  <Link
                    role="menuitemradio"
                    aria-checked={locale === chrome.locale}
                    className={`lang-option${locale === chrome.locale ? " is-current" : ""}`}
                    href={chapterPath(chapter)}
                    hrefLang={locale}
                    locale={locale}
                    onClick={closeAll}
                  >
                    {chrome.localeLabels[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            className="nav-download-btn"
            href={`${chapterPath("download")}#download-platforms`}
            onClick={closeAll}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="m7 11 5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
            <span>{chrome.nav.download}</span>
          </Link>

          <GithubNavLink chrome={chrome} github={github} />

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-label={chrome.a11y.menu}
            onClick={() => setNavOpen((value) => !value)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {navOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function GithubNavLink({ chrome, github }: { chrome: ChromeCopy; github: GithubNavDisplay }) {
  const starCount = github.starCount;
  const ariaLabel =
    starCount != null ? chrome.a11y.githubStars.replace("{count}", starCount) : chrome.a11y.github;

  return (
    <a
      className="nav-github"
      href={github.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <svg className="nav-github-mark" width="22" height="22" viewBox="0 0 16 16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
        />
      </svg>
      {starCount != null ? (
        <>
          <span className="nav-github-count">{starCount}</span>
          <svg className="nav-github-star" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2.5 14.9 8.4 21.5 9.3 16.7 13.8 17.9 20.4 12 17.3 6.1 20.4 7.3 13.8 2.5 9.3 9.1 8.4Z"
            />
          </svg>
        </>
      ) : null}
    </a>
  );
}
