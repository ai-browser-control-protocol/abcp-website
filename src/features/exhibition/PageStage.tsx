/**
 * Long-page stage with a two-layer crossfade between chapters.
 *
 * On a chapter change the incoming chapter mounts in-flow (fading in from
 * below) while the outgoing chapter lingers as an absolute overlay (fading
 * out upward). The transition is keyed only on the chapter, so re-renders
 * during the animation can no longer interrupt it.
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
  const [leaving, setLeaving] = useState<ReactNode | null>(null);
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

  // Chapter change: crossfade old out, new in.
  useIsoLayoutEffect(() => {
    if (chapter === stagedChapterRef.current) return;
    const prev = stagedChapterRef.current;
    stagedChapterRef.current = chapter;
    cancelPending();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLeaving(staged);
    setStaged(children);
    setRunning(false);

    if (!shouldAnimate(prev, chapter, reduce)) {
      setLeaving(null);
      return;
    }

    // Paint the start state first, then flip to running so the transition runs.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setRunning(true));
      rafRef.current.push(raf2);
    });
    rafRef.current.push(raf1);
    timerRef.current = window.setTimeout(() => {
      setLeaving(null);
      setRunning(false);
    }, DURATION + 80);
  }, [chapter]);

  // Same chapter, new children (e.g. a locale switch): swap instantly.
  useEffect(() => {
    if (chapter !== stagedChapterRef.current) return;
    setStaged(children);
  }, [children]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => cancelPending(), []);

  const animating = leaving !== null;
  return (
    <main className="page-stage" aria-busy={animating} aria-label={chrome.a11y.stage} id="stage">
      <div className="page-stage-body">
        <div className="page-stage-canvas">
          <div className={`page-stage-layer${animating ? ` is-enter${running ? " is-running" : ""}` : ""}`}>
            {staged}
          </div>
          {leaving !== null ? (
            <div className={`page-stage-layer is-leave${running ? " is-running" : ""}`} aria-hidden="true">
              {leaving}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
