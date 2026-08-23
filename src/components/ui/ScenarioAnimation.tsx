/**
 * Demo section — "专业为各种自动化场景打造".
 *
 * The product is a chat-shaped agent, so the demo is too.
 *
 * Left  : a transcript. Every run appends a pair of turns — the task that was
 *         sent, then the agent's execution trace and what it produced. Earlier
 *         runs stay put, so scrolling back through the log is how you compare
 *         the three scenarios. A composer sits at the bottom.
 * Right : a browser that mimics a human working the page — navigating, typing,
 *         clicking, opening menus, uploading, scrolling, capturing. It mirrors
 *         whichever run is live, or holds the last one's final frame.
 *
 * Scroll drives the tour. Where there is room for it, the section pins itself
 * and the page scroll walks the three scenarios: one stop each, and the section
 * only lets go of the page once the third has had its turn. Every stop replays
 * from the first keystroke, so arriving at a scenario always means watching it
 * happen rather than reading a finished result. The tabs are jump links into
 * that track, not a separate mode.
 *
 * Where there is not room — narrow layouts, short viewports — none of that
 * applies: the section is a plain stack, scene A plays once when it scrolls into
 * view, and a tab click plays its scenario the first time and drops the finished
 * result on later visits. Pinning a section taller than the window would hide
 * its own bottom half, which is worse than not pinning at all.
 *
 * The composer takes real input. Sending something that is not the built-in
 * task does not fail silently and does not pretend to run it: the agent replies
 * in the transcript that this is a preview build and points at the download.
 */
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { Emphasized, plain } from "./RichText";
import { chapterPath } from "@/content/chapters";
import { Link } from "@/i18n/navigation";
import type { DemoCopy } from "@/content/models";
import "./scenario-animation.css";

const SCENE_KEYS = ["A", "B", "C"] as const;
type SceneKey = (typeof SCENE_KEYS)[number];

const STEP_COUNT = 8;
const STEP_MS = 1150;
/** Two characters per tick reads as typing without dragging the demo out. */
const TYPE_MS = 34;
const TYPE_CHUNK = 2;
/** Beat between the last keystroke and the button going down. */
const SUBMIT_MS = 520;

/* ---- scroll track ------------------------------------------------------- */

/** Closest the pinned stage may park to the top: clear of the 61px sticky nav.
 *  It usually sits lower — see the centring in the measure effect. */
const PIN_TOP = 72;
/** Room left under the stage before we call it "does not fit". */
const PIN_SLACK = 8;
/** Page scroll spent on each scenario before the tour advances. */
const TRAVEL_RATIO = 0.58;
/** Below this the stage stacks and grows past any sensible window. */
const PIN_MIN_WIDTH = 1024;

type Copy = DemoCopy;

/** A run walks type → trace → done; a notice is the preview reply. */
type Run = {
  id: number;
  kind: "run";
  scene: SceneKey;
  task: string;
  phase: "type" | "trace" | "done";
  typed: number;
  step: number;
};
type Notice = { id: number; kind: "notice"; task: string };
type Entry = Run | Notice;

/** Whether the visitor asked for less motion. The whole demo is timer-driven,
 *  so the global CSS reset in base.css cannot reach it — every entry point that
 *  would start a play-through has to check this and drop in the finished run
 *  instead. Read live, because the setting can change mid-visit. */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** A run that is already over — what a tab switch drops into the log. */
function settledRun(id: number, scene: SceneKey, task: string): Run {
  return { id, kind: "run", scene, task, phase: "done", typed: task.length, step: STEP_COUNT - 1 };
}

/** Agent cursor position per step, in % of the browser viewport. */
const CURSOR: Record<SceneKey, ReadonlyArray<readonly [number, number]>> = {
  A: [
    [50, 55],
    [26, 13],
    [63, 13],
    [30, 46],
    [46, 34],
    [80, 42],
    [40, 62],
    [82, 74],
  ],
  B: [
    [50, 50],
    [30, 22],
    [40, 33],
    [56, 45],
    [56, 57],
    [38, 66],
    [50, 76],
    [72, 86],
  ],
  C: [
    [50, 22],
    [46, 52],
    [44, 40],
    [30, 68],
    [50, 20],
    [46, 55],
    [78, 50],
    [80, 78],
  ],
};

