/**
 * Section 07 — JS Script × Skill.
 *
 * The argument: high-frequency repetitive moves should not be rebuilt as RPA
 * rule trees. WebCross distils them into plain JavaScript scripts that
 * (a) auto-activate when the matching site opens, (b) can be called — and
 * rewritten — by the agent against the live page, and (c) then chain several
 * sites into one serial pipeline.
 *
 * The section is static marketing chrome: a syntax-highlighted script card and
 * a three-stage pipeline. Only the stage connector animates, and only when the
 * section scrolls into view (CSS-only), with a reduced-motion opt-out.
 */
"use client";

import type { ReactNode } from "react";
import type { SolutionsCopy } from "@/content/solutions";
import { useEnterMotion } from "./useEnterMotion";
import "./script-section.css";

type ScriptCopy = SolutionsCopy["script"];

/** One syntax-coloured token; keeps the mock code readable without a highlighter. */
function Tok({ kind, children }: { kind: "com" | "kw" | "fn" | "str" | "prop" | "num" | "op" | "plain"; children: ReactNode }) {
  return <span className={`scr-tok scr-tok--${kind}`}>{children}</span>;
}

function CodeLines() {
  return (
    <pre className="scr-code" aria-label="WebCross workflow script example" tabIndex={0}>
      <code>
        <span className="scr-code-line">
          <span className="scr-ln">1</span>
          <Tok kind="com">{"// workflows/post-to-x.workflow.js"}</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">2</span>
          <Tok kind="com">{"// auto-activates when x.com/compose/post opens"}</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">3</span>
          <Tok kind="kw">export const</Tok> <Tok kind="plain">meta</Tok> <Tok kind="op">=</Tok> <Tok kind="plain">{"{ "}</Tok>
          <Tok kind="prop">site</Tok>
          <Tok kind="plain">: </Tok>
          <Tok kind="str">&quot;x.com/compose/post&quot;</Tok>
          <Tok kind="plain">, </Tok>
          <Tok kind="prop">trigger</Tok>
          <Tok kind="plain">: </Tok>
          <Tok kind="str">&quot;onOpen&quot;</Tok>
          <Tok kind="plain">{" };"}</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">4</span>
          <Tok kind="plain">{" "}</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">5</span>
          <Tok kind="kw">export async function</Tok> <Tok kind="fn">run</Tok>
          <Tok kind="plain">(ctx) {"{"}</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">6</span>
          <Tok kind="plain">  {"await "}</Tok>
          <Tok kind="prop">Page</Tok>
          <Tok kind="plain">.</Tok>
          <Tok kind="fn">navigate</Tok>
          <Tok kind="plain">(</Tok>
          <Tok kind="str">&quot;https://x.com/compose/post&quot;</Tok>
          <Tok kind="plain">);</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">7</span>
          <Tok kind="plain">  {"await "}</Tok>
          <Tok kind="prop">Page</Tok>
          <Tok kind="plain">.</Tok>
          <Tok kind="fn">inspect</Tok>
          <Tok kind="plain">();</Tok>
          <Tok kind="com">{"        // page overview + semantic tree"}</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">8</span>
          <Tok kind="plain">  {"await "}</Tok>
          <Tok kind="prop">Input</Tok>
          <Tok kind="plain">.</Tok>
          <Tok kind="fn">type</Tok>
          <Tok kind="plain">(</Tok>
          <Tok kind="str">&quot;composer/textbox&quot;</Tok>
          <Tok kind="plain">, ctx.</Tok>
          <Tok kind="prop">text</Tok>
          <Tok kind="plain">);</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">9</span>
          <Tok kind="plain">  {"await "}</Tok>
          <Tok kind="prop">Input</Tok>
          <Tok kind="plain">.</Tok>
          <Tok kind="fn">click</Tok>
          <Tok kind="plain">(</Tok>
          <Tok kind="str">&quot;composer/post&quot;</Tok>
          <Tok kind="plain">);</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">10</span>
          <Tok kind="plain">  </Tok>
          <Tok kind="kw">return</Tok>
          <Tok kind="plain"> {"{ post: await "}</Tok>
          <Tok kind="prop">DOM</Tok>
          <Tok kind="plain">.</Tok>
          <Tok kind="fn">getText</Tok>
          <Tok kind="plain">(</Tok>
          <Tok kind="str">&quot;timeline/last&quot;</Tok>
          <Tok kind="plain">{'") };'}</Tok>
        </span>
        <span className="scr-code-line">
          <span className="scr-ln">11</span>
          <Tok kind="plain">{"}"}</Tok>
        </span>
      </code>
    </pre>
  );
}

function CodeCard({ copy }: { copy: ScriptCopy }) {
  return (
    <div className="scr-editor">
      <div className="scr-editor-bar">
        <span className="scr-editor-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="scr-editor-tab">
          <span className="scr-tab-file" aria-hidden="true">JS</span>
          {copy.codeCaption}
        </span>
        <span className="scr-editor-live"><i aria-hidden="true" />auto</span>
      </div>
      <CodeLines />
      <div className="scr-editor-foot">
        <span className="scr-chip">JavaScript</span>
        <span className="scr-chip">auto-activate</span>
        <span className="scr-chip">agent-callable</span>
        {copy.codeNote ? <span className="scr-editor-note">{copy.codeNote}</span> : null}
      </div>
    </div>
  );
}

const SITES = ["x.com/compose/post", "x.com/home", "sheet"];

function Pipeline({ copy }: { copy: ScriptCopy }) {
  return (
    <div className="scr-pipeline">
      <div className="scr-pipeline-rail" aria-hidden="true" />
      {copy.steps.map((step, index) => (
        <article className={`scr-stage scr-stage--${index + 1}`} key={step.title}>
          <div className="scr-stage-top">
            <span className="scr-stage-index">0{index + 1}</span>
            {index === 1 ? (
              <span className="scr-stage-node">
                <span className="scr-node-dot" aria-hidden="true" />
                Webcross Ai
              </span>
            ) : (
              <span className="scr-stage-node">{SITES[Math.min(index, SITES.length - 1)]}</span>
            )}
          </div>
          <h3 className="scr-stage-title">{step.title}</h3>
          <p className="scr-stage-text">{step.text}</p>
          {index === 0 ? (
            <div className="scr-stage-tags" aria-hidden="true">
              <span>run</span>
              <span>→</span>
              <span>workflow.js</span>
            </div>
          ) : null}
          {index === 2 ? (
            <div className="scr-stage-flow" aria-hidden="true">
              {SITES.map((site, siteIndex) => (
                <span key={site}>
                  <b>{site}</b>
                  {siteIndex < SITES.length - 1 ? <i>→</i> : null}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function ScriptSection({ copy }: { copy: ScriptCopy }) {
  const ref = useEnterMotion<HTMLElement>();

  return (
    <section className="sol-section scr-section" id="script" ref={ref}>
      <div className="sol-section-head">
        <div>
          <span className="sol-kicker">{copy.kicker}</span>
          <h2 className="sol-heading">{copy.title}</h2>
        </div>
        <p className="sol-lead">{copy.lead}</p>
      </div>

      <div className="scr-layout">
        <CodeCard copy={copy} />
        <Pipeline copy={copy} />
      </div>
    </section>
  );
}
