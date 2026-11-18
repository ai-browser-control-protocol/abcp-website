import type { Locale } from "./types";

export type LegalKind = "privacy" | "agreement";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalCopy {
  title: string;
  eyebrow: string;
  lead: string;
  /** Emphasized opening block rendered above the summary band. */
  preamble?: Pick<LegalSection, "paragraphs" | "bullets">;
  summaryTitle: string;
  summary: Array<{ title: string; text: string }>;
  sections: LegalSection[];
}

const zh: Record<LegalKind, LegalCopy> = {
  privacy: {
    title: "隐私政策",
    eyebrow: "WEBCROSS / PRIVACY",
    lead: "我们重视你的数据边界。本政策说明 WebCross 官网与客户端如何处理信息，尤其区分在本地处理的浏览器指纹与由 WebCross 服务器收集的信息。",
    preamble: {
      paragraphs: [
        "在使用我们的产品和服务前，请仔细阅读并充分理解本政策。你访问 WebCross 官网，下载、安装或使用 WebCross 客户端及相关服务，即表示你接受本政策（下称“本政策”）和我们的《用户服务协议》；如果你不同意，请不要使用我们的产品和服务。本政策发生变更后，你继续使用我们的产品和服务，即视为你接受这些变更。",
        "本政策适用于我们提供的所有产品和服务。如果你对本政策、我们的产品和服务或与我们的交易有任何疑问，请通过本页末尾列明的联系方式与我们联系。我们承诺遵循以下原则：",
      ],
      bullets: [
        "除非我们确实需要，否则不会要求你提供个人信息；",
        "除为遵守法律、开发我们的产品或保护我们的权利所必需外，不会与任何人共享你的个人信息；",
        "除非为一项服务的持续运行所必需，不会在服务器上存储你的个人信息。",
      ],
    },
    summaryTitle: "先了解这三点",
    summary: [
      {
        title: "指纹不等于生物识别",
        text: "这里的“指纹”是 User-Agent、时区、屏幕与渲染特征等浏览器技术参数，不是人体指纹、面容或声纹。",
      },
      {
        title: "指纹配置默认在本地",
        text: "客户端为创建隔离环境而读取、生成和保存的指纹配置，默认保存在你的设备上，不因这些本地操作而上传至 WebCross 服务器。",
      },
      {
        title: "不出售，不跨站广告追踪",
        text: "我们不出售个人信息，也不利用 WebCross 客户端中的浏览内容建立跨站广告画像。",
      },
    ],
    sections: [
      {
        id: "scope",
        title: "适用范围与基本原则",
        paragraphs: [
          "本政策适用于你访问 WebCross 官网、下载或更新客户端、使用 WebCross 客户端，以及通过客服邮箱与我们联系的场景。我们遵循合法、正当、必要和最小化原则，仅为明确目的处理相应信息。",
          "你通过 WebCross 访问的目标网站、自行配置的代理服务、选择的 AI 模型服务及其他第三方产品，分别适用其自身隐私政策。本政策不替代这些第三方的规则。",
        ],
      },
      {
        id: "fingerprint",
        title: "我们处理的浏览器指纹信息",
        paragraphs: [
          "为创建、配置和维持相互隔离的浏览器环境，客户端会在你的设备上读取、生成或保存必要的指纹参数。具体项目会随版本和你选择的功能而变化，可能包括：",
        ],
        bullets: [
          "浏览器与系统特征：User-Agent、浏览器内核及版本、操作系统、平台和设备架构；",
          "区域与显示特征：语言、地区、时区、屏幕分辨率、窗口尺寸、色彩深度和字体特征；",
          "硬件与渲染特征：设备内存、处理器并发数，以及 Canvas、WebGL、音频等接口呈现的技术特征；",
          "网络与环境配置：你设置的代理、出口网络相关参数、WebRTC 相关配置，以及用于区分本地环境的环境标识。",
          "这些处理首先发生在本地。只有你主动使用需要联网的同步、备份或诊断上传功能（如相应版本提供）时，相应配置才会在完成该功能所必需的范围内传输。",
        ],
      },
      {
        id: "server-data",
        title: "WebCross 服务器可能收集的信息",
        paragraphs: [
          "当你与我们的在线服务交互时，我们或托管、安全服务商可能在必要范围内处理以下信息：",
        ],
        bullets: [
          "网站与技术日志：IP 地址、请求时间、访问页面、来源页面、浏览器和操作系统类型，以及保障网站安全所需的请求与错误信息；",
          "下载与更新信息：请求的客户端版本、操作系统平台、下载或更新时间及必要的错误诊断信息；",
          "你主动提供的信息：联系客服时使用的邮箱、邮件内容，以及你自主选择提交的问题描述、日志或附件；",
          "偏好与必要存储：如官网使用 Cookie 或本地存储保存语言偏好、维持安全状态，仅处理实现相应功能所必需的信息。你可以通过浏览器设置管理或清除这些存储。",
        ],
      },
      {
        id: "not-collected",
        title: "我们不主动收集的信息",
        paragraphs: [
          "除你明确主动提交或适用法律另有要求外，WebCross 不会为了提供基础浏览与自动化功能而主动收集下列信息：",
        ],
        bullets: [
          "人体生物识别信息，包括人体指纹、面容、声纹或虹膜信息；",
          "个人身份信息，例如真实姓名、政府签发的身份证件号码、精确地理位置、通讯录或相册内容；仅在你注册时，我们会通过短信、电话号码或电子邮箱验证申请者是否为自然人；",
          "将你在第三方网站中的账号密码、Cookie、缓存、浏览历史、表单内容或页面文件上传至 WebCross 自有服务器。上述会话数据默认仅保存在你的本地环境中；",
          "用于跨站广告追踪或向数据经纪商出售的个人画像。",
          "请注意，客户端为了执行你的自动化指令，可能需要在本地读取页面内容；这不等于 WebCross 服务器收集了这些内容。你主动提交诊断资料前，请移除其中不应分享的密码、令牌和个人信息。",
        ],
      },
      {
        id: "use",
        title: "信息的使用目的",
        bullets: [
          "创建和维护独立浏览器环境，使指纹、网络及本地存储配置按环境隔离；",
          "提供官网、下载、更新、故障诊断和客户支持；",
          "防范攻击、滥用、恶意流量和其他安全风险，维护服务完整性；",
          "在汇总或去标识化后分析稳定性与性能，改进产品体验；",
          "履行适用法律要求，或响应合法、必要的监管与司法请求。",
        ],
      },
      {
        id: "third-parties",
        title: "第三方服务与数据流向",
        paragraphs: [
          "WebCross 的本地优先不代表你的所有数据都不会离开设备。你主动选择第三方服务时，相应的数据传输由你的操作触发：",
        ],
        bullets: [
          "选择 AI 模型服务时，完成任务所需的指令和必要页面信息可能发送给该模型服务商；",
          "配置代理时，目标流量和网络地址会经过你选择的代理服务商；",
          "访问目标网站时，该网站会按自身技术机制接收 IP 地址及浏览器向其呈现的指纹特征；",
          "使用第三方扩展、接口或集成时，相关服务商可能按其隐私政策处理数据。",
          "请在配置前审阅这些第三方的隐私与安全条款。我们不会将第三方独立收集的数据表述为“不会出本地”。",
        ],
      },
      {
        id: "sharing",
        title: "共享、披露与保存",
        paragraphs: [
          "我们不会出售你的个人信息，也不会与任何人共享你的个人信息，除非为遵守法律、开发我们的产品或保护我们的权利所必需。在为你提供托管、安全、下载分发等必要服务时，我们会与受相应保密和安全义务约束的服务商共享实现该服务所必需的技术信息；除取得你的明确同意或适用法律另有规定外，我们不会向其他第三方提供你的信息。",
          "个人信息的披露：基于本政策所述目的，我们的关联方可能会在必要范围内获取你的个人信息。当发生合并、收购、重组或其他形式的交易，第三方取得我们部分或全部业务、财产或股权时，我们可能将你的个人信息传输给该第三方，并要求其至少以与本政策同等的标准继续保护你的个人信息。",
          "我们会根据适用法律、法规或政府主管机关的要求披露个人信息，包括为配合法院传票、其他类似的法律程序或政府要求而披露你的个人信息；或者，当我们认为披露相关个人信息是法律所要求的，或为保护我们的权利、财产，其他用户的权利、财产与人身安全所必要时，我们也可能披露你的个人信息，包括向执法部门、司法监督部门进行的披露。",
          "在线日志和客服信息仅在为上述目的所需、保障安全或履行法定义务的期间保存。本地环境、Cookie、缓存和其他客户端数据的保存期限由你控制；你可以通过客户端提供的管理功能或删除相应本地数据来清除它们。卸载软件前，请自行备份仍需保留的内容。",
        ],
      },
      {
        id: "security-rights",
        title: "安全措施与你的权利",
        paragraphs: [
          "我们采取与风险相适应的技术和管理措施保护由我们控制的信息，但任何网络传输或存储都无法保证绝对安全。你也应妥善保护设备、代理凭据、模型 API 密钥和本地环境数据。",
          "在适用法律允许的范围内，你可以请求访问、更正或删除由我们持有的个人信息，反对或限制特定处理，并撤回此前作出的授权。对本地数据，你可以直接通过设备或客户端进行管理。需要协助时，可通过本页底部邮箱联系我们；为保护账户与数据，我们可能需要核验请求的真实性。",
        ],
      },
      {
        id: "minors-international",
        title: "未成年人与跨境处理",
        paragraphs: [
          "WebCross 面向具备相应民事行为能力的专业用户和团队，不面向未成年人设计。若监护人发现未成年人向我们提供了个人信息，请联系我们处理。",
          "如我们的服务器或服务提供商位于你所在国家或地区之外，你的技术日志或客服信息可能因此发生跨境传输。我们会在适用法律要求的范围内采取相应保护措施。",
        ],
      },
      {
        id: "changes-contact",
        title: "政策更新与联系我们",
        paragraphs: [
          "产品功能或法律要求变化时，我们可能更新本政策，并在本页公布最新版本和日期。重大变化会通过适当方式另行提示。继续使用受影响的服务前，请查阅更新内容。",
          "如对本政策、信息收集范围或你的权利有疑问，请联系 service@webcross.ai。",
        ],
      },
    ],
  },
  agreement: {
    title: "用户服务协议",
    eyebrow: "WEBCROSS / TERMS",
    lead: "本协议约定你访问 WebCross 官网、下载、安装或使用 WebCross 客户端与相关服务时的权利、责任和数据边界。",
    preamble: {
      paragraphs: [
        "欢迎你使用 WebCross（以下称“我们”）的产品和服务。本用户服务协议（以下称“本协议”）适用于我们通过网站、软件、大模型以及随技术发展出现的新形态向你提供的各项产品和服务。请你务必审慎阅读、充分理解本协议各条款，特别是免除或者限制我们责任的条款，并选择接受或不接受。除非你阅读并同意本协议的全部条款，否则请不要下载、安装或使用本软件及相关服务；你的点击同意、下载、安装、使用、登录等行为，即视为你已阅读并同意受本协议的约束。",
        "你同意，我们的隐私政策以及我们不时公布的其他政策与规则均构成本协议的有效组成部分。我们可能不时更新本协议；如有重大变更，我们会通过在本页公布新版本或向你发送电子邮件等方式通知你，并注明新版本的生效日期，新版本不追溯适用于变更前的行为。变更生效后你继续使用 WebCross 软件及服务，即表示你接受新条款。我们保留本协议未明确授予你的任何及全部权利。",
        "在遵守本协议的前提下，我们授予你一项个人的、不可转让、非排他的许可，以使用本软件。在适用法律允许的最大范围内，我们不对你因使用或不能使用本软件及服务而发生的特殊、意外、直接或间接的侵权或损失承担赔偿责任，即使我们已事先被告知该等损害发生的可能性。",
        "违反本协议的条款可能导致你的账户或服务访问被终止。你同意自行承担使用 WebCross 软件及服务的风险。",
      ],
    },
    summaryTitle: "使用前请确认",
    summary: [
      {
        title: "合法、授权地使用",
        text: "你应遵守适用法律及目标网站、模型和代理服务的规则，不得利用 WebCross 实施未经授权的访问或其他滥用。",
      },
      {
        title: "自动化结果由你复核",
        text: "网页环境、第三方服务和模型输出可能变化。执行登录、提交、交易等重要操作前，请核验页面与操作内容。",
      },
      {
        title: "指纹功能不等于隐匿承诺",
        text: "指纹配置与环境隔离用于提供一致的浏览器环境，不保证绕过任何平台的风控、识别或安全措施。",
      },
    ],
    sections: [
      {
        id: "acceptance",
        title: "协议的接受与适用范围",
        paragraphs: [
          "本协议由你与 WebCross 服务的实际提供者共同遵守。你点击同意、下载、安装、访问或使用相关服务，即表示你已阅读并同意本协议及隐私政策。如你代表组织使用服务，你确认自己有权使该组织受本协议约束。",
          "特定下载、订单、测试功能或企业部署可能附有单独条款；如有冲突，该单独条款仅在其明确约定的范围内优先适用。",
        ],
      },
      {
        id: "eligibility",
        title: "使用资格与凭据责任",
        paragraphs: [
          "你应具备签订本协议所需的民事行为能力。未成年人应在监护人指导和同意下使用相关服务。",
          "如某项功能要求账户、API 密钥、代理凭据或其他身份验证信息，你应提供合法、准确的信息，妥善保护凭据，并对凭据下发生的操作负责。发现未经授权的使用时，请及时通知我们。",
        ],
      },
      {
        id: "license",
        title: "软件许可",
        paragraphs: [
          "在遵守本协议的前提下，我们授予你一项有限的、非独占的、不可转让且可撤销的许可，仅允许你为合法内部业务或个人目的使用 WebCross。",
          "除适用法律明确允许或相应开源许可另有规定外，你不得复制、出租、出售、再许可、反向工程、规避技术限制，或移除软件中的权利标识。第三方及开源组件适用其各自许可。",
        ],
      },
      {
        id: "acceptable-use",
        title: "可接受使用与禁止行为",
        paragraphs: ["你应当遵守任何适用的法律法规，不得自行或协助他人利用 WebCross 实施下列行为，也不得为下列行为提供便利："],
        bullets: [
          "违反适用法律、第三方合同或目标平台规则，或侵犯他人的隐私、知识产权及其他合法权益；",
          "危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一，损害国家荣誉和利益；",
          "宣扬邪教和封建迷信，或散布谣言，扰乱社会秩序，破坏社会稳定；",
          "散布淫秽、色情、赌博、暴力、凶杀、恐怖、骚扰、低俗或教唆犯罪的内容；",
          "侮辱、诽谤、欺诈、骚扰或冒充他人，或利用本软件虚构事实、隐瞒真相以误导、欺骗他人；",
          "实施博彩、赌博游戏等非法互联网活动；",
          "未经授权访问、扫描、控制或干扰账户、设备、网络、接口或数据，或规避你无权规避的安全措施；",
          "未经允许，对计算机信息网络功能或其中存储、处理、传输的数据和应用程序进行删除、修改或增加，或干扰计算机信息系统功能致其不能正常运行；",
          "传播恶意代码、计算机病毒等破坏性程序，破坏本软件系统、网站或其他服务的正常运行；",
          "删除或改变本软件的权利管理电子信息，或故意避开、破坏为保护本软件著作权而采取的技术措施；",
          "以任何方式倒卖 WebCross 产品、授权账户或管理用户下的子账户；",
          "使用任何软件或设备（无论手动或自动）“爬行”或“蜘蛛化”抓取 WebCross 软件及服务的任何部分；",
          "以超出合理负载的方式请求服务，或干扰其他用户正常使用；",
          "将自动化输出用于需要专业资质的判断而未进行适当人工复核，或用于法律禁止的高风险场景；",
          "其他任何危害计算机信息网络安全的，或违反公序良俗、法律法规禁止的行为。",
        ],
      },
      {
        id: "automation",
        title: "自动化任务与人工控制",
        paragraphs: [
          "WebCross 可按你的指令执行浏览器任务。你应确保指令、脚本、目标页面和后续操作均有合法依据，并在提交、发布、删除、支付或其他重要动作前进行必要复核。",
          "页面结构、权限状态、模型响应和网络条件可能变化，导致任务暂停、失败或结果不完整。你应保留重要数据的备份，并为关键流程设置适当的人工确认和恢复机制。",
          "为防止账号、密码等敏感信息泄露，我们已约束大模型在钱包支付、账号登录等环节必须由人工介入完成。请在这些业务场景下，不要要求大模型自动操作；因你绕过上述人工确认要求而产生的风险与损失，由你自行承担。",
        ],
      },
      {
        id: "fingerprints-third-parties",
        title: "指纹、第三方服务与隐私",
        paragraphs: [
          "浏览器指纹配置、本地环境隔离和代理设置不等于匿名或不可识别。目标网站仍可能依据其掌握的账户、网络、行为或其他信息作出判断。你不得将上述功能用于规避法律义务或未经授权绕过平台控制。",
          "你选择的 AI 模型、代理、目标网站、扩展和其他第三方服务由相应第三方提供。你应遵守其条款并自行评估数据流向。必要页面信息可能发送给你选择的模型服务；本地保存不等于第三方不会接收数据。具体处理方式见隐私政策。",
        ],
      },
      {
        id: "fees",
        title: "费用与订单（如适用）",
        paragraphs: [
          "如你购买付费功能，价格、计费周期、服务范围、自动续费与退款规则以购买时明确展示的订单或单独条款为准。你应按约定支付费用并提供合法有效的付款信息。",
          "未经你确认，我们不会仅凭本协议新增收费项目。价格或服务方案发生变化时，将按适用规则提前说明。",
        ],
      },
      {
        id: "intellectual-property",
        title: "知识产权与反馈",
        paragraphs: [
          "WebCross 的软件、界面、品牌标识及网站内容的相关权利归其权利人或许可方所有。本协议不向你转让这些权利。你保留对自己提供的指令、文件和其他内容的合法权利。",
          "你自愿提供的建议或反馈可用于改进产品，但我们没有因此公开你的保密信息或向你支付报酬的义务。你不得提交自己无权分享的第三方内容。",
        ],
      },
      {
        id: "updates-termination",
        title: "更新、服务变更与终止",
        paragraphs: [
          "我们可能为修复问题、提升安全或改进功能而提供更新，并在合理范围内调整或停止部分服务。对会实质影响你使用的重大变化，我们会采取适当方式提示。",
          "你可以随时停止使用并卸载客户端，也可按本协议管理本地数据。如你严重违反本协议、造成安全风险或法律要求停止服务，我们可在适用法律允许的范围内限制或终止相关访问，并在可行时说明原因。",
        ],
      },
      {
        id: "enforcement-liability",
        title: "违规处理与责任承担",
        paragraphs: [
          "你理解并同意，若你实施本协议的任何禁止行为，或将 WebCross 软件及服务用于任何非法或未经授权的目的，或有其他违反本协议的行为，我们有权依合理判断对有关行为进行严格的限制或处罚，对违法违规的用户采取适当的法律行动，并依据法律法规保存有关信息、向有关部门报告。你应独自承担由此产生的一切法律责任。",
          "你侵入他人服务器、未经授权进入计算机信息网络或使用其资源等行为，均由你独立承担全部法律责任及后果，与 WebCross 无关；我们不为此类行为及其引发的人身、财产损害或第三方索赔承担任何责任。",
          "你理解并同意，因你违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，你应当独立承担责任；我们因此遭受损失的，你应当一并赔偿。若我们因生效判决、裁决等先行承担了相关责任，我们有权向你全额追偿。",
        ],
      },
      {
        id: "disclaimers-liability",
        title: "免责声明与责任限制",
        paragraphs: [
          "在适用法律允许的最大范围内，WebCross 按“现状”和“可用”基础提供。我们不保证服务始终不中断、无错误，不保证指纹配置不会被第三方识别，也不保证模型或自动化结果适用于你的特定目的。",
          "在适用法律允许的最大范围内，我们不对你因使用或不能使用本软件及服务而发生的特殊、意外、直接或间接的侵权或损失承担赔偿责任，即使我们已事先被告知该等损害发生的可能性；我们也不对因你违法使用、未经授权操作、第三方服务变化或未妥善备份造成的损失承担责任。任何条款均不排除或限制依法不得排除或限制的责任。",
        ],
      },
      {
        id: "changes-contact",
        title: "协议更新与联系我们",
        paragraphs: [
          "我们可能根据产品、服务或法律要求更新本协议，并在本页公布最新版本和日期。重大变化会以适当方式提示；更新后继续使用的法律效果以适用法律为准。",
          "如对本协议有疑问或需要支持，请联系 service@webcross.ai。",
        ],
      },
    ],
  },
};

