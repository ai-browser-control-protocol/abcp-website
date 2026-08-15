/**
 * Presentational button. Disabled state is visual only; callers pass the flag.
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({
  children,
  quiet = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; quiet?: boolean }) {
  return (
    <button className={`ui-button${quiet ? " quiet" : ""} ${className}`.trim()} type={props.type ?? "button"} {...props}>
      {children}
    </button>
  );
}
