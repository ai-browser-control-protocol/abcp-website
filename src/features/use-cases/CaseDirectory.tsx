"use client";

import { CaseIcon } from "./CaseIcon";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { categories, type CaseCategory, type UserCase } from "@/content/use-cases";
import type { Messages } from "@/i18n/messages";

function subscribeLocation(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener("case-filter-change", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("case-filter-change", onChange);
  };
}
const readLocation = () => window.location.search + window.location.hash;
const initialLocation = () => "";

type DirectoryProps = { copy: Messages["caseLibrary"]; cases: UserCase[] };
type Filter = CaseCategory | "all";

export function CaseDirectory({ copy, cases }: DirectoryProps) {
  const location = useSyncExternalStore(subscribeLocation, readLocation, initialLocation);
  const [query, fragment] = location.split("#");
  const filter = new URLSearchParams(query).get("category");
  const category = categories.find((id) => id === filter) ?? "all";
  const hash = fragment ? `#${fragment}` : "";
  const caseHash = hash === "#case-post-search" ? "#case-tiktok-trending-videos" : hash;
  const active = cases.find((item) => caseHash === `#case-${item.slug}`);
  const dialog = useRef<HTMLDialogElement>(null);
  const openedFromDirectory = useRef(false);
  const visible = category === "all" ? cases : cases.filter((item) => item.category === category);

  useEffect(() => {
    const node = dialog.current;
    if (active && node && !node.open) node.showModal();
    if (!active && node?.open) node.close();
  }, [active]);

  function dismiss() {
    if (openedFromDirectory.current) window.history.back();
    else window.location.replace("#cases");
  }

  function setCategory(next: Filter) {
    if (category === next) return;
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    url.hash = "cases";
    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event("case-filter-change"));
  }

  return (
    <section id="cases" className="cases-container cases-directory" aria-label={copy.all}>
      <div className="cases-toolbar">
        <div className="case-filters" role="group" aria-label={copy.filters}>
          {(["all", ...categories] as const).map((id) => (
            <button type="button" key={id} aria-pressed={id === category} onClick={() => setCategory(id)}>
              {id === "all" ? copy.all : copy.categories[id]}
            </button>
          ))}
        </div>
        <span className="case-count" role="status">{copy.count.replace("{count}", String(visible.length))}</span>
      </div>
      <ul className="case-grid">
        {visible.map((item) => (
          <li key={item.slug}>
            <a className="case-card" data-category={item.category} href={`#case-${item.slug}`} aria-haspopup="dialog"
              onClick={(event) => {
                if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) openedFromDirectory.current = true;
              }}>
              <div className="case-card-top">
                <CaseIcon slug={item.slug} icon={item.icon} />
                <span className="case-category">{copy.categories[item.category]}</span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <span className="case-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <dialog ref={dialog} className="case-preview" aria-labelledby="case-preview-title"
        onCancel={(event) => { event.preventDefault(); dismiss(); }}
        onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
        {active && (
          <div className="case-preview-inner" data-category={active.category}>
            <button className="case-close" type="button" onClick={dismiss} aria-label={copy.close}>×</button>
            <CaseIcon slug={active.slug} icon={active.icon} />
            <p className="case-category">{copy.categories[active.category]}</p>
            <h2 id="case-preview-title">{active.title}</h2>
            <p>{active.summary}</p>
            <div className="case-prompt">
              <h3>{copy.prompt}</h3>
              <p>{active.prompt}</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
