/**
 * Replaceable site-wide placeholders used by SEO, footer, and download links.
 */
import type { Locale } from "./types";

export const site = {
  name: "ABCP",
  url: process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://abcp.example",
  defaultLocale: "zh" as Locale,
  twitterSite: "@abcp_example",
  twitterCreator: "@abcp_example",
  docsUrl: "https://abcp.example/docs",
  repoUrl: "https://github.com/abcp-example/abcp",
  copyrightYear: 2026,
  systems: "macOS 13+ / Windows 11",
};

export function siteUrl(...parts: string[]): string {
  const trimmed = parts
    .map((part) => part.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
  return trimmed ? `${site.url}/${trimmed}` : site.url;
}
