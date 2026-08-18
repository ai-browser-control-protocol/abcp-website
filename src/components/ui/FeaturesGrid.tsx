/**
 * Product capabilities — one full-width story section per capability.
 *
 * Layout mirrors lite.ego.app: text on one side, a moving figure on the other,
 * sides alternating down the page. No section heading sits above the stack; the
 * capability titles carry the page on their own.
 *
 * Each figure is an inline SVG whose animations only run once the row scrolls
 * into view (`is-visible`), so nothing burns frames off-screen.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { FeaturesCopy } from "@/content/models";
import "./features-grid.css";

export function FeaturesGrid({ copy }: { copy: FeaturesCopy }) {
  if (!copy?.items?.length) return null;

  return (
    <section className="features-section" id="features" aria-label="Product capabilities">
      {copy.items.map((item, index) => (
        <FeatureRow key={item.key} item={item} index={index} badge={copy.badge} />
      ))}
    </section>
  );
}

function FeatureRow({
  item,
  index,
  badge,
}: {
  item: FeaturesCopy["items"][number];
  index: number;
  badge: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`feature-row${index % 2 === 1 ? " is-reversed" : ""}${visible ? " is-visible" : ""}`}
    >
      <div className="feature-copy">
        <div className="feature-eyebrow">
          <span className="feature-num">{String(index + 1).padStart(2, "0")}</span>
          <span className="feature-eyebrow-text">{item.eyebrow}</span>
          <span className="feature-eyebrow-badge">{badge}</span>
        </div>
        <h2 className="feature-title">{item.title}</h2>
        <p className="feature-body">{item.body}</p>
        <ul className="feature-bullets">
          {item.bullets.map((b) => (
            <li key={b}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="feature-figure">
        <div className="feature-figure-card">
          <FeatureIllustration index={index} />
        </div>
        <span className="feature-figure-caption">{item.figure}</span>
      </div>
    </article>
  );
}

/* ========================================================================== */
/* Figures                                                                     */
/* ========================================================================== */

function FeatureIllustration({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <IllusSpeed />;
    case 1:
      return <IllusToken />;
    case 2:
      return <IllusLocal />;
    case 3:
      return <IllusFingerprint />;
    case 4:
      return <IllusSkill />;
    default:
      return <IllusTakeover />;
  }
}

/* 01 — custom Chromium kernel vs Chrome + JS adapter */
function IllusSpeed() {
  return (
    <svg viewBox="0 0 480 360" className="ill-svg" role="img" aria-label="Chromium kernel vs adapter layer">
      <defs>
        <linearGradient id="sp-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff8a4a" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
      </defs>

      {/* left — WebCross: the agent talks straight to the kernel */}
      <rect x="22" y="26" width="196" height="236" rx="12" fill="#0a0a0a" />
      <text x="120" y="54" textAnchor="middle" fill="#ff6b35" fontSize="13" fontWeight="800" fontFamily="ui-monospace, monospace">WebCross</text>
      <text x="120" y="72" textAnchor="middle" fill="#ffffff" fontSize="10.5" opacity="0.6">Chromium 内核级定制</text>
      <line x1="120" y1="86" x2="120" y2="219" stroke="#2a2a2e" strokeWidth="2" />
      {["Agent", "Kernel", "Page"].map((label, i) => (
        <g key={label} transform={"translate(120, " + (100 + i * 52) + ")"}>
          <rect x="-64" y="-15" width="128" height="30" rx="7" fill="#17171b" stroke="#2f2f36" />
          <text textAnchor="middle" y="4" fill="#e7e7ea" fontSize="10.5" fontFamily="ui-monospace, monospace">{label}</text>
        </g>
      ))}
      <circle className="sp-packet-fast" r="5" fill="#ff6b35" cx="120" cy="100" />
      <text x="120" y="246" textAnchor="middle" fill="#ffffff" fontSize="9.5" opacity="0.45" fontFamily="ui-monospace, monospace">native binding · 0 hop</text>

      {/* right — Chrome, with an adapter layer on every call */}
      <rect x="262" y="26" width="196" height="236" rx="12" fill="#ffffff" stroke="#e4e4e7" />
      <text x="360" y="54" textAnchor="middle" fill="#71717a" fontSize="13" fontWeight="700">Chrome</text>
      <text x="360" y="72" textAnchor="middle" fill="#a1a1aa" fontSize="10.5">+ JavaScript 适配层</text>
      <line x1="360" y1="86" x2="360" y2="237" stroke="#e4e4e7" strokeWidth="2" />
      {["Agent", "JS Adapter", "CDP / RPC", "Page"].map((label, i) => (
        <g key={label} transform={"translate(360, " + (98 + i * 42) + ")"}>
          <rect x="-64" y="-14" width="128" height="28" rx="7" fill="#f4f4f5" stroke="#e4e4e7" />
          <text textAnchor="middle" y="4" fill="#71717a" fontSize="10" fontFamily="ui-monospace, monospace">{label}</text>
        </g>
      ))}
      <circle className="sp-packet-slow" r="5" fill="#a1a1aa" cx="360" cy="98" />
      <text x="360" y="256" textAnchor="middle" fill="#a1a1aa" fontSize="9.5" fontFamily="ui-monospace, monospace">序列化 · IPC 往返</text>

      {/* same task, time spent */}
      <text x="22" y="296" fill="#71717a" fontSize="10.5" fontWeight="700">同一条任务链路 · 耗时对比</text>
      <g transform="translate(22, 322)">
        <text fill="#ff6b35" fontSize="10.5" fontWeight="700">WebCross</text>
        <rect x="98" y="-9" width="290" height="10" rx="5" fill="#f0f0f2" />
        <rect className="sp-bar-fast" x="98" y="-9" height="10" rx="5" fill="url(#sp-bar)" />
        <text x="398" y="0" fill="#ff6b35" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">1.0×</text>
      </g>
      <g transform="translate(22, 348)">
        <text fill="#a1a1aa" fontSize="10.5" fontWeight="700">Chrome + JS</text>
        <rect x="98" y="-9" width="290" height="10" rx="5" fill="#f0f0f2" />
        <rect className="sp-bar-slow" x="98" y="-9" height="10" rx="5" fill="#d4d4d8" />
        <text x="398" y="0" fill="#a1a1aa" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace">3.2×</text>
      </g>
    </svg>
  );
}

