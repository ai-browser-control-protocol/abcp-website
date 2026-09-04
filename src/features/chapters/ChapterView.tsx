/**
 * Renders the settled chapter body from a server-built view model.
 */
import type { ChapterViewModel } from "@/content/models";
import { CompanyChapter } from "./CompanyChapter";
import { DownloadChapter } from "./DownloadChapter";
import { ProductChapter } from "./ProductChapter";

export function ChapterView({ model }: { model: ChapterViewModel }) {
  if (model.id === "product" && model.product)
    return <ProductChapter copy={model.product} />;
  if (model.id === "company" && model.company) return <CompanyChapter copy={model.company} />;
  if (model.id === "download") return <DownloadChapter locale={model.locale} />;
  return null;
}
