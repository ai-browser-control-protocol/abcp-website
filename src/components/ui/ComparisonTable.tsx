/**
 * Comparison matrix — products run across the top (x axis), evaluation
 * dimensions run down the side (y axis).
 *
 * Responsive behavior:
 * - Desktop (>768px): Full 7-column comparative table with zero scrollbars,
 *   balanced column widths and explicit overflow discipline.
 * - Mobile (<=768px): Interactive 1v1 matchup matrix with horizontal product
 *   selector tabs, pinning WebCross against the chosen competitor.
 */
"use client";

import { useState } from "react";
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

function RenderCellContent({
  value,
  isHighlight,
  tiers,
  legendYes,
  legendNo,
}: {
  value: CellValue;
  isHighlight?: boolean;
  tiers?: Record<string, string>;
  legendYes: string;
  legendNo: string;
}) {
  if (isMeter(value)) {
    return (
      <div className={`cell-meter-content${isHighlight ? " is-highlight" : ""}`}>
        <Meter tier={value.tier} label={tiers?.[value.tier] ?? value.tier} />
        <span className="meter-text">{value.text}</span>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <span className={`cell-text-val${isHighlight ? " is-highlight" : ""}`}>
        {value}
      </span>
    );
  }

  return (
    <span className={`mark ${value ? "is-yes" : "is-no"}${isHighlight ? " is-highlight" : ""}`}>
      <span aria-hidden="true">{value ? "✓" : "—"}</span>
      <span className="sr-only">{value ? legendYes : legendNo}</span>
    </span>
  );
}

export function ComparisonTable({ copy }: { copy: ComparisonCopy }) {
  const [ref, revealed] = useReveal<HTMLElement>({ threshold: 0.15 });
  const [selectedCompIdx, setSelectedCompIdx] = useState(0);

  if (!copy?.products?.length) return null;
  const { products, dimensions } = copy;
  const tiers = copy.tiers as Record<string, string>;

  // Split WebCross (hero) from comparison targets
  const heroProduct = products.find((p) => p.highlight) || products[0];
  const competitors = products.filter((p) => !p.highlight);
  const activeComp = competitors[selectedCompIdx] || competitors[0];

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

      {/* ===== Desktop Table View (>768px) ===== */}
      <div
        className="comparison-desktop-wrap"
        tabIndex={0}
        role="region"
        aria-labelledby="comparison-title"
      >
        <div className="comparison-scroll">
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
                          <RenderCellContent
                            value={value}
                            isHighlight={p.highlight}
                            tiers={tiers}
                            legendYes={copy.legendYes}
                            legendNo={copy.legendNo}
                          />
                        </td>
                      );
                    }

                    if (typeof value === "string") {
                      return (
                        <td key={p.name} className={`cell-text${band}`}>
                          <RenderCellContent
                            value={value}
                            isHighlight={p.highlight}
                            legendYes={copy.legendYes}
                            legendNo={copy.legendNo}
                          />
                        </td>
                      );
                    }

                    return (
                      <td
                        key={p.name}
                        className={`cell-mark${value ? " is-yes" : " is-no"}${band}`}
                      >
                        <RenderCellContent
                          value={value}
                          isHighlight={p.highlight}
                          legendYes={copy.legendYes}
                          legendNo={copy.legendNo}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Mobile 1v1 Matchup Card View (<=768px) ===== */}
      <div className="comparison-mobile-wrap" role="region" aria-label="移动端产品对比">
        {/* Horizontal competitor selector tab bar */}
        <div className="comparison-mobile-tabs" role="tablist" aria-label="选择对比竞品">
          {competitors.map((comp, idx) => {
            const isSelected = selectedCompIdx === idx;
            return (
              <button
                key={comp.name}
                type="button"
                role="tab"
                id={`tab-${idx}`}
                aria-selected={isSelected}
                aria-controls={`matchup-panel-${idx}`}
                className={`comparison-tab-btn${isSelected ? " is-active" : ""}`}
                onClick={() => setSelectedCompIdx(idx)}
              >
                <span className="tab-btn-text">{comp.name}</span>
              </button>
            );
          })}
        </div>

        {/* 1v1 Matrix Card */}
        <div
          className="comparison-mobile-card"
          id={`matchup-panel-${selectedCompIdx}`}
          role="tabpanel"
          aria-labelledby={`tab-${selectedCompIdx}`}
        >
          {/* Side-by-side header */}
          <div className="mobile-matrix-head">
            <div className="mobile-head-side is-hero">
              <span className="mobile-badge-flag">主角方案</span>
              <strong className="mobile-head-title">{heroProduct.name}</strong>
              <span className="mobile-head-sub">{heroProduct.tagline}</span>
            </div>
            <div className="mobile-head-divider">
              <span className="mobile-vs-chip">VS</span>
            </div>
            <div className="mobile-head-side is-comp">
              <span className="mobile-badge-flag is-muted">当前对比</span>
              <strong className="mobile-head-title">{activeComp.name}</strong>
              <span className="mobile-head-sub">{activeComp.tagline}</span>
            </div>
          </div>

          {/* Dimension items list */}
          <div className="mobile-matrix-body">
            {dimensions.map((dim) => {
              const heroVal = (heroProduct.values as Record<string, CellValue>)[dim.key];
              const compVal = (activeComp.values as Record<string, CellValue>)[dim.key];

              return (
                <div key={dim.key} className="mobile-dim-row">
                  <div className="mobile-dim-title">{dim.label}</div>
                  <div className="mobile-dim-split">
                    <div className="mobile-dim-cell is-hero">
                      <RenderCellContent
                        value={heroVal}
                        isHighlight={true}
                        tiers={tiers}
                        legendYes={copy.legendYes}
                        legendNo={copy.legendNo}
                      />
                    </div>
                    <div className="mobile-dim-cell is-comp">
                      <RenderCellContent
                        value={compVal}
                        isHighlight={false}
                        tiers={tiers}
                        legendYes={copy.legendYes}
                        legendNo={copy.legendNo}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
