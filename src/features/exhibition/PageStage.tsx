/**
 * Long-page stage: single-layer chapter transition.
 *
 * On a chapter change the stage scrolls to top before the first paint and the
 * incoming chapter fades in; the outgoing chapter is not kept as an overlay.
 *
 * Why no crossfade overlay: the chapters differ in both height (the long
 * product page vs the shorter download page) and layout model (the product
 * page is a contained column, the download page is full-bleed 100vw). An
 * absolute leave layer gets clipped mid-content by the incoming chapter's
 * height, the document height collapses under the viewport, and two opaque
 * white pages superimposed read as a torn double exposure. Scrolling to top
 * in a layout effect (before paint) also keeps Next's own scroll reset from
 * clamping the viewport mid-scroll — no visible jump, no tear.
 */
"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { chapterFromSegment } from "@/content/chapters";
import type { ChromeCopy } from "@/content/models";
import { DURATION, shouldAnimate } from "./controller";
import "./page-stage.css";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function PageStage({ chrome, children }: { chrome: ChromeCopy; children: ReactNode }) {
  const chapter = chapterFromSegment(useSelectedLayoutSegment());
  const [staged, setStaged] = useState<ReactNode>(children);
  /** True only inside the fade-in window right after a chapter change. */
  const [entering, setEntering] = useState(false);
  const [running, setRunning] = useState(false);
  const stagedChapterRef = useRef(chapter);
  const rafRef = useRef<number[]>([]);
  const timerRef = useRef<number | null>(null);

  const cancelPending = () => {
    rafRef.current.forEach((id) => cancelAnimationFrame(id));
    rafRef.current = [];
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Chapter change: scroll to top pre-paint, swap, fade the new chapter in.
  useIsoLayoutEffect(() => {
    if (chapter === stagedChapterRef.current) return;
    const prev = stagedChapterRef.current;
    stagedChapterRef.current = chapter;
    cancelPending();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reset scroll before the new chapter's first paint so the document height
    // change can never clamp the viewport mid-scroll.
    window.scrollTo(0, 0);
    setStaged(children);
    // First paint of the new chapter is the fade's start state (opacity 0).
    setEntering(true);
    setRunning(false);

    if (!shouldAnimate(prev, chapter, reduce)) {
      setEntering(false);
      return;
    }

    // Paint the start state first, then flip to running so the transition runs.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setRunning(true));
      rafRef.current.push(raf2);
    });
    rafRef.current.push(raf1);
    timerRef.current = window.setTimeout(() => {
      setEntering(false);
      setRunning(false);
    }, DURATION + 80);
  }, [chapter]);

  // Same chapter, new children (e.g. a locale switch): swap instantly.
  useEffect(() => {
    if (chapter !== stagedChapterRef.current) return;
    setStaged(children);
  }, [children]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => cancelPending(), []);

  return (
    <main className="page-stage" aria-label={chrome.a11y.stage} id="stage">
      <div className="page-stage-body">
        <div className="page-stage-canvas">
          <div className={`page-stage-layer${entering ? ` is-enter${running ? " is-running" : ""}` : ""}`}>
            {staged}
          </div>
        </div>
      </div>
    </main>
  );
}
