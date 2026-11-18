/** Thin git helpers for the copy editor (status, diff, revert). */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(HERE, "..", "..", "..");

function git(args) {
  return execFileSync("git", ["-C", REPO, ...args], {
    encoding: "utf8",
    windowsHide: true,
  });
}

export function gitStatus() {
  try {
    const branch = git(["branch", "--show-current"]).trim();
    const porcelain = git(["status", "--porcelain"]).trim();
    return { branch: branch || "HEAD", dirty: porcelain.length > 0, changedFiles: porcelain.split(/\r?\n/).filter(Boolean).length };
  } catch {
    return { branch: "?", dirty: false, changedFiles: 0 };
  }
}

export function gitDiff(relPath) {
  try {
    return git(["diff", "--", relPath]);
  } catch {
    return "";
  }
}

export function gitRevert(relPath) {
  git(["checkout", "--", relPath]);
}
