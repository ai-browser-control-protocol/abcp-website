/**
 * Comparison matrix — products run across the top (x axis), evaluation
 * dimensions run down the side (y axis).
 *
 * Three kinds of cell, decided by the value's shape rather than by the column:
 *   string                 → prose (the WebCross column spells out the differentiator)
 *   boolean                → ✓ / — mark
 *   { tier, text }         → a weight chip for "how much", used by the Token /
 *                            task-time rows where a tick would say nothing
 *
 * Column emphasis is driven by `product.highlight`, so the highlighted column
 * reads as one continuous band whatever each cell happens to contain.
 */
"use client";

import { Emphasized } from "./RichText";
import { useReveal } from "./useReveal";
import type { ComparisonCopy } from "@/content/models";
import "./comparison-table.css";

type MeterValue = { tier: string; text: string };
type CellValue = string | boolean | MeterValue;

function isMeter(value: CellValue): value is MeterValue {
  return typeof value === "object" && value !== null && "tier" in value;
}

/** Consumption weight. Orange reads light, black reads heavy — on these two rows
 *  less is better, so the brand colour lands on the cheap end. */
function Meter({ tier, label }: { tier: string; label: string }) {
  return <span className={`tier-chip is-${tier}`}>{label}</span>;
}

export function ComparisonTable({ copy }: { copy: ComparisonCopy }) {
  /* Above the early return: hooks have to run in the same order on every
     render, and this component bails out when there is nothing to compare. */
  const [ref, revealed] = useReveal<HTMLElement>({ threshold: 0.15 });

  if (!copy?.products?.length) return null;
  const { products, dimensions } = copy;
  const tiers = copy.tiers as Record<string, string>;

  return (
    <section
      className={`comparison-section${revealed ? " is-revealed" : ""}`}
      id="comparison"
      ref={ref}
    >
      <div className="section-head-center">
        <span className="badge-pill">Why WebCross</span>
        <h2 className="section-title" id="comparison-title">
          <Emphasized text={copy.title} />
        </h2>
        <p className="section-subtitle">{copy.subtitle}</p>
      </div>

      {/* Scrolls sideways when the columns outrun the viewport. A plain
          overflow container is pointer-only — without tabIndex a keyboard user
          cannot reach the columns that start off-screen. */}
      <div
        className="comparison-scroll"
        tabIndex={0}
        role="group"
        aria-labelledby="comparison-title"
      >
        <table className="comparison-table">
          <colgroup>
            <col className="col-dimension" />
            {products.map((p) => (
              <col key={p.name} className={p.highlight ? "col-highlight" : "col-product"} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="head-dimension">
                {copy.dimensionHead}
              </th>
              {products.map((p) => (
                <th
                  key={p.name}
                  scope="col"
                  className={`head-product${p.highlight ? " is-highlight" : ""}`}
                >
                  <span className="head-product-name" translate="no">
                    {p.name}
                  </span>
                  <span className="head-product-tag" translate="no">
                    {p.tagline}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dim) => (
              <tr key={dim.key}>
                <th scope="row" className="cell-dimension">
                  {dim.label}
                </th>
                {products.map((p) => {
                  const value = (p.values as Record<string, CellValue>)[dim.key];
                  const band = p.highlight ? " is-highlight" : "";

                  if (isMeter(value)) {
                    return (
                      <td key={p.name} className={`cell-meter is-tier-${value.tier}${band}`}>
                        <Meter tier={value.tier} label={tiers?.[value.tier] ?? value.tier} />
                        <span className="meter-text">{value.text}</span>
                      </td>
                    );
                  }

                  if (typeof value === "string") {
                    return (
                      <td key={p.name} className={`cell-text${band}`}>
                        {value}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={p.name}
                      className={`cell-mark${value ? " is-yes" : " is-no"}${band}`}
                    >
                      <span className="mark" aria-hidden="true">{value ? "✓" : "—"}</span>
                      <span className="sr-only">{value ? copy.legendYes : copy.legendNo}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The glyph is decoration here — the label right next to it is the text. */}
      <div className="comparison-legend">
        <span className="legend-item">
          <span className="mark is-yes" aria-hidden="true">✓</span>
          {copy.legendYes}
        </span>
        <span className="legend-item">
          <span className="mark is-no" aria-hidden="true">—</span>
          {copy.legendNo}
        </span>
      </div>

      {copy.note && <p className="comparison-note">{copy.note}</p>}
    </section>
  );
}
