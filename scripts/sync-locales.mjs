/**
 * Rebuild en / ja / ko from zh.json so every catalog has an identical shape
 * (Messages is typed as `typeof zh`, so a missing or mistyped key breaks the build).
 *
 * Order of precedence for each leaf:
 *   1. this locale's override below
 *   2. the value already translated in the existing locale file, if the path
 *      still exists with the same type / array length
 *   3. the zh value, as a visible "not translated yet" marker
 *
 * Run: node scripts/sync-locales.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = resolve(dirname(fileURLToPath(import.meta.url)), "../src/messages");
const read = (name) => JSON.parse(readFileSync(resolve(DIR, `${name}.json`), "utf8"));

const zh = read("zh");

/* -------------------------------------------------------------------------
 * The simulated browser panes reproduce Amazon / X / Reddit, which are English
 * products — so every non-Chinese locale shares one English copy of that mock.
 * ---------------------------------------------------------------------- */
const MOCK_EN = {
  "product.demo.scenes.A.browser.searchPlaceholder": "Search Amazon",
  "product.demo.scenes.A.browser.deliverTo": "Deliver to Phoenix 85034",
  "product.demo.scenes.A.browser.resultsMeta": "1-16 of over 40,000 results for power bank",
  "product.demo.scenes.A.browser.sortLabel": "Sort by: Featured",
  "product.demo.scenes.A.browser.filterTitle": "Filters",
  "product.demo.scenes.A.browser.filters": ["High capacity", "USB-C", "Wireless", "Fast charging", "Built-in cable"],
  "product.demo.scenes.A.browser.results.0.title": "INIU 45W Fast Charging Portable Charger 10000mAh, built-in USB-C cable, flight safe",
  "product.demo.scenes.A.browser.results.0.bought": "10K+ bought in past month",
  "product.demo.scenes.A.browser.results.0.deal": "Limited time deal",
  "product.demo.scenes.A.browser.results.1.title": "Anker Power Bank 20,000mAh, built-in USB-C cable, 1 USB-C and 1 USB-A port",
  "product.demo.scenes.A.browser.results.1.bought": "10K+ bought in past month",
  "product.demo.scenes.A.browser.results.2.title": "Magnetic Portable Charger 10000mAh, 20W USB-C MagSafe battery pack",
  "product.demo.scenes.A.browser.results.2.bought": "2K+ bought in past month",
  "product.demo.scenes.A.browser.pdp.crumb": "Electronics › Computer Accessories › Power Banks",
  "product.demo.scenes.A.browser.pdp.reviews": "84,812 ratings",
  "product.demo.scenes.A.browser.pdp.bought": "10K+ bought in past month",
  "product.demo.scenes.A.browser.pdp.deal": "Limited time deal",
  "product.demo.scenes.A.browser.pdp.shipping": "FREE delivery for Prime members",
  "product.demo.scenes.A.browser.pdp.cart": "Add to Cart",
  "product.demo.scenes.A.browser.pdp.buy": "Buy Now",
  "product.demo.scenes.A.browser.pdp.reviewsAnchor": "See all reviews",
  "product.demo.scenes.A.browser.reviews.title": "Customer reviews",
  "product.demo.scenes.A.browser.reviews.scoreLabel": "out of 5",
  "product.demo.scenes.A.browser.reviews.total": "475 global ratings",
  "product.demo.scenes.A.browser.reviews.histogram": [
    ["5 star", "73%", 73],
    ["4 star", "11%", 11],
    ["3 star", "3%", 3],
    ["2 star", "2%", 2],
    ["1 star", "11%", 11],
  ],
  "product.demo.scenes.A.browser.reviews.filterLabel": "Filtered: 1–2 star reviews",
  "product.demo.scenes.A.browser.reviews.items.0.title": "Capacity is overstated",
  "product.demo.scenes.A.browser.reviews.items.0.body": "Rated 10000mAh but it only tops my phone up 1.5 times — nowhere near the listing.",
  "product.demo.scenes.A.browser.reviews.items.1.title": "Stopped charging after two weeks",
  "product.demo.scenes.A.browser.reviews.items.1.body": "Fine at first, then the LED stayed on and it would not take a charge. Support was slow.",
  "product.demo.scenes.A.browser.reviews.items.2.title": "Fast charge only on some phones",
  "product.demo.scenes.A.browser.reviews.items.2.body": "Advertised 45W, but only the bundled cable on one model hits it. Everything else is plain 18W.",
  "product.demo.scenes.A.browser.reviews.items.3.title": "Gets hot",
  "product.demo.scenes.A.browser.reviews.items.3.body": "Noticeably warm while charging and using at the same time; build quality is rougher than the photos.",
  "product.demo.scenes.A.browser.capture.title": "Captured",
  "product.demo.scenes.A.browser.capture.reviewLabel": "bad reviews scraped",
  "product.demo.scenes.A.browser.capture.doneTitle": "Written locally",
  "product.demo.scenes.A.browser.capture.doneMeta": "30 products · 900 bad reviews · 100% on-device",
  "product.demo.scenes.B.browser.path": "Catalog › Add Products",
  "product.demo.scenes.B.browser.tabs": ["Vital info", "Description", "Images", "Keywords"],
  "product.demo.scenes.B.browser.nameLabel": "Product name",
  "product.demo.scenes.B.browser.nameValue": "Mophie Powerstation 20000mAh Black",
  "product.demo.scenes.B.browser.brandLabel": "Brand",
  "product.demo.scenes.B.browser.brandPlaceholder": "Select a brand",
  "product.demo.scenes.B.browser.categoryLabel": "Category",
  "product.demo.scenes.B.browser.categoryPlaceholder": "Select a category",
  "product.demo.scenes.B.browser.priceLabel": "Price (USD)",
  "product.demo.scenes.B.browser.stockLabel": "Quantity",
  "product.demo.scenes.B.browser.uploadLabel": "Drop or click to upload the main image",
  "product.demo.scenes.B.browser.uploadHint": "JPG / PNG · 1600×1600 recommended",
  "product.demo.scenes.B.browser.submitLabel": "Submit listing",
  "product.demo.scenes.B.browser.submitting": "Submitting…",
  "product.demo.scenes.B.browser.success": "Listing created",
  "product.demo.scenes.B.browser.successMeta": "SKU MPH-PS20000-BLK queued for review",
  "product.demo.scenes.B.browser.queueLabel": "SKUs left in batch",
  "product.demo.scenes.C.browser.actions": {
    like: "Like",
    repost: "Repost",
    comment: "Comment",
    reply: "Reply",
    replyPlaceholder: "Post your reply",
    posted: "Posted",
  },
  "product.demo.scenes.C.browser.x.tabs": ["Top", "Latest", "People", "Media"],
  "product.demo.scenes.C.browser.x.posts.0.time": "12m",
  "product.demo.scenes.C.browser.x.posts.0.body": "Pulled 200 competitor reviews with WebCross, found three recurring complaints, wrote the report in 10 minutes.",
  "product.demo.scenes.C.browser.x.posts.1.time": "27m",
  "product.demo.scenes.C.browser.x.posts.1.body": "Our Amazon research used to take two interns a full day of copy-paste. With WebCross it is 30 minutes.",
  "product.demo.scenes.C.browser.x.posts.2.user": "Kai",
  "product.demo.scenes.C.browser.x.posts.2.time": "1h",
  "product.demo.scenes.C.browser.x.posts.2.body": "One scrape across every platform, engagement data exported straight to a sheet. No more stitching weekly reports by hand.",
  "product.demo.scenes.C.browser.x.posts.3.time": "2h",
  "product.demo.scenes.C.browser.x.posts.3.body": "Fingerprint switching plus the IP pool is the real win — multi-account work finally feels safe.",
  "product.demo.scenes.C.browser.x.posts.0.user": "Zian Lin",
  "product.demo.scenes.C.browser.x.reply": "Same here — we handed price patrol to WebCross too. Runs fully local, nothing leaves the machine 👏",
  "product.demo.scenes.C.browser.reddit.posts.0.time": "6h",
  "product.demo.scenes.C.browser.reddit.posts.1.time": "9h",
  "product.demo.scenes.C.browser.reddit.posts.2.time": "13h",
  "product.demo.scenes.C.browser.archive.title": "Archived",
  "product.demo.scenes.C.browser.archive.meta": "30 posts · engagement data and replies written locally",
  "product.demo.scenes.C.browser.archive.fields": ["Platform", "Author", "Body", "Likes", "Comments", "Reposts", "Engaged"],
  "product.demo.scenes.C.browser.archive.progressLabel": "Capture progress",
};

