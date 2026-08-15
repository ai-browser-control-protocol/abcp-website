/**
 * Site footer: brand statement, chapter navigation, and copyright.
 */
"use client";

import { OrbitalMark } from "@/brand/OrbitalMark";
import { chapterPath } from "@/content/chapters";
import { CHAPTER_IDS } from "@/content/types";
import { site } from "@/content/site";
import type { ChromeCopy } from "@/content/models";
import { Link } from "@/i18n/navigation";
import "./footer.css";

export function Footer({ chrome }: { chrome: ChromeCopy }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <OrbitalMark size={20} />
              <span className="footer-brand-name">{chrome.brandName}</span>
            </div>
            <p className="footer-tagline">{chrome.tagline}</p>
            <span className="footer-badge-local">{chrome.footerLocalFirst}</span>
          </div>

          <nav className="footer-nav-col" aria-label={chrome.a11y.queue}>
            <h4 className="footer-col-title">{chrome.footer.navTitle}</h4>
            <div className="footer-links-grid">
              {CHAPTER_IDS.map((id) => (
                <Link key={id} href={chapterPath(id)} className="footer-nav-link">
                  {chrome.nav[id]}
                </Link>
              ))}
            </div>
          </nav>

          <div className="footer-extra-col">
            <h4 className="footer-col-title">{chrome.footer.productTitle}</h4>
            <p className="footer-desc-text">{chrome.footer.desc}</p>
            <Link href={chapterPath("download")} className="footer-cta-link">
              {chrome.footerGet} ➔
            </Link>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copyright">
            © {site.copyrightYear} {chrome.brandName} · Qingzhu Technology. All rights reserved.
          </span>
          <span className="footer-security-note">{chrome.footer.securityBadge}</span>
        </div>
      </div>
    </footer>
  );
}