/* 02 — raw DOM vs filtered AXTree */
function IllusToken() {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label="DOM to AXTree token reduction">
      <rect x="22" y="26" width="188" height="216" rx="10" fill="#f6f6f7" stroke="#e4e4e7" />
      <text x="116" y="50" textAnchor="middle" fill="#71717a" fontSize="11.5" fontWeight="700">原始 DOM</text>
      <g className="tk-noise">
        {Array.from({ length: 56 }).map((_, i) => {
          const col = i % 8;
          const row = Math.floor(i / 8);
          return (
            <rect
              key={i}
              x={38 + col * 20}
              y={64 + row * 20}
              width={16}
              height={13}
              rx={2}
              fill={i % 4 === 0 ? "#a1a1aa" : "#d4d4d8"}
              style={{ animationDelay: `${(i % 13) * 0.09}s` }}
            />
          );
        })}
      </g>
      <text x="116" y="228" textAnchor="middle" fill="#a1a1aa" fontSize="10.5" fontFamily="ui-monospace, monospace">12,480 tokens</text>

      <g transform="translate(220, 130)">
        <path d="M0 4 L30 4" stroke="#ff6b35" strokeWidth="2.5" />
        <path d="M23 -3 L30 4 L23 11" stroke="#ff6b35" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="15" y="-8" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="800">-85%</text>
      </g>

      <rect x="270" y="26" width="188" height="216" rx="10" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.4" />
      <text x="364" y="50" textAnchor="middle" fill="#ff6b35" fontSize="11.5" fontWeight="700">过滤后 AXTree</text>
      <g className="tk-tree" fontFamily="ui-monospace, monospace" fontSize="10">
        {[
          ["root", "#0a0a0a", 286],
          ["├─ button[submit]", "#ff6b35", 294],
          ["├─ input[name=email]", "#ff6b35", 294],
          ["├─ list", "#0a0a0a", 294],
          ["│  ├─ row “Mophie…”", "#ff6b35", 302],
          ["│  ├─ row “Anker…”", "#0a0a0a", 302],
          ["│  └─ row “INIU…”", "#ff6b35", 302],
          ["└─ a[href=/cart]", "#ff6b35", 294],
        ].map(([label, fill, x], i) => (
          <text
            key={i}
            x={Number(x)}
            y={74 + i * 19}
            fill={String(fill)}
            style={{ animationDelay: `${0.15 + i * 0.11}s` }}
          >
            {String(label)}
          </text>
        ))}
      </g>
      <text x="364" y="228" textAnchor="middle" fill="#ff6b35" fontSize="10.5" fontWeight="800" fontFamily="ui-monospace, monospace">1,820 tokens</text>

      {["+ Shadow DOM", "+ 跨域 iframe", "+ Canvas 语义"].map((label, i) => (
        <g key={label} transform={`translate(${22 + i * 152}, 262)`}>
          <rect width="142" height="26" rx="13" fill="#ffffff" stroke="#ff6b35" />
          <text x="71" y="17" textAnchor="middle" fill="#ff6b35" fontSize="10.5" fontWeight="700">{label}</text>
        </g>
      ))}
    </svg>
  );
}

