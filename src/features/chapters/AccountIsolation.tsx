import Image from "next/image";
import type { CSSProperties } from "react";
import type { HomeCopy } from "@/content/home";
import { useDemoPlayback } from "@/features/exhibition/useDemoPlayback";
import "./account-isolation.css";

export function AccountIsolation({ copy }: { copy: HomeCopy }) {
  const rowsRef = useDemoPlayback<HTMLTableSectionElement>();
  const content = copy.background;
  const titleWithCount = content.title.match(/^(.*?)(\d+\+.*)$/u);

  return (
    <section className="home-section accounts-section" id="background" aria-labelledby="accounts-title">
      <header className="accounts-intro">
        <h2 id="accounts-title">
          {titleWithCount ? <>{titleWithCount[1]}<span className="accounts-count">{titleWithCount[2]}</span></> : content.title}
        </h2>
        <p>{content.description}</p>
      </header>

      <div className="accounts-matchup">
        <table className="accounts-matrix" aria-labelledby="accounts-title">
          <thead>
            <tr>
              <th scope="col">
                <svg className="accounts-mark" viewBox="0 0 32 28" aria-hidden="true">
                  <rect x="2.5" y="3" width="27" height="22" rx="3" />
                  <path d="M3 9.5h26M7 6.5h1m3 0h1M13 13.5l1.4 7 2-2.4 2.8-.8z" />
                </svg>
                <span className="accounts-name">{content.ordinaryTitle}</span>
                <span className="accounts-scope">{content.ordinaryScope}</span>
              </th>
              <th scope="col">
                <Image className="accounts-mark" src="/brand/webcross-icon.webp" alt="" width={52} height={38} />
                <span className="accounts-name">{content.webcrossTitle}</span>
                <span className="accounts-scope">{content.webcrossScope}</span>
              </th>
            </tr>
          </thead>
          <tbody ref={rowsRef}>
            {content.comparisonRows.map((row, index) => (
              <tr key={row.webcross} style={{ "--row-delay": `${140 + index * 640}ms` } as CSSProperties}>
                <td><span className="accounts-point">{row.ordinary}</span></td>
                <td>
                  <span className="accounts-point">
                    <span className="accounts-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16"><path pathLength="1" d="m3 8 3.1 4.2L13 3.8" /></svg>
                    </span>
                    {row.webcross}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="accounts-vs" aria-hidden="true">VS</span>
      </div>
    </section>
  );
}
