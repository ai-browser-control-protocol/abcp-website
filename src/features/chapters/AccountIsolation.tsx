import type { HomeCopy } from "@/content/home";
import "./account-isolation.css";

function Check() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>;
}

function Minus() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10" /></svg>;
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

      <div className="account-duel">
        <article className="duel-card duel-card--ordinary">
          <header className="duel-head">
            <span className="duel-icon"><BrowserSymbol /></span>
            <div className="duel-heading">
              <h3>{content.ordinaryTitle}</h3>
            </div>
          </header>

          <div className="duel-visual" aria-hidden="true">
            <div className="duel-visual-meta"><span><i />CURRENT SESSION</span><small>1 SESSION</small></div>
            <div className="single-session-browser">
              <div className="single-session-bar"><span>● ● ●</span><small>browser / current-session</small></div>
              <div className="single-session-body">
                <span className="single-session-avatar">A</span>
                <div><strong>CURRENT ACCOUNT</strong><small>One cookie jar · one cache · one login state</small></div>
                <span className="single-session-switch">↻</span>
              </div>
            </div>
          </div>

          <ol className="duel-list">
            {content.comparisonRows.map((row, index) => (
              <li key={row.ordinary}>
                <span className="duel-row-index">0{index + 1}</span>
                <span className="duel-row-mark"><Minus /></span>
                <p>{row.ordinary}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="duel-card duel-card--webcross">
          <header className="duel-head">
            <span className="duel-icon duel-icon--agent"><AgentSymbol /></span>
            <div className="duel-heading">
              <h3>{content.webcrossTitle}</h3>
              <p className="duel-card-subtitle">{content.webcrossSubtitle}</p>
            </div>
          </header>

          <div className="duel-visual" aria-hidden="true">
            <div className="duel-visual-meta"><span><i />ISOLATED ENVIRONMENTS</span><small>3 ACCOUNTS</small></div>
            <div className="environment-layers">
              {content.accounts.map((account, index) => (
                <div className={`environment-layer environment-layer-${index}`} key={account.name}>
                  <span className="environment-letter">{String.fromCharCode(65 + index)}</span>
                  <strong>{account.name.split(" · ")[0]}</strong>
                  <small>{account.status}</small>
                  <span className="environment-isolated"><LockSymbol />ISOLATED</span>
                </div>
              ))}
            </div>
          </div>

          <ol className="duel-list duel-list--webcross">
            {content.comparisonRows.map((row, index) => (
              <li key={row.webcross}>
                <span className="duel-row-index">0{index + 1}</span>
                <span className="duel-row-mark"><Check /></span>
                <p>{row.webcross}</p>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
