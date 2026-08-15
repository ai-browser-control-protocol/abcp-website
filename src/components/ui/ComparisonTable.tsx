import type { Messages } from "@/i18n/messages";
import "./comparison-table.css";

export function ComparisonTable({ copy }: { copy: Messages["product"]["comparison"] }) {
  if (!copy || !copy.rows) return null;

  return (
    <section className="comparison-section" id="comparison">
      <div className="section-head-center">
        <span className="badge-pill">Why ABCP</span>
        <h2 className="section-title">{copy.title}</h2>
        <p className="section-subtitle">{copy.subtitle}</p>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              {copy.headers.map((header, idx) => (
                <th key={header} className={idx === 1 ? "col-abcp-highlight" : ""}>
                  {header}
                  {idx === 1 && <span className="highlight-pill">Recommended</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row.dim}>
                <td className="row-dim">
                  <strong>{row.dim}</strong>
                </td>
                <td className="col-abcp-highlight">
                  <div className="cell-content-abcp">
                    <span className="check-icon">✓</span>
                    <span>{row.abcp}</span>
                  </div>
                </td>
                <td>{row.rpa}</td>
                <td>{row.cloud}</td>
                <td>{row.chat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