export function ScenarioAnimation({ copy }: { copy: Copy }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [active, setActive] = useState<SceneKey>("A");
  /* Which way the stage should travel on the next scene change. Going A -> C
     slides in from the right, C -> A from the left, so the tab row and the
     stage agree about where you just moved. */
  const [dir, setDir] = useState<1 | -1>(1);
  const [draft, setDraft] = useState("");
  /* Null until measured, so the first paint is the unpinned stack either way.
     `top` is where the stage parks while stuck; see the measure effect. */
  const [track, setTrack] = useState<{ height: number; top: number } | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const autoPlayed = useRef(false);
  const nextId = useRef(1);
  /* Scenarios whose animation has already been watched. */
  const seen = useRef<Set<SceneKey>>(new Set());
  /* Which stop of the pinned tour we are parked on; -1 before it starts. */
  const stop = useRef(-1);
  /* Flipped the moment the visitor sends anything. From then on the tour stops
     rewriting the transcript underneath them and only appends. */
  const manual = useRef(false);
  /* The driver runs off scroll events, so it needs the current scene without
     re-subscribing every time it changes. */
  const activeRef = useRef<SceneKey>("A");
  const pinned = track !== null;

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /* At most one run is ever mid-flight. */
  const liveRun = useMemo(
    () => (entries.find((e) => e.kind === "run" && e.phase !== "done") as Run | undefined) ?? null,
    [entries]
  );

  /** Advance whichever run is in flight. */
  const patchLive = useCallback((fn: (run: Run) => Run) => {
    setEntries((prev) =>
      prev.map((e) => (e.kind === "run" && e.phase !== "done" ? fn(e) : e))
    );
  }, []);

  /* Tabs stay live even mid-run: settle whatever is playing, then either play
     this scenario for the first time or drop in its finished result. */
  const selectScene = useCallback(
    (key: SceneKey) => {
      setDir(SCENE_KEYS.indexOf(key) >= SCENE_KEYS.indexOf(active) ? 1 : -1);
      setActive(key);
      const firstLook = !seen.current.has(key);
      seen.current.add(key);
      setEntries((prev) => {
        const settled = prev.map((e) =>
          e.kind === "run" && e.phase !== "done" ? settledRun(e.id, e.scene, e.task) : e
        );
        if (firstLook) {
          if (prefersReducedMotion()) {
            return [...settled, settledRun(nextId.current++, key, copy.scenes[key].task)];
          }
          return [
            ...settled,
            {
              id: nextId.current++,
              kind: "run",
              scene: key,
              task: copy.scenes[key].task,
              phase: "type",
              typed: 0,
              step: 0,
            },
          ];
        }
        const last = settled[settled.length - 1];
        if (last && last.kind === "run" && last.scene === key) return settled;
        return [...settled, settledRun(nextId.current++, key, copy.scenes[key].task)];
      });
    },
    [copy.scenes, active]
  );

  /* A tour stop. Always replays: the point of arriving somewhere is watching it
     run. Ids are negative so a rebuilt tour reuses the same React keys and the
     log does not remount under the visitor. */
  const enterScene = useCallback(
    (key: SceneKey) => {
      const idx = SCENE_KEYS.indexOf(key);
      setDir(idx >= SCENE_KEYS.indexOf(activeRef.current) ? 1 : -1);
      setActive(key);
      seen.current.add(key);
      const task = copy.scenes[key].task;
      const still = prefersReducedMotion();
      const id = manual.current ? nextId.current++ : -(idx + 1);
      const fresh: Run = still
        ? settledRun(id, key, task)
        : { id, kind: "run", scene: key, task, phase: "type", typed: 0, step: 0 };

      setEntries((prev) => {
        if (manual.current) {
          const settled = prev.map((e) =>
            e.kind === "run" && e.phase !== "done" ? settledRun(e.id, e.scene, e.task) : e
          );
          return [...settled, fresh];
        }
        /* The tour so far: everything before this stop already answered. */
        const before = SCENE_KEYS.slice(0, idx).map((k, i) =>
          settledRun(-(i + 1), k, copy.scenes[k].task)
        );
        return [...before, fresh];
      });
    },
    [copy.scenes]
  );

  /* Tabs are jump links while pinned — moving the page is what changes the
     scene, so a click has to move the page or the driver would undo it. */
  const jumpToScene = useCallback(
    (key: SceneKey) => {
      const node = trackRef.current;
      const pin = pinRef.current;
      if (!track || !node || !pin) {
        selectScene(key);
        return;
      }
      const span = node.offsetHeight - pin.offsetHeight;
      if (span <= 0) return;
      const idx = SCENE_KEYS.indexOf(key);
      const top =
        window.scrollY +
        node.getBoundingClientRect().top -
        track.top +
        ((idx + 0.5) / SCENE_KEYS.length) * span;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [track, selectScene]
  );

  /* Send: the built-in task runs, anything else gets the preview reply. */
  const send = useCallback(() => {
    if (liveRun) return;
    manual.current = true;
    const text = draft.trim();
    const builtIn = copy.scenes[active].task;
    if (!text) {
      /* Nothing typed — replay the whole interaction, keystrokes included. */
      setEntries((prev) => [
        ...prev,
        prefersReducedMotion()
          ? settledRun(nextId.current++, active, builtIn)
          : { id: nextId.current++, kind: "run", scene: active, task: builtIn, phase: "type", typed: 0, step: 0 },
      ]);
      return;
    }
    if (text === builtIn.trim()) {
      setEntries((prev) => [
        ...prev,
        prefersReducedMotion()
          ? settledRun(nextId.current++, active, builtIn)
          : { id: nextId.current++, kind: "run", scene: active, task: builtIn, phase: "trace", typed: builtIn.length, step: 0 },
      ]);
      setDraft("");
      return;
    }
    setEntries((prev) => [...prev, { id: nextId.current++, kind: "notice", task: text }]);
    setDraft("");
  }, [liveRun, draft, active, copy.scenes]);

  /* Does the stage fit the window with the nav on top? Only then is pinning an
     improvement; otherwise the track height stays null and everything below
     falls back to the plain stack. Measured rather than guessed at a
     breakpoint, because the stage height moves with both axes.
  
     The measured height must not itself depend on whether we pinned, or the
     test feeds back into its own input and the pin flickers in and out one
     frame at a time. That is why the pinned and unpinned layouts are the same
     box, and why the "keep scrolling" line this section used to carry is gone:
     it only made sense while pinned, and rendering it there made the section
     taller exactly when it was being asked whether it was short enough. */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const measure = () => {
      const height = pin.offsetHeight;
      const room = window.innerHeight - PIN_TOP - PIN_SLACK;
      if (window.innerWidth < PIN_MIN_WIDTH || height > room) {
        setTrack(null);
        return;
      }
      /* Park it in the middle of what is left rather than against the nav.
         A fixed offset dumps every spare pixel below the stage, which on a tall
         window reads as the section clinging to the top edge with a hole under
         it. This moves the offset instead of the box: the pin keeps its natural
         height, so the fit test above still measures the same thing it did
         before we decided to pin. */
      const travel = Math.round(window.innerHeight * TRAVEL_RATIO);
      const top = Math.max(PIN_TOP, Math.round((window.innerHeight - height) / 2));
      const next = { height: height + SCENE_KEYS.length * travel, top };
      setTrack((prev) =>
        prev && prev.height === next.height && prev.top === next.top ? prev : next
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(pin);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* Nothing runs off-screen: both the tour and the one-shot autoplay wait for
     the section to actually be in front of the visitor. */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((items) => setInView(items[0].isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Pinned: scroll position owns the scene. The stop index only changes on a
     boundary, so a scene replays when you cross into it and not on every frame;
     leaving and coming back lands on the same stop and stays quiet. */
  useEffect(() => {
    if (!track || !inView) return;
    const parkTop = track.top;
    const node = trackRef.current;
    const pin = pinRef.current;
    if (!node || !pin) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const span = node.offsetHeight - pin.offsetHeight;
      if (span <= 0) return;
      const progress = (parkTop - node.getBoundingClientRect().top) / span;
      const idx = Math.max(
        0,
        Math.min(SCENE_KEYS.length - 1, Math.floor(progress * SCENE_KEYS.length))
      );
      if (idx === stop.current) return;
      stop.current = idx;
      enterScene(SCENE_KEYS[idx]);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    read();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [track, inView, enterScene]);

  /* Unpinned: one unattended play-through on first sight, then tabs take over. */
  useEffect(() => {
    if (pinned || !inView || autoPlayed.current) return;
    autoPlayed.current = true;
    seen.current.add("A");
    const id = nextId.current++;
    setEntries((prev) => [
      ...prev,
      prefersReducedMotion()
        ? settledRun(id, "A", copy.scenes.A.task)
        : { id, kind: "run", scene: "A", task: copy.scenes.A.task, phase: "type", typed: 0, step: 0 },
    ]);
  }, [pinned, inView, copy.scenes.A.task]);

  /* One clock for both phases — the tick length differs, so it is a chain of
     timeouts keyed on the current frame rather than a fixed interval. */
  useEffect(() => {
    if (!liveRun) return;

    if (liveRun.phase === "type") {
      if (liveRun.typed < liveRun.task.length) {
        const id = setTimeout(
          () => patchLive((r) => ({ ...r, typed: Math.min(r.typed + TYPE_CHUNK, r.task.length) })),
          TYPE_MS
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => patchLive((r) => ({ ...r, phase: "trace", step: 0 })), SUBMIT_MS);
      return () => clearTimeout(id);
    }

    const id = setTimeout(
      () =>
        patchLive((r) =>
          r.step >= STEP_COUNT - 1 ? { ...r, phase: "done" } : { ...r, step: r.step + 1 }
        ),
      STEP_MS
    );
    return () => clearTimeout(id);
  }, [liveRun, patchLive]);

  /* The browser mirrors the newest run, whatever state it is in. */
  const lastRun = useMemo(() => {
    for (let i = entries.length - 1; i >= 0; i -= 1) {
      const entry = entries[i];
      if (entry.kind === "run") return entry;
    }
    return null;
  }, [entries]);

  const scene = copy.scenes[active];
  const shownScene = lastRun?.scene ?? active;
  const shownStep = lastRun ? (lastRun.phase === "type" ? 0 : lastRun.step) : 0;
  const tracing = liveRun?.phase === "trace";

  return (
    <section
      className="scenario-section"
      id="demo"
      ref={sectionRef}
      data-dir={dir}
      data-pinned={pinned || undefined}
    >
      <div
        className="scenario-track"
        ref={trackRef}
        style={
          track
            ? ({ height: track.height, "--pin-top": `${track.top}px` } as CSSProperties)
            : undefined
        }
      >
        <div className="scenario-pin" ref={pinRef}>
          <div className="section-head-center scenario-head">
            <h2 className="section-title">
              <Emphasized text={copy.title} />
            </h2>
          </div>

          {/* Not a tablist: the transcript below is a running log rather than a
              panel that swaps per tab, so there is no tabpanel to point at and
              the arrow-key model a `role="tab"` promises would not match what
              these do. `aria-current` says which one is showing without the
              false promise. */}
          <div className="scenario-tabs" role="group" aria-label={plain(copy.title)}>
            {SCENE_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            aria-current={key === active ? true : undefined}
            className={`scenario-tab${key === active ? " is-active" : ""}`}
            onClick={() => jumpToScene(key)}
          >
            <span className="scenario-tab-key">{key}</span>
            <span className="scenario-tab-label">{copy.tabs[key]}</span>
            <span className="scenario-tab-rail" aria-hidden="true">
              <span
                className="scenario-tab-rail-fill"
                style={{
                  width:
                    key === shownScene && lastRun
                      ? `${((lastRun.phase === "done" ? STEP_COUNT : lastRun.phase === "type" ? 0 : lastRun.step + 1) / STEP_COUNT) * 100}%`
                      : "0%",
                }}
              />
            </span>
          </button>
            ))}
          </div>

          <p className="scenario-caption" key={active}>
            <Emphasized text={scene.caption} />
          </p>

          <div className="scenario-stage">
            <ClientPanel
              copy={copy}
              entries={entries}
              liveRun={liveRun}
              draft={draft}
              onDraft={setDraft}
              onSend={send}
            />
            {/* keyed on the scene: a scene change should replay the slide, and the
                panel derives everything from props, so remounting costs nothing. */}
            <BrowserPanel key={shownScene} copy={copy} sceneKey={shownScene} step={shownStep} live={!!tracing} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Left — WebCross client, as a transcript                                     */
/* ========================================================================== */

function ClientPanel({
  copy,
  entries,
  liveRun,
  draft,
  onDraft,
  onSend,
}: {
  copy: Copy;
  entries: Entry[];
  liveRun: Run | null;
  draft: string;
  onDraft: (next: string) => void;
  onSend: () => void;
}) {
  const logRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null);

  /* A task still being typed lives in the composer, not the log yet. */
  const shown = entries.filter((e) => !(e.kind === "run" && e.phase === "type"));
  const autoTyping = liveRun?.phase === "type";
  const busy = liveRun !== null;
  /* The last keystroke has landed and the button is about to go down. */
  const pressing = autoTyping && liveRun.typed >= liveRun.task.length;

  useEffect(() => {
    const node = logRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [shown.length, liveRun?.step]);

  const trackHint = (event: MouseEvent<HTMLDivElement>) => {
    if (busy) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setHint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const status = busy ? "running" : entries.length ? "done" : "idle";
  const value = autoTyping ? liveRun.task.slice(0, liveRun.typed) : busy ? "" : draft;

  return (
    <div className="client-panel">
      <div className="client-titlebar">
        <span className="client-dot client-dot-r" />
        <span className="client-dot client-dot-y" />
        <span className="client-dot client-dot-g" />
        <span className="client-title">{copy.clientTitle}</span>
        <span className={`client-status is-${status}`}>
          <span className="client-status-dot" />
          {busy ? copy.statusRunning : entries.length ? copy.statusDone : copy.runLabel}
        </span>
      </div>

      <div className="client-log" ref={logRef}>
        {shown.length === 0 && <p className="client-log-empty">{copy.taskLabel}</p>}

        {shown.map((entry) => (
          <div className="client-turn" key={entry.id}>
            <p className="client-said">{entry.task}</p>

            {entry.kind === "notice" ? (
              <div className="client-reply client-preview-note">
                <span className="client-preview-title">{copy.previewTitle}</span>
                <p className="client-preview-body">{copy.previewBody}</p>
                <Link className="client-preview-cta" href={chapterPath("download")}>
                  {copy.previewCta}
                </Link>
              </div>
            ) : (
              <RunTurn copy={copy} entry={entry} />
            )}
          </div>
        ))}
      </div>

      <div
        className={`client-composer${hint && !busy ? " is-hovered" : ""}${autoTyping ? " is-autotyping" : ""}`}
        onMouseMove={trackHint}
        onMouseLeave={() => setHint(null)}
      >
        <label className="sr-only" htmlFor="wc-composer">
          {copy.taskLabel}
        </label>
        <textarea
          id="wc-composer"
          className="client-prompt-input"
          value={value}
          rows={2}
          spellCheck={false}
          disabled={busy}
          placeholder={copy.composerPlaceholder}
          onChange={(event) => onDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
        />
        <button
          type="button"
          className={`client-run${pressing ? " is-pressed" : ""}`}
          onClick={onSend}
          disabled={busy}
        >
          <span>{busy && !autoTyping ? copy.runningLabel : copy.runLabel}</span>
          {busy && !autoTyping ? (
            <span className="client-run-spinner" aria-hidden="true" />
          ) : (
            <span className="client-run-key">⏎</span>
          )}
        </button>
        {hint && !busy && (
          <span className="client-prompt-hint" style={{ left: hint.x, top: hint.y }} aria-hidden="true">
            {copy.exploreHint}
          </span>
        )}
      </div>
    </div>
  );
}

/** The agent's half of one run: scene chip, live trace, then what it produced. */
function RunTurn({ copy, entry }: { copy: Copy; entry: Run }) {
  const scene = copy.scenes[entry.scene];
  const done = entry.phase === "done";
  const markOf = (i: number) => {
    if (done || i < entry.step) return " is-done";
    if (i === entry.step) return " is-current";
    return "";
  };

  return (
    <div className="client-reply">
      <div className="client-scene-tag">
        <span className="client-scene-key">{entry.scene}</span>
        <span>{copy.tabs[entry.scene]}</span>
        <span className="client-log-count">
          {String(done ? STEP_COUNT : entry.step + 1).padStart(2, "0")} / {STEP_COUNT}
        </span>
      </div>

      <ol className="client-steps">
        {scene.steps.map((label, i) => (
          <li key={i} className={`client-step${markOf(i)}`}>
            <span className="client-step-mark" aria-hidden="true">
              {done || i < entry.step ? "✓" : String(i + 1).padStart(2, "0")}
            </span>
            <span className="client-step-text">{label}</span>
            {!done && i === entry.step && <span className="client-step-spinner" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      {done && (
        <div className="client-result">
          <div className="client-result-head">
            <span className="client-result-check" aria-hidden="true">
              ✓
            </span>
            <span className="client-result-heading">
              <span className="client-result-title">{copy.resultTitle}</span>
              <span className="client-result-summary">{scene.result.summary}</span>
            </span>
          </div>
          <ul className="client-result-list">
            {scene.result.items.map((line, i) => (
              <li key={i} style={{ animationDelay: `${140 + i * 110}ms` }}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/* Right — browser                                                             */
/* ========================================================================== */

function BrowserPanel({
  copy,
  sceneKey,
  step,
  live,
}: {
  copy: Copy;
  sceneKey: SceneKey;
  step: number;
  live: boolean;
}) {
  const [cx, cy] = CURSOR[sceneKey][step];
  const clicking =
    (sceneKey === "A" && [2, 3, 5].includes(step)) ||
    (sceneKey === "B" && [3, 4, 6, 7].includes(step)) ||
    (sceneKey === "C" && [2, 3, 6].includes(step));

  return (
    /* A picture of a browser, not information. It was an aria-live region, which
       meant every one of the eight step changes re-announced the whole fake page
       — product names, prices, review text — to a screen reader that had no way
       to stop it. The transcript on the left already narrates the run in text. */
    <div className="browser-panel" aria-hidden="true">
      {sceneKey === "A" && <SceneAmazon data={copy.scenes.A.browser} step={step} />}
      {sceneKey === "B" && <SceneSeller data={copy.scenes.B.browser} step={step} />}
      {sceneKey === "C" && <SceneSocial data={copy.scenes.C.browser} step={step} />}

      <span
        className={`agent-cursor${clicking ? " is-clicking" : ""}${live ? "" : " is-hidden"}`}
        style={{ left: `${cx}%`, top: `${cy}%` }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" width="20" height="20">
          <path d="M4 2 L4 16 L8 12.4 L10.6 18 L13.4 16.7 L10.8 11.2 L16 11 Z" fill="#0a0a0a" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
        <span className="agent-cursor-ring" />
      </span>
    </div>
  );
}

function BrowserChrome({ url, loading }: { url: string; loading?: boolean }) {
  return (
    <div className="browser-chrome">
      <span className="browser-dot" />
      <span className="browser-dot" />
      <span className="browser-dot" />
      <div className="browser-omnibox">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span className="browser-url" key={url}>
          {url}
        </span>
      </div>
      {loading && <span className="browser-loading" aria-hidden="true" />}
    </div>
  );
}

/* ============== Scene A — Amazon price patrol ============== */

function SceneAmazon({
  data,
  step,
}: {
  data: Copy["scenes"]["A"]["browser"];
  step: number;
}) {
  const view = step <= 2 ? "home" : step === 3 ? "serp" : step <= 5 ? "pdp" : step === 6 ? "reviews" : "done";
  const url =
    view === "home" ? data.urlHome : view === "serp" ? data.urlSerp : view === "reviews" ? data.urlReviews : data.urlPdp;

  return (
    <div className="scene amazon-scene">
      <BrowserChrome url={url} loading={step === 0} />

      <div className="page-viewport">
        {/* ---------- amazon.com home ---------- */}
        {view === "home" && (
          <div className="az-page az-home" key="home">
            <div className="az-topbar">
              <span className="az-logo">amazon</span>
              <span className="az-deliver">{data.deliverTo}</span>
              <div className={`az-searchbar${step === 2 ? " is-firing" : ""}`}>
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  {step === 0 ? (
                    <span className="az-search-placeholder">{data.searchPlaceholder}</span>
                  ) : (
                    <span className="az-typed" key={`t-${step}`}>
                      {data.keyword}
                    </span>
                  )}
                  {step >= 1 && <span className="az-caret" />}
                </span>
                <span className={`az-search-btn${step === 2 ? " is-pressed" : ""}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-navbar">
              {data.navItems.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            <div className="az-hero">
              <div className="az-hero-banner" />
              <div className="az-hero-cards">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="az-hero-card">
                    <div className="az-hero-card-img" />
                    <div className="az-hero-card-line" />
                    <div className="az-hero-card-line short" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- search results ---------- */}
        {view === "serp" && (
          <div className="az-page az-serp" key="serp">
            <div className="az-topbar az-topbar-compact">
              <span className="az-logo">amazon</span>
              <div className="az-searchbar">
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  <span>{data.keyword}</span>
                </span>
                <span className="az-search-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-serp-meta">
              <span className="az-serp-count">{data.resultsMeta}</span>
              <span className="az-serp-sort">{data.sortLabel}</span>
            </div>
            <div className="az-serp-body">
              <aside className="az-filters">
                <div className="az-filter-title">{data.filterTitle}</div>
                {data.filters.map((f) => (
                  <label key={f} className="az-filter-row">
                    <span className="az-checkbox" />
                    <span>{f}</span>
                  </label>
                ))}
                <div className="az-filter-title">Price</div>
                <div className="az-filter-slider">
                  <span className="az-filter-slider-track" />
                  <span className="az-filter-slider-knob" />
                  <span className="az-filter-slider-knob right" />
                </div>
              </aside>
              <div className="az-results">
                {data.results.map((r, i) => (
                  <article key={i} className={`az-result${i === 0 ? " is-target" : ""}`}>
                    <div className="az-result-img" />
                    <div className="az-result-info">
                      {r.badge && <span className="az-result-badge">{r.badge}</span>}
                      <div className="az-result-title">{r.title}</div>
                      <div className="az-result-rating">
                        <span className="az-stars">★★★★★</span>
                        <span>{r.rating}</span>
                        <span className="az-link">({r.reviews})</span>
                      </div>
                      <div className="az-result-bought">{r.bought}</div>
                      <div className="az-result-price-row">
                        {r.deal && <span className="az-deal">{r.deal}</span>}
                        <span className="az-price">{r.price}</span>
                        {r.listPrice && <span className="az-list-price">List: {r.listPrice}</span>}
                      </div>
                    </div>
                  </article>
                ))}
                {[0, 1].map((i) => (
                  <div key={`skel-${i}`} className="az-result az-result-skeleton" aria-hidden="true">
                    <div className="az-result-img" />
                    <div className="az-result-info">
                      <span className="az-skel-line" />
                      <span className="az-skel-line short" />
                      <span className="az-skel-line tiny" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- product detail ---------- */}
        {view === "pdp" && (
          <div className="az-page az-pdp" key="pdp">
            <div className="az-topbar az-topbar-compact">
              <span className="az-logo">amazon</span>
              <div className="az-searchbar">
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  <span>{data.keyword}</span>
                </span>
                <span className="az-search-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-pdp-body">
              <div className="az-gallery">
                <div className="az-gallery-main" />
                <div className="az-gallery-thumbs">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
              <div className="az-pdp-info">
                <div className="az-crumb">{data.pdp.crumb}</div>
                <h3 className={`az-pdp-title${step === 5 ? " is-grabbed" : ""}`}>{data.pdp.title}</h3>
                <div className={`az-result-rating${step === 5 ? " is-grabbed" : ""}`}>
                  <span className="az-stars">★★★★★</span>
                  <span>{data.pdp.rating}</span>
                  <span className="az-link">{data.pdp.reviews}</span>
                </div>
                <div className="az-result-bought">{data.pdp.bought}</div>
                <div className={`az-pdp-price-row${step === 5 ? " is-grabbed" : ""}`}>
                  <span className="az-deal">{data.pdp.deal}</span>
                  <span className="az-price az-price-lg">{data.pdp.price}</span>
                  <span className="az-list-price">List: {data.pdp.listPrice}</span>
                </div>
                <div className="az-pdp-shipping">{data.pdp.shipping}</div>
                <div className="az-pdp-actions">
                  <span className="az-btn-cart">{data.pdp.cart}</span>
                  <span className="az-btn-buy">{data.pdp.buy}</span>
                </div>
                <div className="az-pdp-reviews-link">{data.pdp.reviewsAnchor} ›</div>
              </div>
              <div className="az-pdp-about" aria-hidden="true">
                <div className="az-pdp-about-title">关于此商品</div>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`az-skel-line${i % 3 === 2 ? " short" : ""}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- reviews ---------- */}
        {(view === "reviews" || view === "done") && (
          <div className="az-page az-reviews" key="reviews">
            <div className="az-topbar az-topbar-compact">
              <span className="az-logo">amazon</span>
              <div className="az-searchbar">
                <span className="az-search-scope">All</span>
                <span className="az-search-field">
                  <span>{data.keyword}</span>
                </span>
                <span className="az-search-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="az-reviews-body">
              <aside className="az-review-summary">
                <div className="az-review-heading">{data.reviews.title}</div>
                <div className="az-review-score">
                  <span className="az-stars">★★★★★</span>
                  <span className="az-review-score-num">{data.reviews.score}</span>
                </div>
                <div className="az-review-total">{data.reviews.total}</div>
                <div className="az-histogram">
                  {data.reviews.histogram.map((row, i) => (
                    <div key={i} className={`az-hist-row${i >= 3 ? " is-bad" : ""}`}>
                      <span className="az-hist-label">{String(row[0])}</span>
                      <span className="az-hist-track">
                        <span className="az-hist-fill" style={{ width: `${Number(row[2])}%` }} />
                      </span>
                      <span className="az-hist-pct">{String(row[1])}</span>
                    </div>
                  ))}
                </div>
                <div className="az-review-filter">{data.reviews.filterLabel}</div>
              </aside>
              <div className="az-review-list">
                {data.reviews.items.map((r, i) => (
                  <article
                    key={i}
                    className="az-review"
                    style={{ animationDelay: `${0.15 + i * 0.32}s` }}
                  >
                    <div className="az-review-head">
                      <span className="az-review-avatar" />
                      <span className="az-review-name">{r.name}</span>
                    </div>
                    <div className="az-review-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                    <div className="az-review-title">{r.title}</div>
                    <p className="az-review-body">{r.body}</p>
                    <span className="az-review-mark" style={{ animationDelay: `${0.5 + i * 0.32}s` }} />
                  </article>
                ))}
                <div className="az-review az-review-skeleton" aria-hidden="true">
                  <span className="az-skel-line tiny" />
                  <span className="az-skel-line" />
                  <span className="az-skel-line short" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============== Scene B — Amazon Seller Central listing ============== */

function SceneSeller({
  data,
  step,
}: {
  data: Copy["scenes"]["B"]["browser"];
  step: number;
}) {
  const brandOpen = step === 3;
  const brandFilled = step >= 4;
  const catOpen = step === 4;
  const catFilled = step >= 5;
  const numbersFilled = step >= 5;
  const uploading = step === 6;
  const uploaded = step >= 7;

  return (
    <div className="scene seller-scene">
      <BrowserChrome url={data.url} loading={step === 0} />

      <div className="page-viewport">
        <div className="sc-topbar">
          <span className="sc-logo">{data.brandbar}</span>
          <span className="sc-path">{data.path}</span>
          <span className="sc-queue">
            {data.queueLabel} <b>{data.queueValue}</b>
          </span>
        </div>

        <div className="sc-tabs">
          {data.tabs.map((t, i) => (
            <span key={t} className={`sc-tab${i === 0 ? " is-active" : ""}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="sc-form">
          {/* text input */}
          <label className={`sc-field${step >= 2 ? " is-filled" : ""}${step === 2 ? " is-focus" : ""}`}>
            <span className="sc-label">{data.nameLabel}</span>
            <span className="sc-input">
              {step >= 2 ? (
                <span className="sc-typed" key={`n-${step === 2 ? "run" : "done"}`}>
                  {data.nameValue}
                </span>
              ) : (
                <span className="sc-placeholder" />
              )}
              {step === 2 && <span className="sc-caret" />}
            </span>
          </label>

          {/* dropdown — brand */}
          <div className={`sc-field${brandFilled ? " is-filled" : ""}${brandOpen ? " is-focus" : ""}`}>
            <span className="sc-label">{data.brandLabel}</span>
            <span className={`sc-select${brandOpen ? " is-open" : ""}`}>
              <span className={brandFilled ? "sc-select-value" : "sc-select-placeholder"}>
                {brandFilled ? data.brandValue : data.brandPlaceholder}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
              {brandOpen && (
                <span className="sc-menu">
                  {data.brandOptions.map((o) => (
                    <span key={o} className={`sc-option${o === data.brandValue ? " is-target" : ""}`}>
                      {o}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </div>

          {/* dropdown — category */}
          <div className={`sc-field${catFilled ? " is-filled" : ""}${catOpen ? " is-focus" : ""}`}>
            <span className="sc-label">{data.categoryLabel}</span>
            <span className={`sc-select${catOpen ? " is-open" : ""}`}>
              <span className={catFilled ? "sc-select-value" : "sc-select-placeholder"}>
                {catFilled ? data.categoryValue : data.categoryPlaceholder}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
              {catOpen && (
                <span className="sc-menu">
                  {data.categoryOptions.map((o) => (
                    <span key={o} className={`sc-option${o === data.categoryValue ? " is-target" : ""}`}>
                      {o}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </div>

          <div className="sc-field-row">
            <label className={`sc-field${numbersFilled ? " is-filled" : ""}`}>
              <span className="sc-label">{data.priceLabel}</span>
              <span className="sc-input">
                {numbersFilled ? <span className="sc-typed">{data.priceValue}</span> : <span className="sc-placeholder" />}
              </span>
            </label>
            <label className={`sc-field${numbersFilled ? " is-filled" : ""}`}>
              <span className="sc-label">{data.stockLabel}</span>
              <span className="sc-input">
                {numbersFilled ? <span className="sc-typed">{data.stockValue}</span> : <span className="sc-placeholder" />}
              </span>
            </label>
          </div>

          {/* file upload */}
          <div className={`sc-upload${uploading ? " is-uploading" : ""}${uploaded ? " is-done" : ""}`}>
            {!uploading && !uploaded && (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="8.5" cy="9.5" r="1.6" />
                  <path d="m21 16-5-5-6 6-3-3-4 4" />
                </svg>
                <span className="sc-upload-label">{data.uploadLabel}</span>
                <span className="sc-upload-hint">{data.uploadHint}</span>
              </>
            )}
            {(uploading || uploaded) && (
              <div className="sc-upload-file">
                <span className="sc-upload-thumb" />
                <div className="sc-upload-meta">
                  <span className="sc-upload-name">{data.uploadFile}</span>
                  <span className="sc-upload-size">{data.uploadSize}</span>
                  <span className="sc-upload-bar">
                    <span className={`sc-upload-bar-fill${uploaded ? " is-full" : ""}`} />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="sc-collapsed">
            {data.tabs.slice(1).map((t) => (
              <div key={t} className="sc-collapsed-row">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span>{t}</span>
                <span className="sc-collapsed-note">—</span>
              </div>
            ))}
          </div>

          <div className="sc-submit-row">
            <span className={`sc-submit${step === 7 ? " is-pressed" : ""}`}>
              {step === 7 ? data.submitting : data.submitLabel}
            </span>
          </div>
        </div>

        {step === 7 && (
          <div className="sc-toast">
            <span className="sc-toast-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span className="sc-toast-body">
              <b>{data.success}</b>
              <span>{data.successMeta}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============== Scene C — social media capture + engagement ============== */

function SceneSocial({
  data,
  step,
}: {
  data: Copy["scenes"]["C"]["browser"];
  step: number;
}) {
  const onReddit = step >= 4;
  const platform = onReddit ? data.reddit : data.x;
  const detail = step === 2 || step === 3;
  const engaged = step === 3;
  const capturing = step >= 6;

  return (
    <div className={`scene social-scene${onReddit ? " is-reddit" : " is-x"}`}>
      <BrowserChrome url={platform.url} loading={step === 0 || step === 4} />

      <div className="page-viewport">
        <div className="so-topbar">
          <span className="so-logo">{onReddit ? "reddit" : "𝕏"}</span>
          <span className="so-search">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span>{platform.query}</span>
          </span>
        </div>

        <div className="so-tabs">
          {platform.tabs.map((t, i) => (
            <span key={t} className={`so-tab${i === 0 ? " is-active" : ""}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="so-body">
          <div className={`so-feed${step === 1 || step === 5 ? " is-scrolling" : ""}`} key={onReddit ? "r" : "x"}>
            {platform.posts.map((p, i) => (
              <article
                key={i}
                className={`so-post${detail && i === 0 ? " is-open" : ""}${capturing ? " is-captured" : ""}`}
                style={{ animationDelay: `${0.1 + i * 0.16}s` }}
              >
                <span className="so-avatar" />
                <div className="so-post-main">
                  <div className="so-post-meta">
                    <span className="so-name">{p.user}</span>
                    <span className="so-handle">{p.handle}</span>
                    <span className="so-time">· {p.time}</span>
                  </div>
                  <p className="so-text">{p.body}</p>
                  <div className="so-actions">
                    <span className="so-action">
                      <Bubble /> {p.comments}
                    </span>
                    <span className={`so-action${engaged && i === 0 ? " is-hit" : ""}`}>
                      <Repost /> {p.reposts}
                    </span>
                    <span className={`so-action so-like${engaged && i === 0 ? " is-hit" : ""}`}>
                      <Heart /> {p.likes}
                    </span>
                  </div>

                  {detail && i === 0 && (
                    <div className="so-reply">
                      <span className="so-reply-avatar" />
                      <span className="so-reply-box">
                        {engaged ? (
                          <span className="so-reply-text" key="typed">
                            {platform.reply}
                          </span>
                        ) : (
                          <span className="so-reply-placeholder">{data.actions.replyPlaceholder}</span>
                        )}
                        {engaged && <span className="so-caret" />}
                      </span>
                      <span className={`so-reply-btn${engaged ? " is-sent" : ""}`}>
                        {engaged ? data.actions.posted : data.actions.reply}
                      </span>
                    </div>
                  )}
                </div>
                {capturing && <span className="so-capture-mark" style={{ animationDelay: `${i * 0.18}s` }} />}
              </article>
            ))}
            {[0, 1].map((i) => (
              <div key={`so-skel-${i}`} className="so-post so-post-skeleton" aria-hidden="true">
                <span className="so-avatar" />
                <div className="so-post-main">
                  <span className="so-skel-line short" />
                  <span className="so-skel-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Heart() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7.5-4.7-9.4-9A5.3 5.3 0 0 1 12 6.3 5.3 5.3 0 0 1 21.4 12c-1.9 4.3-9.4 9-9.4 9z" />
    </svg>
  );
}

function Repost() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 2.5 21 6l-4 3.5" />
      <path d="M21 6H7a3 3 0 0 0-3 3v2" />
      <path d="M7 21.5 3 18l4-3.5" />
      <path d="M3 18h14a3 3 0 0 0 3-3v-2" />
    </svg>
  );
}

function Bubble() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" />
    </svg>
  );
}
