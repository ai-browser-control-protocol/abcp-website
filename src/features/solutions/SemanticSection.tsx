"use client";

/**
 * Section 04 — AXTree compression.
 *
 * One claim, one panel: a full-page DOM is hundreds of thousands of characters,
 * while the AXTree WebCross hands to the model keeps only structure, state and
 * actionable targets — 85% of the page's information is dropped, and what
 * survives (about 15%) is still enough to act on.
 *
 * The panel draws that as a wide "full DOM" block settling into a small AXTree
 * block, with the 85% ratio counting up in between, the two measurements and
 * the kept/dropped legend underneath. Motion is CSS only: the effect just flips
 * `data-motion` via IntersectionObserver (no state), and reduced motion / no JS
 * get the settled panel.
 */
import { useEffect, useRef, type CSSProperties } from "react";
import type { SolutionsCopy } from "@/content/solutions";
import "./semantic-section.css";

/** Arms the panel before it scrolls in, then plays the compression once it
 *  enters the viewport. Decorative only — a missing IntersectionObserver falls
 *  straight through to the settled state. */
function useEnterMotion() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.dataset.motion = "armed";
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.motion = "live";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          node.dataset.motion = "live";
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Split `85%` into the static prefix/suffix and the digits so the number can
 *  count up with a CSS counter while the text around it comes from copy. */
function splitRatio(value: string): { prefix: string; digits: string; suffix: string; target: number } {
  const match = value.match(/\d+/);
  if (!match || match.index === undefined) return { prefix: value, digits: "", suffix: "", target: 0 };
  return {
    prefix: value.slice(0, match.index),
    digits: match[0],
    suffix: value.slice(match.index + match[0].length),
    target: Number(match[0]),
  };
}

/** A small, stable set of "DOM node" bars; every few are tinted as the nodes
 *  the AXTree keeps. Purely decorative. */
const DOM_LINES = Array.from({ length: 24 }, (_, index) => ({
  width: 24 + ((index * 29) % 62),
  kept: index % 5 === 2,
}));

/** Split "保留：结构 · 状态 · 可操作目标" into its term and its value list so the
 *  legend can set two typographic levels. Locales that don't use a colon keep
 *  the string intact. */
function splitLegend(value: string): { term: string; sep: string; values: string } {
  const match = value.match(/^([^:：]{1,14})([:：]\s*)(.+)$/);
  if (!match) return { term: "", sep: "", values: value };
  return { term: match[1], sep: match[2], values: match[3] };
}

export function SemanticSection({ copy }: { copy: SolutionsCopy["semantic"] }) {
  const ref = useEnterMotion();
  const compression = copy.compression;
  const ratio = splitRatio(compression.ratioValue);
  const kept = splitLegend(compression.keptLabel);
  const dropped = splitLegend(compression.droppedLabel);

  return (
    <section className="sol-section sem-section" id="semantic" ref={ref}>
      <div className="sol-section-head">
        <div>
          <span className="sol-kicker">{copy.kicker}</span>
          <h2 className="sol-heading">{copy.title}</h2>
        </div>
        <p className="sol-lead">{copy.lead}</p>
      </div>

      <div className="sem-panel sol-panel">
        <h3 className="sem-panel-title">{compression.title}</h3>

        <div className="sem-stage">
          <figure className="sem-block sem-block--dom">
            <figcaption className="sem-block-tag">{compression.diagramDom}</figcaption>
            <div className="sem-dom-lines" aria-hidden="true">
              {DOM_LINES.map((line, index) => (
                <i
                  key={index}
                  className={line.kept ? "is-kept" : undefined}
                  style={{ "--w": `${line.width}%` } as CSSProperties}
                />
              ))}
            </div>
            <span className="sem-dom-sweep" aria-hidden="true" />
          </figure>

          <div className="sem-middle">
            <span className="sem-flow" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="sem-ratio">
              <span className="sem-ratio-label">{compression.ratioLabel}</span>
              <span className="sem-ratio-value" aria-hidden="true">
                {ratio.prefix}
                <span
                  className="sem-ratio-count"
                  style={{ "--sem-ratio-final": ratio.target } as CSSProperties}
                />
                {ratio.suffix}
              </span>
              <span className="sr-only">{compression.ratioValue}</span>
            </div>
          </div>

          <figure className="sem-block sem-block--tree">
            <figcaption className="sem-block-tag">{compression.diagramTree}</figcaption>
            <div className="sem-tree-vis" aria-hidden="true">
              <span className="sem-tree-node sem-tree-node--root" />
              <span className="sem-tree-node" />
              <span className="sem-tree-node sem-tree-node--short" />
              <span className="sem-tree-node sem-tree-node--accent" />
            </div>
          </figure>
        </div>

        <ul className="sem-legend">
          <li className="sem-legend-item sem-legend-item--kept">
            <span className="sem-legend-swatch" aria-hidden="true" />
            <span className="sem-legend-text">
              {kept.term ? <b>{kept.term}</b> : null}
              {kept.sep}
              {kept.values}
            </span>
          </li>
          <li className="sem-legend-item sem-legend-item--dropped">
            <span className="sem-legend-swatch" aria-hidden="true" />
            <span className="sem-legend-text">
              {dropped.term ? <b>{dropped.term}</b> : null}
              {dropped.sep}
              {dropped.values}
            </span>
          </li>
        </ul>

        <div className="sem-foot">
          <dl className="sem-stats">
            <div className="sem-stat">
              <dt>{compression.dom.label}</dt>
              <dd>
                {compression.dom.value}
                <i>{compression.dom.unit}</i>
              </dd>
            </div>
            <span className="sem-stat-arrow" aria-hidden="true">
              →
            </span>
            <div className="sem-stat">
              <dt>{compression.tree.label}</dt>
              <dd>
                {compression.tree.value}
                <i>{compression.tree.unit}</i>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <ul className="sol-bullets sem-bullets">
        {copy.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}
