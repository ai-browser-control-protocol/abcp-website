/**
 * "Solutions" chapter copy — the rewrite of the former How-it-works page.
 *
 * The page covers browser environments, the Chromium engine, page reading,
 * action records and reusable scripts.
 *
 * zh and en are authored here. ja/ko currently reuse the English object (the
 * same fallback the homepage uses); the locale team can replace those two
 * objects without touching the components.
 */
import type { Locale } from "./types";

export interface SolutionsCopy {
  seo: { title: string; description: string };
  hero: {
    title: string;
    lead: string;
  };
  fingerprint: {
    kicker: string;
    title: string;
    lead: string;
    bullets: string[];
    chartTitle: string;
    chartBars: { headless: string; homeIp: string; webcross: string };
    chartNote: string;
    geoTitle: string;
    pickLabel: string;
    siteSeesTitle: string;
    siteSees: {
      connection: string;
      connectionValue: string;
      city: string;
      cityValue: string;
      timezone: string;
      timezoneValue: string;
      language: string;
      languageValue: string;
    };
  };
  engine: {
    kicker: string;
    title: string;
    lead: string;
    bullets: string[];
    diagramTitle: string;
    /** `hop` is the label printed on the direct Agent→Kernel binding line. */
    direct: { label: string; sub: string; agent: string; kernel: string; note: string; hop: string };
    shim: { label: string; sub: string; agent: string; adapter: string; protocol: string; kernel: string; note: string };
    speedTitle: string;
    speedRows: { webcross: string; legacy: string };
    speedNote: string;
  };
  semantic: {
    kicker: string;
    title: string;
    lead: string;
    bullets: string[];
    panelPills: [string, string, string];
    overview: string;
    overviewCurrent: string;
    scope: string;
    main: string;
    status: string;
    target: string;
    change: string;
    detail: string;
    /** Thumbnail rows of the element-detail card, e.g. 类型/按钮. */
    changeRows: [string, string];
    detailRows: { key: string; value: string }[];
    detailHead: string;
    tokenLabel: string;
    tokenUnit: string;
    tokenNote: string;
    /** AXTree vs full-page-DOM compression story (the section's core claim). */
    compression: {
      title: string;
      dom: { label: string; value: string; unit: string };
      tree: { label: string; value: string; unit: string };
      ratioLabel: string;
      ratioValue: string;
      note: string;
      /** Short labels used inside the compressed-tree diagram. */
      diagramDom: string;
      diagramTree: string;
      keptLabel: string;
      droppedLabel: string;
    };
  };
  evidence: {
    kicker: string;
    title: string;
    lead: string;
    bullets: string[];
    imageAlt: string;
    caption: string;
    checkpoint: {
      confirm: string;
      replay: string;
      pending: string;
      resumed: string;
      prompt: string;
      result: string;
    };
    callouts: { title: string; text: string }[];
  };
  script: {
    kicker: string;
    title: string;
    lead: string;
    bullets: string[];
    steps: { title: string; text: string }[];
    codeCaption: string;
    codeNote: string;
  };
}