const EN = {
  ...MOCK_EN,
  "product.thesisBrand": "WebCross",
  "product.thesisLead": "helps your agent",
  "product.thesisRest": "finish the tedious web work",
  "product.assurances": ["Yes — every feature is free during the public beta", "Local-first, nothing leaves your machine"],
  "product.demo.badge": "LIVE DEMO",
  "product.demo.scrollHint": "Keep scrolling to walk through all three tasks",
  "product.demo.clientTitle": "WebCross · Agent",
  "product.demo.taskLabel": "Original task",
  "product.demo.runLabel": "Run task",
  "product.demo.logLabel": "Execution trace",
  "product.demo.statusRunning": "Running",
  "product.demo.statusDone": "Done",
  "product.demo.scenes.A.steps": [
    "Open amazon.com",
    "Type power bank into search",
    "Click the search button",
    "Click the first result",
    "Land on the product page",
    "Capture url / title / price / rating",
    "Scrape the first 30 bad reviews",
    "Compile and write locally",
  ],
  "product.demo.scenes.B.steps": [
    "Open Seller Central",
    "Enter the Add Products flow",
    "Fill in the product name",
    "Open the brand dropdown and select",
    "Pick the category",
    "Enter price and quantity",
    "Upload the main image",
    "Submit and confirm the listing",
  ],
  "product.demo.scenes.C.steps": [
    "Open x.com and search #WebCross",
    "Scroll the feed like a human",
    "Open a post for detail",
    "Like it and post a reply",
    "Switch over to reddit.com",
    "Browse the r/automation hot posts",
    "Capture posts and engagement data",
    "Archive to a local spreadsheet",
  ],
  "product.features.badge": "PRODUCT",
  "product.features.items.0.eyebrow": "Kernel-level build",
  "product.features.items.0.bullets": [
    "Marketplaces such as Amazon, where fingerprint and IP are policed hard",
    "SaaS platforms and internal enterprise systems",
    "Social media, several accounts in parallel",
  ],
  "product.features.items.1.eyebrow": "AXTree extraction",
  "product.features.items.1.bullets": [
    "Cuts page context by ~85% on average",
    "Reads cross-origin iframes and Shadow DOM alike",
    "Shorter context means lower latency and steadier decisions",
  ],
  "product.features.items.2.eyebrow": "Data sovereignty",
  "product.features.items.2.bullets": [
    "Credentials and cookies never leave the machine",
    "Execution logs stay local, auditable and replayable",
    "Tasks keep running with no network at all",
  ],
  "product.features.items.3.eyebrow": "Account safety",
  "product.features.items.3.bullets": [
    "One fingerprint and exit IP per instance",
    "Sessions stay isolated across concurrent accounts",
    "Fingerprint templates can be cloned and rolled out in bulk",
  ],
  "product.features.items.4.eyebrow": "Skill distillation",
  "product.features.items.4.bullets": [
    "The very first run produces a reusable Skill",
    "Reuse skips page discovery and jumps to the key steps",
    "Skills and workflows are stored locally",
  ],
  "product.features.items.5.eyebrow": "Human in the loop",
  "product.features.items.5.bullets": [
    "Raised in milliseconds without pausing other tasks",
    "Resumes from the exact breakpoint once verified",
    "Handoff records stay on-device too",
  ],
  "product.comparison.dimensionHead": "Dimension",
  "product.comparison.legendYes": "Supported",
  "product.comparison.legendNo": "Not supported",
  "product.closing.title": "Put your agent to work today",
  "product.closing.sub": "Download WebCross and try a genuinely local agent browser.",
};

