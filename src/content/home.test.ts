import { describe, expect, it } from "vitest";
import { getHomeCopy } from "./home";
import { LOCALES } from "./types";

describe("homepage content", () => {
  it.each(LOCALES)("provides the complete task-led story for %s", (locale) => {
    const copy = getHomeCopy(locale);
    expect(copy.hero.titleA.length).toBeGreaterThan(0);
    expect(copy.workflow.steps).toHaveLength(3);
    expect(copy.workflow.subtitle).toContain("RPA");
    expect(copy.workflow.demo.research.sources).toHaveLength(3);
    expect(copy.workflow.demo.research.ideas).toHaveLength(3);
    expect(copy.workflow.demo.reuse.skill.length).toBeGreaterThan(0);
    expect(copy.workflow.demo.reuse.requirement.toLowerCase()).toContain("black friday");
    expect(copy.workflow.demo.research.sources.map((source) => source.name)).toEqual(["X", "Reddit", "Threads"]);
    expect(copy.cases.items).toHaveLength(3);
    expect(copy.comparison.columns).toHaveLength(5);
    expect(copy.comparison.dimensions).toHaveLength(9);
    expect(copy.comparison.dimensions.every((row) => row.values.length === copy.comparison.columns.length)).toBe(true);
    expect(copy.comparison.dimensions.every((row) => row.label.length > 0 && row.webcross.value.length > 0)).toBe(true);
    expect(copy.closing.titleAccent.length).toBeGreaterThan(0);
    expect(copy.closing.secondary.length).toBeGreaterThan(0);
    expect(copy.faq.items).toHaveLength(6);
    expect(copy.background.comparisonRows).toHaveLength(5);
    expect(copy.background.webcrossTitle).toContain("WebCross AI Agent");
    expect(copy.background.webcrossSubtitle).toContain("DeepSeek Harness");
    expect(copy.marketplace.categories.map((category) => category.name)).toEqual([
      "Amazon",
      "TikTok Shop",
      "Airbnb",
      "YouTube",
      "Reddit",
      "X",
      "WhatsApp",
      "Facebook",
      "Instagram",
      "LinkedIn",
      "Zillow",
      "Google & Bing SERP",
    ]);
    expect(copy.marketplace.categories.every((category) => category.cards.length === 4)).toBe(true);
    expect(copy.marketplace.categories.flatMap((category) => category.cards).some((card) => card.kind === "skill")).toBe(true);
    expect(copy.marketplace.categories.flatMap((category) => category.cards).some((card) => card.kind === "script")).toBe(true);
    const sectionTitles = [
      copy.workflow.title,
      copy.background.title,
      copy.environment.title,
      copy.marketplace.title,
      copy.cases.title,
      copy.comparison.title,
      copy.faq.title,
      copy.closing.title,
    ];
    expect(sectionTitles.every((title) => !/[。.]$/.test(title))).toBe(true);
  });

  it("explains how validated tasks become reusable assets", () => {
    for (const locale of LOCALES) {
      const copy = getHomeCopy(locale);
      expect(copy.workflow.subtitle.length).toBeGreaterThan(0);
      expect(copy.tech.architecture).toHaveLength(3);
      expect(copy.tech.benchmarkRows.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("falls back to English for Japanese and Korean while preserving Chinese", () => {
    expect(getHomeCopy("zh").hero.titleA).toContain("重复工作");
    expect(getHomeCopy("ja")).toEqual(getHomeCopy("en"));
    expect(getHomeCopy("ko")).toEqual(getHomeCopy("en"));
  });
});
