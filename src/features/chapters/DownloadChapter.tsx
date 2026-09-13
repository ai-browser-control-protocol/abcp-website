/**
 * Download chapter entry point. All locales share the same release-board
 * layout; installer URLs are resolved on the server, then the client
 * component supplies the browser-aware interactions.
 */
import { getDesktopReleases } from "@/content/releases";
import type { Locale } from "@/content/types";
import type { Messages } from "@/i18n/messages";
import { DownloadModern } from "./DownloadModern";
import "@/components/ui/faq-section.css";
import "./download-chapter.css";

export async function DownloadChapter({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Messages["download"];
}) {
  const releases = await getDesktopReleases();
  return <DownloadModern locale={locale} copy={copy} releases={releases} />;
}
