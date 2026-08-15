import type { Messages } from "@/i18n/messages";
import "./tech-metrics.css";

export function TechMetrics({ metrics }: { metrics: Messages["product"]["metrics"] }) {
  if (!metrics || metrics.length === 0) return null;

  const metricTags = ["LOCAL-FIRST", "TOKEN-SMART", "UNOBTRUSIVE", "AUTO-EVOLVE"];

  return (
    <section className="tech-metrics-section" aria-label="Key Product Features">
      <div className="metrics-grid">
        {metrics.map((m, idx) => (
          <div className="metric-card" key={m.label}>
            <div className="metric-head-row">
              <span className="metric-index-tag">0{idx + 1}</span>
              <span className="metric-cat-tag">{metricTags[idx] || "FEATURE"}</span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-value">{m.value}</span>
            </div>
            <strong className="metric-label">{m.label}</strong>
            <p className="metric-desc">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
