/** Shared release board used by every localized download page. */
"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import type { Locale } from "@/content/types";

type Platform = "macos" | "windows";

type ReleaseConfig = {
  url: string;
  version: string;
  size: string;
};

/**
 * Release values are intentionally kept together so publishing an installer
 * later does not require changing the page structure or its interactions.
 */
export const RELEASE_CONFIG: Record<Platform, ReleaseConfig> = {
  macos: { url: "", version: "", size: "" },
  windows: { url: "", version: "", size: "" },
};

type ModernPlatformCopy = {
  name: string;
  requirements: string[];
  download: string;
};

type ModernFaqItem = {
  question: string;
  answer: string;
};

type ModernCopy = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  betaLabel: string;
  betaValue: string;
  currentVersion: string;
  packageSize: string;
  panelOverline: string;
  panelTitle: string;
  panelLead: string;
  supportedLabel: string;
  supportedValue: string;
  recommendation: string;
  platforms: Record<Platform, ModernPlatformCopy>;
  faqTitleLead: string;
  faqTitleAccent: string;
  faqIntro: string;
  faq: ModernFaqItem[];
  closingQuestion: string;
  closingTitle: string;
  closingCta: string;
  toastTitle: string;
  toastMessage: string;
  toastClose: string;
};

const MODERN_COPY: Record<Locale, ModernCopy> = {
  zh: {
    eyebrow: "客户端下载 / DESKTOP",
    titleLead: "选择平台，",
    titleAccent: "开始让智能体工作。",
    lead: "WebCross 在你的电脑上运行，安装完成后即可处理繁杂的网页任务。",
    betaLabel: "公测阶段",
    betaValue: "全功能免费",
    currentVersion: "当前版本",
    packageSize: "安装包大小待配置",
    panelOverline: "下载客户端 / DESKTOP",
    panelTitle: "选择你的平台",
    panelLead: "按系统选择版本，平台之间可以随时切换。",
    supportedLabel: "支持平台",
    supportedValue: "macOS · Windows",
    recommendation: "推荐用于此设备",
    platforms: {
      macos: {
        name: "macOS",
        requirements: ["macOS 13 或更高版本", "Apple Silicon / Intel"],
        download: "下载 macOS 版",
      },
      windows: {
        name: "Windows",
        requirements: ["Windows 11", "64 位"],
        download: "下载 Windows 版",
      },
    },
    faqTitleLead: "先了解，",
    faqTitleAccent: "再开始。",
    faqIntro: "如果你还在确认系统或安装方式，可以先查看下面的简短说明。",
    faq: [
      {
        question: "支持哪些系统？",
        answer: "当前支持 macOS 13 或更高版本，以及 Windows 11 64 位版本。具体兼容性以正式安装包说明为准。",
      },
      {
        question: "下载哪个版本？",
        answer: "页面会根据浏览器所在系统给出推荐，你仍然可以手动选择另一个平台，不会自动替你下载。",
      },
      {
        question: "需要额外配置吗？",
        answer: "安装后按系统提示完成必要授权，再打开 WebCross，在工作台输入你的第一条自然语言任务即可。",
      },
    ],
    closingQuestion: "准备好了？",
    closingTitle: "让智能体开始工作。",
    closingCta: "回到下载选项",
    toastTitle: "这是原型演示",
    toastMessage: "%platform% 安装包地址待配置。正式页面将在这里开始下载。",
    toastClose: "关闭提示",
  },
  en: {
    eyebrow: "DOWNLOAD CLIENT / DESKTOP",
    titleLead: "Choose your platform, ",
    titleAccent: "put your agent to work.",
    lead: "WebCross runs on your computer, ready to handle complex web tasks after installation.",
    betaLabel: "PUBLIC BETA",
    betaValue: "FULL ACCESS, FREE",
    currentVersion: "Current release",
    packageSize: "Package size pending",
    panelOverline: "DOWNLOAD CLIENT / DESKTOP",
    panelTitle: "Choose your platform",
    panelLead: "Select a version for your system. Switch platforms anytime.",
    supportedLabel: "Supported platforms",
    supportedValue: "macOS · Windows",
    recommendation: "Recommended for this device",
    platforms: {
      macos: {
        name: "macOS",
        requirements: ["macOS 13 or later", "Apple Silicon / Intel"],
        download: "Download for macOS",
      },
      windows: {
        name: "Windows",
        requirements: ["Windows 11", "64-bit"],
        download: "Download for Windows",
      },
    },
    faqTitleLead: "Know ",
    faqTitleAccent: "before you start.",
    faqIntro: "If you are checking your system or installation path, these short answers should help.",
    faq: [
      {
        question: "Which systems are supported?",
        answer: "The current release supports macOS 13 or later and Windows 11 64-bit. Check the installer notes for final compatibility details.",
      },
      {
        question: "Which version should I download?",
        answer: "The page recommends a platform based on your browser's system. You can still choose the other platform; nothing downloads automatically.",
      },
      {
        question: "Do I need extra configuration?",
        answer: "Complete any permissions requested by your system, open WebCross, and enter your first natural-language task in the workspace.",
      },
    ],
    closingQuestion: "Ready to start?",
    closingTitle: "Put your agent to work.",
    closingCta: "Back to downloads",
    toastTitle: "Prototype demo",
    toastMessage: "The %platform% installer URL is pending. This is where the live download will start.",
    toastClose: "Dismiss notification",
  },
  ja: {
    eyebrow: "クライアントをダウンロード / DESKTOP",
    titleLead: "プラットフォームを選んで、",
    titleAccent: "エージェントを動かそう。",
    lead: "WebCross はコンピューター上で動作し、インストール後すぐに複雑な Web タスクを処理できます。",
    betaLabel: "パブリックベータ",
    betaValue: "全機能無料",
    currentVersion: "現在のバージョン",
    packageSize: "インストーラーサイズは未設定",
    panelOverline: "クライアントをダウンロード / DESKTOP",
    panelTitle: "プラットフォームを選択",
    panelLead: "お使いのシステムに合うバージョンを選択。いつでも切り替えられます。",
    supportedLabel: "対応プラットフォーム",
    supportedValue: "macOS · Windows",
    recommendation: "このデバイスにおすすめ",
    platforms: {
      macos: {
        name: "macOS",
        requirements: ["macOS 13 以降", "Apple Silicon / Intel"],
        download: "macOS 版をダウンロード",
      },
      windows: {
        name: "Windows",
        requirements: ["Windows 11", "64 ビット"],
        download: "Windows 版をダウンロード",
      },
    },
    faqTitleLead: "始める",
    faqTitleAccent: "前に確認。",
    faqIntro: "システムやインストール方法を確認したい場合は、以下の説明をご覧ください。",
    faq: [
      {
        question: "対応しているシステムは？",
        answer: "現在は macOS 13 以降と Windows 11 64 ビットに対応しています。最終的な互換性はインストーラーの説明をご確認ください。",
      },
      {
        question: "どのバージョンをダウンロードすればよいですか？",
        answer: "ブラウザーのシステムに合わせておすすめを表示します。別のプラットフォームも手動で選択でき、自動でダウンロードすることはありません。",
      },
      {
        question: "追加設定は必要ですか？",
        answer: "システムの案内に従って必要な権限を許可し、WebCross を開いてワークスペースに最初の自然言語タスクを入力してください。",
      },
    ],
    closingQuestion: "準備はできましたか？",
    closingTitle: "エージェントを動かそう。",
    closingCta: "ダウンロードへ戻る",
    toastTitle: "プロトタイプの表示",
    toastMessage: "%platform% のインストーラー URL は未設定です。正式版ではここからダウンロードが始まります。",
    toastClose: "通知を閉じる",
  },
  ko: {
    eyebrow: "클라이언트 다운로드 / DESKTOP",
    titleLead: "플랫폼을 선택하고, ",
    titleAccent: "에이전트를 바로 시작하세요.",
    lead: "WebCross는 컴퓨터에서 실행되며, 설치 후 복잡한 웹 작업을 바로 처리할 수 있습니다.",
    betaLabel: "퍼블릭 베타",
    betaValue: "전체 기능 무료",
    currentVersion: "현재 버전",
    packageSize: "설치 파일 크기 준비 중",
    panelOverline: "클라이언트 다운로드 / DESKTOP",
    panelTitle: "플랫폼 선택",
    panelLead: "시스템에 맞는 버전을 선택하세요. 언제든 플랫폼을 바꿀 수 있습니다.",
    supportedLabel: "지원 플랫폼",
    supportedValue: "macOS · Windows",
    recommendation: "이 기기에 권장",
    platforms: {
      macos: {
        name: "macOS",
        requirements: ["macOS 13 이상", "Apple Silicon / Intel"],
        download: "macOS 다운로드",
      },
      windows: {
        name: "Windows",
        requirements: ["Windows 11", "64비트"],
        download: "Windows 다운로드",
      },
    },
    faqTitleLead: "시작하기 ",
    faqTitleAccent: "전에 확인하세요.",
    faqIntro: "시스템이나 설치 방법을 확인 중이라면 아래의 간단한 설명을 참고하세요.",
    faq: [
      {
        question: "어떤 시스템을 지원하나요?",
        answer: "현재 macOS 13 이상과 Windows 11 64비트를 지원합니다. 최종 호환성은 설치 파일 안내를 확인하세요.",
      },
      {
        question: "어떤 버전을 다운로드해야 하나요?",
        answer: "브라우저의 시스템을 기준으로 권장 플랫폼을 표시합니다. 다른 플랫폼도 직접 선택할 수 있으며 자동 다운로드는 진행되지 않습니다.",
      },
      {
        question: "추가 설정이 필요한가요?",
        answer: "시스템 안내에 따라 필요한 권한을 허용한 뒤 WebCross를 열고 작업 공간에 첫 자연어 작업을 입력하면 됩니다.",
      },
    ],
    closingQuestion: "준비되셨나요?",
    closingTitle: "에이전트를 바로 시작하세요.",
    closingCta: "다운로드 옵션으로 돌아가기",
    toastTitle: "프로토타입 안내",
    toastMessage: "%platform% 설치 파일 주소가 아직 준비되지 않았습니다. 정식 페이지에서는 여기서 다운로드가 시작됩니다.",
    toastClose: "알림 닫기",
  },
};

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    platform?: string;
  };
};

