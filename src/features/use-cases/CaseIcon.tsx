import Image from "next/image";
import type { UserCase } from "@/content/use-cases";

type Brand = Extract<UserCase["icon"], readonly string[]>[number];
const brandAssets = {
  amazon: ["amazon.svg", "Amazon"],
  taobao: ["taobao.png", "淘宝"],
  jd: ["jd.png", "京东"],
  pinduoduo: ["pinduoduo.png", "拼多多"],
  facebook: ["facebook.png", "Facebook"],
  googleAds: ["google-ads.png", "Google Ads"],
  google: ["google.png", "Google"],
  bing: ["bing.jpg", "Bing"],
  reddit: ["reddit.jpg", "Reddit"],
  boss: ["boss.jpg", "BOSS直聘"],
  x: ["x.jpg", "X"],
  linkedin: ["linkedin.jpg", "LinkedIn"],
  whatsapp: ["whatsapp.jpg", "WhatsApp"],
  rednote: ["rednote.jpg", "小红书"],
  tiktok: ["tiktok.jpg", "TikTok"],
} satisfies Record<Brand, [file: string, name: string]>;

export function CaseIcon({ slug, icon }: Pick<UserCase, "slug" | "icon">) {
  if (typeof icon === "string") {
    return (
      <span className="case-icon case-task" data-palette={icon} aria-hidden="true">
        <svg viewBox="0 0 64 64" focusable="false">
          <use href={`/case-icons/tasks.svg#${slug}`} />
        </svg>
      </span>
    );
  }
  return (
    <span className="case-icon case-brands" data-pair={icon.length === 2 || undefined}>
      {icon.map((brand) => {
        const [file, name] = brandAssets[brand];
        return (
          <span className="case-mark" data-brand={brand} key={brand}>
            <Image src={`/case-icons/brands/${file}`} width={64} height={64} unoptimized alt={name} />
          </span>
        );
      })}
    </span>
  );
}
