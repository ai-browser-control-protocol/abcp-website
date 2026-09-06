/**
 * Renders the settled chapter body from a server-built view model.
 */
import type { ChapterViewModel } from "@/content/models";
import { jsonLd } from "@/features/seo/buildMetadata";
import { CompanyChapter } from "./CompanyChapter";
import { DownloadChapter } from "./DownloadChapter";
import { ProductChapter } from "./ProductChapter";

export function ChapterView({ model }: { model: ChapterViewModel }) {
  const content =
    model.id === "product" && model.product ? (
      <ProductChapter copy={model.product} />
    ) : model.id === "company" && model.company ? (
      <CompanyChapter copy={model.company} />
    ) : model.id === "download" ? (
      <DownloadChapter locale={model.locale} />
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
