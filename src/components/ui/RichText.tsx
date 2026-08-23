/**
 * Minimal inline-markup renderer for copy that lives in JSON.
 *
 * Locale strings are plain JSON, so the only way copy can say "this phrase is
 * the point" is an inline marker:
 *   `**…**`  becomes <em class="em-accent">, which each section then colours to
 *            taste — the brand name in a section title, the number that carries
 *            the claim in a scene line.
 *   `` `…` `` becomes <code class="em-code">, for the handful of places copy has
 *            to name a literal the visitor will type.
 *
 * Deliberately not a Markdown parser: two delimiters, no nesting, no HTML. Both
 * are matched as balanced pairs, so a lone `*` or backtick in prose is text.
 */
import { Fragment, type ReactNode } from "react";

/** Split on whole delimited spans; the capture keeps them in the result. */
const SPAN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function Emphasized({ text }: { text: string }): ReactNode {
  if (!text.includes("**") && !text.includes("`")) return text;
  return text.split(SPAN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <em key={i} className="em-accent">
          {part.slice(2, -2)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
      return (
        <code key={i} className="em-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Same copy with the markers stripped — for aria-label, title and alt text,
 *  where the raw delimiters would be read aloud. */
export function plain(text: string): string {
  return text.replace(SPAN, (span) =>
    span.startsWith("**") ? span.slice(2, -2) : span.slice(1, -1)
  );
}
