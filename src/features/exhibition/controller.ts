/**
 * Two-layer chapter crossfade: timing and skip rules.
 */
import type { ChapterId } from "@/content/types";

/** Crossfade duration for both layers (ms). */
export const DURATION = 320;
/** Soft ease-out-quint settle. */
export const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function shouldAnimate(fromChapter: ChapterId, toChapter: ChapterId, reduceMotion: boolean): boolean {
  if (reduceMotion) return false;
  return fromChapter !== toChapter;
}
