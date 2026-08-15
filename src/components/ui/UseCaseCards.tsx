import type { Messages } from "@/i18n/messages";
import "./use-case-cards.css";

export function UseCaseCards({ copy }: { copy: Messages["product"]["useCases"] }) {
  if (!copy || !copy.items) return null;

  return (
    <section className="use-cases-section" id="use-cases">
      <div className="section-head-center">
        <span className="badge-pill">Enterprise & Workflow</span>
        <h2 className="section-title">{copy.title}</h2>
        <p className="section-subtitle">{copy.subtitle}</p>
      </div>

      <div className="use-cases-grid">
        {copy.items.map((item, idx) => (
          <div className="use-case-card card-glow" key={item.title}>
            <div className="use-case-icon-box">
              <span className="use-case-icon">
                {idx === 0 && "⚡"}
                {idx === 1 && "📋"}
                {idx === 2 && "🔍"}
              </span>
              <span className="use-case-num">Case 0{idx + 1}</span>
            </div>
            <h3 className="use-case-title">{item.title}</h3>
            <p className="use-case-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
