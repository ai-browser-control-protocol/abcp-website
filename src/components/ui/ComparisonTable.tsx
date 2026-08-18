/**
 * Comparison matrix — products run across the top (x axis), evaluation
 * dimensions run down the side (y axis). The WebCross column is highlighted and
 * spells out the differentiator in words; every competitor column is a ✓ / — mark.
 */
import type { ComparisonCopy } from "@/content/models";
import "./comparison-table.css";

export function ComparisonTable({ copy }: { copy: ComparisonCopy }) {
  if (!copy?.products?.length) return null;
  const { products, dimensions } = copy;

  return (
    <section className="comparison-section" id="comparison">
      <div className="section-head-center">
        <span className="badge-pill">Why WebCross</span>
        <h2 className="section-title">{copy.title}</h2>
        <p className="section-subtitle">{copy.subtitle}</p>
      </div>

      <div className="comparison-scroll">
        <table className="comparison-table">
          <colgroup>
            <col className="col-dimension" />
            {products.map((p) => (
              <col key={p.name} className={p.highlight ? "col-highlight" : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="head-dimension">
                {copy.dimensionHead}
              </th>
              {products.map((p) => (
                <th key={p.name} scope="col" className={`head-product${p.highlight ? " is-highlight" : ""}`}>
                  <span className="head-product-name">{p.name}</span>
                  <span className="head-product-tag">{p.tagline}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dim) => (
              <tr key={dim.key}>
                <th scope="row" className="cell-dimension">
                  {dim.label}
                </th>
                {products.map((p) => {
                  const value = (p.values as Record<string, string | boolean>)[dim.key];
                  if (typeof value === "string") {
                    return (
                      <td key={p.name} className="cell-text">
                        {value}
                      </td>
                    );
                  }
                  return (
                    <td key={p.name} className={`cell-mark${value ? " is-yes" : " is-no"}`}>
                      <span className="mark">{value ? "✓" : "—"}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="comparison-legend">
        <span className="legend-item">
          <span className="mark is-yes">✓</span>
          {copy.legendYes}
        </span>
        <span className="legend-item">
          <span className="mark is-no">—</span>
          {copy.legendNo}
        </span>
      </div>
    </section>
  );
}
