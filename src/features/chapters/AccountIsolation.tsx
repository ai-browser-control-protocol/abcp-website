import type { HomeCopy } from "@/content/home";
import "./account-isolation.css";

/**
 * Account isolation — one ledger, two lanes.
 *
 * The section used to be a pair of glass cards. It now reads as a single
 * comparison ledger on the paper ground: two lanes share one row rhythm
 * (01–05), a hairline seam divides them, and the marks are typographic
 * (a muted dash for the shared-session path, an orange check for WebCross)
 * instead of sticker chips. The only filled surfaces left are the two flat
 * product mocks above the rows.
 */

function CheckMark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4.6 10.4 3.6 3.6L15.4 6.2" /></svg>;
}

function DashMark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.4 10h7.2" /></svg>;
}

function BrowserSymbol() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="24" height="20" rx="3" /><path d="M4 12h24M9 9h.01M13 9h.01" /></svg>;
}

function AgentSymbol() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="4" /><circle cx="16" cy="16" r="11" /><path d="m10 5 12 22M5 22 27 10M5 10l22 12" /></svg>;
}

function LockSymbol() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4" y="9" width="12" height="8" rx="2" /><path d="M7 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

export function AccountIsolation({ copy }: { copy: HomeCopy }) {
  const content = copy.background;
  return (
    <section className="home-section accounts-section" id="background">
      <div className="home-section-heading accounts-heading" data-reveal>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </div>

      <div className="account-ledger" data-reveal>
        <span className="ledger-seam" aria-hidden="true" />

        <div className="ledger-lane ledger-lane--ordinary">
          <header className="lane-head">
            <span className="lane-glyph"><BrowserSymbol /></span>
            <div className="lane-heading">
              <h3>{content.ordinaryTitle}</h3>
            </div>
          </header>

          <div className="lane-visual" aria-hidden="true">
            <div className="lane-meta">
              <span><i />CURRENT SESSION</span>
              <small>1 SESSION</small>
            </div>
            <div className="session-window">
              <div className="session-window-bar">
                <span className="window-dots"><i /><i /><i /></span>
                <small>browser / current-session</small>
              </div>
              <div className="session-window-body">
                <span className="session-avatar">A</span>
                <div className="session-id">
                  <strong>CURRENT ACCOUNT</strong>
                  <small>One cookie jar · one cache · one login state</small>
                </div>
                <span className="session-switch" aria-hidden="true">↻</span>
              </div>
            </div>
          </div>

          <ol className="lane-list">
            {content.comparisonRows.map((row, index) => (
              <li key={row.ordinary}>
                <span className="lane-index">{`0${index + 1}`}</span>
                <p>{row.ordinary}</p>
                <span className="lane-mark lane-mark--quiet" aria-hidden="true"><DashMark /></span>
              </li>
            ))}
          </ol>
        </div>

        <div className="ledger-lane ledger-lane--webcross">
          <header className="lane-head">
            <span className="lane-glyph lane-glyph--webcross"><AgentSymbol /></span>
            <div className="lane-heading">
              <h3>{content.webcrossTitle}</h3>
              <p className="lane-subtitle">{content.webcrossSubtitle}</p>
            </div>
          </header>

          <div className="lane-visual" aria-hidden="true">
            <div className="lane-meta">
              <span><i />ISOLATED ENVIRONMENTS</span>
              <small>3 ACCOUNTS</small>
            </div>
            <div className="isolation-stack">
              {content.accounts.map((account, index) => (
                <div className={`isolation-row isolation-row-${index}`} key={account.name}>
                  <span className="isolation-dot" />
                  <span className="isolation-letter">{String.fromCharCode(65 + index)}</span>
                  <strong>{account.name.split(" · ")[0]}</strong>
                  <small>{account.status}</small>
                  <span className="isolation-flag"><LockSymbol />ISOLATED</span>
                </div>
              ))}
            </div>
          </div>

          <ol className="lane-list">
            {content.comparisonRows.map((row, index) => (
              <li key={row.webcross}>
                <span className="lane-index">{`0${index + 1}`}</span>
                <p>{row.webcross}</p>
                <span className="lane-mark lane-mark--yes" aria-hidden="true"><CheckMark /></span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
