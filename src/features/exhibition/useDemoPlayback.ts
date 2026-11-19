"use client";

import { useEffect, useRef } from "react";

/** Play the CSS sequence once per visit, after enough of the demo is visible. */
export function useDemoPlayback<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const demo = ref.current;
    if (!demo || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.45) demo.setAttribute("data-playing", "");
      else if (!entry.isIntersecting) demo.removeAttribute("data-playing");
    }, { threshold: [0, 0.45] });
    observer.observe(demo);
    return () => observer.disconnect();
  }, []);

  return ref;
}
