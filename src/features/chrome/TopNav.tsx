/**
 * The single site navigation row: wordmark, product link, language menu,
 * and quick download CTA.
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
