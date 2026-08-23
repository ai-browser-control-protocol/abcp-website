/**
 * The single site navigation row: wordmark, inline chapter links,
 * secondary nav (Solutions, Resources dropdown, Discord), quick CTA, and a language menu.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitalMark } from "@/brand/OrbitalMark";
import { Wordmark } from "@/components/ui/Wordmark";
import { useSelectedLayoutSegment } from "next/navigation";
import { chapterFromSegment, chapterPath } from "@/content/chapters";
import { LOCALES } from "@/content/types";
import type { ChromeCopy } from "@/content/models";
import { Link } from "@/i18n/navigation";
import "./top-nav.css";

export function TopNav({ chrome }: { chrome: ChromeCopy }) {
  const chapter = chapterFromSegment(useSelectedLayoutSegment());
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const resRef = useRef<HTMLDivElement>(null);

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
    if (!langOpen && !resOpen) return;
    const onDown = (event: MouseEvent) => {
      if (langOpen && langRef.current && !langRef.current.contains(event.target as Node)) setLangOpen(false);
      if (resOpen && resRef.current && !resRef.current.contains(event.target as Node)) setResOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangOpen(false);
        setResOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen, resOpen]);

  const closeAll = () => {
    setNavOpen(false);
    setLangOpen(false);
    setResOpen(false);
  };

  return (
    <header className={`top-nav${navOpen ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="top-nav-row">
        <Link href={chapterPath("product")} aria-label={chrome.brandName} className="top-nav-brand-link">
          <Wordmark mark={<OrbitalMark size={26} animated />}>
            <span className="brand-logo-text">{chrome.brandName}</span>
          </Wordmark>
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

          {/* Solutions (placeholder link for now) */}
          <a
            className="nav-link"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              closeAll();
            }}
          >
            {chrome.nav.solutions}
          </a>

          {/* Resources (dropdown) */}
          <div
            className={`nav-dropdown${resOpen ? " is-open" : ""}`}
            ref={resRef}
            onMouseEnter={() => setResOpen(true)}
            onMouseLeave={() => setResOpen(false)}
          >
            <button
              type="button"
              className="nav-link nav-dropdown-toggle"
              aria-haspopup="menu"
              aria-expanded={resOpen}
              onClick={() => setResOpen((value) => !value)}
            >
              {chrome.nav.resources}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="nav-dropdown-caret">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="nav-dropdown-panel" role="menu">
              {(
                [
                  { key: "docs", label: chrome.resourceLinks.docs },
                  { key: "changelog", label: chrome.resourceLinks.changelog },
                  { key: "blog", label: chrome.resourceLinks.blog },
                  { key: "tools", label: chrome.resourceLinks.tools },
                ] as const
              ).map((item) => (
                <a
                  key={item.key}
                  className="nav-dropdown-item"
                  role="menuitem"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    closeAll();
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

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
          {/* Discord — Blurple #5865F2, Discord's official brand color */}
          <a
            className="nav-discord-link"
            href="#"
            aria-label={chrome.nav.discord}
            onClick={(event) => {
              event.preventDefault();
              closeAll();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a.075.075 0 0 0-.079.038c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.65 12.65 0 0 0-.617-1.249.078.078 0 0 0-.079-.038A19.736 19.736 0 0 0 5.928 4.37a.07.07 0 0 0-.032.027C2.533 9.046 1.674 13.58 2.097 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.771 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>{chrome.nav.discord}</span>
          </a>

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

          <Link className="nav-download-btn" href={chapterPath("download")} onClick={closeAll}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="m7 11 5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
            <span>{chrome.nav.download}</span>
          </Link>

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
