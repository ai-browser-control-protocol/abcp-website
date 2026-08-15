/**
 * Company chapter: corporate profile, headquarters, mission, and contact.
 * Clean, pure editorial layout focusing on company introduction.
 */
import { FigureSlot } from "@/components/ui/FigureSlot";
import { figures } from "@/content/figures";
import "./company-chapter.css";

type CompanyCopy = {
  title: string;
  subtitle: string;
  lead: string;
  storyTitle: string;
  story: string;
  legalLabel: string;
  cityLabel: string;
  productLabel: string;
  productName: string;
  emailLabel: string;
  legalName: string;
  city: string;
  email: string;
  figure: string;
};

export function CompanyChapter({ copy }: { copy: CompanyCopy }) {
  return (
    <article className="chapter company-page">
      {/* Background Ambient Glow */}
      <div className="company-ambient-glow" aria-hidden="true" />

      {/* Header Profile */}
      <header className="company-header-center">
        <h1 className="company-hero-title">{copy.title}</h1>
        <p className="company-hero-tagline">{copy.subtitle}</p>
        <p className="company-hero-lead">{copy.lead}</p>
      </header>

      {/* Main Corporate Story & Philosophy Section */}
      <div className="company-story-section">
        <h2 className="company-story-title">{copy.storyTitle}</h2>
        <p className="company-story-body">{copy.story}</p>
      </div>

      {/* Enterprise Specs & R&D Center Showcase */}
      <div className="company-editorial-showcase">
        {/* Left: Clean Corporate Profile & Contact Info */}
        <div className="company-profile-col">
          <div className="company-spec-list">
            <div className="company-spec-row">
              <span className="spec-label">{copy.legalLabel}</span>
              <span className="spec-value">{copy.legalName}</span>
            </div>
            <div className="company-spec-row">
              <span className="spec-label">{copy.cityLabel}</span>
              <span className="spec-value">{copy.city}</span>
            </div>
            <div className="company-spec-row">
              <span className="spec-label">{copy.productLabel}</span>
              <span className="spec-value">{copy.productName}</span>
            </div>
            <div className="company-spec-row">
              <span className="spec-label">{copy.emailLabel}</span>
              <span className="spec-value">
                <a href={`mailto:${copy.email}`} className="spec-link">
                  {copy.email}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Frameless Photographic Centerpiece */}
        <div className="company-visual-col">
          <FigureSlot
            src={figures.company}
            alt={copy.figure}
            caption={copy.figure}
            ratio="letter"
          />
        </div>
      </div>
    </article>
  );
}
