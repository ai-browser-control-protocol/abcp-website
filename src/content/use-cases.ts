import type { Locale } from "./types";

export const categories = ["commerce", "social", "data", "marketing", "career"] as const;
export type CaseCategory = (typeof categories)[number];
type CaseText = readonly [title: string, summary: string, prompt: string];

interface CaseEntry {
  slug: string;
  category: CaseCategory;
  icon: "indigo" | "aqua" | "coral" | "amber" | "azure" | readonly string[];
  text: Record<Locale, CaseText>;
}

const entries = [
  {
    slug: "amazon-listing", category: "commerce", icon: ["amazon"],
    text: {
      zh: ["Amazon Listing 上架", "在 Amazon 卖家后台按颜色建立父子变体，检查图片和必填项，确认后提交上架。", "用这份 SKU 表、五点描述和主图在 Amazon 创建保温杯 Listing，把不同颜色归到同一父体。先给我看草稿和缺图的 SKU，确认后提交资料齐全的变体。"],
      en: ["Publish an Amazon listing", "Build colour variants in Amazon Seller Central, check required details and images, then submit the reviewed listing.", "Use this SKU sheet, bullet points and photos to draft a bottle listing on Amazon. Group the colours under one parent, flag missing photos and submit the complete variants after I review them."],
      ja: ["Amazon の商品登録", "Amazon の出品画面で色違いを親子商品にまとめ、画像と必須項目を確認して出品します。", "SKU 表、箇条書きの商品説明、写真を使って、Amazon にボトルの出品下書きを作って。色違いは同じ親商品にまとめ、画像がない SKU を一覧にして。私が確認したら、資料がそろったものを出品して。"],
      ko: ["Amazon 상품 등록", "Amazon 판매자 센터에서 색상 옵션을 상위 상품 하나로 묶고, 이미지와 필수 항목을 검토한 뒤 등록합니다.", "SKU 표와 상품 설명, 사진으로 Amazon 텀블러 상품 초안을 만들어줘. 색상별 옵션을 상위 상품 하나에 묶고 사진이 빠진 SKU를 표시해줘. 내가 확인하면 자료가 갖춰진 옵션을 등록해줘."],
    },
  },
  {
    slug: "trending-topics", category: "social", icon: ["reddit"],
    text: {
      zh: ["追踪 Reddit 热点", "每天记录 Reddit 帖子的得分和评论数，找出讨论升温的话题，整理成带原帖链接的选题表。", "这周每天看一次 Reddit 上关于小户型收纳的帖子，记下得分和评论数。按评论增量选出升温最快的三个话题，每个附一条代表性观点和原帖链接。"],
      en: ["Track Reddit trends", "Track Reddit post scores and comments over time to find rising topics, with links for your editorial calendar.", "Check Reddit daily this week for small-space storage posts. Record scores and comment counts, then list the three topics with the largest comment gains. Include a representative viewpoint and original link for each."],
      ja: ["Reddit の話題を追う", "Reddit の投稿スコアとコメント数を日ごとに記録し、議論が伸びている話題と元投稿を企画表にまとめます。", "今週は毎日 Reddit で狭い部屋の収納に関する投稿を調べ、スコアとコメント数を記録して。コメントの増加が大きい話題を三つ選び、それぞれ代表的な意見と元投稿のリンクを付けて。"],
      ko: ["Reddit 인기 주제 추적", "Reddit 게시물 점수와 댓글 수를 매일 비교해 반응이 늘어나는 주제를 원문 링크와 함께 기획표에 담습니다.", "이번 주 Reddit에서 작은 집 수납에 관한 게시물의 점수와 댓글 수를 매일 기록해줘. 댓글이 가장 많이 늘어난 주제 세 개를 골라 각각 대표 의견과 원문 링크를 붙여줘."],
    },
  },
  {
    slug: "search-results", category: "data", icon: ["google", "bing"],
    text: {
      zh: ["采集搜索结果", "按关键词收集 Google、Bing 的自然搜索结果，保留排名、标题和来源。", "分别查这十个关键词在 Google 和 Bing 的前十条自然搜索结果，把搜索引擎、关键词、排名、标题和网址导出为 CSV。"],
      en: ["Collect search results", "Capture organic Google and Bing results with their rank, title and source URL.", "Look up these ten keywords on Google and Bing. Export each engine’s first ten organic results per keyword to a CSV with engine, keyword, rank, title and URL."],
      ja: ["検索結果を収集", "Google と Bing の自然検索結果を順位、見出し、URL とともに記録。", "この十個のキーワードを Google と Bing で検索し、それぞれ自然検索の上位十件を CSV にして。検索サービス名、キーワード、順位、タイトル、URL を入れて。"],
      ko: ["검색 결과 수집", "Google과 Bing의 자연 검색 순위, 제목, 출처 URL을 정리합니다.", "이 키워드 열 개를 Google과 Bing에서 각각 검색해 자연 검색 상위 열 건을 CSV로 만들어줘. 검색 엔진, 키워드, 순위, 제목, URL을 담아줘."],
    },
  },
  {
    slug: "facebook-ad-accounts", category: "marketing", icon: ["facebook"],
    text: {
      zh: ["批量巡检 Facebook 广告账号", "逐个核对广告账号的花费、投放状态和预算余量，汇总需要处理的异常。", "检查我管理的 Facebook 广告账号，按账号列出昨天的花费、投放状态和剩余预算。把有花费却没有转化的广告组单独标出，附后台链接。"],
      en: ["Review Facebook ad accounts", "Compare spend, delivery status and remaining budget across your ad accounts.", "Review yesterday’s spend, delivery status and remaining budget across my Facebook ad accounts. Flag ad sets with spend but no conversions and include dashboard links."],
      ja: ["Facebook 広告を一括点検", "複数アカウントの消化額、配信状況、残予算を一つの表に。", "私の Facebook 広告アカウントごとに昨日の消化額、配信状況、残予算をまとめて。支出があり成果がゼロの広告セットに管理画面のリンクを付けて。"],
      ko: ["Facebook 광고 계정 일괄 점검", "여러 계정의 지출, 게재 상태, 잔여 예산을 한 번에 비교합니다.", "내 Facebook 광고 계정별로 어제 지출, 게재 상태, 잔여 예산을 정리해줘. 지출이 있지만 전환이 없는 광고 세트를 표시하고 관리 화면 링크를 붙여줘."],
    },
  },
  {
    slug: "job-applications", category: "career", icon: ["boss"],
    text: {
      zh: ["自动申请匹配的职位", "在 BOSS直聘按城市和岗位要求筛选职位，向匹配的招聘者打招呼，并记录简历投递进度。", "在 BOSS直聘找上海的产品设计岗，按这份简历筛出符合经验要求的职位。把职位和开场白给我核对，确认后逐个打招呼。对方接受简历后发送附件，记录各职位的进度。"],
      en: ["Apply to matching jobs", "Find roles on BOSS Zhipin by location and requirements, contact the relevant recruiters and track résumé submissions.", "Find product design jobs in Shanghai on BOSS Zhipin that match my résumé. Show me the roles and opening messages. Once I approve, contact the recruiters, send my résumé when accepted and log progress per role."],
      ja: ["条件に合う求人へ応募", "BOSS直聘で勤務地と条件に合う求人を選び、採用担当者への連絡から履歴書の送付まで記録します。", "BOSS直聘で私の経験に合う上海のプロダクトデザイン職を探し、求人と最初のメッセージ案を見せて。確認後に連絡し、相手が受け取りに同意したら履歴書を送り、求人別に進捗を記録して。"],
      ko: ["조건에 맞는 채용 공고 지원", "BOSS直聘에서 지역과 경력에 맞는 공고를 골라 채용 담당자에게 연락하고 이력서 제출 현황을 기록합니다.", "BOSS直聘에서 내 이력과 맞는 상하이 제품 디자인 공고를 찾아 첫 인사 초안과 함께 보여줘. 내가 확인하면 담당자에게 연락하고, 상대가 수락하면 이력서를 보내 공고별 진행 상황을 기록해줘."],
    },
  },
  {
    slug: "taobao-listing", category: "commerce", icon: ["taobao"],
    text: {
      zh: ["淘宝商品上架", "把商品资料和图片按款号整理成淘宝上架草稿，核对尺码、颜色和面料等必填属性。", "用这份春装资料和图片在淘宝按款号建草稿，照尺码表填好颜色和尺码。列出缺面料成分的款号，其余款式等我确认后上架。"],
      en: ["List products on Taobao", "Prepare Taobao listings from supplier attributes, size charts and photos, flagging missing fields.", "Draft this spring collection in Taobao by style number using the photos and size chart. Flag missing fabric details and publish the complete styles after my review."],
      ja: ["淘宝に商品を出品", "仕入れ表の属性、サイズ、写真を商品ページに反映し、入力漏れを確認。", "この春物を淘宝で品番別に下書きして。写真とサイズ表を反映し、素材が不明な品番を知らせて。そろったものは私の確認後に出品して。"],
      ko: ["타오바오 상품 등록", "공급 목록의 속성, 사이즈, 사진을 등록하고 필수 항목 누락을 표시합니다.", "사진과 사이즈표로 타오바오 봄옷 상품 초안을 품번별로 만들어줘. 소재 정보가 빠진 품번을 알려주고 나머지는 내가 확인하면 등록해줘."],
    },
  },
  {
    slug: "industry-news", category: "social", icon: "indigo",
    text: {
      zh: ["抓取行业新闻", "按主题聚合新闻与公告，合并重复报道，保留发布日期和原文链接。", "汇总过去 24 小时的跨境物流新闻和公告，同一事件合成一条，注明发布日期并附最初来源的链接。"],
      en: ["Gather industry news", "Collect news and announcements by topic, merging duplicate coverage and keeping the original dates and links.", "Summarise cross-border logistics news and announcements from the last 24 hours. Merge coverage of the same event and include the publication date and original source link."],
      ja: ["業界ニュースを収集", "ニュースと告知をテーマ別に集め、重複をまとめて掲載日と原文を保存。", "過去24時間の越境物流ニュースと告知をまとめて。同じ出来事は一件にまとめ、掲載日と最初の情報源のリンクを添えて。"],
      ko: ["업계 뉴스 수집", "뉴스와 공지를 주제별로 모아 중복 보도를 합치고 발행일과 출처를 남깁니다.", "지난 24시간의 해외 물류 뉴스와 공지를 모아줘. 같은 사건은 한 건으로 합치고 발행일과 최초 출처 링크를 붙여줘."],
    },
  },
  {
    slug: "property-watch", category: "data", icon: "aqua",
    text: {
      zh: ["跟踪房源与租金变化", "把挂牌房源的租金、面积和位置整理成表，与上次采集结果对比。", "把这份房源清单和上周的记录比一比，只列新增、降租和下架的房源。附位置、面积和原链接，降租的写清原租金和现租金。"],
      en: ["Track rental listings", "Record rents, floor areas and locations, then compare them with the previous collection.", "Compare these rentals with last week’s list. Show new, discounted and removed listings with location, floor area and original link. Include both rents for reductions."],
      ja: ["物件と賃料を追跡", "賃料、面積、所在地を前回の記録と比較。", "この物件リストを先週と比べ、新着、値下げ、掲載終了だけを所在地、面積、元の URL とともに一覧にして。値下げ物件には変更前後の賃料も付けて。"],
      ko: ["매물과 임대료 추적", "임대료, 면적, 위치를 기록하고 지난번 수집 결과와 비교합니다.", "이 매물 목록을 지난주와 비교해 신규, 임대료 인하, 등록 종료 건만 위치, 면적, 원본 링크와 함께 정리해줘. 임대료가 내린 매물은 전후 금액도 적어줘."],
    },
  },
  {
    slug: "google-ads", category: "marketing", icon: ["googleAds"],
    text: {
      zh: ["批量管理 Google Ads 预算", "比较多个 Google Ads 账号的广告系列日预算和转化成本，给出预算调整建议。", "比较这三个 Google Ads 账号最近七天各广告系列的转化成本，列出当前日预算、建议日预算和调整理由，等我确认后再修改。"],
      en: ["Manage Google Ads budgets", "Compare campaign budgets and cost per conversion across accounts and prepare budget changes for review.", "Compare seven days of campaign conversion costs across these three Google Ads accounts. Show current and suggested daily budgets with reasons, then wait for approval before changing them."],
      ja: ["Google Ads の予算管理", "アカウントごとに予算と獲得単価を比較し、変更案を作成。", "この三つの Google Ads アカウントで過去七日間のキャンペーン別獲得単価を比較して。現行と変更案の日予算、提案理由を示し、私の確認後に変更して。"],
      ko: ["Google Ads 예산 일괄 관리", "계정별 캠페인 예산과 전환 비용을 비교하고 검토할 조정안을 만듭니다.", "세 Google Ads 계정의 최근 7일 캠페인별 전환 비용을 비교해줘. 현재 일 예산, 추천 일 예산과 근거를 보여주고 내가 확인하면 변경해줘."],
    },
  },
  {
    slug: "candidate-resumes", category: "career", icon: ["boss"],
    text: {
      zh: ["自动下载应聘者简历", "下载 BOSS直聘招聘会话中已收到的简历附件，按应聘岗位归档，并列出待补的简历。", "从 BOSS直聘本周的设计岗会话中下载已收到的简历，按岗位建文件夹，用姓名和日期命名。给我一张文件索引，并标出还没收到附件的应聘者。"],
      en: ["Download applicant résumés", "Download résumé attachments received in BOSS Zhipin recruiting chats, file them by role and flag missing attachments.", "Download the résumés received in this week’s BOSS Zhipin design-role chats. File them by role, name each by applicant and date, and list the files and applicants still missing an attachment."],
      ja: ["応募者の履歴書を保存", "BOSS直聘の採用チャットに届いた履歴書を職種別に保存し、添付が未着の応募者も一覧にします。", "今週の BOSS直聘 のデザイン職のチャットから届いた履歴書を保存して。職種別に分け、氏名と日付でファイルに名前を付けて。ファイル一覧と添付が未着の応募者を教えて。"],
      ko: ["지원자 이력서 자동 다운로드", "BOSS直聘 채용 대화에서 받은 이력서 파일을 직무별로 정리하고 아직 첨부 파일이 없는 지원자를 표시합니다.", "이번 주 BOSS直聘 디자인 직무 대화에서 받은 이력서를 내려받아 직무별 폴더에 이름과 날짜로 저장해줘. 파일 목록과 아직 첨부 파일이 없는 지원자 명단도 만들어줘."],
    },
  },
  {
    slug: "jd-listing", category: "commerce", icon: ["jd"],
    text: {
      zh: ["京东商品上架", "在京东商家后台按货号填写规格、上传详情图，核对所在类目的必填项后提交商品。", "把这批电器的参数表和详情图按货号录入京东。缺能效等级的先留在草稿里，把填好的商品给我核对后再提交。"],
      en: ["List products on JD", "Map item codes, specifications and detail images to JD listings and check required category fields.", "Create appliance listings in JD from this spec sheet and the detail images. Keep items missing an energy rating in drafts and submit the rest after my review."],
      ja: ["京東に商品を出品", "品番、仕様、詳細画像を登録し、カテゴリごとの必須項目を確認。", "この仕様表と詳細画像を使って京東に家電を登録して。省エネ等級がない品番は下書きに残し、残りは私の確認後に提出して。"],
      ko: ["징둥 상품 등록", "품번, 제품 사양, 상세 이미지를 입력하고 카테고리별 필수 값을 확인합니다.", "사양표와 상세 이미지로 징둥에 가전제품을 품번별로 입력해줘. 에너지 등급이 없는 품번은 초안으로 두고 나머지는 내가 확인하면 제출해줘."],
    },
  },
  {
    slug: "post-comments", category: "social", icon: ["x"],
    text: {
      zh: ["抓取帖子评论", "收集指定 X 帖子的公开回复，按讨论主题整理，保留有代表性的原话和链接。", "帮我整理这条 X 帖子下的公开回复。我想知道大家主要在讨论什么、有哪些不同看法。按话题分组，每组挑一两条有代表性的原话，附上回复链接。"],
      en: ["Collect post comments", "Collect public replies to an X post and group them by topic, with representative quotes and links.", "Read the public replies to this X post. What are people talking about, and where do their views differ? Group the replies by topic and include one or two quotes with links for each."],
      ja: ["投稿のコメントを収集", "指定した X の投稿への公開返信を話題別に整理し、代表的な意見を原文とリンクで残します。", "この X の投稿についた公開返信を読んで、何が話題で、どこで意見が分かれているか整理して。話題ごとに代表的な返信を一、二件選んで、原文とリンクを添えて。"],
      ko: ["게시물 댓글 수집", "지정한 X 게시물의 공개 답글을 주제별로 정리하고 대표 의견을 원문과 링크로 남깁니다.", "이 X 게시물의 공개 답글을 읽고 사람들이 주로 어떤 이야기를 하는지, 어디서 의견이 갈리는지 정리해줘. 주제마다 대표 답글 한두 개를 골라 원문과 링크를 붙여줘."],
    },
  },
  {
    slug: "event-calendar", category: "data", icon: "coral",
    text: {
      zh: ["汇总活动与展会日程", "从多个主办方页面提取日期、地点和报名截止时间，合并重复场次。", "从主办方页面汇总下月上海的设计展，同一场只记一次。按开幕日期排序，附地址、报名截止时间和报名链接。"],
      en: ["Build an event calendar", "Combine dates, venues and registration deadlines from organisers’ pages into one calendar.", "Use organisers’ pages to list next month’s Shanghai design exhibitions once each, ordered by opening date. Include the venue, registration deadline and sign-up link."],
      ja: ["イベント日程を集約", "主催者ページから日時、会場、申込期限を集めて重複を整理。", "主催者ページから来月の上海のデザイン展を集めて。同じ展示は一件にまとめ、開幕日順に会場、申込期限、申込リンクを並べて。"],
      ko: ["행사 일정 수집", "주최 측 페이지에서 일정, 장소, 등록 마감일을 모아 중복을 정리합니다.", "주최 측 페이지에서 다음 달 상하이 디자인 전시회를 모아줘. 중복을 합쳐 개막일순으로 정리하고 장소, 신청 마감일과 신청 링크를 붙여줘."],
    },
  },
  {
    slug: "campaign-report", category: "marketing", icon: ["facebook", "googleAds"],
    text: {
      zh: ["生成跨渠道投放日报", "将 Facebook 与 Google Ads 的花费、转化数和获客成本汇总到同一张日报。", "把昨天 Facebook 和 Google Ads 的花费、转化数和获客成本整理成一张日报。花费统一币种，各渠道与前一天对比，缺转化数据的系列单独标出。"],
      en: ["Build a cross-channel ad report", "Bring Facebook and Google Ads spend, conversions and acquisition costs into one daily report.", "Build yesterday’s Facebook and Google Ads report with spend, conversions and acquisition cost. Use one currency, compare each channel with the previous day and flag campaigns missing conversion data."],
      ja: ["広告日報を作成", "Facebook と Google Ads の費用、獲得数、獲得単価を日報に集約。", "昨日の Facebook と Google Ads の費用、獲得数、獲得単価を日報にして。通貨をそろえて前日と比べ、獲得数のデータがないキャンペーンに印を付けて。"],
      ko: ["채널별 광고 일보 작성", "Facebook과 Google Ads의 지출, 전환, 고객 획득 비용을 한 보고서로 모읍니다.", "어제 Facebook과 Google Ads의 지출, 전환 수, 고객 획득 비용을 일보로 만들어줘. 통화를 통일해 채널별로 전날과 비교하고 전환 데이터가 없는 캠페인을 표시해줘."],
    },
  },
  {
    slug: "candidate-outreach", category: "career", icon: ["linkedin"],
    text: {
      zh: ["主动联系目标候选人", "结合 LinkedIn 候选人的项目经历和岗位职责拟好首条消息，确认后发送并记录联系进度。", "看这三位候选人的 LinkedIn 资料，各选一个与岗位相关的项目，写一条简短的面谈邀请。我确认后逐一发送，在招聘跟进表里记下联系时间和状态。"],
      en: ["Reach out to candidates", "Draft a LinkedIn introduction that connects each candidate’s experience to the role, then log the outreach after approval.", "Read these three LinkedIn profiles and draft an interview invitation for each, mentioning a relevant project. After I approve, send the messages and log the contact time and status."],
      ja: ["候補者へ連絡", "LinkedIn の候補者ごとに経験と職務を結び付けた案内を作り、確認後に送信して連絡状況を記録します。", "この三人の LinkedIn プロフィールを読み、募集職種に関連するプロジェクトを一つ挙げて面談の案内を書いて。私の確認後に送り、連絡日時と状況を記録して。"],
      ko: ["채용 후보자에게 먼저 연락", "LinkedIn 후보자의 프로젝트 경험을 직무와 연결해 첫 메시지를 작성하고, 확인 후 발송 내역을 기록합니다.", "세 후보자의 LinkedIn 프로필에서 이 직무와 관련된 프로젝트를 하나씩 골라 면담 제안을 써줘. 내가 확인하면 각각 발송하고 연락 시간과 상태를 기록해줘."],
    },
  },
  {
    slug: "pinduoduo-listing", category: "commerce", icon: ["pinduoduo"],
    text: {
      zh: ["拼多多商品上架", "在拼多多按规格填写库存、单买价和拼单价，上架前核对每个 SKU 的价格。", "用这份报价和库存表在拼多多创建礼盒商品，每种口味对应一个 SKU。标出拼单价高于单买价的规格，给我核对后再上架。"],
      en: ["List products on Pinduoduo", "Enter individual and group-buy prices by variant and check the price and stock for each SKU.", "Create a Pinduoduo SKU for each gift-box flavour using this price and stock sheet. Flag any group-buy price above the individual price before I approve publication."],
      ja: ["拼多多に商品を出品", "規格ごとに単独購入価格、共同購入価格、在庫を入力。", "この価格・在庫表から拼多多のギフトセットを味別に登録して。共同購入価格が単独購入価格より高い SKU を示し、私の確認後に出品して。"],
      ko: ["핀둬둬 상품 등록", "옵션별 단독 구매가, 공동 구매가, 재고를 입력하고 가격 구성을 확인합니다.", "이 가격·재고표를 바탕으로 핀둬둬 선물 세트를 맛별 SKU로 등록해줘. 공동 구매가가 단독 구매가보다 높은 옵션을 표시하고 내가 확인하면 게시해줘."],
    },
  },
  {
    slug: "direct-message-sync", category: "social", icon: ["whatsapp"],
    text: {
      zh: ["自动同步私信消息", "把 WhatsApp 新收到的私信同步到表格，按会话更新最新消息、收到时间和回复状态。", "把我今天收到的 WhatsApp 私信同步到这张表。同一个会话只保留一行，有新消息就更新内容和时间，再标出哪些会话我还没回复。"],
      en: ["Sync incoming messages", "Sync new WhatsApp direct messages to a sheet, keeping the latest message, time received and reply status for each chat.", "Sync the WhatsApp direct messages I received today to this sheet. Keep one row per chat, update the message and time when a new one arrives, and flag chats I haven’t replied to."],
      ja: ["DM を同期", "WhatsApp で受け取った個別メッセージを表に同期し、チャットごとに最新の内容、受信時刻、返信状況を更新します。", "今日 WhatsApp に届いた個別メッセージをこの表にまとめて。チャットごとに一行だけ使い、新着があれば内容と受信時刻を更新して。まだ私が返信していないチャットに印を付けて。"],
      ko: ["DM 자동 동기화", "WhatsApp에서 받은 개인 메시지를 표에 동기화하고 대화별로 최근 메시지, 수신 시간, 답장 여부를 갱신합니다.", "오늘 내가 받은 WhatsApp 개인 메시지를 이 표에 동기화해줘. 대화마다 한 행만 쓰고 새 메시지가 오면 내용과 수신 시간을 업데이트해줘. 내가 아직 답하지 않은 대화는 표시해줘."],
    },
  },
  {
    slug: "website-tables", category: "data", icon: "aqua",
    text: {
      zh: ["把网页表格整理成 CSV", "从分页目录提取指定列，统一字段名，去重后导出可分析的表格。", "遍历这份供应商目录的所有分页，按「公司、主营品类、官网」三列导出 CSV，同一官网只留一行。"],
      en: ["Turn web tables into CSV", "Extract columns across paginated directories, normalise headers and export deduplicated rows.", "Export company name, main category and website from every page of this supplier directory as a CSV. Keep one row per website."],
      ja: ["Web 表を CSV に変換", "ページをまたぐ表から列を抽出し、見出しと重複を整理。", "仕入先一覧の全ページから会社名、主要カテゴリ、公式サイトを CSV にして。同一サイトは一行にまとめて。"],
      ko: ["웹 표를 CSV로 변환", "여러 페이지의 표에서 열을 추출하고 머리글을 통일해 중복을 제거합니다.", "이 공급업체 목록의 모든 페이지에서 회사명, 주요 품목, 홈페이지를 CSV로 내보내줘. 같은 홈페이지는 한 행만 남겨줘."],
    },
  },
  {
    slug: "stock-pricing", category: "commerce", icon: "amber",
    text: {
      zh: ["跟踪库存与改价", "按 SKU 核对库存和当前售价，根据促销规则生成改价清单，确认后更新并记录前后价格。", "对照这份促销表检查各 SKU 的库存和售价，只列出有货且需要改价的商品。给我看原价和拟改价，确认后更新并记录实际售价。"],
      en: ["Track stock and update prices", "Check stock and current prices by SKU, prepare eligible changes and record the prices applied after approval.", "Compare these SKUs with my promotion sheet. Show the current and proposed prices for in-stock items that need changing. After I approve, update them and log the final prices."],
      ja: ["在庫追跡と価格改定", "SKU 別に在庫と現行価格を確認し、変更案を作成。承認後に価格を更新し、前後の金額を記録します。", "販促価格表と照合し、在庫があり値付けを変える必要がある SKU の現行価格と変更案を見せて。承認後に更新し、反映された金額を記録して。"],
      ko: ["재고 추적 및 가격 변경", "SKU별 재고와 판매가를 대조해 변경안을 만들고, 승인 후 가격을 바꿔 전후 금액을 남깁니다.", "프로모션 표와 대조해 재고가 있고 가격 변경이 필요한 SKU의 현재 가격과 제안 가격을 보여줘. 내가 승인하면 업데이트하고 실제 반영된 가격을 기록해줘."],
    },
  },
  {
    slug: "tiktok-trending-videos", category: "social", icon: ["tiktok"],
    text: {
      zh: ["跟踪 TikTok 热门视频", "按话题记录热门视频的播放量和互动数据，对比每天的变化，找出正在走红的作品。", "每天记录 TikTok 上 #FoodTok 热门视频的播放量和点赞数，按新增播放量列出前五条，附创作者和视频链接。"],
      en: ["Track trending TikTok videos", "Track views and engagement by hashtag and compare daily changes to spot videos gaining traction.", "Record views and likes for trending #FoodTok videos on TikTok each day. List the five with the biggest view gains, with creators and links."],
      ja: ["TikTok の人気動画を追跡", "ハッシュタグ別に再生数と反応を記録し、前日との差から伸びている動画を見つけます。", "TikTok の #FoodTok で人気の動画の再生数といいね数を毎日記録し、再生数の伸びが大きい上位5件に投稿者名とリンクを添えて。"],
      ko: ["TikTok 인기 동영상 추적", "해시태그별 조회 수와 반응을 매일 비교해 인기가 오르는 영상을 찾습니다.", "TikTok의 #FoodTok 인기 영상 조회 수와 좋아요 수를 매일 기록해줘. 조회 수가 가장 많이 늘어난 영상 다섯 개를 게시자 이름과 링크와 함께 정리해줘."],
    },
  },
  {
    slug: "product-specs", category: "data", icon: "azure",
    text: {
      zh: ["对齐产品规格参数", "从不同品牌的产品页提取参数，换算单位，将缺失值和来源一同保留。", "对照这六台显示器的官网规格页整理一张表，亮度统一用 cd/m²，色域写明标准，接口按类型列出。未公布的参数留空，每行附官网链接。"],
      en: ["Compare product specifications", "Extract specs from brand pages, normalise units and preserve source links and missing values.", "Compare these six monitors using manufacturer pages. Give brightness in cd/m², name the colour gamut standard and list the ports. Leave unpublished fields blank and link each source."],
      ja: ["製品仕様を比較", "メーカーの製品ページから仕様を抽出し、単位と出典をそろえる。", "六台のモニターのメーカー仕様表を比べ、輝度は cd/m² にそろえ、色域規格と端子の種類を記入して。未公表の値は空欄にし、行ごとに出典リンクを付けて。"],
      ko: ["제품 사양 비교", "브랜드별 제품 페이지에서 사양을 추출하고 단위와 출처를 맞춥니다.", "제조사 사양표에서 이 모니터 여섯 대의 밝기를 cd/m²로 통일하고 색 영역 표준과 단자 종류를 적어줘. 미공개 값은 비워두고 각 행에 출처 링크를 붙여줘."],
    },
  },
  {
    slug: "post-replies", category: "social", icon: ["rednote"],
    text: {
      zh: ["为指定帖子自动留评", "根据每篇小红书笔记的内容起草评论，确认后发到对应笔记下，记录发布结果。", "读一下我选的这三篇小红书徒步笔记。结合每篇提到的路线，帮我各写一句想问作者的话，比如哪段路雨后难走、沿途哪里能补水。我确认后，分别发到对应笔记下，把笔记链接和发布结果记下来。"],
      en: ["Reply to selected posts", "Draft a comment that fits each selected Rednote post, then publish the approved comments and record the outcome.", "Read these three hiking posts I picked on Rednote. Draft one question for each author about their route, such as which stretch gets tricky after rain or where to refill a water bottle. Once I approve, post each comment on its matching post and log the link and outcome."],
      ja: ["指定投稿にコメント", "選んだ小紅書の投稿を読み、それぞれの内容に合ったコメントを下書きします。確認後、該当する投稿にコメントして結果を記録します。", "選んだ小紅書のハイキング投稿を三件読んで。雨の後に歩きにくい区間や給水できる場所など、それぞれのルートに合わせて作者に聞きたいことを一つずつ書いて。私が確認したら各投稿にコメントして、投稿リンクと結果を残して。"],
      ko: ["선택한 게시물에 자동 댓글", "선택한 샤오홍슈 게시물마다 내용에 어울리는 댓글을 작성하고, 확인 후 해당 게시물에 올려 결과를 기록합니다.", "내가 고른 샤오홍슈 등산 게시물 세 개를 읽어줘. 비가 온 뒤 걷기 힘든 구간이나 물을 채울 수 있는 곳처럼, 각 코스에 맞춰 작성자에게 물어볼 질문을 하나씩 써줘. 내가 확인하면 해당 게시물에 댓글을 달고 게시물 링크와 결과를 기록해줘."],
    },
  },
] as const satisfies readonly CaseEntry[];

export function getCases(locale: Locale) {
  const cases = entries.map(({ slug, category, icon, text }) => {
    const [title, summary, prompt] = text[locale];
    return { slug, category, icon, title, summary, prompt };
  });
  // Keep the editorial order within the platform and general-purpose groups.
  return cases.sort((a, b) => Number(Array.isArray(b.icon)) - Number(Array.isArray(a.icon)));
}

export type UserCase = ReturnType<typeof getCases>[number];
