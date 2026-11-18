/**
 * Next.js config with next-intl request wiring.
 */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** The "how it works" chapter was renamed to "solutions"; keep old links alive. */
  async redirects() {
    return [
      { source: "/:locale(zh|en|ja|ko)/how-it-works", destination: "/:locale/solutions", permanent: true },
      { source: "/how-it-works", destination: "/solutions", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
