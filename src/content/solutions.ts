/**
 * "Solutions" chapter copy — the rewrite of the former How-it-works page.
 *
 * The page argues one story in seven beats: stealth (IP / fingerprint / CAPTCHA),
 * fingerprint + residential geography, a Chromium fork that drives the engine
 * directly, a semantic tree that keeps Token cost down, a 1000+ environment
 * matrix, auditable action records with human takeover, and finally reusable JS
 * scripts wired into agent workflows.
 *
 * zh and en are authored here. ja/ko currently reuse the English object (the
 * same fallback the homepage uses); the locale team can replace those two
 * objects without touching the components.
 */
import type { Locale } from "./types";

export interface SolutionCheck {
  /** Section card title, e.g. "出口 IP" */
  title: string;
  /** One-line question the site asks */
  question: string;
  /** Bad state label under the left illustration */
  before: string;
  /** Good state label under the right illustration */
  after: string;
  /** Closing takeaway of the card */
  note: string;
  /** "soon" marks a capability that ships in a later release. */
  status?: "ready" | "soon";
  /** Badge text for the soon state, e.g. "后续实现" */
  soonLabel?: string;
}

export interface SolutionsCopy {
  seo: { title: string; description: string };
  eyebrow: string;
  hero: {
    /** Leading line of the H1 (plain ink) */
    titleA: string;
    /** The phrase carried on a yellow highlight */
    titleAccent: string;
    /** Closing line of the H1 (plain ink) */
    titleB: string;
    lead: string;
    meta: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** Labels inside the hero stealth-check mini panel */
    panelTitle: string;
    panelPassed: string;
    panelBlocked: string;
  };
  isolation: {
    kicker: string;
    title: string;
    lead: string;
    checks: {
      proxy: SolutionCheck;
      fingerprint: SolutionCheck;
      captcha: SolutionCheck;
    };
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
    geoLead: string;
    pickLabel: string;
    countriesLabel: string;
    looksLocal: string;
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
  fleet: {
    kicker: string;
    title: string;
    lead: string;
    bullets: string[];
    panelLabel: string;
  };
  evidence: {
    kicker: string;
    title: string;
    lead: string;
    bullets: string[];
    imageAlt: string;
    caption: string;
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
  closing: { title: string; desc: string; cta: string };
}

const zh: SolutionsCopy = {
  seo: {
    title: "解决方案",
    description:
      "从账号隔离、真实指纹与独立 IP，到自研 Chromium 直驱、语义树省 Token、1000+ 环境并发、AI 行动留痕与可复用 JS Script——WebCross 如何把网页自动化做成可交付的业务能力。",
  },
  eyebrow: "",
  hero: {
    titleA: "网站会",
    titleAccent: "把你的Agent当成真人",
    titleB: "而不是脚本",
    lead: "换掉一行 Playwright 代码，或从任意 RPA 工具迁移过来。WebCross 从浏览器内核层解决指纹、IP、速度与可维护性——让Agent第一次真正像人一样上网。",
    meta: "网站总是检查三样信息：你从哪里来、浏览器像不像真人、你是不是真人。我们都会处理好。",
    ctaPrimary: "免费下载 WebCross",
    ctaSecondary: "三分钟使用指南",
    panelTitle: "风控站点实际放行",
    panelPassed: "通过",
    panelBlocked: "被拦截",
  },
  isolation: {
    kicker: "",
    title: "网站总是检查三样信息，而我们都会处理好",
    lead: "从出口 IP、浏览器指纹到人机验证，任何一环露出自动化迹象，账号就会触发风控。Webcross 将会提供稳健的解决方案，保证你账号安全。",
    checks: {
      proxy: {
        title: "出口 IP",
        question: "网站看到你从哪里连接。",
        before: "数据中心 IP",
        after: "真实家庭宽带",
        note: "每个环境可设置独立住宅IP。",
        status: "ready",
      },
      fingerprint: {
        title: "浏览器指纹",
        question: "网站检查你的浏览器与设备。",
        before: "无头浏览器特征",
        after: "正常笔记本",
        note: "自研 Chromium 内核，指纹表现就是一台真人设备。",
        status: "ready",
      },
      captcha: {
        title: "人机验证",
        question: "网站问：你是不是人？",
        before: "卡住",
        after: "后续实现",
        note: "人机验证能力正在开发中，后续版本将提供自动处理与人工接管。",
        status: "soon",
        soonLabel: "后续实现",
      },
    },
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
    geoLead: "网站应当看到的是当地家庭宽带，而不是数据中心 IP。",
    pickLabel: "选择国家 / 地区",
    countriesLabel: "多个国家地区可用",
    looksLocal: "看起来像本地用户",
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
  fleet: {
    kicker: "",
    title: "1000+ 个物理隔离环境统一管理",
    lead: "每个账号拥有独立的浏览器环境：独立指纹、独立出口 IP、独立存储，互不串号。窗口集中管理，千级环境像管理一台浏览器一样简单。",
    bullets: [
      "每环境独立指纹、Cookie 与本地存储，物理隔离",
      "独立出口 IP，可绑定固定地区与网络通道",
      "统一窗口管理，批量就绪，1000+ 环境互不干扰",
    ],
    panelLabel: "窗口管理",
  },
  evidence: {
    kicker: "",
    title: "每一步都有据可查，关键步骤始终在你手里",
    lead: "页面动作按任务与时间串成完整证据链：方法、用途、状态与可审阅的输入、结果、错误摘要都在同一条链上。敏感节点自动暂停请求确认，确认后从断点继续。",
    bullets: [],
    imageAlt: "WebCross 客户端的发布新贴文页面：x.com 页面来源、动作记录列表，以及一条等待人工接管的提示。",
    caption: "WebCross 客户端 · 发布新贴文",
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
  closing: {
    title: "把下一次重复操作，交给 WebCross",
    desc: "下载客户端，接上你熟悉的 Agent，用 JS Script 把重复工作变成可复用资产。",
    cta: "免费下载 WebCross",
  },
};

const en: SolutionsCopy = {
  seo: {
    title: "Solutions",
    description:
      "Account isolation, real fingerprints and residential IPs, a Chromium fork that drives the engine directly, a semantic tree that cuts Token cost, 1000+ concurrent environments, auditable action records and reusable JS scripts — how WebCross turns web automation into deliverable business capability.",
  },
  eyebrow: "",
  hero: {
    titleA: "Websites treat ",
    titleAccent: "your Agent as a person",
    titleB: "not a script",
    lead: "Change one line of your Playwright code — or migrate straight from any RPA tool. WebCross fixes fingerprints, IPs, speed and maintainability at the browser-engine level, so your Agent finally browses like a person.",
    meta: "Sites always check three things: where you connect from, whether your browser looks human, and whether you are human. We handle all of them.",
    ctaPrimary: "Download WebCross — Free",
    ctaSecondary: "3-minute quick start",
    panelTitle: "Bot-protected sites let through",
    panelPassed: "Passed",
    panelBlocked: "Blocked",
  },
  isolation: {
    kicker: "",
    title: "Sites always check three signals — and we handle them all",
    lead: "Exit IP, browser fingerprint, human verification — one automation tell anywhere in the chain and the account trips risk control. WebCross delivers robust safeguards to keep your accounts safe.",
    checks: {
      proxy: {
        title: "Proxy",
        question: "Sites see where you connect from.",
        before: "Data center",
        after: "Real home",
        note: "Each environment can use its own residential IP.",
      },
      fingerprint: {
        title: "Fingerprint",
        question: "Sites check your browser and device.",
        before: "Headless tells",
        after: "Normal laptop",
        note: "Our own Chromium fork reads as an ordinary human device.",
      },
      captcha: {
        title: "CAPTCHA",
        question: "Sites ask: are you human?",
        before: "Stuck",
        after: "Coming soon",
        note: "CAPTCHA handling is in development and will ship automated solving plus human takeover in a later release.",
        status: "soon",
        soonLabel: "Coming soon",
      },
    },
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
    geoLead: "What sites should see is a local home connection — not a data-center IP.",
    pickLabel: "Pick a country",
    countriesLabel: "Many countries and regions available",
    looksLocal: "Looks local",
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
  fleet: {
    kicker: "",
    title: "1,000+ physically isolated environments, managed together",
    lead: "Every account owns a separate browser environment: its own fingerprint, its own residential exit IP, its own storage. Windows are managed in one place, so a thousand environments feel like one.",
    bullets: [
      "Per-environment fingerprint, cookies and local storage, physically isolated",
      "Dedicated residential exit IP with pinned region and network path",
      "Clone templates into a ready fleet; 1,000+ concurrent runs never cross",
    ],
    panelLabel: "Window management",
  },
  evidence: {
    kicker: "",
    title: "Every action leaves proof — critical steps stay yours",
    lead: "Page actions are chained by task and time: method, purpose, status, plus reviewable input, result and error summaries in one evidence chain. Sensitive checkpoints pause for a human, then resume from the breakpoint.",
    bullets: [],
    imageAlt: "The WebCross client publish-post view on x.com: page source, the action-record list, and a human-takeover prompt.",
    caption: "WebCross client · Publish post",
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
  closing: {
    title: "Hand the next repetitive task to WebCross",
    desc: "Download the client, connect the agent you already use, and turn repeated work into reusable assets with JS scripts.",
    cta: "Download WebCross — Free",
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
