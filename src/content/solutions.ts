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
    mockup: {
      workspace: string;
      windows: string;
      assistant: string;
      system: string;
      settings: string;
      guide: string;
      access: string;
      invite: string;
      disconnected: string;
      available: string;
      login: string;
      back: string;
      open: string;
      publish: string;
      pageSource: string;
      popup: string;
      sourceTab: string;
      searchTabs: string;
      closedTabs: string;
      actions: string;
      navigation: string;
      newest: string;
      oldest: string;
      updated: string;
      done: string;
      workflow: string;
      operations: string;
      details: string;
      readFields: string;
      checkPost: string;
      checkBinding: string;
    };
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
    mockup: {
      workspace: "工作区",
      windows: "窗口",
      assistant: "AI 助手",
      system: "系统",
      settings: "设置",
      guide: "指南",
      access: "接入",
      invite: "邀请",
      disconnected: "未连接",
      available: "可调用",
      login: "登录",
      back: "返回",
      open: "打开现场",
      publish: "发布新贴文",
      pageSource: "页面来源",
      popup: "弹窗打开",
      sourceTab: "来自标签页 x.com",
      searchTabs: "搜索标签页",
      closedTabs: "已关闭标签页",
      actions: "动作记录",
      navigation: "导航历史",
      newest: "最新优先",
      oldest: "最早优先",
      updated: "最新更新: 04:44 PM",
      done: "已完成",
      workflow: "工作流详情",
      operations: "18 个操作",
      details: "查看详情",
      readFields: "读取页面可见字段，确认为「发布新贴文」编辑区而不是信息流首页",
      checkPost: "确认发布按钮可用：Post 按钮已启用，无禁用遮罩或二次确认",
      checkBinding: "确认绑定页面当前状态（是否 x.com 发布页、是否有未保存草稿/弹窗）",
    },
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
    title: "Give your agent a stealth browser that works like a person",
    lead: "Get started by changing one line of Playwright code or migrating from your RPA tool. WebCross handles browser fingerprints, IP addresses, performance, and maintainability at the engine level so your agent can browse the way a person would.",
  },
  fingerprint: {
    kicker: "",
    title: "Your browser handles fingerprints",
    lead: "No extension patching. We fork Chromium and close fingerprint leaks in C++, then pair every environment with a residential IP that matches its region.",
    bullets: [
      "Own Chromium fork, leaks patched in C++",
      "Isolated residential exit IP per environment",
      "Timezone, language and region stay consistent with the IP",
    ],
    chartTitle: "Pass rates across the same bot-protected sites",
    chartBars: {
      headless: "Headless Chrome",
      homeIp: "Chrome + residential IP",
      webcross: "WebCross + residential IP",
    },
    chartNote: "Reference values from public fingerprint testing, not WebCross measurements; real pass rates depend on the site's bot policy and the task.",
    geoTitle: "Browse from any country",
    pickLabel: "Select a country or region",
    siteSeesTitle: "What the site sees",
    siteSees: {
      connection: "Connection",
      connectionValue: "Vodafone · residential broadband",
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
    title: "Run tasks directly in Chromium",
    lead: "Traditional stacks bolt a JS adapter and CDP/RPC protocol onto Chrome, paying a serialization round trip at every step. WebCross forks the Chromium kernel and embeds its execution core in the render pipeline — 3×+ faster end to end on the same task chain.",
    bullets: [
      "Commands reach the render pipeline — no injected scripts",
      "No protocol translation or RPC round trips",
      "Complex multi-step chains respond instantly, 3×+ faster end to end",
    ],
    diagramTitle: "Chromium with and without a JavaScript adapter",
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
    speedTitle: "Execution time for the same task",
    speedRows: { webcross: "WebCross", legacy: "Chrome + JS" },
    speedNote: "Relative timing illustration; actual results vary with the task chain and page state.",
  },
  semantic: {
    kicker: "",
    title: "Read pages through the accessibility tree",
    lead: "A page’s full DOM can run to hundreds of thousands of characters. Sending it all to the model adds time and cost, and much of it is irrelevant to the task. WebCross sends the accessibility tree (AXTree), which retains structure, state, and actionable elements. Omitting styles, scripts, and hidden nodes cuts page data by 85%.",
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
      title: "Accessibility tree vs. full-page DOM",
      dom: { label: "Full-page DOM", value: "412K", unit: "chars" },
      tree: { label: "Accessibility tree (AXTree)", value: "62K", unit: "chars" },
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
    mockup: {
      workspace: "Workspace",
      windows: "Windows",
      assistant: "AI assistant",
      system: "System",
      settings: "Settings",
      guide: "Guide",
      access: "Connections",
      invite: "Invite",
      disconnected: "Disconnected",
      available: "Available",
      login: "Sign in",
      back: "Back",
      open: "Open live view",
      publish: "Compose a post",
      pageSource: "Page source",
      popup: "Opened as a pop-up",
      sourceTab: "From the x.com tab",
      searchTabs: "Search tabs",
      closedTabs: "Closed tabs",
      actions: "Action log",
      navigation: "Navigation history",
      newest: "Newest first",
      oldest: "Oldest first",
      updated: "Updated at 4:44 PM",
      done: "Completed",
      workflow: "Workflow details",
      operations: "18 actions",
      details: "View details",
      readFields: "Read the visible fields and confirmed the new-post composer is open",
      checkPost: "Confirmed the Post button is enabled and no overlay or extra confirmation is blocking it",
      checkBinding: "Checked the linked page for the x.com composer, unsaved drafts, and pop-ups",
    },
    kicker: "",
    title: "Review every action and approve key steps",
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
    title: "Save browser actions as reusable JavaScript",
    lead: "Stop drawing RPA flowcharts. WebCross distils verified actions into JS scripts: they auto-activate when the matching site opens, agents can call them, and they adjust in place to the real page — so multi-step, cross-site work runs as one pipeline.",
    bullets: [],
    steps: [
      { title: "Save proven steps", text: "A successful run becomes readable JavaScript that adapts to the page structure." },
      { title: "Run automatically or call from an agent", text: "The script activates when the matching site opens. Agents such as Claude Code and Codex can also call and edit it on the spot." },
      { title: "Chain steps across pages", text: "Scripts run in the order your workflow requires, linking multiple pages into one task." },
    ],
    codeCaption: "workflows/post-to-x.workflow.js",
    codeNote: "",
  },
};