const zh: SolutionsCopy = {
  seo: {
    title: "解决方案",
    description:
      "了解 WebCross 的浏览器环境、Chromium 内核、页面读取、操作记录和可复用脚本。",
  },
  hero: {
    title: "网站会把你的 Agent\n当成真人，而不是脚本",
    lead: "换掉一行 Playwright 代码，或从任意 RPA 工具迁移过来。WebCross 从浏览器内核层解决指纹、IP、速度与可维护性——让 Agent 第一次真正像人一样上网。",
  },
  fingerprint: {
    kicker: "",
    title: "指纹这件活，交给浏览器自己做",
    lead: "我们不靠浏览器插件打补丁，而是直接 fork Chromium，在 C++ 层修补指纹泄露点；再为每个环境配上与地区一致的住宅 IP。",
    bullets: [
      "自研 Chromium 内核，C++ 层修补指纹泄露",
      "每个环境独立出口 IP，住宅带宽直连",
      "时区、语言、地区与 IP 保持一致",
    ],
    chartTitle: "同一批被风控站点上的放行率",
    chartBars: {
      headless: "Headless Chrome",
      homeIp: "Chrome + 家庭 IP",
      webcross: "WebCross + 家庭 IP",
    },
    chartNote: "公开指纹测试口径的参考值，非 WebCross 实测；实际放行率取决于站点风控策略与任务类型。",
    geoTitle: "在任意国家上网",
    pickLabel: "选择国家 / 地区",
    siteSeesTitle: "网站看到的信息",
    siteSees: {
      connection: "网络",
      connectionValue: "Vodafone · 家庭宽带",
      city: "城市",
      cityValue: "纽伦堡",
      timezone: "时区",
      timezoneValue: "Europe/Berlin",
      language: "语言",
      languageValue: "de-DE",
    },
  },
  engine: {
    kicker: "",
    title: "fork Chromium，把执行核心放进内核",
    lead: "传统方案在 Chrome 外面挂一层 JS 适配与 CDP/RPC 协议，每一步都要序列化往返。WebCross 直接 fork Chromium 内核，把执行核心嵌进渲染管线，同一任务链端到端提速 3 倍以上。",
    bullets: [
      "指令直通渲染管线，无需外部脚本注入",
      "剔除协议转换与 RPC 往返，零中间内耗",
      "复杂多步链路即发即应，端到端提速 3 倍以上",
    ],
    diagramTitle: "fork Chromium 内核直驱 vs 传统浏览器 + JS 适配层",
    direct: {
      label: "WebCross",
      sub: "fork Chromium 内核直驱",
      agent: "Agent",
      kernel: "Kernel",
      note: "同一进程直连 · 无协议边界",
      hop: "0 hop",
    },
    shim: {
      label: "Chrome",
      sub: "+ JavaScript 适配层",
      agent: "Agent",
      adapter: "JS Adapter",
      protocol: "CDP / RPC",
      kernel: "Kernel",
      note: "序列化 · IPC 往返",
    },
    speedTitle: "同一条任务链 · 耗时对比",
    speedRows: { webcross: "WebCross", legacy: "Chrome + JS" },
    speedNote: "相对耗时示意，实际结果随任务链路与页面状态变化。",
  },
  semantic: {
    kicker: "",
    title: "AXTree 语义树：只把 Agent 需要的信息交给它",
    lead: "一个页面的完整 DOM 动辄几十万字符，整包交给模型又慢又贵，其中大半还是与任务无关的噪声。WebCross 只下发 AXTree 语义树：保留结构、状态与可操作目标，丢掉样式、脚本与隐藏节点——同一页面的信息量直接压掉 85%。",
    bullets: [
      "AXTree 语义树只保留结构、状态与可操作目标，过滤渲染噪声",
      "同一页面：整页 DOM 数百 KB → 语义树数十 KB",
      "页面变化只下发真正变化的部分，避免重复阅读",
    ],
    panelPills: ["页面全景", "页面变化", "元素详情"],
    overview: "页面全景",
    overviewCurrent: "当前页面",
    scope: "页面范围 · 完整",
    main: "主内容",
    status: "状态 · 可见",
    target: "可操作目标",
    change: "页面变化",
    detail: "元素详情",
    changeRows: ["− 状态 · 等待", "+ 状态 · 就绪"],
    detailRows: [
      { key: "类型", value: "按钮" },
      { key: "状态", value: "可见" },
      { key: "操作", value: "点击" },
    ],
    detailHead: "元素详情",
    tokenLabel: "首次探索 vs 复用语义树",
    tokenUnit: "tokens / 次",
    tokenNote: "复用已沉淀的语义树与 Workflow，Token 参考量级。",
    compression: {
      title: "AXTree 语义树 vs 整页 DOM",
      dom: { label: "整页 DOM", value: "412K", unit: "字符" },
      tree: { label: "AXTree 语义树", value: "62K", unit: "字符" },
      ratioLabel: "页面信息剔除",
      ratioValue: "85%",
      note: "压缩后只剩原来的 15%，但足以完成点击、输入与页面判断——被砍掉的那部分，模型本来也用不上。",
      diagramDom: "整页 DOM",
      diagramTree: "AXTree",
      keptLabel: "保留：结构 · 状态 · 可操作目标",
      droppedLabel: "丢弃：样式 · 脚本 · 隐藏节点",
    },
  },
  evidence: {
    kicker: "",
    title: "每一步都有据可查，关键步骤始终在你手里",
    lead: "页面动作按任务与时间串成完整证据链：方法、用途、状态与可审阅的输入、结果、错误摘要都在同一条链上。敏感节点自动暂停请求确认，确认后从断点继续。",
    bullets: [],
    imageAlt: "WebCross 客户端的发布新贴文页面：x.com 页面来源、动作记录列表，以及一条等待人工接管的提示。",
    caption: "WebCross 客户端 · 发布新贴文",
    checkpoint: {
      confirm: "确认并继续", replay: "重新演示", pending: "待确认", resumed: "已恢复",
      prompt: "发布前暂停，等待你确认草稿内容。",
      result: "草稿内容已确认，任务从断点继续。",
    },
    callouts: [
      {
        title: "人工接管卡点",
        text: "敏感节点自动暂停并请求确认，处理完成后从断点继续，任务链条无需重启",
      },
      {
        title: "记录浏览器导航与动作历史",
        text: "页面跳转、方法调用、输入与结果都按时间串在同一条链上，可随时回溯",
      },
      {
        title: "状态可见",
        text: "已完成 / 进行中 / 需确认一眼分辨，关键步骤始终在你手里",
      },
    ],
  },
  script: {
    kicker: "",
    title: "把高频重复动作，转换为可复用的 JS Script",
    lead: "不用再画 RPA 流程图。WebCross 把验证过的操作沉淀为 JS 脚本：打开对应网站自动激活，Agent 也能直接调用，并按页面实际情况就地修改；多步骤、跨网页的业务由此串成一条流水线。",
    bullets: [],
    steps: [
      { title: "沉淀脚本", text: "一次跑通的步骤被记录为可读的 JS 脚本，随页面结构自动对齐。" },
      { title: "自动激活 / Agent 调用", text: "打开匹配的网站即自动激活；Claude Code、Codex 等 Agent 也能直接调用并现场改写。" },
      { title: "跨页流水线", text: "脚本按业务顺序串行执行，跨多个网页完成多步骤任务。" },
    ],
    codeCaption: "workflows/post-to-x.workflow.js",
    codeNote: "",
  },
};

