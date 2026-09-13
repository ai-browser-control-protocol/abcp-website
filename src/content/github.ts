/**
 * GitHub repo stats for the top-nav star control.
 * The icon always links out; the compact count only appears at 1k+.
 */
import { cache } from "react";
import type { GithubNavDisplay } from "./models";
import { site } from "./site";

export type { GithubNavDisplay };

/** Compact count (e.g. 16k ★) is withheld until the repo is past this floor. */
export const STAR_DISPLAY_THRESHOLD = 1000;
const REVALIDATE_SECONDS = 3600;
const FETCH_TIMEOUT_MS = 8000;

export type GithubNavStats = {
  url: string;
  stars: number | null;
};

export function toGithubNavDisplay(stats: GithubNavStats): GithubNavDisplay {
  return {
    url: stats.url,
    starCount: shouldShowStarCount(stats.stars) && stats.stars != null ? formatStarCount(stats.stars) : null,
  };
}

export function githubRepoUrl(owner = site.github.owner, repo = site.github.repo): string {
  return `https://github.com/${owner}/${repo}`;
}

export function shouldShowStarCount(stars: number | null): boolean {
  return stars != null && Number.isFinite(stars) && stars >= STAR_DISPLAY_THRESHOLD;
}

/** Compact star label: 1k, 1.6k, 16k, 1.2m. */
export function formatStarCount(stars: number): string {
  if (stars >= 1_000_000) return trimDecimal(stars / 1_000_000) + "m";
  if (stars >= 10_000) return `${Math.round(stars / 1_000)}k`;
  return trimDecimal(stars / 1_000) + "k";
}

function trimDecimal(value: number): string {
  return value.toFixed(1).replace(/\.0$/, "");
}

export function parseGithubRepoStars(payload: unknown): number | null {
  if (payload === null || typeof payload !== "object") return null;
  const stars = (payload as { stargazers_count?: unknown }).stargazers_count;
  if (typeof stars !== "number" || !Number.isFinite(stars) || stars < 0) return null;
  return Math.floor(stars);
}

async function fetchGithubRepoStars(): Promise<number | null> {
  const { owner, repo } = site.github;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "webcross-website",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub repo ${response.status}`);
  }

  return parseGithubRepoStars(await response.json());
}

export const getGithubNavStats = cache(async (): Promise<GithubNavStats> => {
  const url = githubRepoUrl();
  try {
    return { url, stars: await fetchGithubRepoStars() };
  } catch (error) {
    console.error("Failed to load GitHub star count", error);
    return { url, stars: null };
  }
});
