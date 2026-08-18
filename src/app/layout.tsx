/**
 * Root layout required by Next.js. Locale html/body live in [locale]/layout.
 */
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
