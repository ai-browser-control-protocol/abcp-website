/**
 * Official chrome: top navigation, long-page stage, footer.
 */
"use client";

import type { ReactNode } from "react";
import type { ChromeCopy, GithubNavDisplay } from "@/content/models";
import { PageStage } from "@/features/exhibition/PageStage";
import { Footer } from "./Footer";
import { TopNav } from "./TopNav";

export function SiteFrame({
  chrome,
  github,
  children,
}: {
  chrome: ChromeCopy;
  github: GithubNavDisplay;
  children: ReactNode;
}) {
  return (
    <div className="site">
      <TopNav chrome={chrome} github={github} />
      <PageStage chrome={chrome}>{children}</PageStage>
      <Footer chrome={chrome} />
    </div>
  );
}
