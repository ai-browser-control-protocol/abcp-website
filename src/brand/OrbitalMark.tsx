/**
 * Renders the ABCP orbital mark without owning window, menu, or connection behavior.
 */
import type { CSSProperties } from "react";
import "./orbital-mark.css";

const PARTICLE_INDEXES: number[] = [0, 1, 2, 3, 4];

export interface OrbitalMarkProps {
  size?: number;
  tone?: "default" | "danger";
  className?: string;
  animated?: boolean;
}

export function OrbitalMark({
  size = 48,
  tone = "default",
  className = "",
  animated = false,
}: OrbitalMarkProps) {
  const style = { "--orbital-size": `${size}px` } as CSSProperties;
  return (
    <span
      className={`orbital-mark orbital-mark-${tone} ${animated ? "orbital-mark-animated" : "orbital-mark-static"} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      <i className="floating-halo halo-one halo-rear" />
      <i className="floating-halo halo-two halo-rear" />
      <ParticleStream className="stream-one" />
      <ParticleStream className="stream-two" />
      <ParticleStream className="stream-three" />
      <i className="floating-halo halo-one halo-front" />
      <i className="floating-halo halo-two halo-front" />
    </span>
  );
}

function ParticleStream({ className }: { className: string }) {
  return (
    <i className={`infall-particles ${className}`}>
      {PARTICLE_INDEXES.map((index) => <i className="infall-particle" key={index} />)}
    </i>
  );
}