const ja: SolutionsCopy = {
  seo: {
    title: "ソリューション",
    description:
      "WebCross のブラウザー環境、Chromium エンジン、ページの読み取り、操作履歴、再利用できるスクリプトをご紹介します。",
  },
  hero: {
    title: "人のようにウェブを操作する\nエージェント用ステルスブラウザー",
    lead: "Playwright のコードを1行変えるだけで導入でき、既存の RPA ツールからも移行できます。WebCross がブラウザーエンジンでフィンガープリントと IP を管理し、処理速度と保守性を高めます。エージェントは人と同じようにページを開き、クリックや入力を行えます。",
  },
  fingerprint: {
    kicker: "",
    title: "フィンガープリントはブラウザーが管理",
    lead: "WebCross は Chromium をフォークし、C++ 層でフィンガープリントの漏えい箇所を修正します。各環境には地域に合った住宅回線の IP アドレスを割り当てます。",
    bullets: [
      "独自の Chromium フォークで、C++ 層のフィンガープリント漏えいに対処",
      "環境ごとに独立した出口 IP。住宅回線に直接接続",
      "タイムゾーン、言語、地域を IP アドレスと整合",
    ],
    chartTitle: "同じサイトでボット対策の通過率を比較",
    chartBars: {
      headless: "Headless Chrome",
      homeIp: "Chrome + 住宅回線 IP",
      webcross: "WebCross + 住宅回線 IP",
    },
    chartNote: "公開フィンガープリントテストに基づく参考値です。実際の通過率はサイトの判定基準とタスクの種類によって異なります。WebCross の実測値ではありません。",
    geoTitle: "さまざまな国からブラウジング",
    pickLabel: "国・地域を選択",
    siteSeesTitle: "サイトから見える情報",
    siteSees: {
      connection: "接続回線",
      connectionValue: "Vodafone · 家庭用ブロードバンド",
      city: "都市",
      cityValue: "ニュルンベルク",
      timezone: "タイムゾーン",
      timezoneValue: "Europe/Berlin",
      language: "言語",
      languageValue: "de-DE",
    },
  },
  engine: {
    kicker: "",
    title: "Chromium 内でタスクを直接実行",
    lead: "従来の構成では Chrome の外部に JavaScript アダプターと CDP/RPC を置くため、各ステップでシリアル化と往復通信が発生します。WebCross は Chromium をフォークし、実行処理をレンダリングパイプラインに組み込むことで、同じタスクの一連の処理を 3 倍以上高速化します。",
    bullets: [
      "指示をレンダリングパイプラインに直結し、外部スクリプトの注入を省略",
      "プロトコル変換と RPC の往復通信を削減",
      "複数ステップの処理にもすばやく応答し、全体で 3 倍以上高速化",
    ],
    diagramTitle: "Chromium での直接実行と JS アダプター経由の実行",
    direct: {
      label: "WebCross",
      sub: "Chromium フォークで直接実行",
      agent: "Agent",
      kernel: "Kernel",
      note: "同一プロセス内で直接接続 · プロトコル境界なし",
      hop: "0 hop",
    },
    shim: {
      label: "Chrome",
      sub: "+ JavaScript アダプター層",
      agent: "Agent",
      adapter: "JS Adapter",
      protocol: "CDP / RPC",
      kernel: "Kernel",
      note: "シリアル化 · IPC 往復",
    },
    speedTitle: "同じタスクにかかる時間",
    speedRows: { webcross: "WebCross", legacy: "Chrome + JS" },
    speedNote: "相対的な処理時間のイメージです。実際の結果は処理経路やページの状態によって変わります。",
  },
  semantic: {
    kicker: "",
    title: "アクセシビリティツリーで必要な情報だけを読み取る",
    lead: "ページ全体の DOM は数十万文字に及ぶことがあります。そのままモデルに渡すと時間とコストがかかり、タスクに不要な情報も大量に含まれます。WebCross は構造、状態、操作対象を残したアクセシビリティツリー（AXTree）だけを送ります。スタイル、スクリプト、非表示ノードを除き、同じページの情報量を 85% 削減します。",
    bullets: [
      "AXTree は構造、状態、操作対象を残し、描画に関する余分な情報を除きます",
      "同じページで比較すると、DOM は数百 KB、アクセシビリティツリーは数十 KB",
      "ページ更新時は変化した箇所だけを送り、読み直しを減らします",
    ],
    panelPills: ["ページの全体像", "ページの変更点", "要素の詳細"],
    overview: "ページの全体像",
    overviewCurrent: "現在のページ",
    scope: "対象範囲 · ページ全体",
    main: "メインコンテンツ",
    status: "状態 · 表示中",
    target: "操作対象",
    change: "ページの変更点",
    detail: "要素の詳細",
    changeRows: ["− 状態 · 待機中", "+ 状態 · 準備完了"],
    detailRows: [
      { key: "種類", value: "ボタン" },
      { key: "状態", value: "表示中" },
      { key: "操作", value: "クリック" },
    ],
    detailHead: "要素の詳細",
    tokenLabel: "初回の探索とツリー再利用の比較",
    tokenUnit: "トークン / 回",
    tokenNote: "記録したツリーとワークフローを再利用した場合の、おおよそのトークン使用量です。",
    compression: {
      title: "アクセシビリティツリーとページ全体の DOM を比較",
      dom: { label: "ページ全体の DOM", value: "412K", unit: "文字" },
      tree: { label: "アクセシビリティツリー（AXTree）", value: "62K", unit: "文字" },
      ratioLabel: "削減されたページ情報",
      ratioValue: "85%",
      note: "情報量は元の 15% まで減ります。クリックや入力、ページの状態判断に必要な情報は残ります。",
      diagramDom: "ページ全体の DOM",
      diagramTree: "AXTree",
      keptLabel: "保持 · 構造、状態、操作対象",
      droppedLabel: "除外 · スタイル、スクリプト、非表示ノード",
    },
  },
  evidence: {
    mockup: {
      workspace: "ワークスペース",
      windows: "ウィンドウ",
      assistant: "AI アシスタント",
      system: "システム",
      settings: "設定",
      guide: "ガイド",
      access: "接続",
      invite: "招待",
      disconnected: "未接続",
      available: "利用可能",
      login: "ログイン",
      back: "戻る",
      open: "ライブ表示を開く",
      publish: "新規投稿",
      pageSource: "ページの参照元",
      popup: "ポップアップで表示",
      sourceTab: "x.com タブから",
      searchTabs: "タブを検索",
      closedTabs: "閉じたタブ",
      actions: "操作履歴",
      navigation: "ページ遷移履歴",
      newest: "新しい順",
      oldest: "古い順",
      updated: "最終更新 16:44",
      done: "完了",
      workflow: "ワークフローの詳細",
      operations: "18 件の操作",
      details: "詳細を見る",
      readFields: "表示中の項目を読み、新規投稿の入力画面であることを確認",
      checkPost: "投稿ボタンが有効で、操作を妨げる表示や追加確認がないことを確認",
      checkBinding: "接続先が x.com の投稿画面かを確認し、未保存の下書きとポップアップを点検",
    },
    kicker: "",
    title: "すべての操作を記録し、重要な手順は自分で承認",
    lead: "ページ上の操作をタスクごとに時系列で記録します。操作メソッド、目的、状態に加え、入力、結果、エラーの概要を確認できます。慎重な判断が必要なステップで自動停止し、確認後にその場から再開します。",
    bullets: [],
    imageAlt: "WebCross クライアントの新規投稿画面。x.com のページ情報、操作履歴、ユーザーの操作を待つ通知が表示されています。",
    caption: "WebCross クライアント · 新規投稿",
    checkpoint: {
      confirm: "確認して続行", replay: "デモを再生", pending: "確認待ち", resumed: "再開済み",
      prompt: "投稿前に一時停止しました。下書きを確認してください。",
      result: "下書きの確認が完了し、一時停止したところから再開しました。",
    },
    callouts: [
      {
        title: "承認が必要な手順で一時停止",
        text: "慎重な判断が必要な場面では自動で停止し、確認を求めます。対応後はタスクの最初に戻らず、その場から続けられます。",
      },
      {
        title: "ページ遷移と操作の履歴",
        text: "ページ遷移、メソッド呼び出し、入力、結果を時系列で確認できます。",
      },
      {
        title: "ひと目でわかる進行状況",
        text: "完了、進行中、確認待ちがひと目でわかり、大切なステップは自分で判断できます。",
      },
    ],
  },
  script: {
    kicker: "",
    title: "ブラウザーの手順を JavaScript に保存して再利用",
    lead: "RPA のフローチャートを描く手間が省けます。WebCross は動作確認済みの操作を JavaScript にまとめます。対象サイトを開くと自動で起動し、エージェントから呼び出してページに合わせてその場で修正することもできます。複数ページにわたる手順を一つの流れで実行できます。",
    bullets: [],
    steps: [
      { title: "実行した手順を保存", text: "実行できた手順は読みやすい JavaScript として記録され、ページ構造に自動で適応します。" },
      { title: "サイトを開くと自動実行", text: "対象サイトを開くと自動で起動します。Claude Code や Codex などから直接呼び出し、その場で書き換えることもできます。" },
      { title: "複数ページの操作をひと続きに", text: "業務の順序に沿ってスクリプトを実行し、複数ページにわたる手順を完了します。" },
    ],
    codeCaption: "workflows/post-to-x.workflow.js",
    codeNote: "",
  },
};