const JA = {
  ...MOCK_EN,
  "product.thesisBrand": "WebCross",
  "product.thesisLead": "があなたのエージェントを支援し",
  "product.thesisRest": "煩雑なウェブ作業を完了させます",
  "product.assurances": ["はい、公開ベータ期間中は全機能が無料です", "ローカル優先、データは端末から出ません"],
  "product.demo.badge": "LIVE DEMO",
  "product.demo.scrollHint": "スクロールすると 3 つのタスクを順に確認できます",
  "product.demo.clientTitle": "WebCross · Agent",
  "product.demo.taskLabel": "元のタスク",
  "product.demo.runLabel": "タスクを実行",
  "product.demo.logLabel": "実行トレース",
  "product.demo.statusRunning": "実行中",
  "product.demo.statusDone": "完了",
  "product.demo.scenes.A.steps": [
    "amazon.com を開く",
    "検索欄に power bank を入力",
    "検索ボタンをクリック",
    "検索結果の 1 件目をクリック",
    "商品詳細ページへ移動",
    "url / title / price / rating を取得",
    "低評価レビュー上位 30 件を取得",
    "整理してローカルに保存",
  ],
  "product.demo.scenes.B.steps": [
    "Seller Central を開く",
    "Add Products フローに入る",
    "商品名を入力",
    "ブランドのプルダウンを開いて選択",
    "商品カテゴリを選択",
    "価格と在庫数を入力",
    "メイン画像をアップロード",
    "送信して出品完了を確認",
  ],
  "product.demo.scenes.C.steps": [
    "x.com で #WebCross を検索",
    "人間のようにスクロール",
    "投稿を開いて詳細を確認",
    "いいねして返信を投稿",
    "reddit.com に切り替え",
    "r/automation の人気投稿を閲覧",
    "投稿とエンゲージメントを収集",
    "ローカルの表に保存",
  ],
  "product.features.badge": "PRODUCT",
  "product.features.items.0.eyebrow": "カーネルレベルの独自実装",
  "product.features.items.1.eyebrow": "AXTree 抽出",
  "product.features.items.2.eyebrow": "データ主権",
  "product.features.items.3.eyebrow": "アカウント安全性",
  "product.features.items.4.eyebrow": "Skill の蓄積",
  "product.features.items.5.eyebrow": "人との協調",
  "product.comparison.dimensionHead": "評価項目",
  "product.comparison.legendYes": "対応",
  "product.comparison.legendNo": "非対応",
  "product.closing.title": "今日からエージェントに働いてもらいましょう",
  "product.closing.sub": "WebCross をダウンロードして、真にローカルなエージェントブラウザを体験してください。",
};

