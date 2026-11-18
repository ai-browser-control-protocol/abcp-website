"use client";

/**
 * Section 03 — the Chromium fork and the direct engine path.
 *
 * Two lanes make the architectural difference visible in motion: WebCross
 * binds Agent straight to Kernel, so a single glowing pulse drops down the
 * wire and lands almost immediately; a vanilla browser has to cross a JS
 * adapter and a CDP/RPC boundary, so the same pulse is handed off wire by
 * wire and each serialization bead visibly holds it back. Under the lanes the
 * execution-time chart fills on first view (1.0× vs 3.2×).
 *
 * All animation is CSS. The component only flips `data-motion` on the section
 * via IntersectionObserver — it never sets React state from an effect, so the
 * markup and the hydrated tree stay identical. With reduced motion (or no
 * JS) the section renders in its final state and nothing moves.
 */
import { useEffect, useRef } from "react";
import type { SolutionsCopy } from "@/content/solutions";
import "./engine-section.css";

/** Arms the section before it scrolls in, then plays it once it enters the
 *  viewport. The motion is decorative, so a missing IntersectionObserver
 *  simply skips straight to the final state. */
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

export function EngineSection({ copy }: { copy: SolutionsCopy["engine"] }) {
  const ref = useEnterMotion();

  return (
    <section className="sol-section eng-section" id="engine" ref={ref}>
      <div className="sol-section-head">
        <div>
          <span className="sol-kicker">{copy.kicker}</span>
          <h2 className="sol-heading">{copy.title}</h2>
        </div>
        <p className="sol-lead">{copy.lead}</p>
      </div>

      <div className="eng-panel sol-panel">
        <div className="eng-inner">
          <h3 className="eng-caption">{copy.diagramTitle}</h3>

          <div className="eng-lanes">
            <article className="eng-lane eng-lane--direct">
              <header className="eng-lane-head">
                <h4 className="eng-lane-name">{copy.direct.label}</h4>
                <span className="eng-lane-sub">{copy.direct.sub}</span>
              </header>
              <div className="eng-flow eng-flow--direct">
                <span className="eng-node">{copy.direct.agent}</span>
                <span className="eng-bridge">
                  <span className="eng-bridge-line" aria-hidden="true" />
                  <span className="eng-hop">
                    <span className="eng-hop-dot" aria-hidden="true" />
                    {copy.direct.hop}
                  </span>
                  <span className="eng-bridge-line" aria-hidden="true" />
                  <span className="eng-pulse eng-pulse--direct" aria-hidden="true" />
                </span>
                <span className="eng-node eng-node--core">
                  <span className="eng-core-dot" aria-hidden="true" />
                  {copy.direct.kernel}
                </span>
              </div>
              <p className="eng-note">
                <span className="eng-note-dot eng-note-dot--mint" aria-hidden="true" />
                {copy.direct.note}
              </p>
            </article>

            <article className="eng-lane eng-lane--shim">
              <header className="eng-lane-head">
                <h4 className="eng-lane-name">{copy.shim.label}</h4>
                <span className="eng-lane-sub">{copy.shim.sub}</span>
              </header>
              <div className="eng-flow">
                <span className="eng-node">{copy.shim.agent}</span>
                <span className="eng-wire" aria-hidden="true">
                  <span className="eng-pulse eng-pulse--1" />
                  <span className="eng-bead eng-bead--1" />
                </span>
                <span className="eng-node">{copy.shim.adapter}</span>
                <span className="eng-wire" aria-hidden="true">
                  <span className="eng-pulse eng-pulse--2" />
                  <span className="eng-bead eng-bead--2" />
                </span>
                <span className="eng-node">{copy.shim.protocol}</span>
                <span className="eng-wire" aria-hidden="true">
                  <span className="eng-pulse eng-pulse--3" />
                  <span className="eng-bead eng-bead--3" />
                </span>
                <span className="eng-node eng-node--kernel">{copy.shim.kernel}</span>
              </div>
              <p className="eng-note">
                <span className="eng-note-dot eng-note-dot--amber" aria-hidden="true" />
                {copy.shim.note}
              </p>
            </article>
          </div>

          <div className="eng-speed">
            <h3 className="eng-caption eng-caption--speed">{copy.speedTitle}</h3>
            <div className="eng-bars">
              <div className="eng-bar-row eng-bar-row--direct">
                <span className="eng-bar-name">{copy.speedRows.webcross}</span>
                <span className="eng-bar-track" aria-hidden="true">
                  <span className="eng-bar-fill" />
                </span>
                <span className="eng-bar-value">1.0×</span>
              </div>
              <div className="eng-bar-row eng-bar-row--legacy">
                <span className="eng-bar-name">{copy.speedRows.legacy}</span>
                <span className="eng-bar-track" aria-hidden="true">
                  <span className="eng-bar-fill" />
                  <span className="eng-bar-mark" />
                </span>
                <span className="eng-bar-value">3.2×</span>
              </div>
            </div>
            <p className="sol-fineprint">{copy.speedNote}</p>
          </div>
        </div>
      </div>

      <ul className="sol-bullets eng-bullets">
        {copy.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}
