/* =============================================================================
   Copy & font-size editor — local tool UI (vanilla, no dependencies)
   Consumes the JSON API documented in tools/copy-editor/API.md.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const textNode = (value) => document.createTextNode(value == null ? '' : String(value));
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key === 'html') node.innerHTML = value;
      else if (key === 'dataset') Object.assign(node.dataset, value);
      else if (key === 'style') Object.assign(node.style, value);
      else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else if (key === 'hidden') node.hidden = Boolean(value);
      else node.setAttribute(key, value === true ? '' : String(value));
    }
    for (const child of children) {
      if (child == null) continue;
      node.append(child.nodeType ? child : textNode(child));
    }
    return node;
  }

  function svgIcon(symbolId, className = 'icon') {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', `#${symbolId}`);
    svg.append(use);
    return svg;
  }

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function debounce(fn, wait) {
    let timer = 0;
    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fn(...args), wait);
    };
  }

  const LOCALE_NAMES = { zh: '简体中文', en: 'English', ja: '日本語', ko: '한국어' };
  const KIND_LABELS = { json: '界面文案', ts: '内容页文案' };
  const PAGE_OPTIONS = [
    { path: '/zh', label: '首页 · 中文', short: '/zh' },
    { path: '/', label: '首页 · 根路径', short: '/' },
    { path: '/en', label: '首页 · English', short: '/en' },
    { path: '/zh/guide', label: '使用指南', short: '/zh/guide' },
    { path: '/zh/solutions', label: '解决方案', short: '/zh/solutions' },
    { path: '/zh/download', label: '下载页', short: '/zh/download' },
    { path: '/zh/privacy', label: '隐私政策', short: '/zh/privacy' },
    { path: '/zh/agreement', label: '用户协议', short: '/zh/agreement' },
    { path: '/ja', label: '日本語', short: '/ja' },
    { path: '/ko', label: '한국어', short: '/ko' },
  ];
  const TEXTAREA_MAX = 200;

  // ------------------------------------------------------------------ state --

  const S = {
    boot: null,
    files: [],
    previewBase: 'http://localhost:3000',
    previewPath: '/zh',
    siteReachable: true,
    typeScalePath: 'src/styles/tokens.css',
    overridesPath: 'src/styles/editor-overrides.css',
    activeTab: 'copy',
    file: null,
    locale: null,
    requestedLocale: null,
    payload: null,
    originals: new Map(),
    edits: new Map(),
    groupIdByPath: new Map(),
    expanded: new Set(),
    search: '',
    usage: null,
    usageKey: null,
    usageLoading: false,
    usageError: null,
    usageRequestId: 0,
    hideMissing: false,
    expandedBeforeFilter: null,
    fieldNodes: new Map(),
    groupNodes: new Map(),
    busy: false,
    typePayload: null,
    typeLoaded: false,
    typeRaw: new Map(),
    typeParts: new Map(),
    typeOriginals: new Map(),
    typeGroupNodes: new Map(),
    overridesValue: '',
    overridesOriginal: '',
    autoRefresh: true,
    modalResolve: null,
    pollTimer: 0,
  };

  // -------------------------------------------------------------------- api --

  class ApiError extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
    }
  }

  async function readJson(response) {
    let data = null;
    try {
      data = await response.json();
    } catch (error) {
      throw new ApiError(`接口返回的不是合法 JSON（HTTP ${response.status}）`, response.status);
    }
    if (!response.ok || data.ok === false) {
      const message = data && data.error ? data.error : `HTTP ${response.status}`;
      throw new ApiError(message, response.status);
    }
    return data;
  }

  const API = {
    state: () => fetch('/api/state', { headers: { Accept: 'application/json' } }).then(readJson),
    copy: (file, locale) => {
      const query = `file=${encodeURIComponent(file)}`;
      const loc = locale ? `&locale=${encodeURIComponent(locale)}` : '';
      return fetch(`/api/copy?${query}${loc}`, { headers: { Accept: 'application/json' } }).then(readJson);
    },
    saveCopy: (payload) =>
      fetch('/api/copy/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }).then(readJson),
    typeScale: () => fetch('/api/type-scale', { headers: { Accept: 'application/json' } }).then(readJson),
    saveTypeScale: (changes) =>
      fetch('/api/type-scale/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ changes }),
      }).then(readJson),
    saveOverrides: (value) =>
      fetch('/api/overrides/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ text: value }),
      }).then(readJson),
    diff: (file) => fetch(`/api/diff?file=${encodeURIComponent(file)}`, { headers: { Accept: 'application/json' } }).then(readJson),
    revert: (file) =>
      fetch('/api/revert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ file }),
      }).then(readJson),
  };

  // --------------------------------------------------------------- feedback --

  function toast(kind, title, detail) {
    const stack = $('#toast-stack');
    const node = el('div', { class: `toast${kind === 'error' ? ' is-error' : ''}`, role: 'status' });
    const body = el('div', { class: 'toast-text' }, [el('strong', { text: title })]);
    if (detail) body.append(el('span', { text: detail }));
    const close = el('button', { class: 'toast-close', type: 'button', 'aria-label': '关闭提示', text: '×' });
    let timer = 0;
    const remove = () => {
      window.clearTimeout(timer);
      node.remove();
    };
    close.addEventListener('click', remove);
    node.append(body, close);
    stack.append(node);
    timer = window.setTimeout(remove, kind === 'error' ? 7000 : 3800);
    while (stack.children.length > 4) stack.firstElementChild.remove();
  }

  // ----------------------------------------------------------------- modals --

  function isModalOpen() {
    return !$('#overlay').hidden;
  }

  function openModal({ eyebrow, title, body, footer, onResolve }) {
    const overlay = $('#overlay');
    $('#modal-eyebrow').textContent = eyebrow || '';
    $('#modal-title').textContent = title || '';
    const bodyNode = $('#modal-body');
    clear(bodyNode);
    if (body) bodyNode.append(body);
    const footNode = $('#modal-foot');
    clear(footNode);
    (footer || []).forEach((item) => footNode.append(item));
    S.modalResolve = onResolve || null;
    overlay.hidden = false;
    window.setTimeout(() => {
      const focusTarget = $('#modal-foot .btn-primary') || $('#modal-close');
      if (focusTarget) focusTarget.focus();
    }, 20);
  }

  function closeModal(result) {
    const overlay = $('#overlay');
    if (overlay.hidden) return;
    overlay.hidden = true;
    const resolve = S.modalResolve;
    S.modalResolve = null;
    if (resolve) resolve(result);
  }

  function confirmModal({ eyebrow = 'Confirm · 确认', title, message, confirmLabel = '确认', danger = false, filePath = '' }) {
    return new Promise((resolve) => {
      const body = el('div', {}, [el('p', { class: 'modal-copy', text: message })]);
      if (filePath) {
        body.append(
          el('div', { class: 'confirm-file' }, [
            el('span', { class: 'file-tag', text: 'file' }),
            el('code', { text: filePath }),
          ])
        );
      }
      const cancel = el('button', { class: 'btn btn-ghost', type: 'button', text: '取消' });
      const confirm = el('button', {
        class: `btn ${danger ? 'btn-danger' : 'btn-primary'}`,
        type: 'button',
        text: confirmLabel,
      });
      const footer = [cancel, confirm];
      cancel.addEventListener('click', () => closeModal(false));
      confirm.addEventListener('click', () => closeModal(true));
      openModal({ eyebrow, title, body, footer, onResolve: resolve });
    });
  }

  function diffLines(diffText) {
    const fragment = document.createDocumentFragment();
    const lines = diffText.split('\n');
    for (const line of lines) {
      let cls = 'diff-line';
      if (/^\+/.test(line) && !/^\+\+\+/.test(line)) cls += ' diff-add';
      else if (/^-/.test(line) && !/^---/.test(line)) cls += ' diff-del';
      else if (/^(@@|diff --git|index |--- |\+\+\+ )/.test(line)) cls += ' diff-meta';
      fragment.append(el('span', { class: cls, text: line === '' ? ' ' : line, }));
    }
    return fragment;
  }

  async function showDiff(fileParam, label) {
    try {
      const data = await API.diff(fileParam);
      const diff = (data.diff || '').trim();
      const path = data.path || fileParam;
      const body = el('div');
      const copyBtn = el('button', { class: 'btn btn-ghost btn-tiny', type: 'button', text: '复制 diff' });
      if (diff) {
        body.append(
          el('p', { class: 'diff-hint', text: 'git diff 只包含已写入磁盘的改动；未保存的编辑不会出现在这里。' })
        );
        body.append(
          el('div', { class: 'diff-toolbar' }, [
            el('span', { class: 'diff-stat', text: `${path} · ${diff.split('\n').length} 行` }),
          ])
        );
        body.append(el('pre', { class: 'diff-pre' }, [diffLines(diff)]));
      } else {
        body.append(
          el('div', { class: 'diff-empty' }, [
            el('span', { class: 'empty-mark', text: '∅' }),
            el('p', { class: 'empty-title', text: '这个文件没有未提交到 git 的改动。' }),
            el('p', { class: 'empty-hint', text: '未保存的编辑不会出现在 git diff 里，先保存再查看。' }),
          ])
        );
      }
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(diff);
          toast('success', 'diff 已复制', `${diff.split('\n').length} 行`);
        } catch (error) {
          toast('error', '复制失败', '浏览器拒绝了剪贴板权限。');
        }
      });
      const closeBtn = el('button', { class: 'btn btn-primary', type: 'button', text: '关闭' });
      closeBtn.addEventListener('click', () => closeModal());
      openModal({
        eyebrow: 'Git diff',
        title: label || path,
        body,
        footer: [copyBtn, closeBtn],
      });
    } catch (error) {
      toast('error', 'git diff 获取失败', error.message);
    }
  }

  // --------------------------------------------------------------- meta / ui --

  function setBusy(value) {
    S.busy = value;
    updateActionBar();
    updateOverridesButton();
  }

  function applyStateMeta(state) {
    if (state.git) {
      const dirty = Boolean(state.git.dirty);
      const branch = state.git.branch || 'HEAD';
      const changed = state.git.changedFiles || 0;
      $('#git-text').textContent = `${branch}${dirty ? ` · ${changed} 个改动` : ' · 干净'}`;
      $('#git-chip').title = dirty ? `git 工作区有 ${changed} 个文件改动` : 'git 工作区干净';
      const dot = $('#git-dot');
      dot.classList.toggle('dot-dirty', dirty);
      dot.classList.toggle('dot-live', !dirty);
    }
    if (state.repo) {
      const repoText = String(state.repo).replace(/\\/g, '/').split('/').filter(Boolean).slice(-2).join('/');
      $('#repo-text').textContent = repoText;
      $('#repo-chip').title = state.repo;
    }
  }

  function setService(kind) {
    const dot = $('#service-dot');
    const label = $('#service-text');
    dot.classList.toggle('dot-live', kind === 'ok');
    dot.classList.toggle('dot-down', kind === 'down');
    label.textContent = kind === 'ok' ? '编辑服务 · 已连接' : kind === 'down' ? '编辑服务 · 未连接' : '编辑服务 · 连接中';
  }

  function applySiteReachable(reachable) {
    S.siteReachable = reachable !== false;
    const banner = $('#site-banner');
    banner.hidden = S.siteReachable;
    if (!S.siteReachable) {
      renderBannerText();
      setPreviewState('down', '站点未连接');
    } else if (!isFrameLoaded) {
      setPreviewState('idle', '加载中');
    }
  }

  function renderBannerText() {
    const node = $('#site-banner-text');
    clear(node);
    node.append(
      textNode('本地站点 '),
      el('code', { text: S.previewBase }),
      textNode(' 连不上，预览不可用。编辑文案与字号不受影响。')
    );
  }

  let isFrameLoaded = false;

  function setPreviewState(kind, label) {
    const state = $('#preview-state');
    state.classList.toggle('is-ready', kind === 'ready');
    state.classList.toggle('is-down', kind === 'down');
    $('#preview-state-text').textContent = label;
  }

  // ------------------------------------------------------------- preview pane --

  function buildPreviewSelect() {
    const select = $('#preview-page');
    clear(select);
    for (const page of PAGE_OPTIONS) {
      select.append(el('option', { value: page.path, text: `${page.label}　${page.short}` }));
    }
    select.value = S.previewPath;
    select.addEventListener('change', () => {
      S.previewPath = select.value;
      refreshPreview(true);
    });
  }

  function previewUrl(bust) {
    const base = String(S.previewBase || 'http://localhost:3000').replace(/\/+$/, '');
    const path = S.previewPath || '/zh';
    return `${base}${path}${bust ? `?__ce=${Date.now()}` : ''}`;
  }

  function refreshPreview(bust = true) {
    const frame = $('#preview-frame');
    const url = previewUrl(bust);
    isFrameLoaded = false;
    setPreviewState('idle', '刷新中…');
    $('#preview-url').textContent = previewUrl(false);
    if (S.siteReachable === false) {
      frame.src = 'about:blank';
      setPreviewState('down', '站点未连接');
      return;
    }
    frame.src = url;
  }

  async function retrySite() {
    const button = $('#site-retry');
    button.disabled = true;
    button.textContent = '检测中…';
    try {
      const state = await API.state();
      applyStateMeta(state);
      S.previewBase = String(state.previewBase || S.previewBase).replace(/\/+$/, '');
      applySiteReachable(state.siteReachable);
      if (state.siteReachable) {
        setService('ok');
        refreshPreview(true);
        toast('success', '本地站点已恢复', S.previewBase);
      } else {
        toast('error', '本地站点仍然连不上', `请确认 ${S.previewBase} 已在运行。`);
      }
    } catch (error) {
      setService('down');
      toast('error', '无法连接编辑器服务', error.message);
    } finally {
      button.disabled = false;
      button.textContent = '重试';
    }
  }

  // ----------------------------------------------------------------- boot ----

  async function init() {
    setService('loading');
    setPreviewState('idle', '加载中');
    renderLoadingInto('#copy-groups', '读取仓库状态…');
    try {
      const state = await API.state();
      applyBootState(state);
      buildPreviewSelect();
      refreshPreview(false);
      renderFileList();
      const first = S.files.find((item) => item.id === 'messages-zh') || S.files[0];
      if (first) {
        await openFile(first, { initial: true });
      } else {
        renderCopyEmpty('没有可编辑的文件', '检查 server.mjs 的 /api/state 返回。');
      }
      setService('ok');
      startPolling();
    } catch (error) {
      setService('down');
      S.siteReachable = false;
      applySiteReachable(false);
      renderCopyFatal(error.message);
      toast('error', '无法连接编辑器服务', error.message);
    }
    updateTabs();
    updateActionBar();
  }

  function applyBootState(state) {
    S.boot = state;
    S.files = Array.isArray(state.files) ? state.files : [];
    S.previewBase = String(state.previewBase || 'http://localhost:3000').replace(/\/+$/, '');
    S.typeScalePath = state.typeScalePath || 'src/styles/tokens.css';
    S.overridesPath = state.overridesPath || 'src/styles/editor-overrides.css';
    applyStateMeta(state);
    applySiteReachable(state.siteReachable);
    $('#type-path').textContent = S.typeScalePath;
    $('#overrides-path').textContent = S.overridesPath;
  }

  function startPolling() {
    if (S.pollTimer) window.clearInterval(S.pollTimer);
    S.pollTimer = window.setInterval(async () => {
      try {
        const state = await API.state();
        applyStateMeta(state);
        if (state.previewBase) S.previewBase = String(state.previewBase).replace(/\/+$/, '');
        if (state.siteReachable !== S.siteReachable) {
          applySiteReachable(state.siteReachable);
          if (state.siteReachable) refreshPreview(true);
        }
        setService('ok');
      } catch (error) {
        setService('down');
      }
    }, 20000);
  }

  // -------------------------------------------------------------- file list ---

  function renderFileList() {
    const list = $('#file-list');
    clear(list);
    $('#file-count').textContent = `${S.files.length} 个`;
    let lastKind = null;
    let index = 0;
    for (const file of S.files) {
      if (file.kind !== lastKind) {
        lastKind = file.kind;
        list.append(
          el('div', { class: 'rail-group-label', text: `${KIND_LABELS[file.kind] || '文件'} · ${String(file.kind || '').toUpperCase()}` })
        );
      }
      index += 1;
      const isActive = S.file && S.file.id === file.id;
      const item = el('button', {
        class: `file-item${isActive ? ' is-active' : ''}`,
        type: 'button',
        dataset: { fileId: file.id },
        'aria-current': isActive ? 'true' : 'false',
        title: file.path,
      });
      item.append(
        el('span', { class: 'file-index', text: String(index).padStart(2, '0') }),
        el('span', { class: 'file-copy' }, [
          el('span', { class: 'file-label', text: file.label }),
          el('span', { class: 'file-path', text: file.path }),
          el('span', { class: 'file-tags' }, [
            el('span', { class: 'file-tag', text: String(file.kind || '') }),
            ...(file.locales || []).map((locale) => el('span', { class: 'file-tag', text: locale })),
          ]),
        ]),
        el('span', { class: 'file-dirty', hidden: !(isActive && S.edits.size > 0) })
      );
      item.addEventListener('click', () => requestFile(file));
      list.append(item);
    }
    const activeItem = $('#file-list .file-item.is-active');
    if (activeItem) {
      const dot = activeItem.querySelector('.file-dirty');
      if (dot) dot.hidden = S.edits.size === 0;
    }
  }

  async function requestFile(file) {
    if (S.file && S.file.id === file.id) return;
    if (S.edits.size > 0) {
      const ok = await confirmModal({
        title: '切换文件会丢弃未保存修改',
        message: `当前文件还有 ${S.edits.size} 处未保存的修改，切换后将丢失。`,
        confirmLabel: '仍然切换',
        danger: true,
        filePath: S.file ? S.file.path : '',
      });
      if (!ok) return;
    }
    await openFile(file);
  }

  async function openFile(file, options = {}) {
    S.file = file;
    S.payload = null;
    S.edits.clear();
    S.search = '';
    S.usage = null;
    S.usageKey = null;
    S.usageError = null;
    S.usageLoading = false;
    S.usageRequestId += 1;
    S.hideMissing = false;
    S.expandedBeforeFilter = null;
    const hideToggle = $('#hide-missing');
    if (hideToggle) hideToggle.checked = false;
    $('#copy-search').value = '';
    updateUsageBar();
    updateUsageToggle();
    updateUsageHeader();
    renderFileList();
    renderLoadingInto('#copy-groups', file.kind === 'ts' ? '读取内容模块…' : '读取语言文件…');
    try {
      const locale = file.kind === 'ts' ? (file.locales || ['zh'])[0] : null;
      await loadCopy(file, locale);
    } catch (error) {
      renderCopyFatal(error.message);
      toast('error', '文案加载失败', error.message);
    }
  }

  // ---------------------------------------------------------------- load copy --

  async function loadCopy(file, requestedLocale, options = {}) {
    const data = await API.copy(file.id, requestedLocale);
    S.file = file;
    S.payload = data;
    S.locale = data.locale || (file.kind === 'ts' ? requestedLocale : (file.locales || [])[0]);
    S.requestedLocale = file.kind === 'ts' ? (requestedLocale || S.locale) : S.locale;
    S.originals = new Map();
    S.groupIdByPath = new Map();
    for (const group of data.groups || []) {
      for (const field of group.fields || []) {
        S.originals.set(field.path, field.value);
        S.groupIdByPath.set(field.path, group.id);
      }
    }
    S.edits.clear();
    if (!options.preserveExpanded) S.expanded = defaultExpanded(data.groups || []);
    if (!options.preserveSearch) {
      S.search = '';
      $('#copy-search').value = '';
    }
    if (S.usageKey !== `${file.id}::${S.locale}`) {
      S.usage = null;
      S.usageKey = null;
      S.usageError = null;
    }
    renderFileHeader();
    renderGroups();
    updateDirtyUI();
    updateTabs();
    if (file && S.locale) loadUsage(file, S.locale);
    if (options.scrollTop != null) {
      const scroller = $('#copy-scroll');
      requestAnimationFrame(() => {
        scroller.scrollTop = options.scrollTop;
      });
    }
    if (options.autoRefreshPreview === true && S.autoRefresh) refreshPreview(true);
  }

  function defaultExpanded(groups) {
    const expanded = new Set();
    let budget = 0;
    for (const group of groups) {
      if (budget > 0 && budget + (group.fields || []).length > 32) break;
      expanded.add(group.id);
      budget += (group.fields || []).length;
    }
    if (expanded.size === 0 && groups[0]) expanded.add(groups[0].id);
    return expanded;
  }

  function renderFileHeader() {
    if (!S.file || !S.payload) return;
    $('#copy-file-label').textContent = S.file.label;
    $('#copy-file-kind').textContent = KIND_LABELS[S.file.kind] || S.file.kind;
    $('#copy-file-path').textContent = S.file.path;
    const groupCount = (S.payload.groups || []).length;
    $('#copy-file-total').textContent = `${S.payload.total} 条 · ${groupCount} 个分组`;
    $('#copy-file-locale').textContent = S.locale ? `${S.locale} · ${LOCALE_NAMES[S.locale] || S.locale}` : '';

    const localeRow = $('#locale-row');
    const switchNode = $('#locale-switch');
    clear(switchNode);
    if (S.file.kind === 'ts') {
      localeRow.hidden = false;
      const locales = new Set(S.file.locales || []);
      for (const key of Object.keys(S.file.fallbacks || {})) locales.add(key);
      for (const locale of locales) {
        const button = el('button', {
          class: `locale-btn${S.locale === locale ? ' is-active' : ''}`,
          type: 'button',
          title: locale === S.requestedLocale && S.locale !== locale ? '该语言复用英文文案' : `切换到 ${LOCALE_NAMES[locale] || locale}`,
        });
        const target = (S.file.fallbacks || {})[locale];
        button.textContent = target && target !== locale ? `${locale}→${target}` : locale;
        button.addEventListener('click', () => switchLocale(locale));
        switchNode.append(button);
      }
    } else {
      localeRow.hidden = true;
    }
    renderFallbackNotice();
    updateUsageHeader();
    updateUsageBar();
    updateUsageToggle();
  }

  function renderFallbackNotice() {
    const notice = $('#fallback-notice');
    const payload = S.payload;
    if (!payload || !payload.fallbackFrom) {
      notice.hidden = true;
      return;
    }
    const requested = payload.fallbackFrom;
    const source = payload.locale || S.locale;
    const node = $('#fallback-notice-text');
    clear(node);
    node.append(
      textNode(`${LOCALE_NAMES[requested] || requested}（${requested}）还没有独立文案，正在编辑${LOCALE_NAMES[source] || source}版（${source}）。保存会写入 `),
      el('code', { text: `${S.file.path} 的 ${source} 区块` }),
      textNode('。')
    );
    notice.hidden = false;
  }

  async function switchLocale(locale) {
    if (!S.file || S.file.kind !== 'ts') return;
    if (S.locale === locale && !S.requestedLocale) return;
    if (S.edits.size > 0) {
      const ok = await confirmModal({
        title: '切换语言会丢弃未保存修改',
        message: `当前文件还有 ${S.edits.size} 处未保存的修改，切换语言后将丢失。`,
        confirmLabel: '仍然切换',
        danger: true,
        filePath: S.file.path,
      });
      if (!ok) return;
    }
    const scrollTop = $('#copy-scroll').scrollTop;
    try {
      await loadCopy(S.file, locale, { preserveExpanded: true, scrollTop });
    } catch (error) {
      toast('error', '切换语言失败', error.message);
    }
  }

  // ---------------------------------------------------------------- rendering --

  function renderLoadingInto(selector, label) {
    const container = $(selector);
    if (!container) return;
    clear(container);
    const wrap = el('div', { class: 'loading-state' }, [
      el('span', { class: 'loading-bar' }, [el('i')]),
      el('span', { text: label }),
    ]);
    if (selector === '#type-groups') {
      wrap.classList.add('type-loading');
    }
    container.append(wrap);
    $('#copy-empty').hidden = true;
    if (selector === '#copy-groups') {
      $('#groups-summary').textContent = '读取中…';
    }
  }

  function renderCopyEmpty(title, hint) {
    const empty = $('#copy-empty');
    empty.hidden = false;
    $('#copy-empty-title').textContent = title;
    $('#copy-empty-hint').textContent = hint;
    $('#copy-groups').hidden = true;
  }

  function renderCopyFatal(message) {
    const container = $('#copy-groups');
    clear(container);
    container.hidden = false;
    const wrap = el('div', { class: 'empty-state' }, [
      el('span', { class: 'empty-mark', text: '!' }),
      el('p', { class: 'empty-title', text: '文案接口请求失败' }),
      el('p', { class: 'empty-hint', text: message }),
    ]);
    const retry = el('button', { class: 'btn btn-ghost btn-tiny', type: 'button', text: '重试' });
    retry.addEventListener('click', () => {
      if (S.file) openFile(S.file);
      else init();
    });
    wrap.append(retry);
    container.append(wrap);
    $('#copy-empty').hidden = true;
  }

  // ----------------------------------------------------------------- usage ----

  function currentUsageKey() {
    return S.file && S.locale ? `${S.file.id}::${S.locale}` : null;
  }

  function activeUsage() {
    if (!S.usage || S.usageKey !== currentUsageKey()) return null;
    return S.usage;
  }

  function usageFieldMap() {
    const usage = activeUsage();
    return usage && usage.fields ? usage.fields : null;
  }

  function usageGroupFor(groupId) {
    const usage = activeUsage();
    if (!usage || !Array.isArray(usage.groups)) return null;
    return usage.groups.find((group) => group.id === groupId) || null;
  }

  function fieldUsage(path) {
    const map = usageFieldMap();
    return map ? map[path] : undefined;
  }

  function formatCheckedAt(iso) {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }

  async function loadUsage(file, locale, options = {}) {
    if (!file || !locale) return;
    const requestId = ++S.usageRequestId;
    S.usageLoading = true;
    S.usageError = null;
    updateUsageBar();
    updateUsageToggle();
    const url = `/api/usage?file=${encodeURIComponent(file.id)}&locale=${encodeURIComponent(locale)}${options.refresh ? '&refresh=1' : ''}`;
    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      let data = null;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }
      if (requestId !== S.usageRequestId) return;
      const unreachable = !response.ok || !data || data.ok === false || data.reachable === false;
      if (unreachable) {
        S.usage = null;
        S.usageKey = null;
        S.usageError = data && data.reachable === false ? 'site-down' : (data && data.error) || `HTTP ${response.status}`;
        const filterReset = S.hideMissing;
        if (filterReset) resetMissingFilter();
        refreshUsageDecorations();
        if (filterReset) renderGroups();
        return;
      }
      S.usage = data;
      S.usageKey = `${file.id}::${S.locale}`;
      S.usageError = null;
      refreshUsageDecorations();
      if (S.hideMissing) {
        const scroller = $('#copy-scroll');
        const scrollTop = scroller.scrollTop;
        renderGroups();
        requestAnimationFrame(() => {
          scroller.scrollTop = scrollTop;
        });
      }
    } catch (error) {
      if (requestId !== S.usageRequestId) return;
      S.usage = null;
      S.usageKey = null;
      S.usageError = error && error.message ? error.message : String(error);
      const filterReset = S.hideMissing;
      if (filterReset) resetMissingFilter();
      refreshUsageDecorations();
      if (filterReset) renderGroups();
    } finally {
      if (requestId === S.usageRequestId) {
        S.usageLoading = false;
        updateUsageBar();
        updateUsageToggle();
      }
    }
  }

  function resetMissingFilter() {
    S.hideMissing = false;
    S.expandedBeforeFilter = null;
    const toggle = $('#hide-missing');
    if (toggle) toggle.checked = false;
  }

  function onToggleMissing(event) {
    const next = Boolean(event.target.checked);
    if (next && !activeUsage()) {
      event.target.checked = false;
      return;
    }
    S.hideMissing = next;
    const scroller = $('#copy-scroll');
    const scrollTop = scroller.scrollTop;
    if (next) {
      S.expandedBeforeFilter = new Set(S.expanded);
      const groups = ((S.payload && S.payload.groups) || []).filter((group) =>
        (group.fields || []).some((field) => fieldUsage(field.path) !== false)
      );
      const nextExpanded = new Set();
      let budget = 0;
      for (const group of groups) {
        if (budget > 0 && budget + (group.fields || []).length > 32) break;
        nextExpanded.add(group.id);
        budget += (group.fields || []).length;
      }
      S.expanded = nextExpanded;
    } else if (S.expandedBeforeFilter) {
      S.expanded = S.expandedBeforeFilter;
      S.expandedBeforeFilter = null;
    }
    renderGroups();
    growAllVisible();
    requestAnimationFrame(() => {
      scroller.scrollTop = scrollTop;
    });
    updateUsageBar();
    updateUsageToggle();
  }

  function updateUsageBar() {
    const bar = $('#usage-bar');
    if (!bar) return;
    if (!S.payload) {
      bar.hidden = true;
      return;
    }
    bar.hidden = false;
    const status = $('#usage-status');
    const refreshButton = $('#usage-refresh');
    const usage = activeUsage();
    if (S.usageLoading) {
      status.textContent = '正在检查页面出现情况…';
      status.classList.remove('is-error');
      status.removeAttribute('title');
      refreshButton.hidden = true;
      return;
    }
    if (S.usageError) {
      status.textContent = S.usageError === 'site-down'
        ? '本地站点未运行，暂时无法检查文案是否出现在页面上。'
        : `无法检查文案是否出现在页面上：${S.usageError}`;
      status.classList.add('is-error');
      status.title = status.textContent;
      refreshButton.hidden = false;
      refreshButton.textContent = '重试';
      return;
    }
    if (usage) {
      const pages = Array.isArray(usage.pages) ? usage.pages.length : 0;
      const totals = usage.totals || { found: 0, total: 0, missing: 0, unknown: 0 };
      status.textContent = `已检查 ${pages} 个页面 · ${totals.found}/${totals.total} 在用${formatCheckedAt(usage.checkedAt) ? ` · ${formatCheckedAt(usage.checkedAt)}` : ''}`;
      status.classList.remove('is-error');
      status.title = `出现 ${totals.found} 条 · 未出现 ${totals.missing} 条 · 无法判断 ${totals.unknown} 条`;
      refreshButton.hidden = false;
      refreshButton.textContent = '重新检查';
      return;
    }
    status.textContent = '尚未检查页面出现情况';
    status.classList.remove('is-error');
    status.removeAttribute('title');
    refreshButton.hidden = false;
    refreshButton.textContent = '检查';
  }

  function updateUsageToggle() {
    const toggle = $('#hide-missing');
    if (!toggle) return;
    const available = Boolean(activeUsage());
    toggle.checked = S.hideMissing;
    toggle.disabled = S.usageLoading || !available;
  }

  function updateUsageHeader() {
    const usageSpan = $('#copy-usage-total');
    const separator = $('#usage-sep');
    if (!usageSpan || !separator) return;
    const usage = activeUsage();
    if (!usage) {
      usageSpan.hidden = true;
      separator.hidden = true;
      usageSpan.textContent = '';
      usageSpan.removeAttribute('title');
      return;
    }
    const totals = usage.totals || { found: 0, total: 0, missing: 0, unknown: 0 };
    separator.hidden = false;
    usageSpan.hidden = false;
    usageSpan.textContent = `页面出现 ${totals.found} 条`;
    usageSpan.title = `${totals.total} 条中：${totals.found} 条出现 · ${totals.missing} 条未出现 · ${totals.unknown} 条无法判断`;
  }

  function refreshUsageDecorations() {
    if (!S.payload) return;
    updateUsageHeader();
    updateUsageBar();
    updateUsageToggle();
    for (const [path, node] of S.fieldNodes) applyFieldUsage(node, path);
    for (const group of S.payload.groups || []) {
      const section = S.groupNodes.get(group.id);
      if (!section) continue;
      const stats = section.querySelector('.group-stats');
      if (!stats) continue;
      stats.replaceWith(buildGroupStats(group, visibleCountForGroup(group, section)));
    }
    updateDirtyUI();
  }

  function applyFieldUsage(node, path) {
    if (!node || !node.usageChip) return;
    const value = fieldUsage(path);
    if (value === false) {
      node.usageChip.hidden = false;
      node.usageChip.textContent = '未出现';
      node.usageChip.title = '这段文案没有出现在任何已检查页面的渲染 HTML 中，可能来自已下线的旧版页面。';
      node.pathLabel.title = `${path} — 未出现在页面`;
    } else {
      node.usageChip.hidden = true;
      node.usageChip.textContent = '';
      node.usageChip.removeAttribute('title');
      node.pathLabel.title = value === null ? `${path} — 无法判断（可能包含插值或文案过短）` : path;
    }
  }

  function visibleCountForGroup(group, section) {
    const filtering = Boolean(S.search.trim()) || S.hideMissing;
    if (!filtering) return (group.fields || []).length;
    if (S.search.trim()) {
      const matches = filterByQuery(group.fields || [], S.search.trim());
      return S.hideMissing ? matches.filter((field) => fieldUsage(field.path) !== false).length : matches.length;
    }
    return (group.fields || []).filter((field) => fieldUsage(field.path) !== false).length;
  }

  function buildGroupStats(group, visibleCount) {
    const filtering = Boolean(S.search.trim()) || S.hideMissing;
    const groupUsage = usageGroupFor(group.id);
    const stats = el('span', { class: 'group-stats' });
    if (groupUsage) {
      const found = groupUsage.found || 0;
      const total = groupUsage.total || 0;
      const unknown = groupUsage.unknown || 0;
      stats.append(
        el('span', {
          class: 'group-usage',
          text: `${found}/${total} 在用`,
          title: `${found} 条出现 · ${Math.max(total - found - unknown, 0)} 条未出现 · ${unknown} 条无法判断`,
        })
      );
      if (total >= 10 && found / total < 0.2) {
        stats.append(
          el('span', {
            class: 'group-legacy',
            text: '旧版残留',
            title: `仅 ${Math.round((found / total) * 100)}% 的文案出现在当前渲染页面，可能来自已下线的旧版布局`,
          })
        );
      }
    }
    if (filtering) stats.append(el('span', { class: 'group-visible', text: `${visibleCount} 条可见` }));
    else if (!groupUsage) stats.append(el('span', { class: 'group-count', text: `${(group.fields || []).length} 字段` }));
    const changed = countGroupChanges(group);
    stats.append(el('span', { class: 'group-changed', hidden: changed === 0, text: `${changed} 处改动` }));
    return stats;
  }

  function filterByQuery(fields, query) {
    if (!query) return fields;
    const needle = query.toLowerCase();
    return fields.filter((field) => `${field.path} ${field.label || ''} ${field.value}`.toLowerCase().includes(needle));
  }

  function filterFields(fields, query) {
    let result = filterByQuery(fields, query);
    const map = usageFieldMap();
    if (S.hideMissing && map) result = result.filter((field) => map[field.path] !== false);
    return result;
  }

  function renderGroups() {
    const container = $('#copy-groups');
    const empty = $('#copy-empty');
    if (!S.payload) return;
    clear(container);
    S.fieldNodes = new Map();
    S.groupNodes = new Map();
    container.hidden = false;

    const query = S.search.trim();
    const usageMap = usageFieldMap();
    const filtering = Boolean(query) || S.hideMissing;
    const groups = (S.payload.groups || []).map((group) => {
      const all = group.fields || [];
      const queryMatched = filterByQuery(all, query);
      const fields = S.hideMissing && usageMap
        ? queryMatched.filter((field) => usageMap[field.path] !== false)
        : queryMatched;
      return { group, fields, queryMatchedCount: queryMatched.length };
    });
    const visibleGroups = filtering ? groups.filter((entry) => entry.fields.length > 0) : groups;
    const shown = visibleGroups.reduce((sum, entry) => sum + entry.fields.length, 0);
    const hiddenMissing = S.hideMissing && usageMap
      ? groups.reduce((sum, entry) => sum + (entry.queryMatchedCount - entry.fields.length), 0)
      : 0;

    if (visibleGroups.length === 0) {
      empty.hidden = false;
      if (query) {
        $('#copy-empty-title').textContent = '没有匹配的字段';
        $('#copy-empty-hint').textContent = hiddenMissing > 0
          ? `“${query}” 匹配到的文案都还没有出现在页面上（已隐藏 ${hiddenMissing} 条）。`
          : `“${query}” 在当前文件里没有结果，试试别的关键词。`;
        $('#groups-summary').textContent = `0 匹配 / ${S.payload.total} 字段`;
        $('#search-count').textContent = hiddenMissing > 0 ? `0 匹配 · 隐藏 ${hiddenMissing}` : '0 匹配';
      } else if (S.hideMissing) {
        $('#copy-empty-title').textContent = '没有出现在页面上的文案';
        $('#copy-empty-hint').textContent = '关闭「隐藏未出现的文案」可以查看全部字段。';
        $('#groups-summary').textContent = `${S.payload.total} 字段 · 全部未出现或无法判断`;
        $('#search-count').textContent = '';
      } else {
        $('#copy-empty-title').textContent = '这个文件没有可编辑字段';
        $('#copy-empty-hint').textContent = '检查文件内容或刷新页面。';
        $('#groups-summary').textContent = '0 字段';
      }
      updateUsageBar();
      updateUsageToggle();
      return;
    }
    empty.hidden = true;

    for (const { group, fields } of visibleGroups) {
      const open = query ? true : S.expanded.has(group.id);
      const section = buildGroupSection(group, fields, open);
      container.append(section);
      S.groupNodes.set(group.id, section);
    }

    if (filtering) {
      $('#groups-summary').textContent = `${visibleGroups.length} 个分组 · ${shown} 条可见${hiddenMissing ? ` · 已隐藏 ${hiddenMissing} 条未出现` : ''}`;
    } else {
      $('#groups-summary').textContent = `${groups.length} 个分组 · ${S.payload.total} 字段`;
    }
    $('#search-count').textContent = query ? `${shown} 匹配${hiddenMissing ? ` · 隐藏 ${hiddenMissing}` : ''}` : '';
    $('#expand-all').disabled = Boolean(query);
    $('#collapse-all').disabled = Boolean(query);
    updateUsageBar();
    updateUsageToggle();
  }

  function buildGroupSection(group, fields, open) {
    const section = el('section', { class: `group${open ? ' is-open' : ''}`, dataset: { groupId: group.id } });
    const header = el('button', {
      class: 'group-head',
      type: 'button',
      'aria-expanded': open ? 'true' : 'false',
    });
    const chevron = svgIcon('i-chevron', 'icon group-chevron');
    const title = el('span', { class: 'group-title' }, [
      el('span', { class: 'group-label', text: group.label || group.id }),
      el('span', { class: 'group-id', text: group.id }),
    ]);
    const stats = buildGroupStats(group, fields.length);
    header.append(chevron, title, stats);
    section.append(header);

    if (open) section.append(buildGroupBody(group, fields));

    header.addEventListener('click', () => {
      const wasOpen = section.classList.contains('is-open');
      if (wasOpen) {
        const body = section.querySelector('.group-body');
        if (body) body.remove();
        section.classList.remove('is-open');
        header.setAttribute('aria-expanded', 'false');
        if (!S.search) S.expanded.delete(group.id);
      } else {
        section.append(buildGroupBody(group, fields));
        section.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
        if (!S.search) S.expanded.add(group.id);
      }
    });
    return section;
  }

  function countGroupChanges(group) {
    let count = 0;
    for (const field of group.fields || []) {
      if (S.edits.has(field.path)) count += 1;
    }
    return count;
  }

  function buildGroupBody(group, fields) {
    const body = el('div', { class: 'group-body' });
    const distinctSections = new Set(fields.map((field) => field.section == null ? '_none' : field.section));
    const useSubgroups = fields.length >= 9 && distinctSections.size > 1;
    if (!useSubgroups) {
      for (const field of fields) body.append(buildField(field));
      return body;
    }
    const counts = new Map();
    for (const field of fields) {
      const key = field.section == null ? '_none' : field.section;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    let currentKey = null;
    for (const field of fields) {
      const key = field.section == null ? '_none' : field.section;
      if (key !== currentKey) {
        currentKey = key;
        const label = field.sectionLabel || field.section || '其他';
        body.append(
          el('div', { class: 'subgroup-head' }, [
            el('span', { text: label }),
            el('span', { class: 'subgroup-count', text: `${counts.get(key)}` }),
          ])
        );
      }
      body.append(buildField(field));
    }
    return body;
  }

  function buildField(field) {
    const changed = S.edits.has(field.path);
    const current = changed ? S.edits.get(field.path) : field.value;
    const wrap = el('div', {
      class: `field${changed ? ' is-changed' : ''}`,
      dataset: { path: field.path, multiline: field.multiline ? 'true' : 'false' },
    });
    const pathLabel = el('span', { class: 'field-path', text: field.path, title: field.path });
    const reset = el('button', {
      class: 'field-reset',
      type: 'button',
      text: '重置',
      'aria-label': `重置 ${field.path}`,
      title: '恢复为文件中的原文',
    });
    const usageChip = el('span', { class: 'usage-chip', hidden: true });
    const top = el('div', { class: 'field-top' }, [
      pathLabel,
      el('span', { class: 'field-line', text: `L${field.line}` }),
      usageChip,
      el('span', { class: 'changed-dot' }),
      reset,
    ]);
    const input = el('textarea', {
      class: 'field-input',
      spellcheck: 'false',
      'aria-label': field.path,
      placeholder: field.multiline ? '多行文案，可换行…' : '填写文案…',
    });
    input.value = current == null ? '' : current;
    const count = el('span', { class: 'field-count', text: `${Array.from(current == null ? '' : current).length} 字` });
    const bottom = el('div', { class: 'field-bottom' }, [count]);
    wrap.append(top, input, bottom);

    S.fieldNodes.set(field.path, { wrap, input, count, reset, pathLabel, usageChip });
    applyFieldUsage(S.fieldNodes.get(field.path), field.path);

    input.addEventListener('input', () => {
      const value = input.value;
      if (value === field.value) S.edits.delete(field.path);
      else S.edits.set(field.path, value);
      wrap.classList.toggle('is-changed', S.edits.has(field.path));
      count.textContent = `${Array.from(value).length} 字`;
      autoGrow(input);
      updateDirtyUI();
    });
    input.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        saveCopy();
      }
    });
    reset.addEventListener('click', () => {
      S.edits.delete(field.path);
      input.value = field.value == null ? '' : field.value;
      wrap.classList.remove('is-changed');
      count.textContent = `${Array.from(input.value).length} 字`;
      autoGrow(input);
      updateDirtyUI();
    });

    requestAnimationFrame(() => autoGrow(input));
    return wrap;
  }

  function autoGrow(input) {
    input.style.height = '0px';
    const full = Math.max(input.scrollHeight, fieldMinHeight(input));
    const capped = Math.min(full, TEXTAREA_MAX);
    input.style.height = `${capped}px`;
    input.style.overflowY = full > capped ? 'auto' : 'hidden';
  }

  function fieldMinHeight(input) {
    return input.dataset.multiline === 'true' ? 48 : 34;
  }

  function growAllVisible() {
    requestAnimationFrame(() => {
      $$('.field-input').forEach(autoGrow);
    });
  }

  // ------------------------------------------------------------------- dirty --

  function updateDirtyUI() {
    if (S.activeTab === 'copy') {
      const changedByGroup = new Map();
      for (const path of S.edits.keys()) {
        const groupId = S.groupIdByPath.get(path);
        if (groupId) changedByGroup.set(groupId, (changedByGroup.get(groupId) || 0) + 1);
      }
      for (const [groupId, section] of S.groupNodes) {
        const count = changedByGroup.get(groupId) || 0;
        section.classList.toggle('has-changes', count > 0);
        const chip = section.querySelector('.group-changed');
        if (chip) {
          chip.textContent = `${count} 处改动`;
          chip.hidden = count === 0;
        }
      }
      const activeItem = $('#file-list .file-item.is-active');
      if (activeItem) {
        const dot = activeItem.querySelector('.file-dirty');
        if (dot) dot.hidden = S.edits.size === 0;
      }
    } else {
      updateTypeGroupFlags();
    }
    updateActionBar();
    updateTabs();
  }

  function updateTabs() {
    $('#tab-copy-count').textContent = S.payload ? String(S.payload.total) : '–';
    const totalTokens = S.typePayload ? (S.typePayload.groups || []).reduce((sum, group) => sum + (group.tokens || []).length, 0) : null;
    $('#tab-type-count').textContent = totalTokens == null ? '–' : String(totalTokens);
  }

  function updateActionBar() {
    const isCopy = S.activeTab === 'copy';
    const saveButton = $('#btn-save');
    const discardButton = $('#btn-discard');
    const diffButton = $('#btn-diff');
    const revertButton = $('#btn-revert');
    const summary = $('.action-summary');
    const actionCount = $('#action-count');
    const summaryText = $('#action-summary-text');
    const summaryFile = $('#action-dirty-file');

    revertButton.hidden = !isCopy;
    let count = 0;
    let saveLabel = '保存 0 处修改';
    let discardLabel = '放弃改动';
    let fileLabel = '';
    let dirty = false;

    if (isCopy) {
      count = S.edits.size;
      dirty = count > 0;
      saveLabel = `保存 ${count} 处修改`;
      summaryText.textContent = dirty ? `当前文件有 ${count} 处未保存修改` : '当前文件没有未保存修改';
      fileLabel = dirty && S.file ? S.file.path : '';
      diffButton.textContent = '查看 git diff';
      diffButton.disabled = !S.payload || S.busy;
      revertButton.disabled = !S.file || S.busy;
      discardButton.disabled = count === 0 || S.busy;
    } else {
      const tokenCount = dirtyTokenNames().length;
      const overrides = overridesDirty();
      count = tokenCount;
      dirty = tokenCount > 0 || overrides;
      saveLabel = tokenCount > 0
        ? `保存 ${tokenCount} 处字号修改`
        : overrides
          ? '保存覆盖样式'
          : '保存 0 处修改';
      discardLabel = '放弃字号改动';
      summaryText.textContent = tokenCount > 0 || overrides
        ? `字号 ${tokenCount} 处未保存${overrides ? ' · 覆盖样式有改动' : ''}`
        : '字号没有未保存修改';
      fileLabel = tokenCount > 0 ? S.typeScalePath : overrides ? S.overridesPath : '';
      diffButton.textContent = '查看 tokens diff';
      diffButton.disabled = !S.typePayload || S.busy;
      discardButton.disabled = (tokenCount === 0 && !overrides) || S.busy;
    }

    actionCount.textContent = String(count);
    summary.classList.toggle('is-dirty', dirty);
    summaryFile.textContent = fileLabel;
    summaryFile.title = fileLabel;
    saveButton.textContent = S.busy ? '保存中…' : saveLabel;
    saveButton.disabled = !dirty || S.busy;
    discardButton.textContent = discardLabel;
  }

  // ------------------------------------------------------------------ save copy --

  async function saveCopy() {
    if (!S.payload || S.busy || S.edits.size === 0) return;
    const file = S.file;
    const changes = Array.from(S.edits.entries()).map(([path, value]) => ({ path, value }));
    const scrollTop = $('#copy-scroll').scrollTop;
    setBusy(true);
    try {
      const response = await API.saveCopy({
        file: file.id,
        ...(file.kind === 'ts' ? { locale: S.locale } : {}),
        changes,
      });
      S.edits.clear();
      toast('success', `已保存 ${response.saved != null ? response.saved : changes.length} 处修改`, response.path || file.path);
      await loadCopy(file, S.requestedLocale, {
        preserveExpanded: true,
        preserveSearch: true,
        scrollTop,
      });
      loadUsage(file, S.locale, { refresh: true });
      if (S.autoRefresh) refreshPreview(true);
    } catch (error) {
      toast('error', '保存失败', error.message);
      updateDirtyUI();
    } finally {
      setBusy(false);
    }
  }

  function discardCopy() {
    if (S.edits.size === 0) return;
    const count = S.edits.size;
    const scrollTop = $('#copy-scroll').scrollTop;
    S.edits.clear();
    renderGroups();
    const scroller = $('#copy-scroll');
    requestAnimationFrame(() => {
      scroller.scrollTop = scrollTop;
    });
    updateDirtyUI();
    toast('success', '已放弃改动', `${count} 处修改已恢复为文件原文`);
  }

  async function revertFile() {
    if (!S.file || S.busy) return;
    const file = S.file;
    const ok = await confirmModal({
      eyebrow: 'Revert · 还原',
      title: `还原 ${file.path} 到 git HEAD？`,
      message: `该文件中所有未提交的改动都会被丢弃${S.edits.size ? `，包括当前 ${S.edits.size} 处未保存编辑` : ''}。此操作无法撤销。`,
      confirmLabel: '确认还原',
      danger: true,
      filePath: file.path,
    });
    if (!ok) return;
    setBusy(true);
    try {
      const response = await API.revert(file.id);
      toast('success', '已还原文件', response.path || file.path);
      await loadCopy(file, S.requestedLocale, { preserveExpanded: true, preserveSearch: false });
      loadUsage(file, S.locale, { refresh: true });
      if (S.autoRefresh) refreshPreview(true);
    } catch (error) {
      toast('error', '还原失败', error.message);
    } finally {
      setBusy(false);
    }
  }

  // ---------------------------------------------------------------- search ----

  function onSearchInput() {
    S.search = $('#copy-search').value;
    renderGroups();
    updateDirtyUI();
  }

  // ------------------------------------------------------------------ tabs ----

  function setActiveTab(tab) {
    if (S.activeTab === tab) return;
    S.activeTab = tab;
    $$('.tab').forEach((button) => {
      const active = button.dataset.tab === tab;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    $('#panel-copy').hidden = tab !== 'copy';
    $('#panel-copy').classList.toggle('is-active', tab === 'copy');
    $('#panel-type').hidden = tab !== 'type';
    $('#panel-type').classList.toggle('is-active', tab === 'type');
    if (tab === 'type' && !S.typeLoaded) {
      renderLoadingInto('#type-groups', '读取 tokens.css…');
      loadTypeScale();
    }
    updateActionBar();
  }

  // -------------------------------------------------------------- type scale --

  async function loadTypeScale(options = {}) {
    try {
      const data = await API.typeScale();
      S.typePayload = data;
      S.typeLoaded = true;
      S.typeGroups = data.groups || [];
      const allTokens = [];
      S.typeOriginals = new Map();
      S.typeParts = new Map();
      S.typeRaw = new Map();
      for (const group of S.typeGroups) {
        for (const token of group.tokens || []) {
          allTokens.push(token);
          S.typeOriginals.set(token.name, { raw: token.raw, parts: { ...(token.parts || {}) } });
          S.typeParts.set(token.name, { ...(token.parts || {}) });
          S.typeRaw.set(token.name, token.raw);
        }
      }
      const overridesText = data.overrides && typeof data.overrides.text === 'string' ? data.overrides.text : '';
      const hasOverrideDraft = options.keepOverridesDraft === true && S.overridesValue !== S.overridesOriginal;
      if (!hasOverrideDraft) {
        S.overridesOriginal = overridesText;
        S.overridesValue = overridesText;
        $('#overrides-text').value = overridesText;
      }
      S.overridesPath = (data.overrides && data.overrides.path) || S.overridesPath;
      S.typeScalePath = data.path || S.typeScalePath;
      $('#type-path').textContent = S.typeScalePath;
      $('#overrides-path').textContent = S.overridesPath;
      renderTypeScale();
      updateTabs();
      updateDirtyUI();
      updateOverridesUI();
      if (options.scrollTop != null) {
        const scroller = $('#type-scroll');
        requestAnimationFrame(() => {
          scroller.scrollTop = options.scrollTop;
        });
      }
    } catch (error) {
      renderTypeError(error.message);
      toast('error', '字号数据加载失败', error.message);
    }
  }

  function renderTypeError(message) {
    const container = $('#type-groups');
    clear(container);
    const wrap = el('div', { class: 'empty-state' }, [
      el('span', { class: 'empty-mark', text: '!' }),
      el('p', { class: 'empty-title', text: '读取 tokens.css 失败' }),
      el('p', { class: 'empty-hint', text: message }),
    ]);
    const retry = el('button', { class: 'btn btn-ghost btn-tiny', type: 'button', text: '重试' });
    retry.addEventListener('click', () => loadTypeScale());
    wrap.append(retry);
    container.append(wrap);
  }

  function renderTypeScale() {
    const container = $('#type-groups');
    clear(container);
    S.typeGroupNodes = new Map();
    const groups = S.typeGroups || [];
    groups.forEach((group, index) => {
      const tokens = group.tokens || [];
      const section = el('section', { class: 'type-group', dataset: { typeGroup: group.id } });
      const header = el('header', { class: 'type-group-head' }, [
        el('span', { class: 'type-group-index', text: String(index + 1).padStart(2, '0') }),
        el('span', { class: 'type-group-label', text: group.label || group.id }),
        el('span', { class: 'type-group-id', text: group.id }),
        el('span', { class: 'type-group-count', text: `${tokens.length} 个 token` }),
        el('span', { class: 'type-group-changed', text: `${countGroupTokenChanges(tokens)} 处改动` }),
      ]);
      section.append(header);
      for (const token of tokens) section.append(buildTokenCard(token, group));
      container.append(section);
      S.typeGroupNodes.set(group.id, section);
    });
    updateTypeGroupFlags();
    updateOverridesUI();
    growAllVisible();
  }

  function partDefinitions(token, group) {
    const bounds = token.bounds || {};
    if (token.kind === 'clamp') {
      return [
        { key: 'min', label: '最小 · min', unit: 'px', min: bounds.min != null ? bounds.min : 8, max: bounds.max != null ? bounds.max : 120, step: 1 },
        { key: 'preferred', label: '首选 · preferred', unit: 'vw', min: 0.2, max: 12, step: 0.1 },
        { key: 'max', label: '最大 · max', unit: 'px', min: bounds.min != null ? bounds.min : 8, max: bounds.max != null ? bounds.max : 160, step: 1 },
      ];
    }
    if (token.kind === 'length') {
      return [{ key: 'value', label: '字号 · size', unit: 'px', min: bounds.min != null ? bounds.min : 8, max: bounds.max != null ? bounds.max : 96, step: 0.5 }];
    }
    const isWeight = group && group.id === 'weight';
    return [
      {
        key: 'value',
        label: isWeight ? '字重 · weight' : '行高 · line-height',
        unit: '',
        min: bounds.min != null ? bounds.min : 0,
        max: bounds.max != null ? bounds.max : 100,
        step: bounds.step != null ? bounds.step : 0.01,
      },
    ];
  }

  function buildTokenCard(token, group) {
    const parts = S.typeParts.get(token.name) || {};
    const originalRaw = S.typeOriginals.has(token.name) ? S.typeOriginals.get(token.name).raw : token.raw;
    const raw = S.typeRaw.get(token.name) || token.raw;
    const changed = raw !== originalRaw;
    const card = el('article', { class: `token${changed ? ' is-changed' : ''}`, dataset: { token: token.name } });
    const rawNode = el('span', { class: 'token-raw', text: changed ? originalRaw : raw, title: '当前写入的原始值' });
    const reset = el('button', {
      class: 'token-reset',
      type: 'button',
      text: '重置',
      title: '恢复为 tokens.css 里的原值',
      'aria-label': `重置 ${token.name}`,
    });
    const head = el('header', { class: 'token-head' }, [
      el('span', { class: 'token-name', text: token.name }),
      el('span', { class: 'token-label', text: token.label || '' }),
      el('span', { class: 'token-line', text: `L${token.line || '?'}` }),
      el('span', { class: 'token-spacer' }),
      el('span', { class: 'token-dot' }),
      rawNode,
      reset,
    ]);
    const defs = partDefinitions(token, group);
    const partsNode = el('div', { class: `token-parts ${defs.length === 3 ? 'cols-3' : 'cols-1'}` });
    const newValue = el('span', { class: 'token-new', hidden: !changed, text: changed ? `→ ${raw}` : '' });
    const foot = el('div', { class: 'token-foot' }, [newValue]);
    card.append(head, partsNode, foot);

    for (const def of defs) {
      const current = Number(parts[def.key] != null ? parts[def.key] : 0);
      const min = Math.min(def.min, current);
      const max = Math.max(def.max, current);
      const slider = el('input', {
        class: 'part-slider',
        type: 'range',
        min: String(min),
        max: String(max),
        step: String(def.step),
        value: String(current),
        'aria-label': `${token.name} ${def.label}`,
      });
      const number = el('input', {
        type: 'number',
        step: String(def.step),
        value: formatNumber(current),
        'aria-label': `${token.name} ${def.label} 数值`,
        min: String(def.min),
        max: String(def.max),
      });
      const numBox = el('div', { class: 'part-num' }, [number, el('span', { class: 'part-unit', text: def.unit })]);
      const partNode = el('div', { class: 'token-part' }, [
        el('div', { class: 'part-label' }, [el('span', { text: def.label })]),
        slider,
        numBox,
      ]);
      partsNode.append(partNode);

      const syncFromSlider = () => {
        const value = Number(slider.value);
        S.typeParts.get(token.name)[def.key] = value;
        number.value = formatNumber(value);
        paintSlider(slider);
        applyTokenChange(token, card, rawNode, newValue);
      };
      const syncFromNumber = () => {
        const rawValue = number.value.trim();
        if (rawValue === '' || rawValue === '-') return;
        const value = Number(rawValue);
        if (!Number.isFinite(value)) return;
        S.typeParts.get(token.name)[def.key] = value;
        if (value >= min && value <= max) slider.value = String(value);
        paintSlider(slider);
        applyTokenChange(token, card, rawNode, newValue);
      };
      slider.addEventListener('input', syncFromSlider);
      number.addEventListener('input', syncFromNumber);
      number.addEventListener('change', () => {
        const value = Number(number.value);
        if (!Number.isFinite(value)) return;
        number.value = formatNumber(value);
        syncFromNumber();
      });
      requestAnimationFrame(() => paintSlider(slider));
    }

    reset.addEventListener('click', () => {
      const original = S.typeOriginals.get(token.name);
      if (!original) return;
      S.typeParts.set(token.name, { ...original.parts });
      S.typeRaw.set(token.name, original.raw);
      renderTypeScale();
      updateDirtyUI();
    });

    return card;
  }

  function paintSlider(slider) {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const value = Number(slider.value);
    const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
    slider.style.setProperty('--track-bg', `linear-gradient(90deg, var(--orange) ${pct}%, var(--line) ${pct}%)`);
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) return '0';
    const rounded = Math.round(value * 1000) / 1000;
    return String(rounded);
  }

  function buildRawValue(token, parts) {
    if (token.kind === 'clamp') {
      return `clamp(${formatNumber(parts.min)}px, ${formatNumber(parts.preferred)}vw, ${formatNumber(parts.max)}px)`;
    }
    if (token.kind === 'length') return `${formatNumber(parts.value)}px`;
    return formatNumber(parts.value);
  }

  function applyTokenChange(token, card, rawNode, newValue) {
    const parts = S.typeParts.get(token.name);
    const raw = buildRawValue(token, parts);
    S.typeRaw.set(token.name, raw);
    const originalRaw = S.typeOriginals.has(token.name) ? S.typeOriginals.get(token.name).raw : token.raw;
    const changed = raw !== originalRaw;
    card.classList.toggle('is-changed', changed);
    rawNode.textContent = changed ? originalRaw : raw;
    newValue.hidden = !changed;
    newValue.textContent = changed ? `→ ${raw}` : '';
    updateTypeGroupFlags();
    updateActionBar();
  }

  function dirtyTokenNames() {
    const names = [];
    for (const [name, raw] of S.typeRaw) {
      const original = S.typeOriginals.get(name);
      if (original && raw !== original.raw) names.push(name);
    }
    return names;
  }

  function countGroupTokenChanges(tokens) {
    let count = 0;
    for (const token of tokens || []) {
      const original = S.typeOriginals.get(token.name);
      if (original && S.typeRaw.get(token.name) !== original.raw) count += 1;
    }
    return count;
  }

  function updateTypeGroupFlags() {
    if (!S.typeGroupNodes) return;
    for (const group of S.typeGroups || []) {
      const section = S.typeGroupNodes.get(group.id);
      if (!section) continue;
      const count = countGroupTokenChanges(group.tokens || []);
      section.classList.toggle('has-changes', count > 0);
      const chip = section.querySelector('.type-group-changed');
      if (chip) chip.textContent = `${count} 处改动`;
    }
  }

  function overridesDirty() {
    return S.overridesValue !== S.overridesOriginal;
  }

  function updateOverridesUI() {
    const dirty = overridesDirty();
    const card = $('.overrides-card');
    card.classList.toggle('has-changes', dirty);
    const text = S.overridesValue;
    const lines = text === '' ? 1 : text.split('\n').length;
    $('#overrides-count').textContent = `${text.length} 字符 · ${lines} 行${dirty ? ' · 未保存' : ' · 已保存'}`;
    updateOverridesButton();
  }

  function updateOverridesButton() {
    const button = $('#overrides-save');
    if (!button) return;
    const dirty = overridesDirty();
    button.disabled = !dirty || S.busy;
    button.textContent = S.busy ? '保存中…' : dirty ? '保存覆盖样式' : '已保存';
  }

  async function saveTypeScale() {
    if (S.busy) return;
    const names = dirtyTokenNames();
    const overrides = overridesDirty();
    if (names.length === 0 && !overrides) {
      toast('success', '没有需要保存的改动', '字号与覆盖样式都是最新状态');
      return;
    }
    setBusy(true);
    try {
      if (names.length > 0) {
        const changes = names.map((name) => ({ name, raw: S.typeRaw.get(name) }));
        const response = await API.saveTypeScale(changes);
        toast('success', '字号已保存', `${response.saved != null ? response.saved : names.length} 处 · ${response.path || S.typeScalePath}`);
        for (const change of changes) {
          const original = S.typeOriginals.get(change.name);
          if (original) original.raw = change.raw;
        }
        await loadTypeScale({ keepOverridesDraft: true, scrollTop: $('#type-scroll').scrollTop });
      }
      if (overrides) {
        const text = S.overridesValue;
        const response = await API.saveOverrides(text);
        toast('success', '覆盖样式已保存', `${response.bytes != null ? response.bytes : text.length} bytes · ${response.path || S.overridesPath}`);
        S.overridesOriginal = text;
        updateOverridesUI();
        if (S.typeGroupNodes.size) updateTypeGroupFlags();
      }
      if ((names.length > 0 || overrides) && S.autoRefresh) refreshPreview(true);
    } catch (error) {
      toast('error', '字号保存失败', error.message);
      updateDirtyUI();
      updateOverridesUI();
    } finally {
      setBusy(false);
      updateDirtyUI();
    }
  }

  async function saveOverridesOnly() {
    if (S.busy || !overridesDirty()) return;
    setBusy(true);
    try {
      const text = S.overridesValue;
      const response = await API.saveOverrides(text);
      toast('success', '覆盖样式已保存', `${response.bytes != null ? response.bytes : text.length} bytes · ${response.path || S.overridesPath}`);
      S.overridesOriginal = text;
      updateOverridesUI();
      if (S.autoRefresh) refreshPreview(true);
    } catch (error) {
      toast('error', '覆盖样式保存失败', error.message);
      updateOverridesUI();
    } finally {
      setBusy(false);
    }
  }

  function discardTypeChanges() {
    const names = dirtyTokenNames();
    if (names.length === 0 && !overridesDirty()) return;
    for (const name of names) {
      const original = S.typeOriginals.get(name);
      if (!original) continue;
      S.typeParts.set(name, { ...original.parts });
      S.typeRaw.set(name, original.raw);
    }
    if (overridesDirty()) {
      S.overridesValue = S.overridesOriginal;
      $('#overrides-text').value = S.overridesOriginal;
    }
    renderTypeScale();
    updateDirtyUI();
    updateOverridesUI();
    toast('success', '已放弃改动', '字号与覆盖样式已恢复为源文件内容');
  }

  // ------------------------------------------------------------------ events --

  function bindEvents() {
    $('#tab-copy').addEventListener('click', () => setActiveTab('copy'));
    $('#tab-type').addEventListener('click', () => setActiveTab('type'));
    $('#btn-save').addEventListener('click', () => {
      if (S.activeTab === 'copy') saveCopy();
      else saveTypeScale();
    });
    $('#btn-discard').addEventListener('click', () => {
      if (S.activeTab === 'copy') discardCopy();
      else discardTypeChanges();
    });
    $('#btn-diff').addEventListener('click', () => {
      if (S.activeTab === 'copy') {
        if (S.file) showDiff(S.file.id, `${S.file.label} · ${S.file.path}`);
      } else {
        showDiff(S.typeScalePath, `tokens.css · ${S.typeScalePath}`);
      }
    });
    $('#btn-revert').addEventListener('click', () => revertFile());
    $('#copy-search').addEventListener('input', debounce(onSearchInput, 90));
    $('#copy-search').addEventListener('search', onSearchInput);
    $('#hide-missing').addEventListener('change', onToggleMissing);
    $('#usage-refresh').addEventListener('click', () => {
      if (S.file && S.locale) loadUsage(S.file, S.locale, { refresh: true });
    });
    $('#expand-all').addEventListener('click', () => {
      if (!S.payload) return;
      S.expanded = new Set((S.payload.groups || []).map((group) => group.id));
      renderGroups();
      growAllVisible();
    });
    $('#collapse-all').addEventListener('click', () => {
      if (!S.payload) return;
      S.expanded = new Set();
      renderGroups();
    });
    $('#preview-refresh').addEventListener('click', () => refreshPreview(true));
    $('#preview-open').addEventListener('click', () => {
      const url = previewUrl(false);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
    $('#auto-refresh').addEventListener('change', (event) => {
      S.autoRefresh = event.target.checked;
    });
    $('#site-retry').addEventListener('click', retrySite);
    $('#overrides-text').addEventListener('input', (event) => {
      S.overridesValue = event.target.value;
      updateOverridesUI();
      updateActionBar();
    });
    $('#overrides-save').addEventListener('click', saveOverridesOnly);
    $('#modal-close').addEventListener('click', () => closeModal(false));
    $('#overlay').addEventListener('click', (event) => {
      if (event.target === $('#overlay')) closeModal(false);
    });
    $('#preview-frame').addEventListener('load', () => {
      if (S.siteReachable === false) {
        setPreviewState('down', '站点未连接');
        return;
      }
      isFrameLoaded = true;
      setPreviewState('ready', '已加载');
    });
    $('#preview-frame').addEventListener('error', () => {
      isFrameLoaded = false;
      setPreviewState('down', '加载失败');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isModalOpen()) {
        closeModal(false);
        return;
      }
      const isSave = (event.ctrlKey || event.metaKey) && String(event.key).toLowerCase() === 's';
      if (isSave) {
        event.preventDefault();
        if (S.activeTab === 'copy') saveCopy();
        else saveTypeScale();
      }
    });

    window.addEventListener('resize', debounce(growAllVisible, 120));

    window.addEventListener('unhandledrejection', (event) => {
      event.preventDefault();
      const error = event.reason;
      const message = error && error.message ? error.message : String(error);
      toast('error', '操作失败', message);
    });
  }

  // -------------------------------------------------------------------- go -----

  function boot() {
    bindEvents();
    updateActionBar();
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
