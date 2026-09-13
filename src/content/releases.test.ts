/**
 * Installer matching against electron-builder GitHub assets.
 */
import { describe, expect, it } from "vitest";
import {
  formatAssetSize,
  parseDesktopReleases,
  type GithubRelease,
} from "./releases";

const BETA_090: GithubRelease = {
  tag_name: "v0.9.0-beta",
  draft: false,
  assets: [
    { name: "builder-debug.yml", size: 8028, browser_download_url: "https://example.com/builder-debug.yml" },
    { name: "latest-mac.yml", size: 528, browser_download_url: "https://example.com/latest-mac.yml" },
    { name: "latest.yml", size: 360, browser_download_url: "https://example.com/latest.yml" },
    {
      name: "WebCross-0.9.0-beta-arm64-mac.zip",
      size: 312062675,
      browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-0.9.0-beta-arm64-mac.zip",
    },
    {
      name: "WebCross-0.9.0-beta-arm64-mac.zip.blockmap",
      size: 326656,
      browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-0.9.0-beta-arm64-mac.zip.blockmap",
    },
    {
      name: "WebCross-0.9.0-beta-arm64.dmg",
      size: 321000807,
      browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-0.9.0-beta-arm64.dmg",
    },
    {
      name: "WebCross-0.9.0-beta-arm64.dmg.blockmap",
      size: 332800,
      browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-0.9.0-beta-arm64.dmg.blockmap",
    },
    {
      name: "WebCross-Setup-0.9.0-beta.exe",
      size: 354765896,
      browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-Setup-0.9.0-beta.exe",
    },
    {
      name: "WebCross-Setup-0.9.0-beta.exe.blockmap",
      size: 357376,
      browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-Setup-0.9.0-beta.exe.blockmap",
    },
  ],
};

describe("formatAssetSize", () => {
  it("rounds installer payloads the way GitHub's UI does", () => {
    expect(formatAssetSize(321000807)).toBe("306 MB");
    expect(formatAssetSize(354765896)).toBe("338 MB");
  });
});

describe("parseDesktopReleases", () => {
  it("picks the v0.9.0-beta dmg and setup exe, not zip or blockmap", () => {
    const releases = parseDesktopReleases([BETA_090]);

    expect(releases.macos).toEqual({
      url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-0.9.0-beta-arm64.dmg",
      version: "v0.9.0-beta",
      size: "306 MB",
    });
    expect(releases.windows).toEqual({
      url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.0-beta/WebCross-Setup-0.9.0-beta.exe",
      version: "v0.9.0-beta",
      size: "338 MB",
    });
  });

  it("keeps matching when the tag and filenames move forward", () => {
    const next: GithubRelease = {
      tag_name: "v0.9.1-beta",
      assets: [
        {
          name: "WebCross-0.9.1-beta-arm64.dmg",
          size: 330000000,
          browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.1-beta/WebCross-0.9.1-beta-arm64.dmg",
        },
        {
          name: "WebCross-Setup-0.9.1-beta.exe",
          size: 360000000,
          browser_download_url: "https://github.com/Aitheris/webcross-releases/releases/download/v0.9.1-beta/WebCross-Setup-0.9.1-beta.exe",
        },
      ],
    };

    const releases = parseDesktopReleases([next, BETA_090]);
    expect(releases.macos.url).toContain("v0.9.1-beta/WebCross-0.9.1-beta-arm64.dmg");
    expect(releases.windows.url).toContain("v0.9.1-beta/WebCross-Setup-0.9.1-beta.exe");
    expect(releases.macos.version).toBe("v0.9.1-beta");
  });

  it("skips drafts so a shipping pre-release still wins", () => {
    const releases = parseDesktopReleases([
      { tag_name: "v0.9.2-beta", draft: true, assets: BETA_090.assets },
      BETA_090,
    ]);
    expect(releases.macos.version).toBe("v0.9.0-beta");
  });

  it("prefers the arm64 dmg when several mac installers ship", () => {
    const releases = parseDesktopReleases([
      {
        tag_name: "v1.0.0",
        assets: [
          {
            name: "WebCross-1.0.0-x64.dmg",
            size: 1,
            browser_download_url: "https://example.com/x64.dmg",
          },
          {
            name: "WebCross-1.0.0-arm64.dmg",
            size: 2,
            browser_download_url: "https://example.com/arm64.dmg",
          },
        ],
      },
    ]);
    expect(releases.macos.url).toBe("https://example.com/arm64.dmg");
  });

  it("leaves a platform empty when only auto-update archives are present", () => {
    const releases = parseDesktopReleases([
      {
        tag_name: "v0.9.0-beta",
        assets: [
          {
            name: "WebCross-0.9.0-beta-arm64-mac.zip",
            size: 1,
            browser_download_url: "https://example.com/mac.zip",
          },
        ],
      },
    ]);
    expect(releases.macos.url).toBe("");
    expect(releases.windows.url).toBe("");
  });

  it("returns empty config when GitHub sent nothing usable", () => {
    expect(parseDesktopReleases([])).toEqual({
      macos: { url: "", version: "", size: "" },
      windows: { url: "", version: "", size: "" },
    });
  });
});
