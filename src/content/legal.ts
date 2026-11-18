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

const ja: Record<LegalKind, LegalCopy> = {
  privacy: {
    title: "プライバシーポリシー",
    eyebrow: "WEBCROSS / PRIVACY",
    lead: "私たちは、お客様のデータがどこで扱われるかを重視します。本ポリシーでは、WebCross の公式サイトとクライアントによる情報の取扱いについて、特に端末内で処理するブラウザーフィンガープリントと、WebCross のサーバーが収集する情報を区別して説明します。",
    preamble: {
      paragraphs: [
        "製品やサービスの利用前に、このプライバシーポリシー（以下「本ポリシー」）をよく読み、内容をご理解ください。WebCross 公式サイトへのアクセス、クライアントのダウンロード・インストール・使用、または関連サービスの利用により、本ポリシーと利用規約に同意したものとします。同意されない場合は、製品やサービスをご利用にならないでください。本ポリシーの変更後も利用を継続した場合、変更に同意したものとみなします。",
        "本ポリシーは当社が提供するすべての製品とサービスに適用されます。本ポリシー、製品やサービス、当社との取引に関するご質問は、ページ末尾の連絡先までお問い合わせください。当社は以下の原則に従います。",
      ],
      bullets: [
        "必要な場合に限り、個人情報の提供を求めます。",
        "法令の遵守、製品の開発、または当社の権利の保護に必要な場合に限り、個人情報を共有します。",
        "サービスを継続して提供するために必要な場合に限り、個人情報をサーバーに保存します。",
      ],
    },
    summaryTitle: "最初に知っておきたい 3 つのこと",
    summary: [
      {
        title: "ここでいうフィンガープリントはブラウザーの技術情報",
        text: "この「フィンガープリント」は、User-Agent、タイムゾーン、画面や描画の特性などを指します。身体の指紋、顔、声紋などの生体情報は含みません。",
      },
      {
        title: "フィンガープリントの設定は既定で端末に保存",
        text: "分離環境を作成するためにクライアントが読み取り、生成、保存する設定は、既定でお使いの端末に保存されます。これらのローカル処理によって WebCross のサーバーにアップロードされることはありません。",
      },
      {
        title: "個人情報の販売と広告目的のサイト横断追跡は行いません",
        text: "当社は個人情報を販売しません。WebCross クライアント内で閲覧した内容を使って、サイト横断の広告プロファイルを作成することもありません。",
      },
    ],
    sections: [
      {
        id: "scope",
        title: "適用範囲と基本原則",
        paragraphs: [
          "本ポリシーは、公式サイトへのアクセス、クライアントのダウンロード・更新・利用、およびサポート窓口へのメール連絡に適用されます。当社は適法性、正当性、必要性、最小化の原則に従い、明確な目的に必要な情報のみを取り扱います。",
          "WebCross からアクセスするサイト、ご自身で設定したプロキシ、選択した AI モデル提供サービス、その他の第三者製品には、それぞれのプライバシーポリシーが適用されます。",
        ],
      },
      {
        id: "fingerprint",
        title: "取り扱うブラウザーフィンガープリント情報",
        paragraphs: [
          "分離したブラウザー環境を作成、設定、維持するため、クライアントはお使いの端末で必要なフィンガープリント情報を読み取り、生成、保存します。項目はバージョンや選択した機能によって異なり、次の情報が含まれる場合があります。",
        ],
        bullets: [
          "ブラウザーとシステムの特性。User-Agent、ブラウザーエンジンとバージョン、OS、プラットフォーム、端末のアーキテクチャ。",
          "地域と表示の特性。言語、地域、タイムゾーン、画面解像度、ウィンドウのサイズ、色深度、フォントの特性。",
          "ハードウェアと描画の特性。端末のメモリー、論理プロセッサー数、Canvas、WebGL、音声などのインターフェースが示す技術上の特性。",
          "ネットワークと環境設定。設定したプロキシ、出口ネットワークのパラメーター、WebRTC の設定、ローカル環境を区別する識別子。",
          "これらはまず端末上で処理します。対応バージョンでオンライン同期、バックアップ、診断のアップロードをお客様が選んで利用した場合に限り、その機能に必要な範囲で設定を転送します。",
        ],
      },
      {
        id: "server-data",
        title: "WebCross のサーバーが収集する場合がある情報",
        paragraphs: [
          "オンラインサービスをご利用の際、当社またはホスティング・セキュリティ事業者が、必要な範囲で以下の情報を処理する場合があります。",
        ],
        bullets: [
          "サイトの技術ログ。IP アドレス、リクエスト時刻、閲覧ページ、参照元、ブラウザーと OS の種類、サイトの安全確保に必要なリクエストとエラーの情報。",
          "ダウンロード・更新情報。要求されたクライアントのバージョン、OS、ダウンロードや更新の時刻、必要なエラー診断情報。",
          "お客様が提供する情報。サポートへの連絡に使用したメールアドレス、メールの内容、ご自身で送信を選んだ問題の説明、ログ、添付ファイル。",
          "設定と必要な保存情報。公式サイトで Cookie やローカルストレージを利用して言語設定を記憶したりセキュリティ状態を維持したりする場合、機能に必要な情報のみを処理します。ブラウザーの設定からこれらの情報を管理・削除できます。",
        ],
      },
      {
        id: "not-collected",
        title: "当社が積極的に収集しない情報",
        paragraphs: [
          "お客様が明示的に提供する場合、または適用法令の定めがある場合を除き、WebCross は基本的な閲覧・自動化機能の提供を目的として以下の情報を積極的に収集しません。",
        ],
        bullets: [
          "身体の指紋、顔、声紋、虹彩などの生体識別情報。",
          "実名、政府発行の身分証番号、正確な位置情報、連絡先や写真アルバムなどの個人を識別する情報。登録時に限り、SMS、電話番号またはメールアドレスで申請者が自然人であることを確認します。",
          "第三者サイトのアカウントとパスワード、Cookie、キャッシュ、閲覧履歴、フォーム入力、ページのファイルは WebCross 自社サーバーにアップロードしません。これらのセッションデータは既定でローカル環境にのみ保存されます。",
          "サイト横断型の広告追跡や、データブローカーへの販売を目的とする個人プロファイル。",
          "自動化の指示に従うため、クライアントが端末上でページを読み取る場合があります。これは WebCross のサーバーによる収集とは別の処理です。診断資料を送信する前に、共有すべきでないパスワード、トークン、個人情報を取り除いてください。",
        ],
      },
      {
        id: "use",
        title: "情報の利用目的",
        bullets: [
          "独立したブラウザー環境を作成・維持し、フィンガープリント、ネットワーク、ローカルストレージの設定を環境ごとに分離します。",
          "公式サイト、ダウンロード、アップデート、障害診断、カスタマーサポートを提供します。",
          "攻撃、不正利用、悪意のあるトラフィックなどのリスクを防ぎ、サービスの完全性を維持します。",
          "集計・非識別化した情報から安定性と性能を分析し、製品体験を改善します。",
          "適用法令上の義務を果たし、適法かつ必要な監督機関・司法機関の要求に対応します。",
        ],
      },
      {
        id: "third-parties",
        title: "第三者サービスとデータの送信先",
        paragraphs: [
          "WebCross はローカル処理を優先します。お客様が第三者サービスを選んで利用する場合、その操作により端末外へのデータ送信が発生します。",
        ],
        bullets: [
          "AI モデルサービスを選ぶと、タスクに必要な指示とページ情報がそのモデル提供事業者に送られる場合があります。",
          "プロキシを設定すると、対象トラフィックとネットワークアドレスは選択したプロキシ事業者を経由します。",
          "サイトへのアクセス時には、そのサイトの仕組みに従って IP アドレスやブラウザーが提示するフィンガープリント特性が送られます。",
          "第三者の拡張機能、インターフェース、連携サービスを使うと、提供事業者が自身のプライバシーポリシーに従ってデータを扱うことがあります。",
          "設定前に各提供事業者のプライバシー・セキュリティ条件を確認してください。第三者が独自に収集するデータには、WebCross の端末内処理に関する説明は適用されません。",
        ],
      },
      {
        id: "sharing",
        title: "共有、開示、保存",
        paragraphs: [
          "当社は個人情報を販売しません。また、法令遵守、製品開発、当社の権利の保護に必要な場合を除き、個人情報を共有しません。ホスティング、セキュリティ、ダウンロード配信などに必要な技術情報は、守秘義務と安全管理義務を負う事業者と必要な範囲で共有します。お客様の明示的同意がある場合や適用法令に定めがある場合を除き、その他の第三者には提供しません。",
          "本ポリシーの目的に必要な範囲で、当社の関連会社が個人情報を取得する場合があります。合併、買収、組織再編などで第三者が当社の事業、資産、持分の一部または全部を取得する場合、当社は個人情報を移転し、移転先に本ポリシーと同等以上の水準での保護を求めることがあります。",
          "適用法令や所管官庁の要求に従い、裁判所の召喚状、類似する法的手続、政府の要求に対応するために個人情報を開示する場合があります。法令上必要と判断した場合や、当社の権利・財産、他の利用者の権利・財産・身体の安全を守るために必要な場合は、法執行機関や司法監督機関などに開示することがあります。",
          "オンラインのログやサポート情報は、上記の目的、セキュリティ確保、法令上の義務に必要な期間に限り保存します。ローカル環境、Cookie、キャッシュ、その他のクライアントデータの保存期間はお客様が管理します。クライアントの管理機能を使うか、該当のローカルデータを削除して消去できます。アンインストール前に必要なデータをバックアップしてください。",
        ],
      },
      {
        id: "security-rights",
        title: "安全対策とお客様の権利",
        paragraphs: [
          "当社は管理する情報に対してリスクに見合った技術的・組織的対策を講じます。ネットワーク上の送信や保存の絶対的な安全は保証できません。お客様も端末、プロキシの認証情報、モデルの API キー、ローカル環境のデータを適切に保護してください。",
          "適用法令の範囲内で、当社が保有する個人情報の開示、訂正、削除、特定の取扱いに対する異議申立てや制限を求め、同意を撤回できます。ローカルデータはご自身の端末やクライアントから直接管理できます。支援が必要な場合はページ末尾のメール窓口へご連絡ください。アカウントとデータの保護のため、請求が真正であることを確認する場合があります。",
        ],
      },
      {
        id: "minors-international",
        title: "未成年者と国境を越えた処理",
        paragraphs: [
          "WebCross は必要な法的行為能力を有する専門ユーザーやチームを対象としています。未成年者が当社に個人情報を提供したことを保護者が確認した場合は、当社にご連絡ください。",
          "当社のサーバーや委託先がお客様の国・地域の外にある場合、技術ログやサポート情報が国外に移転されることがあります。当社は適用法令に従い必要な保護措置を取ります。",
        ],
      },
      {
        id: "changes-contact",
        title: "更新とお問い合わせ",
        paragraphs: [
          "製品機能や法的要件の変更に応じて本ポリシーを更新する場合があります。最新版と日付をこのページで案内し、重要な変更は適切な方法で別途お知らせします。影響を受けるサービスを引き続き使う前に、変更内容をご確認ください。",
          "本ポリシー、収集する情報の範囲、お客様の権利に関するご質問は service@webcross.ai までご連絡ください。",
        ],
      },
    ],
  },
  agreement: {
    title: "利用規約",
    eyebrow: "WEBCROSS / TERMS",
    lead: "本規約は、WebCross 公式サイトへのアクセス、クライアントのダウンロード・インストール・利用、および関連サービスの利用における権利、責任、データの取扱範囲を定めます。",
    preamble: {
      paragraphs: [
        "WebCross（以下「当社」）の製品およびサービスをご利用いただきありがとうございます。この利用規約（以下「本規約」）は、ウェブサイト、ソフトウェア、大規模モデル、および技術の進展に伴う新たな形態を通じて提供する製品とサービスに適用されます。特に当社の責任を免除または制限する条項を含め、全文を慎重に読み、内容を十分に理解した上で同意するかどうかを選択してください。すべての条項に同意いただけない場合は、ソフトウェアと関連サービスをダウンロード、インストール、または利用しないでください。同意ボタンを押す、ダウンロードする、インストールする、利用する、ログインするなどの行為により、本規約を読み、その拘束を受けることに同意したものとします。",
        "当社のプライバシーポリシーと随時公表するその他の方針や規則は、本規約の一部を構成します。当社は本規約を随時更新する場合があります。重要な変更は、このページへの新バージョンの掲載やメールなどで発効日とともに通知し、発効前の行為に遡及して適用しません。発効後も WebCross のソフトウェアとサービスを使い続けた場合、新しい条項に同意したものとします。当社は明示的にお客様に付与していないすべての権利を留保します。",
        "本規約を遵守することを条件に、当社は本ソフトウェアを利用するための個人的、譲渡不能、非独占的なライセンスを付与します。適用法令が許す最大限の範囲で、ソフトウェアやサービスを利用したこと、または利用できなかったことから生じる特別、偶発的、直接的、間接的な権利侵害や損失について、当社は賠償責任を負いません。当社があらかじめ損害の可能性を知らされていた場合も同様です。",
        "本規約への違反により、アカウントの利用またはサービスへのアクセスが終了する場合があります。WebCross のソフトウェアとサービスは、ご自身の責任でご利用ください。",
      ],
    },
    summaryTitle: "利用前にご確認ください",
    summary: [
      {
        title: "適法かつ許可された範囲で利用",
        text: "適用法令と、対象サイト、モデル、プロキシサービスの規則を守ってください。無断アクセスやその他の不正利用に WebCross を使うことは禁止されています。",
      },
      {
        title: "自動化の結果はご自身で確認",
        text: "ウェブページの環境、第三者サービス、モデルの出力は変化する可能性があります。ログイン、提出、取引など重要な操作を行う前に、ページと操作内容をご確認ください。",
      },
      {
        title: "フィンガープリント機能の保証範囲",
        text: "フィンガープリント設定と環境分離は、一貫したブラウザー環境のための機能です。プラットフォームのリスク管理、識別、セキュリティ対策の回避を保証するものではありません。",
      },
    ],
    sections: [
      {
        id: "acceptance",
        title: "規約への同意と適用範囲",
        paragraphs: [
          "本規約は、お客様と WebCross サービスの実際の提供者の双方に適用されます。同意ボタンを押す、ダウンロードする、インストールする、またはサービスにアクセスして利用することで、本規約とプライバシーポリシーを読み、同意したものとします。組織を代表して利用する場合、その組織を本規約に拘束する権限があることを確認するものとします。",
          "特定のダウンロード、注文、試験機能、企業向け導入には追加条件が適用される場合があります。内容が抵触する場合、追加条件は明示された範囲に限り優先します。",
        ],
      },
      {
        id: "eligibility",
        title: "利用資格と認証情報の管理",
        paragraphs: [
          "本規約を締結するために必要な法的行為能力を備えている必要があります。未成年者は保護者の指導と同意のもとでサービスをご利用ください。",
          "アカウント、API キー、プロキシの認証情報などが必要な場合は、適法で正確な情報を提供し、認証情報を適切に管理してください。その認証情報を用いて行われた操作にはお客様が責任を負います。不正利用が判明した場合は速やかに当社へお知らせください。",
        ],
      },
      {
        id: "license",
        title: "ソフトウェアライセンス",
        paragraphs: [
          "本規約の遵守を条件に、適法な社内業務または個人的な目的で WebCross を使用するための限定的、非独占的、譲渡不能かつ取消可能なライセンスを付与します。",
          "適用法令で明示的に許される場合や該当するオープンソースライセンスに別段の定めがある場合を除き、複製、賃貸、販売、再許諾、リバースエンジニアリング、技術的制限の回避、権利表示の削除は禁止します。第三者製コンポーネントとオープンソースコンポーネントには、各ライセンスが適用されます。",
        ],
      },
      {
        id: "acceptable-use",
        title: "利用ルールと禁止行為",
        paragraphs: ["適用されるすべての法令を遵守してください。WebCross を使って次の行為を行うこと、他者による実行を支援すること、または便宜を図ることを禁止します。"],
        bullets: [
          "適用法令、第三者との契約、対象プラットフォームの規則に違反し、または他者のプライバシー、知的財産権その他の正当な権利を侵害する行為。",
          "国家の安全を脅かし、国家機密を漏えいし、国家体制の転覆を図り、国家の統一を損ない、または国家の名誉と利益を害する行為。",
          "邪教や封建的な迷信を広め、または流言を拡散し、社会秩序や安定を損なう行為。",
          "わいせつ、ポルノ、賭博、暴力、殺人、テロ、嫌がらせ、低俗な内容、または犯罪をそそのかす内容の拡散。",
          "他者への侮辱、名誉毀損、詐欺、嫌がらせ、なりすまし、またはソフトウェアを使って事実を捏造・隠蔽し、他者を誤導もしくは欺く行為。",
          "オンライン賭博やギャンブルゲームなど違法なインターネット上の活動。",
          "アカウント、端末、ネットワーク、インターフェース、データへの無断アクセス、スキャン、制御、妨害、または回避する権限がないセキュリティ対策の回避。",
          "許可なくコンピューターネットワークの機能や、そこで保存・処理・送信されるデータとアプリケーションを削除、変更、追加する行為。またはコンピューターシステムの正常な動作を妨害する行為。",
          "悪意あるコード、ウイルスなど破壊的なプログラムを配布し、本ソフトウェアのシステム、ウェブサイト、その他のサービスの正常な動作を妨げる行為。",
          "本ソフトウェアの電子的な権利管理情報を削除・変更し、または著作権を守る技術的措置を意図的に回避・破壊する行為。",
          "WebCross 製品、許可されたアカウント、または管理ユーザーのサブアカウントを転売する行為。",
          "手動・自動を問わず、ソフトウェアや機器を使って WebCross のソフトウェアやサービスの一部をクロールまたはスクレイピングする行為。",
          "合理的な負荷を超えるリクエストを送信し、または他の利用者による正常な利用を妨害する行為。",
          "専門資格が必要な判断に適切な人の確認を経ずに自動化の出力を使い、または法令で禁止された高リスクの用途に使う行為。",
          "コンピューターネットワークの安全を脅かすその他の行為、公序良俗に反する行為、または法令で禁止された行為。",
        ],
      },
      {
        id: "automation",
        title: "自動化タスクと手動での管理",
        paragraphs: [
          "WebCross はお客様の指示に従ってブラウザーでタスクを実行します。指示、スクリプト、対象ページ、その後の操作に適法な根拠があることを確認してください。提出、投稿、削除、決済など重要な操作の前には必要な確認を行ってください。",
          "ページ構造、権限、モデルの応答、ネットワークの状態が変わると、タスクの停止、失敗、不完全な結果につながる場合があります。重要なデータはバックアップし、重要な手順には適切な手動確認と復旧の手段を用意してください。",
          "アカウントやパスワードなどの機密情報を守るため、ウォレット決済、アカウントへのログインなどは人が行うよう、モデルの動作を制限しています。これらの場面でモデルに自動操作を指示しないでください。手動確認の要件を回避して生じるリスクと損失は、お客様が負担します。",
        ],
      },
      {
        id: "fingerprints-third-parties",
        title: "フィンガープリント、第三者サービス、プライバシー",
        paragraphs: [
          "ブラウザーフィンガープリントの設定、ローカル環境の分離、プロキシ設定は、匿名性や識別不能を保証するものではありません。対象サイトは、保有するアカウント情報、ネットワーク情報、行動などから判断できます。法的義務の回避や、無断でプラットフォームの管理措置を回避するためにこれらの機能を使うことは禁止します。",
          "選択した AI モデル、プロキシ、対象サイト、拡張機能などは各第三者が提供します。その条件を守り、データの送信先をご自身で確認してください。タスクに必要なページ情報が選択したモデルサービスに送られる場合があります。ローカルに保存する場合でも、第三者がデータを受け取ることがあります。詳細はプライバシーポリシーをご覧ください。",
        ],
      },
      {
        id: "fees",
        title: "料金と注文（該当する場合）",
        paragraphs: [
          "有料機能の価格、請求期間、サービスの範囲、自動更新と返金のルールには、購入時に表示された注文内容や個別条件が適用されます。合意した料金を支払い、適法で有効な支払い情報を提供してください。",
          "お客様の確認なしに、本規約のみを根拠に新しい料金を課すことはありません。料金やサービスプランの変更は、適用される規則に従って事前に案内します。",
        ],
      },
      {
        id: "intellectual-property",
        title: "知的財産権とフィードバック",
        paragraphs: [
          "WebCross のソフトウェア、インターフェース、ブランド表示、サイトの内容に関する権利は、各権利者またはライセンサーに帰属します。本規約による権利の譲渡はありません。お客様が提供する指示、ファイル、その他の内容について、お客様の正当な権利は引き続きお客様に帰属します。",
          "お客様が自発的に提供した提案や意見は、製品改善に利用することがあります。当社は、それによってお客様の機密情報を公開する義務や、お客様に対価を支払う義務を負いません。共有する権限がない第三者の内容は送信しないでください。",
        ],
      },
      {
        id: "updates-termination",
        title: "アップデート、サービス変更、終了",
        paragraphs: [
          "問題修正、安全性向上、機能改善のために更新を提供し、合理的な範囲で一部サービスを変更または終了する場合があります。利用に大きく影響する変更は適切な方法でお知らせします。",
          "いつでも利用を中止し、クライアントをアンインストールできます。ローカルデータは本規約に従って管理できます。重大な違反、安全上のリスク、または法的な停止要件がある場合、適用法令の範囲内で対象サービスへのアクセスを制限または停止し、可能な場合はその理由をお知らせします。",
        ],
      },
      {
        id: "enforcement-liability",
        title: "違反への対応と責任",
        paragraphs: [
          "禁止行為、違法・無断利用、その他の本規約違反がある場合、当社は合理的な判断で該当行為を制限し、厳格な措置を講じることができます。違反者に適切な法的措置を取り、法令に従って情報を保存し、所管機関に報告する場合があります。これに伴う法的責任はお客様がすべて負います。",
          "他者のサーバーへの侵入、コンピューターネットワークへの無断アクセス、資源の無断利用などによる法的責任と結果はすべてお客様が負います。WebCross はこれらの行為や、そこから生じる身体・財産への損害、第三者からの請求につき責任を負いません。",
          "本規約や関連サービス条件の違反により第三者からの請求、要求、損失が生じた場合、お客様が責任を負い、当社に生じた損失を賠償します。当社が確定判決や裁定などに基づき先に負担した場合、お客様に全額を求償できます。",
        ],
      },
      {
        id: "disclaimers-liability",
        title: "免責事項と責任の制限",
        paragraphs: [
          "適用法令が許す最大限の範囲で、WebCross は現状有姿かつ提供可能な状態で提供されます。中断やエラーがないこと、第三者がフィンガープリント設定を識別しないこと、モデルや自動化の結果が特定の目的に適合することは保証しません。",
          "適用法令が許す最大限の範囲で、ソフトウェアやサービスの利用または利用不能によって生じた特別、偶発的、直接的、間接的な権利侵害や損失について、可能性を事前に知らされていた場合も賠償責任を負いません。違法な利用、無断操作、第三者サービスの変更、不十分なバックアップによる損失についても責任を負いません。法令上免除または制限できない責任を免除・制限する条項はありません。",
        ],
      },
      {
        id: "changes-contact",
        title: "規約の更新とお問い合わせ",
        paragraphs: [
          "製品、サービス、法的要件に応じて本規約を更新し、最新版と日付をこのページに掲載する場合があります。重要な変更は適切な方法でお知らせします。更新後も利用を続けた場合の法的効果は、適用法令に従います。",
          "本規約に関するご質問やサポートについては、service@webcross.ai までご連絡ください。",
        ],
      },
    ],
  },
};

