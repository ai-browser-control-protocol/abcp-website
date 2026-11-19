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
      labels: {
        login: string;
        composerMode: string;
        archived: string;
        ideas: string;
        forYou: string;
        following: string;
        join: string;
        trending: string;
        comments: string;
        share: string;
        save: string;
        delivery: string;
      };
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
    localNotice: string;
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
    footerNote: string;
    categories: {
      id: string;
      name: string;
      cards: {
        title: string;
        description: string;
        kind: "skill" | "script";
      }[];
    }[];
  };
  comparison: {
    dimension: string;
    supported: string;
    unsupported: string;
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
      labels: {
        login: "登录",
        composerMode: "工作区内修改⌄",
        archived: "{count} 个来源已归档",
        ideas: "{count} 个选题",
        forYou: "为你推荐",
        following: "关注",
        join: "加入",
        trending: "热门",
        comments: "评论",
        share: "分享",
        save: "保存",
        delivery: "UI 执行路径 · JavaScript · Skill package",
      },
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
    localNotice: "WebCross 不接触你的数据",
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
    footerNote: "首批 Skill 与脚本正在整理中，开放时间以官方通知为准",
    categories: [
      { id: "amazon", name: "Amazon", cards: [
        {
          title: "商品价格与库存巡检", description: "批量读取商品页价格、库存与促销状态，输出带时间戳的差异表", kind: "script",
        },
        {
          title: "竞品评论差评归因", description: "整理公开可见差评，归纳产品缺陷、物流与客服问题", kind: "skill",
        },
        {
          title: "Listing 全流程上架", description: "从商品资料到标题、规格、图片与平台反馈，完整记录上架过程", kind: "skill",
        },
        {
          title: "促销活动一致性核验", description: "核对活动价、优惠券和前台展示，标记异常并保留来源", kind: "script",
        },
      ] },
      { id: "tiktok-shop", name: "TikTok Shop", cards: [
        {
          title: "商品与价格采集", description: "读取目标店铺商品、价格与活动信息，生成可对比清单", kind: "skill",
        },
        {
          title: "上传带货视频", description: "上传本地带货视频并关联商品，记录发布状态与平台反馈", kind: "script",
        },
        {
          title: "评论与售后问题归因", description: "汇总公开评论与售后关键词，识别高频问题与产品机会", kind: "skill",
        },
        {
          title: "店铺状态巡检", description: "定时检查商品上架、库存和活动状态，记录异常并输出报告", kind: "script",
        },
      ] },
      { id: "airbnb", name: "Airbnb", cards: [
        {
          title: "房源价格与可订日历", description: "采集公开房源价格、可订日期和基础信息，导出为表格", kind: "script",
        },
        {
          title: "竞品房源对比", description: "对比同区域房源价格、评分与设施，生成可复用的竞品观察", kind: "skill",
        },
        {
          title: "区域搜索页采集", description: "按地区与日期读取搜索结果，保留房源链接与关键字段", kind: "skill",
        },
        {
          title: "评论与设施抽取", description: "整理公开评论中的设施反馈与体验问题，输出结构化摘要", kind: "script",
        },
      ] },
      { id: "youtube", name: "YouTube", cards: [
        {
          title: "频道更新与视频筛选", description: "跟踪频道新视频，按发布时间与主题筛选值得关注的条目", kind: "script",
        },
        {
          title: "字幕与摘要导出", description: "读取公开字幕或转写结果，生成摘要与来源链接", kind: "skill",
        },
        {
          title: "评论观点聚类", description: "整理高相关评论，归纳观众观点、争议与内容机会", kind: "skill",
        },
        {
          title: "竞品选题分析", description: "收集竞品近期视频表现与标题模式，输出选题参考", kind: "script",
        },
      ] },
      { id: "reddit", name: "Reddit", cards: [
        {
          title: "子版块主题追踪", description: "按关键词和版块筛选帖子，保留热度、时间与链接", kind: "script",
        },
        {
          title: "高赞评论与争议点", description: "读取公开评论，提炼高赞观点、反方意见和讨论焦点", kind: "skill",
        },
        {
          title: "品牌与产品提及监控", description: "跟踪品牌词与产品名提及，整理情绪和问题类型", kind: "skill",
        },
        {
          title: "帖子与评论来源导出", description: "将帖子、评论与 permalink 导出为可复核的来源表", kind: "script",
        },
      ] },
      { id: "x", name: "X", cards: [
        {
          title: "关键词与话题追踪", description: "监控关键词、话题和账号动态，按时间整理相关帖子", kind: "script",
        },
        {
          title: "帖子与评论采集", description: "读取公开帖子与可见回复，提炼观点和传播线索", kind: "skill",
        },
        {
          title: "趋势与情绪摘要", description: "汇总热门话题与情绪变化，保留代表性帖子作为依据", kind: "script",
        },
        {
          title: "竞品账号动态观察", description: "整理竞品近期发布、互动与内容方向，形成观察笔记", kind: "skill",
        },
      ] },
      { id: "whatsapp", name: "WhatsApp", cards: [
        {
          title: "群消息整理与待办", description: "把群内待办、时间点和负责人整理成清晰清单", kind: "skill",
        },
        {
          title: "客户问题归类", description: "按主题归类客户消息，识别高频问题并输出处理建议", kind: "script",
        },
        {
          title: "会话摘要与跟进", description: "提炼会话结论、未完成事项和下一步跟进动作", kind: "skill",
        },
        {
          title: "消息批量导出", description: "在授权范围内导出可检索的消息记录", kind: "script",
        },
      ] },
      { id: "facebook", name: "Facebook", cards: [
        {
          title: "主页内容与互动采集", description: "收集公开主页帖子、互动数据与发布时间", kind: "script",
        },
        {
          title: "广告素材观察", description: "整理公开广告素材与落地页线索，保留来源", kind: "skill",
        },
        {
          title: "群组讨论主题", description: "归纳公开群组讨论的热门问题与用户需求", kind: "skill",
        },
        {
          title: "评论线索整理", description: "提取公开评论中的购买意向、问题与联系方式线索", kind: "script",
        },
      ] },
      { id: "instagram", name: "Instagram", cards: [
        {
          title: "账号主页数据采集", description: "采集公开主页资料、帖子与互动数据", kind: "script",
        },
        {
          title: "帖子与评论分析", description: "提炼内容主题、评论反馈与可借鉴的表达", kind: "skill",
        },
        {
          title: "竞品内容选题", description: "对比竞品近期选题与互动表现，输出内容机会", kind: "skill",
        },
        {
          title: "达人合作线索", description: "按领域和互动质量筛选公开达人账号，整理合作线索", kind: "script",
        },
      ] },
      { id: "linkedin", name: "LinkedIn", cards: [
        {
          title: "职位列表采集", description: "按关键词和地点收集公开职位，保留发布时间与链接", kind: "script",
        },
        {
          title: "自动投递岗位申请", description: "按你的条件筛选职位并自动填写申请，提交前保留确认", kind: "skill",
        },
        {
          title: "行业内容监测", description: "跟踪行业账号与话题，汇总值得关注的观点", kind: "skill",
        },
        {
          title: "招聘流程自动跟进", description: "整理候选人状态与待办，按节点提醒下一步动作", kind: "script",
        },
      ] },
      { id: "zillow", name: "Zillow", cards: [
        {
          title: "房源列表与价格采集", description: "读取公开房源价格、面积、卧室数和链接，导出表格", kind: "script",
        },
        {
          title: "区域市场对比", description: "对比同区域房源的挂牌价与特征，生成市场观察", kind: "skill",
        },
        {
          title: "房源详情抽取", description: "抓取指定房源的设施、税费与历史价格信息", kind: "skill",
        },
        {
          title: "租金与历史价格追踪", description: "定期记录租金与挂牌价变化，保留时间序列", kind: "script",
        },
      ] },
      { id: "google-bing-serp", name: "Google & Bing SERP", cards: [
        {
          title: "搜索结果与排名采集", description: "读取公开搜索结果页，记录排名、标题与链接", kind: "script",
        },
        {
          title: "品牌词曝光监控", description: "跟踪品牌词在搜索中的曝光与结果变化", kind: "skill",
        },
        {
          title: "竞品广告位观察", description: "记录公开广告位与落地页线索，保留查询条件", kind: "script",
        },
        {
          title: "长尾关键词拓展", description: "从搜索结果与相关词中整理长尾关键词机会", kind: "skill",
        },
      ] },
    ],
  },
  comparison: {
    dimension: "能力维度",
    supported: "支持",
    unsupported: "不支持",
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
        webcross: { value: "中低", note: "Agent 直驱比一般的云浏览器更省；复用 JS Skill 后Token花费极低", tone: "good" },
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
      { q: "什么是指纹浏览器？WebCross 算吗？", a: "指纹浏览器指让每个账号拥有独立、可配置的浏览器指纹：出口 IP、时区、语言、设备特征都尽量自然且互不关联，网站更愿意把访问当作真实用户。WebCross 在每个实例里独立配置指纹与出口 IP，用拟人的键鼠方式操作页面。它不做破解，也不承诺绕过平台规则。" },
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
  common: { download: "Download WebCross for free", guide: "User Guide", how: "See how it works", replay: "Replay demo", pause: "Pause", play: "Play", next: "Next", input: "You provide", action: "What happens", output: "You receive" },
  hero: {
    titleA: "Let WebCross handle the browser busywork.",
    titleB: "Take back your workday.",
  },
  workflow: {
    title: "Turn one run into a reusable workflow",
    subtitle: "Let AI turn proven steps into reusable scripts and Skills so you can skip writing RPA workflows by hand.",
    steps: [{ title: "AI drives the browser", description: "" }, { title: "Create a workflow", description: "" }, { title: "Reuse it next time", description: "" }],
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
      labels: {
        login: "Sign in",
        composerMode: "Edit in workspace⌄",
        archived: "{count} sources archived",
        ideas: "{count} story ideas",
        forYou: "For you",
        following: "Following",
        join: "Join",
        trending: "Trending",
        comments: "Comments",
        share: "Share",
        save: "Save",
        delivery: "UI execution path · JavaScript · Skill package",
      },
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
    title: "Securely manage 100+ accounts on one device",
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
    title: "Your agent, a separate browser profile for each account",
    description: "Keep your way of working while giving every account its own session, regional IP and browser fingerprint.",
    agentsTitle: "Use the agent you know", agentsText: "Control the browser through a compatible Skill, CLI or MCP. You can also use WebCross AI to assist with the work.", agents: ["Claude Code", "Codex", "WebCross AI", "Skill / CLI / MCP"],
    accountsTitle: "One session per account", accountsText: "Store A and Store B use separate IPs and browser fingerprints. Nothing is shared between them.",
    accountLabels: { login: "Signed in as", session: "Session", network: "Proxy", fingerprint: "Browser fingerprint" },
    accounts: [
      { name: "Store A", account: "Store A · ops•••@brand.com", session: "Instance A", region: "US · residential proxy", ip: "34.212.•••.128", fingerprint: "Chrome 143 · macOS 15" },
      { name: "Store B", account: "Store B · uk•••@brand.com", session: "Instance B", region: "UK · residential proxy", ip: "51.140.•••.42", fingerprint: "Chrome 143 · Windows 11" },
    ],
    localNotice: "WebCross does not access your data",
    localTitle: "Your browser data stays on your device",
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
    description: "Download Skills for 100+ browser tasks across e-commerce, social media, and research.",
    comingSoon: "Coming soon",
    sidebarTitle: "Site categories",
    searchPlaceholder: "Search Skills, scripts or sites",
    creatorAction: "Submit your Skill / script",
    creatorTitle: "Become an early Skill creator",
    creatorText: "When the market opens, publish your Skills here so the next task can reuse them",
    footerNote: "The first Skills and scripts are being prepared. Launch timing will be announced officially",
    categories: [
      { id: "amazon", name: "Amazon", cards: [
        {
          title: "Price and stock check", description: "Read product prices, stock and promotions in batches, then export a timestamped difference table", kind: "script",
        },
        {
          title: "Competitor review triage", description: "Collect publicly visible negative reviews and group product, shipping and support issues", kind: "skill",
        },
        {
          title: "End-to-end listing", description: "Turn product inputs into titles, specs, images and a recorded platform response", kind: "skill",
        },
        {
          title: "Campaign consistency audit", description: "Compare campaign prices, coupons and storefront display, then flag exceptions with sources", kind: "script",
        },
      ] },
      { id: "tiktok-shop", name: "TikTok Shop", cards: [
        {
          title: "Product and price collection", description: "Read store products, prices and campaign details, then build a comparable list", kind: "skill",
        },
        {
          title: "Upload shoppable video", description: "Upload a local shoppable video, attach products and record the platform response", kind: "script",
        },
        {
          title: "Review and support triage", description: "Group public comments and support keywords into recurring issues and product opportunities", kind: "skill",
        },
        {
          title: "Shop status monitor", description: "Check listing, inventory and campaign status, then log exceptions in a report", kind: "script",
        },
      ] },
      { id: "airbnb", name: "Airbnb", cards: [
        {
          title: "Price and availability", description: "Collect public listing prices, available dates and core details into a table", kind: "script",
        },
        {
          title: "Competitor listing compare", description: "Compare local listings by price, rating and amenities for reusable market notes", kind: "skill",
        },
        {
          title: "Regional search collection", description: "Read search results by area and date while retaining listing links and key fields", kind: "skill",
        },
        {
          title: "Review and amenity extract", description: "Turn public review feedback into structured amenity and experience summaries", kind: "script",
        },
      ] },
      { id: "youtube", name: "YouTube", cards: [
        {
          title: "Channel update screening", description: "Follow new uploads and shortlist videos by publish time and topic", kind: "script",
        },
        {
          title: "Transcript and summary export", description: "Read public captions or transcripts, then produce summaries with source links", kind: "skill",
        },
        {
          title: "Comment theme clustering", description: "Organize relevant comments into audience views, disputes and content opportunities", kind: "skill",
        },
        {
          title: "Competitor topic analysis", description: "Collect recent competitor performance and title patterns for topic planning", kind: "script",
        },
      ] },
      { id: "reddit", name: "Reddit", cards: [
        {
          title: "Subreddit topic tracking", description: "Filter posts by keyword and community while keeping score, time and links", kind: "script",
        },
        {
          title: "Top comments and disputes", description: "Read public comments and extract top viewpoints, counterpoints and discussion focus", kind: "skill",
        },
        {
          title: "Brand mention monitor", description: "Track brand and product mentions, then group sentiment and issue types", kind: "skill",
        },
        {
          title: "Post and comment export", description: "Export posts, comments and permalinks into a reviewable source table", kind: "script",
        },
      ] },
      { id: "x", name: "X", cards: [
        {
          title: "Keyword and topic tracking", description: "Monitor keywords, topics and accounts, then organize posts over time", kind: "script",
        },
        {
          title: "Post and reply collection", description: "Read public posts and visible replies to extract viewpoints and propagation clues", kind: "skill",
        },
        {
          title: "Trend and sentiment digest", description: "Summarize trending topics and sentiment shifts with representative posts as evidence", kind: "script",
        },
        {
          title: "Competitor account watch", description: "Organize competitor posts, engagement and content direction into observation notes", kind: "skill",
        },
      ] },
      { id: "whatsapp", name: "WhatsApp", cards: [
        {
          title: "Group message to-dos", description: "Turn group to-dos, deadlines and owners into a clean action list", kind: "skill",
        },
        {
          title: "Customer issue grouping", description: "Group customer messages by topic, identify recurring issues and suggest next steps", kind: "script",
        },
        {
          title: "Conversation summary", description: "Extract conclusions, unfinished items and follow-up actions from a conversation", kind: "skill",
        },
        {
          title: "Authorized message export", description: "Export messages within an approved scope into searchable records", kind: "script",
        },
      ] },
      { id: "facebook", name: "Facebook", cards: [
        {
          title: "Page content and engagement", description: "Collect public page posts, engagement and publish times", kind: "script",
        },
        {
          title: "Ad creative watch", description: "Organize public ad creatives and landing-page clues with source references", kind: "skill",
        },
        {
          title: "Group discussion themes", description: "Summarize popular questions and needs from public group discussions", kind: "skill",
        },
        {
          title: "Comment lead extraction", description: "Extract purchase intent, questions and contact clues from public comments", kind: "script",
        },
      ] },
      { id: "instagram", name: "Instagram", cards: [
        {
          title: "Profile data collection", description: "Collect public profile details, posts and engagement data", kind: "script",
        },
        {
          title: "Post and comment analysis", description: "Extract content themes, audience feedback and reusable wording patterns", kind: "skill",
        },
        {
          title: "Competitor content planning", description: "Compare recent competitor topics and engagement to surface content opportunities", kind: "skill",
        },
        {
          title: "Creator partnership leads", description: "Filter public creator accounts by niche and engagement quality into a lead list", kind: "script",
        },
      ] },
      { id: "linkedin", name: "LinkedIn", cards: [
        {
          title: "Job listing collection", description: "Collect public roles by keyword and location with dates and links", kind: "script",
        },
        {
          title: "Auto-submit job applications", description: "Filter roles and fill applications from your profile, pausing before each submission", kind: "skill",
        },
        {
          title: "Industry content monitor", description: "Follow industry accounts and topics to collect viewpoints worth reviewing", kind: "skill",
        },
        {
          title: "Recruiting follow-up", description: "Track candidate status and reminders by stage", kind: "script",
        },
      ] },
      { id: "zillow", name: "Zillow", cards: [
        {
          title: "Listing and price collection", description: "Read public prices, area, bedroom count and links, then export a table", kind: "script",
        },
        {
          title: "Regional market compare", description: "Compare asking prices and features across an area for a market snapshot", kind: "skill",
        },
        {
          title: "Listing detail extraction", description: "Extract amenities, taxes and price history from selected listings", kind: "skill",
        },
        {
          title: "Rent and price tracking", description: "Record rent and asking-price changes over time as a time series", kind: "script",
        },
      ] },
      { id: "google-bing-serp", name: "Google & Bing SERP", cards: [
        {
          title: "Search ranking collection", description: "Read public search result pages and record rank, title and link", kind: "script",
        },
        {
          title: "Brand visibility monitor", description: "Track brand results and visibility changes across searches", kind: "skill",
        },
        {
          title: "Competitor ad position watch", description: "Record public ad positions and landing-page clues with the query used", kind: "script",
        },
        {
          title: "Long-tail keyword ideas", description: "Organize long-tail opportunities from search results and related queries", kind: "skill",
        },
      ] },
    ],
  },
  comparison: {
    dimension: "Capability",
    supported: "Supported",
    unsupported: "Not supported",
    title: "Compare browser automation tools", description: "Stop second-guessing which Agentic Browser to use",
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
        webcross: { value: "Low–Mid", note: "Direct agent control uses fewer tokens than a typical cloud browser. Reusing a JS Skill keeps token use very low.", tone: "good" },
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
      { q: "What is a stealth browser, and is WebCross one?", a: "A stealth browser gives each account a separate, configurable browser fingerprint. The exit IP, time zone, language, and device characteristics are kept consistent within each account and separate across accounts, so sites are more likely to recognize visits as coming from a person. WebCross configures the fingerprint and exit IP for each instance and uses mouse and keyboard input that resembles human interaction. It does not break site protections or guarantee that you can bypass platform rules." },
    ],
    firstTitle: "For your first task, start with a product list", firstText: "No complex system to build first. Pick a task due today, inspect its process and outcome, then decide what is worth reusing.", firstSteps: ["Download and launch WebCross", "Connect your familiar agent", "Provide a product list and checks", "Review results and save reusable steps"],
  },
  closing: { title: "Let WebCross handle the browser busywork.", titleAccent: "Take back your workday.", description: "Download WebCross and try it now.", secondary: "3-minute guide" },
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

