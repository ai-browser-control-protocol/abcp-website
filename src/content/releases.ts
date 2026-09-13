/**
 * Resolves desktop installer URLs from GitHub Releases so the download
 * page does not hard-code a tag. Asset names still include the version,
 * so matching is by filename pattern rather than GitHub's /latest alias
 * (which also skips pre-releases — the current public channel).
 */
import { cache } from "react";

export type DesktopPlatform = "macos" | "windows";

/** Installer fields the download page can render or navigate to. */
export type DesktopRelease = {
  url: string;
  version: string;
  size: string;
};

export type DesktopReleases = Record<DesktopPlatform, DesktopRelease>;

/** GitHub release subset used by the installer matcher. */
export type GithubReleaseAsset = {
  name: string;
  size: number;
  browser_download_url: string;
};

export type GithubRelease = {
  draft?: boolean;
  tag_name: string;
  assets?: GithubReleaseAsset[];
};

export const EMPTY_DESKTOP_RELEASE: DesktopRelease = {
  url: "",
  version: "",
  size: "",
};

export const EMPTY_DESKTOP_RELEASES: DesktopReleases = {
  macos: EMPTY_DESKTOP_RELEASE,
  windows: EMPTY_DESKTOP_RELEASE,
};

const DEFAULT_RELEASES_URL =
  "https://api.github.com/repos/Aitheris/webcross-releases/releases?per_page=5";
const RELEASES_URL = process.env.GITHUB_RELEASES_URL ?? DEFAULT_RELEASES_URL;
const REVALIDATE_SECONDS = 600; // Desktop builds are infrequent; 10 min is enough.
const FETCH_TIMEOUT_MS = 8000;

export function formatAssetSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  const megabyte = 1024 * 1024;
  if (bytes >= megabyte) return `${Math.round(bytes / megabyte)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${Math.round(bytes)} B`;
}

function toRelease(version: string, asset: GithubReleaseAsset | undefined): DesktopRelease {
  if (!asset?.browser_download_url) return EMPTY_DESKTOP_RELEASE;
  return {
    url: asset.browser_download_url,
    version,
    size: formatAssetSize(asset.size),
  };
}

/** electron-builder mac installer; never the zip or a .blockmap sidecar. */
function pickMacInstaller(assets: GithubReleaseAsset[]): GithubReleaseAsset | undefined {
  const dmgs = assets.filter((asset) => /^WebCross-.*\.dmg$/i.test(asset.name));
  return dmgs.find((asset) => /arm64/i.test(asset.name)) ?? dmgs[0];
}

/** electron-builder NSIS installer; `.exe.blockmap` does not match `\.exe$`. */
function pickWindowsInstaller(assets: GithubReleaseAsset[]): GithubReleaseAsset | undefined {
  return assets.find((asset) => /^WebCross-Setup-.*\.exe$/i.test(asset.name));
}

/**
 * Maps the newest non-draft GitHub release (pre-releases included) onto
 * the two download buttons. Missing assets stay empty so the UI can toast.
 */
export function parseDesktopReleases(releases: GithubRelease[]): DesktopReleases {
  const release = releases.find((entry) => !entry.draft);
  if (!release) return EMPTY_DESKTOP_RELEASES;

  const assets = release.assets ?? [];
  const version = release.tag_name?.trim() ?? "";

  return {
    macos: toRelease(version, pickMacInstaller(assets)),
    windows: toRelease(version, pickWindowsInstaller(assets)),
  };
}

async function fetchGithubReleases(): Promise<GithubRelease[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "webcross-website",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(RELEASES_URL, {
    headers,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub releases ${response.status}`);
  }

  const payload: unknown = await response.json();
  return Array.isArray(payload) ? (payload as GithubRelease[]) : [];
}

export const getDesktopReleases = cache(async (): Promise<DesktopReleases> => {
  try {
    return parseDesktopReleases(await fetchGithubReleases());
  } catch (error) {
    console.error("Failed to load GitHub desktop releases", error);
    return EMPTY_DESKTOP_RELEASES;
  }
});
