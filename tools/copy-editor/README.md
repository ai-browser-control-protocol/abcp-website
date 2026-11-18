# 文案修改器 / Copy editor

一个只在本机运行的网页小工具：改网站文案、改字号，保存后**直接写回源码文件**（并自动备份）。改完刷新本地站点就能看到效果，不需要改代码。

## 启动

三种方式任选其一：

1. **双击** `tools/copy-editor/open.cmd`（Windows）。会打开一个终端窗口和浏览器。
2. 在仓库根目录运行：

   ```bash
   pnpm copy-editor
   ```

3. 如果本地站点（`localhost:3000`）已经开着，不想让它自动再起一个：

   ```bash
   pnpm copy-editor:no-site
   ```

浏览器打开 <http://localhost:4310>。启动时如果检测到 `localhost:3000` 没开，会自动帮你起 `next dev`（日志在 `artifacts/copy-editor-site.log`）。关掉这个终端窗口，工具和自动启动的站点就一起停止。

## 能改什么

- **文案**：四语言界面文案（`src/messages/*.json`）、首页文案（`src/content/home.ts`）、解决方案页文案（`src/content/solutions.ts`）、隐私政策 / 用户协议（`src/content/legal.ts`）。
  - 支持搜索、按区块折叠、逐条修改、单条还原、整文件还原（`git checkout`）、查看当前 `git diff`。
  - 只改写你动过的那几个字符串，文件排版、注释、换行都不变。
  - `solutions.ts` / `legal.ts` 的 ja、ko 继承英文文案，工具会提示。
  - **页面出现检查**：工具会把本地站点的页面渲染出来，逐条检查文案是否真的出现在页面上，标题旁显示「680 条 · 页面出现 235 条」，每个分组显示 `N/M 在用`；没出现的字段带灰色「未出现」标记，占比很低的分组会标「旧版残留」。可以勾选「隐藏未出现的文案」只看在用的。这样就不会误改那些旧版页面遗留下来、当前站点根本不显示的文案（例如 `messages.product.demo.*`）。
    说明：交互态文案（点击后才出现的提示、Toast 等）可能不在静态 HTML 里，会被标成「未出现」；插值文案（含 `{count}` 之类）显示为「无法判断」。
- **字号**：`src/styles/tokens.css` 里那套全站字号阶梯（Hero / H2 / H3 / 正文 / 小字…）、行高、字重，滑块调整后保存即可。
- **自定义样式覆盖**：`src/styles/editor-overrides.css` 会在所有样式表之后加载，写 `font-size` 之类的规则会直接生效，例如：

  ```css
  .home-section-heading h2 { font-size: 42px; }
  .hero-copy h1 { font-size: clamp(38px, 4.8vw, 68px); }
  .user-nav-item-btn { font-size: 13px; }
  ```

## 安全边界

- 只监听 `127.0.0.1`，不对外网开放。
- 只允许写白名单里的源文件（`tools/copy-editor/lib/copy-store.mjs` 的 `FILES` + 两个样式文件）。
- 每次保存前把原文件复制到 `artifacts/copy-editor-backups/<时间戳>/`，保留最近 30 次。
- 想整体撤回：在「查看 git diff」旁边点「还原此文件」（等于 `git checkout -- <file>`），或者回到终端 `git checkout -- src/...`。

## 命令行参数

| 参数 | 说明 |
| --- | --- |
| `--port 4310` | 编辑器端口（被占用会自动 +1，最多试 6 个） |
| `--site-port 3000` | 本地站点端口 |
| `--no-site` | 不自动启动本地站点 |
| `--open` | 启动后自动打开浏览器 |
| `--help` | 显示帮助 |

## 之后的维护

- 新增文案文件：在 `tools/copy-editor/lib/copy-store.mjs` 的 `FILES` 里加一条（`id`、`kind`、`path`、`locales`）。
- 要暴露更多字号变量：在 `tools/copy-editor/lib/type-scale.mjs` 的 `SCALE` 里加一条。
- 接口契约见 `tools/copy-editor/API.md`。