const ja: HomeCopy = {
  navHow: "仕組み",
  common: { download: "WebCross を無料でダウンロード", guide: "ユーザーガイド", how: "技術の仕組みを見る", replay: "デモを再生", pause: "一時停止", play: "再生", next: "次のステップ", input: "入力するもの", action: "実行すること", output: "得られる結果" },
  hero: {
    titleA: "ブラウザーの定型作業は WebCross に。",
    titleB: "毎日に、もっとゆとりを",
  },
  workflow: {
    title: "一度うまくいった手順を、次の仕事にも",
    subtitle: "AI が動作を確認した手順をスクリプトやスキルにまとめます。RPA のフローを手作業で組む手間が省けます。",
    steps: [
      { title: "AI がブラウザーを操作", description: "" },
      { title: "手順をワークフローに保存", description: "" },
      { title: "次のタスクで再利用", description: "" },
    ],
    product: "Harbor Goods のセラミックマグ",
    productMeta: "HRB-MUG-500 · 500 ml · 商品画像 6 枚",
    nextProduct: "Harbor Goods の保温ボトル · HRB-BOTTLE-750",
    fields: [{ label: "商品名", value: "Harbor 500ml Ceramic Mug" }, { label: "価格", value: "$29.00" }, { label: "在庫", value: "120" }, { label: "メインの商品画像", value: "harbor-mug-01.jpg" }],
    platform: "Amazon Seller Central · 商品登録",
    platformNote: "プラットフォーム側で受け付け、処理中です。公開されたかどうかは別途確認してください。",
    workflowName: "商品登録ワークフロー",
    workflowFile: "product-listing.workflow.json",
    runLog: ["HRB-BOTTLE-750 の新しい資料を読み取る", "商品登録ワークフローを読み込む", "検証済みのステップを連続実行", "完了項目と例外を集計"],
    result: "新しい商品にも同じワークフローを使いました。節約できる時間はタスクや再利用回数によって異なります。",
    demo: {
      labels: {
        login: "ログイン",
        composerMode: "ワークスペースで編集⌄",
        archived: "出典 {count} 件を保存",
        ideas: "企画案 {count} 件",
        forYou: "おすすめ",
        following: "フォロー中",
        join: "参加",
        trending: "人気",
        comments: "コメント",
        share: "共有",
        save: "保存",
        delivery: "UI の実行手順 · JavaScript · スキルパッケージ",
      },
      history: "履歴", newChat: "新しいチャット", tabs: ["チャット", "タスク", "自動化"], workspace: "ワークスペース", window: "ウィンドウ", assistant: "AI アシスタント", system: "システム", settings: "設定", guide: "ガイド", access: "接続",
      composer: "タスクを入力すると、エージェントがブラウザーを操作しながら進捗を報告します",
      prompts: [
        "X、Reddit、Threads で AI エージェントとひとり起業に関する最近の投稿を調べて。傾向をまとめ、来週の発信テーマを 3 つ提案して。",
        "さっきの閲覧、収集、要約、企画提案を再利用できるワークフローにまとめて。運用の提案と JS スクリプトを作り、WebCross の実環境でテストしてからスキルとして保存して。",
        "保存したスキルを使って、テーマを Black Friday 2026 の先行セールに変更して。X、Reddit、Threads の結果を集約し、表にまとめて。",
      ],
      taskTitle: "SNS トレンドと企画調査",
      taskSteps: ["X の注目の話題を見る", "Reddit の高評価投稿を読む", "Threads のクリエイター投稿を見る", "トレンドをまとめて企画を提案"],
      research: {
        topic: "AI エージェント × ひとり起業",
        sources: [
          { name: "X", url: "x.com/explore", detail: "反応の多い投稿 24 件" },
          { name: "Reddit", url: "reddit.com/r/AI_Agents", detail: "注目の議論 12 件" },
          { name: "Threads", url: "threads.net/explore", detail: "クリエイターの投稿 9 件" },
        ],
        xPosts: [
          { author: "Lin Zi’an", handle: "@linzian", time: "12 分前", text: "WebCross で競合のレビューを 200 件集め、よくある不満を 3 つにまとめました。レポート作成は 10 分で済みました。", stats: ["32", "9", "128"] },
          { author: "Mira", handle: "@miralab", time: "27 分前", text: "Amazon の調査は以前、インターン 2 人が一日中コピペしていました。WebCross に替えたら 30 分で完了。", stats: ["47", "21", "412"] },
          { author: "Kai · 運用担当", handle: "@yikeops", time: "1 時間前", text: "複数のサイトからまとめて集め、反応データも自動で出力。週報を手作業でつなぎ合わせる必要がなくなりました。", stats: ["18", "14", "256"] },
        ],
        redditPosts: [
          { forum: "r/AI_Agents", title: "What workflows are you actually running as a solo founder?", meta: "コメント 128 件 · 賛成票 2,400" },
          { forum: "r/SideProject", title: "I automated my content research with an agent — here's the stack", meta: "コメント 86 件 · 賛成票 1,100" },
          { forum: "r/automation", title: "Human-like browser automation without APIs?", meta: "コメント 54 件 · 賛成票 870" },
        ],
        threadsPosts: [
          { author: "Mia Chen", handle: "@miachen", time: "18 分前", text: "一人で発信するなら、投稿そのものより、ネタ探しとコメント整理を自動化する価値が大きい。", stats: ["34", "11", "96"] },
          { author: "Noah", handle: "@noahbuilds", time: "42 分前", text: "Built a research agent that reads X, Reddit and Threads, then gives me a weekly content brief.", stats: ["21", "6", "74"] },
          { author: "Ke", handle: "@keke", time: "1 時間前", text: "繰り返しのブラウザー作業をエージェントに任せたら、判断が必要な仕事に時間を使えるようになった。", stats: ["18", "4", "61"] },
        ],
        summary: "AI エージェントの話題は「できるか」から「安定して成果を出せるか」へ。個人クリエイターの関心は、再利用できる手順、運用コスト、実際に成果が出た事例です。",
        ideas: [
          { title: "3 つのアカウントを一人で運用し、エージェントで毎週 20 時間を節約した方法", tag: "効率化" },
          { title: "コードを書かずに自分専用の企画調査エージェントを作る", tag: "チュートリアル" },
          { title: "AI に人気投稿 100 件を分析させてわかった、保存されやすい企画 3 選", tag: "データ" },
        ],
        running: "SNS の投稿を調査・要約中",
        done: "調査完了 · 企画案 3 件",
      },
      authoring: {
        plan: [
          { title: "独立したブラウザーを起動", note: "今回のタスク用に独立したセッションを作成" },
          { title: "JavaScript を作成", note: "閲覧、収集、要約を再利用できるスクリプトにする" },
          { title: "実環境でテスト", note: "WebCross のブラウザー画面を使ってステップごとに検証" },
          { title: "再利用できるスキルとして保存", note: "research.js と skill.md を保存" },
        ],
        businessAdvice: "企画のヒント。「どれだけ時間が減ったか」と「真似できる手順」をタイトルに入れると、保存やコメントにつながりやすくなります。",
        files: ["social-research.workflow.ts", "research.js", "skill.md"],
      },
      reuse: {
        skill: "social-topic-research",
        script: "research.js",
        requirement: "保存したスキルを使って、テーマを Black Friday 2026 の先行セールに変更して。X、Reddit、Threads の結果を集約し、表にまとめて。",
        enterHint: "Enter キーで開始",
        steps: ["スキルとスクリプトを読み込む", "X、Reddit、Threads を検索", "先行セール情報をまとめる", "割引情報を表で出力"],
        findings: [
          { source: "X", title: "Black Friday 2026 先行セール。AI ツールの年払いが最大 50% オフ", meta: "関連投稿 18 件 · 有効な割引コード 6 件" },
          { source: "Reddit", title: "r/BlackFriday の先行セールと過去最安値の比較", meta: "議論 42 件 · 確認済みの出典 12 件" },
          { source: "Threads", title: "クリエイター向け先行セール。マイク、カメラ、サブスクリプション", meta: "クリエイターの投稿 9 件 · 期間限定セール 4 件" },
        ],
        tableTitle: "収集した先行セール",
        tableHeaders: ["出典", "セール情報", "確認状況"],
        exportLabel: "割引情報を出力済み",
        browser: {
          topic: "Black Friday 2026 · 先行セール",
          sources: [
            { name: "X", url: "x.com/search?q=black+friday+2026", detail: "セール投稿 18 件" },
            { name: "Reddit", url: "reddit.com/r/BlackFriday", detail: "議論 42 件" },
            { name: "Threads", url: "threads.net/search?q=black+friday", detail: "クリエイターの投稿 9 件" },
          ],
          xPosts: [
            { author: "DealWatch", handle: "@dealwatch", time: "8 分前", text: "Black Friday 2026 early deals are live: AI tools are discounting annual plans up to 50% this week.", stats: ["24", "18", "216"] },
            { author: "Mika", handle: "@mikafinds", time: "21 分前", text: "クリエイター機材の先行セールが開始。マイク、照明、カメラのサブスクが約 30% オフ。リンクは返信欄に。", stats: ["31", "12", "184"] },
            { author: "SaaS Bites", handle: "@saasbites", time: "46 分前", text: "Tracking every early Black Friday 2026 SaaS deal in one thread. Reply with what you find.", stats: ["16", "9", "132"] },
          ],
          redditPosts: [
            { forum: "r/BlackFriday", title: "2026 Early Black Friday Deals Megathread — verified list, updated hourly", meta: "コメント 312 件 · 賛成票 5,800" },
            { forum: "r/Frugal", title: "Which early Black Friday offers are actually better than last year?", meta: "コメント 128 件 · 賛成票 2,100" },
            { forum: "r/VideoEditing", title: "Creator gear discounts worth waiting for on Black Friday?", meta: "コメント 86 件 · 賛成票 1,400" },
          ],
          threadsPosts: [
            { author: "Maya", handle: "@mayacreates", time: "14 分前", text: "Tracking Black Friday 2026 early discounts for creator tools. Most useful so far: annual AI plans and storage.", stats: ["42", "17", "208"] },
            { author: "Devin", handle: "@devbuilds", time: "39 分前", text: "The early Black Friday deals are genuinely good this year. I am collecting the verified ones in a thread.", stats: ["27", "8", "116"] },
            { author: "Ke", handle: "@keke", time: "1 時間前", text: "今年は当日よりも先行割引に注目。特にサブスクと制作機材がお得です。", stats: ["19", "5", "84"] },
          ],
        },
      },
      browserTitle: "SNS トレンド調査 · 今週",
      workflowName: "SNS 企画調査ワークフロー", generating: "AI がワークフローを作成中", saved: "スキルを保存しました",
      script: [
        'import { WebCross } from "@webcross/sdk";',
        'const browser = await WebCross.open();',
        'const sources = ["x.com", "reddit.com", "threads.net"];',
        'const posts = await browser.collect(sources, {',
        "  topic: \"AI エージェント × ひとり起業\",",
        '  limit: 60,',
        '});',
        'const digest = await browser.summarize(posts);',
        'await browser.export(digest, "weekly-ideas.md");',
        'export const skill = browser.toSkill("social-topic-research");',
      ],
      inputFile: "social-topic-research", runTitle: "自動化 / 新規タスク", running: "セール情報を検索・集計中", complete: "タスク完了 · レポート保存済み",
      resultRows: [],
      resultTitle: "black-friday-2026-early-deals.md", resultNote: "X、Reddit、Threads のセール情報を集約済み",
    },
  },
  background: {
    title: "1台で100以上のアカウントを安全に管理",
    description: "WebCross はアカウントごとにフィンガープリント、プロキシ、ログイン状態を引き継ぎます。ログインし直すことなく作業を割り振り、結果もアカウント別に確認できます。",
    ordinaryTitle: "AI エージェント + 一般的なブラウザー",
    ordinaryItems: ["現在のページとブラウザーの状態を使用", "現在のアカウントでタスクを実行", "アカウント切り替え時に状態を再確認", "現在のタスクの結果を返す"],
    webcrossTitle: "WebCross AI Agent",
    ordinaryScope: "現在のセッション · 単一アカウント",
    webcrossScope: "独立した環境 · 複数アカウント",
    comparisonRows: [
      { ordinary: "現在のセッションのブラウザー環境のみ利用", webcross: "アカウントごとに既存の独立した環境を利用" },
      { ordinary: "アカウントを替えるたびに設定を切り替え、ログインを確認", webcross: "フィンガープリント、プロキシ、ログイン状態を引き継ぐ" },
      { ordinary: "複数アカウントへのタスク割り当ては個別に行う", webcross: "アカウントごとにタスクを一括割り当て" },
      { ordinary: "現在のアカウントの進行状況と結果のみ確認", webcross: "アカウントごとの進行状況と結果を記録" },
    ],
    accounts: [{ name: "米国ストア · アカウント A", task: "セール価格と在庫を確認", status: "実行中" }, { name: "英国ストア · アカウント B", task: "クーポンの状態を再確認", status: "完了" }, { name: "SNS · アカウント C", task: "投稿とコメントを整理", status: "順番待ち" }],
  },
  cases: {
    title: "毎日ブラウザーで行う作業から始めよう",
    description: "各シナリオで、何を入力し、どの操作を行い、何が返ってくるのかを確認できます。",
    items: [
      { tab: "商品登録", title: "商品資料から出品結果の確認まで", description: "AI が商品項目を入力し、画像をアップロードして、プラットフォームの応答を記録します。よく使う手順は次の商品にも使えます。", input: "商品資料、画像、出品者アカウント、対象サイト", action: "商品名と仕様を入力し、画像をアップロードして提出結果を取得", output: "提出記録、プラットフォームの状態、対応が必要な項目", visualTitle: "Amazon Seller Central · 提出記録", rows: [{ label: "商品項目", value: "商品名 / 仕様 / 画像", state: "入力済み" }, { label: "プラットフォームの応答", value: "受付済み · 処理中", state: "審査待ち" }, { label: "公開表示", value: "商品ページを別途開いて確認", state: "確認待ち" }] },
      { tab: "セールとクーポンの点検", title: "セール開始後の価格や在庫のずれを早めに発見", description: "サイト間で同じ SKU を照合します。承認済みのプランに沿ってクーポンを設定し、変更結果を再確認します。", input: "SKU の対応表、セール価格、在庫の基準、クーポンのルール", action: "ストアごとに照合し、許可されたクーポン設定と変更を記録", output: "差異一覧、クーポンの変更履歴、再確認の状況", visualTitle: "セール点検 · 差異と再確認", rows: [{ label: "ストア A", value: "$29 · 在庫 12 · クーポン適用中", state: "一致" }, { label: "ストア B", value: "$32 · 在庫 8 · クーポン予約済み", state: "差異あり" }, { label: "次の対応", value: "承認済みのプランに沿って調整し、再確認", state: "対応待ち" }] },
      { tab: "競合の投稿とコメントを分析", title: "競合の投稿と、コメントで寄せられた質問を把握", description: "期間を指定して投稿と閲覧できるコメントを集め、テーマ、質問、企画のヒントを出典付きで整理します。", input: "競合アカウント、期間、言語、調べたい質問", action: "投稿と表示されるコメントを読み、出典とテーマを整理", output: "出典一覧、話題、企画案、調査範囲", visualTitle: "競合分析 · 過去 7 日間", rows: [{ label: "最新の投稿", value: "元の投稿へのリンクと公開日", state: "保存済み" }, { label: "コメントでの質問", value: "表示されたコメントのサンプル", state: "整理済み" }, { label: "企画の提案", value: "関連する所見とサンプル範囲", state: "出典を確認可能" }] },
    ],
  },
  environment: {
    title: "いつものエージェントで、アカウントごとに環境を使い分ける",
    description: "使い慣れた手順のまま、アカウントごとに独立したセッション、地域別 IP、ブラウザーフィンガープリントを使えます。",
    agentsTitle: "使い慣れたエージェントと連携",
    agentsText: "対応するスキル、CLI、MCP を通じて、使い慣れたエージェントからブラウザーを操作できます。WebCross AI に直接頼むこともできます。",
    agents: ["Claude Code", "Codex", "WebCross AI", "スキル / CLI / MCP"],
    accountsTitle: "アカウントごとにセッションを分離",
    accountsText: "ストア A とストア B はそれぞれの IP とブラウザーフィンガープリントを使い、アカウント同士で共有しません。",
    accountLabels: { login: "ログイン中のアカウント", session: "現在のセッション", network: "プロキシの出口", fingerprint: "ブラウザーフィンガープリント" },
    accounts: [
      { name: "ストア A", account: "ストア A · ops•••@brand.com", session: "インスタンス A", region: "米国 · 住宅回線プロキシ", ip: "34.212.•••.128", fingerprint: "Chrome 143 · macOS 15" },
      { name: "ストア B", account: "ストア B · uk•••@brand.com", session: "インスタンス B", region: "英国 · 住宅回線プロキシ", ip: "51.140.•••.42", fingerprint: "Chrome 143 · Windows 11" },
    ],
    localNotice: "WebCross はお客様のデータにアクセスしません",
    localTitle: "ブラウザーのデータは手元の端末に",
    localLines: [
      "ブラウザーのセッションはお使いの端末にのみ保存されます",
      "ページの読み取りやブラウザー操作には、そのつど許可が必要です",
    ],
    localFlow: {
      task: "ユーザーのタスク",
      taskMeta: "ひとことで指示",
      harness: "Harness",
      harnessMeta: "WebCross の実行レイヤー",
      gate: "許可が必要",
      gateMeta: "確認して続行",
      browser: "Chromium",
      browserMeta: "ローカルブラウザー",
      sites: ["shop.example", "tickets.example", "socialmedia.example"],
      sitesLabel: "対象サイト",
    },
  },
  marketplace: {
    eyebrow: "COMING SOON · SKILL MARKET",
    title: "スキルマーケットプレイス",
    description: "商品登録から SNS 運用、データ収集まで。公開後は、100種類以上のブラウザー作業に使えるスキルをダウンロードできます。",
    comingSoon: "近日公開",
    sidebarTitle: "サイトのカテゴリ",
    searchPlaceholder: "スキル、スクリプト、サイトを検索",
    creatorAction: "スキルやスクリプトを提出",
    creatorTitle: "スキルの先行クリエイターを募集",
    creatorText: "公開後は、自作のスキルを掲載してほかの利用者に共有できます。",
    footerNote: "最初のスキルとスクリプトを準備しています。公開日は公式のお知らせでご案内します。",
    categories: [
      { id: "amazon", name: "Amazon", cards: [
        {
          title: "価格と在庫の点検", description: "価格、在庫、セール状況を一括取得し、確認時刻付きの差分表にまとめます", kind: "script",
        },
        {
          title: "競合商品の低評価レビュー分析", description: "公開レビューから製品の不満、配送、サポートの課題を分類します", kind: "skill",
        },
        {
          title: "商品登録の全工程", description: "商品資料からタイトル、仕様、画像、プラットフォームの応答まで記録します", kind: "skill",
        },
        {
          title: "セール表示の照合", description: "セール価格、クーポン、購入画面の表示を照合し、不一致と出典を記録します", kind: "script",
        },
      ] },
      { id: "tiktok-shop", name: "TikTok Shop", cards: [
        {
          title: "商品と価格の収集", description: "対象ストアの商品、価格、セール情報を比較表にします", kind: "skill",
        },
        {
          title: "商品紹介動画のアップロード", description: "端末の動画をアップロードして商品と関連付け、公開状態と応答を記録します", kind: "script",
        },
        {
          title: "コメントと購入後の問題の分析", description: "公開コメントと購入後の問い合わせから、よくある課題と改善のヒントを見つけます", kind: "skill",
        },
        {
          title: "ストアの定期点検", description: "出品、在庫、セール状況を定期確認し、異常をレポートにまとめます", kind: "script",
        },
      ] },
      { id: "airbnb", name: "Airbnb", cards: [
        {
          title: "宿泊料金と空き状況", description: "公開されている料金、空き日程、基本情報を表に出力します", kind: "script",
        },
        {
          title: "競合宿泊先の比較", description: "同じ地域の料金、評価、設備を比較し、繰り返し使える調査表を作ります", kind: "skill",
        },
        {
          title: "地域別の検索結果収集", description: "地域と日付を指定して検索結果を読み、宿泊先のリンクと主要項目を残します", kind: "skill",
        },
        {
          title: "レビューから設備情報を抽出", description: "公開レビューから設備への意見と滞在中の課題を整理します", kind: "script",
        },
      ] },
      { id: "youtube", name: "YouTube", cards: [
        {
          title: "チャンネルの更新と動画の絞り込み", description: "新着動画を追い、公開日とテーマで注目すべき動画を選びます", kind: "script",
        },
        {
          title: "字幕と要約の書き出し", description: "公開字幕や文字起こしを読み、要約と出典リンクをまとめます", kind: "skill",
        },
        {
          title: "コメントの意見を分類", description: "関連性の高いコメントから視聴者の意見、論点、次の企画のヒントを抽出します", kind: "skill",
        },
        {
          title: "競合チャンネルの企画分析", description: "競合の最近の動画の反応とタイトルの傾向から、次の企画の参考をまとめます", kind: "script",
        },
      ] },
      { id: "reddit", name: "Reddit", cards: [
        {
          title: "サブレディットの話題を追跡", description: "キーワードとサブレディットで絞り込み、反応数、日時、リンクを残します", kind: "script",
        },
        {
          title: "高評価コメントと論点", description: "公開コメントから支持の多い意見、反対意見、主な論点を整理します", kind: "skill",
        },
        {
          title: "ブランドや商品の言及を監視", description: "ブランド名や商品名の言及を追い、反応の傾向と課題を分類します", kind: "skill",
        },
        {
          title: "投稿とコメントの出典を出力", description: "投稿、コメント、固定リンクを検証できる一覧にまとめます", kind: "script",
        },
      ] },
      { id: "x", name: "X", cards: [
        {
          title: "キーワードと話題の追跡", description: "キーワード、話題、アカウントの動きを追い、関連投稿を時系列で整理します", kind: "script",
        },
        {
          title: "投稿と返信の収集", description: "公開投稿と表示される返信から、主な意見と拡散の手がかりをまとめます", kind: "skill",
        },
        {
          title: "トレンドと反応の要約", description: "注目の話題と反応の変化をまとめ、代表的な投稿を根拠として残します", kind: "script",
        },
        {
          title: "競合アカウントの動向調査", description: "競合の最近の投稿、反応、コンテンツの方向性を調査メモにまとめます", kind: "skill",
        },
      ] },
      { id: "whatsapp", name: "WhatsApp", cards: [
        {
          title: "グループのメッセージと ToDo", description: "やるべきこと、日時、担当者をわかりやすい一覧に整理します", kind: "skill",
        },
        {
          title: "顧客の問い合わせを分類", description: "問い合わせを話題別に整理し、頻出する質問と対応案をまとめます", kind: "script",
        },
        {
          title: "会話の要約とフォローアップ", description: "会話の結論、残件、次に取るべき対応を整理します", kind: "skill",
        },
        {
          title: "メッセージの一括書き出し", description: "許可された範囲で、検索できるメッセージ履歴を出力します", kind: "script",
        },
      ] },
      { id: "facebook", name: "Facebook", cards: [
        {
          title: "ページの投稿と反応を収集", description: "公開ページの投稿、反応データ、公開日時を集めます", kind: "script",
        },
        {
          title: "広告クリエイティブの調査", description: "公開広告とランディングページを調べ、出典を残します", kind: "skill",
        },
        {
          title: "グループの話題分析", description: "公開グループの議論から注目の質問と利用者のニーズをまとめます", kind: "skill",
        },
        {
          title: "コメントから見込み情報を抽出", description: "公開コメントから購入意向、質問、連絡先の手がかりを整理します", kind: "script",
        },
      ] },
      { id: "instagram", name: "Instagram", cards: [
        {
          title: "プロフィールのデータ収集", description: "公開プロフィール、投稿、反応データを集めます", kind: "script",
        },
        {
          title: "投稿とコメントの分析", description: "投稿のテーマ、返信の反応、参考になる表現を整理します", kind: "skill",
        },
        {
          title: "競合コンテンツの企画調査", description: "競合の最近のテーマと反応を比較し、次のコンテンツのヒントを見つけます", kind: "skill",
        },
        {
          title: "クリエイターとの協業候補", description: "分野と反応の質で公開アカウントを絞り込み、協業候補を整理します", kind: "script",
        },
      ] },
      { id: "linkedin", name: "LinkedIn", cards: [
        {
          title: "求人情報の収集", description: "キーワードと勤務地で公開求人を集め、掲載日時とリンクを残します", kind: "script",
        },
        {
          title: "応募フォームの自動入力", description: "条件に合う求人を選び、応募フォームを入力します。送信前に確認できます", kind: "skill",
        },
        {
          title: "業界の動向を追跡", description: "業界のアカウントや話題を追い、注目すべき見解をまとめます", kind: "skill",
        },
        {
          title: "採用プロセスのフォローアップ", description: "候補者の進捗と ToDo を整理し、各段階で次の対応を知らせます", kind: "script",
        },
      ] },
      { id: "zillow", name: "Zillow", cards: [
        {
          title: "物件一覧と価格を収集", description: "公開物件の価格、広さ、寝室数、リンクを表に出力します", kind: "script",
        },
        {
          title: "地域の不動産市場を比較", description: "同じエリアの掲載価格と物件の特徴を整理し、市場の傾向をまとめます", kind: "skill",
        },
        {
          title: "物件の詳細情報を抽出", description: "指定物件の設備、税金・諸費用、価格履歴を収集します", kind: "skill",
        },
        {
          title: "賃料と価格履歴の追跡", description: "賃料と掲載価格の変化を定期的に記録し、時系列で保存します", kind: "script",
        },
      ] },
      { id: "google-bing-serp", name: "Google & Bing SERP", cards: [
        {
          title: "検索結果と順位を収集", description: "公開検索結果から順位、タイトル、リンクを記録します", kind: "script",
        },
        {
          title: "ブランド検索での露出を追跡", description: "ブランド名の検索結果で、露出や順位の変化を追います", kind: "skill",
        },
        {
          title: "競合の広告枠を調査", description: "公開広告枠とランディングページを記録し、検索条件を残します", kind: "script",
        },
        {
          title: "ロングテールキーワードの発掘", description: "検索結果と関連語から、有望なロングテールキーワードを見つけます", kind: "skill",
        },
      ] },
    ],
  },
  comparison: {
    dimension: "比較する機能",
    supported: "対応",
    unsupported: "非対応",
    title: "ブラウザー自動化ツールを比較",
    description: "利用中のエージェントとの相性や、同時に扱えるアカウントを比べてみましょう。",
    promo: "WebCross なら、毎日の繰り返し作業を短時間で済ませられます。",
    note: "方式ごとの目安です。機能は製品バージョン、設定、接続方法によって異なります。トークン使用量と所要時間は同条件では測定していません。",
    columns: [
      { name: "ブラウザー拡張機能", meta: "Claude / Codex in Chrome" },
      { name: "組み込みブラウザー", meta: "Claude / ChatGPT built-in" },
      { name: "クラウドブラウザー", meta: "Browserbase / Browser Use" },
      { name: "Browser CLI", meta: "playwright / chrome devtools mcp" },
      { name: "RPA", meta: "UiPath" },
    ],
    dimensions: [
      {
        feature: "tokens",
        label: "トークン使用量",
        webcross: { value: "やや少ない", note: "エージェントの直接操作で、一般的なクラウドブラウザーよりトークン使用量を削減。JS スキルの再利用時はごく少量です。", tone: "good" },
        values: [
          { value: "多い", note: "ステップごとにページを読み直す", tone: "bad" },
          { value: "多い", note: "プラットフォームのコンテキスト課金に依存", tone: "bad" },
          { value: "中程度", note: "タスクとエージェントごとに課金", tone: "mid" },
          { value: "多い", note: "コンテキストは自分で管理。通常は使用量が多い", tone: "bad" },
          { value: "なし", note: "大規模言語モデルを使用しない", tone: "neutral" },
        ],
      },
      {
        feature: "agents",
        label: "AI エージェントへの対応",
        webcross: { value: "高い", note: "スキル、CLI、MCP で複数のエージェントに接続", tone: "good" },
        values: [
          { value: "低い", note: "通常は拡張機能にひもづく", tone: "bad" },
          { value: "低い", note: "プラットフォームの AI のみ", tone: "bad" },
          { value: "高い", note: "SDK や API で複数のエージェントに接続", tone: "good" },
          { value: "高い", note: "エージェント単位または MCP で接続", tone: "good" },
          { value: "中程度", note: "ベンダーの対応状況による", tone: "mid" },
        ],
      },
      {
        feature: "accounts",
        label: "複数アカウントでログイン",
        webcross: { value: "対応", mark: "check", tone: "good" },
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
        label: "フィンガープリントと独立したプロキシ IP",
        webcross: { value: "対応", mark: "check", tone: "good" },
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
        label: "タスクを並行実行",
        webcross: { value: "対応", mark: "check", tone: "good" },
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
        label: "手元の作業を妨げない",
        webcross: { value: "対応", mark: "check", tone: "good" },
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
        label: "再利用可能な JS スキル",
        webcross: { value: "対応", mark: "check", tone: "good" },
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
        label: "データをローカルに保存",
        webcross: { value: "対応", mark: "check", tone: "good" },
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
        label: "設定と習得の難しさ",
        webcross: { value: "低い", note: "自然言語だけで使え、設定不要", tone: "good" },
        values: [
          { value: "低い", note: "インストール後すぐ使える。ホストのエージェントが必要", tone: "good" },
          { value: "低い", note: "すぐ使える。アクセス可能なサイトはプラットフォームに依存", tone: "good" },
          { value: "中程度", note: "API キーと SDK による開発が必要", tone: "mid" },
          { value: "高い", note: "CLI の導入、スクリプト作成、または MCP の設定が必要", tone: "bad" },
          { value: "高い", note: "ワークフローの構築とデバッグが必要", tone: "bad" },
        ],
      },
    ],
  },
  faq: {
    title: "よくある質問",
    description: "",
    items: [
      { q: "WebCross とは？", a: "WebCross はウェブ自動化のためのエージェント向けブラウザーです。Chromium をフォークしたエンジンを使い、自然言語の指示で価格の点検、フォームへの一括入力、複数のプラットフォームでの情報収集ややり取りをこなします。タスクはバックグラウンドで進み、アカウントの使用状況と進行状況を確認できます。" },
      { q: "Playwright や Puppeteer との違いは？", a: "Playwright や Puppeteer はコードに組み込む自動化ライブラリーで、セレクターでページを操作します。各ステップをコードで書くため、サイトの更新でスクリプトが動かなくなることもあります。WebCross は Chromium をフォークしたエンジンからレンダリング処理に指示を届けるので、自然言語でタスクを頼めます。" },
      { q: "Browser Use や Claude for Chrome との違いは？", a: "同種のツールの多くは Chrome に拡張機能やアダプターを追加するため、各ステップで往復通信が生じます。WebCross はアカウント別のセッション、監査できる実行ログ、重要な場面での手動引き継ぎ、個別のフィンガープリントと出口 IP を備え、複数アカウントを独立して並行運用できます。" },
      { q: "複数のアカウントを同時に使うと、同じ利用者だと判断されますか？", a: "アカウントごとに独立したブラウザーフィンガープリントと出口 IP を設定できます。IP プールは切り替えられ、セッションは分離されています。フィンガープリントのテンプレートを複製して一括適用できるので、複数のストアやアカウントを並行運用できます。" },
      { q: "対応 OS と料金は？", a: "macOS 13 以降と Windows 10 / 11 以降に対応しています。公開ベータ中は全機能を無料で使えます。インストール後にシステムが求める権限を許可し、コントロールパネルで自然言語のタスクを入力してください。" },
      { q: "ステルスブラウザーとは？ WebCross も該当しますか？", a: "ステルスブラウザーでは、アカウントごとにブラウザーフィンガープリントを設定し、出口 IP、タイムゾーン、言語、端末の特性に一貫性を持たせながら、アカウント同士を分けて運用できます。WebCross はインスタンスごとにフィンガープリントと出口 IP を設定し、人の操作に近いマウスやキーボード入力でページを動かします。保護機能の解除やプラットフォーム規則の回避を保証するものではありません。" },
    ],
    firstTitle: "最初のタスクは商品リストから",
    firstText: "複雑な仕組みを最初から組む必要はありません。今日中に終わらせたいタスクを一つ選び、手順と結果を確認して、再利用するステップを決めましょう。",
    firstSteps: ["WebCross をダウンロードして起動", "使い慣れたエージェントを接続", "商品リストと確認条件を入力", "結果を確認し、再利用するステップを保存"],
  },
  closing: { title: "ブラウザーの定型作業は WebCross に。", titleAccent: "毎日に、もっとゆとりを", description: "WebCross をダウンロードして、今すぐお試しください。", secondary: "3 分でわかるユーザーガイド" },
  tech: {
    title: "WebCross の仕組み",
    description: "技術評価向けに、エージェント、ブラウザー、ワークフローの担当範囲、データの流れ、性能の測り方を説明します。ホームページではタスクとその結果を紹介します。",
    back: "製品トップに戻る",
    architectureTitle: "機能ごとの役割を分けて考える。",
    architecture: [
      { title: "エージェント / 作成ツール", text: "タスクを理解して判断し、対応ツールで手順を作成、検証、保存します。", items: ["タスクの分解と判断", "結果の分析と例外への判断", "フロー作成の体験はツールによって異なる"] },
      { title: "WebCross", text: "ブラウザー操作、独立したインスタンス、ページの観測、保存済みフローの実行を提供します。", items: ["ページの読み取りとブラウザー操作", "バックグラウンドのインスタンスと手動引き継ぎ", "ワークフローの実行と実行履歴"] },
      { title: "対象サイトとプラットフォーム", text: "ページの状態、処理結果、認証要件を返します。最終結果はプラットフォームの応答に従います。", items: ["ログイン状態とページの応答", "提出処理と審査の状況", "認証コードと権限の要件"] },
    ],
    engineTitle: "Chromium フォークとページの理解を実行レイヤーに。",
    engineDescription: "WebCross はブラウザーの実行レイヤーでページを観測して操作し、外部アダプターを減らします。ここではアーキテクチャの役割を説明し、同一条件で測定していないミリ秒や速度倍率は比較に用いません。",
    engineLayers: [{ title: "エージェントの指示", text: "クリック、入力、読み取り、またはワークフロー手順" }, { title: "WebCross の実行レイヤー", text: "ページ観測、対象の特定、操作、状態の記録" }, { title: "ブラウザーのページ", text: "描画結果、コントロールの状態、プラットフォームの応答" }],
    observationTitle: "一度の観測で、ページの範囲とコントロールの状態を記録。",
    observationText: "ページの全体像では見えている内容、コントロール、要素の関係を確認できます。変更箇所を示し、必要に応じて要素の詳細を開けます。特定できることと操作できることは別です。表示の有無と状態は別々に示します。",
    flowTitle: "タスク内でのデータの流れ",
    flowDescription: "エージェントが指示を理解し、WebCross がローカルのブラウザーを操作します。必要なページ情報は選んだモデルサービスに送られる場合があります。対象項目や送信範囲は接続方式とバージョンによって異なります。",
    flow: [{ title: "お客様の指示と資料", text: "商品リスト、対象サイト、アカウントのインスタンス、タスク要件" }, { title: "エージェントが理解し、計画", text: "ページ操作を選び、必要に応じて人の対応を求める" }, { title: "WebCross が実行", text: "ページを読み、ブラウザーを操作し、必要に応じて手順を連続実行" }, { title: "プラットフォームの応答と結果", text: "プラットフォームの応答、完了項目、例外を保存" }],
    workflowTitle: "作成と再利用は別々に測る。",
    workflowDescription: "初めてページを調べて手順を作る場合と、保存済みの手順を実行する場合ではコストが異なります。再利用で探索を繰り返す手間は減ります。トークンや時間の削減率は一定ではありません。",
    workflowStages: [{ title: "作成", text: "ページを調べ、手順を書いて検証し、パッケージを保存します。モデルとのやり取りと人の作業量も記録します。" }, { title: "実行", text: "新しい入力を読み、WebCross が決まった手順を連続実行します。判断が必要な箇所はエージェントが担当します。" }, { title: "結果", text: "完了項目、例外、プラットフォームの応答、実行履歴を残します。業務の結果は実行の成否とは別に確認します。" }],
    recordsTitle: "実行履歴で確認できること",
    recordsDescription: "実行履歴は確認と振り返りに使います。",
    records: ["どのインスタンス、アカウント、ページで実行したか", "何を実行し、入力と結果の概要は何か", "プラットフォームの応答が処理中、成功、エラーのどれだったか", "どこで人が介入し、その後どう再開したか", "手順を新規作成したか、再利用したか"],
    benchmarkTitle: "性能を比較する前に、元の記録を残す。",
    benchmarkDescription: "以下は測定表の例です。正式なデータは、同じタスクとアカウントの条件をそろえ、バージョンを明示した検証可能な記録から取得します。",
    benchmarkHeaders: ["指標", "作成 / 初回実行", "再利用時の実行", "あわせて記録する項目"],
    benchmarkRows: [["タスク全体の所要時間", "未測定", "未測定", "測定の開始と終了、端末、ネットワーク、ページの状態"], ["モデルのトークン使用量", "未測定", "未測定", "入力、出力、キャッシュの読み取りと書き込み"], ["モデルの呼び出し回数", "未測定", "未測定", "エージェント、モデル、ワークフローのバージョン"], ["タスクの結果", "未測定", "未測定", "プラットフォームの応答、完了項目、例外"], ["人による介入", "未測定", "未測定", "介入の理由、回数、待ち時間"]],
    benchmarkNote: "一回のページ操作に要する時間とタスク全体の所要時間は別です。過去の速度倍率やトークンの割合は、元の実行記録で確認できる場合に限って使います。",
    dataTitle: "サービスごとにデータの取扱範囲を説明。",
    dataDescription: "ローカルのブラウザー、モデルサービス、WebCross のオンラインサービスでは、データの扱いが異なります。",
    data: [{ title: "ローカルブラウザー", text: "セッションとブラウザーの保存データは端末に残ります。独立したインスタンスでアカウントやタスクを分離します。" }, { title: "選択したエージェント / モデル", text: "クラウド AI がタスクに必要なページ情報を受け取る場合があります。範囲は接続、ツール呼び出し、モデル提供事業者によって変わります。" }, { title: "プロキシと対象プラットフォーム", text: "ネットワークの出口は設定したプロキシによって決まります。入力の提出、ログイン、処理結果は対象プラットフォームが扱います。" }],
  },
};

