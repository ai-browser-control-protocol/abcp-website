/**
 * Company chapter: product mission, capabilities, and public contact.
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
  productLabel: string;
  productName: string;
  emailLabel: string;
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

      {/* Main Product Story & Philosophy Section */}
      <div className="company-story-section">
        <h2 className="company-story-title">{copy.storyTitle}</h2>
        <p className="company-story-body">{copy.story}</p>
      </div>

      {/* Product Details & Contact Showcase */}
      <div className="company-editorial-showcase">
        {/* Left: Product Profile & Contact Info */}
        <div className="company-profile-col">
          <div className="company-spec-list">
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
