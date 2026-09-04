/** Site footer: brand statement, product entry, and copyright. */
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
            <span className="footer-badge-local">{chrome.footer.localFirst}</span>
          </div>

          <div className="footer-extra-col">
            <h4 className="footer-col-title">{chrome.footer.productTitle}</h4>
            <p className="footer-desc-text">{chrome.footer.desc}</p>
            <Link href={chapterPath("download")} className="footer-cta-link">
              {chrome.footer.get} ➔
            </Link>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copyright">
            © {site.copyrightYear} {chrome.brandName}. All rights reserved.
          </span>
          <span className="footer-security-note">{chrome.footer.securityBadge}</span>
        </div>
      </div>
    </footer>
  );
}
