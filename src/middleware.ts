/**
 * Prefixes every page with a locale and redirects `/` to `/zh`.
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(zh|ja|ko|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