const ko: HomeCopy = {
  navHow: "작동 방식",
  common: { download: "WebCross 무료 다운로드", guide: "사용 가이드", how: "기술 원리 보기", replay: "다시 재생", pause: "일시 중지", play: "재생", next: "다음 단계", input: "제공할 입력", action: "실행하는 작업", output: "받게 될 결과" },
  hero: {
    titleA: "반복되는 웹 업무는 WebCross에 맡기고",
    titleB: "중요한 일에 집중하세요",
  },
  workflow: {
    title: "한 번 끝낸 작업을 워크플로로 저장하세요",
    subtitle: "AI가 검증된 작업 절차를 스크립트와 스킬로 저장합니다. 같은 일을 할 때마다 RPA 흐름을 직접 짤 필요가 없습니다.",
    steps: [
      { title: "AI로 브라우저 조작", description: "" },
      { title: "워크플로로 저장", description: "" },
      { title: "다음 작업에 재사용", description: "" },
    ],
    product: "Harbor Goods 세라믹 머그",
    productMeta: "HRB-MUG-500 · 500ml · 상품 이미지 6장",
    nextProduct: "Harbor Goods 보온병 · HRB-BOTTLE-750",
    fields: [{ label: "상품 제목", value: "Harbor 500ml Ceramic Mug" }, { label: "가격", value: "$29.00" }, { label: "재고", value: "120" }, { label: "상품 대표 이미지", value: "harbor-mug-01.jpg" }],
    platform: "Amazon Seller Central · 상품 등록",
    platformNote: "플랫폼이 요청을 접수해 처리 중입니다. 실제 공개 여부는 별도로 확인하세요.",
    workflowName: "상품 등록 워크플로",
    workflowFile: "product-listing.workflow.json",
    runLog: ["HRB-BOTTLE-750 새 자료 읽기", "상품 등록 워크플로 불러오기", "검증된 단계 연속 실행", "완료 항목과 예외 요약"],
    result: "새 상품에도 동일한 워크플로를 재사용했습니다. 절약 효과는 작업과 재사용 횟수에 따라 달라집니다.",
    demo: {
      labels: {
        login: "로그인",
        composerMode: "작업 공간에서 편집⌄",
        archived: "출처 {count}개 저장됨",
        ideas: "주제 {count}개",
        forYou: "추천",
        following: "팔로잉",
        join: "가입",
        trending: "인기",
        comments: "댓글",
        share: "공유",
        save: "저장",
        delivery: "UI 실행 경로 · JavaScript · 스킬 패키지",
      },
      history: "기록", newChat: "새 대화", tabs: ["대화", "작업", "자동화"], workspace: "작업 공간", window: "창", assistant: "AI 어시스턴트", system: "시스템", settings: "설정", guide: "가이드", access: "연결",
      composer: "작업을 입력하면 에이전트가 브라우저를 조작하며 진행 상황을 실시간으로 알려 줍니다",
      prompts: [
        "X, Reddit, Threads에서 AI 에이전트와 1인 기업에 관한 최근 게시물을 살펴봐 줘. 트렌드를 정리하고 다음 주 콘텐츠 주제를 3개 제안해 줘.",
        "방금 한 탐색, 수집, 요약, 주제 제안 단계를 재사용할 워크플로로 정리해 줘. 운영 팁과 JS 스크립트를 만들고 WebCross 실제 환경에서 테스트를 통과하면 스킬로 저장해 줘.",
        "방금 저장한 스킬을 재사용해 주제를 2026년 Black Friday 사전 할인으로 바꿔 줘. X, Reddit, Threads의 결과를 모아 표로 정리해 줘.",
      ],
      taskTitle: "소셜 미디어 트렌드와 주제 조사",
      taskSteps: ["X의 인기 대화 탐색", "Reddit의 추천 게시물 읽기", "Threads의 크리에이터 게시물 탐색", "트렌드와 주제 제안 생성"],
      research: {
        topic: "AI 에이전트 × 1인 기업",
        sources: [
          { name: "X", url: "x.com/explore", detail: "반응이 많은 게시물 24개" },
          { name: "Reddit", url: "reddit.com/r/AI_Agents", detail: "인기 토론 12개" },
          { name: "Threads", url: "threads.net/explore", detail: "크리에이터 게시물 9개" },
        ],
        xPosts: [
          { author: "Lin Zi’an", handle: "@linzian", time: "12분 전", text: "WebCross로 경쟁 상품 리뷰 200개를 모아 반복되는 불만 3가지를 찾았습니다. 보고서는 10분 만에 작성했어요.", stats: ["32", "9", "128"] },
          { author: "Mira", handle: "@miralab", time: "27분 전", text: "Amazon 조사에 전에는 인턴 두 명이 하루 종일 복사 작업을 했어요. WebCross로 바꾼 뒤 30분에 끝났습니다.", stats: ["47", "21", "412"] },
          { author: "Kai · 운영 담당", handle: "@yikeops", time: "1시간 전", text: "여러 플랫폼의 데이터를 한 번에 모으고 반응도 자동으로 내보내니 주간 보고서를 수작업으로 맞출 필요가 없어졌습니다.", stats: ["18", "14", "256"] },
        ],
        redditPosts: [
          { forum: "r/AI_Agents", title: "What workflows are you actually running as a solo founder?", meta: "댓글 128개 · 추천 2.4천" },
          { forum: "r/SideProject", title: "I automated my content research with an agent — here's the stack", meta: "댓글 86개 · 추천 1.1천" },
          { forum: "r/automation", title: "Human-like browser automation without APIs?", meta: "댓글 54개 · 추천 870" },
        ],
        threadsPosts: [
          { author: "Mia Chen", handle: "@miachen", time: "18분 전", text: "혼자 콘텐츠를 만들 때는 게시 자체보다 주제 찾기와 댓글 정리를 자동화하는 편이 더 유용합니다.", stats: ["34", "11", "96"] },
          { author: "Noah", handle: "@noahbuilds", time: "42분 전", text: "Built a research agent that reads X, Reddit and Threads, then gives me a weekly content brief.", stats: ["21", "6", "74"] },
          { author: "Ke", handle: "@keke", time: "1시간 전", text: "반복 브라우저 작업을 에이전트에 맡기니 정말 판단이 필요한 일에 시간을 쓸 수 있게 됐어요.", stats: ["18", "4", "61"] },
        ],
        summary: "AI 에이전트에 관한 대화는 ‘할 수 있나’에서 ‘꾸준히 결과를 낼 수 있나’로 옮겨 가고 있습니다. 1인 크리에이터가 주목하는 것은 재사용 가능한 워크플로, 낮은 운영 비용, 실제 성과 사례입니다.",
        ideas: [
          { title: "계정 3개를 혼자 운영하며 에이전트로 매주 20시간을 아낀 방법", tag: "효율" },
          { title: "코드 없이 나만의 콘텐츠 조사 에이전트 만들기", tag: "튜토리얼" },
          { title: "AI로 인기 게시물 100개를 분석해 찾은 저장을 부르는 주제 3가지", tag: "데이터" },
        ],
        running: "소셜 미디어 탐색 및 요약 중",
        done: "조사 완료 · 주제 3개 생성",
      },
      authoring: {
        plan: [
          { title: "독립 브라우저 시작", note: "이번 작업에 별도 세션 생성" },
          { title: "JavaScript 작성", note: "탐색, 수집, 요약 절차를 재사용 가능한 스크립트로 구성" },
          { title: "실제 환경에서 테스트", note: "WebCross 브라우저 화면을 이용해 단계별 검증" },
          { title: "다시 쓸 수 있는 스킬로 저장", note: "research.js와 skill.md 저장" },
        ],
        businessAdvice: "기획 팁. 제목에 ‘걸린 시간 비교’와 ‘따라 할 수 있는 단계’를 넣으면 저장과 댓글을 얻기 쉽습니다.",
        files: ["social-research.workflow.ts", "research.js", "skill.md"],
      },
      reuse: {
        skill: "social-topic-research",
        script: "research.js",
        requirement: "방금 저장한 스킬을 재사용해 주제를 2026년 Black Friday 사전 할인으로 바꿔 줘. X, Reddit, Threads의 결과를 모아 표로 정리해 줘.",
        enterHint: "Enter 키로 작업 시작",
        steps: ["스킬과 스크립트 불러오기", "X, Reddit, Threads 검색", "사전 할인 정보 정리", "할인 정보 표 내보내기"],
        findings: [
          { source: "X", title: "Black Friday 2026 사전 행사. AI 도구 연간 구독 최대 50% 할인", meta: "관련 게시물 18개 · 유효한 할인 코드 6개" },
          { source: "Reddit", title: "r/BlackFriday 사전 할인과 역대 최저가 비교", meta: "토론 42건 · 확인된 출처 12개" },
          { source: "Threads", title: "크리에이터 장비 사전 할인. 마이크, 카메라, 구독 도구", meta: "크리에이터 게시물 9개 · 기간 한정 행사 4건" },
        ],
        tableTitle: "수집한 사전 할인",
        tableHeaders: ["출처", "할인 정보", "확인 상태"],
        exportLabel: "할인 목록 내보내기 완료",
        browser: {
          topic: "Black Friday 2026 · 사전 할인",
          sources: [
            { name: "X", url: "x.com/search?q=black+friday+2026", detail: "할인 게시물 18개" },
            { name: "Reddit", url: "reddit.com/r/BlackFriday", detail: "토론 42건" },
            { name: "Threads", url: "threads.net/search?q=black+friday", detail: "크리에이터 게시물 9개" },
          ],
          xPosts: [
            { author: "DealWatch", handle: "@dealwatch", time: "8분 전", text: "Black Friday 2026 early deals are live: AI tools are discounting annual plans up to 50% this week.", stats: ["24", "18", "216"] },
            { author: "Mika", handle: "@mikafinds", time: "21분 전", text: "크리에이터 장비 사전 할인 시작! 마이크, 조명, 카메라 구독이 약 30% 할인돼요. 링크는 답글에 있습니다.", stats: ["31", "12", "184"] },
            { author: "SaaS Bites", handle: "@saasbites", time: "46분 전", text: "Tracking every early Black Friday 2026 SaaS deal in one thread. Reply with what you find.", stats: ["16", "9", "132"] },
          ],
          redditPosts: [
            { forum: "r/BlackFriday", title: "2026 Early Black Friday Deals Megathread — verified list, updated hourly", meta: "댓글 312개 · 추천 5.8천" },
            { forum: "r/Frugal", title: "Which early Black Friday offers are actually better than last year?", meta: "댓글 128개 · 추천 2.1천" },
            { forum: "r/VideoEditing", title: "Creator gear discounts worth waiting for on Black Friday?", meta: "댓글 86개 · 추천 1.4천" },
          ],
          threadsPosts: [
            { author: "Maya", handle: "@mayacreates", time: "14분 전", text: "Tracking Black Friday 2026 early discounts for creator tools. Most useful so far: annual AI plans and storage.", stats: ["42", "17", "208"] },
            { author: "Devin", handle: "@devbuilds", time: "39분 전", text: "The early Black Friday deals are genuinely good this year. I am collecting the verified ones in a thread.", stats: ["27", "8", "116"] },
            { author: "Ke", handle: "@keke", time: "1시간 전", text: "올해는 당일보다 사전 할인을 눈여겨볼 만해요. 특히 구독 서비스와 창작 장비가 좋습니다.", stats: ["19", "5", "84"] },
          ],
        },
      },
      browserTitle: "소셜 미디어 트렌드 조사 · 이번 주",
      workflowName: "소셜 미디어 주제 조사 워크플로", generating: "AI가 워크플로 정리 중", saved: "스킬 저장 완료",
      script: [
        'import { WebCross } from "@webcross/sdk";',
        'const browser = await WebCross.open();',
        'const sources = ["x.com", "reddit.com", "threads.net"];',
        'const posts = await browser.collect(sources, {',
        "  topic: \"AI 에이전트 × 1인 기업\",",
        '  limit: 60,',
        '});',
        'const digest = await browser.summarize(posts);',
        'await browser.export(digest, "weekly-ideas.md");',
        'export const skill = browser.toSkill("social-topic-research");',
      ],
      inputFile: "social-topic-research", runTitle: "자동화 / 새 작업", running: "할인 정보 검색 및 집계 중", complete: "작업 완료 · 보고서 저장됨",
      resultRows: [],
      resultTitle: "black-friday-2026-early-deals.md", resultNote: "X, Reddit, Threads의 할인 단서 정리 완료",
    },
  },
  background: {
    title: "기기 한 대로 100개 이상의 계정을 안전하게 관리",
    description: "WebCross는 계정마다 쓰던 핑거프린트와 프록시, 로그인 상태를 그대로 유지합니다. 다시 로그인하지 않고도 여러 계정에 작업을 나눠 맡기고 결과를 따로 확인할 수 있습니다.",
    ordinaryTitle: "AI 에이전트 + 일반 브라우저",
    ordinaryItems: ["현재 브라우저의 페이지와 상태 사용", "현재 계정으로 작업 실행", "계정 전환 시 상태 다시 확인", "현재 작업 결과 반환"],
    webcrossTitle: "WebCross AI Agent",
    ordinaryScope: "현재 세션 · 단일 계정",
    webcrossScope: "독립 환경 · 여러 계정",
    comparisonRows: [
      { ordinary: "현재 세션의 브라우저 환경만 사용", webcross: "계정별 기존 독립 환경 사용" },
      { ordinary: "계정 전환마다 설정 변경 및 로그인 확인", webcross: "핑거프린트, 프록시, 로그인 상태 유지" },
      { ordinary: "여러 계정의 작업을 개별 할당", webcross: "계정별 작업 일괄 할당" },
      { ordinary: "현재 계정의 진행 상황과 결과만 확인", webcross: "계정별 진행 상황과 결과 기록" },
    ],
    accounts: [{ name: "미국 스토어 · 계정 A", task: "행사 가격과 재고 확인", status: "실행 중" }, { name: "영국 스토어 · 계정 B", task: "쿠폰 상태 재확인", status: "완료" }, { name: "소셜 미디어 · 계정 C", task: "게시물과 댓글 정리", status: "실행 대기" }],
  },
  cases: {
    title: "매일 브라우저에서 하는 일부터 시작하세요",
    description: "각 사례에서 어떤 자료를 넣고 어떤 작업이 실행되며 어떤 결과를 받는지 확인하세요.",
    items: [
      { tab: "상품 등록", title: "상품 자료부터 플랫폼의 등록 응답까지", description: "AI가 상품 정보를 입력하고 이미지를 업로드해 플랫폼 응답을 기록합니다. 자주 쓰는 절차는 다음 상품에도 재사용할 수 있습니다.", input: "상품 자료, 이미지, 판매자 계정, 대상 사이트", action: "제목과 규격을 입력하고 이미지를 올린 뒤 제출 응답 확인", output: "제출 기록, 플랫폼 상태, 처리할 항목", visualTitle: "Amazon Seller Central · 제출 기록", rows: [{ label: "상품 항목", value: "제목 / 규격 / 이미지", state: "입력 완료" }, { label: "플랫폼 응답", value: "접수 완료 · 처리 중", state: "검토 대기" }, { label: "구매 화면 표시", value: "상품 페이지를 별도로 열어 확인", state: "확인 대기" }] },
      { tab: "행사 및 쿠폰 점검", title: "행사 시작 후 가격과 재고 차이를 빠르게 발견", description: "플랫폼 간 동일 SKU를 대조하고 승인된 계획에 따라 쿠폰을 설정한 뒤 변경 결과를 다시 확인합니다.", input: "SKU 매핑, 행사 가격, 재고 기준, 쿠폰 규칙", action: "스토어별로 대조하고 승인된 쿠폰 설정과 변경을 기록", output: "차이 목록, 쿠폰 변경 기록, 재확인 상태", visualTitle: "행사 점검 · 차이와 재확인", rows: [{ label: "스토어 A", value: "$29 · 재고 12 · 쿠폰 적용 중", state: "일치" }, { label: "스토어 B", value: "$32 · 재고 8 · 쿠폰 적용 예정", state: "차이 있음" }, { label: "다음 조치", value: "승인된 계획대로 조정하고 다시 확인", state: "처리 대기" }] },
      { tab: "경쟁 계정 게시물과 댓글 분석", title: "경쟁 계정의 게시물과 댓글에 달린 질문을 파악", description: "지정 기간의 게시물과 접근 가능한 댓글을 수집하고 주제, 질문, 콘텐츠 기회를 출처와 함께 정리합니다.", input: "경쟁 계정, 기간, 언어, 분석 질문", action: "게시물과 실제로 표시되는 댓글을 읽고 출처와 주제를 정리", output: "출처 목록, 토론 주제, 콘텐츠 제안과 조사 범위", visualTitle: "경쟁 분석 · 최근 7일", rows: [{ label: "최근 게시물", value: "원본 게시물 링크와 게시 날짜", state: "보관 완료" }, { label: "댓글 질문", value: "실제로 표시된 댓글 표본", state: "정리 완료" }, { label: "콘텐츠 제안", value: "관련 관찰 내용과 표본 범위", state: "출처 확인 가능" }] },
    ],
  },
  environment: {
    title: "쓰던 에이전트 그대로, 브라우저 환경은 계정별로",
    description: "익숙한 작업 방식 그대로 계정마다 독립 세션, 지역별 IP, 브라우저 핑거프린트를 사용할 수 있습니다.",
    agentsTitle: "평소 쓰는 에이전트 연결",
    agentsText: "지원되는 스킬, CLI, MCP를 통해 평소 쓰는 에이전트로 브라우저를 제어할 수 있습니다. WebCross AI에 직접 작업을 맡겨도 됩니다.",
    agents: ["Claude Code", "Codex", "WebCross AI", "스킬 / CLI / MCP"],
    accountsTitle: "계정마다 별도 세션 사용",
    accountsText: "스토어 A와 B는 서로 다른 IP와 브라우저 핑거프린트를 사용하며 계정 간에 공유하지 않습니다.",
    accountLabels: { login: "로그인한 계정", session: "현재 세션", network: "프록시 출구", fingerprint: "브라우저 핑거프린트" },
    accounts: [
      { name: "스토어 A", account: "스토어 A · ops•••@brand.com", session: "인스턴스 A", region: "미국 · 가정용 회선 프록시", ip: "34.212.•••.128", fingerprint: "Chrome 143 · macOS 15" },
      { name: "스토어 B", account: "스토어 B · uk•••@brand.com", session: "인스턴스 B", region: "영국 · 가정용 회선 프록시", ip: "51.140.•••.42", fingerprint: "Chrome 143 · Windows 11" },
    ],
    localNotice: "WebCross는 사용자의 데이터에 접근하지 않습니다",
    localTitle: "브라우저 데이터는 내 기기에 저장",
    localLines: [
      "브라우저 세션은 사용하는 컴퓨터에만 저장됩니다",
      "페이지를 읽거나 브라우저를 조작할 때마다 사용자의 승인이 필요합니다",
    ],
    localFlow: {
      task: "사용자 작업",
      taskMeta: "한 문장으로 요청",
      harness: "Harness",
      harnessMeta: "WebCross 실행 계층",
      gate: "승인 필요",
      gateMeta: "확인 후 계속",
      browser: "Chromium",
      browserMeta: "로컬 브라우저",
      sites: ["shop.example", "tickets.example", "socialmedia.example"],
      sitesLabel: "대상 사이트",
    },
  },
  marketplace: {
    eyebrow: "COMING SOON · SKILL MARKET",
    title: "스킬 마켓플레이스",
    description: "마켓이 열리면 상품 등록, SNS 관리, 자료 수집 등 100가지 이상의 웹 업무에 맞는 스킬을 골라 다운로드할 수 있습니다.",
    comingSoon: "공개 예정",
    sidebarTitle: "사이트 분류",
    searchPlaceholder: "스킬, 스크립트 또는 사이트 검색",
    creatorAction: "스킬 또는 스크립트 제출",
    creatorTitle: "스킬 제작자 사전 모집",
    creatorText: "마켓이 열리면 직접 만든 스킬을 올려 다른 사용자와 공유할 수 있습니다.",
    footerNote: "첫 스킬과 스크립트를 준비하고 있습니다. 공개 일정은 공식 안내에서 확인하세요.",
    categories: [
      { id: "amazon", name: "Amazon", cards: [
        {
          title: "상품 가격·재고 점검", description: "가격, 재고, 행사 상태를 일괄 확인해 시각이 포함된 변경 내역표를 만듭니다", kind: "script",
        },
        {
          title: "경쟁 상품의 낮은 평점 분석", description: "공개된 부정적 리뷰에서 제품 결함, 배송, 고객 지원 문제를 분류합니다", kind: "skill",
        },
        {
          title: "상품 등록 전체 과정", description: "상품 자료부터 제목, 규격, 이미지, 플랫폼 응답까지 등록 과정을 기록합니다", kind: "skill",
        },
        {
          title: "프로모션 표시 일치 여부 확인", description: "행사 가격, 쿠폰, 구매 화면 표시를 대조하고 이상 항목과 출처를 기록합니다", kind: "script",
        },
      ] },
      { id: "tiktok-shop", name: "TikTok Shop", cards: [
        {
          title: "상품·가격 수집", description: "대상 스토어의 상품, 가격, 행사 정보를 비교 목록으로 만듭니다", kind: "skill",
        },
        {
          title: "쇼핑 영상 업로드", description: "기기의 쇼핑 영상을 올리고 상품을 연결한 뒤 게시 상태와 응답을 기록합니다", kind: "script",
        },
        {
          title: "댓글과 구매 후 문제 분석", description: "공개 댓글과 구매 후 문의 키워드를 모아 자주 나오는 문제와 개선 기회를 찾습니다", kind: "skill",
        },
        {
          title: "스토어 정기 점검", description: "상품 등록, 재고, 행사 상태를 정기 점검해 이상 내역을 보고서로 정리합니다", kind: "script",
        },
      ] },
      { id: "airbnb", name: "Airbnb", cards: [
        {
          title: "숙소 요금과 예약 가능 일정", description: "공개 숙소 요금, 예약 가능 날짜와 기본 정보를 표로 내보냅니다", kind: "script",
        },
        {
          title: "경쟁 숙소 비교", description: "같은 지역 숙소의 요금, 평점, 시설을 비교해 재사용할 수 있는 조사표를 만듭니다", kind: "skill",
        },
        {
          title: "지역별 검색 결과 수집", description: "지역과 날짜로 검색 결과를 읽고 숙소 링크와 주요 항목을 기록합니다", kind: "skill",
        },
        {
          title: "리뷰에서 시설 정보 추출", description: "공개 리뷰에서 시설에 대한 의견과 이용 중 겪은 문제를 정리합니다", kind: "script",
        },
      ] },
      { id: "youtube", name: "YouTube", cards: [
        {
          title: "채널 업데이트와 영상 선별", description: "새 영상을 추적하고 게시일과 주제로 주목할 영상을 고릅니다", kind: "script",
        },
        {
          title: "자막과 요약 내보내기", description: "공개 자막이나 전사본을 읽고 요약과 출처 링크를 정리합니다", kind: "skill",
        },
        {
          title: "댓글 의견 분류", description: "관련 댓글을 모아 시청자 의견, 쟁점과 다음 콘텐츠 기회를 찾습니다", kind: "skill",
        },
        {
          title: "경쟁 채널의 콘텐츠 주제 분석", description: "경쟁 채널의 최근 영상 성과와 제목 패턴을 모아 기획 참고 자료를 만듭니다", kind: "script",
        },
      ] },
      { id: "reddit", name: "Reddit", cards: [
        {
          title: "서브레딧 주제 추적", description: "키워드와 서브레딧으로 게시물을 선별하고 반응, 게시 시각, 링크를 기록합니다", kind: "script",
        },
        {
          title: "추천 댓글과 쟁점", description: "공개 댓글에서 추천이 많은 의견, 반대 의견과 핵심 쟁점을 정리합니다", kind: "skill",
        },
        {
          title: "브랜드와 상품 언급 추적", description: "브랜드명과 상품명 언급을 추적해 반응과 문제 유형을 분류합니다", kind: "skill",
        },
        {
          title: "게시물과 댓글 출처 내보내기", description: "게시물, 댓글과 고유 링크를 다시 확인할 수 있는 출처 표로 만듭니다", kind: "script",
        },
      ] },
      { id: "x", name: "X", cards: [
        {
          title: "키워드와 화제 추적", description: "키워드, 화제와 계정 활동을 추적해 관련 게시물을 시간순으로 정리합니다", kind: "script",
        },
        {
          title: "게시물과 답글 수집", description: "공개 게시물과 보이는 답글을 읽어 주요 의견과 확산 단서를 정리합니다", kind: "skill",
        },
        {
          title: "트렌드와 반응 요약", description: "인기 주제와 반응 변화를 정리하고 대표 게시물을 근거로 남깁니다", kind: "script",
        },
        {
          title: "경쟁 계정 활동 조사", description: "경쟁 계정의 최근 게시물, 반응, 콘텐츠 방향을 조사 메모로 정리합니다", kind: "skill",
        },
      ] },
      { id: "whatsapp", name: "WhatsApp", cards: [
        {
          title: "그룹 메시지와 할 일 정리", description: "그룹 대화에서 할 일, 일정, 담당자를 뽑아 목록으로 정리합니다", kind: "skill",
        },
        {
          title: "고객 문의 분류", description: "고객 메시지를 주제별로 분류해 자주 묻는 질문과 대응안을 정리합니다", kind: "script",
        },
        {
          title: "대화 요약과 후속 조치", description: "대화의 결론, 미완료 항목과 다음 후속 조치를 정리합니다", kind: "skill",
        },
        {
          title: "메시지 일괄 내보내기", description: "승인된 범위에서 검색 가능한 메시지 기록을 내보냅니다", kind: "script",
        },
      ] },
      { id: "facebook", name: "Facebook", cards: [
        {
          title: "페이지 게시물과 반응 수집", description: "공개 페이지의 게시물, 반응 데이터와 게시 시점을 수집합니다", kind: "script",
        },
        {
          title: "광고 소재 조사", description: "공개 광고 소재와 랜딩 페이지 단서를 정리하고 출처를 기록합니다", kind: "skill",
        },
        {
          title: "그룹 토론 주제 분석", description: "공개 그룹 대화에서 인기 질문과 사용자 요구를 요약합니다", kind: "skill",
        },
        {
          title: "댓글에서 잠재 수요 파악", description: "공개 댓글에서 구매 의향, 질문과 연락처 단서를 정리합니다", kind: "script",
        },
      ] },
      { id: "instagram", name: "Instagram", cards: [
        {
          title: "프로필 데이터 수집", description: "공개 프로필, 게시물과 반응 데이터를 수집합니다", kind: "script",
        },
        {
          title: "게시물과 댓글 분석", description: "콘텐츠 주제, 댓글 반응과 참고할 만한 표현을 정리합니다", kind: "skill",
        },
        {
          title: "경쟁 콘텐츠 주제 조사", description: "경쟁 계정의 최근 주제와 반응을 비교해 콘텐츠 기회를 찾습니다", kind: "skill",
        },
        {
          title: "크리에이터 협업 후보", description: "분야와 반응의 질로 공개 크리에이터 계정을 선별해 협업 후보를 정리합니다", kind: "script",
        },
      ] },
      { id: "linkedin", name: "LinkedIn", cards: [
        {
          title: "채용 공고 수집", description: "키워드와 근무 지역으로 공개 채용 공고를 찾아 게시 시각과 링크를 기록합니다", kind: "script",
        },
        {
          title: "지원서 자동 작성", description: "조건에 맞는 공고를 선별해 지원서를 채웁니다. 제출 전에 확인할 수 있습니다", kind: "skill",
        },
        {
          title: "업계 동향 추적", description: "업계 계정과 주제를 추적해 주목할 의견을 정리합니다", kind: "skill",
        },
        {
          title: "채용 절차 후속 작업", description: "후보자 상태와 할 일을 정리하고 단계마다 다음 조치를 알려 줍니다", kind: "script",
        },
      ] },
      { id: "zillow", name: "Zillow", cards: [
        {
          title: "매물 목록과 가격 수집", description: "공개 매물의 가격, 면적, 침실 수와 링크를 표로 내보냅니다", kind: "script",
        },
        {
          title: "지역 부동산 시장 비교", description: "같은 지역 매물의 등록 가격과 특징을 비교해 시장 동향을 정리합니다", kind: "skill",
        },
        {
          title: "매물 세부 정보 추출", description: "지정한 매물의 시설, 세금과 비용, 가격 이력을 수집합니다", kind: "skill",
        },
        {
          title: "임대료와 과거 가격 추적", description: "임대료와 등록 가격 변화를 정기적으로 기록해 시간순으로 저장합니다", kind: "script",
        },
      ] },
      { id: "google-bing-serp", name: "Google & Bing SERP", cards: [
        {
          title: "검색 결과와 순위 수집", description: "공개 검색 결과의 순위, 제목과 링크를 기록합니다", kind: "script",
        },
        {
          title: "브랜드 검색 노출 추적", description: "브랜드 키워드의 검색 노출과 결과 변화를 추적합니다", kind: "skill",
        },
        {
          title: "경쟁사 광고 노출 조사", description: "공개 광고 위치와 랜딩 페이지 단서를 기록하고 검색 조건을 남깁니다", kind: "script",
        },
        {
          title: "롱테일 키워드 발굴", description: "검색 결과와 관련어에서 유망한 롱테일 키워드를 찾습니다", kind: "skill",
        },
      ] },
    ],
  },
  comparison: {
    dimension: "비교 기능",
    supported: "지원",
    unsupported: "미지원",
    title: "브라우저 자동화 도구 비교",
    description: "쓰는 에이전트와 연동되는지, 여러 계정을 함께 관리할 수 있는지 살펴보세요.",
    promo: "WebCross에 반복 업무를 맡겨 매일 들이는 시간을 줄이세요.",
    note: "방식별 참고 비교입니다. 기능은 제품 버전, 설정, 연결 방식에 따라 다릅니다. 토큰 사용량과 소요 시간은 동일한 조건에서 측정하지 않았습니다.",
    columns: [
      { name: "브라우저 확장 프로그램", meta: "Claude / Codex in Chrome" },
      { name: "내장 브라우저", meta: "Claude / ChatGPT built-in" },
      { name: "클라우드 브라우저", meta: "Browserbase / Browser Use" },
      { name: "Browser CLI", meta: "playwright / chrome devtools mcp" },
      { name: "RPA", meta: "UiPath" },
    ],
    dimensions: [
      {
        feature: "tokens",
        label: "토큰 사용량",
        webcross: { value: "다소 적음", note: "에이전트가 직접 제어해 일반 클라우드 브라우저보다 토큰을 적게 씁니다. JS 스킬을 재사용하면 토큰 사용량이 매우 낮습니다.", tone: "good" },
        values: [
          { value: "많음", note: "단계마다 페이지를 다시 읽음", tone: "bad" },
          { value: "많음", note: "플랫폼의 컨텍스트 과금에 따름", tone: "bad" },
          { value: "보통", note: "작업과 에이전트 기준으로 과금", tone: "mid" },
          { value: "많음", note: "컨텍스트를 직접 관리해야 하며 대체로 사용량이 많음", tone: "bad" },
          { value: "없음", note: "대규모 언어 모델 호출 없음", tone: "neutral" },
        ],
      },
      {
        feature: "agents",
        label: "AI 에이전트 호환성",
        webcross: { value: "높음", note: "스킬, CLI, MCP로 다양한 에이전트 연결", tone: "good" },
        values: [
          { value: "낮음", note: "대체로 해당 확장 프로그램에 종속", tone: "bad" },
          { value: "낮음", note: "플랫폼 자체 AI만 지원", tone: "bad" },
          { value: "높음", note: "SDK 또는 API로 다양한 에이전트 연결", tone: "good" },
          { value: "높음", note: "에이전트별 연동 또는 MCP 연결", tone: "good" },
          { value: "보통", note: "공급업체의 지원 여부에 따름", tone: "mid" },
        ],
      },
      {
        feature: "accounts",
        label: "여러 계정 로그인",
        webcross: { value: "지원", mark: "check", tone: "good" },
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
        label: "핑거프린트와 독립 프록시 IP",
        webcross: { value: "지원", mark: "check", tone: "good" },
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
        label: "여러 작업 동시 실행",
        webcross: { value: "지원", mark: "check", tone: "good" },
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
        label: "화면에서 하던 작업을 방해하지 않음",
        webcross: { value: "지원", mark: "check", tone: "good" },
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
        label: "재사용 가능한 JS 스킬",
        webcross: { value: "지원", mark: "check", tone: "good" },
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
        label: "데이터 로컬 저장",
        webcross: { value: "지원", mark: "check", tone: "good" },
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
        label: "설정 및 학습 난이도",
        webcross: { value: "낮음", note: "자연어만으로 사용 가능, 별도 설정 불필요", tone: "good" },
        values: [
          { value: "낮음", note: "설치 후 바로 사용 가능하며 호스트 에이전트에 의존", tone: "good" },
          { value: "낮음", note: "바로 사용 가능하며 접근할 수 있는 사이트는 플랫폼에 따름", tone: "good" },
          { value: "보통", note: "API 키와 SDK 개발 필요", tone: "mid" },
          { value: "높음", note: "CLI 설치, 스크립트 작성 또는 MCP 설정 필요", tone: "bad" },
          { value: "높음", note: "워크플로 구성과 디버깅 필요", tone: "bad" },
        ],
      },
    ],
  },
  faq: {
    title: "자주 묻는 질문",
    description: "",
    items: [
      { q: "WebCross란 무엇인가요?", a: "WebCross는 웹 자동화를 위한 에이전트 브라우저입니다. Chromium 포크를 기반으로 에이전트가 자연어 지시를 받아 상품 가격을 점검하고, 양식을 일괄 입력하고, 여러 플랫폼의 콘텐츠를 수집하거나 상호작용합니다. 작업은 백그라운드에서 실행되며 계정 사용과 진행 상황을 확인하고 제어할 수 있습니다." },
      { q: "Playwright, Puppeteer와 어떻게 다른가요?", a: "Playwright와 Puppeteer는 코드에 넣어 쓰는 자동화 라이브러리입니다. 셀렉터로 페이지를 조작하고 단계마다 코드를 작성하므로 사이트 개편 시 스크립트가 멈출 수 있습니다. WebCross는 Chromium 포크에서 렌더링 흐름으로 명령을 직접 전달해 자연어 지시만으로도 작업을 실행합니다." },
      { q: "Browser Use나 Claude for Chrome과 어떻게 다른가요?", a: "비슷한 도구 대부분은 Chrome 위에 확장 프로그램이나 어댑터를 추가해 매 단계마다 왕복 통신이 발생합니다. WebCross는 계정별 세션, 검토 가능한 실행 기록, 민감한 단계에서의 직접 개입, 개별 핑거프린트 및 출구 IP 설정을 지원해 여러 계정을 독립적으로 동시에 운영할 수 있습니다." },
      { q: "여러 계정을 동시에 운영하면 플랫폼이 서로 연관 짓나요?", a: "계정마다 별도의 브라우저 핑거프린트와 출구 IP를 사용할 수 있습니다. IP 풀을 전환할 수 있고 세션은 서로 분리됩니다. 핑거프린트 템플릿을 복제해 일괄 적용하고 여러 스토어와 계정을 병렬로 운영할 수 있습니다." },
      { q: "어떤 운영체제를 지원하고 비용은 얼마인가요?", a: "macOS 13 이상과 Windows 10 / 11 이상을 지원합니다. 공개 베타 기간에는 모든 기능이 무료입니다. 설치 후 시스템 안내에 따라 권한을 허용하고 제어판에 첫 작업을 자연어로 입력하세요." },
      { q: "스텔스 브라우저란 무엇인가요? WebCross도 해당하나요?", a: "스텔스 브라우저는 계정별로 브라우저 핑거프린트를 구성해 출구 IP, 시간대, 언어, 기기 특성이 자연스럽게 일치하도록 하고 계정 간 환경을 분리합니다. WebCross는 인스턴스별로 핑거프린트와 출구 IP를 설정하고 사람과 유사한 마우스·키보드 입력으로 페이지를 조작합니다. 보호 기능을 무력화하거나 플랫폼 규칙을 우회할 수 있다고 보장하지 않습니다." },
    ],
    firstTitle: "첫 작업은 상품 목록에서 시작하세요",
    firstText: "처음부터 복잡한 시스템을 만들 필요는 없습니다. 오늘 끝내야 할 작업을 하나 고르고 과정과 결과를 확인한 뒤 재사용할 단계를 결정하세요.",
    firstSteps: ["WebCross 다운로드 및 실행", "익숙한 에이전트 연결", "상품 목록과 확인 기준 입력", "결과를 확인하고 재사용할 단계 저장"],
  },
  closing: { title: "반복되는 웹 업무는 WebCross에 맡기고", titleAccent: "중요한 일에 집중하세요", description: "WebCross를 다운로드하고 바로 써 보세요.", secondary: "3분 사용 가이드" },
  tech: {
    title: "WebCross의 작동 방식",
    description: "기술 평가를 위해 에이전트, 브라우저, 워크플로 실행이 맡는 역할과 데이터 흐름, 성능 측정 방법을 설명합니다. 홈페이지에서는 작업과 결과를 소개합니다.",
    back: "제품 홈페이지로 돌아가기",
    architectureTitle: "기능별 역할을 나누어 살펴봅니다.",
    architecture: [
      { title: "에이전트 / 작성 도구", text: "작업을 이해하고 판단합니다. 지원되는 도구에서 워크플로를 작성, 디버깅 및 저장합니다.", items: ["작업 분해 및 의사 결정", "결과 분석 및 예외 판단", "워크플로 작성 경험은 도구마다 다름"] },
      { title: "WebCross", text: "브라우저 전체 제어, 독립 인스턴스, 페이지 관측, 저장된 워크플로 실행을 지원합니다.", items: ["페이지 읽기 및 브라우저 조작", "백그라운드 인스턴스와 사용자 개입", "워크플로 실행 및 실행 기록"] },
      { title: "대상 사이트와 플랫폼", text: "페이지 상태, 작업 응답과 인증 요건을 반환합니다. 최종 결과는 플랫폼의 실제 응답에 따릅니다.", items: ["로그인 상태와 페이지 응답", "제출 처리와 심사 상태", "인증 코드 및 권한 요구 사항"] },
    ],
    engineTitle: "Chromium 포크와 페이지 이해를 실행 계층에 배치합니다.",
    engineDescription: "WebCross는 브라우저 실행 계층에서 페이지를 관측하고 조작해 외부 어댑터 단계를 줄입니다. 여기서는 구조와 역할을 설명하며 동일 조건에서 측정하지 않은 밀리초나 속도 배수는 비교에 사용하지 않습니다.",
    engineLayers: [{ title: "에이전트 명령", text: "클릭, 입력, 읽기 또는 워크플로 단계" }, { title: "WebCross 실행 계층", text: "페이지 관측, 대상 찾기, 작업 실행과 상태 기록" }, { title: "브라우저 페이지", text: "렌더링 결과, 컨트롤 상태와 플랫폼 응답" }],
    observationTitle: "한 번 관측해 페이지 범위와 컨트롤 상태를 보존합니다.",
    observationText: "페이지 개요에서 보이는 내용, 컨트롤과 관계를 확인할 수 있습니다. 변경 내용을 표시하고 필요할 때 요소 세부 정보를 펼칩니다. 위치를 찾는 것과 조작 가능한 것은 별개이며, 표시 여부와 상태를 각각 보여 줍니다.",
    flowTitle: "한 작업의 데이터 흐름",
    flowDescription: "에이전트가 지시를 이해하고 WebCross가 로컬 브라우저를 조작합니다. 필요한 페이지 정보는 선택한 모델 서비스로 전송될 수 있습니다. 구체적인 항목과 범위는 실제 연결 방식과 버전에 따릅니다.",
    flow: [{ title: "사용자의 지시와 자료", text: "상품 목록, 대상 사이트, 계정 인스턴스와 작업 요건" }, { title: "에이전트 이해 및 계획", text: "페이지 작업을 선택하고 필요하면 사용자 개입 요청" }, { title: "WebCross 실행", text: "페이지를 읽고 브라우저를 조작하거나 워크플로를 연속 실행" }, { title: "플랫폼 응답과 결과", text: "플랫폼 응답, 완료 항목과 예외 저장" }],
    workflowTitle: "작성과 재사용의 비용을 각각 측정합니다.",
    workflowDescription: "처음 페이지를 탐색해 워크플로를 만드는 비용과 저장된 워크플로를 실행하는 비용은 다릅니다. 재사용하면 반복 탐색은 줄어들지만 토큰이나 시간 절약률은 일정하지 않습니다.",
    workflowStages: [{ title: "작성", text: "페이지를 탐색하고 단계를 작성·검증해 패키지를 저장합니다. 전체 모델 호출 횟수와 사람의 작업량을 기록합니다." }, { title: "실행", text: "새 입력을 읽고 WebCross가 정해진 단계를 연속 실행합니다. 판단이 필요한 부분은 에이전트에 맡깁니다." }, { title: "결과", text: "완료 항목, 예외, 플랫폼 응답과 실행 기록을 남깁니다. 실제 업무 결과는 실행 성공 여부와 별도로 확인합니다." }],
    recordsTitle: "실행 기록으로 확인할 수 있는 내용",
    recordsDescription: "실행 기록은 검토하고 되짚어 보는 데 사용합니다.",
    records: ["어떤 인스턴스, 계정, 페이지에서 실행했는지", "어떤 작업을 했고 입력과 결과의 요약은 무엇인지", "플랫폼 응답이 처리 중, 성공, 오류 중 무엇이었는지", "사람이 어디에서 개입했고 이후 어떻게 이어갔는지", "이번에 워크플로를 새로 작성했는지 재사용했는지"],
    benchmarkTitle: "성능을 비교하기 전에 원본 기록을 남깁니다.",
    benchmarkDescription: "아래는 평가 표의 예시입니다. 정식 데이터는 같은 작업과 계정 조건을 적용하고 버전을 명시한 검증 가능한 기록에서 얻습니다.",
    benchmarkHeaders: ["지표", "작성 / 첫 실행", "재사용 실행", "함께 기록할 항목"],
    benchmarkRows: [["작업 전체 소요 시간", "측정 예정", "측정 예정", "측정 시작·종료 지점, 기기, 네트워크, 페이지 상태"], ["모델 토큰 사용량", "측정 예정", "측정 예정", "입력, 출력, 캐시 읽기 및 쓰기"], ["모델 호출 횟수", "측정 예정", "측정 예정", "에이전트, 모델, 워크플로 버전"], ["작업 결과", "측정 예정", "측정 예정", "플랫폼 응답, 완료 항목, 예외"], ["사용자 개입", "측정 예정", "측정 예정", "개입 이유, 횟수, 대기 시간"]],
    benchmarkNote: "페이지 조작 한 번의 지연과 전체 작업 시간은 별개입니다. 과거 페이지의 속도 배수나 토큰 비율은 원본 실행 기록을 확인할 수 있을 때만 사용합니다.",
    dataTitle: "서비스별로 데이터 처리 범위를 설명합니다.",
    dataDescription: "로컬 브라우저, 모델 서비스, WebCross에서 제공할 수 있는 온라인 서비스는 데이터 처리 방식이 다릅니다.",
    data: [{ title: "로컬 브라우저", text: "계정 세션과 브라우저 저장소는 기기에 보관됩니다. 독립 인스턴스로 계정과 작업을 분리합니다." }, { title: "선택한 에이전트 / 모델", text: "클라우드 AI가 작업에 필요한 페이지 정보를 받을 수 있습니다. 범위는 연결 방법, 도구 호출 및 모델 제공업체에 따라 달라집니다." }, { title: "프록시와 대상 플랫폼", text: "네트워크 출구는 설정한 프록시에 따라 결정됩니다. 제출 내용, 로그인, 업무 결과는 대상 플랫폼이 처리합니다." }],
  },
};

const copies: Record<Locale, HomeCopy> = { zh, en, ja, ko };
export function getHomeCopy(locale: Locale): HomeCopy {
  return copies[locale];
}