const en: Record<LegalKind, LegalCopy> = {
  privacy: {
    title: "Privacy Policy",
    eyebrow: "WEBCROSS / PRIVACY",
    lead: "Your data boundaries matter. This policy explains how the WebCross website and client handle information, with a clear distinction between browser fingerprints processed locally and information collected by WebCross servers.",
    preamble: {
      paragraphs: [
        "Please read and understand this policy carefully before using our products and services. By visiting the WebCross website or downloading, installing or using the WebCross client and related services, you accept this policy (the “Policy”) and our Terms of Service. If you do not agree, please do not use our products or services. Once this policy changes, your continued use of our products and services means you accept the revised policy.",
        "This policy applies to all products and services we provide. If you have any questions about this policy, our products and services, or your transactions with us, contact us using the details in the final section of this page. We commit to the following principles:",
      ],
      bullets: [
        "We do not ask you for personal information unless we truly need it;",
        "We do not share your personal information with anyone except to comply with the law, develop our products, or protect our rights;",
        "We do not store your personal information on our servers unless it is required for the continuous operation of a service.",
      ],
    },
    summaryTitle: "Three things to know",
    summary: [
      {
        title: "Fingerprints are not biometrics",
        text: "Here, a fingerprint means technical browser parameters such as User-Agent, time zone, screen and rendering characteristics—not a human fingerprint, face or voiceprint.",
      },
      {
        title: "Fingerprint profiles stay local by default",
        text: "Fingerprint settings read, generated and stored by the client to create isolated environments remain on your device by default. Those local operations do not upload them to WebCross servers.",
      },
      {
        title: "No sale or cross-site ad profiling",
        text: "We do not sell personal information or use content in the WebCross client to build cross-site advertising profiles.",
      },
    ],
    sections: [
      {
        id: "scope",
        title: "Scope and principles",
        paragraphs: [
          "This policy applies when you visit the WebCross website, download or update the client, use the WebCross client, or contact us through our support email. We process only the information needed for clearly stated purposes and follow data-minimization principles.",
          "Target websites you visit, proxy services you configure, AI model providers you select and other third-party products have their own privacy policies. This policy does not replace those terms.",
        ],
      },
      {
        id: "fingerprint",
        title: "Browser fingerprint information we process",
        paragraphs: [
          "To create, configure and maintain isolated browser environments, the client reads, generates or stores necessary fingerprint parameters on your device. The exact items depend on the version and features you use and may include:",
        ],
        bullets: [
          "Browser and system characteristics: User-Agent, browser engine and version, operating system, platform and device architecture;",
          "Regional and display characteristics: language, region, time zone, screen resolution, window size, color depth and font characteristics;",
          "Hardware and rendering characteristics: device memory, processor concurrency, and technical characteristics exposed through interfaces such as Canvas, WebGL and audio;",
          "Network and environment settings: proxy and egress-network parameters you configure, WebRTC-related settings, and identifiers used to distinguish local environments.",
          "This processing occurs locally first. Settings are transmitted only to the extent required when you deliberately use an online sync, backup or diagnostic-upload feature, if offered by your version.",
        ],
      },
      {
        id: "server-data",
        title: "Information WebCross servers may collect",
        paragraphs: [
          "When you interact with our online services, we or our hosting and security providers may process the following information as necessary:",
        ],
        bullets: [
          "Website and technical logs: IP address, request time, pages visited, referring page, browser and operating system type, and request or error information needed to keep the website secure;",
          "Download and update information: requested client version, operating system platform, download or update time, and necessary error diagnostics;",
          "Information you actively provide: the email address and message used to contact support, plus issue descriptions, logs or attachments you choose to submit;",
          "Preferences and essential storage: if the website uses cookies or local storage for language preferences or security, only information needed for that function is processed. You can manage or clear this storage through your browser settings.",
        ],
      },
      {
        id: "not-collected",
        title: "Information we do not actively collect",
        paragraphs: [
          "Unless you explicitly submit it or applicable law requires otherwise, WebCross does not actively collect the following to provide basic browsing and automation:",
        ],
        bullets: [
          "Human biometric information, including human fingerprints, facial data, voiceprints or iris data;",
          "Personal identity information, such as your real name, government-issued ID number, precise geolocation, contacts or photo library contents. To confirm whether an applicant is a natural person, we verify a mobile number or email address by SMS only when you register;",
          "Uploads to WebCross-owned servers of your third-party website passwords, cookies, cache, browsing history, form content or page files. This session data stays in your local environment by default;",
          "Personal profiles for cross-site advertising tracking or sale to data brokers.",
          "The client may need to read page content locally to carry out your automation instructions. That does not mean WebCross servers collect the content. Before submitting diagnostics, remove passwords, tokens and personal information you do not intend to share.",
        ],
      },
      {
        id: "use",
        title: "How we use information",
        bullets: [
          "Create and maintain separate browser environments with isolated fingerprint, network and local-storage settings;",
          "Provide the website, downloads, updates, troubleshooting and customer support;",
          "Prevent attacks, abuse, malicious traffic and other security risks, and protect service integrity;",
          "Analyze stability and performance in aggregated or de-identified form to improve the product;",
          "Meet applicable legal obligations and respond to lawful, necessary regulatory or judicial requests.",
        ],
      },
      {
        id: "third-parties",
        title: "Third-party services and data flows",
        paragraphs: [
          "WebCross being local-first does not mean none of your data ever leaves your device. Your choices trigger the relevant transfers when you use third-party services:",
        ],
        bullets: [
          "When you select an AI model provider, your instructions and page information necessary for the task may be sent to that provider;",
          "When you configure a proxy, destination traffic and network addresses pass through your chosen proxy provider;",
          "When you visit a target website, it receives your IP address and the fingerprint characteristics presented by the browser through its own technical mechanisms;",
          "When you use third-party extensions, APIs or integrations, those providers may process data under their own privacy policies.",
          "Review those providers' privacy and security terms before configuring them. We do not describe data independently collected by a third party as data that never leaves your device.",
        ],
      },
      {
        id: "sharing",
        title: "Sharing, disclosure and retention",
        paragraphs: [
          "We do not sell your personal information, and we do not share it with anyone except as required to comply with the law, develop our products, or protect our rights. To provide necessary hosting, security and download-distribution services, we share the technical information required for those services with providers bound by confidentiality and security obligations. Your information is provided to other third parties only at your explicit direction or where applicable law requires it.",
          "Disclosure of personal information: for the purposes described in this policy, our affiliates may obtain your personal information to the extent necessary. If a merger, acquisition, reorganization or other transaction gives a third party part or all of our business, assets or equity, we may transfer your personal information to that third party and require it to protect your personal information to at least the standard of this policy.",
          "We disclose personal information as required by applicable laws, regulations or government authorities, including to comply with a court subpoena, other similar legal process or a government request. We may also disclose your personal information when we believe in good faith that disclosure is required by law, or necessary to protect our rights and property or the rights, property and safety of other users, including disclosure to law enforcement and judicial oversight bodies.",
          "Online logs and support correspondence are retained only as long as needed for these purposes, security or legal obligations. You control the retention of local environments, cookies, cache and other client data. You can delete them using available client controls or by removing the relevant local data. Back up anything you still need before uninstalling the software.",
        ],
      },
      {
        id: "security-rights",
        title: "Security and your rights",
        paragraphs: [
          "We use technical and organizational safeguards appropriate to the risks affecting information under our control, but no network transmission or storage is absolutely secure. You should also protect your device, proxy credentials, model API keys and local environment data.",
          "Subject to applicable law, you may request access to, correction or deletion of personal information we hold, object to or restrict certain processing, and withdraw prior consent. You can manage local data directly on your device or in the client. For assistance, contact us using the email below; we may need to verify a request to protect accounts and data.",
        ],
      },
      {
        id: "minors-international",
        title: "Minors and international processing",
        paragraphs: [
          "WebCross is designed for professional users and teams with the legal capacity to use it, and is not directed at minors. A parent or guardian who believes a minor has provided us personal information should contact us.",
          "If our servers or providers are located outside your country or region, technical logs or support information may be transferred internationally. We apply safeguards where required by applicable law.",
        ],
      },
      {
        id: "changes-contact",
        title: "Changes and contact",
        paragraphs: [
          "We may update this policy as product features or legal requirements change. The latest version and date will appear on this page, with additional notice for material changes where appropriate. Review the update before continuing to use an affected service.",
          "For questions about this policy, our information practices or your rights, contact service@webcross.ai.",
        ],
      },
    ],
  },
  agreement: {
    title: "Terms of Service",
    eyebrow: "WEBCROSS / TERMS",
    lead: "These terms govern your access to the WebCross website and your download, installation or use of the WebCross client and related services, including your rights, responsibilities and data boundaries.",
    preamble: {
      paragraphs: [
        "Welcome to the products and services of WebCross (“we”, “us”). These Terms of Service (these “Terms”) apply to all products and services we provide through our website, software, clients and any new forms that emerge as technology develops. Please read these Terms carefully and fully understand each clause, especially those that exempt or limit our liability, and then choose whether to accept them. Unless you have read and agreed to all of these Terms, do not download, install or use the software or related services. By clicking to accept, downloading, installing, using or logging in, you are deemed to have read and agreed to be bound by these Terms.",
        "You agree that our Privacy Policy and other policies and rules we publish from time to time form an integral part of these Terms. We may update these Terms from time to time. For material changes, we will notify you by publishing the new version on this page or by email, stating the effective date of the new version; new versions do not apply retroactively. If you continue to use the WebCross software and services after the changes take effect, you accept the new Terms. We reserve any and all rights not expressly granted to you under these Terms.",
        "Subject to these Terms, we grant you a personal, non-transferable, non-exclusive license to use the software. To the maximum extent permitted by applicable law, we are not liable for any special, incidental, direct or indirect infringement or loss arising from your use of, or inability to use, the software and services, even if we have been advised of the possibility of such damages.",
        "Breaching these Terms may result in termination of your account or access to the services. You agree that you use the WebCross software and services at your own risk.",
      ],
    },
    summaryTitle: "Before you use WebCross",
    summary: [
      {
        title: "Use it lawfully and with authorization",
        text: "Follow applicable law and the rules of target websites, model providers and proxy services. Do not use WebCross for unauthorized access or other abuse.",
      },
      {
        title: "Review automation outcomes",
        text: "Web environments, third-party services and model outputs can change. Verify the page and action before sign-ins, submissions, transactions or other important operations.",
      },
      {
        title: "Fingerprint features are not a stealth guarantee",
        text: "Fingerprint settings and environment isolation provide consistent browser environments. They do not guarantee bypassing any platform's risk controls, detection or security measures.",
      },
    ],
    sections: [
      {
        id: "acceptance",
        title: "Acceptance and scope",
        paragraphs: [
          "These terms are between you and the actual provider of the WebCross service. By accepting, downloading, installing, accessing or using the service, you confirm that you have read and agree to these terms and the Privacy Policy. If you use the service for an organization, you confirm that you can bind that organization.",
          "Specific downloads, orders, preview features or enterprise deployments may include separate terms. If they conflict, those separate terms prevail only to the extent expressly stated.",
        ],
      },
      {
        id: "eligibility",
        title: "Eligibility and credential responsibility",
        paragraphs: [
          "You must have the legal capacity to enter into these terms. Minors may use relevant services only under the guidance and consent of a parent or guardian.",
          "If a feature requires an account, API key, proxy credential or other authentication, you must provide lawful and accurate information, protect the credentials and take responsibility for activity under them. Notify us promptly of any unauthorized use.",
        ],
      },
      {
        id: "license",
        title: "Software license",
        paragraphs: [
          "Subject to these terms, we grant you a limited, non-exclusive, non-transferable and revocable license to use WebCross solely for lawful internal business or personal purposes.",
          "Unless applicable law expressly permits it or an applicable open-source license provides otherwise, you may not copy, rent, sell, sublicense, reverse engineer, circumvent technical restrictions, or remove rights notices from the software. Third-party and open-source components remain subject to their own licenses.",
        ],
      },
      {
        id: "acceptable-use",
        title: "Acceptable use and prohibited conduct",
        paragraphs: ["You must comply with all applicable laws and regulations. You must not use WebCross, or help others use it, to engage in any of the following, or facilitate any of the following:"],
        bullets: [
          "Violate applicable law, third-party contracts or target-platform rules, or infringe privacy, intellectual property or other lawful rights;",
          "Endanger national security, disclose state secrets, subvert state power, undermine national unity, or damage national honor and interests;",
          "Promote cults or feudal superstitions, or spread rumors that disrupt social order or undermine social stability;",
          "Disseminate obscene, pornographic, gambling, violent, murderous, terrorist, harassing, vulgar or crime-abetting content;",
          "Insult, defame, defraud, harass or impersonate others, or use the software to fabricate facts or conceal the truth to mislead or deceive others;",
          "Engage in betting, gambling games or other unlawful online activities;",
          "Access, scan, control or interfere with accounts, devices, networks, interfaces or data without authorization, or circumvent security measures you are not entitled to bypass;",
          "Without permission, delete, modify or add to the functions of a computer information network or the data and applications stored, processed or transmitted on it, or interfere with a computer information system so that it cannot operate normally;",
          "Distribute malicious code, computer viruses or other destructive programs, or disrupt the normal operation of the WebCross software, website or other services;",
          "Remove or alter rights-management electronic information in the software, or deliberately circumvent or damage technical measures protecting its copyright;",
          "Resell WebCross products, licensed accounts, or sub-accounts under a managed account in any form;",
          "Use any software or device, manual or automated, to crawl or spider any part of the WebCross software or services;",
          "Make requests that impose an unreasonable load or interfere with other users' normal use;",
          "Use automated output for judgments requiring professional qualifications without appropriate human review, or in high-risk scenarios prohibited by law;",
          "Engage in any other activity that endangers computer information network security, offends public order and morals, or is prohibited by applicable law.",
        ],
      },
      {
        id: "automation",
        title: "Automation and human control",
        paragraphs: [
          "WebCross can perform browser tasks at your direction. You must have a lawful basis for your instructions, scripts, target pages and resulting actions, and perform appropriate review before submissions, publication, deletion, payment or other important actions.",
          "Changes in page structure, permission state, model responses and network conditions can cause tasks to pause, fail or produce incomplete results. Back up important data and build human confirmation and recovery steps into critical workflows.",
          "To prevent leakage of account credentials and other sensitive information, we have constrained the model so that steps such as wallet payments and account sign-ins require human intervention. Do not instruct the model to operate automatically in these scenarios. You bear the risks and losses arising from bypassing these human-confirmation requirements.",
        ],
      },
      {
        id: "fingerprints-third-parties",
        title: "Fingerprints, third parties and privacy",
        paragraphs: [
          "Browser fingerprint settings, local environment isolation and proxy settings do not make you anonymous or unidentifiable. A target website may still make decisions using account, network, behavioral or other information available to it. Do not use these features to evade legal obligations or bypass platform controls without authorization.",
          "AI models, proxies, target websites, extensions and other third-party services you select are provided by those third parties. You must follow their terms and assess the relevant data flows. Page information necessary for a task may be sent to your selected model provider; local storage does not mean a third party receives no data. See the Privacy Policy for details.",
        ],
      },
      {
        id: "fees",
        title: "Fees and orders, if applicable",
        paragraphs: [
          "If you purchase paid functionality, the price, billing period, service scope, automatic renewal and refund terms are those clearly presented at purchase or in separate terms. You must pay as agreed and provide lawful, valid payment information.",
          "These terms alone do not authorize us to add charges without your confirmation. Changes to prices or service plans will be communicated in advance as required by applicable rules.",
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property and feedback",
        paragraphs: [
          "Rights in the WebCross software, interfaces, brand marks and website content belong to their respective owners or licensors. These terms do not transfer those rights to you. You retain your lawful rights in instructions, files and other content you provide.",
          "Suggestions or feedback you voluntarily provide may be used to improve the product. This does not require us to disclose your confidential information or pay you. Do not submit third-party content you have no right to share.",
        ],
      },
      {
        id: "updates-termination",
        title: "Updates, service changes and termination",
        paragraphs: [
          "We may provide updates to fix issues, improve security or add functionality, and may reasonably change or discontinue parts of the service. We will provide appropriate notice of material changes that substantially affect your use.",
          "You may stop using and uninstall the client at any time and manage local data under these terms. If you materially breach these terms, create a security risk or the law requires us to stop service, we may restrict or terminate relevant access to the extent permitted by law and, where practicable, explain why.",
        ],
      },
      {
        id: "enforcement-liability",
        title: "Enforcement and your liability",
        paragraphs: [
          "You understand and agree that if you engage in any prohibited conduct, use the WebCross software or services for any unlawful or unauthorized purpose, or otherwise breach these Terms, we may, in our reasonable judgment, strictly restrict or penalize the relevant conduct, take appropriate legal action against users who violate laws or these Terms, and retain relevant information and report to competent authorities as required by law. You alone bear all legal liability arising from your conduct.",
          "Any intrusion into others' servers, unauthorized access to computer information networks or use of their resources by you is solely your responsibility, and you independently bear all legal liability and consequences. Such conduct has nothing to do with WebCross, and we assume no liability for it or for any personal injury, property damage or third-party claims arising from it.",
          "You understand and agree that you are independently liable for any third-party claims, demands or losses arising from your breach of these Terms or related service terms, and you must compensate us for any losses we suffer as a result. If we bear liability first under an effective judgment or award, we have the right to recover the full amount from you.",
        ],
      },
      {
        id: "disclaimers-liability",
        title: "Disclaimers and limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, WebCross is provided on an “as is” and “as available” basis. We do not guarantee uninterrupted or error-free service, that fingerprint settings will avoid third-party detection, or that model or automation results will suit your particular purpose.",
          "To the maximum extent permitted by applicable law, we are not liable for any special, incidental, direct or indirect infringement or loss arising from your use of, or inability to use, the software and services, even if we have been advised of the possibility of such damages, nor for losses caused by your unlawful use, unauthorized actions, changes in third-party services or failure to maintain appropriate backups. Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.",
        ],
      },
      {
        id: "changes-contact",
        title: "Changes and contact",
        paragraphs: [
          "We may update these terms to reflect product, service or legal changes. The latest version and date will appear on this page, with appropriate notice of material changes. The legal effect of continued use after an update is subject to applicable law.",
          "For questions about these terms or for support, contact service@webcross.ai.",
        ],
      },
    ],
  },
};

export function getLegalCopy(kind: LegalKind, locale: Locale): LegalCopy {
  return locale === "zh" ? zh[kind] : en[kind];
}
