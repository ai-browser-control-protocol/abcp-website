import type { LegalCopy } from "@/content/legal";
import type { Locale } from "@/content/types";
import "./legal.css";

export function LegalDocument({
  locale,
  copy,
}: {
  locale: Locale;
  copy: LegalCopy;
}) {
  return (
    <article className={`chapter legal-page locale-${locale}`}>
      <header className="legal-hero">
        <p className="legal-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
      </header>

      {copy.preamble ? (
        <section className="legal-preamble">
          {copy.preamble.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {copy.preamble.bullets ? (
            <ul>
              {copy.preamble.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="legal-summary" aria-labelledby="legal-summary-title">
        <h2 id="legal-summary-title">{copy.summaryTitle}</h2>
        <div className="legal-summary-grid">
          {copy.summary.map((item) => (
            <div className="legal-summary-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="legal-layout">
        <div className="legal-body">
          {copy.sections.map((section, index) => (
            <section className="legal-section" id={section.id} key={section.id}>
              <h2>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
