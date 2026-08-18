/**
 * Allows crawlers and points them at the sitemap.
 */
import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl("sitemap.xml"),
  };
}
