"use client";

/**
 * Section 02 — fingerprints and residential IP geography.
 *
 * Two visuals argue the same point:
 *   (a) a pass-rate bar chart on the same bot-protected sites — the values are
 *       the reference benchmark figures from the source material and stay
 *       hardcoded here; the localised chartNote carries the disclaimer.
 *   (b) an interactive "browse from any country" demo — pick US / DE / JP / UK /
 *       SG and both the localised page greeting and the "what the site sees"
 *       panel switch to that country's residential connection.
 *
 * Bars grow once when the chart first enters the viewport; reduced-motion users
 * get the final state immediately.
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { SolutionsCopy } from "@/content/solutions";
import "./fingerprint-section.css";

type FingerprintCopy = SolutionsCopy["fingerprint"];

/** Reference benchmark pass rates — intentionally component-local, not copy. */
const BENCHMARKS = [
  { key: "headless", value: 8, tone: "muted" },
  { key: "homeIp", value: 49, tone: "home" },
  { key: "webcross", value: 85, tone: "brand" },
] as const;

type BenchmarkKey = (typeof BENCHMARKS)[number]["key"];

const COUNTRY_CODES = ["US", "DE", "JP", "UK", "SG"] as const;
type CountryCode = (typeof COUNTRY_CODES)[number];

type CountryView = {
  code: CountryCode;
  greeting: string;
  url: string;
  connection: string;
  city: string;
  timezone: string;
  language: string;
};

/** DE is the default demo and its values come straight from the localised copy;
 *  the other four countries are illustrative technical values (kept in English). */
