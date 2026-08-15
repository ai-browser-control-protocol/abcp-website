/**
 * Locale prefix routing for the four launch languages.
 */
import { defineRouting } from "next-intl/routing";
import { LOCALES } from "@/content/types";

export const routing = defineRouting({
  locales: [...LOCALES],
  defaultLocale: "zh",
  localePrefix: "always",
});
