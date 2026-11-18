/**
 * Crossfade timing and skip rules.
 */
import { describe, expect, it } from "vitest";
import { DURATION, shouldAnimate } from "./controller";

describe("shouldAnimate", () => {
  it("skips when reduced motion is on", () => {
    expect(shouldAnimate("product", "guide", true)).toBe(false);
  });

  it("skips when the chapter does not change", () => {
    expect(shouldAnimate("guide", "guide", false)).toBe(false);
  });

  it("plays when the chapter changes", () => {
    expect(shouldAnimate("product", "guide", false)).toBe(true);
  });
});

describe("DURATION", () => {
  it("stays within a comfortable crossfade range", () => {
    expect(DURATION).toBeGreaterThanOrEqual(200);
    expect(DURATION).toBeLessThanOrEqual(600);
  });
});