const ko: SolutionsCopy = {
  seo: {
    title: "솔루션",
    description:
      "WebCross의 브라우저 환경, Chromium 엔진, 페이지 읽기, 작업 기록, 재사용 가능한 스크립트를 살펴보세요.",
  },
  hero: {
    title: "사람처럼 웹을 탐색하는\n에이전트용 스텔스 브라우저",
    lead: "Playwright 코드 한 줄을 바꿔 시작하거나 기존 RPA 도구에서 옮겨올 수 있습니다. WebCross는 핑거프린트와 IP를 브라우저 엔진에서 관리하고 작업 속도와 유지보수성도 개선합니다. 에이전트는 사람이 하듯 페이지를 열고 클릭하고 입력합니다.",
  },
  fingerprint: {
    kicker: "",
    title: "핑거프린트는 브라우저가 관리합니다",
    lead: "WebCross는 Chromium을 포크해 C++ 계층에서 핑거프린트 노출 지점을 보완합니다. 각 환경에는 해당 지역과 일치하는 가정용 회선 IP를 연결합니다.",
    bullets: [
      "자체 Chromium 포크로 C++ 계층의 핑거프린트 노출을 보완",
      "환경별 독립 출구 IP와 가정용 회선 직접 연결",
      "시간대, 언어, 지역을 IP와 일치",
    ],
    chartTitle: "같은 사이트에서 비교한 봇 탐지 통과율",
    chartBars: {
      headless: "Headless Chrome",
      homeIp: "Chrome + 가정용 회선 IP",
      webcross: "WebCross + 가정용 회선 IP",
    },
    chartNote: "공개 핑거프린트 테스트를 기준으로 한 참고값입니다. 실제 통과율은 사이트의 탐지 정책과 작업 유형에 따라 달라집니다. WebCross 자체 측정값은 아닙니다.",
    geoTitle: "여러 국가에서 웹 이용",
    pickLabel: "국가 또는 지역 선택",
    siteSeesTitle: "사이트에 표시되는 정보",
    siteSees: {
      connection: "네트워크",
      connectionValue: "Vodafone · 가정용 인터넷",
      city: "도시",
      cityValue: "뉘른베르크",
      timezone: "시간대",
      timezoneValue: "Europe/Berlin",
      language: "언어",
      languageValue: "de-DE",
    },
  },
  engine: {
    kicker: "",
    title: "Chromium 엔진에서 작업을 바로 실행",
    lead: "기존 방식은 Chrome 외부의 JavaScript 어댑터와 CDP/RPC를 거치므로 단계마다 직렬화와 왕복 통신이 발생합니다. WebCross는 Chromium을 포크해 실행 로직을 렌더링 파이프라인에 내장하고, 같은 작업의 전체 처리 속도를 3배 이상 높입니다.",
    bullets: [
      "명령이 렌더링 파이프라인으로 직접 전달되어 외부 스크립트 주입이 필요 없음",
      "프로토콜 변환과 RPC 왕복 통신 제거",
      "여러 단계의 복잡한 작업에도 즉시 응답해 전체 처리 속도를 3배 이상 향상",
    ],
    diagramTitle: "Chromium 직접 실행과 JS 어댑터를 거치는 방식",
    direct: {
      label: "WebCross",
      sub: "Chromium 포크에서 직접 실행",
      agent: "Agent",
      kernel: "Kernel",
      note: "같은 프로세스에서 직접 연결 · 프로토콜 경계 없음",
      hop: "0 hop",
    },
    shim: {
      label: "Chrome",
      sub: "+ JavaScript 어댑터 계층",
      agent: "Agent",
      adapter: "JS Adapter",
      protocol: "CDP / RPC",
      kernel: "Kernel",
      note: "직렬화 · IPC 왕복",
    },
    speedTitle: "같은 작업의 실행 시간",
    speedRows: { webcross: "WebCross", legacy: "Chrome + JS" },
    speedNote: "상대적인 실행 시간의 예시입니다. 실제 결과는 작업 경로와 페이지 상태에 따라 달라집니다.",
  },
  semantic: {
    kicker: "",
    title: "접근성 트리로 필요한 정보만 읽기",
    lead: "페이지 전체 DOM은 수십만 자에 달할 수 있습니다. 통째로 모델에 보내면 시간과 비용이 들고, 대부분은 작업과 무관합니다. WebCross는 구조, 상태, 조작 대상을 담은 접근성 트리(AXTree)만 전송해 스타일, 스크립트와 숨겨진 노드를 제외하고 페이지 정보량을 85% 줄입니다.",
    bullets: [
      "AXTree는 구조, 상태, 조작 대상만 남기고 렌더링에만 필요한 정보는 제외",
      "같은 페이지에서 전체 DOM은 수백 KB, 접근성 트리는 수십 KB",
      "페이지에서 실제로 바뀐 부분만 보내 반복 읽기를 줄임",
    ],
    panelPills: ["페이지 개요", "페이지 변경 내용", "요소 세부 정보"],
    overview: "페이지 개요",
    overviewCurrent: "현재 페이지",
    scope: "범위 · 페이지 전체",
    main: "주요 콘텐츠",
    status: "상태 · 표시됨",
    target: "조작 대상",
    change: "페이지 변경 내용",
    detail: "요소 세부 정보",
    changeRows: ["− 상태 · 대기 중", "+ 상태 · 준비 완료"],
    detailRows: [
      { key: "유형", value: "버튼" },
      { key: "상태", value: "표시됨" },
      { key: "작업", value: "클릭" },
    ],
    detailHead: "요소 세부 정보",
    tokenLabel: "처음 탐색할 때와 트리를 재사용할 때 비교",
    tokenUnit: "토큰 / 회",
    tokenNote: "기존 트리와 워크플로를 재사용할 때의 대략적인 토큰 사용량입니다.",
    compression: {
      title: "접근성 트리와 전체 페이지 DOM 비교",
      dom: { label: "전체 페이지 DOM", value: "412K", unit: "자" },
      tree: { label: "접근성 트리(AXTree)", value: "62K", unit: "자" },
      ratioLabel: "줄인 페이지 정보량",
      ratioValue: "85%",
      note: "정보량은 원래의 15%로 줄지만 클릭, 입력, 페이지 상태 판단에 필요한 정보는 남습니다.",
      diagramDom: "전체 페이지 DOM",
      diagramTree: "AXTree",
      keptLabel: "유지 · 구조, 상태, 조작 대상",
      droppedLabel: "제외 · 스타일, 스크립트, 숨겨진 노드",
    },
  },
  evidence: {
    mockup: {
      workspace: "작업 공간",
      windows: "창",
      assistant: "AI 어시스턴트",
      system: "시스템",
      settings: "설정",
      guide: "가이드",
      access: "연결",
      invite: "초대",
      disconnected: "연결 안 됨",
      available: "사용 가능",
      login: "로그인",
      back: "뒤로",
      open: "실시간 화면 열기",
      publish: "새 게시물 작성",
      pageSource: "페이지 출처",
      popup: "팝업으로 열림",
      sourceTab: "x.com 탭에서 열림",
      searchTabs: "탭 검색",
      closedTabs: "닫힌 탭",
      actions: "작업 기록",
      navigation: "페이지 이동 기록",
      newest: "최신순",
      oldest: "오래된 순",
      updated: "최근 업데이트 오후 4:44",
      done: "완료",
      workflow: "워크플로 세부 정보",
      operations: "작업 18개",
      details: "세부 정보 보기",
      readFields: "보이는 항목을 읽고 새 게시물 작성 화면임을 확인",
      checkPost: "게시 버튼이 활성화되어 있고 방해하는 오버레이나 추가 확인이 없는지 확인",
      checkBinding: "연결된 페이지가 x.com 작성 화면인지 확인하고 저장되지 않은 초안과 팝업을 점검",
    },
    kicker: "",
    title: "모든 동작을 기록하고 중요한 단계는 직접 승인",
    lead: "페이지 작업을 작업별, 시간순으로 기록합니다. 메서드, 목적, 상태는 물론 입력, 결과, 오류 요약도 확인할 수 있습니다. 민감한 단계에서는 자동으로 멈춰 확인을 요청하고, 확인하면 그 지점에서 이어갑니다.",
    bullets: [],
    imageAlt: "WebCross 클라이언트의 새 게시물 작성 화면. x.com 페이지 정보, 작업 기록과 사용자 개입 요청이 표시됩니다.",
    caption: "WebCross 클라이언트 · 새 게시물 작성",
    checkpoint: {
      confirm: "확인 후 계속", replay: "다시 재생", pending: "확인 대기 중", resumed: "재개됨",
      prompt: "게시 전에 일시 중지했습니다. 초안을 확인해 주세요.",
      result: "초안 확인이 완료되어 중단한 지점부터 작업을 재개했습니다.",
    },
    callouts: [
      {
        title: "승인이 필요할 때 일시 정지",
        text: "민감한 단계에서는 자동으로 멈춰 확인을 요청합니다. 필요한 조치를 마치면 작업을 처음부터 다시 시작하지 않고 이어갑니다.",
      },
      {
        title: "페이지 이동 및 작업 기록",
        text: "페이지 이동, 메서드 호출, 입력과 결과를 시간순으로 확인할 수 있습니다.",
      },
      {
        title: "한눈에 확인하는 진행 상태",
        text: "완료, 진행 중, 확인 대기를 한눈에 구분하고 중요한 단계는 직접 결정할 수 있습니다.",
      },
    ],
  },
  script: {
    kicker: "",
    title: "반복되는 웹 작업을 JavaScript로 저장해 재사용",
    lead: "RPA 흐름도를 만드는 수고를 덜어 보세요. WebCross는 검증된 조작을 JavaScript 스크립트로 저장합니다. 대상 사이트를 열면 자동으로 활성화되며, 에이전트가 호출해 실제 페이지에 맞게 바로 수정할 수도 있습니다. 여러 페이지에 걸친 작업을 하나의 흐름으로 실행할 수 있습니다.",
    bullets: [],
    steps: [
      { title: "검증된 절차 저장", text: "실행에 성공한 절차를 읽기 쉬운 JavaScript로 기록하고 페이지 구조에 맞춰 자동으로 조정합니다." },
      { title: "사이트를 열면 자동 실행", text: "대상 사이트를 열면 자동으로 활성화됩니다. Claude Code, Codex 등에서 직접 호출하고 그 자리에서 수정할 수도 있습니다." },
      { title: "여러 페이지의 작업을 하나로 연결", text: "업무 순서에 따라 스크립트를 차례로 실행해 여러 페이지에 걸친 작업을 완료합니다." },
    ],
    codeCaption: "workflows/post-to-x.workflow.js",
    codeNote: "",
  },
};

const copies: Record<Locale, SolutionsCopy> = { zh, en, ja, ko };

export function getSolutionsCopy(locale: Locale): SolutionsCopy {
  return copies[locale] ?? copies.zh;
}
