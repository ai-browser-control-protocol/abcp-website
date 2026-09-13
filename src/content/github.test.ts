/**
 * Compact GitHub star formatting and payload parsing for the nav control.
 */
import { describe, expect, it } from "vitest";
import {
  formatStarCount,
  parseGithubRepoStars,
  shouldShowStarCount,
  toGithubNavDisplay,
} from "./github";

describe("shouldShowStarCount", () => {
  it("hides the count below 1k and when the fetch missed", () => {
    expect(shouldShowStarCount(null)).toBe(false);
    expect(shouldShowStarCount(999)).toBe(false);
    expect(shouldShowStarCount(1000)).toBe(true);
  });
});

describe("formatStarCount", () => {
  it("uses one decimal under 10k and strips a trailing .0", () => {
    expect(formatStarCount(1000)).toBe("1k");
    expect(formatStarCount(1600)).toBe("1.6k");
    expect(formatStarCount(9999)).toBe("10k");
  });

  it("uses whole thousands from 10k up", () => {
    expect(formatStarCount(16000)).toBe("16k");
    expect(formatStarCount(10500)).toBe("11k");
  });

  it("switches to millions at 1m", () => {
    expect(formatStarCount(1_200_000)).toBe("1.2m");
    expect(formatStarCount(1_000_000)).toBe("1m");
  });
});

describe("toGithubNavDisplay", () => {
  it("keeps the repo url and withholds the count below 1k", () => {
    expect(toGithubNavDisplay({ url: "https://github.com/Aitheris/webcross-releases", stars: 42 })).toEqual({
      url: "https://github.com/Aitheris/webcross-releases",
      starCount: null,
    });
    expect(toGithubNavDisplay({ url: "https://github.com/Aitheris/webcross-releases", stars: 16000 })).toEqual({
      url: "https://github.com/Aitheris/webcross-releases",
      starCount: "16k",
    });
  });
});

describe("parseGithubRepoStars", () => {
  it("reads a finite non-negative stargazers_count", () => {
    expect(parseGithubRepoStars({ stargazers_count: 16000 })).toBe(16000);
    expect(parseGithubRepoStars({ stargazers_count: 1.8 })).toBe(1);
  });

  it("returns null when the payload is unusable", () => {
    expect(parseGithubRepoStars(null)).toBeNull();
    expect(parseGithubRepoStars({})).toBeNull();
    expect(parseGithubRepoStars({ stargazers_count: "16k" })).toBeNull();
    expect(parseGithubRepoStars({ stargazers_count: -1 })).toBeNull();
  });
});
