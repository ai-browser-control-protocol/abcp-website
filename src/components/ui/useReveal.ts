/**
 * "Has this scrolled into view yet?" — the one primitive behind every reveal
 * on the site.
 *
 * Fires once and disconnects: a reveal that re-runs when you scroll back up
 * turns a page into a slideshow, and re-reading copy you have already read
 * should not cost you an animation.
 *
 * Motion is left to CSS. This only flips a class on, so the same hook drives a
 * fade, a slide, or nothing at all under `prefers-reduced-motion` — the global
 * reset in base.css collapses the duration and the element simply appears.
 */
"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type RevealOptions = {
  /** How much of the element must be showing before it counts. */
  threshold?: number;
  /** Shrinks the viewport so a reveal starts before the element hits the edge. */
  rootMargin?: string;
};

export function useReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.25,
  rootMargin = "0px 0px -8% 0px",
}: RevealOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Anything already on screen at mount — above the fold, or a deep link that
       lands mid-page — should be shown, not animated in behind the visitor. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, revealed];
}
