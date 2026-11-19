import type { Locale } from "./types";

export interface ComparisonCell {
  value: string;
  note?: string;
  tone: "good" | "mid" | "bad" | "neutral";
  mark?: "check" | "dash";
}

export type ComparisonFeature = "tokens" | "agents" | "accounts" | "fingerprint" | "parallel" | "foreground" | "code" | "local" | "setup";

export interface HomeCopy {
  navHow: string;
  common: {
    download: string;
    guide: string;
    how: string;
    replay: string;
    pause: string;
    play: string;
    next: string;
    input: string;
    action: string;
    output: string;
  };
  hero: {
    titleA: string;
    titleB: string;
  };
  workflow: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
    product: string;
    productMeta: string;
    nextProduct: string;
    fields: { label: string; value: string }[];
    platform: string;
    platformNote: string;
    workflowName: string;
    workflowFile: string;
    runLog: string[];
    result: string;
    demo: {
      history: string;
      newChat: string;
      tabs: string[];
      workspace: string;
      window: string;
      assistant: string;
      system: string;
      settings: string;
      guide: string;
      access: string;
      composer: string;
      prompts: string[];
      taskTitle: string;
      taskSteps: string[];
      research: {
        topic: string;
        sources: { name: string; url: string; detail: string }[];
        xPosts: { author: string; handle: string; time: string; text: string; stats: string[] }[];
        redditPosts: { forum: string; title: string; meta: string }[];
        threadsPosts: { author: string; handle: string; time: string; text: string; stats: string[] }[];
        summary: string;
        ideas: { title: string; tag: string }[];
        running: string;
        done: string;
      };
      authoring: {
        plan: { title: string; note: string }[];
        businessAdvice: string;
        files: string[];
      };
      reuse: {
        skill: string;
        script: string;
        requirement: string;
        enterHint: string;
        steps: string[];
        findings: { source: string; title: string; meta: string }[];
        tableTitle: string;
        tableHeaders: [string, string, string];
        exportLabel: string;
        browser: {
          topic: string;
          sources: { name: string; url: string; detail: string }[];
          xPosts: { author: string; handle: string; time: string; text: string; stats: string[] }[];
          redditPosts: { forum: string; title: string; meta: string }[];
          threadsPosts: { author: string; handle: string; time: string; text: string; stats: string[] }[];
        };
      };
      browserTitle: string;
      workflowName: string;
      generating: string;
      saved: string;
      script: string[];
      inputFile: string;
      runTitle: string;
      running: string;
      complete: string;
      resultRows: { name: string; price: string; stock: string; state: string }[];
      resultTitle: string;
      resultNote: string;
    };
  };
  /** Multi-account comparison: one pair of headline claims per lane. */
  background: {
    title: string;
    description: string;
    ordinaryTitle: string;
    ordinaryItems: string[];
    webcrossTitle: string;
    ordinaryScope: string;
    webcrossScope: string;
    comparisonRows: { ordinary: string; webcross: string }[];
    accounts: { name: string; task: string; status: string }[];
  };
  cases: {
    title: string;
    description: string;
    items: {
      tab: string;
      title: string;
      description: string;
      input: string;
      action: string;
      output: string;
      visualTitle: string;
      rows: { label: string; value: string; state: string }[];
    }[];
  };
  environment: {
    title: string;
    description: string;
    agentsTitle: string;
    agentsText: string;
    agents: string[];
    accountsTitle: string;
    accountsText: string;
    accountLabels: { login: string; session: string; network: string; fingerprint: string };
    accounts: { name: string; account: string; session: string; region: string; ip: string; fingerprint: string }[];
    localTitle: string;
    localLines: string[];
    localFlow: {
      task: string;
      taskMeta: string;
      harness: string;
      harnessMeta: string;
      gate: string;
      gateMeta: string;
      browser: string;
      browserMeta: string;
      sites: string[];
      sitesLabel: string;
    };
  };
  marketplace: {
    eyebrow: string;
    title: string;
    description: string;
    comingSoon: string;
    sidebarTitle: string;
    searchPlaceholder: string;
    creatorAction: string;
    creatorTitle: string;
    creatorText: string;
    previewNote: string;
    downloadDemo: { count: string; action: string; downloading: string; complete: string };
    footerNote: string;
    categories: {
      id: string;
      name: string;
      cards: {
        title: string;
        description: string;
        kind: "skill" | "script";
        preview: { columns: [string, string, string]; rows: [string, string, string][] };
      }[];
    }[];
  };
  comparison: {
    title: string;
    description: string;
    promo: string;
    note: string;
    columns: { name: string; meta: string }[];
    dimensions: { feature: ComparisonFeature; label: string; webcross: ComparisonCell; values: ComparisonCell[] }[];
  };
  faq: {
    title: string;
    description: string;
    items: { q: string; a: string }[];
    firstTitle: string;
    firstText: string;
    firstSteps: string[];
  };
  closing: { title: string; titleAccent: string; description: string; secondary: string };
  tech: TechCopy;
}

export interface TechCopy {
  title: string;
  description: string;
  back: string;
  architectureTitle: string;
  architecture: { title: string; text: string; items: string[] }[];
  engineTitle: string;
  engineDescription: string;
  engineLayers: { title: string; text: string }[];
  observationTitle: string;
  observationText: string;
  flowTitle: string;
  flowDescription: string;
  flow: { title: string; text: string }[];
  workflowTitle: string;
  workflowDescription: string;
  workflowStages: { title: string; text: string }[];
  recordsTitle: string;
  recordsDescription: string;
  records: string[];
  benchmarkTitle: string;
  benchmarkDescription: string;
  benchmarkHeaders: string[];
  benchmarkRows: string[][];
  benchmarkNote: string;
  dataTitle: string;
  dataDescription: string;
  data: { title: string; text: string }[];
}

