"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import type { Locale } from "@/content/types";
import type { SolutionsCopy } from "@/content/solutions";
import { useEnterMotion } from "./useEnterMotion";
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

function GlobeWatermark() {
  return (
    <svg className="fp-globe" viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r="54" />
      <path d="M16 70h108M70 16c18 16 18 92 0 108M70 16c-18 16-18 92 0 108" />
      <path className="fp-globe-soft" d="M30 38c24 11 56 11 80 0M30 102c24-11 56-11 80 0" />
    </svg>
  );
}

export function RegionPreview({ copy, locale }: { copy: FingerprintCopy; locale: Locale }) {
  const [selected, setSelected] = useState<CountryCode>("DE");
  const current = buildCountries(copy)[selected];
  const names = new Intl.DisplayNames([locale], { type: "region" });

  const regionName = (code: CountryCode) => names.of(code === "UK" ? "GB" : code) ?? code;

  return (
    <figure className="fp-preview" aria-label={copy.geoTitle}>
      <div className="fp-window">
        <div className="fp-browser-chrome">
          <Image src="/brand/webcross-icon.webp" alt="WebCross" width={29} height={22} />
          <span className="fp-url">{current.url}</span>
          <span className="fp-cc">{current.code}</span>
        </div>
        <div className="fp-browser-body" aria-live="polite" aria-atomic="true">
          <div className="fp-page">
            <GlobeWatermark />
            <span className="fp-geo-title">{copy.geoTitle}</span>
            <strong className="fp-greeting fp-swap" key={current.code}>{current.greeting}</strong>
          </div>
          <dl className="fp-sees-list" aria-label={copy.siteSeesTitle}>
            <div><dt>{copy.siteSees.connection}</dt><dd>{current.connection}</dd></div>
            <div><dt>{copy.siteSees.city}</dt><dd>{current.city}</dd></div>
            <div><dt>{copy.siteSees.timezone}</dt><dd>{current.timezone}</dd></div>
            <div><dt>{copy.siteSees.language}</dt><dd>{current.language}</dd></div>
          </dl>
        </div>
        <div className="fp-picker" role="group" aria-label={copy.pickLabel}>
          {COUNTRY_CODES.map((code) => (
            <button key={code} type="button" className="fp-country" aria-pressed={selected === code} onClick={() => setSelected(code)}>
              {regionName(code)}
            </button>
          ))}
        </div>
      </div>
    </figure>
  );
}

export function FingerprintSection({ copy }: { copy: FingerprintCopy }) {
  const chartRef = useEnterMotion<HTMLElement>();

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
        <ul className="sol-bullets fp-bullets">
          {copy.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>

      <figure className="sol-panel fp-chart" ref={chartRef}>
        <h3 className="fp-chart-title">{copy.chartTitle}</h3>
        <div className="fp-plot" role="img" aria-label={chartLabel}>
          {BENCHMARKS.map((bar, index) => (
            <div
              className="fp-bar-col"
              data-tone={bar.tone}
              key={bar.key}
              style={{ "--fp-height": `${bar.value}%`, "--fp-index": index } as CSSProperties}
            >
              <span className="fp-bar-value">
                {bar.value}
                <i>%</i>
              </span>
              <div className="fp-bar" />
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
    </section>
  );
}