function buildCountries(copy: FingerprintCopy): Record<CountryCode, CountryView> {
  const sees = copy.siteSees;
  return {
    US: {
      code: "US",
      greeting: "Hello!",
      url: "shop.example/us",
      connection: "Comcast · residential",
      city: "Austin",
      timezone: "America/Chicago",
      language: "en-US",
    },
    DE: {
      code: "DE",
      greeting: "Willkommen!",
      url: "shop.example/de",
      connection: sees.connectionValue,
      city: sees.cityValue,
      timezone: sees.timezoneValue,
      language: sees.languageValue,
    },
    JP: {
      code: "JP",
      greeting: "ようこそ",
      url: "shop.example/jp",
      connection: "NTT · residential",
      city: "東京",
      timezone: "Asia/Tokyo",
      language: "ja-JP",
    },
    UK: {
      code: "UK",
      greeting: "Hello!",
      url: "shop.example/uk",
      connection: "BT · residential",
      city: "Manchester",
      timezone: "Europe/London",
      language: "en-GB",
    },
    SG: {
      code: "SG",
      greeting: "Hello!",
      url: "shop.example/sg",
      connection: "Singtel · residential",
      city: "Singapore",
      timezone: "Asia/Singapore",
      language: "en-SG",
    },
  };
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

function GlobeWatermark() {
  return (
    <svg className="fp-globe" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r="54" />
      <path d="M16 70h108M70 16c18 16 18 92 0 108M70 16c-18 16-18 92 0 108" />
      <path className="fp-globe-soft" d="M30 38c24 11 56 11 80 0M30 102c24-11 56-11 80 0" />
    </svg>
  );
}

export function FingerprintSection({ copy }: { copy: FingerprintCopy }) {
  const countries = buildCountries(copy);
  const [selected, setSelected] = useState<CountryCode>("DE");
  const current = countries[selected];

  const chartRef = useRef<HTMLElement | null>(null);

  // First-view bar growth without a React state machine: the effect toggles
  // classes on the figure (an external DOM system), the stylesheet owns the
  // animation, and prefers-reduced-motion is handled entirely in CSS.
  useEffect(() => {
    const node = chartRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-play");
      return;
    }
    node.classList.add("is-armed");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.remove("is-armed");
          node.classList.add("is-play");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const chartLabel = `${copy.chartTitle}: ${BENCHMARKS.map(
    (bar) => `${copy.chartBars[bar.key]} ${bar.value}%`,
  ).join(", ")}`;

  return (
    <section className="sol-section fp-section" id="fingerprint">
      <div className="sol-section-head">
        <div>
          <span className="sol-kicker">{copy.kicker}</span>
          <h2 className="sol-heading">{copy.title}</h2>
        </div>
        <p className="sol-lead">{copy.lead}</p>
      </div>

      {/* (a) benchmark pass-rate chart */}
      <figure className="sol-panel fp-chart" ref={chartRef}>
        <h3 className="fp-chart-title">{copy.chartTitle}</h3>
        <div className="fp-plot" role="img" aria-label={chartLabel}>
          {BENCHMARKS.map((bar, index) => (
            <div className="fp-bar-col" data-tone={bar.tone} key={bar.key}>
              <span className="fp-bar-value" style={{ "--fp-index": index } as CSSProperties}>
                {bar.value}
                <i>%</i>
              </span>
              <div
                className="fp-bar"
                style={{ "--fp-height": `${bar.value}%`, "--fp-index": index } as CSSProperties}
              />
            </div>
          ))}
        </div>
        <div className="fp-axis" aria-hidden="true">
          {BENCHMARKS.map((bar) => (
            <span key={bar.key} data-tone={bar.tone}>
              {copy.chartBars[bar.key as BenchmarkKey]}
            </span>
          ))}
        </div>
        <figcaption className="sol-fineprint fp-chart-note">{copy.chartNote}</figcaption>
      </figure>

      <ul className="sol-bullets fp-bullets">
        {copy.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      {/* (b) browse from any country */}
      <div className="fp-geo">
        <div className="fp-geo-head">
          <h3 className="fp-geo-title">{copy.geoTitle}</h3>
          <p className="fp-geo-lead">{copy.geoLead}</p>
        </div>

        <div className="fp-geo-body">
          <div className="fp-picker">
            <span className="fp-picker-label" id="fp-picker-label">
              {copy.pickLabel}
            </span>
            <div className="fp-countries" role="group" aria-labelledby="fp-picker-label">
              {COUNTRY_CODES.map((code) => (
                <button
                  key={code}
                  type="button"
                  className="fp-country"
                  aria-pressed={selected === code}
                  onClick={() => setSelected(code)}
                >
                  {code}
                </button>
              ))}
            </div>
            <span className="fp-countries-label">{copy.countriesLabel}</span>
            <span className="fp-pick-arrow" aria-hidden="true">
              <span className="fp-pick-line" />
              <svg viewBox="0 0 8 12">
                <path d="m1.4 1 4.8 5-4.8 5" />
              </svg>
            </span>
          </div>

          <div className="fp-browser sol-panel">
            <div className="fp-browser-chrome">
              <span className="fp-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="fp-url">{current.url}</span>
              <span className="fp-cc" aria-hidden="true">
                {current.code}
              </span>
            </div>

            <div className="fp-browser-body">
              <div className="fp-page">
                <GlobeWatermark />
                <h4 className="fp-greeting fp-swap" key={current.code}>
                  {current.greeting}
                </h4>
                <p className="fp-local">
                  <CheckGlyph />
                  {copy.looksLocal}
                </p>
              </div>

              <aside className="fp-sees" aria-live="polite" aria-labelledby="fp-sees-title">
                <span className="fp-sees-title" id="fp-sees-title">
                  {copy.siteSeesTitle}
                </span>
                <dl className="fp-sees-list fp-swap" key={current.code}>
                  <div>
                    <dt>{copy.siteSees.connection}</dt>
                    <dd>{current.connection}</dd>
                  </div>
                  <div>
                    <dt>{copy.siteSees.city}</dt>
                    <dd>{current.city}</dd>
                  </div>
                  <div>
                    <dt>{copy.siteSees.timezone}</dt>
                    <dd>{current.timezone}</dd>
                  </div>
                  <div>
                    <dt>{copy.siteSees.language}</dt>
                    <dd>{current.language}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