const ko: Record<LegalKind, LegalCopy> = {
  privacy: {
    title: "개인정보 처리방침",
    eyebrow: "WEBCROSS / PRIVACY",
    lead: "당사는 이용자의 데이터가 어디에서 처리되는지를 중요하게 생각합니다. 이 방침은 WebCross 공식 사이트와 클라이언트의 정보 처리 방식, 특히 기기에서 처리되는 브라우저 핑거프린트와 WebCross 서버에서 수집하는 정보를 구분해 설명합니다.",
    preamble: {
      paragraphs: [
        "제품과 서비스를 이용하기 전에 이 개인정보 처리방침(이하 ‘본 방침’)을 자세히 읽고 내용을 충분히 이해해 주세요. WebCross 공식 사이트에 접속하거나 클라이언트를 다운로드·설치·사용하거나 관련 서비스를 이용하면 본 방침과 서비스 이용약관에 동의한 것으로 봅니다. 동의하지 않으면 제품과 서비스를 이용하지 마세요. 본 방침이 변경된 후 이용을 계속하면 변경 사항에 동의한 것으로 봅니다.",
        "본 방침은 당사가 제공하는 모든 제품과 서비스에 적용됩니다. 본 방침, 제품이나 서비스, 당사와의 거래에 관한 문의는 페이지 하단의 연락처로 보내 주세요. 당사는 다음 원칙을 따릅니다.",
      ],
      bullets: [
        "실제로 필요한 경우에만 개인정보 제공을 요청합니다.",
        "법령 준수, 제품 개발 또는 당사의 권리 보호에 필요한 경우에만 개인정보를 공유합니다.",
        "서비스를 지속적으로 제공하는 데 필요한 경우에만 개인정보를 서버에 저장합니다.",
      ],
    },
    summaryTitle: "먼저 알아둘 세 가지",
    summary: [
      {
        title: "여기서 말하는 핑거프린트는 브라우저 기술 정보",
        text: "여기서 ‘핑거프린트’는 User-Agent, 시간대, 화면과 렌더링 특성 등 브라우저 기술 정보를 뜻합니다. 신체의 지문, 얼굴, 성문 등 생체정보는 포함하지 않습니다.",
      },
      {
        title: "핑거프린트 설정은 기본적으로 기기에 저장",
        text: "격리 환경을 만들기 위해 클라이언트가 읽고 생성하고 저장하는 핑거프린트 설정은 기본적으로 이용자의 기기에 저장됩니다. 이러한 로컬 처리 과정에서 해당 정보가 WebCross 서버로 업로드되지는 않습니다.",
      },
      {
        title: "개인정보 판매 및 광고 목적의 사이트 간 추적 금지",
        text: "당사는 개인정보를 판매하지 않으며, WebCross 클라이언트에서 본 콘텐츠를 이용해 여러 사이트에 걸친 광고 프로필을 만들지 않습니다.",
      },
    ],
    sections: [
      {
        id: "scope",
        title: "적용 범위와 기본 원칙",
        paragraphs: [
          "본 방침은 공식 사이트 접속, 클라이언트 다운로드·업데이트·이용, 이메일을 통한 고객 지원 문의에 적용됩니다. 당사는 적법성, 정당성, 필요성, 최소화 원칙에 따라 명확한 목적에 필요한 정보만 처리합니다.",
          "WebCross에서 접속하는 사이트, 직접 설정한 프록시, 선택한 AI 모델 서비스 및 기타 제3자 제품에는 각 서비스의 개인정보 처리방침이 적용됩니다.",
        ],
      },
      {
        id: "fingerprint",
        title: "처리하는 브라우저 핑거프린트 정보",
        paragraphs: [
          "격리된 브라우저 환경을 만들고 설정하고 유지하기 위해 클라이언트는 이용자 기기에서 필요한 핑거프린트 정보를 읽거나 생성하거나 저장합니다. 버전과 선택한 기능에 따라 다음 정보가 포함될 수 있습니다.",
        ],
        bullets: [
          "브라우저와 시스템 특성. User-Agent, 브라우저 엔진 및 버전, 운영체제, 플랫폼, 기기 아키텍처.",
          "지역과 표시 특성. 언어, 지역, 시간대, 화면 해상도, 창 크기, 색 심도, 글꼴 특성.",
          "하드웨어와 렌더링 특성. 기기 메모리, 논리 프로세서 수, Canvas, WebGL, 오디오 등 인터페이스에 나타나는 기술 특성.",
          "네트워크와 환경 설정. 이용자가 설정한 프록시, 출구 네트워크 관련 매개변수, WebRTC 설정, 로컬 환경을 구분하는 식별자.",
          "이러한 정보는 먼저 기기에서 처리합니다. 해당 버전에서 제공하는 온라인 동기화, 백업 또는 진단 자료 업로드를 이용자가 직접 사용할 때에만 그 기능에 필요한 범위에서 설정을 전송합니다.",
        ],
      },
      {
        id: "server-data",
        title: "WebCross 서버가 수집할 수 있는 정보",
        paragraphs: [
          "온라인 서비스를 이용할 때 당사 또는 호스팅·보안 서비스 제공업체는 필요한 범위에서 다음 정보를 처리할 수 있습니다.",
        ],
        bullets: [
          "사이트 및 기술 로그. IP 주소, 요청 시각, 방문 페이지, 유입 페이지, 브라우저와 운영체제 유형, 사이트 보안에 필요한 요청 및 오류 정보.",
          "다운로드 및 업데이트 정보. 요청한 클라이언트 버전, 운영체제, 다운로드나 업데이트 시각, 필요한 오류 진단 정보.",
          "이용자가 직접 제공하는 정보. 고객 지원에 사용한 이메일 주소, 이메일 내용, 직접 제출하기로 한 문제 설명, 로그 또는 첨부 파일.",
          "환경설정 및 필수 저장 정보. 공식 사이트가 언어 설정 저장이나 보안 상태 유지를 위해 쿠키 또는 로컬 저장소를 사용하는 경우 해당 기능에 필요한 정보만 처리합니다. 브라우저 설정에서 이 정보를 관리하거나 삭제할 수 있습니다.",
        ],
      },
      {
        id: "not-collected",
        title: "당사가 선제적으로 수집하지 않는 정보",
        paragraphs: [
          "이용자가 명시적으로 제공하거나 관련 법령에서 달리 요구하는 경우를 제외하면, WebCross는 기본 탐색 및 자동화 기능을 제공하기 위해 다음 정보를 선제적으로 수집하지 않습니다.",
        ],
        bullets: [
          "신체 지문, 얼굴, 성문 또는 홍채 등 생체인식 정보.",
          "실명, 정부 발급 신분증 번호, 정확한 위치, 연락처 목록이나 사진 앨범 등 개인 식별 정보. 가입할 때에만 SMS, 전화번호 또는 이메일로 신청자가 자연인인지 확인합니다.",
          "제3자 사이트의 계정과 비밀번호, 쿠키, 캐시, 방문 기록, 양식 내용과 페이지 파일을 WebCross 자체 서버로 업로드하지 않습니다. 해당 세션 데이터는 기본적으로 로컬 환경에만 저장됩니다.",
          "사이트 간 광고 추적이나 데이터 중개업체에 판매할 목적으로 만든 개인 프로필.",
          "자동화 지시를 수행하기 위해 클라이언트가 기기에서 페이지 내용을 읽을 수 있습니다. 이는 WebCross 서버의 정보 수집과는 별개입니다. 진단 자료를 보내기 전에 공유하면 안 되는 비밀번호, 토큰, 개인정보를 제거해 주세요.",
        ],
      },
      {
        id: "use",
        title: "정보 이용 목적",
        bullets: [
          "독립된 브라우저 환경을 만들고 유지하며 핑거프린트, 네트워크와 로컬 저장소 설정을 환경별로 분리합니다.",
          "공식 사이트, 다운로드, 업데이트, 문제 진단 및 고객 지원을 제공합니다.",
          "공격, 남용, 악성 트래픽과 기타 위험을 막고 서비스의 무결성을 유지합니다.",
          "정보를 집계하거나 비식별화한 후 안정성과 성능을 분석해 제품 이용 경험을 개선합니다.",
          "관련 법령에 따른 의무를 이행하고 적법하고 필요한 감독기관 또는 사법기관의 요청에 대응합니다.",
        ],
      },
      {
        id: "third-parties",
        title: "제3자 서비스와 데이터 전송",
        paragraphs: [
          "WebCross는 로컬 처리를 우선합니다. 이용자가 제3자 서비스를 선택해 사용하면 해당 작업에 따라 기기 외부로 데이터가 전송될 수 있습니다.",
        ],
        bullets: [
          "AI 모델 서비스를 선택하면 작업에 필요한 지시와 페이지 정보가 해당 모델 서비스 제공업체에 전송될 수 있습니다.",
          "프록시를 설정하면 대상 트래픽과 네트워크 주소가 선택한 프록시 사업자를 거칩니다.",
          "사이트에 접속하면 해당 사이트의 기술 방식에 따라 IP 주소와 브라우저가 제시하는 핑거프린트 특성이 전달됩니다.",
          "제3자 확장 프로그램, 인터페이스 또는 연동 기능을 사용하면 제공업체가 자체 개인정보 처리방침에 따라 데이터를 처리할 수 있습니다.",
          "설정 전에 제3자의 개인정보 및 보안 조건을 확인해 주세요. 제3자가 독립적으로 수집하는 데이터에는 WebCross의 ‘기기 내 처리’에 관한 설명이 적용되지 않습니다.",
        ],
      },
      {
        id: "sharing",
        title: "공유, 공개 및 보관",
        paragraphs: [
          "당사는 개인정보를 판매하지 않습니다. 법령 준수, 제품 개발 또는 당사의 권리 보호에 필요한 경우에만 개인정보를 공유합니다. 호스팅, 보안, 다운로드 배포 등 필수 서비스에 필요한 기술 정보는 기밀 유지와 보안 의무가 있는 제공업체에 필요한 범위에서 공유합니다. 이용자의 명시적인 동의가 있거나 관련 법령에 별도 규정이 있는 경우를 제외하면 다른 제3자에게 정보를 제공하지 않습니다.",
          "당사 관계사는 본 방침에 명시한 목적에 필요한 범위에서 개인정보를 받을 수 있습니다. 합병, 인수, 조직 개편 등으로 제3자가 당사 사업, 재산 또는 지분의 일부나 전부를 취득하는 경우 개인정보를 해당 제3자에게 이전하고 본 방침과 같거나 더 높은 수준으로 보호하도록 요구할 수 있습니다.",
          "관련 법령이나 관할 정부기관의 요구에 따라 법원의 소환장, 유사한 법적 절차 또는 정부 요청에 응하기 위해 개인정보를 공개할 수 있습니다. 법이 요구한다고 판단하거나 당사의 권리와 재산, 다른 이용자의 권리·재산·신체 안전을 보호하는 데 필요하다고 판단하면 수사기관 또는 사법 감독기관 등에 개인정보를 공개할 수 있습니다.",
          "온라인 로그와 고객 지원 정보는 위 목적 달성, 보안 유지 또는 법적 의무 이행에 필요한 기간에만 보관합니다. 로컬 환경, 쿠키, 캐시와 기타 클라이언트 데이터의 보관 기간은 이용자가 제어합니다. 클라이언트 관리 기능이나 로컬 데이터 삭제를 통해 지울 수 있습니다. 제거하기 전에 보존할 내용을 직접 백업해 주세요.",
        ],
      },
      {
        id: "security-rights",
        title: "보안 조치와 이용자의 권리",
        paragraphs: [
          "당사는 관리하는 정보를 보호하기 위해 위험에 맞는 기술적·관리적 조치를 취합니다. 네트워크 전송이나 저장의 절대적인 안전을 보장할 수는 없습니다. 이용자도 기기, 프록시 인증 정보, 모델 API 키와 로컬 환경 데이터를 안전하게 관리해야 합니다.",
          "관련 법령이 허용하는 범위에서 당사가 보유한 개인정보의 열람, 정정, 삭제를 요청하고, 특정 처리에 이의를 제기하거나 처리를 제한하며 기존 동의를 철회할 수 있습니다. 로컬 데이터는 기기 또는 클라이언트에서 직접 관리할 수 있습니다. 도움이 필요하면 페이지 하단 이메일로 문의해 주세요. 계정과 데이터 보호를 위해 요청의 진위를 확인할 수 있습니다.",
        ],
      },
      {
        id: "minors-international",
        title: "미성년자와 국외 처리",
        paragraphs: [
          "WebCross는 필요한 민사상 행위능력을 갖춘 전문 사용자와 팀을 대상으로 설계되었습니다. 보호자가 미성년자가 당사에 개인정보를 제공한 사실을 확인한 경우 당사에 연락해 주세요.",
          "당사 서버나 서비스 제공업체가 이용자의 국가 또는 지역 외부에 있는 경우 기술 로그나 고객 지원 정보가 국외로 이전될 수 있습니다. 당사는 관련 법령이 요구하는 범위에서 필요한 보호 조치를 취합니다.",
        ],
      },
      {
        id: "changes-contact",
        title: "방침 변경과 문의",
        paragraphs: [
          "제품 기능이나 법적 요건이 달라지면 본 방침을 변경할 수 있습니다. 이 페이지에 최신 버전과 날짜를 게시하고 중요한 변경은 적절한 방식으로 별도 안내합니다. 영향을 받는 서비스를 계속 이용하기 전에 변경 내용을 확인해 주세요.",
          "본 방침, 정보 수집 범위 또는 이용자의 권리에 관한 문의는 service@webcross.ai로 보내 주세요.",
        ],
      },
    ],
  },
  agreement: {
    title: "서비스 이용약관",
    eyebrow: "WEBCROSS / TERMS",
    lead: "본 약관은 WebCross 공식 사이트 접속, 클라이언트 다운로드·설치·이용, 관련 서비스 이용 시의 권리, 책임 및 데이터 처리 범위를 규정합니다.",
    preamble: {
      paragraphs: [
        "WebCross(이하 ‘당사’)의 제품과 서비스에 오신 것을 환영합니다. 이 서비스 이용약관(이하 ‘본 약관’)은 당사가 웹사이트, 소프트웨어, 대규모 모델 및 기술 발전에 따른 새로운 형태로 제공하는 모든 제품과 서비스에 적용됩니다. 특히 당사의 책임을 면제하거나 제한하는 조항을 포함해 전체 조항을 신중히 읽고 충분히 이해한 후 동의 여부를 결정해 주세요. 모든 조항을 읽고 동의하지 않는 경우 소프트웨어나 관련 서비스를 다운로드, 설치 또는 이용하지 마세요. 동의 버튼을 누르거나 다운로드, 설치, 이용, 로그인 등을 하면 본 약관을 읽고 그 적용을 받는 데 동의한 것으로 봅니다.",
        "이용자는 당사의 개인정보 처리방침과 수시로 공표되는 기타 정책 및 규칙이 본 약관의 일부를 구성하는 데 동의합니다. 당사는 본 약관을 개정할 수 있습니다. 중요한 변경은 이 페이지에 새 버전을 게시하거나 이메일을 보내는 등의 방식으로 시행일과 함께 알립니다. 새 버전은 시행 전 행위에 소급 적용되지 않습니다. 시행 후 WebCross 소프트웨어와 서비스를 계속 사용하면 변경 조항에 동의한 것으로 봅니다. 당사는 본 약관에서 명시적으로 부여하지 않은 모든 권리를 보유합니다.",
        "본 약관을 준수하는 조건으로 당사는 소프트웨어를 사용할 수 있는 개인적이고 양도할 수 없는 비독점적 이용권을 부여합니다. 관련 법령이 허용하는 최대 범위에서 소프트웨어 및 서비스를 이용하거나 이용하지 못해 발생한 특별, 우발적, 직접 또는 간접적인 권리 침해나 손실에 대해 당사는 배상 책임을 지지 않습니다. 당사가 그 가능성을 미리 통지받은 경우에도 같습니다.",
        "본 약관을 위반하면 계정이나 서비스 접근 권한이 종료될 수 있습니다. 이용자는 WebCross 소프트웨어와 서비스 이용에 따른 위험을 스스로 부담하는 데 동의합니다.",
      ],
    },
    summaryTitle: "이용 전에 확인하세요",
    summary: [
      {
        title: "적법하고 허가된 범위에서 이용",
        text: "관련 법령과 대상 사이트, 모델, 프록시 서비스의 규칙을 준수해야 합니다. WebCross를 무단 접근이나 기타 남용에 이용해서는 안 됩니다.",
      },
      {
        title: "자동화 결과는 직접 확인",
        text: "웹 환경, 제3자 서비스와 모델 출력은 달라질 수 있습니다. 로그인, 제출, 거래 등 중요한 작업 전에 페이지와 작업 내용을 확인하세요.",
      },
      {
        title: "핑거프린트 기능의 보장 범위",
        text: "핑거프린트 설정과 환경 분리는 일관된 브라우저 환경을 제공하기 위한 기능입니다. 플랫폼의 위험 관리, 식별 또는 보안 조치를 우회할 수 있다고 보장하지 않습니다.",
      },
    ],
    sections: [
      {
        id: "acceptance",
        title: "약관 동의 및 적용 범위",
        paragraphs: [
          "본 약관은 이용자와 WebCross 서비스의 실제 제공자에게 적용됩니다. 동의 버튼을 누르거나 관련 서비스를 다운로드, 설치, 접속 또는 이용하면 본 약관과 개인정보 처리방침을 읽고 동의한 것으로 봅니다. 조직을 대표해 서비스를 이용하는 경우 해당 조직을 본 약관에 구속할 권한이 있음을 확인합니다.",
          "특정 다운로드, 주문, 테스트 기능 또는 기업 배포에 별도 조건이 적용될 수 있습니다. 조건이 충돌하면 해당 별도 조건에 명시된 범위에서만 우선합니다.",
        ],
      },
      {
        id: "eligibility",
        title: "이용 자격과 인증 정보 관리 책임",
        paragraphs: [
          "이용자는 본 약관 체결에 필요한 민사상 행위능력을 갖춰야 합니다. 미성년자는 보호자의 지도와 동의를 받아 서비스를 이용해야 합니다.",
          "기능에 계정, API 키, 프록시 자격 증명 또는 기타 인증 정보가 필요하면 적법하고 정확한 정보를 제공하고 안전하게 관리해야 합니다. 해당 인증 정보로 이루어진 작업에 대한 책임은 이용자에게 있습니다. 무단 사용을 발견하면 신속히 당사에 알려 주세요.",
        ],
      },
      {
        id: "license",
        title: "소프트웨어 라이선스",
        paragraphs: [
          "본 약관을 준수하는 조건으로 WebCross를 적법한 내부 업무 또는 개인 목적으로 이용할 수 있는 제한적이고 비독점적이며 양도할 수 없고 철회 가능한 이용권을 부여합니다.",
          "관련 법령에서 명시적으로 허용하거나 해당 오픈소스 라이선스에서 별도로 정한 경우를 제외하면 소프트웨어의 복제, 대여, 판매, 재허락, 역설계, 기술적 제한 우회 또는 권리 표시 제거가 금지됩니다. 제3자 및 오픈소스 구성 요소에는 각 라이선스가 적용됩니다.",
        ],
      },
      {
        id: "acceptable-use",
        title: "허용되는 이용 및 금지 행위",
        paragraphs: ["관련 법령을 모두 준수해야 합니다. 직접 WebCross를 이용해 다음 행위를 하거나 타인의 행위를 돕거나 편의를 제공해서는 안 됩니다."],
        bullets: [
          "관련 법령, 제3자 계약 또는 대상 플랫폼 규칙을 위반하거나 타인의 개인정보, 지식재산권 및 기타 정당한 권리를 침해하는 행위.",
          "국가 안보를 해치거나 국가 기밀을 유출하거나 국가 정권을 전복하거나 국가 통일을 훼손하거나 국가의 명예와 이익을 해치는 행위.",
          "사교나 봉건적 미신을 선전하거나 허위 소문을 퍼뜨려 사회 질서와 안정을 해치는 행위.",
          "음란물, 성적 콘텐츠, 도박, 폭력, 살인, 테러, 괴롭힘, 저속한 내용 또는 범죄를 부추기는 콘텐츠의 유포.",
          "타인을 모욕하거나 명예를 훼손하거나 사기, 괴롭힘, 사칭을 하거나, 소프트웨어로 사실을 꾸미거나 은폐해 타인을 오도하거나 속이는 행위.",
          "베팅이나 도박 게임 등 불법 인터넷 활동.",
          "계정, 기기, 네트워크, 인터페이스 또는 데이터에 무단으로 접근, 스캔, 제어, 간섭하거나 우회할 권한이 없는 보안 조치를 우회하는 행위.",
          "허가 없이 컴퓨터 정보망의 기능이나 그 안에서 저장, 처리, 전송되는 데이터와 앱을 삭제, 변경, 추가하거나 컴퓨터 정보 시스템이 정상적으로 작동하지 못하도록 방해하는 행위.",
          "악성 코드나 컴퓨터 바이러스 등 파괴적인 프로그램을 유포해 소프트웨어 시스템, 웹사이트 또는 기타 서비스의 정상 작동을 방해하는 행위.",
          "소프트웨어의 전자적 권리 관리 정보를 삭제하거나 변경하고, 저작권 보호를 위한 기술적 조치를 고의로 우회하거나 훼손하는 행위.",
          "WebCross 제품, 이용 권한이 부여된 계정 또는 관리 사용자의 하위 계정을 어떤 방식으로든 재판매하는 행위.",
          "수동 또는 자동 방식에 관계없이 소프트웨어나 기기를 사용해 WebCross 소프트웨어 또는 서비스의 일부를 크롤링하거나 스크래핑하는 행위.",
          "합리적인 부하를 넘어서는 방식으로 서비스에 요청하거나 다른 이용자의 정상적인 이용을 방해하는 행위.",
          "적절한 사람의 검토 없이 전문 자격이 필요한 판단에 자동화 결과를 사용하거나 법으로 금지된 고위험 상황에 이를 사용하는 행위.",
          "컴퓨터 정보망 보안을 해치거나 공서양속을 위반하거나 법령이 금지하는 기타 행위.",
        ],
      },
      {
        id: "automation",
        title: "자동화 작업과 사용자 제어",
        paragraphs: [
          "WebCross는 이용자 지시에 따라 브라우저 작업을 실행할 수 있습니다. 지시, 스크립트, 대상 페이지 및 후속 작업에 적법한 근거가 있는지 확인하고 제출, 게시, 삭제, 결제 등 중요한 작업 전에는 필요한 검토를 하세요.",
          "페이지 구조, 권한 상태, 모델 응답과 네트워크 조건이 변하면 작업이 일시 중지되거나 실패하거나 결과가 불완전할 수 있습니다. 중요 데이터는 백업하고 핵심 절차에는 적절한 사람의 확인과 복구 방법을 마련하세요.",
          "계정, 비밀번호 등 민감한 정보의 유출을 막기 위해 지갑 결제, 계정 로그인 등의 단계는 사람이 직접 완료하도록 모델을 제한했습니다. 이러한 상황에서 모델에 자동 조작을 요청하지 마세요. 사람의 확인 요건을 우회해 발생하는 위험과 손실은 이용자가 부담합니다.",
        ],
      },
      {
        id: "fingerprints-third-parties",
        title: "핑거프린트, 제3자 서비스 및 개인정보",
        paragraphs: [
          "브라우저 핑거프린트 설정, 로컬 환경 분리, 프록시 설정은 익명성이나 식별 불가능성을 보장하지 않습니다. 대상 사이트는 보유한 계정, 네트워크, 행동 또는 기타 정보를 바탕으로 판단할 수 있습니다. 법적 의무를 피하거나 플랫폼의 통제를 무단으로 우회하는 데 해당 기능을 사용해서는 안 됩니다.",
          "선택한 AI 모델, 프록시, 대상 사이트, 확장 프로그램 및 기타 서비스는 해당 제3자가 제공합니다. 각 약관을 준수하고 데이터 흐름을 직접 평가하세요. 작업에 필요한 페이지 정보는 선택한 모델 서비스로 전송될 수 있습니다. 로컬에 저장되는 경우에도 제3자가 데이터를 받을 수 있습니다. 자세한 처리 방식은 개인정보 처리방침을 참조하세요.",
        ],
      },
      {
        id: "fees",
        title: "요금과 주문(해당하는 경우)",
        paragraphs: [
          "유료 기능을 구매하는 경우 가격, 청구 주기, 서비스 범위, 자동 갱신 및 환불은 구매 시 명시된 주문이나 별도 조건에 따릅니다. 약정된 요금을 납부하고 적법하고 유효한 결제 정보를 제공해야 합니다.",
          "이용자의 확인 없이 본 약관만을 근거로 새로운 요금을 부과하지 않습니다. 가격이나 서비스 요금제가 변경되면 관련 규정에 따라 사전에 안내합니다.",
        ],
      },
      {
        id: "intellectual-property",
        title: "지식재산권과 피드백",
        paragraphs: [
          "WebCross의 소프트웨어, 인터페이스, 브랜드 표지 및 웹사이트 콘텐츠 관련 권리는 각 권리자 또는 라이선스 제공자에게 있습니다. 본 약관에 따라 그 권리가 이전되지는 않습니다. 이용자가 제공한 지시, 파일, 기타 콘텐츠에 대한 정당한 권리는 이용자에게 있습니다.",
          "이용자가 자발적으로 제공한 제안이나 피드백은 제품 개선에 사용될 수 있습니다. 그로 인해 당사가 이용자의 기밀정보를 공개하거나 대가를 지급할 의무를 부담하지는 않습니다. 공유할 권한이 없는 제3자의 콘텐츠는 제출하지 마세요.",
        ],
      },
      {
        id: "updates-termination",
        title: "업데이트, 서비스 변경 및 종료",
        paragraphs: [
          "문제를 수정하거나 안전성을 높이거나 기능을 개선하기 위해 업데이트를 제공하고 합리적인 범위에서 서비스 일부를 조정하거나 중단할 수 있습니다. 이용에 실질적으로 영향을 미치는 변경은 적절한 방법으로 알립니다.",
          "이용자는 언제든지 이용을 중지하고 클라이언트를 삭제할 수 있으며 본 약관에 따라 로컬 데이터를 관리할 수 있습니다. 중대한 위반, 보안 위험, 법적 중단 요구가 있는 경우 당사는 관련 법령이 허용하는 범위에서 관련 접근을 제한하거나 종료하고 가능한 경우 이유를 설명합니다.",
        ],
      },
      {
        id: "enforcement-liability",
        title: "위반 조치와 책임",
        paragraphs: [
          "이용자가 금지 행위를 하거나 불법 또는 무단 목적으로 서비스를 이용하거나 기타 본 약관을 위반하면 당사는 합리적인 판단에 따라 해당 행위를 엄격히 제한하거나 제재할 수 있습니다. 위반 이용자에게 적절한 법적 조치를 취하고 법령에 따라 관련 정보를 보관하고 관할 기관에 보고할 수 있습니다. 이에 따른 법적 책임은 이용자가 전적으로 부담합니다.",
          "타인의 서버에 침입하거나 컴퓨터 정보망에 무단 접근하거나 그 자원을 무단 이용한 행위에 따른 법적 책임과 결과는 이용자가 전적으로 부담합니다. WebCross는 이러한 행위나 그로 인한 신체적·재산상 손해 또는 제3자의 청구에 책임을 지지 않습니다.",
          "본 약관이나 관련 서비스 조건 위반으로 발생한 제3자의 청구, 요구 또는 손실에 대한 책임은 이용자가 부담하고, 그로 인한 당사의 손실도 배상해야 합니다. 당사가 확정판결이나 재결 등에 따라 먼저 책임을 이행했다면 이용자에게 전액을 구상할 수 있습니다.",
        ],
      },
      {
        id: "disclaimers-liability",
        title: "면책 및 책임 제한",
        paragraphs: [
          "관련 법령이 허용하는 최대 범위에서 WebCross는 ‘있는 그대로’, ‘이용 가능한 상태로’ 제공됩니다. 서비스가 항상 중단이나 오류 없이 작동하거나 제3자가 핑거프린트 설정을 식별하지 못하거나 모델 또는 자동화 결과가 특정 목적에 적합하다고 보장하지 않습니다.",
          "관련 법령이 허용하는 최대 범위에서 소프트웨어 및 서비스의 이용 또는 이용 불가로 인한 특별, 우발적, 직접 또는 간접적인 권리 침해나 손실에 대해, 그 가능성을 미리 알았더라도 당사는 배상 책임을 지지 않습니다. 불법 이용, 무단 조작, 제3자 서비스의 변경 또는 백업을 적절히 하지 않아 발생한 손실에도 책임을 지지 않습니다. 법적으로 배제하거나 제한할 수 없는 책임은 어떤 조항으로도 배제하거나 제한하지 않습니다.",
        ],
      },
      {
        id: "changes-contact",
        title: "약관 개정 및 문의",
        paragraphs: [
          "제품, 서비스 또는 법적 요건에 따라 본 약관을 개정하고 최신 버전과 날짜를 이 페이지에 게시할 수 있습니다. 중요한 변경은 적절한 방식으로 알립니다. 개정 후 계속 이용하는 경우의 법적 효력은 관련 법령에 따릅니다.",
          "본 약관에 관한 문의나 지원 요청은 service@webcross.ai로 보내 주세요.",
        ],
      },
    ],
  },
};

const copies: Record<Locale, Record<LegalKind, LegalCopy>> = { zh, en, ja, ko };

const publishedOn: Record<LegalKind, string> = {
  privacy: "2026-11-18",
  agreement: "2026-11-18",
};

export function getLegalCopy(kind: LegalKind, locale: Locale) {
  const copy = copies[locale][kind];
  return { ...copy, publishedOn: publishedOn[kind] };
}