function detectPlatform(): Platform | null {
  const override = new URLSearchParams(window.location.search).get("platform");
  if (override === "macos" || override === "windows") return override;
  if (override === "unknown") return null;

  const browserNavigator = navigator as NavigatorWithUserAgentData;
  const userAgentDataPlatform = browserNavigator.userAgentData?.platform ?? "";
  const legacyPlatform = navigator.platform ?? "";
  const platformHint = userAgentDataPlatform || legacyPlatform;

  if (/mac/i.test(platformHint)) return "macos";
  if (/win/i.test(platformHint)) return "windows";
  return null;
}

function sharedReleaseValue(field: "version" | "size", fallback: string): string {
  const values = Object.values(RELEASE_CONFIG)
    .map((release) => release[field])
    .filter(Boolean);
  return values.length > 0 && new Set(values).size === 1 ? values[0] : fallback;
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8.92-2.85-.9.04-1.98.6-2.61 1.34-.55.63-1.03 1.67-.9 2.71.99.08 2.01-.48 2.59-1.2" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.551H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

export function DownloadModern({ locale }: { locale: Locale }) {
  const copy = MODERN_COPY[locale];
  const [recommendedPlatform, setRecommendedPlatform] = useState<Platform | null>(null);
  const [toastPlatform, setToastPlatform] = useState<Platform | null>(null);
  const [lastTrigger, setLastTrigger] = useState<HTMLButtonElement | null>(null);

  const currentVersion = sharedReleaseValue("version", copy.currentVersion);
  const packageSize = sharedReleaseValue("size", copy.packageSize);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setRecommendedPlatform(detectPlatform());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!toastPlatform) return;

    const timeoutId = window.setTimeout(() => {
      setToastPlatform(null);
      window.requestAnimationFrame(() => lastTrigger?.focus());
    }, 6000);

    return () => window.clearTimeout(timeoutId);
  }, [lastTrigger, toastPlatform]);

  useEffect(() => {
    if (!toastPlatform) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setToastPlatform(null);
      window.requestAnimationFrame(() => lastTrigger?.focus());
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lastTrigger, toastPlatform]);

  const handleDownload = (platform: Platform, event: MouseEvent<HTMLButtonElement>) => {
    const release = RELEASE_CONFIG[platform];
    setLastTrigger(event.currentTarget);

    if (release.url) {
      window.location.assign(release.url);
      return;
    }

    setToastPlatform(platform);
  };

  const closeToast = () => {
    setToastPlatform(null);
    window.requestAnimationFrame(() => lastTrigger?.focus());
  };

  return (
    <article className={`chapter download-page download-modern-page download-modern-page--${locale}`}>
      <section className="download-modern-hero" id="download-console" aria-labelledby="download-modern-title">
        <div className="download-modern-shell">
          <div className="download-modern-hero-grid">
            <div className="download-modern-hero-copy">
              <div className="download-modern-eyebrow">{copy.eyebrow}</div>
              <h1 className="download-modern-title" id="download-modern-title">
                {copy.titleLead}
                <span>{copy.titleAccent}</span>
              </h1>
              <p className="download-modern-lead">{copy.lead}</p>

              <div className="download-modern-beta" role="note" aria-label={`${copy.betaLabel}: ${copy.betaValue}`}>
                <div className="download-modern-beta-main">
                  <span>{copy.betaLabel}</span>
                  <strong>{copy.betaValue}</strong>
                </div>
                <div className="download-modern-beta-version">
                  <span>{currentVersion}</span>
                  <strong>{packageSize}</strong>
                </div>
              </div>
            </div>

            <section className="download-modern-release" id="download-platforms" aria-labelledby="download-modern-platform-title">
              <div className="download-modern-panel-header">
                <div className="download-modern-panel-heading">
                  <span className="download-modern-overline">{copy.panelOverline}</span>
                  <h2 id="download-modern-platform-title">{copy.panelTitle}</h2>
                  <p>{copy.panelLead}</p>
                </div>
                <div className="download-modern-panel-meta">
                  <span>{copy.supportedLabel}</span>
                  <strong>{copy.supportedValue}</strong>
                </div>
              </div>

              <div className="download-modern-platform-list" aria-label={copy.panelTitle}>
                <PlatformCard
                  platform="macos"
                  copy={copy.platforms.macos}
                  recommended={recommendedPlatform === "macos"}
                  recommendation={copy.recommendation}
                  onDownload={handleDownload}
                >
                  <AppleIcon />
                </PlatformCard>
                <PlatformCard
                  platform="windows"
                  copy={copy.platforms.windows}
                  recommended={recommendedPlatform === "windows"}
                  recommendation={copy.recommendation}
                  onDownload={handleDownload}
                >
                  <WindowsIcon />
                </PlatformCard>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="download-modern-faq" id="download-faq" aria-labelledby="download-modern-faq-title">
        <div className="download-modern-shell">
          <div className="faq-section">
            <div className="faq-rail">
              <h2 className="section-title faq-title" id="download-modern-faq-title">
                {copy.faqTitleLead}
                <em className="em-accent">{copy.faqTitleAccent}</em>
              </h2>
              <p className="section-subtitle faq-subtitle">{copy.faqIntro}</p>
            </div>

            <div className="faq-list">
              {copy.faq.map((item, index) => (
                <details className="faq-item" key={item.question} open>
                  <summary className="faq-q">
                    <span className="faq-num" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-q-text">{item.question}</span>
                    <span className="faq-mark" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                        <path d="M12 5v14" className="faq-mark-bar" />
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-a">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="download-modern-closing" aria-label="再次下载">
        <div className="download-modern-shell download-modern-closing-inner">
          <h2>
            {copy.closingQuestion}
            <br />
            <span>{copy.closingTitle}</span>
          </h2>
          <a className="download-modern-closing-link" href="#download-console">
            {copy.closingCta}
            <ReturnIcon />
          </a>
        </div>
      </section>

      <div
        className={`download-modern-toast${toastPlatform ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        hidden={!toastPlatform}
      >
        <div className="download-modern-toast-copy">
          <strong>{copy.toastTitle}</strong>
          <span>
            {copy.toastMessage.replace("%platform%", copy.platforms[toastPlatform ?? "macos"].name)}
          </span>
        </div>
        <button className="download-modern-toast-close" type="button" aria-label={copy.toastClose} onClick={closeToast}>
          ×
        </button>
      </div>
    </article>
  );
}

function PlatformCard({
  platform,
  copy,
  recommended,
  recommendation,
  onDownload,
  children,
}: {
  platform: Platform;
  copy: ModernPlatformCopy;
  recommended: boolean;
  recommendation: string;
  onDownload: (platform: Platform, event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}) {
  return (
    <article className={`download-modern-platform-card${recommended ? " is-recommended" : ""}`} data-platform-card={platform}>
      {recommended ? <span className="download-modern-recommendation">{recommendation}</span> : null}
      <div>
        <div className="download-modern-platform-head">
          <div className="download-modern-platform-name">
            <span className={`download-modern-platform-icon${platform === "windows" ? " windows" : ""}`} aria-hidden="true">
              {children}
            </span>
            <span>{copy.name}</span>
          </div>
        </div>
        <p className="download-modern-platform-copy">
          {copy.requirements.map((requirement) => (
            <span key={requirement}>{requirement}</span>
          ))}
        </p>
      </div>
      <div className="download-modern-platform-actions">
        <button
          className="download-modern-platform-download"
          type="button"
          aria-label={copy.download}
          onClick={(event) => onDownload(platform, event)}
        >
          <DownloadIcon />
          <span>{copy.download}</span>
        </button>
      </div>
    </article>
  );
}
