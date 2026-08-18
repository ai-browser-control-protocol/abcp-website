/**
 * Official chrome: top navigation, long-page stage, footer.
 */
"use client";

import type { ReactNode } from "react";
import type { ChromeCopy } from "@/content/models";
import { PageStage } from "@/features/exhibition/PageStage";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";

export function SiteFrame({ chrome, children }: { chrome: ChromeCopy; children: ReactNode }) {
  return (
    <div className="site">
      <TopNav chrome={chrome} />
      <PageStage chrome={chrome}>{children}</PageStage>
      <Footer chrome={chrome} />
    </div>
  );
}
