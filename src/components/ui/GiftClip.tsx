/**
 * The closing card's flourish: a voxel character at her desk with a WebCross
 * present beside her, eyes drifting shut to whatever is in the headphones.
 *
 * Two stills on a loop — open, then shut — so the beat is the cut between them
 * rather than any transform. Both come out of the same 1984x2144 render and
 * share one crop, which is what keeps everything but the eyes still; cropping
 * each frame to its own content box would read as the whole figure jittering.
 *
 * The clock is CSS, not React. The hero strip earns its JS timeline with uneven
 * beats and an off-screen pause; this is two cuts sitting next to the page's
 * last call to action, and nothing should stand between the viewer and that
 * button.
 *
 * Both backdrops are keyed out in `scratchpad/gift3/key2.cjs` — the green wall
 * by hue, the grey floor by a flood that only conducts through neutral pixels,
 * because the floor and her sweater are the same grey within a few levels and
 * only the shelf between them separates the two.
 */
"use client";

import { useImagePreload } from "./useImagePreload";
import "./gift-clip.css";

/** Painting order matters — see the cut rule in gift-clip.css. */
const FRAMES = ["idle", "eyes"] as const;
const SOURCES = FRAMES.map((frame) => `/folk/gift-${frame}.webp`);

export function GiftClip({ className = "" }: { className?: string }) {
  const assetsReady = useImagePreload(SOURCES);

  return (
    <span className={`gift-clip${assetsReady ? " is-ready" : ""} ${className}`.trim()} aria-hidden="true">
      {FRAMES.map((frame) => (
        <img
          key={frame}
          className={`gift-frame is-${frame}`}
          src={`/folk/gift-${frame}.webp`}
          alt=""
          width={654}
          height={521}
          decoding="async"
        />
      ))}
    </span>
  );
}
