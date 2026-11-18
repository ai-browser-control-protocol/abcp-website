"use client";

/**
 * Arms a section before it scrolls in, then flips `data-motion` to "live" once
 * it enters the viewport. Motion itself lives in CSS, so reduced-motion and
 * no-JS readers get the settled state and nothing moves.
 */
import { useEffect, useRef } from "react";

export function useEnterMotion<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

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
      { threshold: 0.14 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
