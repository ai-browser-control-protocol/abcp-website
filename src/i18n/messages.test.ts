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

  it("keeps product copy aligned with page understanding and action records", () => {
    const staleTerms = /SemanticTree|semantic[- ]tree|语义树|语义骨架|结构补齐|意味ツリー|意味圧縮|構造補完|시맨틱 압축|의미 트리|구조 보완|Full artifact|Detail artifact|Unified Page Observation|统一页面观测|統一ページ観測|통합 페이지 관측|Native observation|AXTree|DOM\.getAXTree|AXTree extraction mode|near[- ]zero|close to zero|nearly zero|近乎为零|ほぼゼロ|거의 0|(?:80|85)\s*%|cross[- ]domain|Shadow DOM|deeply nested.*(?:readable|read)|深层嵌套.*(?:读取|读)|クロスドメイン|심층 중첩.*(?:읽|읽을)|directly readable|直接读取|直接読み|직접 읽|zero[- ]blind|盲区|死角|사각지대/i;

    for (const locale of LOCALES) {
      const product = getMessages(locale).product;
      const token = getMessages(locale).product.features.items.find((item) => item.key === "token");
      const local = getMessages(locale).product.features.figures.local;
      expect(token, `${locale}.product.features.token`).toBeDefined();
      if (!token) continue;

      const tree = getMessages(locale).product.features.figures.tree;
      expect(JSON.stringify(product), `${locale}.product`).not.toMatch(staleTerms);
      expect([tree.root, tree.view, tree.diff, tree.detail, tree.query].every(Boolean), `${locale}.figures.tree.labels`).toBe(true);
      expect(JSON.stringify({ token, tree, local }), `${locale}.product.user-facing-copy`).not.toMatch(/AXTree|DOM\.getAXTree|\bn_/i);
      expect(tree.diffRows, `${locale}.figures.tree.diffRows`).toHaveLength(2);
      expect(tree.detailRows, `${locale}.figures.tree.detailRows`).toHaveLength(3);
      expect(tree.pills, `${locale}.figures.tree.pills`).toHaveLength(3);
      expect(tree.completeness, `${locale}.figures.tree.completeness`).toContain("/");
      expect(local.actions, `${locale}.figures.local.actions`).toHaveLength(3);
      expect(local.statuses, `${locale}.figures.local.statuses`).toHaveLength(3);
      expect([local.intent, local.page, local.attention, local.resume, local.evidence, local.recorded].every(Boolean), `${locale}.figures.local.evidence`).toBe(true);
    }
  });
});
