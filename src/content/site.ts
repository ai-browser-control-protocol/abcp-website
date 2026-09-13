/**
 * Canonical site-wide values shared by SEO, navigation, and footer rendering.
 */
import { DEFAULT_LOCALE } from "./types";

export const site = {
  name: "WebCross",
  url: process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://webcross.ai",
  defaultLocale: DEFAULT_LOCALE,
  copyrightYear: 2026,
  systems: "macOS 13+ / Windows 10 & 11",
  github: {
    owner: process.env.GITHUB_REPO_OWNER ?? "Aitheris",
    repo: process.env.GITHUB_REPO_NAME ?? "webcross-releases",
  },
};

export function siteUrl(...parts: string[]): string {
  const trimmed = parts
    .map((part) => part.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
  return trimmed ? `${site.url}/${trimmed}` : site.url;
}