/* 03 — everything stays on the machine */
function IllusLocal() {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label="All data stays local">
      <defs>
        <radialGradient id="lc-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="lc-glow" cx="240" cy="150" r="140" fill="url(#lc-glow)" />

      {/* blocked outbound */}
      {[
        [78, 44],
        [366, 44],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`} opacity="0.65">
          <path d="M6 26 a18 18 0 0 1 0 -18 a18 18 0 0 1 36 0 a13 13 0 0 1 0 26 z" fill="#ececee" />
          <text x="24" y="48" textAnchor="middle" fill="#a1a1aa" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace">CLOUD</text>
          <g className="lc-block">
            <line x1="2" y1="4" x2="46" y2="34" stroke="#ff6b35" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="46" y1="4" x2="2" y2="34" stroke="#ff6b35" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>
      ))}

      {/* outbound attempts that bounce back */}
      <path className="lc-try" d="M200 118 C170 96 140 84 116 78" stroke="#ff6b35" strokeWidth="1.8" fill="none" strokeDasharray="4 5" />
      <path className="lc-try lc-try-2" d="M282 118 C312 96 342 84 366 78" stroke="#ff6b35" strokeWidth="1.8" fill="none" strokeDasharray="4 5" />

      {/* device */}
      <g transform="translate(178, 106)">
        <rect width="124" height="86" rx="9" fill="#0a0a0a" />
        <rect x="7" y="7" width="110" height="72" rx="5" fill="#1c1c20" />
        <rect x="16" y="16" width="58" height="7" rx="3.5" fill="#ff6b35" />
        <rect className="lc-line" x="16" y="30" width="42" height="5" rx="2.5" fill="#3f3f46" />
        <rect className="lc-line lc-line-2" x="16" y="40" width="56" height="5" rx="2.5" fill="#3f3f46" />
        <rect className="lc-line lc-line-3" x="16" y="50" width="36" height="5" rx="2.5" fill="#3f3f46" />
        <rect x="16" y="62" width="32" height="9" rx="4.5" fill="#ff6b35" opacity="0.65" />
        <rect x="52" y="62" width="24" height="9" rx="4.5" fill="#3f3f46" />
        <g className="lc-shield" transform="translate(100, 22)">
          <path d="M0 -9 l9 4.2 v6.3 c0 4.6 -3.9 8 -9 9 -5.1 -1 -9 -4.4 -9 -9 v-6.3z" fill="#ff6b35" />
          <path d="M-3.6 0.4 l2.4 2.4 l4.8 -4.8" stroke="#0a0a0a" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <rect x="152" y="98" width="176" height="102" rx="14" fill="none" stroke="#ff6b35" strokeWidth="1.6" strokeDasharray="7 6" className="lc-fence" />

      <text x="240" y="228" textAnchor="middle" fill="#ff6b35" fontSize="13" fontWeight="800" fontFamily="ui-monospace, monospace">100% LOCAL</text>
      <text x="240" y="248" textAnchor="middle" fill="#71717a" fontSize="10.5">账号凭证 · Cookie · 指令 · 执行流水</text>
      <g transform="translate(130, 268)">
        <rect width="220" height="30" rx="15" fill="#0a0a0a" />
        <text x="110" y="20" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="600">零云端上传 · 零数据回传</text>
      </g>
    </svg>
  );
}

/* 04 — fingerprint / IP matrix */
function IllusFingerprint() {
  const palette = ["#ff6b35", "#38bdf8", "#10b981", "#a855f7"];
  const labels = ["US · 洛杉矶", "JP · 东京", "DE · 法兰克福", "UK · 伦敦"];
  return (
    <svg viewBox="0 0 480 336" className="ill-svg" role="img" aria-label="Fingerprint and IP matrix">
      {Array.from({ length: 3 }).flatMap((_, row) =>
        Array.from({ length: 4 }).map((_, col) => {
          const x = 26 + col * 110;
          const y = 26 + row * 82;
          const accent = palette[col];
          const delay = (row * 4 + col) * 0.055;
          return (
            <g key={`${row}-${col}`} className="fp-tile" style={{ animationDelay: `${delay}s` }}>
              <rect x={x} y={y} width="96" height="66" rx="8" fill="#ffffff" stroke="#e4e4e7" />
              <rect x={x + 6} y={y + 6} width="84" height="15" rx="4" fill={accent} opacity="0.1" />
              <circle cx={x + 16} cy={y + 13.5} r="4" fill={accent} />
              <rect x={x + 26} y={y + 11} width="34" height="2.4" rx="1.2" fill={accent} opacity="0.55" />
              <rect x={x + 26} y={y + 16} width="22" height="2.4" rx="1.2" fill={accent} opacity="0.35" />
              <rect x={x + 6} y={y + 28} width="84" height="2" rx="1" fill="#eeeef0" />
              <rect x={x + 6} y={y + 36} width="58" height="3.4" rx="1.7" fill="#0a0a0a" opacity="0.68" />
              <rect x={x + 6} y={y + 45} width="78" height="2" rx="1" fill="#eeeef0" />
              <rect x={x + 6} y={y + 52} width="46" height="2" rx="1" fill="#eeeef0" />
              <g className="fp-ring" style={{ animationDelay: `${delay + 0.4}s` }} transform={`translate(${x + 80}, ${y + 50})`}>
                <circle r="8" fill="#ffffff" stroke={accent} strokeWidth="1.6" />
                <path d="M-4 -1.6 a4 4 0 0 1 8 0 M-4 1.8 a4 4 0 0 0 8 0" stroke={accent} strokeWidth="1.1" fill="none" />
              </g>
            </g>
          );
        })
      )}
      {labels.map((label, i) => (
        <text key={label} x={74 + i * 110} y="294" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="ui-monospace, monospace">
          {label}
        </text>
      ))}
      <text x="240" y="326" textAnchor="middle" fill="#a1a1aa" fontSize="9.5">12 个实例 · 12 套指纹 · 12 条出口 IP · 互不串号</text>
    </svg>
  );
}

/* 05 — task run distilled into a reusable skill */
function IllusSkill() {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label="Task run becomes a reusable skill">
      <defs>
        <linearGradient id="sk-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff8a4a" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
        <marker id="sk-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#ff6b35" />
        </marker>
      </defs>

      <g transform="translate(20, 52)">
        <rect width="134" height="116" rx="11" fill="#f6f6f7" stroke="#e4e4e7" />
        <text x="67" y="26" textAnchor="middle" fill="#0a0a0a" fontSize="11" fontWeight="700">任务执行</text>
        <text x="67" y="42" textAnchor="middle" fill="#71717a" fontSize="9.5">WebCross Harness</text>
        {["goto(url)", "click(.btn)", "extract(dom)", "wait(200ms)"].map((line, i) => (
          <g key={line} transform={`translate(16, ${58 + i * 15})`}>
            <g className="sk-line" style={{ animationDelay: `${i * 0.16}s` }}>
              <circle r="3.2" fill="#0a0a0a" />
              <text x="11" y="3.4" fill="#3f3f46" fontSize="9" fontFamily="ui-monospace, monospace">{line}</text>
            </g>
          </g>
        ))}
      </g>
      <text x="87" y="188" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">01</text>

      <path d="M158 110 L186 110" stroke="#ff6b35" strokeWidth="2" markerEnd="url(#sk-arrow)" className="sk-flow" />

      <g transform="translate(190, 52)">
        <rect width="134" height="116" rx="11" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.4" />
        <text x="67" y="26" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">沉淀 Skill</text>
        <text x="67" y="42" textAnchor="middle" fill="#0a0a0a" fontSize="9.5" fontFamily="ui-monospace, monospace">amazon.patrol</text>
        {["input(query)", "pick(result[0])", "grab(price)", "grab(reviews)"].map((line, i) => (
          <g key={line} transform={`translate(16, ${58 + i * 15})`}>
            <g className="sk-line" style={{ animationDelay: `${0.6 + i * 0.16}s` }}>
              <circle r="3.2" fill="#ff6b35" />
              <text x="11" y="3.4" fill="#3f3f46" fontSize="9" fontFamily="ui-monospace, monospace">{line}</text>
            </g>
          </g>
        ))}
      </g>
      <text x="257" y="188" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">02</text>

      <path d="M328 110 L356 110" stroke="#ff6b35" strokeWidth="2" markerEnd="url(#sk-arrow)" className="sk-flow sk-flow-2" />

      <g transform="translate(360, 52)">
        <rect width="100" height="116" rx="11" fill="#0a0a0a" />
        <text x="50" y="26" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">一键复用</text>
        <g className="sk-replay" transform="translate(50, 62)">
          <circle r="21" fill="none" stroke="#2c2c31" strokeWidth="3" />
          <circle className="sk-replay-arc" r="21" fill="none" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" />
          <text textAnchor="middle" y="5" fill="#ffffff" fontSize="14" fontWeight="800" fontFamily="ui-monospace, monospace">-60%</text>
        </g>
        <text x="50" y="102" textAnchor="middle" fill="#ffffff" fontSize="9" opacity="0.55">tokens / 次</text>
      </g>
      <text x="410" y="188" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">03</text>

      <g transform="translate(20, 232)">
        <text fill="#71717a" fontSize="10">首次执行</text>
        <rect x="0" y="12" width="440" height="12" rx="6" fill="#f0f0f2" />
        <rect x="0" y="12" width="440" height="12" rx="6" fill="#d4d4d8" />
        <text x="440" y="9" textAnchor="end" fill="#a1a1aa" fontSize="10" fontFamily="ui-monospace, monospace">12,480 tokens</text>
      </g>
      <g transform="translate(20, 274)">
        <text fill="#ff6b35" fontSize="10" fontWeight="700">复用 Skill</text>
        <rect x="0" y="12" width="440" height="12" rx="6" fill="#f0f0f2" />
        <rect className="sk-saving" x="0" y="12" height="12" rx="6" fill="url(#sk-bar)" />
        <text x="440" y="9" textAnchor="end" fill="#ff6b35" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace">4,760 tokens</text>
      </g>
    </svg>
  );
}

/* 06 — human takeover on 2FA, then resume */
function IllusTakeover() {
  return (
    <svg viewBox="0 0 480 320" className="ill-svg" role="img" aria-label="Human takeover and resume">
      <line x1="52" y1="34" x2="52" y2="286" stroke="#e8e8ea" strokeWidth="2" />
      <line className="tv-progress" x1="52" y1="34" x2="52" y2="286" stroke="#ff6b35" strokeWidth="2" />

      <circle cx="52" cy="52" r="6" fill="#ff6b35" />
      <text x="74" y="48" fill="#0a0a0a" fontSize="11.5" fontWeight="700">后台执行中</text>
      <text x="74" y="66" fill="#71717a" fontSize="10">智能体自动登录、点击、抓取，用户无感</text>
      <g transform="translate(74, 76)">
        <rect width="336" height="8" rx="4" fill="#f0f0f2" />
        <rect className="tv-run" width="336" height="8" rx="4" fill="#d4d4d8" />
      </g>

      <circle className="tv-alert" cx="52" cy="164" r="8" fill="#ff6b35" stroke="#ffffff" strokeWidth="2.4" />
      <g transform="translate(74, 106)">
       <g className="tv-card">
        <rect width="336" height="112" rx="11" fill="#fff7f2" stroke="#ff6b35" strokeWidth="1.4" />
        <text x="18" y="27" fill="#ff6b35" fontSize="11.5" fontWeight="800">需要您确认 · 2FA 验证码</text>
        <text x="18" y="46" fill="#3f3f46" fontSize="10">任务已暂停在断点，验证完成后自动继续</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(${18 + i * 34}, 58)`}>
            <rect width="26" height="30" rx="6" fill="#ffffff" stroke="#ff6b35" />
            <text className="tv-digit" x="13" y="21" textAnchor="middle" fill="#0a0a0a" fontSize="13" fontWeight="700" fontFamily="ui-monospace, monospace" style={{ animationDelay: `${i * 0.07}s` }}>
              {[4, 8, 1, 6, 0, 3][i]}
            </text>
          </g>
        ))}
        <g transform="translate(240, 62)">
          <g className="tv-confirm">
            <rect width="80" height="24" rx="12" fill="#ff6b35" />
            <text x="40" y="16" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="700">已验证</text>
          </g>
        </g>
       </g>
      </g>
      <text x="74" y="236" fill="#a1a1aa" fontSize="9.5" fontFamily="ui-monospace, monospace">唤起耗时 &lt; 40 ms</text>

      <circle className="tv-resume" cx="52" cy="272" r="6" fill="#10b981" />
      <text x="74" y="268" fill="#0a0a0a" fontSize="11.5" fontWeight="700">从断点恢复后台执行</text>
      <text x="74" y="286" fill="#71717a" fontSize="10">无需重启任务，其他并发实例全程未中断</text>
    </svg>
  );
}
