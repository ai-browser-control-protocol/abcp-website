import { useState, useEffect, useRef } from "react";
import type { Messages } from "@/i18n/messages";
import "./architecture-lens.css";

interface ArchitectureLensProps {
  layers: Messages["product"]["layers"];
}

export function ArchitectureLens({ layers }: ArchitectureLensProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const layerCount = layers?.length || 0;

  // Auto-play interval when user is not hovering/interacting
  useEffect(() => {
    if (isPaused || layerCount <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % layerCount);
    }, 3800);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, layerCount]);

  if (!layers || layerCount === 0) return null;

  const currentLayer = layers[activeIdx] || layers[0];
  const colorThemes = ["cyan", "emerald", "violet"] as const;
  const currentTheme = colorThemes[activeIdx] || "cyan";

  return (
    <div
      className="architecture-lens-viewport"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Interactive Architecture Lens"
    >
      {/* Left Column: Interactive Layer Navigation Stack (Equal Height) */}
      <div className="lens-nav-stack" role="tablist" aria-label="System Architecture Layers">
        {layers.map((layer, idx) => {
          const isActive = idx === activeIdx;
          const theme = colorThemes[idx] || "cyan";

          return (
            <button
              key={layer.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`lens-nav-item theme-${theme} ${isActive ? "is-active" : ""}`}
              onClick={() => {
                setActiveIdx(idx);
                setIsPaused(true);
              }}
              onMouseEnter={() => {
                setActiveIdx(idx);
                setIsPaused(true);
              }}
            >
              <div className="lens-nav-content">
                <div className="lens-nav-tag-row">
                  <span className="lens-nav-tag">{layer.tag}</span>
                  <span className={`lens-active-dot ${isActive ? "is-visible" : ""}`} />
                </div>
                <div className="lens-nav-title">{layer.name}</div>
              </div>
              <div className="lens-nav-arrow">{isActive ? "→" : "›"}</div>
            </button>
          );
        })}
      </div>

      {/* Right Column: Dynamic Deep Architecture Perspective (Equal Height, Clean Header) */}
      <div
        className={`lens-stage-panel theme-${currentTheme}`}
        key={activeIdx}
      >
        <div className="lens-stage-header">
          <span className="lens-telemetry-badge">
            <span className="telemetry-dot" />
            {currentLayer.status}
          </span>
        </div>

        <p className="lens-stage-lead-body">{currentLayer.body}</p>

        {/* Technical Capability Matrix */}
        <div className="lens-bullets-grid">
          {currentLayer.bullets?.map((bullet, i) => (
            <div className="lens-bullet-item" key={i}>
              <span className="bullet-icon">◆</span>
              <span className="bullet-text">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Footer Technical Note */}
        <div className="lens-stage-footer">
          <span className="lens-footer-hint">
            物理进程级解耦 · 零信任数据流转 · 毫秒级原生驱动
          </span>
        </div>
      </div>
    </div>
  );
}
