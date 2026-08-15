/**
 * Georgia wordmark. The mark graphic is passed in so UI stays routing-free.
 */
import type { ReactNode } from "react";

export function Wordmark({ children, mark }: { children: ReactNode; mark?: ReactNode }) {
  return (
    <span className="top-nav-brand">
      {mark}
      {children}
    </span>
  );
}

