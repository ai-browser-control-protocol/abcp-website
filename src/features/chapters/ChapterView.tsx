/**
 * Renders the settled chapter body from a server-built view model.
 */
import type { ChapterViewModel } from "@/content/models";
import { jsonLd } from "@/features/seo/buildMetadata";
import { DownloadChapter } from "./DownloadChapter";
import { GuideChapter } from "./GuideChapter";
import { ProductChapter } from "./ProductChapter";

export function ChapterView({ model }: { model: ChapterViewModel }) {
  const content =
    model.id === "product" ? (
      <ProductChapter locale={model.locale} />
    ) : model.id === "guide" && model.guide ? (
      <GuideChapter locale={model.locale} copy={model.guide} />
    ) : model.id === "download" && model.download ? (
      <DownloadChapter locale={model.locale} copy={model.download} />
    ) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(model)) }}
      />
      {content}
    </>
  );
}
