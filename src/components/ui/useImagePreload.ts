"use client";

import { useEffect, useState } from "react";

/**
 * Load and decode an image set before a frame animation starts.
 *
 * The images are already requested by the DOM, but a successful network load
 * does not guarantee that the decoder has produced a frame yet. Starting a
 * CSS/React frame swap in that gap can briefly expose the transparent stack.
 */
function preloadImage(source: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    let settled = false;

    const settle = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const decode = () => {
      if (typeof image.decode !== "function") {
        settle();
        return;
      }
      image.decode().catch(() => undefined).then(settle, settle);
    };

    image.onload = decode;
    image.onerror = settle;
    image.src = source;

    // Cached images may already be complete before the load callback fires.
    if (image.complete) decode();
  });
}

export function useImagePreload(sources: readonly string[]): boolean {
  const sourceKey = sources.join("\u0000");
  const [status, setStatus] = useState({ key: sourceKey, ready: false });

  useEffect(() => {
    let cancelled = false;

    Promise.all(sources.map(preloadImage)).then(() => {
      if (!cancelled) setStatus({ key: sourceKey, ready: true });
    });

    return () => {
      cancelled = true;
    };
  }, [sourceKey, sources]);

  return status.key === sourceKey && status.ready;
}
