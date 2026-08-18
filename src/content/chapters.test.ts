/**
 * Chapter path parsing for locale-prefixed and locale-stripped pathnames.
 */
import { describe, expect, it } from "vitest";
import { chapterFromSegment, parseChapter } from "./chapters";

describe("parseChapter", () => {
  it("reads product from locale home", () => {
    expect(parseChapter("/zh")).toBe("product");
    expect(parseChapter("/")).toBe("product");
  });

  it("maps a layout segment", () => {
    expect(chapterFromSegment(null)).toBe("product");
    expect(chapterFromSegment("company")).toBe("company");
    expect(chapterFromSegment("download")).toBe("download");
  });

  it("reads slugs with or without a locale prefix", () => {
    expect(parseChapter("/zh/company")).toBe("company");
    expect(parseChapter("/company")).toBe("company");
    expect(parseChapter("/ja/download")).toBe("download");
  });
});
