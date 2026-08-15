/**
 * The single site navigation row: wordmark, inline chapter links,
 * quick CTA button, and a language menu.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { OrbitalMark } from "@/brand/OrbitalMark";
import { Wordmark } from "@/components/ui/Wordmark";
import { useSelectedLayoutSegment } from "next/navigation";
import { chapterFromSegment, chapterPath } from "@/content/chapters";
import { CHAPTER_IDS, LOCALES } from "@/content/types";
import type { ChromeCopy } from "@/content/models";
import { Link } from "@/i18n/navigation";
import "./top-nav.css";

export function TopNav({ chrome }: { chrome: ChromeCopy }) {
  const chapter = chapterFromSegment(useSelectedLayoutSegment());
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    const onDown = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) setLangOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangOpen(false);
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
    <header className={`top-nav${navOpen ? " is-open" : ""}`}>
      <div className="top-nav-row">
        <Link href={chapterPath("product")} aria-label={chrome.brandName} className="top-nav-brand-link">
          <Wordmark mark={<OrbitalMark size={26} animated />}>
            <span className="brand-logo-text">{chrome.brandName}</span>
          </Wordmark>
        </Link>



        <nav className="top-nav-links" aria-label={chrome.a11y.mainNav}>
          {CHAPTER_IDS.map((id) => (
            <Link
              key={id}
              className={`nav-link${id === chapter ? " is-current" : ""}`}
              href={chapterPath(id)}
              aria-current={id === chapter ? "page" : undefined}
              onClick={closeAll}
            >
              {chrome.nav[id]}
            </Link>
          ))}

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

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((value) => !value)}
          >
            {chrome.a11y.menu}
          </button>
        </div>
      </div>
    </header>
  );
}
