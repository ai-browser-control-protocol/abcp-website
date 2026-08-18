/**
 * Figure image with a fixed ratio. Renders a real image; the ratio keeps layout
 * stable while the asset streams in.
 */
import "./figure-slot.css";

type Ratio = "wide" | "square" | "letter";

export function FigureSlot({
  src,
  alt,
  caption,
  ratio = "wide",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: Ratio;
  className?: string;
}) {
  return (
    <figure className={`figure-slot is-${ratio}${className ? ` ${className}` : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="figure-slot-img" src={src} alt={alt} loading="lazy" />
      {caption ? <figcaption className="figure-slot-caption">{caption}</figcaption> : null}
    </figure>
  );
}