const KO = {
  ...MOCK_EN,
  "product.thesisBrand": "WebCross",
  "product.thesisLead": "가 여러분의 에이전트를 도와",
  "product.thesisRest": "번거로운 웹 작업을 완료합니다",
  "product.assurances": ["네, 공개 베타 기간에는 모든 기능이 무료입니다", "로컬 우선, 데이터는 기기를 벗어나지 않습니다"],
  "product.demo.badge": "LIVE DEMO",
  "product.demo.scrollHint": "계속 스크롤하면 세 가지 작업을 차례로 볼 수 있습니다",
  "product.demo.clientTitle": "WebCross · Agent",
  "product.demo.taskLabel": "원본 작업",
  "product.demo.runLabel": "작업 실행",
  "product.demo.logLabel": "실행 기록",
  "product.demo.statusRunning": "실행 중",
  "product.demo.statusDone": "완료",
  "product.demo.scenes.A.steps": [
    "amazon.com 열기",
    "검색창에 power bank 입력",
    "검색 버튼 클릭",
    "결과 첫 번째 상품 클릭",
    "상품 상세 페이지 진입",
    "url / title / price / rating 수집",
    "낮은 평점 리뷰 30건 수집",
    "정리해 로컬에 저장",
  ],
  "product.demo.scenes.B.steps": [
    "Seller Central 열기",
    "Add Products 절차 진입",
    "상품명 입력",
    "브랜드 드롭다운 열고 선택",
    "상품 카테고리 선택",
    "가격과 재고 입력",
    "대표 이미지 업로드",
    "제출 후 등록 완료 확인",
  ],
  "product.demo.scenes.C.steps": [
    "x.com에서 #WebCross 검색",
    "사람처럼 피드 스크롤",
    "게시물 열어 상세 확인",
    "좋아요 누르고 댓글 작성",
    "reddit.com으로 전환",
    "r/automation 인기 글 탐색",
    "게시물과 반응 데이터 수집",
    "로컬 표로 보관",
  ],
  "product.features.badge": "PRODUCT",
  "product.features.items.0.eyebrow": "커널 수준 커스터마이징",
  "product.features.items.1.eyebrow": "AXTree 추출",
  "product.features.items.2.eyebrow": "데이터 주권",
  "product.features.items.3.eyebrow": "계정 보안",
  "product.features.items.4.eyebrow": "Skill 축적",
  "product.features.items.5.eyebrow": "사람과의 협업",
  "product.comparison.dimensionHead": "평가 항목",
  "product.comparison.legendYes": "지원",
  "product.comparison.legendNo": "미지원",
  "product.closing.title": "오늘부터 에이전트에게 일을 맡기세요",
  "product.closing.sub": "WebCross를 내려받아 진짜 로컬 에이전트 브라우저를 경험해 보세요.",
};

/** zh shape + previously translated leaves where the path still lines up. */
function reshape(template, previous) {
  if (Array.isArray(template)) {
    if (Array.isArray(previous) && previous.length === template.length) {
      return template.map((item, i) => reshape(item, previous[i]));
    }
    return structuredClone(template);
  }
  if (template !== null && typeof template === "object") {
    const out = {};
    const from = previous !== null && typeof previous === "object" && !Array.isArray(previous) ? previous : {};
    for (const key of Object.keys(template)) out[key] = reshape(template[key], from[key]);
    return out;
  }
  return typeof previous === typeof template && previous !== undefined ? previous : template;
}

function setPath(target, path, value) {
  const keys = path.split(".");
  let node = target;
  for (const key of keys.slice(0, -1)) {
    if (node[key] === undefined) throw new Error(`missing path segment: ${path} (${key})`);
    node = node[key];
  }
  const last = keys.at(-1);
  if (node[last] === undefined) throw new Error(`missing leaf: ${path}`);
  node[last] = structuredClone(value);
}

for (const [name, overrides] of [
  ["en", EN],
  ["ja", JA],
  ["ko", KO],
]) {
  const merged = reshape(zh, read(name));
  for (const [path, value] of Object.entries(overrides)) setPath(merged, path, value);
  writeFileSync(resolve(DIR, `${name}.json`), `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`✓ ${name}.json rebuilt (${Object.keys(overrides).length} overrides)`);
}
