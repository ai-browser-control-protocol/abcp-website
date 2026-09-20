import { describe, expect, it } from "vitest";
import { getMessages } from "./messages";
import { LOCALES } from "@/content/types";

const REMOVED_PATHS = [
  "brand.thesisHighlight",
  "brand.badge",
  "brand.get",
  "resources",
  "queue",
  "beats",
  "figure",
  "nav.company",
  "nav.solutions",
  "nav.resources",
  "nav.discord",
  "footer.navTitle",
  "a11y.queue",
  "a11y.rail",
  "a11y.scenarioSwitcher",
  "a11y.featureList",
] as const;

function readPath(value: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current === null || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, value);
}

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, shape(child)]),
    );
  }
  return typeof value;
}

describe("locale message catalogs", () => {
  it("keeps every locale aligned with the Chinese template", () => {
    const baseline = shape(getMessages("zh"));

    for (const locale of LOCALES) {
      expect(shape(getMessages(locale))).toEqual(baseline);
    }
  });

  it("does not retain removed runtime fields", () => {
    for (const locale of LOCALES) {
      const messages = getMessages(locale);
      for (const path of REMOVED_PATHS) {
        expect(readPath(messages, path), `${locale}.${path}`).toBeUndefined();
      }
    }
  });

  it("keeps the token feature aligned with the unified observation contract", () => {
    const staleTerms = /SemanticTree|85%|85％|zero[- ]blind|死角|사각지대/i;

    for (const locale of LOCALES) {
      const token = getMessages(locale).product.features.items.find((item) => item.key === "token");
      expect(token, `${locale}.product.features.token`).toBeDefined();
      if (!token) continue;

      const tree = getMessages(locale).product.features.figures.tree;
      expect(JSON.stringify({ token, tree }), `${locale}.product.features.token`).not.toMatch(staleTerms);
      expect(tree.tags, `${locale}.figures.tree.tags`).toHaveLength(5);
      expect(tree.pills, `${locale}.figures.tree.pills`).toHaveLength(3);
      expect(tree.fidelity, `${locale}.figures.tree.fidelity`).toContain("computed");
    }
  });
});
