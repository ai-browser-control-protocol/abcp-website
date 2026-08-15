"use client";

import { useEffect, useState } from "react";
import type { Messages } from "@/i18n/messages";
import "./interactive-agent-demo.css";

type ActionItem = {
  action: string;
  purpose: string;
  params?: string;
  isHitl?: boolean;
};

type ScenarioConfig = {
  id: string;
  chipLabel: string;
  area: string;
  intent: string;
  backgroundTab: string;
  targetHost: string;
  actions: ActionItem[];
  eventLogs: string[];
  output: {
    title: string;
    summary: string;
    artifactName: string;
    artifactSize: string;
    artifactType: "xlsx" | "pdf" | "json";
  };
};

const SCENARIOS: ScenarioConfig[] = [
  {
    id: "product-compare",
    chipLabel: "📊 商品比价巡检",
    area: "电商运营",
    intent: "筛选商品、对比价格与库存，输出巡检与比价结论",
    backgroundTab: "商家后台商品管理",
    targetHost: "shop-admin.internal",
    actions: [
      { action: "Page.create", purpose: "后台创建并导航至商品管理标签页", params: 'url: "/fixtures/commerce"' },
      { action: "DOM.getAXTree", purpose: "解析搜索、筛选、数据表格与分页 DOM 树", params: "depth: 3, includeHidden: false" },
      { action: "Input.type", purpose: "检索指定品类目标商品", params: 'selector: "#product-search", text: "保温杯"' },
      { action: "Input.click", purpose: "勾选库存预警与促销状态筛选", params: 'selector: "#stock-alert-filter"' },
      { action: "DOM.getText", purpose: "结构化提取商品价格与实时库存", params: 'selector: ".product-row-item"' },
      { action: "Page.screenshot", purpose: "生成巡检比价存证并导出报表", params: 'format: "png", preserveDOM: true' },
    ],
    eventLogs: [
      "16:32:01 · Page.Created [Tab: shop-admin.internal/commerce]",
      "16:32:02 · DOM.AXTreeParsed (1,420 节点 · 深度 3)",
      "16:32:03 · Input.Dispatched (检索保温杯 · 过滤库存预警)",
      "16:32:04 · DOM.DataExtracted (提取 12 件商品数据)",
      "16:32:05 · File.Exported (product_inspection_summary.xlsx)",
    ],
    output: {
      title: "商品价格与库存巡检面板",
      summary: "已完成 12 件商品数据聚合分析，标记 2 处库存预警与 1 处促销配置。",
      artifactName: "product_inspection_summary.xlsx",
      artifactSize: "32.4 KB",
      artifactType: "xlsx",
    },
  },
  {
    id: "form-submission",
    chipLabel: "📑 业务表单办理",
    area: "办公与政企",
    intent: "完成多步准入表单、上传资质材料并获取业务回执",
    backgroundTab: "企业服务中心准入申请",
    targetHost: "enterprise-portal.internal",
    actions: [
      { action: "Page.create", purpose: "后台创建并导航至供应商准入模块", params: 'url: "/fixtures/supplier"' },
      { action: "DOM.getAXTree", purpose: "识别分步表单与资质材料上传区", params: 'role: "form", step: 1' },
      { action: "Input.type", purpose: "自动填报企业纳税人识别号与基本资料", params: 'selector: "#tax-id", text: "91310000MA1FL..."' },
      { action: "Hitl.requestPause", purpose: "检测到法人身份认证，触发安全协同暂停", params: 'reason: "SMS_OTP_CHALLENGE"', isHitl: true },
      { action: "Input.click", purpose: "在屏接管确认后，提交准入申请单", params: 'selector: "#btn-submit-apply"' },
      { action: "DOM.getText", purpose: "读取审批流水并下载业务办理回执", params: 'selector: "#receipt-code"' },
    ],
    eventLogs: [
      "16:32:01 · Page.Created [Tab: enterprise-portal.internal/supplier]",
      "16:32:02 · DOM.FormDetected (分步资质申报表单 Step 1/3)",
      "16:32:03 · Input.Dispatched (填报纳税人识别号与基本信息)",
      "16:32:04 · Hitl.Triggered (法人手机短信动态验证码)",
      "16:32:05 · Hitl.Resolved (人工在屏完成验签 · 恢复静默)",
      "16:32:06 · Flow.Submitted (审批流水生成 SUP-2026-0815-9921)",
    ],
    output: {
      title: "供应商准入办理业务回执",
      summary: "3 个表单阶段已核验提交，进入企业 ERP 待审队列，已生成合规凭据。",
      artifactName: "supplier_admission_receipt.pdf",
      artifactSize: "1.8 MB",
      artifactType: "pdf",
    },
  },
  {
    id: "content-digest",
    chipLabel: "📝 内容采集摘要",
    area: "内容中台",
    intent: "跨页面提取主题、关键数据与正文重点，输出结构化素材",
    backgroundTab: "内容中台行业资讯流",
    targetHost: "media-hub.internal",
    actions: [
      { action: "Page.create", purpose: "后台创建并导航至多源资讯列表", params: 'url: "/fixtures/content"' },
      { action: "DOM.getAXTree", purpose: "识别资讯列表、分页与正文结构", params: 'selector: ".feed-container"' },
      { action: "Input.type", purpose: "检索行业前沿专题关键词", params: 'selector: "#content-search", text: "端侧智能"' },
      { action: "Input.click", purpose: "批量将候选文章加入处理任务篮", params: 'selector: "#add-to-basket"' },
      { action: "DOM.getText", purpose: "结构化提取文章标题、作者与核心论点", params: 'selector: "#article-body"' },
      { action: "Page.screenshot", purpose: "保存素材摘要并生成溯源存证", params: 'format: "png", preserveDOM: true' },
    ],
    eventLogs: [
      "16:32:01 · Page.Created [Tab: media-hub.internal/content]",
      "16:32:02 · DOM.FeedParsed (识别 12 篇候选文献结构)",
      "16:32:03 · Input.Dispatched (检索“端侧智能”前沿专题)",
      "16:32:04 · DOM.DigestExtracted (提炼核心论点与溯源存证)",
      "16:32:05 · File.Exported (content_digest_report.json)",
    ],
    output: {
      title: "多源内容采集与素材摘要简报",
      summary: "已聚合 3 个来源站点共 12 篇核心文献，提炼 3 大技术趋势要点并完成存证。",
      artifactName: "content_digest_report.json",
      artifactSize: "14.2 KB",
      artifactType: "json",
    },
  },
];

