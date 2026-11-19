"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { HomeCopy } from "@/content/home";
import "./workflow-demo.css";

const BEATS_PER_STAGE = 12;
const BEAT_MS = 1150;
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeMotionPreference(notify: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
}
const ease = [0.22, 1, 0.36, 1] as const;
type Demo = HomeCopy["workflow"]["demo"];
type BrowserFeed = Pick<Demo["research"], "topic" | "sources" | "xPosts" | "redditPosts" | "threadsPosts">;

function Check() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>;
}

function Spark() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2.5 11.6 8l5.4 1.7-5.4 1.7L10 17l-1.6-5.6L3 9.7 8.4 8Z" /></svg>;
}

function Cursor() {
  return <svg viewBox="0 0 20 24" aria-hidden="true"><path d="m3 2 14 12-7 1-3 6Z" /></svg>;
}

function Sidebar({ copy }: { copy: Demo }) {
  return (
    <aside className="wfc-sidebar" aria-hidden="true">
      <Image className="wfc-logo" src="/brand/webcross-horizontal.webp" alt="" width={1200} height={314} />
      <div className="wfc-side-group">
        <small>{copy.workspace}</small>
        <span>{copy.window}</span>
        <span className="is-current">{copy.assistant}</span>
      </div>
      <div className="wfc-side-group">
        <small>{copy.system}</small>
        <span>{copy.settings}</span>
        <span>{copy.guide}</span>
      </div>
      <div className="wfc-connections">
        <div><strong>{copy.access}</strong><span>＋</span></div>
        <p><i />WebSocket<small>○</small></p>
        <p><i />MCP<small>○</small></p>
        <p className="is-ready"><i />CLI<small>●</small></p>
      </div>
    </aside>
  );
}

function ClientTopbar({ copy, stage }: { copy: Demo; stage: number }) {
  const activeTab = stage === 0 ? 0 : 2;
  return (
    <div className="wfc-topbar" aria-hidden="true">
      <div className="wfc-history"><span>↶ {copy.history}</span><span>＋ {copy.newChat}</span></div>
      <div className="wfc-view-tabs">{copy.tabs.map((tab, index) => <span className={activeTab === index ? "is-active" : ""} key={tab}>{tab}</span>)}</div>
      <span className="wfc-login">登录</span>
    </div>
  );
}

function Composer({
  copy,
  text,
  active,
  busy,
  selectedSkill,
}: {
  copy: Demo;
  text: string;
  active: boolean;
  busy: boolean;
  selectedSkill?: { skill: string; script: string };
}) {
  return (
    <div className="wfc-composer" aria-hidden="true">
      <div className={`wfc-composer-input${active ? " is-typing" : ""}`} title={text || copy.composer}><span>{text || copy.composer}</span>{active && <i />}</div>
      <div className="wfc-composer-tools">
        <span className="wfc-composer-plus">＋</span>
        {selectedSkill && (
          <>
            <span className="wfc-composer-skill"><b>SKILL</b>{selectedSkill.skill}<Check /></span>
            <span className="wfc-composer-script"><b>JS</b>{selectedSkill.script}</span>
          </>
        )}
        <span className="wfc-composer-mode">工作区内修改⌄</span>
        <b className={`wfc-composer-send${active ? "" : busy ? " is-busy" : " is-idle"}`}>{busy ? "■" : "↑"}</b>
      </div>
    </div>
  );
}

function AgentThreadHeading() {
  return (
    <div className="wfc-thread-heading">
      <Image className="wfc-agent-avatar" src="/brand/webcross-icon.webp" alt="" width={28} height={21} />
      <strong>WebCross Agent</strong><small>ONLINE</small>
    </div>
  );
}

function ResearchAgent({ copy, beat }: { copy: Demo; beat: number }) {
  const doneAt = [4, 6, 8, 9];
  const complete = beat >= 9;
  return (
    <div className="wfc-agent-thread">
      <AgentThreadHeading />
      {beat >= 3 && <motion.div className="wfc-user-message" initial={false} animate={{ opacity: 1 }}>{copy.prompts[0]}</motion.div>}
      {beat >= 3 && (
        <div className="wfc-agent-answer">
          <Image className="wfc-agent-avatar" src="/brand/webcross-icon.webp" alt="" width={28} height={21} />
          <div><strong>{copy.taskTitle}</strong><p>{complete ? copy.research.done : copy.research.running}</p></div>
        </div>
      )}
      <div className="wfc-task-checklist">
        {copy.taskSteps.map((step, index) => {
          const done = beat >= doneAt[index];
          const previous = index === 0 ? 3 : doneAt[index - 1];
          const active = beat >= previous && !done;
          return <div className={`${done ? "is-done" : ""}${active ? " is-active" : ""}`} key={step}><span>{done ? <Check /> : index + 1}</span><p>{step}</p>{active && <i />}</div>;
        })}
      </div>
      {complete && (
        <motion.div className="wfc-agent-digest" initial={false} animate={{ opacity: 1 }}>
          <Spark />
          <span>{copy.research.sources.length} 个来源已归档</span>
          <strong>{copy.research.ideas.length} 个选题</strong>
        </motion.div>
      )}
    </div>
  );
}

