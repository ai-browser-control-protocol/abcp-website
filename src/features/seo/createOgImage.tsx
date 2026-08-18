/**
 * Shared 1200×630 social card used by opengraph-image and twitter-image routes.
 * Premium dark aesthetic with glowing oxide accents and robust system font stack.
 */
import { ImageResponse } from "next/og";
import { getChapterModel } from "@/content/models";
import type { ChapterId, Locale } from "@/content/types";

export const ogSize = { width: 1200, height: 630 };

export function createOgImage(locale: Locale, chapter: ChapterId) {
  const model = getChapterModel(chapter, locale);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#08090C",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient background glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 107, 53, 0.18) 0%, rgba(8, 9, 12, 0) 70%)",
          }}
        />

        {/* Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#FF6B35",
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "1px",
              }}
            >
              WebCross ABCP
            </span>
          </div>

          <span
            style={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "0.5px",
            }}
          >
            100% Local-First Autonomous AI Browser
          </span>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: 50,
              fontWeight: 800,
              lineHeight: 1.18,
              color: "#FFFFFF",
              letterSpacing: "-0.5px",
            }}
          >
            {model.seoTitle}
          </div>
          <div
            style={{
              fontSize: 21,
              lineHeight: 1.5,
              color: "rgba(255, 255, 255, 0.72)",
            }}
          >
            {model.seoDescription}
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <span style={{ fontSize: 16, color: "#FF6B35", fontWeight: 600 }}>
            macOS & Windows Client
          </span>
          <span style={{ fontSize: 15, color: "rgba(255, 255, 255, 0.4)" }}>
            abcp.qingzhu.tech
          </span>
        </div>
      </div>
    ),
    ogSize,
  );
}
