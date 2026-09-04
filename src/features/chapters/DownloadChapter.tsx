/**
 * Download chapter entry point. All locales share the same release-board
 * layout; the client component supplies the browser-aware interactions.
 */
import type { Locale } from "@/content/types";
import { DownloadModern } from "./DownloadModern";
import "@/components/ui/faq-section.css";
import "./download-chapter.css";

export function DownloadChapter({ locale }: { locale: Locale }) {
  return <DownloadModern locale={locale} />;
}