export function InteractiveAgentDemo({ copy }: { copy: Messages["product"]["interactiveDemo"] }) {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isHitlPaused, setIsHitlPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Dynamic right panel visibility & minimize states
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const scenario = SCENARIOS[activeScenarioIdx];

  // Auto-progress steps
  useEffect(() => {
    if (!isRunning || isHitlPaused || isCompleted) return;

    const timer = setTimeout(() => {
      const nextStep = currentStepIdx + 1;
      if (nextStep < scenario.actions.length) {
        if (scenario.actions[nextStep].isHitl) {
          setCurrentStepIdx(nextStep);
          setIsHitlPaused(true);
          // If minimized, restore panel so user can perform HITL
          setIsMinimized(false);
        } else {
          setCurrentStepIdx(nextStep);
        }
      } else {
        setIsRunning(false);
        setIsCompleted(true);
        // Ensure panel is expanded to show final outcome
        setIsMinimized(false);
      }
    }, 1100);

    return () => clearTimeout(timer);
  }, [isRunning, isHitlPaused, isCompleted, currentStepIdx, scenario.actions]);

  const handleStart = () => {
    setIsCompleted(false);
    setIsHitlPaused(false);
    setCurrentStepIdx(0);
    setIsRunning(true);
    setIsExpanded(true);
    setIsMinimized(false);
  };

  const handleHumanTakeover = () => {
    setIsHitlPaused(false);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsHitlPaused(false);
    setIsCompleted(false);
    setCurrentStepIdx(-1);
    setIsExpanded(false);
    setIsMinimized(false);
  };

  const selectScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    handleReset();
  };

  const totalSteps = scenario.actions.length;
  const progressPercent = isCompleted
    ? 100
    : currentStepIdx < 0
    ? 0
    : Math.round(((currentStepIdx + 1) / totalSteps) * 100);

  return (
    <section className="interactive-demo-section" id="interactive-demo">
      <div className="demo-header-block">
        <span className="badge-pill">{copy.badge}</span>
        <h2 className="demo-section-title">{copy.title}</h2>
        <p className="demo-section-sub">{copy.subtitle}</p>
      </div>

      <div className="demo-workspace-container">
        {/* Top Control Bar */}
        <div className="demo-prompt-bar">
          <div className="demo-prompt-label">
            <span className="dot-live" />
            <span>{copy.promptLabel || "场景选择"}:</span>
          </div>

          <div className="demo-prompt-chips">
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                className={`prompt-chip ${activeScenarioIdx === idx ? "is-active" : ""}`}
                onClick={() => selectScenario(idx)}
              >
                <span>{sc.chipLabel}</span>
                <span className="chip-area-tag">{sc.area}</span>
              </button>
            ))}
          </div>

          <div className="demo-prompt-actions">
            {!isRunning && !isCompleted && !isHitlPaused && (
              <button type="button" className="demo-btn-primary" onClick={handleStart}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M4.5 3.5V12.5L12.5 8L4.5 3.5Z" />
                </svg>
                <span>开始执行模拟</span>
              </button>
            )}
            {(isRunning || isHitlPaused) && (
              <button type="button" className="demo-btn-secondary" onClick={handleReset}>
                重置
              </button>
            )}
            {isCompleted && (
              <button type="button" className="demo-btn-primary is-replay" onClick={handleStart}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 8a5.5 5.5 0 0 1 9.35-3.9L14 6.5M14 2v4.5h-4.5M13.5 8a5.5 5.5 0 0 1-9.35 3.9L2 9.5M2 14v-4.5h4.5" />
                </svg>
                <span>{copy.btnReset || "重新演示"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Dual Grid Container */}
        <div className={`demo-dual-grid ${isExpanded && !isMinimized ? "is-dual-expanded" : "is-single-focus"}`}>
          {/* Left Window: ABCP Console (Action Execution Stream) */}
          <div className="demo-window demo-console-window">
            <div className="window-topbar">
              <div className="window-dots">
                <span className="w-dot red" />
                <span className="w-dot yellow" />
                <span className="w-dot green" />
              </div>
              <span className="window-title">ABCP Console · Orchestrator Action Stream</span>
              <span className="window-badge">Runtime: Local</span>
            </div>

            <div className="window-body console-body">
              {/* Intent command bar */}
              <div className="console-prompt-display">
                <span className="console-prompt-prefix">$ abcp run --intent:</span>
                <span className="console-prompt-text">&quot;{scenario.intent}&quot;</span>
              </div>

              {/* Action Stream list */}
              <div className="console-steps-list">
                {scenario.actions.map((act, idx) => {
                  const isDone = isCompleted || (currentStepIdx > idx && currentStepIdx !== -1);
                  const isCurrent = currentStepIdx === idx && !isCompleted;
                  const isHitlStep = act.isHitl && isHitlPaused && isCurrent;

                  return (
                    <div
                      key={act.action + idx}
                      className={`console-action-item ${isCurrent ? "is-active" : ""} ${isDone ? "is-done" : ""} ${isHitlStep ? "is-hitl" : ""}`}
                    >
                      <div className="action-seq-badge">
                        {isDone ? "✓" : isCurrent ? (isHitlStep ? "⚠" : <span className="spinner-mini" />) : `0${idx + 1}`}
                      </div>
                      <div className="action-details">
                        <div className="action-header-row">
                          <code className="action-name-code">{act.action}</code>
                          {isDone && <span className="action-tag verified">Verified</span>}
                          {isCurrent && !isHitlStep && <span className="action-tag running">Executing</span>}
                          {isHitlStep && <span className="action-tag hitl-pause">HITL Pause</span>}
                          {!isDone && !isCurrent && <span className="action-tag pending">Pending</span>}
                        </div>
                        <div className="action-purpose">{act.purpose}</div>
                        {act.params && (
                          <div className="action-params-box">
                            <code>{act.params}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Simulated Minimized Background Browser Tab Pill */}
              {isExpanded && isMinimized && (
                <div
                  className="minimized-background-tab-bar"
                  onClick={() => setIsMinimized(false)}
                  title="点击重新展开用户管控面板"
                >
                  <div className="tab-pill-left">
                    <span className="tab-live-dot" />
                    <span className="tab-icon">🌐</span>
                    <span className="tab-title">
                      {copy.tabPrefix || "模拟后台标签"}: <strong>{scenario.backgroundTab}</strong> · {scenario.targetHost}
                    </span>
                  </div>
                  <div className="tab-pill-right">
                    <span className="tab-quiet-status">🍃 {copy.minimizedHint || "正在后台静默运行 (点击展开)"}</span>
                    <button type="button" className="btn-restore-tab" onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}>
                      {copy.btnExpand || "展开面板 ⤢"}
                    </button>
                  </div>
                </div>
              )}

              {/* Footer status & progress */}
              <div className="console-footer-bar">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="console-status-text">
                  {!isRunning && !isCompleted && !isHitlPaused && (copy.promptHint || "就绪状态 · 点击「开始执行模拟」下发动作流")}
                  {isRunning && !isHitlPaused && copy.statusRunning}
                  {isHitlPaused && <span className="text-warning">⚠ {copy.statusPaused}</span>}
                  {isCompleted && <span className="text-success">✓ {copy.statusDone}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Right Window: ABCP User Task & Delivery Panel (Dynamic / Minimizable) */}
          {isExpanded && !isMinimized && (
            <div className="demo-window demo-user-panel-window">
              {/* Window Top Bar with Minimize Control */}
              <div className="window-topbar">
                <div className="window-dots">
                  <span className="w-dot red" />
                  <span className="w-dot yellow" />
                  <span className="w-dot green" />
                </div>
                <div className="user-panel-tab-chip">
                  <span className="tab-icon-mini">🌐</span>
                  <span className="tab-name-mini">{scenario.backgroundTab}</span>
                  <span className="tab-host-mini">{scenario.targetHost}</span>
                </div>
                <div className="window-controls">
                  <button
                    type="button"
                    className="win-ctrl-btn"
                    onClick={() => setIsMinimized(true)}
                    title={copy.btnMinimize || "最小化至后台标签"}
                  >
                    —
                  </button>
                </div>
              </div>

              <div className="window-body user-panel-body">
                {/* State 1: Running in Background (Quiet Execution & Events) */}
                {isRunning && !isHitlPaused && !isCompleted && (
                  <div className="panel-running-state">
                    {/* Quiet Background Card */}
                    <div className="quiet-background-card">
                      <div className="quiet-card-header">
                        <span className="quiet-icon">🍃</span>
                        <div>
                          <h4>浏览器已隐入后台，静默自律运行</h4>
                          <p>智能体在本地高效调度页面动作，无弹窗打扰、不抢占焦点。您可以随时最小化本面板，安心生活与工作。</p>
                        </div>
                      </div>
                      <div className="quiet-card-tags">
                        <span className="quiet-tag">✓ 0 视觉打扰</span>
                        <span className="quiet-tag">✓ 100% 本地运行</span>
                        <span className="quiet-tag">✓ 遇阻按需唤回</span>
                      </div>
                    </div>

                    {/* Task Details & Events */}
                    <div className="task-events-card">
                      <div className="events-card-title">
                        <span>📜 后台审计事件流 (Events)</span>
                        <span className="live-event-badge">Live Auditing</span>
                      </div>
                      <div className="events-list">
                        {scenario.eventLogs.slice(0, Math.max(1, currentStepIdx + 1)).map((log, i) => (
                          <div key={i} className="event-log-item">
                            <span className="event-bullet">•</span>
                            <span className="event-text">{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* State 2: HITL Pause Screen (On-Demand Intervention) */}
                {isHitlPaused && (
                  <div className="panel-hitl-state">
                    <div className="hitl-modal-card">
                      <div className="hitl-modal-header">
                        <span className="hitl-icon">🛡</span>
                        <div>
                          <h3>人机协同安全核验 (HITL)</h3>
                          <p>检测到敏感资质验证节点，平台已主动唤回协同，验证完成后立即恢复后台静默。</p>
                        </div>
                      </div>
                      <div className="captcha-puzzle-box">
                        <div className="puzzle-image">
                          <span className="puzzle-text">已发送短信动态验证码至法人安全手机 138****8821</span>
                        </div>
                        <div className="otp-input-preview">
                          <span className="otp-box">8</span>
                          <span className="otp-box">2</span>
                          <span className="otp-box">9</span>
                          <span className="otp-box">4</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="demo-btn-takeover"
                        onClick={handleHumanTakeover}
                      >
                        {copy.btnTakeover || "我已在屏完成验证 · 恢复自动化执行"}
                      </button>
                    </div>
                  </div>
                )}

                {/* State 3: Completed - Delivered Outcomes & Artifacts */}
                {isCompleted && (
                  <div className="panel-completed-state">
                    <div className="outcome-card-container">
                      <div className="outcome-header-strip">
                        <div className="outcome-title-group">
                          <span className="outcome-status-icon">✓</span>
                          <div>
                            <h3>{scenario.output.title}</h3>
                            <p className="outcome-summary">{scenario.output.summary}</p>
                          </div>
                        </div>
                        <span className="outcome-badge-tag">Delivered</span>
                      </div>

                      {/* Scenario 1: Product Compare Table */}
                      {activeScenarioIdx === 0 && (
                        <div className="outcome-body-block">
                          <div className="outcome-table-wrapper">
                            <table className="outcome-data-table">
                              <thead>
                                <tr>
                                  <th>商品编码</th>
                                  <th>商品名称</th>
                                  <th>品类</th>
                                  <th>实时售价</th>
                                  <th>库存状态</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><code>SKU-8021</code></td>
                                  <td>智能恒温保温杯 500ml</td>
                                  <td>生活家居</td>
                                  <td className="text-highlight">¥129.00</td>
                                  <td><span className="status-pill warning">14 件 (预警)</span></td>
                                </tr>
                                <tr>
                                  <td><code>SKU-8045</code></td>
                                  <td>轻量真空旅行壶 1000ml</td>
                                  <td>户外出行</td>
                                  <td className="text-highlight">¥189.00</td>
                                  <td><span className="status-pill success">320 件 (充裕)</span></td>
                                </tr>
                                <tr>
                                  <td><code>SKU-9102</code></td>
                                  <td>车载便携咖啡杯 380ml</td>
                                  <td>办公日常</td>
                                  <td className="text-highlight">¥89.00</td>
                                  <td><span className="status-pill danger">8 件 (缺货预警)</span></td>
                                </tr>
                                <tr>
                                  <td><code>SKU-7721</code></td>
                                  <td>双层隔热玻璃水杯 400ml</td>
                                  <td>生活家居</td>
                                  <td className="text-highlight">¥69.00</td>
                                  <td><span className="status-pill success">185 件 (正常)</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Scenario 2: Form Submission Receipt */}
                      {activeScenarioIdx === 1 && (
                        <div className="outcome-body-block">
                          <div className="receipt-grid">
                            <div className="receipt-row">
                              <span className="receipt-label">办理业务:</span>
                              <span className="receipt-value strong">2026 年度企业数字化供应商准入申请</span>
                            </div>
                            <div className="receipt-row">
                              <span className="receipt-label">受理单号:</span>
                              <span className="receipt-value code-accent">SUP-2026-0815-9921</span>
                            </div>
                            <div className="receipt-row">
                              <span className="receipt-label">申报企业:</span>
                              <span className="receipt-value">青禾数字科技有限公司 (91310000MA1FL...)</span>
                            </div>
                            <div className="receipt-row">
                              <span className="receipt-label">资质附件:</span>
                              <span className="receipt-value">营业执照副本.pdf (已验签) · 授权委托书.pdf (已核验)</span>
                            </div>
                            <div className="receipt-row">
                              <span className="receipt-label">流转状态:</span>
                              <span className="receipt-value"><span className="status-pill success">已提交待审 · HITL 验证完成</span></span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Scenario 3: Content Digest Report */}
                      {activeScenarioIdx === 2 && (
                        <div className="outcome-body-block">
                          <div className="digest-cards-list">
                            <div className="digest-card-item">
                              <span className="digest-tag">趋势 01</span>
                              <h4>端侧小模型与定制页面引擎深度融合</h4>
                              <p>专为动作执行量身定制，将网页指令调度时延压缩至毫秒级，大幅节省 Token 消耗。</p>
                            </div>
                            <div className="digest-card-item">
                              <span className="digest-tag">趋势 02</span>
                              <h4>本地优先数据主权成为企业级刚需</h4>
                              <p>全链路本地闭环确保所有 Cookie、Token 会话凭据绝不离机上传任何第三方云端。</p>
                            </div>
                            <div className="digest-card-item">
                              <span className="digest-tag">趋势 03</span>
                              <h4>HITL 人机协同重塑复杂流程可用性</h4>
                              <p>遇验证码与支付确认毫秒级无缝换手，自动化成功率提升至 99.8%。</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Artifact & Local Proof Footer */}
                      <div className="outcome-footer-strip">
                        <div className="artifact-pill">
                          <span className="artifact-icon">
                            {scenario.output.artifactType === "xlsx" && "📊"}
                            {scenario.output.artifactType === "pdf" && "📑"}
                            {scenario.output.artifactType === "json" && "📄"}
                          </span>
                          <div className="artifact-info">
                            <span className="artifact-name">{scenario.output.artifactName}</span>
                            <span className="artifact-meta">本地交付文件 · {scenario.output.artifactSize}</span>
                          </div>
                        </div>
                        <div className="local-privacy-proof">
                          <span className="shield-icon">🛡</span>
                          <span>100% 本地留存 · 全程静默交付</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
