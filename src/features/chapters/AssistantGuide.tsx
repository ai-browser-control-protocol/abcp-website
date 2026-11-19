"use client";

import { useState } from "react";
import type { Messages } from "@/i18n/messages";
import { guideProviders } from "./guide-providers";
import { ProviderPicker } from "./ProviderPicker";
import "./assistant-guide.css";

export function AssistantGuide({ copy }: { copy: Messages["guide"]["assistant"] }) {
  const [provider, setProvider] = useState("openrouter");
  const [stage, setStage] = useState<"setup" | "catalog" | "saved">("catalog");
  const [selected, setSelected] = useState<string[]>([]);
  const models = guideProviders[provider];

  function changeProvider(next: string) {
    setProvider(next);
    setSelected([]);
    setStage("catalog");
  }

  function toggleModel(model: string) {
    setSelected((current) => current.includes(model)
      ? current.filter((entry) => entry !== model)
      : [...current, model]);
  }

  return (
    <section className="guide-walkthrough assistant-guide" id="guide-assistant" aria-labelledby="assistant-guide-title" tabIndex={-1}>
      <div className="assistant-instructions">
        <h2 id="assistant-guide-title">{copy.title}</h2>
        <ol>
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <span className="assistant-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {index === copy.steps.length - 1 && <blockquote>{copy.example}</blockquote>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="assistant-demo" role="group" aria-labelledby="assistant-demo-title">
        <div className="assistant-demo-bar">
          <span className="user-traffic-lights" aria-hidden="true">
            <i className="user-traffic-dot red" /><i className="user-traffic-dot yellow" /><i className="user-traffic-dot green" />
          </span>
          <h3 id="assistant-demo-title">{copy.demoTitle}</h3>
        </div>
        <div className="assistant-demo-body">
          <dl className="assistant-fields">
            <div>
              <dt><label htmlFor="guide-provider">{copy.provider}</label></dt>
              <dd className="assistant-provider">
                <ProviderPicker label={copy.provider} value={provider} onChange={changeProvider} />
              </dd>
            </div>
            <div><dt>{copy.apiKey}</dt><dd className="assistant-blank-field" /></div>
            <div className="assistant-endpoint"><dt>{copy.endpoint}</dt><dd className="assistant-blank-field" /></div>
          </dl>
          <fieldset className="assistant-models" disabled={stage === "saved"}>
            <legend>{copy.models}</legend>
            {models.length === 0 ? (
              <p className="assistant-no-models">{copy.noExamples}</p>
            ) : stage === "setup" ? (
              <button className="assistant-fetch" type="button" onClick={() => setStage("catalog")}>
                {copy.fetch}<span aria-hidden="true">↓</span>
              </button>
            ) : (
              <div className="assistant-model-grid">
                {models.map((model) => (
                  <label className="assistant-model" key={model}>
                    {model}
                    <input type="checkbox" checked={selected.includes(model)} onChange={() => toggleModel(model)} />
                  </label>
                ))}
              </div>
            )}
          </fieldset>
          <div className="assistant-demo-actions">
            <span role="status">{stage === "saved" && <>✓ {copy.saved}</>}</span>
            {stage === "saved" ? (
              <button type="button" onClick={() => { setSelected([]); setStage("setup"); }}>{copy.replay}</button>
            ) : (
              <button className="assistant-save" type="button" disabled={selected.length === 0} onClick={() => setStage("saved")}>{copy.save}</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
