/**
 * Official-site identity strip. Expands on the product chapter.
 */
import type { ChromeCopy } from "@/content/models";
import type { ChapterId } from "@/content/types";

export function IdentityBand({ chrome, chapter }: { chrome: ChromeCopy; chapter: ChapterId }) {
  const expanded = chapter === "product";
  return (
    <section className={`identity${expanded ? " is-expanded" : ""}`}>
      <div>
        <p className="identity-mark">{chrome.brandName}</p>
        <p className="identity-thesis">{chrome.thesis}</p>
      </div>
      {expanded ? <p className="identity-tag">{chrome.tagline}</p> : null}
    </section>
  );
}
