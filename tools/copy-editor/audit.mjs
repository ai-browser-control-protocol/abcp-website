/**
 * Copy audit — checks, for every editable copy file and locale, how much of the
 * catalog actually shows up on the rendered site.
 *
 *   node tools/copy-editor/audit.mjs [--base http://localhost:3000]
 *
 * Requires the local site (or a deployed preview) to be reachable. Prints a
 * table plus the groups that look like leftovers from a retired layout.
 */
import { publicFiles, readCopy } from "./lib/copy-store.mjs";
import { checkUsage } from "./lib/usage.mjs";

const argv = process.argv.slice(2);
const baseIndex = argv.indexOf("--base");
const base = baseIndex >= 0 && argv[baseIndex + 1] ? argv[baseIndex + 1] : "http://localhost:3000";

function pct(found, total) {
  if (!total) return "0%";
  return `${Math.round((found / total) * 100)}%`;
}

async function main() {
  const files = publicFiles();
  let reachable = false;
  try {
    const response = await fetch(`${base}/zh`, { signal: AbortSignal.timeout(5000) });
    reachable = response.status < 500;
  } catch {
    reachable = false;
  }
  if (!reachable) {
    console.error(`本地站点 ${base} 没有响应，先启动它（pnpm dev）再运行审计。`);
    process.exit(1);
  }

  console.log(`站点 ${base}\n`);
  const rows = [];
  const dead = [];
  for (const file of files) {
    const locales = file.kind === "json" ? file.locales : file.locales;
    for (const locale of locales) {
      let payload;
      try {
        payload = readCopy(file.id, locale);
      } catch (error) {
        console.log(`${file.label} [${locale}] 读取失败：${error.message}`);
        continue;
      }
      const usage = await checkUsage({ base, file: payload.file, locale: payload.locale, payload, refresh: true });
      if (!usage.ok) {
        console.log(`${file.label} [${locale}] 检查失败：${usage.error}`);
        continue;
      }
      const { totals } = usage;
      rows.push({ file: file.label, locale: payload.locale, totals });
      for (const group of usage.groups) {
        const ratio = group.total ? group.found / group.total : 0;
        if (group.total >= 5 && ratio < 0.2) {
          dead.push({ file: file.label, locale: payload.locale, group, ratio });
        }
      }
    }
  }

  const pad = (text, width) => String(text).padEnd(width);
  console.log(`${pad("文件", 26)}${pad("语言", 6)}${pad("总数", 8)}${pad("出现", 8)}${pad("未出现", 9)}${pad("无法判断", 10)}${pad("出现率", 8)}`);
  for (const row of rows) {
    const { totals } = row;
    console.log(
      `${pad(row.file, 26)}${pad(row.locale, 6)}${pad(totals.total, 8)}${pad(totals.found, 8)}${pad(totals.missing, 9)}${pad(totals.unknown, 10)}${pad(pct(totals.found, totals.total), 8)}`
    );
  }

  if (dead.length) {
    console.log("\n疑似旧版遗留（该分组出现在页面上的比例低于 20%）：");
    for (const item of dead) {
      console.log(`  ${item.file} [${item.locale}] · ${item.group.id} — ${item.group.found}/${item.group.total} 在用 (${pct(item.group.found, item.group.total)})`);
    }
  } else {
    console.log("\n没有明显的历史遗留分组。");
  }
  console.log("\n提示：交互态文案（点击后才出现）不在静态 HTML 中，可能被算作“未出现”；含 {占位符} 的文案显示为“无法判断”。");
}

main().catch((error) => {
  console.error("[copy-audit]", error.message || error);
  process.exit(1);
});
