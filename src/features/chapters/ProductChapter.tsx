import { getHomeCopy } from "@/content/home";
import type { Locale } from "@/content/types";
import { HomeChapter } from "./HomeChapter";

/** The homepage focuses on tasks and outcomes. Technical detail lives at
 *  /how-it-works so the two reading journeys stay separate. */
export function ProductChapter({ locale }: { locale: Locale }) {
  return <HomeChapter copy={getHomeCopy(locale)} locale={locale} />;
}
