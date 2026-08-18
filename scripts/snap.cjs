// Capture screenshots of the running dev server for visual verification.
//   node scripts/snap.cjs              → 1440x900 desktop pass
//   VIEWPORT=390x844 node scripts/snap.cjs → mobile pass
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const URL = process.env.URL || "http://localhost:3003/zh";
const [vw, vh] = (process.env.VIEWPORT || "1440x900").split("x").map(Number);
const TAG = process.env.TAG || (vw <= 500 ? "m" : vw <= 1100 ? "t" : "d");
const OUT_DIR = path.resolve(process.cwd(), "screenshots");
fs.mkdirSync(OUT_DIR, { recursive: true });

const shot = async (page, name) => {
  await page.screenshot({ path: path.join(OUT_DIR, `${TAG}-${name}.png`) });
  console.log(`✓ ${TAG}-${name}.png`);
};

/** Park the demo section at the scroll offset that selects scene `index`. */
async function demoScene(page, index) {
  await page.evaluate((i) => {
    const track = document.querySelector(".scenario-track");
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().top;
    const travel = Math.max(track.offsetHeight - window.innerHeight, 0);
    window.scrollTo({ top: travel ? top + (travel * (i + 0.5)) / 3 : top - 80, behavior: "instant" });
  }, index);
  await page.waitForTimeout(1200);
}

(async () => {
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1 });

  console.log("Navigating to", URL, `${vw}x${vh}`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);

  await shot(page, "hero");

  for (let i = 0; i < 3; i += 1) {
    await demoScene(page, i);
    await shot(page, `demo-${"abc"[i]}`);
    // one more frame a few steps later in the same scene
    await page.waitForTimeout(3600);
    await shot(page, `demo-${"abc"[i]}-late`);
  }

  const rows = await page.$$(".feature-row");
  for (let i = 0; i < rows.length; i += 1) {
    await rows[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await shot(page, `feature-${i + 1}`);
  }

  await page.evaluate(() => document.querySelector("#comparison")?.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(600);
  await shot(page, "comparison");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await shot(page, "footer");

  await browser.close();
  console.log("done");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
