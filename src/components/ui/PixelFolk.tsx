/**
 * The hero relay — three voxel colleagues acting out one job passing down a line.
 *
 *   w1 works at the keyboard, finishes, turns and hands the report over →
 *   w2 receives it, reads, checks it under a glass, writes the analysis, and
 *   holds up the finished thing →
 *   w3 (the boss) reads it and signs off.
 *
 * Each figure is a stack of stills with exactly one visible; a beat swaps which.
 * That is why the frames are exported on a per-character shared crop — any
 * difference in framing between two stills of the same person would read as a
 * jitter rather than as movement.
 *
 * The clock is React state rather than CSS keyframes because the timeline is a
 * script with uneven beats — three quick typing frames, then a long hold on the
 * smile — which is a list here and a wall of percentages in CSS. It stops when
 * the strip scrolls out of view.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { useImagePreload } from "./useImagePreload";
import "./pixel-folk.css";

type Shot = { f: string; ms: number };

type Actor = {
  id: string;
  /** Aspect of the shared crop, so the frame box matches the art exactly. */
  ratio: string;
  frames: readonly string[];
  /** Shown whenever it is not this figure's beat. */
  rest: string;
  shots: readonly Shot[];
};

const CAST: readonly Actor[] = [
  {
    id: "w1",
    ratio: "824 / 809",
    frames: ["idle", "type", "smile", "turn", "hand"],
    rest: "idle",
    shots: [
      { f: "idle", ms: 520 },
      /* idle/type alternation is the typing itself — three taps, then done */
      { f: "type", ms: 360 },
      { f: "idle", ms: 180 },
      { f: "type", ms: 360 },
      { f: "idle", ms: 180 },
      { f: "type", ms: 360 },
      { f: "smile", ms: 820 },
      { f: "turn", ms: 520 },
      { f: "hand", ms: 900 },
    ],
  },
  {
    id: "w2",
    ratio: "770 / 793",
    frames: ["recv", "read", "zoom", "write", "done"],
    rest: "read",
    shots: [
      { f: "recv", ms: 850 },
      { f: "read", ms: 760 },
      { f: "zoom", ms: 900 },
      { f: "write", ms: 900 },
      { f: "done", ms: 1050 },
    ],
  },
  {
    id: "w3",
    ratio: "469 / 862",
    frames: ["read", "ok"],
    rest: "read",
    shots: [
      { f: "read", ms: 1300 },
      { f: "ok", ms: 1500 },
    ],
  },
];

type Step = { kind: "act"; actor: number } | { kind: "pass"; lane: 1 | 2 };

const SCRIPT: readonly Step[] = [
  { kind: "act", actor: 0 },
  { kind: "pass", lane: 1 },
  { kind: "act", actor: 1 },
  { kind: "pass", lane: 2 },
  { kind: "act", actor: 2 },
];

/** Long enough for the hand-off to land before the next figure starts. */
const PASS_MS = 1150;

const PIXEL_SOURCES = [
  ...CAST.flatMap((actor) => actor.frames.map((frame) => `/folk/${actor.id}-${frame}.webp`)),
  "/folk/peek-idle.webp",
  "/folk/peek-smile.webp",
] as const;

export function PixelScene({
  assurances = [],
  className = "",
}: {
  assurances?: readonly string[];
  className?: string;
}) {
  const [pos, setPos] = useState({ step: 0, shot: 0 });
  const [live, setLive] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const assetsReady = useImagePreload(PIXEL_SOURCES);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!live || !assetsReady) return;
    const step = SCRIPT[pos.step];
    const nextStep = () => setPos({ step: (pos.step + 1) % SCRIPT.length, shot: 0 });

    if (step.kind === "pass") {
      const id = setTimeout(nextStep, PASS_MS);
      return () => clearTimeout(id);
    }

    const shots = CAST[step.actor].shots;
    const id = setTimeout(() => {
      if (pos.shot + 1 < shots.length) setPos({ step: pos.step, shot: pos.shot + 1 });
      else nextStep();
    }, shots[pos.shot].ms);
    return () => clearTimeout(id);
  }, [pos, live, assetsReady]);

  const step = SCRIPT[pos.step];
  const acting = step.kind === "act" ? step.actor : -1;
  const lane = step.kind === "pass" ? step.lane : 0;

  const frameOf = (i: number) => {
    const actor = CAST[i];
    if (i !== acting) return actor.rest;
    return actor.shots[Math.min(pos.shot, actor.shots.length - 1)].f;
  };

  return (
    <div
      className={`pixel-scene${assetsReady ? " is-ready" : ""}${live ? " is-live" : ""} ${className}`.trim()}
      ref={hostRef}
    >
      <div className="pixel-scene-stage">
        {/* Anchored over w1, who is the one doing the local work. */}
        {assurances[1] && (
          <p className={`folk-bubble${acting === 0 ? " is-lit" : ""}`}>{assurances[1]}</p>
        )}

        {CAST.map((actor, i) => (
          <div
            key={actor.id}
            className={`folk-fig folk-fig-${i + 1}${i === acting ? " is-active" : ""}`}
            style={{ aspectRatio: actor.ratio }}
            aria-hidden="true"
          >
            {actor.frames.map((f) => (
              <img
                key={f}
                className={`folk-frame${f === frameOf(i) ? " is-on" : ""}`}
                src={`/folk/${actor.id}-${f}.webp`}
                alt=""
                decoding="async"
              />
            ))}
          </div>
        ))}

        {/* Hand-off. Lane 1 is a physical pass, lane 2 a wired one — same beat,
            different character, so the two do not read as one repeated trick. */}
        <span className={`folk-parcel${lane ? ` is-pass-${lane}` : ""}`} aria-hidden="true">
          <span className="folk-parcel-line" />
          <span className="folk-parcel-line" />
        </span>

        {/* Fourth station: someone leaning in from the page edge, bubble overhead.
            Two stills cross-fade so the expression lands after they arrive. */}
        {assurances[0] && (
          <div className="peek-station">
            <p className="peek-bubble">{assurances[0]}</p>
            <span className="peek-folk" aria-hidden="true">
              <span className="peek-folk-slide">
                <img className="peek-face" src="/folk/peek-idle.webp" alt="" width={288} height={480} />
                <img
                  className="peek-face peek-face-smile"
                  src="/folk/peek-smile.webp"
                  alt=""
                  width={288}
                  height={480}
                />
              </span>
            </span>
          </div>
        )}

        <span className="pixel-scene-ground" aria-hidden="true" />
      </div>
    </div>
  );
}