const en: SolutionsCopy = {
  seo: {
    title: "Solutions",
    description:
      "Explore browser environments, the Chromium engine, page reading, action history and reusable scripts in WebCross.",
  },
  hero: {
    title: "Websites treat your Agent as a person, not a script",
    lead: "Change one line of your Playwright code — or migrate straight from any RPA tool. WebCross fixes fingerprints, IPs, speed and maintainability at the browser-engine level, so your Agent finally browses like a person.",
  },
  fingerprint: {
    kicker: "",
    title: "Fingerprints: the browser does the work",
    lead: "No extension patching. We fork Chromium and close fingerprint leaks in C++, then pair every environment with a residential IP that matches its region.",
    bullets: [
      "Own Chromium fork, leaks patched in C++",
      "Isolated residential exit IP per environment",
      "Timezone, language and region stay consistent with the IP",
    ],
    chartTitle: "Get-in rate on the same bot-protected sites",
    chartBars: {
      headless: "Headless Chrome",
      homeIp: "Chrome + home IP",
      webcross: "WebCross + home IP",
    },
    chartNote: "Reference values from public fingerprint testing, not WebCross measurements; real pass rates depend on the site's bot policy and the task.",
    geoTitle: "Browse from any country",
    pickLabel: "Pick a country",
    siteSeesTitle: "What the site sees",
    siteSees: {
      connection: "Connection",
      connectionValue: "Vodafone · home",
      city: "City",
      cityValue: "Nuremberg",
      timezone: "Timezone",
      timezoneValue: "Europe/Berlin",
      language: "Language",
      languageValue: "de-DE",
    },
  },
  engine: {
    kicker: "",
    title: "Fork Chromium — move the execution core into the engine",
    lead: "Traditional stacks bolt a JS adapter and CDP/RPC protocol onto Chrome, paying a serialization round trip at every step. WebCross forks the Chromium kernel and embeds its execution core in the render pipeline — 3×+ faster end to end on the same task chain.",
    bullets: [
      "Commands reach the render pipeline — no injected scripts",
      "No protocol translation or RPC round trips",
      "Complex multi-step chains respond instantly, 3×+ faster end to end",
    ],
    diagramTitle: "Forked Chromium kernel vs vanilla browser + JS shim",
    direct: {
      label: "WebCross",
      sub: "Forked Chromium kernel",
      agent: "Agent",
      kernel: "Kernel",
      note: "same process · no protocol boundary",
      hop: "0 hop",
    },
    shim: {
      label: "Chrome",
      sub: "+ JavaScript adapter layer",
      agent: "Agent",
      adapter: "JS Adapter",
      protocol: "CDP / RPC",
      kernel: "Kernel",
      note: "Serialization · IPC round trip",
    },
    speedTitle: "Same task chain · execution time",
    speedRows: { webcross: "WebCross", legacy: "Chrome + JS" },
    speedNote: "Relative timing illustration; actual results vary with the task chain and page state.",
  },
  semantic: {
    kicker: "",
    title: "AXTree semantic tree: give the Agent only what it needs",
    lead: "A full page DOM easily runs to hundreds of thousands of characters; sending all of it to the model is slow, expensive, and mostly noise. WebCross sends only the AXTree semantic tree — structure, state and actionable targets kept, styles, scripts and hidden nodes dropped — cutting 85% of the page's information.",
    bullets: [
      "AXTree keeps structure, state and actionable targets, dropping rendering noise",
      "Same page: hundreds of KB of DOM → tens of KB of tree",
      "Page changes only carry what actually changed",
    ],
    panelPills: ["Page overview", "Page changes", "Element detail"],
    overview: "Page overview",
    overviewCurrent: "Current page",
    scope: "Page scope · complete",
    main: "Main content",
    status: "Status · visible",
    target: "Ready to act",
    change: "Page changes",
    detail: "Element detail",
    changeRows: ["− status · waiting", "+ status · ready"],
    detailRows: [
      { key: "Type", value: "Button" },
      { key: "Status", value: "Visible" },
      { key: "Action", value: "Click" },
    ],
    detailHead: "Element detail",
    tokenLabel: "First exploration vs reused semantic tree",
    tokenUnit: "tokens / run",
    tokenNote: "Order-of-magnitude reference when reusing a distilled tree and workflow.",
    compression: {
      title: "AXTree semantic tree vs full-page DOM",
      dom: { label: "Full-page DOM", value: "412K", unit: "chars" },
      tree: { label: "AXTree semantic tree", value: "62K", unit: "chars" },
      ratioLabel: "Page info removed",
      ratioValue: "85%",
      note: "What survives is 15% of the original size — enough to click, type and judge the page. The part that was cut is the part the model never needed.",
      diagramDom: "Full DOM",
      diagramTree: "AXTree",
      keptLabel: "Kept: structure · state · actionable targets",
      droppedLabel: "Dropped: styles · scripts · hidden nodes",
    },
  },
  evidence: {
    kicker: "",
    title: "Every action leaves proof — critical steps stay yours",
    lead: "Page actions are chained by task and time: method, purpose, status, plus reviewable input, result and error summaries in one evidence chain. Sensitive checkpoints pause for a human, then resume from the breakpoint.",
    bullets: [],
    imageAlt: "The WebCross client publish-post view on x.com: page source, the action-record list, and a human-takeover prompt.",
    caption: "WebCross client · Publish post",
    checkpoint: {
      confirm: "Confirm and resume", replay: "Replay demo", pending: "Awaiting review", resumed: "Resumed",
      prompt: "Paused before publishing so you can review the draft.",
      result: "Draft confirmed. The task resumed at the checkpoint.",
    },
    callouts: [
      {
        title: "Human checkpoint",
        text: "Sensitive steps pause and ask for confirmation, then resume from the breakpoint without restarting the chain",
      },
      {
        title: "Navigation and action history",
        text: "Page transitions, method calls, inputs and results are chained by time and can be traced back at any point",
      },
      {
        title: "Visible status",
        text: "Done / running / needs review at a glance — critical steps stay yours",
      },
    ],
  },
  script: {
    kicker: "",
    title: "Turn frequent repetitive actions into reusable JS scripts",
    lead: "Stop drawing RPA flowcharts. WebCross distils verified actions into JS scripts: they auto-activate when the matching site opens, agents can call them, and they adjust in place to the real page — so multi-step, cross-site work runs as one pipeline.",
    bullets: [],
    steps: [
      { title: "Distill", text: "A run that worked becomes readable JS, realigned to the page structure." },
      { title: "Auto-run or agent-call", text: "Opens with the site, or is called and adapted by Claude Code, Codex and friends." },
      { title: "Cross-site pipeline", text: "Scripts run in business order, chaining several sites into one task." },
    ],
    codeCaption: "workflows/post-to-x.workflow.js",
    codeNote: "",
  },
};

/** Japanese and Korean currently fall back to the English catalog, matching the
 *  homepage. Replace these two objects with real translations when available. */
const ja: SolutionsCopy = en;
const ko: SolutionsCopy = en;

const copies: Record<Locale, SolutionsCopy> = { zh, en, ja, ko };

export function getSolutionsCopy(locale: Locale): SolutionsCopy {
  return copies[locale] ?? copies.zh;
}
