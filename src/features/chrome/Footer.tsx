/**
 * Site footer: brand statement, navigation (chapters + secondary + Discord), copyright.
 */
"use client";

import { OrbitalMark } from "@/brand/OrbitalMark";
import { chapterPath } from "@/content/chapters";
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
              <Link href={chapterPath("product")} className="footer-nav-link">
                {chrome.nav.product}
              </Link>
              {[
                chrome.nav.solutions,
                chrome.resourceLinks.docs,
                chrome.resourceLinks.changelog,
                chrome.resourceLinks.blog,
                chrome.resourceLinks.tools,
              ].map((label) => (
                <a key={label} href="#" className="footer-nav-link" onClick={(e) => e.preventDefault()}>
                  {label}
                </a>
              ))}
              <a
                href="#"
                className="footer-nav-link footer-nav-discord"
                onClick={(e) => e.preventDefault()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a.075.075 0 0 0-.079.038c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.65 12.65 0 0 0-.617-1.249.078.078 0 0 0-.079-.038A19.736 19.736 0 0 0 5.928 4.37a.07.07 0 0 0-.032.027C2.533 9.046 1.674 13.58 2.097 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.771 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span>{chrome.nav.discord}</span>
              </a>
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
