/** Site footer: brand statement, sitemap columns, and copyright row. */
"use client";

import Image from "next/image";
import { chapterPath } from "@/content/chapters";
import { site } from "@/content/site";
import type { ChromeCopy, GithubNavDisplay } from "@/content/models";
import { Link } from "@/i18n/navigation";
import "./footer.css";

export function Footer({ chrome, github }: { chrome: ChromeCopy; github: GithubNavDisplay }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <Image
              className="footer-brand-logo"
              src="/brand/webcross-horizontal.webp"
              alt={chrome.brandName}
              width={1200}
              height={314}
              sizes="172px"
            />
            <p className="footer-tagline">{chrome.tagline}</p>
            <span className="footer-badge-local">{chrome.footer.localFirst}</span>
          </div>

          <nav className="footer-columns" aria-label={chrome.a11y.footerNav}>
            <div className="footer-link-col">
              <h4 className="footer-col-title">{chrome.footer.productColumn}</h4>
              <Link href="/">{chrome.brandName}</Link>
              <span className="footer-link-blank">{chrome.footer.pricing}</span>
            </div>

            <div className="footer-link-col">
              <h4 className="footer-col-title">{chrome.footer.devColumn}</h4>
              <a href={github.url} target="_blank" rel="noopener noreferrer">
                {chrome.nav.github}
              </a>
              <Link href={chapterPath("guide")}>{chrome.footer.docs}</Link>
            </div>

            <div className="footer-link-col">
              <h4 className="footer-col-title">{chrome.footer.legalColumn}</h4>
              <Link href="/privacy">{chrome.footer.privacy}</Link>
              <Link href="/agreement">{chrome.footer.agreement}</Link>
            </div>
          </nav>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copyright">
            <Image
              className="footer-mark"
              src="/brand/webcross-icon.webp"
              alt=""
              width={18}
              height={18}
              sizes="18px"
            />
            © {site.copyrightYear} {chrome.brandName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
