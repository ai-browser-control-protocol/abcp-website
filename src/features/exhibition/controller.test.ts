/**
 * Crossfade timing and skip rules.
 */
import { describe, expect, it } from "vitest";
import { DURATION, shouldAnimate } from "./controller";

describe("shouldAnimate", () => {
  it("skips when reduced motion is on", () => {
    expect(shouldAnimate("product", "company", true)).toBe(false);
  });

  it("skips when the chapter does not change", () => {
    expect(shouldAnimate("company", "company", false)).toBe(false);
  });

  it("plays when the chapter changes", () => {
    expect(shouldAnimate("product", "company", false)).toBe(true);
  });
});

describe("DURATION", () => {
  it("stays within a comfortable crossfade range", () => {
    expect(DURATION).toBeGreaterThanOrEqual(200);
    expect(DURATION).toBeLessThanOrEqual(600);
  });
});