const zh: HomeCopy = {
  navHow: "工作原理",
  common: { download: "免费下载 WebCross", guide: "使用指南", how: "了解技术原理", replay: "重新演示", pause: "暂停", play: "播放", next: "下一步", input: "你提供", action: "实际执行", output: "最终得到" },
  hero: {
    titleA: "把重复工作交给 WebCross，",
    titleB: "把时间还给生活",
  },
  workflow: {
    title: "完成一次任务，下次不必从零开始",
    subtitle: "让 AI 将验证后的任务封装为可复用的脚本与 Skill，告别手动编写RPA的烦恼。",
    steps: [
      { title: "AI 驱动浏览器", description: "" },
      { title: "创建并保存流程", description: "" },
      { title: "下次任务复用", description: "" },
    ],
    product: "Harbor Goods 陶瓷杯",
    productMeta: "HRB-MUG-500 · 500ml · 商品图片 6 张",
    nextProduct: "Harbor Goods 保温杯 · HRB-BOTTLE-750",
    fields: [{ label: "商品标题", value: "Harbor 500ml Ceramic Mug" }, { label: "价格", value: "$29.00" }, { label: "库存", value: "120" }, { label: "商品主图", value: "harbor-mug-01.jpg" }],
    platform: "Amazon Seller Central · 商品上架",
    platformNote: "平台反馈：已接收，处理中。前台是否可见需单独确认。",
    workflowName: "商品上架流程",
    workflowFile: "product-listing.workflow.json",
    runLog: ["读取 HRB-BOTTLE-750 新资料", "载入商品上架流程", "连续执行已验证步骤", "汇总完成项与异常项"],
    result: "新商品已复用同一流程；具体节省取决于任务与复用次数。",
    demo: {
      history: "历史", newChat: "新建会话", tabs: ["会话", "任务", "自动化"], workspace: "工作区", window: "窗口", assistant: "AI 助手", system: "系统", settings: "设置", guide: "指南", access: "接入",
      composer: "描述你的任务，Agent 将接管浏览器并实时汇报进度",
      prompts: [
        "帮我浏览 X、Reddit 和 Threads 上关于 AI Agent 与一人公司的近期内容，总结趋势，并给我三个下周自媒体选题。",
        "基于刚才的任务，把浏览、采集、总结和生成选题的步骤整理成可复用工作流；给出业务建议，编写 JS 脚本，并在 WebCross 真实环境中测试，通过后保存 Skill。",
        "复用刚保存的 Skill，把主题换成 2026 年 Black Friday 提前优惠。汇总 X、Reddit 和 Threads 的结果，整理成表。",
      ],
      taskTitle: "社媒趋势与选题研究",
      taskSteps: ["浏览 X 热门讨论", "读取 Reddit 高赞帖", "浏览 Threads 创作者动态", "生成趋势与选题建议"],
      research: {
        topic: "AI Agent × 一人公司",
        sources: [
          { name: "X", url: "x.com/explore", detail: "24 条高互动帖" },
          { name: "Reddit", url: "reddit.com/r/AI_Agents", detail: "12 个热门讨论" },
          { name: "Threads", url: "threads.net/explore", detail: "9 条创作者动态" },
        ],
        xPosts: [
          { author: "林子安", handle: "@linzian", time: "12 分钟", text: "用 WebCross 抓了 200 条竞品评论，总结出三个高频痛点，写报告只花了 10 分钟。", stats: ["32", "9", "128"] },
          { author: "Mira", handle: "@miralab", time: "27 分钟", text: "做 Amazon 调研，从前要两个实习生复制一整天；换成 WebCross 后，30 分钟搞定。", stats: ["47", "21", "412"] },
          { author: "运营阿凯", handle: "@yikeops", time: "1 小时", text: "多平台统一抓取，互动数据自动导出，周报再也不用手拼。", stats: ["18", "14", "256"] },
        ],
        redditPosts: [
          { forum: "r/AI_Agents", title: "What workflows are you actually running as a solo founder?", meta: "128 评论 · 2.4k 赞" },
          { forum: "r/SideProject", title: "I automated my content research with an agent — here's the stack", meta: "86 评论 · 1.1k 赞" },
          { forum: "r/automation", title: "Human-like browser automation without APIs?", meta: "54 评论 · 870 赞" },
        ],
        threadsPosts: [
          { author: "Mia Chen", handle: "@miachen", time: "18 分钟", text: "一个人做内容，最值得自动化的是「找选题」和「整理评论」，不是发文本身。", stats: ["34", "11", "96"] },
          { author: "Noah", handle: "@noahbuilds", time: "42 分钟", text: "Built a research agent that reads X, Reddit and Threads, then gives me a weekly content brief.", stats: ["21", "6", "74"] },
          { author: "小柯", handle: "@keke", time: "1 小时", text: "把重复的浏览器工作交给 Agent 后，终于有时间做真正需要判断的部分。", stats: ["18", "4", "61"] },
        ],
        summary: "AI Agent 的讨论正从「能不能做」转向「能不能稳定交付」。单人创作者最关心：可复用工作流、低操作成本、真实收益案例。",
        ideas: [
          { title: "一个人运营 3 个账号，我如何用 Agent 每周省出 20 小时", tag: "效率" },
          { title: "不写代码，也能搭一个自己的内容研究 Agent", tag: "教程" },
          { title: "我让 AI 分析了 100 条爆款，发现这 3 类选题最容易收藏", tag: "数据" },
        ],
        running: "正在浏览并总结社媒内容",
        done: "研究完成 · 已生成 3 个选题",
      },
      authoring: {
        plan: [
          { title: "启动隔离浏览器", note: "为本次任务创建独立会话" },
          { title: "编写 JS 脚本代码", note: "把浏览、采集与总结写成可复用脚本" },
          { title: "真实环境调试", note: "在 WebCross 中复用浏览器画面逐项验证" },
          { title: "交付可复用 SKILL", note: "保存 research.js 与 skill.md" },
        ],
        businessAdvice: "业务建议：把「时间对比 + 可复制步骤」放进选题标题，更容易获得收藏与评论。",
        files: ["social-research.workflow.ts", "research.js", "skill.md"],
      },
      reuse: {
        skill: "social-topic-research",
        script: "research.js",
        requirement: "复用刚保存的 Skill，把主题换成 2026 年 Black Friday 提前优惠。汇总 X、Reddit 和 Threads 的结果，整理成表。",
        enterHint: "按 Enter 开始任务",
        steps: ["载入 Skill 与脚本", "搜索 x · reddit · threads", "汇总提前优惠信息", "导出折扣信息表"],
        findings: [
          { source: "X", title: "Black Friday 2026 预热：AI 工具年付折扣最高 50%", meta: "18 条相关帖子 · 6 个有效折扣码" },
          { source: "Reddit", title: "r/BlackFriday 提前优惠汇总与历史低价比对", meta: "42 条讨论 · 12 个已验证来源" },
          { source: "Threads", title: "创作者设备提前促销：麦克风、相机与订阅工具", meta: "9 条创作者动态 · 4 个限时活动" },
        ],
        tableTitle: "抓取的提前优惠",
        tableHeaders: ["来源", "优惠信息", "验证状态"],
        exportLabel: "已导出折扣表",
        browser: {
          topic: "Black Friday 2026 · 提前优惠",
          sources: [
            { name: "X", url: "x.com/search?q=black+friday+2026", detail: "18 条折扣帖" },
            { name: "Reddit", url: "reddit.com/r/BlackFriday", detail: "42 条讨论" },
            { name: "Threads", url: "threads.net/search?q=black+friday", detail: "9 条创作者动态" },
          ],
          xPosts: [
            { author: "DealWatch", handle: "@dealwatch", time: "8 分钟", text: "Black Friday 2026 early deals are live: AI tools are discounting annual plans up to 50% this week.", stats: ["24", "18", "216"] },
            { author: "Mika", handle: "@mikafinds", time: "21 分钟", text: "Creator gear提前开跑：麦克风、补光灯和相机订阅都有 30% 左右折扣，链接放在回复里。", stats: ["31", "12", "184"] },
            { author: "SaaS Bites", handle: "@saasbites", time: "46 分钟", text: "Tracking every early Black Friday 2026 SaaS deal in one thread. Reply with what you find.", stats: ["16", "9", "132"] },
          ],
          redditPosts: [
            { forum: "r/BlackFriday", title: "2026 Early Black Friday Deals Megathread — verified list, updated hourly", meta: "312 评论 · 5.8k 赞" },
            { forum: "r/Frugal", title: "Which early Black Friday offers are actually better than last year?", meta: "128 评论 · 2.1k 赞" },
            { forum: "r/VideoEditing", title: "Creator gear discounts worth waiting for on Black Friday?", meta: "86 评论 · 1.4k 赞" },
          ],
          threadsPosts: [
            { author: "Maya", handle: "@mayacreates", time: "14 分钟", text: "Tracking Black Friday 2026 early discounts for creator tools. Most useful so far: annual AI plans and storage.", stats: ["42", "17", "208"] },
            { author: "Devin", handle: "@devbuilds", time: "39 分钟", text: "The early Black Friday deals are genuinely good this year. I am collecting the verified ones in a thread.", stats: ["27", "8", "116"] },
            { author: "小柯", handle: "@keke", time: "1 小时", text: "今年提前折扣比正日更值得看，尤其是订阅类和创作设备。", stats: ["19", "5", "84"] },
          ],
        },
      },
      browserTitle: "社媒趋势研究 · 本周",
      workflowName: "社媒选题研究工作流", generating: "AI 正在整理工作流", saved: "Skill 已保存 · 可复用",
      script: [
        'import { WebCross } from "@webcross/sdk";',
        'const browser = await WebCross.open();',
        'const sources = ["x.com", "reddit.com", "threads.net"];',
        'const posts = await browser.collect(sources, {',
        '  topic: "AI Agent × 一人公司",',
        '  limit: 60,',
        '});',
        'const digest = await browser.summarize(posts);',
        'await browser.export(digest, "weekly-ideas.md");',
        'export const skill = browser.toSkill("social-topic-research");',
      ],
      inputFile: "social-topic-research", runTitle: "自动化 / 新任务", running: "正在搜索并汇总优惠信息", complete: "任务完成 · 报告已保存",
      resultRows: [],
      resultTitle: "black-friday-2026-early-deals.md", resultNote: "已汇总 X、Reddit 和 Threads 的优惠线索",
    },
  },
  background: {
    title: "一台设备安全管理100+账号",
    description: "WebCross AI Agent 可以调用各账号已有的独立环境，沿用对应的指纹、代理和登录状态，不用来回切换登录，省时省力。",
    ordinaryTitle: "AI Agent + 普通浏览器",
    ordinaryItems: ["使用当前浏览器的页面和状态", "任务围绕当前账号进行", "切换账号时需要重新确认状态", "返回当前任务结果"],
    webcrossTitle: "WebCross AI Agent",
    ordinaryScope: "当前会话 · 单账号",
    webcrossScope: "独立环境 · 多账号",
    comparisonRows: [
      { ordinary: "只能使用当前会话的浏览器环境", webcross: "调用每个账号已有的独立环境" },
      { ordinary: "换号时需手动切换配置、确认登录", webcross: "沿用指纹、代理和登录状态" },
      { ordinary: "多个账号的任务需逐个委派", webcross: "按账号批量委派任务" },
      { ordinary: "只能查看当前账号的进度和结果", webcross: "分别记录每个账号的进度和结果" },
    ],
    accounts: [{ name: "美国店铺 · 账号 A", task: "检查活动价格与库存", status: "执行中" }, { name: "英国店铺 · 账号 B", task: "复核优惠券状态", status: "已完成" }, { name: "社媒账号 · 账号 C", task: "整理帖子与评论", status: "等待调度" }],
  },
  cases: {
    title: "从你每天打开浏览器做的工作开始",
    description: "不只展示快速点击。每个场景都看清输入是什么、实际做了什么、最后得到什么。",
    items: [
      { tab: "商品上架", title: "从商品资料，到平台上架反馈", description: "让 AI 填写商品字段、上传图片并记录平台反馈；常用步骤可保存给下一款商品复用。", input: "商品资料、图片、卖家账号、目标站点", action: "填写标题与规格、上传图片、提交并读取反馈", output: "提交记录、平台状态和待处理项", visualTitle: "Amazon Seller Central · 提交记录", rows: [{ label: "商品字段", value: "标题 / 规格 / 图片", state: "已填写" }, { label: "平台反馈", value: "已接收 · 处理中", state: "待审核" }, { label: "前台可见", value: "单独打开商品页确认", state: "待确认" }] },
      { tab: "活动巡检与优惠券", title: "活动上线后，及时发现价格与库存差异", description: "跨平台核对同一 SKU，按你授权的方案设置优惠券，再重新检查变更结果。", input: "SKU 映射、活动价格、库存口径、优惠券规则", action: "逐店核对、按授权设置优惠券、保留变更记录", output: "差异清单、优惠券变更记录和复核状态", visualTitle: "活动巡检 · 差异与复核", rows: [{ label: "店铺 A", value: "$29 · 库存 12 · 优惠券生效", state: "一致" }, { label: "店铺 B", value: "$32 · 库存 8 · 优惠券排期", state: "有差异" }, { label: "下一步", value: "按授权方案调整并复核", state: "待处理" }] },
      { tab: "竞品帖子及评论分析", title: "看见竞品发了什么，也看见评论在问什么", description: "收集指定时间范围内的帖子与可访问评论，归纳主题、问题和内容机会，并附来源。", input: "竞品账号、时间范围、语言和分析问题", action: "读取帖子与实际可见评论、整理来源、归纳主题", output: "来源表、讨论主题、内容建议与覆盖范围", visualTitle: "竞品分析 · 最近 7 天", rows: [{ label: "最新帖子", value: "原帖链接与发布日期", state: "已归档" }, { label: "评论问题", value: "实际可见的评论样本", state: "已整理" }, { label: "内容建议", value: "关联观察，注明样本范围", state: "可溯源" }] },
    ],
  },
  environment: {
    title: "你的 Agent、账号与 IP 环境，分别管理",
    description: "沿用熟悉的工作方式，让每个账号拥有独立会话、地区 IP 与浏览器指纹。",
    agentsTitle: "接入熟悉的 Agent",
    agentsText: "通过适配的 Skill、CLI 或 MCP 控制浏览器。也可以选择使用 WebCross AI 协助你的工作。",
    agents: ["Claude Code", "Codex", "WebCross AI", "Skill / CLI / MCP"],
    accountsTitle: "多个账号，独立会话",
    accountsText: "店铺 A 与店铺 B 各自使用独立 IP 和浏览器指纹，账号之间互不串用。",
    accountLabels: { login: "已登录账号", session: "当前会话", network: "代理出口", fingerprint: "浏览器指纹" },
    accounts: [
      { name: "店铺 A", account: "店铺 A · ops•••@brand.com", session: "实例 A", region: "美国 · 住宅代理", ip: "34.212.•••.128", fingerprint: "Chrome 143 · macOS 15" },
      { name: "店铺 B", account: "店铺 B · uk•••@brand.com", session: "实例 B", region: "英国 · 住宅代理", ip: "51.140.•••.42", fingerprint: "Chrome 143 · Windows 11" },
    ],
    localTitle: "数据本地存放，你的数据你做主",
    localLines: [
      "浏览器会话只保存在你的电脑",
      "每次读取页面或操作浏览器，都需要你授权",
    ],
    localFlow: {
      task: "用户任务",
      taskMeta: "一句话指令",
      harness: "Harness",
      harnessMeta: "WebCross 执行层",
      gate: "需要你授权",
      gateMeta: "确认后才继续",
      browser: "Chromium",
      browserMeta: "本地浏览器",
      sites: ["shop.example", "tickets.example", "socialmedia.example"],
      sitesLabel: "目标站点",
    },
  },
  marketplace: {
    eyebrow: "COMING SOON · SKILL MARKET",
    title: "Skill 开放市场",
    description: "可复用的 Skill，覆盖 100+ 站点场景\n跑通过一次的任务，下一次直接调用",
    comingSoon: "敬请期待",
    sidebarTitle: "站点分类",
    searchPlaceholder: "搜索 Skill、脚本或站点",
    creatorAction: "提交你的 Skill / 脚本",
    creatorTitle: "成为首批 Skill 创作者",
    creatorText: "市场开放后，你可以在这里发布 Skill，让下一次任务直接复用",
    downloadDemo: { count: "已选 {count} 项", action: "下载到本地", downloading: "正在下载", complete: "下载演示完成 · {count} 项" },
    previewNote: "个预览",
    footerNote: "首批 Skill 与脚本正在整理中，开放时间以官方通知为准",
    categories: [
      { id: "amazon", name: "Amazon", cards: [
        {
          title: "商品价格与库存巡检", description: "批量读取商品页价格、库存与促销状态，输出带时间戳的差异表", kind: "script",
          preview: { columns: ["商品", "当前价", "变化"], rows: [["帆布托特包", "$24.00", "−$4.00"], ["随行杯", "$18.50", "持平"], ["桌面灯", "$39.00", "+$2.00"]] },
        },
        {
          title: "竞品评论差评归因", description: "整理公开可见差评，归纳产品缺陷、物流与客服问题", kind: "skill",
          preview: { columns: ["问题", "样本数", "代表性反馈"], rows: [["包装破损", "8 / 36", "杯盖在运输中开裂"]] },
        },
        {
          title: "Listing 全流程上架", description: "从商品资料到标题、规格、图片与平台反馈，完整记录上架过程", kind: "skill",
          preview: { columns: ["商品", "提交状态", "平台反馈"], rows: [["陶瓷杯 · 蓝", "待补充", "缺少容量规格"]] },
        },
        {
          title: "促销活动一致性核验", description: "核对活动价、优惠券和前台展示，标记异常并保留来源", kind: "script",
          preview: { columns: ["项目", "活动价", "页面显示"], rows: [["随行杯优惠券", "$15.00", "$18.50 · 待核对"]] },
        },
      ] },
      { id: "tiktok-shop", name: "TikTok Shop", cards: [
        {
          title: "商品与价格采集", description: "读取目标店铺商品、价格与活动信息，生成可对比清单", kind: "skill",
          preview: { columns: ["商品", "当前价", "变化"], rows: [["折叠支架", "¥39.00", "−¥10.00"], ["收纳袋", "¥29.90", "持平"], ["桌面灯", "¥89.00", "+¥5.00"]] },
        },
        {
          title: "上传带货视频", description: "上传本地带货视频并关联商品，记录发布状态与平台反馈", kind: "script",
          preview: { columns: ["视频", "关联商品", "上传结果"], rows: [["折叠支架开箱", "桌面支架", "草稿已保存"]] },
        },
        {
          title: "评论与售后问题归因", description: "汇总公开评论与售后关键词，识别高频问题与产品机会", kind: "skill",
          preview: { columns: ["问题", "频次", "建议"], rows: [["尺码偏小", "9 条", "补充尺码对照表"]] },
        },
        {
          title: "店铺状态巡检", description: "定时检查商品上架、库存和活动状态，记录异常并输出报告", kind: "script",
          preview: { columns: ["项目", "状态", "待办"], rows: [["桌面灯库存", "剩余 3 件", "复核补货"]] },
        },
      ] },
      { id: "airbnb", name: "Airbnb", cards: [
        {
          title: "房源价格与可订日历", description: "采集公开房源价格、可订日期和基础信息，导出为表格", kind: "script",
          preview: { columns: ["房源", "每晚价格", "可订日期"], rows: [["河畔一居室", "$135", "12月2日至5日"]] },
        },
        {
          title: "竞品房源对比", description: "对比同区域房源价格、评分与设施，生成可复用的竞品观察", kind: "skill",
          preview: { columns: ["房源", "房型", "价格差"], rows: [["花园公寓", "两居室", "低于同区中位数 $12"]] },
        },
        {
          title: "区域搜索页采集", description: "按地区与日期读取搜索结果，保留房源链接与关键字段", kind: "skill",
          preview: { columns: ["区域", "匹配房源", "筛选条件"], rows: [["北岸", "18 套", "整套 · 可做饭"]] },
        },
        {
          title: "评论与设施抽取", description: "整理公开评论中的设施反馈与体验问题，输出结构化摘要", kind: "script",
          preview: { columns: ["关注点", "提及次数", "房客反馈"], rows: [["自助入住", "11 次", "深夜到达也方便"]] },
        },
      ] },
      { id: "youtube", name: "YouTube", cards: [
        {
          title: "频道更新与视频筛选", description: "跟踪频道新视频，按发布时间与主题筛选值得关注的条目", kind: "script",
          preview: { columns: ["视频", "主题", "发布时间"], rows: [["我的一周工作流", "效率工具", "11月17日"]] },
        },
        {
          title: "字幕与摘要导出", description: "读取公开字幕或转写结果，生成摘要与来源链接", kind: "skill",
          preview: { columns: ["时间点", "字幕内容", "摘要"], rows: [["02:18", "打开任务历史", "从上次运行恢复"]] },
        },
        {
          title: "评论观点聚类", description: "整理高相关评论，归纳观众观点、争议与内容机会", kind: "skill",
          preview: { columns: ["观点", "评论数", "代表问题"], rows: [["安装配置", "16 条", "首次连接要多久？"]] },
        },
        {
          title: "竞品选题分析", description: "收集竞品近期视频表现与标题模式，输出选题参考", kind: "script",
          preview: { columns: ["选题", "视频数", "观察"], rows: [["一人团队的周报", "4 条", "实操演示互动较高"]] },
        },
      ] },
      { id: "reddit", name: "Reddit", cards: [
        {
          title: "子版块主题追踪", description: "按关键词和版块筛选帖子，保留热度、时间与链接", kind: "script",
          preview: { columns: ["版块", "主题", "互动"], rows: [["r/SideProject", "每周研究流程", "32 条回复"]] },
        },
        {
          title: "高赞评论与争议点", description: "读取公开评论，提炼高赞观点、反方意见和讨论焦点", kind: "skill",
          preview: { columns: ["讨论点", "支持观点", "反方观点"], rows: [["自动周报", "整理更快", "来源需复核"]] },
        },
        {
          title: "品牌与产品提及监控", description: "跟踪品牌词与产品名提及，整理情绪和问题类型", kind: "skill",
          preview: { columns: ["提及", "情绪", "原因"], rows: [["模板导入", "正向", "省去重复配置"]] },
        },
        {
          title: "帖子与评论来源导出", description: "将帖子、评论与 permalink 导出为可复核的来源表", kind: "script",
          preview: { columns: ["来源", "内容类型", "摘要"], rows: [["r/productivity", "回复", "按主题归档资料"]] },
        },
      ] },
      { id: "x", name: "X", cards: [
        {
          title: "关键词与话题追踪", description: "监控关键词、话题和账号动态，按时间整理相关帖子", kind: "script",
          preview: { columns: ["关键词", "匹配帖子", "趋势"], rows: [["独立开发", "24 条", "较上周 +6"]] },
        },
        {
          title: "帖子与评论采集", description: "读取公开帖子与可见回复，提炼观点和传播线索", kind: "skill",
          preview: { columns: ["帖子", "可见回复", "讨论点"], rows: [["展示工作流", "19 条", "如何复用步骤"]] },
        },
        {
          title: "趋势与情绪摘要", description: "汇总热门话题与情绪变化，保留代表性帖子作为依据", kind: "script",
          preview: { columns: ["话题", "倾向", "代表观点"], rows: [["本地自动化", "正向", "可复查过程"]] },
        },
        {
          title: "竞品账号动态观察", description: "整理竞品近期发布、互动与内容方向，形成观察笔记", kind: "skill",
          preview: { columns: ["账号", "更新", "内容方向"], rows: [["Studio North", "3 条", "公开产品演示"]] },
        },
      ] },
      { id: "whatsapp", name: "WhatsApp", cards: [
        {
          title: "群消息整理与待办", description: "把群内待办、时间点和负责人整理成清晰清单", kind: "skill",
          preview: { columns: ["事项", "负责人", "时间"], rows: [["核对发货清单", "Mia", "周五"]] },
        },
        {
          title: "客户问题归类", description: "按主题归类客户消息，识别高频问题并输出处理建议", kind: "script",
          preview: { columns: ["主题", "消息数", "处理建议"], rows: [["配送时效", "12 条", "补充预计到达时间"]] },
        },
        {
          title: "会话摘要与跟进", description: "提炼会话结论、未完成事项和下一步跟进动作", kind: "skill",
          preview: { columns: ["会话", "结论", "跟进"], rows: [["春季样品", "颜色已确认", "周三发样"]] },
        },
        {
          title: "消息批量导出", description: "在授权范围内导出可检索的消息记录", kind: "script",
          preview: { columns: ["会话", "记录数", "导出格式"], rows: [["项目小组", "28 条", "CSV"]] },
        },
      ] },
      { id: "facebook", name: "Facebook", cards: [
        {
          title: "主页内容与互动采集", description: "收集公开主页帖子、互动数据与发布时间", kind: "script",
          preview: { columns: ["帖子", "互动", "发布时间"], rows: [["新品试用记录", "38 次", "11月16日"]] },
        },
        {
          title: "广告素材观察", description: "整理公开广告素材与落地页线索，保留来源", kind: "skill",
          preview: { columns: ["素材", "落地页", "观察"], rows: [["桌灯短片", "桌灯详情页", "首屏突出亮度调节"]] },
        },
        {
          title: "群组讨论主题", description: "归纳公开群组讨论的热门问题与用户需求", kind: "skill",
          preview: { columns: ["主题", "讨论数", "常见需求"], rows: [["家庭办公", "8 条", "小桌面布置"]] },
        },
        {
          title: "评论线索整理", description: "提取公开评论中的购买意向、问题与联系方式线索", kind: "script",
          preview: { columns: ["评论", "需求", "下一步"], rows: [["请问有白色款吗？", "颜色咨询", "回复库存信息"]] },
        },
      ] },
      { id: "instagram", name: "Instagram", cards: [
        {
          title: "账号主页数据采集", description: "采集公开主页资料、帖子与互动数据", kind: "script",
          preview: { columns: ["账号", "帖子数", "可见互动"], rows: [["Studio North", "12 条", "426 次"]] },
        },
        {
          title: "帖子与评论分析", description: "提炼内容主题、评论反馈与可借鉴的表达", kind: "skill",
          preview: { columns: ["内容", "反馈主题", "建议"], rows: [["新品演示", "尺寸咨询", "加入尺寸对照"]] },
        },
        {
          title: "竞品内容选题", description: "对比竞品近期选题与互动表现，输出内容机会", kind: "skill",
          preview: { columns: ["选题", "近期样本", "观察"], rows: [["小空间收纳", "6 条", "改造前后对比"]] },
        },
        {
          title: "达人合作线索", description: "按领域和互动质量筛选公开达人账号，整理合作线索", kind: "script",
          preview: { columns: ["账号", "领域", "互动率"], rows: [["North Studio", "家居", "3.8%"]] },
        },
      ] },
      { id: "linkedin", name: "LinkedIn", cards: [
        {
          title: "职位列表采集", description: "按关键词和地点收集公开职位，保留发布时间与链接", kind: "script",
          preview: { columns: ["职位", "地点", "发布日期"], rows: [["产品设计师", "上海", "11月15日"]] },
        },
        {
          title: "自动投递岗位申请", description: "按你的条件筛选职位并自动填写申请，提交前保留确认", kind: "skill",
          preview: { columns: ["职位", "材料", "状态"], rows: [["产品设计师", "简历、作品集", "等待确认提交"]] },
        },
        {
          title: "行业内容监测", description: "跟踪行业账号与话题，汇总值得关注的观点", kind: "skill",
          preview: { columns: ["话题", "来源", "观察"], rows: [["本地工作流", "3 篇文章", "关注可审计性"]] },
        },
        {
          title: "招聘流程自动跟进", description: "整理候选人状态与待办，按节点提醒下一步动作", kind: "script",
          preview: { columns: ["候选编号", "当前阶段", "下一步"], rows: [["C-012", "作品集已收", "安排评审"]] },
        },
      ] },
      { id: "zillow", name: "Zillow", cards: [
        {
          title: "房源列表与价格采集", description: "读取公开房源价格、面积、卧室数和链接，导出表格", kind: "script",
          preview: { columns: ["房源", "挂牌价", "面积"], rows: [["North Ave 12", "$485,000", "1,250 ft²"]] },
        },
        {
          title: "区域市场对比", description: "对比同区域房源的挂牌价与特征，生成市场观察", kind: "skill",
          preview: { columns: ["区域", "中位挂牌价", "样本"], rows: [["北区", "$465,000", "12 套"]] },
        },
        {
          title: "房源详情抽取", description: "抓取指定房源的设施、税费与历史价格信息", kind: "skill",
          preview: { columns: ["房源", "卧室", "设施"], rows: [["Lake St 8", "3 间", "车库、露台"]] },
        },
        {
          title: "租金与历史价格追踪", description: "定期记录租金与挂牌价变化，保留时间序列", kind: "script",
          preview: { columns: ["房源", "本月租金", "变化"], rows: [["Park Ave 22", "$1,950", "−$50"]] },
        },
      ] },
      { id: "google-bing-serp", name: "Google & Bing SERP", cards: [
        {
          title: "搜索结果与排名采集", description: "读取公开搜索结果页，记录排名、标题与链接", kind: "script",
          preview: { columns: ["关键词", "位置", "页面"], rows: [["桌面收纳", "第 3 位", "收纳指南"]] },
        },
        {
          title: "品牌词曝光监控", description: "跟踪品牌词在搜索中的曝光与结果变化", kind: "skill",
          preview: { columns: ["品牌词", "结果页", "曝光位置"], rows: [["North Studio", "官网首页", "第 1 位"]] },
        },
        {
          title: "竞品广告位观察", description: "记录公开广告位与落地页线索，保留查询条件", kind: "script",
          preview: { columns: ["查询", "广告位置", "落地页"], rows: [["折叠支架", "页首", "支架系列"]] },
        },
        {
          title: "长尾关键词拓展", description: "从搜索结果与相关词中整理长尾关键词机会", kind: "skill",
          preview: { columns: ["种子词", "相关词", "意图"], rows: [["桌面灯", "小户型桌面灯", "选购"]] },
        },
      ] },
    ],
  },
  comparison: {
    title: "哪种浏览器方案适合你？",
    description: "别再为选择使用哪个 Agentic Browser 而反复挑选",
    promo: "使用 WebCross 能够帮助你快速完成日常重复性工作，立即使用就是赚到。",
    note: "本表为方案类型层面的方向性对比，具体能力取决于产品版本、配置和接入方式；Token 与耗时未按同条件实测。",
    columns: [
      { name: "浏览器扩展", meta: "Claude / Codex in Chrome" },
      { name: "内置浏览器", meta: "Claude / ChatGPT built-in" },
      { name: "云浏览器", meta: "Browserbase / Browser Use" },
      { name: "Browser CLI", meta: "playwright / chrome devtools mcp" },
      { name: "RPA", meta: "UiPath" },
    ],
    dimensions: [
      {
        feature: "tokens",
        label: "Token 消耗",
        webcross: { value: "中低", note: "Agent 直驱比一般的云浏览器更省；复用 JS Skill 后极低", tone: "good" },
        values: [
          { value: "高", note: "每步都要重读页面", tone: "bad" },
          { value: "高", note: "依赖平台上下文计费", tone: "bad" },
          { value: "中", note: "按任务和 Agent 计费", tone: "mid" },
          { value: "高", note: "上下文需自行控制，通常偏高", tone: "bad" },
          { value: "无", note: "不调用大模型", tone: "neutral" },
        ],
      },
      {
        feature: "agents",
        label: "适配不同 AI Agent",
        webcross: { value: "高", note: "Skill / CLI / MCP 可接多类 Agent", tone: "good" },
        values: [
          { value: "低", note: "通常绑定所属扩展", tone: "bad" },
          { value: "低", note: "仅平台 AI", tone: "bad" },
          { value: "高", note: "SDK / API 可接多类 Agent", tone: "good" },
          { value: "高", note: "可按 Agent 或 MCP 接入", tone: "good" },
          { value: "中", note: "取决于厂商是否适配", tone: "mid" },
        ],
      },
      {
        feature: "accounts",
        label: "多账号登录",
        webcross: { value: "支持", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "fingerprint",
        label: "指纹与独立代理 IP",
        webcross: { value: "支持", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
        ],
      },
      {
        feature: "parallel",
        label: "多任务并发",
        webcross: { value: "支持", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "foreground",
        label: "不影响电脑前台工作",
        webcross: { value: "支持", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "code",
        label: "可复用的 JS Skill",
        webcross: { value: "支持", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "dash", tone: "bad" },
        ],
      },
      {
        feature: "local",
        label: "数据保存本地",
        webcross: { value: "支持", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "setup",
        label: "配置与学习门槛",
        webcross: { value: "低", note: "自然语言即可，零配置", tone: "good" },
        values: [
          { value: "低", note: "安装即用，但依赖宿主 Agent", tone: "good" },
          { value: "低", note: "开箱即用，访问网站受平台限制", tone: "good" },
          { value: "中", note: "需要 API Key 与 SDK 开发", tone: "mid" },
          { value: "高", note: "需装 CLI、写脚本或配 MCP", tone: "bad" },
          { value: "高", note: "需搭建流程与调试", tone: "bad" },
        ],
      },
    ],
  },
  faq: {
    title: "FAQ",
    description: "",
    items: [
      { q: "什么是 WebCross？", a: "WebCross 是一款面向网页自动化的智能体浏览器。基于fork Chromium 内核，让 Agent 用自然语言接收任务，替您完成商品价格巡检、批量表单填报、跨平台内容采集与互动。任务全程后台执行，账号使用与任务过程保持清晰可控。" },
      { q: "和 Playwright、Puppeteer 有什么不同？", a: "Playwright / Puppeteer 是嵌入代码的自动化库，依赖选择器驱动页面，网站改版脚本就可能失效，每一步都要手写。WebCross 用fork Chromium 内核直驱，指令直达渲染流程；用自然语言下达任务即可执行，无需编写脚本。" },
      { q: "和 Browser Use、Claude for Chrome 等方案有什么不同？", a: "多数同类方案在 Chrome 上再加一层扩展或适配层，每一步都有往返开销。WebCross 提供隔离的账号会话、可审计的执行记录、敏感节点人工接管，以及指纹与出口 IP 的独立配置，多账号并发互不串号。" },
      { q: "多个账号同时运营，会被平台关联吗？", a: "每个账号可使用独立浏览器指纹与独立出口 IP，IP 池可随时切换，会话彼此隔离。指纹模板支持复制与批量应用，多店铺、多账号可以并行运行。" },
      { q: "支持哪些平台？如何收费？", a: "支持 macOS 13+ 与 Windows 10 / 11+。公测阶段全功能免费：下载安装后按系统提示开启权限，在控制面板输入第一条自然语言任务即可。" },
      { q: "什么是指纹浏览器？WebCross 算吗？", a: "指纹浏览器指让每个账号拥有独立、可配置的浏览器指纹：出口 IP、时区、语言、设备特征都尽量自然且互不关联，网站更愿意把访问当作真实用户。WebCross 在每个实例里独立配置指纹与出口 IP，用接近真人的键鼠方式操作页面。它不做破解，也不承诺绕过平台规则。" },
    ],
    firstTitle: "第一次任务，从一张商品清单开始",
    firstText: "不需要先搭复杂系统。选一个今天就要完成的任务，看清过程和结果，再决定哪些步骤值得复用。",
    firstSteps: ["下载并启动 WebCross", "连接你熟悉的 Agent", "输入商品清单和检查要求", "查看结果，保存可复用步骤"],
  },
  closing: { title: "把重复工作交给 WebCross，", titleAccent: "把时间还给生活", description: "下载 WebCross，立即体验。", secondary: "三分钟使用指南" },
  tech: {
    title: "WebCross 如何工作",
    description: "这里保留给技术评估者的内容：Agent、浏览器与流程执行各自负责什么，数据如何流动，以及性能应该如何测量。首页只讲任务与结果。",
    back: "返回产品首页",
    architectureTitle: "职责分层，不把所有能力都叫 AI。",
    architecture: [
      { title: "Agent / 创建工具", text: "理解任务、做出判断；通过支持的创建工具编写、调试和保存流程。", items: ["任务拆解与决策", "结果分析与异常判断", "流程创建体验按工具区分"] },
      { title: "WebCross", text: "提供完整浏览器控制、独立实例、页面观测与已保存流程的执行。", items: ["页面读取与浏览器操作", "后台实例与人工接手", "Workflow 执行与运行记录"] },
      { title: "目标网站与平台", text: "返回页面状态、业务反馈与验证要求；最终结果以平台实际响应为准。", items: ["登录状态与页面反馈", "提交处理与审核状态", "验证码和权限要求"] },
    ],
    engineTitle: "fork Chromium 内核与页面理解，放在执行层。",
    engineDescription: "WebCross 在浏览器执行层提供页面观测与操作能力，减少外部适配环节。这里描述架构职责，不用缺少同条件实测的毫秒数或速度倍数证明优势。",
    engineLayers: [{ title: "Agent 指令", text: "点击、输入、读取或流程步骤" }, { title: "WebCross 执行层", text: "页面观测、目标定位、动作执行与状态记录" }, { title: "浏览器页面", text: "渲染结果、控件状态和平台反馈" }],
    observationTitle: "一次观测，保留页面范围与控件状态。",
    observationText: "页面全景用于理解可见内容、控件与关系；页面变化清晰标出，需要时再展开元素详情。可定位不等于可操作，可见性与状态分别呈现。",
    flowTitle: "一次任务的数据路径",
    flowDescription: "任务指令由 Agent 理解；WebCross 操作本地浏览器；必要的页面信息可能发送给你选择的模型服务。具体字段与传输范围以实际接入和当前版本为准。",
    flow: [{ title: "你的指令与资料", text: "商品清单、目标网站、账号实例和任务要求" }, { title: "Agent 理解与规划", text: "选择页面动作，必要时请求人工处理" }, { title: "WebCross 执行", text: "读取页面、操作浏览器或连续执行流程" }, { title: "平台响应与结果", text: "保存平台反馈、完成项和异常项" }],
    workflowTitle: "创建与复用，分开衡量。",
    workflowDescription: "第一次探索页面和创建流程，与后续执行已保存流程，是两种不同成本。复用减少重复探索，但不承诺固定的 Token 或时间百分比。",
    workflowStages: [{ title: "创建阶段", text: "页面探索、步骤编写、调试验证、保存流程包。记录完整模型轮次与人工投入。" }, { title: "执行阶段", text: "读取新输入，由 WebCross 连续执行固定步骤，在需要判断时交给 Agent。" }, { title: "结果阶段", text: "保留完成项、异常项、平台反馈和运行记录，不用“运行成功”替代业务结果。" }],
    recordsTitle: "运行记录应该能回答什么？",
    recordsDescription: "记录用于审阅与回溯，而不是装饰性的日志动画。",
    records: ["哪个实例、账号和页面执行了任务", "执行了什么动作，输入与结果摘要是什么", "平台返回了处理中、成功还是异常", "人工在哪里介入，任务如何继续", "本次是创建流程还是复用流程"],
    benchmarkTitle: "性能口径：先保留原始记录，再谈提升。",
    benchmarkDescription: "以下为评测表结构示意，不是实测结果。正式数据应来自同任务、同账号条件和明确版本的可复核记录。",
    benchmarkHeaders: ["指标", "创建 / 首次执行", "复用执行", "必须同时记录"],
    benchmarkRows: [["端到端任务耗时", "待实测", "待实测", "起止点、机器、网络与页面状态"], ["模型 Token", "待实测", "待实测", "输入、输出、缓存读取、缓存写入"], ["模型调用轮次", "待实测", "待实测", "Agent、模型与流程版本"], ["任务结果", "待实测", "待实测", "平台反馈、完成项、异常项"], ["人工介入", "待实测", "待实测", "介入原因、次数与等待时间"]],
    benchmarkNote: "单次页面操作延迟不等于完整任务耗时；旧页面中的速度倍数和 Token 百分比不应在缺少原始运行记录时沿用。",
    dataTitle: "数据边界，按服务分别说明。",
    dataDescription: "本地浏览器、模型服务与可能存在的 WebCross 服务不能混为一句“数据不出本地”。",
    data: [{ title: "本地浏览器", text: "账号会话与浏览器存储保存在本机。独立实例用于隔离不同账号和任务。" }, { title: "你选择的 Agent / 模型", text: "云端 AI 可能接收任务所需页面信息。具体范围取决于连接方式、工具调用与模型服务商。" }, { title: "代理与目标平台", text: "网络出口由配置的代理决定；提交内容、登录与业务结果由目标平台处理。" }],
  },
};

const en: HomeCopy = {
  navHow: "How it works",
  common: { download: "Download WebCross", guide: "User Guide", how: "Explore the technology", replay: "Replay demo", pause: "Pause", play: "Play", next: "Next", input: "You provide", action: "What happens", output: "You receive" },
  hero: {
    titleA: "Give repetitive work to WebCross.",
    titleB: "Give time back to life.",
  },
  workflow: {
    title: "Finish the task once, don't start over next time",
    subtitle: "Let AI turn validated work into reusable scripts and Skills—no more hand-written RPA.",
    steps: [{ title: "AI drives the browser", description: "" }, { title: "Create and save the workflow", description: "" }, { title: "Reuse it next time", description: "" }],
    product: "Harbor Goods ceramic mug",
    productMeta: "HRB-MUG-500 · 500ml · 6 product images",
    nextProduct: "Harbor Goods bottle · HRB-BOTTLE-750",
    fields: [{ label: "Product title", value: "Harbor 500ml Ceramic Mug" }, { label: "Price", value: "$29.00" }, { label: "Stock", value: "120" }, { label: "Main image", value: "harbor-mug-01.jpg" }],
    platform: "Amazon Seller Central · product listing",
    platformNote: "Platform response: accepted, processing. Storefront visibility needs a separate check.",
    workflowName: "Product-listing workflow",
    workflowFile: "product-listing.workflow.json",
    runLog: ["Read new HRB-BOTTLE-750 brief", "Load product-listing workflow", "Run validated steps continuously", "Summarize outcomes and exceptions"],
    result: "The new product reused the same workflow. Savings depend on the task and reuse count.",
    demo: {
      history: "History", newChat: "New chat", tabs: ["Chat", "Tasks", "Automation"], workspace: "Workspace", window: "Windows", assistant: "AI assistant", system: "System", settings: "Settings", guide: "Guide", access: "Connections",
      composer: "Describe a task. Your agent takes over the browser and reports progress live.",
      prompts: [
        "Browse recent discussions about AI agents and solo businesses on X, Reddit and Threads, summarize the trends, and give me three topic ideas for next week.",
        "Turn the browsing, collection, research and topic-generation steps into a reusable workflow. Add business guidance, write the JS script, test it in the real WebCross environment, then save the Skill.",
        "Reuse the saved Skill with a new topic: early Black Friday 2026 deals. Put the findings from X, Reddit and Threads in a table.",
      ],
      taskTitle: "Social trend and topic research",
      taskSteps: ["Browse trending posts on X", "Read top Reddit threads", "Browse Threads creator posts", "Summarize trends and topics"],
      research: {
        topic: "AI agents × solo business",
        sources: [
          { name: "X", url: "x.com/explore", detail: "24 high-engagement posts" },
          { name: "Reddit", url: "reddit.com/r/AI_Agents", detail: "12 active discussions" },
          { name: "Threads", url: "threads.net/explore", detail: "9 creator posts" },
        ],
        xPosts: [
          { author: "Lin Zian", handle: "@linzian", time: "12m", text: "I used WebCross to collect 200 competitor comments and extracted three recurring pain points. The report took 10 minutes.", stats: ["32", "9", "128"] },
          { author: "Mira", handle: "@miralab", time: "27m", text: "Amazon research used to take two interns a full day. With WebCross, the first pass is done in 30 minutes.", stats: ["47", "21", "412"] },
          { author: "Kai", handle: "@yikeops", time: "1h", text: "One collection run across three platforms. Engagement data exported to a sheet automatically.", stats: ["18", "14", "256"] },
        ],
        redditPosts: [
          { forum: "r/AI_Agents", title: "What workflows are you actually running as a solo founder?", meta: "128 comments · 2.4k upvotes" },
          { forum: "r/SideProject", title: "I automated my content research with an agent — here's the stack", meta: "86 comments · 1.1k upvotes" },
          { forum: "r/automation", title: "Human-like browser automation without APIs?", meta: "54 comments · 870 upvotes" },
        ],
        threadsPosts: [
          { author: "Mia Chen", handle: "@miachen", time: "18m", text: "The best thing to automate in a solo content business is research and comment triage—not publishing itself.", stats: ["34", "11", "96"] },
          { author: "Noah", handle: "@noahbuilds", time: "42m", text: "Built a research agent that reads X, Reddit and Threads, then gives me a weekly content brief.", stats: ["21", "6", "74"] },
          { author: "Keke", handle: "@keke", time: "1h", text: "After handing repeated browser work to an agent, I finally have time for the parts that need judgment.", stats: ["18", "4", "61"] },
        ],
        summary: "The conversation is moving from whether agents can work to whether they can deliver reliably. Solo creators care most about reusable workflows, low operating cost and real revenue stories.",
        ideas: [
          { title: "Running three accounts solo: how an agent gives me 20 hours back every week", tag: "Efficiency" },
          { title: "Build a content research agent without writing code", tag: "Tutorial" },
          { title: "I analyzed 100 breakout posts—these three topic patterns get saved most", tag: "Data" },
        ],
        running: "Browsing and summarizing social conversations",
        done: "Research complete · 3 topic directions",
      },
      authoring: {
        plan: [
          { title: "Launch isolated browser", note: "Create a fresh session for this task" },
          { title: "Write the JS script", note: "Turn browsing, collection and summary into a reusable script" },
          { title: "Debug in the real environment", note: "Reuse the live browser view to validate every step" },
          { title: "Deliver a reusable SKILL", note: "Save research.js and skill.md" },
        ],
        businessAdvice: "Business note: lead with a before/after time comparison and repeatable steps—these topics earn more saves and comments.",
        files: ["social-research.workflow.ts", "research.js", "skill.md"],
      },
      reuse: {
        skill: "social-topic-research",
        script: "research.js",
        requirement: "Reuse the saved Skill with a new topic: early Black Friday 2026 deals. Put the findings from X, Reddit and Threads in a table.",
        enterHint: "Press Enter to start",
        steps: ["Load the Skill and script", "Search x · reddit · threads", "Summarize early deal information", "Export the discount report"],
        findings: [
          { source: "X", title: "Black Friday 2026 early deals: AI tools discount annual plans by up to 50%", meta: "18 posts · 6 verified codes" },
          { source: "Reddit", title: "r/BlackFriday early deal megathread with price-history checks", meta: "42 discussions · 12 verified sources" },
          { source: "Threads", title: "Creator gear early sale: microphones, cameras and subscriptions", meta: "9 creator posts · 4 limited offers" },
        ],
        tableTitle: "Collected early deals",
        tableHeaders: ["Source", "Offer", "Verification"],
        exportLabel: "Deal table exported",
        browser: {
          topic: "Black Friday 2026 · early deals",
          sources: [
            { name: "X", url: "x.com/search?q=black+friday+2026", detail: "18 deal posts" },
            { name: "Reddit", url: "reddit.com/r/BlackFriday", detail: "42 discussions" },
            { name: "Threads", url: "threads.net/search?q=black+friday", detail: "9 creator posts" },
          ],
          xPosts: [
            { author: "DealWatch", handle: "@dealwatch", time: "8m", text: "Black Friday 2026 early deals are live: AI tools are discounting annual plans up to 50% this week.", stats: ["24", "18", "216"] },
            { author: "Mika", handle: "@mikafinds", time: "21m", text: "Creator gear is early this year—microphones, lights and camera subscriptions are around 30% off.", stats: ["31", "12", "184"] },
            { author: "SaaS Bites", handle: "@saasbites", time: "46m", text: "Tracking every early Black Friday 2026 SaaS deal in one thread. Reply with what you find.", stats: ["16", "9", "132"] },
          ],
          redditPosts: [
            { forum: "r/BlackFriday", title: "2026 Early Black Friday Deals Megathread — verified list, updated hourly", meta: "312 comments · 5.8k upvotes" },
            { forum: "r/Frugal", title: "Which early Black Friday offers are actually better than last year?", meta: "128 comments · 2.1k upvotes" },
            { forum: "r/VideoEditing", title: "Creator gear discounts worth waiting for on Black Friday?", meta: "86 comments · 1.4k upvotes" },
          ],
          threadsPosts: [
            { author: "Maya", handle: "@mayacreates", time: "14m", text: "Tracking Black Friday 2026 early discounts for creator tools. Most useful so far: annual AI plans and storage.", stats: ["42", "17", "208"] },
            { author: "Devin", handle: "@devbuilds", time: "39m", text: "The early Black Friday deals are genuinely good this year. I am collecting the verified ones in a thread.", stats: ["27", "8", "116"] },
            { author: "Keke", handle: "@keke", time: "1h", text: "Early deals look stronger than the day-of offers this year, especially for subscriptions and creator gear.", stats: ["19", "5", "84"] },
          ],
        },
      },
      browserTitle: "Social trend research · this week",
      workflowName: "Social Topic Research", generating: "Building the workflow", saved: "Skill saved · reusable",
      script: [
        'import { WebCross } from "@webcross/sdk";',
        'const browser = await WebCross.open();',
        'const sources = ["x.com", "reddit.com", "threads.net"];',
        'const posts = await browser.collect(sources, {',
        '  topic: "AI agents × solo business",',
        '  limit: 60,',
        '});',
        'const digest = await browser.summarize(posts);',
        'await browser.export(digest, "weekly-ideas.md");',
        'export const skill = browser.toSkill("social-topic-research");',
      ],
      inputFile: "social-topic-research", runTitle: "Automation / New task", running: "Searching and summarizing deals", complete: "Complete · report saved",
      resultRows: [],
      resultTitle: "black-friday-2026-early-deals.md", resultNote: "Findings from X, Reddit and Threads",
    },
  },
  background: {
    title: "Multi-account tasks without repeated switching and sign-ins",
    description: "The AI Agent calls each account's existing isolated environment, keeps that account's fingerprint, proxy and login state, runs tasks by account or group, and returns progress and results separately.",
    ordinaryTitle: "AI Agent + a standard browser",
    ordinaryItems: ["Uses the current browser page and state", "Tasks revolve around the current account", "Switching accounts means re-confirming state", "Returns the current task's result"],
    webcrossTitle: "WebCross AI Agent",
    ordinaryScope: "Current session · Single account",
    webcrossScope: "Isolated environments · Multiple accounts",
    comparisonRows: [
      { ordinary: "Limited to the current browser session", webcross: "Calls each account's existing isolated environment" },
      { ordinary: "Switch settings and check sign-in manually", webcross: "Keeps each account's fingerprint, proxy and login state" },
      { ordinary: "Assign tasks one account at a time", webcross: "Assigns tasks to multiple accounts at once" },
      { ordinary: "See progress and results for the current account only", webcross: "Records progress and results for every account" },
    ],
    accounts: [{ name: "US store · Account A", task: "Check campaign prices and stock", status: "Running" }, { name: "UK store · Account B", task: "Verify coupon status", status: "Complete" }, { name: "Social · Account C", task: "Organize posts and comments", status: "Queued" }],
  },
  cases: {
    title: "Start with the work you already do in a browser",
    description: "More than a rapid-click montage: see the inputs, the actual work and the outcome in each scenario.",
    items: [
      { tab: "Product listing", title: "From product brief to platform response", description: "Let AI fill product fields, upload images and record the platform response. Save recurring steps for the next product.", input: "Product brief, images, seller account and marketplace", action: "Fill title and specifications, upload images, submit and read the response", output: "Submission record, platform status and open issues", visualTitle: "Amazon Seller Central · submission record", rows: [{ label: "Product fields", value: "Title / specifications / images", state: "Filled" }, { label: "Platform response", value: "Accepted · processing", state: "In review" }, { label: "Storefront visibility", value: "Open product page to verify", state: "To check" }] },
      { tab: "Campaigns & coupons", title: "Spot price and stock differences after launch", description: "Check the same SKU across platforms, apply authorized coupon settings and verify the changes.", input: "SKU mapping, campaign prices, stock definitions and coupon rules", action: "Check each store, apply authorized coupons and retain change records", output: "Exceptions, coupon change records and recheck status", visualTitle: "Campaign check · differences and recheck", rows: [{ label: "Store A", value: "$29 · 12 in stock · coupon active", state: "Match" }, { label: "Store B", value: "$32 · 8 in stock · coupon scheduled", state: "Differs" }, { label: "Next", value: "Apply authorized changes and recheck", state: "To review" }] },
      { tab: "Posts & comments", title: "See what competitors post—and what people ask", description: "Collect posts and accessible comments within a specified time range. Identify themes, questions and content opportunities with sources.", input: "Competitor accounts, date range, language and research question", action: "Read posts and visible comments, organize sources and group themes", output: "Source table, discussion themes, ideas and coverage limits", visualTitle: "Competitor analysis · last 7 days · sample scope", rows: [{ label: "Recent posts", value: "Original URLs and publication dates", state: "Archived" }, { label: "Comment questions", value: "Actually visible comment samples", state: "Organized" }, { label: "Content ideas", value: "Linked observations and sample scope", state: "Traceable" }] },
    ],
  },
  environment: {
    title: "Your agents, accounts and IP environments—managed separately",
    description: "Keep your way of working while giving every account its own session, regional IP and browser fingerprint.",
    agentsTitle: "Bring an agent you know", agentsText: "Control the browser through a compatible Skill, CLI or MCP. You can also use WebCross AI to assist with the work.", agents: ["Claude Code", "Codex", "WebCross AI", "Skill / CLI / MCP"],
    accountsTitle: "Multiple accounts, isolated sessions", accountsText: "Store A and Store B use separate IPs and browser fingerprints. Nothing is shared between them.",
    accountLabels: { login: "Signed in as", session: "Session", network: "Proxy", fingerprint: "Browser fingerprint" },
    accounts: [
      { name: "Store A", account: "Store A · ops•••@brand.com", session: "Instance A", region: "US · residential proxy", ip: "34.212.•••.128", fingerprint: "Chrome 143 · macOS 15" },
      { name: "Store B", account: "Store B · uk•••@brand.com", session: "Instance B", region: "UK · residential proxy", ip: "51.140.•••.42", fingerprint: "Chrome 143 · Windows 11" },
    ],
    localTitle: "Your data stays local—you stay in control",
    localLines: [
      "Browser sessions stay on your computer",
      "Every page read or browser action needs your approval",
    ],
    localFlow: {
      task: "User task",
      taskMeta: "One-sentence brief",
      harness: "Harness",
      harnessMeta: "WebCross runtime",
      gate: "Your approval",
      gateMeta: "Required to continue",
      browser: "Chromium",
      browserMeta: "Your local browser",
      sites: ["shop.example", "tickets.example", "socialmedia.example"],
      sitesLabel: "Target sites",
    },
  },
  marketplace: {
    eyebrow: "COMING SOON · SKILL MARKET",
    title: "Open Skill Marketplace",
    description: "Reusable Skills for 100+ site scenarios\nRun a task once, then call it again whenever you need it",
    comingSoon: "Coming soon",
    sidebarTitle: "Site categories",
    searchPlaceholder: "Search Skills, scripts or sites",
    creatorAction: "Submit your Skill / script",
    creatorTitle: "Become an early Skill creator",
    creatorText: "When the market opens, publish your Skills here so the next task can reuse them",
    downloadDemo: { count: "Selected: {count}", action: "Download locally", downloading: "Downloading", complete: "Download demo complete · {count}" },
    previewNote: "previews",
    footerNote: "The first Skills and scripts are being prepared. Launch timing will be announced officially",
    categories: [
      { id: "amazon", name: "Amazon", cards: [
        {
          title: "Price and stock check", description: "Read product prices, stock and promotions in batches, then export a timestamped difference table", kind: "script",
          preview: { columns: ["Product", "Current price", "Change"], rows: [["Canvas tote", "$24.00", "−$4.00"], ["Travel cup", "$18.50", "No change"], ["Desk lamp", "$39.00", "+$2.00"]] },
        },
        {
          title: "Competitor review triage", description: "Collect publicly visible negative reviews and group product, shipping and support issues", kind: "skill",
          preview: { columns: ["Issue", "Reviews", "Example"], rows: [["Damaged packaging", "8 of 36", "Lid cracked in transit"]] },
        },
        {
          title: "End-to-end listing", description: "Turn product inputs into titles, specs, images and a recorded platform response", kind: "skill",
          preview: { columns: ["Product", "Status", "Feedback"], rows: [["Blue mug", "Needs details", "Capacity missing"]] },
        },
        {
          title: "Campaign consistency audit", description: "Compare campaign prices, coupons and storefront display, then flag exceptions with sources", kind: "script",
          preview: { columns: ["Item", "Offer price", "Displayed"], rows: [["Travel cup coupon", "$15.00", "$18.50 · review"]] },
        },
      ] },
      { id: "tiktok-shop", name: "TikTok Shop", cards: [
        {
          title: "Product and price collection", description: "Read store products, prices and campaign details, then build a comparable list", kind: "skill",
          preview: { columns: ["Product", "Current price", "Change"], rows: [["Folding stand", "¥39.00", "−¥10.00"], ["Organizer pouch", "¥29.90", "No change"], ["Desk lamp", "¥89.00", "+¥5.00"]] },
        },
        {
          title: "Upload shoppable video", description: "Upload a local shoppable video, attach products and record the platform response", kind: "script",
          preview: { columns: ["Video", "Product", "Upload"], rows: [["Stand unboxing", "Folding stand", "Draft saved"]] },
        },
        {
          title: "Review and support triage", description: "Group public comments and support keywords into recurring issues and product opportunities", kind: "skill",
          preview: { columns: ["Issue", "Mentions", "Action"], rows: [["Runs small", "9", "Add size chart"]] },
        },
        {
          title: "Shop status monitor", description: "Check listing, inventory and campaign status, then log exceptions in a report", kind: "script",
          preview: { columns: ["Item", "Status", "Action"], rows: [["Lamp stock", "3 left", "Review restock"]] },
        },
      ] },
      { id: "airbnb", name: "Airbnb", cards: [
        {
          title: "Price and availability", description: "Collect public listing prices, available dates and core details into a table", kind: "script",
          preview: { columns: ["Listing", "Nightly rate", "Available"], rows: [["Riverside flat", "$135", "Dec 2–5"]] },
        },
        {
          title: "Competitor listing compare", description: "Compare local listings by price, rating and amenities for reusable market notes", kind: "skill",
          preview: { columns: ["Listing", "Type", "Difference"], rows: [["Garden flat", "2 bedrooms", "$12 below local median"]] },
        },
        {
          title: "Regional search collection", description: "Read search results by area and date while retaining listing links and key fields", kind: "skill",
          preview: { columns: ["Area", "Matches", "Filters"], rows: [["North Shore", "18 listings", "Entire home · kitchen"]] },
        },
        {
          title: "Review and amenity extract", description: "Turn public review feedback into structured amenity and experience summaries", kind: "script",
          preview: { columns: ["Topic", "Mentions", "Guest feedback"], rows: [["Self check-in", "11", "Easy late arrival"]] },
        },
      ] },
      { id: "youtube", name: "YouTube", cards: [
        {
          title: "Channel update screening", description: "Follow new uploads and shortlist videos by publish time and topic", kind: "script",
          preview: { columns: ["Video", "Topic", "Published"], rows: [["My weekly workflow", "Productivity", "Nov 17"]] },
        },
        {
          title: "Transcript and summary export", description: "Read public captions or transcripts, then produce summaries with source links", kind: "skill",
          preview: { columns: ["Timestamp", "Transcript", "Summary"], rows: [["02:18", "Open task history", "Resume a previous run"]] },
        },
        {
          title: "Comment theme clustering", description: "Organize relevant comments into audience views, disputes and content opportunities", kind: "skill",
          preview: { columns: ["Topic", "Comments", "Question"], rows: [["Setup", "16", "How long to connect?"]] },
        },
        {
          title: "Competitor topic analysis", description: "Collect recent competitor performance and title patterns for topic planning", kind: "script",
          preview: { columns: ["Topic", "Videos", "Finding"], rows: [["Solo team reports", "4", "Demos drew more replies"]] },
        },
      ] },
      { id: "reddit", name: "Reddit", cards: [
        {
          title: "Subreddit topic tracking", description: "Filter posts by keyword and community while keeping score, time and links", kind: "script",
          preview: { columns: ["Community", "Topic", "Activity"], rows: [["r/SideProject", "Weekly research", "32 replies"]] },
        },
        {
          title: "Top comments and disputes", description: "Read public comments and extract top viewpoints, counterpoints and discussion focus", kind: "skill",
          preview: { columns: ["Topic", "In favor", "Concern"], rows: [["Weekly reports", "Less sorting", "Sources need review"]] },
        },
        {
          title: "Brand mention monitor", description: "Track brand and product mentions, then group sentiment and issue types", kind: "skill",
          preview: { columns: ["Mention", "Sentiment", "Reason"], rows: [["Template import", "Positive", "Less setup"]] },
        },
        {
          title: "Post and comment export", description: "Export posts, comments and permalinks into a reviewable source table", kind: "script",
          preview: { columns: ["Source", "Type", "Summary"], rows: [["r/productivity", "Reply", "Archive by topic"]] },
        },
      ] },
      { id: "x", name: "X", cards: [
        {
          title: "Keyword and topic tracking", description: "Monitor keywords, topics and accounts, then organize posts over time", kind: "script",
          preview: { columns: ["Keyword", "Posts", "Trend"], rows: [["Indie building", "24", "Up 6 this week"]] },
        },
        {
          title: "Post and reply collection", description: "Read public posts and visible replies to extract viewpoints and propagation clues", kind: "skill",
          preview: { columns: ["Post", "Replies", "Topic"], rows: [["Workflow demo", "19", "Reusing steps"]] },
        },
        {
          title: "Trend and sentiment digest", description: "Summarize trending topics and sentiment shifts with representative posts as evidence", kind: "script",
          preview: { columns: ["Topic", "Sentiment", "Example"], rows: [["Local automation", "Positive", "Reviewable history"]] },
        },
        {
          title: "Competitor account watch", description: "Organize competitor posts, engagement and content direction into observation notes", kind: "skill",
          preview: { columns: ["Account", "Updates", "Focus"], rows: [["Studio North", "3", "Public demos"]] },
        },
      ] },
      { id: "whatsapp", name: "WhatsApp", cards: [
        {
          title: "Group message to-dos", description: "Turn group to-dos, deadlines and owners into a clean action list", kind: "skill",
          preview: { columns: ["Task", "Owner", "Due"], rows: [["Check shipment list", "Mia", "Friday"]] },
        },
        {
          title: "Customer issue grouping", description: "Group customer messages by topic, identify recurring issues and suggest next steps", kind: "script",
          preview: { columns: ["Topic", "Messages", "Action"], rows: [["Delivery timing", "12", "Add arrival estimate"]] },
        },
        {
          title: "Conversation summary", description: "Extract conclusions, unfinished items and follow-up actions from a conversation", kind: "skill",
          preview: { columns: ["Conversation", "Decision", "Follow-up"], rows: [["Spring samples", "Color approved", "Ship on Wednesday"]] },
        },
        {
          title: "Authorized message export", description: "Export messages within an approved scope into searchable records", kind: "script",
          preview: { columns: ["Chat", "Records", "Export"], rows: [["Project group", "28", "CSV"]] },
        },
      ] },
      { id: "facebook", name: "Facebook", cards: [
        {
          title: "Page content and engagement", description: "Collect public page posts, engagement and publish times", kind: "script",
          preview: { columns: ["Post", "Interactions", "Published"], rows: [["Product trial", "38", "Nov 16"]] },
        },
        {
          title: "Ad creative watch", description: "Organize public ad creatives and landing-page clues with source references", kind: "skill",
          preview: { columns: ["Creative", "Destination", "Observation"], rows: [["Desk lamp video", "Lamp detail page", "Starts with dimmer demo"]] },
        },
        {
          title: "Group discussion themes", description: "Summarize popular questions and needs from public group discussions", kind: "skill",
          preview: { columns: ["Topic", "Discussions", "Need"], rows: [["Home office", "8", "Small desk layouts"]] },
        },
        {
          title: "Comment lead extraction", description: "Extract purchase intent, questions and contact clues from public comments", kind: "script",
          preview: { columns: ["Comment", "Intent", "Follow-up"], rows: [["Available in white?", "Color options", "Reply with stock"]] },
        },
      ] },
      { id: "instagram", name: "Instagram", cards: [
        {
          title: "Profile data collection", description: "Collect public profile details, posts and engagement data", kind: "script",
          preview: { columns: ["Account", "Posts", "Interactions"], rows: [["Studio North", "12", "426"]] },
        },
        {
          title: "Post and comment analysis", description: "Extract content themes, audience feedback and reusable wording patterns", kind: "skill",
          preview: { columns: ["Content", "Feedback", "Action"], rows: [["Product demo", "Size questions", "Add dimensions"]] },
        },
        {
          title: "Competitor content planning", description: "Compare recent competitor topics and engagement to surface content opportunities", kind: "skill",
          preview: { columns: ["Topic", "Samples", "Finding"], rows: [["Small spaces", "6", "Before-and-after views"]] },
        },
        {
          title: "Creator partnership leads", description: "Filter public creator accounts by niche and engagement quality into a lead list", kind: "script",
          preview: { columns: ["Creator", "Category", "Engagement"], rows: [["North Studio", "Home", "3.8%"]] },
        },
      ] },
      { id: "linkedin", name: "LinkedIn", cards: [
        {
          title: "Job listing collection", description: "Collect public roles by keyword and location with dates and links", kind: "script",
          preview: { columns: ["Role", "Location", "Posted"], rows: [["Product designer", "Shanghai", "Nov 15"]] },
        },
        {
          title: "Auto-submit job applications", description: "Filter roles and fill applications from your profile, pausing before each submission", kind: "skill",
          preview: { columns: ["Role", "Documents", "Status"], rows: [["Product designer", "CV and portfolio", "Awaiting confirmation"]] },
        },
        {
          title: "Industry content monitor", description: "Follow industry accounts and topics to collect viewpoints worth reviewing", kind: "skill",
          preview: { columns: ["Topic", "Sources", "Finding"], rows: [["Local workflows", "3 articles", "Interest in audit trails"]] },
        },
        {
          title: "Recruiting follow-up", description: "Track candidate status and reminders by stage", kind: "script",
          preview: { columns: ["Candidate", "Stage", "Next step"], rows: [["C-012", "Portfolio received", "Schedule review"]] },
        },
      ] },
      { id: "zillow", name: "Zillow", cards: [
        {
          title: "Listing and price collection", description: "Read public prices, area, bedroom count and links, then export a table", kind: "script",
          preview: { columns: ["Listing", "Asking price", "Area"], rows: [["12 North Ave", "$485,000", "1,250 ft²"]] },
        },
        {
          title: "Regional market compare", description: "Compare asking prices and features across an area for a market snapshot", kind: "skill",
          preview: { columns: ["Area", "Median price", "Sample"], rows: [["North district", "$465,000", "12 listings"]] },
        },
        {
          title: "Listing detail extraction", description: "Extract amenities, taxes and price history from selected listings", kind: "skill",
          preview: { columns: ["Listing", "Bedrooms", "Amenities"], rows: [["8 Lake St", "3", "Garage, patio"]] },
        },
        {
          title: "Rent and price tracking", description: "Record rent and asking-price changes over time as a time series", kind: "script",
          preview: { columns: ["Listing", "Monthly rent", "Change"], rows: [["22 Park Ave", "$1,950", "−$50"]] },
        },
      ] },
      { id: "google-bing-serp", name: "Google & Bing SERP", cards: [
        {
          title: "Search ranking collection", description: "Read public search result pages and record rank, title and link", kind: "script",
          preview: { columns: ["Query", "Rank", "Page"], rows: [["Desk storage", "3", "Storage guide"]] },
        },
        {
          title: "Brand visibility monitor", description: "Track brand results and visibility changes across searches", kind: "skill",
          preview: { columns: ["Brand query", "Result", "Rank"], rows: [["North Studio", "Homepage", "1"]] },
        },
        {
          title: "Competitor ad position watch", description: "Record public ad positions and landing-page clues with the query used", kind: "script",
          preview: { columns: ["Query", "Ad position", "Destination"], rows: [["Folding stand", "Top of page", "Stand collection"]] },
        },
        {
          title: "Long-tail keyword ideas", description: "Organize long-tail opportunities from search results and related queries", kind: "skill",
          preview: { columns: ["Seed", "Related query", "Intent"], rows: [["Desk lamp", "Desk lamps for small spaces", "Shopping"]] },
        },
      ] },
    ],
  },
  comparison: {
    title: "Which browser setup fits you?", description: "Stop second-guessing which Agentic Browser to use",
    promo: "WebCross helps you finish everyday repetitive work quickly. Start now and get ahead.",
    note: "This is a directional comparison at the category level. Actual capability depends on product version, configuration and integration; token and timing figures are not benchmarked under identical conditions.",
    columns: [
      { name: "Browser extensions", meta: "Claude / Codex in Chrome" },
      { name: "Built-in browsers", meta: "Claude / ChatGPT built-in" },
      { name: "Cloud browsers", meta: "Browserbase / Browser Use" },
      { name: "Browser CLIs", meta: "playwright / chrome devtools mcp" },
      { name: "RPA", meta: "UiPath" },
    ],
    dimensions: [
      {
        feature: "tokens",
        label: "Token usage",
        webcross: { value: "Low–Mid", note: "Agent drive costs less than an unoptimized cloud browser; near zero after reusing a JS Skill", tone: "good" },
        values: [
          { value: "High", note: "Re-reads the page at every step", tone: "bad" },
          { value: "High", note: "Billed through platform context", tone: "bad" },
          { value: "Mid", note: "Billed per task and agent", tone: "mid" },
          { value: "High", note: "You control context; usually high", tone: "bad" },
          { value: "None", note: "No model calls", tone: "neutral" },
        ],
      },
      {
        feature: "agents",
        label: "Works with different AI agents",
        webcross: { value: "High", note: "Skill / CLI / MCP for many agents", tone: "good" },
        values: [
          { value: "Low", note: "Usually tied to one extension", tone: "bad" },
          { value: "Low", note: "Only the platform AI", tone: "bad" },          { value: "High", note: "SDK / API works with many agents", tone: "good" },
          { value: "High", note: "Via agents or MCP", tone: "good" },
          { value: "Mid", note: "Depends on vendor support", tone: "mid" },
        ],
      },
      {
        feature: "accounts",
        label: "Multiple account logins",
        webcross: { value: "Yes", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "fingerprint",
        label: "Fingerprint and independent proxy IP",
        webcross: { value: "Yes", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
        ],
      },
      {
        feature: "parallel",
        label: "Parallel tasks",
        webcross: { value: "Yes", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "foreground",
        label: "Doesn't take over your foreground",
        webcross: { value: "Yes", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "code",
        label: "Reusable JS Skills",
        webcross: { value: "Yes", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "dash", tone: "bad" },
        ],
      },
      {
        feature: "local",
        label: "Data stored locally",
        webcross: { value: "Yes", mark: "check", tone: "good" },
        values: [
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "dash", tone: "bad" },
          { value: "", mark: "check", tone: "good" },
          { value: "", mark: "check", tone: "good" },
        ],
      },
      {
        feature: "setup",
        label: "Setup and learning curve",
        webcross: { value: "Low", note: "Plain language, no configuration", tone: "good" },
        values: [
          { value: "Low", note: "Install and run, tied to a host agent", tone: "good" },
          { value: "Low", note: "Out of the box, site access limited by the platform", tone: "good" },
          { value: "Mid", note: "Needs an API key and SDK work", tone: "mid" },
          { value: "High", note: "Install a CLI, write scripts or MCP config", tone: "bad" },
          { value: "High", note: "Build flows and debug them", tone: "bad" },
        ],
      },
    ],
  },
  faq: {
    title: "FAQ",
    description: "",
    items: [
      { q: "What is WebCross?", a: "An agent browser built for web automation. Its forked Chromium kernel lets your agent take plain-language tasks and handle price patrols, bulk form filling, cross-platform collection and engagement. Everything runs in the background, with account use and task progress kept clear and controllable." },
      { q: "How is it different from Playwright or Puppeteer?", a: "Playwright and Puppeteer are libraries embedded in code that drive the page through selectors, so a DOM change can break the script and every step is written by hand. WebCross drives a forked Chromium kernel directly and runs a plain-language task without scripts." },
      { q: "How is it different from Browser Use or Claude for Chrome?", a: "Most comparable tools add an extension or adapter layer on top of stock Chrome, paying a round trip at every step. WebCross offers isolated account sessions, auditable run records, human takeover at sensitive steps, and per-instance fingerprint and exit IP." },
      { q: "Will running several accounts get them linked?", a: "Each account can use its own browser fingerprint and exit IP, with a switchable IP pool and isolated sessions. Fingerprint templates can be copied and applied in batches, so stores and social accounts run in parallel." },
      { q: "Which platforms are supported, and what does it cost?", a: "macOS 13+ and Windows 10 / 11+. All features are free during the public beta: install, grant the requested permissions, then type your first plain-language task in the console." },
      { q: "What is a fingerprint browser, and is WebCross one?", a: "A fingerprint browser gives every account its own configurable browser fingerprint: exit IP, timezone, language and device traits stay natural and unlinked, so sites are more likely to treat visits as real users. WebCross configures a fingerprint and exit IP per instance, drives pages with human-like input. It does not crack protections or promise to bypass platform rules." },
    ],
    firstTitle: "For your first task, start with a product list", firstText: "No complex system to build first. Pick a task due today, inspect its process and outcome, then decide what is worth reusing.", firstSteps: ["Download and launch WebCross", "Connect your familiar agent", "Provide a product list and checks", "Review results and save reusable steps"],
  },
  closing: { title: "Give repetitive work to WebCross, ", titleAccent: "give time back to life", description: "Download WebCross and try it now.", secondary: "3-minute guide" },
  tech: {
    title: "How WebCross works", description: "A technical view of responsibilities, data paths and performance measurement. The homepage stays focused on tasks and outcomes.", back: "Back to product homepage",
    architectureTitle: "Separate responsibilities. Not everything is AI.",
    architecture: [{ title: "Agent / authoring tool", text: "Interprets tasks and makes decisions. Supported authoring tools write, test and save workflows.", items: ["Task planning and decisions", "Outcome analysis and exception handling", "Authoring experience varies by tool"] }, { title: "WebCross", text: "Provides full browser control, isolated instances, page observation and saved-workflow execution.", items: ["Page observation and browser actions", "Background instances and human takeover", "Workflow execution and run records"] }, { title: "Target sites & platforms", text: "Return page state, business responses and verification requirements. Platform responses define the actual outcome.", items: ["Login state and page feedback", "Submission and review status", "CAPTCHA and permission requirements"] }],
    engineTitle: "The forked Chromium kernel and page understanding live in the execution layer.",
    engineDescription: "WebCross provides page observation and browser actions in its execution layer, reducing external adaptation. This describes architectural responsibilities without unsupported millisecond claims or speed multiples.",
    engineLayers: [{ title: "Agent instruction", text: "Click, type, read or execute a workflow step" }, { title: "WebCross execution layer", text: "Page observation, target location, actions and state records" }, { title: "Browser page", text: "Rendered output, control states and platform responses" }],
    observationTitle: "One observation preserves page scope and control state.",
    observationText: "The page overview describes visible content, controls and relationships. Changes are marked, with element details available on demand. A locatable element is not necessarily operable; visibility and state remain separate.",
    flowTitle: "The data path of a task", flowDescription: "Your agent interprets instructions, WebCross operates the local browser, and task-relevant page information may be sent to your selected model provider. Exact fields and transfer scope depend on the integration and current version.", flow: [{ title: "Instructions & inputs", text: "Product list, target sites, account instance and requirements" }, { title: "Agent planning", text: "Chooses browser actions and requests help when needed" }, { title: "WebCross execution", text: "Observes pages, controls the browser or runs a workflow" }, { title: "Platform & outcome", text: "Retains platform responses, completed items and exceptions" }],
    workflowTitle: "Measure creation and reuse separately.", workflowDescription: "Initial exploration and authoring have different costs from executing a saved workflow. Reuse reduces repeated exploration, without promising a fixed token or time saving.", workflowStages: [{ title: "Authoring", text: "Explore pages, write and test steps, save the package. Record full model turns and human effort." }, { title: "Execution", text: "Read new inputs and run established steps continuously, involving the agent where judgment is needed." }, { title: "Outcome", text: "Keep completed items, exceptions, platform responses and run records. A successful run is not necessarily a successful business outcome." }],
    recordsTitle: "What should a run record answer?", recordsDescription: "Records support review and recovery; they are not decorative log animations.", records: ["Which instance, account and page performed the task", "Which actions ran, with input and outcome summaries", "Whether the platform reported processing, success or an error", "Where a person intervened and how the task continued", "Whether this run authored or reused a workflow"],
    benchmarkTitle: "Performance: preserve raw records before claiming gains.", benchmarkDescription: "This table structure is illustrative, not measured data. Published results should use reproducible records from comparable tasks, accounts and explicit versions.", benchmarkHeaders: ["Metric", "Authoring / first run", "Reuse run", "Record alongside"], benchmarkRows: [["End-to-end task time", "To be measured", "To be measured", "Timing boundaries, machine, network and page state"], ["Model tokens", "To be measured", "To be measured", "Input, output, cache reads and cache writes"], ["Model turns", "To be measured", "To be measured", "Agent, model and workflow versions"], ["Task outcome", "To be measured", "To be measured", "Platform response, outcomes and exceptions"], ["Human intervention", "To be measured", "To be measured", "Reason, count and waiting time"]], benchmarkNote: "Single-action latency is not end-to-end task time. Previous speed multiples and token percentages should not be reused without original run records.",
    dataTitle: "Data boundaries, explained service by service.", dataDescription: "The local browser, model provider and any WebCross services cannot be summarized as ‘no data leaves your device.’", data: [{ title: "Local browser", text: "Account sessions and browser storage stay on your computer. Isolated instances separate accounts and tasks." }, { title: "Your agent / model provider", text: "Cloud AI may receive task-relevant page information. Scope depends on the integration, tool calls and model provider." }, { title: "Proxy & target platform", text: "Your configured proxy determines the network exit. Target platforms process submitted content, logins and business outcomes." }],
  },
};

const copies: Record<"zh" | "en", HomeCopy> = { zh, en };
export function getHomeCopy(locale: Locale): HomeCopy {
  return locale === "zh" ? copies.zh : copies.en;
}
