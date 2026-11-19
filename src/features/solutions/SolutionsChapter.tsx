import type { SolutionsCopy } from "@/content/solutions";
import type { Locale } from "@/content/types";
import { EngineSection } from "./EngineSection";
import { EvidenceSection } from "./EvidenceSection";
import { FingerprintSection, RegionPreview } from "./FingerprintSection";
import { ScriptSection } from "./ScriptSection";
import { SemanticSection } from "./SemanticSection";
import "./solutions-chapter.css";

export function SolutionsChapter({ locale, copy }: { locale: Locale; copy: SolutionsCopy }) {
  return (
    <article className={`chapter solutions-page locale-${locale}`}>
      <header className="sol-opening">
        <div className="sol-hero">
          <div className="sol-hero-copy">
            <h1 className="sol-hero-title">{copy.hero.title}</h1>
            <p className="sol-hero-lead">{copy.hero.lead}</p>
          </div>
          <RegionPreview copy={copy.fingerprint} locale={locale} />
        </div>
      </header>

      <FingerprintSection copy={copy.fingerprint} />
      <EngineSection copy={copy.engine} />
      <SemanticSection copy={copy.semantic} />
      <EvidenceSection copy={copy.evidence} />
      <ScriptSection copy={copy.script} />
    </article>
  );
}