function XPage({ topic, posts }: { topic: string; posts: Demo["research"]["xPosts"] }) {
  return (
    <div className="wfc-x-ui">
      <header className="wfc-x-header">
        <span className="wfc-x-logo">X</span>
        <div className="wfc-x-tabs"><b>为你推荐</b><span>关注</span></div>
        <span className="wfc-x-search">⌕</span>
      </header>
      <div className="wfc-platform-topic"><small>TRENDING / AI</small><strong>{topic}</strong><span>LIVE</span></div>
      <div className="wfc-x-feed">
        {posts.map((post, index) => (
          <article className="wfc-x-post" key={post.handle}>
            <span className={`wfc-x-avatar wfc-x-avatar-${index}`}>{post.author.slice(0, 1)}</span>
            <div>
              <header><strong>{post.author}</strong><span className="wfc-verified">✓</span><small>{post.handle} · {post.time}</small></header>
              <p>{post.text}</p>
              <footer><span>◯ {post.stats[0]}</span><span>↻ {post.stats[1]}</span><span>♡ {post.stats[2]}</span></footer>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function RedditPage({ posts }: { posts: Demo["research"]["redditPosts"] }) {
  return (
    <div className="wfc-reddit-ui">
      <header className="wfc-reddit-header">
        <span className="wfc-reddit-wordmark"><i>r/</i>reddit</span>
        <span className="wfc-reddit-search">Search Reddit</span>
        <span className="wfc-reddit-dots">•••</span>
      </header>
      <div className="wfc-reddit-community">
        <span className="wfc-reddit-community-icon">r/</span>
        <div><strong>{posts[0]?.forum ?? "r/AI_Agents"}</strong><small>12.4k members · 48 online</small></div>
        <span className="wfc-reddit-join">加入</span>
      </div>
      <div className="wfc-reddit-feed">
        {posts.map((post, index) => (
          <article className="wfc-reddit-post" key={post.title}>
            <div className="wfc-reddit-votes"><span>▲</span><strong>{index === 0 ? "2.4k" : index === 1 ? "1.1k" : "870"}</strong><span>▼</span></div>
            <div><small>{post.forum} · 热门</small><strong>{post.title}</strong><p>{post.meta}</p><footer><span>◯ 评论</span><span>分享</span><span>保存</span></footer></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ThreadsPage({ topic, posts }: { topic: string; posts: Demo["research"]["threadsPosts"] }) {
  return (
    <div className="wfc-threads-ui">
      <header className="wfc-threads-header">
        <span className="wfc-threads-logo">@</span>
        <div><b>为你推荐</b><span>关注</span></div>
        <span className="wfc-threads-search">⌕</span>
      </header>
      <div className="wfc-platform-topic"><small>THREADS / CREATORS</small><strong>{topic}</strong><span>LIVE</span></div>
      <div className="wfc-threads-feed">
        {posts.map((post, index) => (
          <article className="wfc-threads-post" key={post.handle}>
            <span className={`wfc-threads-avatar wfc-threads-avatar-${index}`}>{post.author.slice(0, 1)}</span>
            <div><header><strong>{post.author}</strong><small>{post.handle} · {post.time}</small></header><p>{post.text}</p><footer><span>♡ {post.stats[2]}</span><span>↻ {post.stats[1]}</span><span>◯ {post.stats[0]}</span></footer></div>
          </article>
        ))}
      </div>
    </div>
  );
}

const researchCursor = [
  [82, 18], [82, 18], [18, 22], [34, 34], [70, 30], [48, 55], [70, 42], [40, 68], [82, 28], [82, 28],
] as const;

function ResearchBrowser({ copy, beat, showDigest = true, feed }: { copy: Demo; beat: number; showDigest?: boolean; feed?: BrowserFeed }) {
  const browser = feed ?? copy.research;
  const sourceIndex = beat < 4 ? 0 : beat < 6 ? 1 : 2;
  const source = browser.sources[sourceIndex];
  const displayDigest = showDigest && beat >= 9;
  const point = researchCursor[Math.min(beat, researchCursor.length - 1)];
  return (
    <div className={`wfc-research-browser${beat < 2 ? " is-waiting" : ""}`}>
      <div className="wfc-browser-chrome">
        <div className="wfc-browser-tabstrip">
          <div className="wfc-browser-tab">
            <i className={`wfc-tab-favicon wfc-tab-favicon-${sourceIndex}`}>{["X", "r/", "@"][sourceIndex]}</i>
            <span>{source.name} · {source.detail}</span>
            <b>×</b>
          </div>
          <span className="wfc-browser-newtab">＋</span>
          <span className="wfc-browser-window"><i>—</i><i>□</i><i>×</i></span>
        </div>
        <div className="wfc-browser-bar">
          <div className="wfc-browser-nav"><span>‹</span><span>›</span><span>↻</span></div>
          <div className="wfc-browser-address"><span className="wfc-address-lock">◇</span>{source.url}<span className="wfc-address-star">☆</span></div>
          <span className="wfc-browser-menu">⋯</span>
        </div>
      </div>
      <div className="wfc-source-tabs" aria-hidden="true">
        {browser.sources.map((item, index) => (
          <span className={sourceIndex === index ? "is-active" : ""} key={item.name}>
            <i className={`wfc-source-logo wfc-source-logo-${index}`}>{["X", "r/", "@"][index]}</i>
            <b>{item.name}</b>
          </span>
        ))}
        <small>{source.detail}</small>
      </div>
      <div className="wfc-source-page">
        {sourceIndex === 0 && <XPage topic={browser.topic} posts={browser.xPosts} />}
        {sourceIndex === 1 && <RedditPage posts={browser.redditPosts} />}
        {sourceIndex === 2 && <ThreadsPage topic={browser.topic} posts={browser.threadsPosts} />}
      </div>
      {displayDigest && (
        <AnimatePresence>
          <motion.div className="wfc-research-digest" initial={false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="wfc-digest-head"><span><Spark /> RESEARCH DIGEST</span><small>3 SOURCES</small></div>
            <p>{copy.research.summary}</p>
            <div className="wfc-digest-ideas">
              {copy.research.ideas.map((idea, index) => <div key={idea.title}><span>0{index + 1}</span><strong>{idea.title}</strong><small>{idea.tag}</small></div>)}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {!displayDigest && !(feed && beat >= 8) && (
        <motion.div className="wfc-agent-cursor" aria-hidden="true" animate={{ left: `${point[0]}%`, top: `${point[1]}%` }} transition={{ duration: 0.75, ease }}><Cursor /><span>AI</span></motion.div>
      )}
    </div>
  );
}

function ExecuteView({ copy, beat }: { copy: Demo; beat: number }) {
  return <div className="wfc-execute-view"><ResearchAgent copy={copy} beat={beat} /><ResearchBrowser copy={copy} beat={beat} /></div>;
}

function CodePane({ copy, visibleLines }: { copy: Demo; visibleLines: number }) {
  return (
    <div className="wfc-code-editor">
      <div className="wfc-code-tab">{copy.authoring.files[1]}<span>×</span></div>
      <div className="wfc-code-body">
        {copy.script.map((line, index) => <motion.div key={line} initial={false} animate={{ opacity: index < visibleLines ? 1 : 0.14 }}><span>{index + 1}</span><code>{line}</code></motion.div>)}
        <motion.i animate={{ opacity: visibleLines < copy.script.length ? [1, 0, 1] : 0 }} transition={{ repeat: Infinity, duration: 0.8 }} />
      </div>
      <div className="wfc-code-status"><span>JavaScript</span><span>{visibleLines >= copy.script.length ? "READY" : "WRITING..."}</span></div>
    </div>
  );
}

function SkillDelivery({ copy }: { copy: Demo }) {
  return (
    <motion.div className="wfc-skill-delivery" initial={false} animate={{ opacity: 1, scale: 1 }}>
      <span className="wfc-delivery-icon"><Check /></span>
      <small>REUSABLE ASSET READY</small>
      <h4>{copy.workflowName}</h4>
      <p>{copy.saved}</p>
      <div className="wfc-delivery-files">{copy.authoring.files.map((file, index) => <span className={index === 1 ? "is-current" : ""} key={file}>{index === 1 ? "JS" : index === 2 ? "MD" : "TS"} {file}</span>)}</div>
      <span className="wfc-delivery-caption">UI 执行路径 · JavaScript · Skill package</span>
    </motion.div>
  );
}

function AuthoringView({ copy, beat }: { copy: Demo; beat: number }) {
  const visibleLines = Math.min(copy.script.length, Math.max(0, (beat - 1) * 2));
  const testing = beat >= 6 && beat < 9;
  const saved = beat >= 9;
  const testBeat = Math.min(8, 2 + Math.max(0, beat - 6) * 2);
  return (
    <div className="wfc-authoring-view">
      <div className="wfc-authoring-head">
        <div><small>{copy.tabs[2]} / WORKFLOW BUILDER</small><h4>{copy.workflowName}</h4></div>
        <span className={`wfc-authoring-status${testing ? " is-testing" : ""}${saved ? " is-saved" : ""}`}>{saved ? <Check /> : <i />}{saved ? copy.saved : testing ? copy.authoring.plan[2].title : copy.generating}</span>
      </div>
      <div className="wfc-authoring-body">
        <div className="wfc-plan-panel">
          <div className="wfc-panel-label">EXECUTION PLAN</div>
          <div className="wfc-plan-list">
            {copy.authoring.plan.map((item, index) => {
              const done = beat >= [2, 4, 8, 9][index];
              return <div className={done ? "is-done" : ""} key={item.title}><span>{done ? <Check /> : `0${index + 1}`}</span><div><strong>{item.title}</strong><small>{item.note}</small></div></div>;
            })}
          </div>
          <div className="wfc-business-advice"><Spark /><p>{copy.authoring.businessAdvice}</p></div>
        </div>
        <div className="wfc-authoring-workspace">
          {saved ? <SkillDelivery copy={copy} /> : testing ? <ResearchBrowser copy={copy} beat={testBeat} showDigest={false} /> : <CodePane copy={copy} visibleLines={visibleLines} />}
        </div>
      </div>
    </div>
  );
}

function ReuseView({ copy, beat }: { copy: Demo; beat: number }) {
  const sent = beat >= 3;
  const complete = beat >= 8;
  return (
    <div className="wfc-reuse-view">
      <div className="wfc-reuse-head">
        <div><small>{copy.tabs[2]} / NEW AUTOMATION</small><h4>{copy.runTitle}</h4></div>
        <span className={complete ? "is-complete" : ""}>{complete ? copy.complete : sent ? copy.running : copy.reuse.enterHint}</span>
      </div>
      <div className="wfc-reuse-execute">
        <div className="wfc-script-thread">
          <div className="wfc-script-head">
            <span className="wfc-script-icon">JS</span>
            <div><strong>{copy.reuse.script}</strong><small>SKILL · {copy.reuse.skill}</small></div>
            <span className={complete ? "is-done" : ""}>{complete ? <Check /> : "RUNNING"}</span>
          </div>
          {sent && <motion.div className="wfc-script-prompt" initial={false} animate={{ opacity: 1 }}>{copy.reuse.requirement}</motion.div>}
          <div className="wfc-script-log">
            <span><b>$</b> webcross run {copy.reuse.script}</span>
            <span><b>›</b> skill loaded: {copy.reuse.skill}</span>
            <span><b>›</b> browser: x · reddit · threads</span>
          </div>
          <div className="wfc-task-checklist">
            {copy.reuse.steps.map((step, index) => {
              const doneAt = [5, 6, 7, 8];
              const done = beat >= doneAt[index];
              const active = beat >= (index === 0 ? 4 : doneAt[index - 1]) && !done;
              return <div className={`${done ? "is-done" : ""}${active ? " is-active" : ""}`} key={step}><span>{done ? <Check /> : index + 1}</span><p>{step}</p>{active && <i />}</div>;
            })}
          </div>
          {complete && <motion.div className="wfc-script-output" initial={false} animate={{ opacity: 1 }}><Check /><div><strong>{copy.resultTitle}</strong><small>{copy.resultNote}</small></div></motion.div>}
        </div>

        <div className="wfc-reuse-browser-wrap">
          <ResearchBrowser copy={copy} beat={beat} showDigest={false} feed={copy.reuse.browser} />
          {complete && (
            <motion.div className="wfc-deals-digest" initial={false} animate={{ opacity: 1, y: 0 }}>
              <div className="wfc-digest-head"><span><Spark /> BLACK FRIDAY 2026</span><small>{copy.reuse.findings.length} SOURCES</small></div>
              <div className="wfc-deals-file"><span>MD</span><div><strong>{copy.resultTitle}</strong><small>{copy.resultNote}</small></div><Check /></div>
              <div className="wfc-deals-table-head"><strong>{copy.reuse.tableTitle}</strong><small>{copy.reuse.findings.length} ROWS</small></div>
              <div className="wfc-deals-table-wrap">
                <table className="wfc-deals-table">
                  <thead><tr>{copy.reuse.tableHeaders.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                  <tbody>
                    {copy.reuse.findings.map((finding) => (
                      <tr key={finding.source}>
                        <td><span className="wfc-finding-source">{finding.source}</span></td>
                        <td>{finding.title}</td>
                        <td><span className="wfc-finding-verified"><Check />{finding.meta}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="wfc-deals-export"><Check /><span>{copy.reuse.exportLabel}</span><strong>{copy.resultTitle.replace(/\.md$/, ".csv")}</strong><small>CSV</small></div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export function WorkflowDemo({ copy }: { copy: HomeCopy }) {
  const reduceMotion = useSyncExternalStore(subscribeMotionPreference, () => window.matchMedia(motionQuery).matches, () => false);
  const [frame, setFrame] = useState(0);
  const [inView, setInView] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const demo = copy.workflow.demo;

  const stageCount = copy.workflow.steps.length;
  const stage = Math.floor(frame / BEATS_PER_STAGE);
  const beat = reduceMotion ? BEATS_PER_STAGE - 1 : frame % BEATS_PER_STAGE;

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.18), { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = window.setTimeout(() => {
      setFrame((frame + 1) % (stageCount * BEATS_PER_STAGE));
    }, BEAT_MS);
    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion, frame, stageCount]);

  const selectStage = (index: number) => {
    setFrame(index * BEATS_PER_STAGE);
  };

  const prompt = demo.prompts[stage];
  const typedLength = beat >= 3 ? 0 : Math.ceil(prompt.length * ((beat + 1) / 3));
  const busy = stage === 2 ? beat >= 3 && beat < 8 : beat >= 3 && beat < 9;

  return (
    <section className="home-section workflow-section" id="workflow" aria-labelledby="workflow-title">
      <header className="workflow-caption">
        <h2 id="workflow-title">{copy.workflow.title}</h2>
        <p>{copy.workflow.subtitle}</p>
      </header>
      <div className="workflow-visual">
        <div className="workflow-product-stage" role="tabpanel" id="workflow-panel" ref={panelRef} aria-labelledby={`workflow-tab-${stage}`}>
          <div className="wfc-client">
            <Sidebar copy={demo} />
            <div className="wfc-main">
              <ClientTopbar copy={demo} stage={stage} />
              <div className="wfc-canvas">
                <motion.div className="wfc-view" key={stage} initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.32, ease }}>
                  {stage === 0 && <ExecuteView copy={demo} beat={beat} />}
                  {stage === 1 && <AuthoringView copy={demo} beat={beat} />}
                  {stage === 2 && <ReuseView copy={demo} beat={beat} />}
                </motion.div>
              </div>
              <Composer copy={demo} text={prompt.slice(0, typedLength)} active={beat < 3} busy={busy} selectedSkill={stage === 2 ? { skill: demo.reuse.skill, script: demo.reuse.script } : undefined} />
            </div>
          </div>
        </div>

        <div className="workflow-v2-steps" role="tablist" aria-label={copy.workflow.title}>
          {copy.workflow.steps.map((step, index) => (
            <button
              type="button"
              role="tab"
              id={`workflow-tab-${index}`}
              aria-controls="workflow-panel"
              aria-selected={stage === index}
              tabIndex={stage === index ? 0 : -1}
              className={stage === index ? "is-active" : ""}
              onClick={() => selectStage(index)}
              onKeyDown={(event) => {
                const keys: Record<string, number> = {
                  ArrowRight: (index + 1) % stageCount,
                  ArrowLeft: (index + stageCount - 1) % stageCount,
                  Home: 0,
                  End: stageCount - 1,
                };
                const next = keys[event.key];
                if (next === undefined) return;
                event.preventDefault();
                selectStage(next);
                document.getElementById(`workflow-tab-${next}`)?.focus();
              }}
              key={step.title}
            >
              <strong>{step.title}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
