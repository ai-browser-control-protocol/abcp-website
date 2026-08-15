/**
 * Text link with a current-state underline. The parent supplies href and current.
 */
import type { ReactNode } from "react";

export function NavLink({
  href,
  current,
  children,
  className = "nav-link",
}: {
  href: string;
  current?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={`${className}${current ? " is-current" : ""}`} href={href} aria-current={current ? "page" : undefined}>
      {children}
    </a>
  );
}
