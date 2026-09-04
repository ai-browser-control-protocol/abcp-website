/**
 * FAQ — ten questions, sitting between the comparison matrix and the closing CTA.
 *
 * Layout is a split rather than the centred stack the other sections use: a rail
 * on the left holding the heading, and the questions in a column beside it. Ten
 * stacked accordions under a centred title would have left the page's widest
 * band empty down one side, and the rail stays put while you read.
 *
 * Each entry is a native <details>. No state, no JS, no ARIA of our own — the
 * element already carries the expanded/collapsed semantics, keyboard handling
 * and find-in-page support that a div-and-onClick version would have to
 * reimplement. The answers are in the DOM whether or not they are open, so they
 * are indexable and findable.
 *
 * Answers arrive from the catalog as a flat string[] with a leading marker per
 * block (see `blocksOf`), because JSON with a schema deep enough to express
 * "paragraph, then a list, then a paragraph" is far worse to translate against.
 */
"use client";

import { Fragment, type MouseEvent, type SyntheticEvent } from "react";
import { Emphasized } from "./RichText";
import type { FaqCopy } from "@/content/models";
import "./faq-section.css";

type Block =
  | { kind: "p" | "h"; text: string }
  | { kind: "ul" | "ol"; items: string[] };

/** Group a locale string[] into renderable blocks; consecutive list items of
 *  the same flavour collapse into one list so the markup nests correctly. */
function blocksOf(lines: readonly string[]): Block[] {
  const out: Block[] = [];
  for (const line of lines) {
    const ordered = /^\d+\.\s+/.exec(line);
    if (line.startsWith("- ") || ordered) {
      const kind = ordered ? "ol" : "ul";
      const text = ordered ? line.slice(ordered[0].length) : line.slice(2);
      const last = out[out.length - 1];
      if (last && last.kind === kind) last.items.push(text);
      else out.push({ kind, items: [text] });
    } else if (line.startsWith("# ")) {
      out.push({ kind: "h", text: line.slice(2) });
    } else {
      out.push({ kind: "p", text: line });
    }
  }
  return out;
}

export function FaqSection({ copy }: { copy: FaqCopy }) {
  if (!copy?.items?.length) return null;

  const handleSummaryClick = (e: MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches) {
      const currentDetails = e.currentTarget.closest("details");
      if (!currentDetails) return;

      // When opening an item on mobile, close all other open items
      if (!currentDetails.open) {
        const container = currentDetails.closest(".faq-list");
        if (container) {
          const allDetails = container.querySelectorAll<HTMLDetailsElement>("details.faq-item");
          allDetails.forEach((el) => {
            if (el !== currentDetails && el.open) {
              el.open = false;
            }
          });
        }
      }
    }
  };

  const handleToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches) {
      const details = e.currentTarget;
      if (details.open) {
        const container = details.closest(".faq-list");
        if (container) {
          const allDetails = container.querySelectorAll<HTMLDetailsElement>("details.faq-item");
          allDetails.forEach((el) => {
            if (el !== details && el.open) {
              el.open = false;
            }
          });
        }
      }
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-rail">
        <span className="badge-pill">{copy.badge}</span>
        <h2 className="section-title faq-title">
          <Emphasized text={copy.title} />
        </h2>
        <p className="section-subtitle faq-subtitle">{copy.subtitle}</p>
      </div>

      <div className="faq-list">
        {copy.items.map((item, index) => (
          /* The first one opens by default: ten identical closed bars read as an
             empty section, and it costs nothing to show what an answer is. */
          <details className="faq-item" key={item.q} open={index === 0} onToggle={handleToggle}>
            <summary className="faq-q" onClick={handleSummaryClick}>
              <span className="faq-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="faq-q-text">{item.q}</span>
              <span className="faq-mark" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M12 5v14" className="faq-mark-bar" />
                  <path d="M5 12h14" />
                </svg>
              </span>
            </summary>

            <div className="faq-a">
              {blocksOf(item.a).map((block, i) => (
                <Fragment key={i}>
                  {block.kind === "p" && (
                    <p>
                      <Emphasized text={block.text} />
                    </p>
                  )}
                  {block.kind === "h" && (
                    <h3 className="faq-a-head">
                      <Emphasized text={block.text} />
                    </h3>
                  )}
                  {block.kind === "ul" && (
                    <ul>
                      {block.items.map((line) => (
                        <li key={line}>
                          <Emphasized text={line} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {block.kind === "ol" && (
                    <ol>
                      {block.items.map((line) => (
                        <li key={line}>
                          <Emphasized text={line} />
                        </li>
                      ))}
                    </ol>
                  )}
                </Fragment>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
