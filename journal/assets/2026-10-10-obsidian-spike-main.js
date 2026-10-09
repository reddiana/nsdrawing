'use strict';
// NSDrawing 스파이크: .ns.svg만 전용 편집기로 열 수 있는가?
// 버릴 코드입니다. 빌드 없이 바로 돌도록 순수 JavaScript로 씁니다.

const { Plugin, FileView, WorkspaceLeaf, Notice, Menu, TFile, TFolder } = require('obsidian');

const VIEW_TYPE = 'ns-spike-view';
const DIR = 'ns-spike';
const MODEL_RE = /<metadata id="nsdrawing-model"><!\[CDATA\[([\s\S]*?)\]\]><\/metadata>/;
const COLORS = ['#dce6f6', '#f6ebdc', '#e8e1f4', '#e3f1e3'];
const LOG_PATH = DIR + '/spike-log.txt';
let logAdapter = null;
const fmt = (x) => {
  if (typeof x === 'string') return x;
  if (x instanceof Error) return x.stack || x.message;
  try { return JSON.stringify(x); } catch (e) { return String(x); }
};
const log = (...a) => {
  console.log('[ns-spike]', ...a);
  if (!logAdapter) return;
  const line = new Date().toISOString() + ' ' + a.map(fmt).join(' ') + '\n';
  logAdapter.exists(LOG_PATH)
    .then((ok) => ok ? logAdapter.append(LOG_PATH, line) : logAdapter.write(LOG_PATH, line))
    .catch((e) => console.log('[ns-spike] 기록 실패', e));
};

function makeNsSvg(color, stamp) {
  const model = JSON.stringify({ format: 'nsdrawing-spike', version: 0, color, stamp });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
<metadata id="nsdrawing-model"><![CDATA[${model}]]></metadata>
<rect x="1" y="1" width="318" height="118" fill="${color}" stroke="#7e9ccf" stroke-width="2"/>
<text x="16" y="50" font-family="sans-serif" font-size="18" fill="#151a22">NS 스파이크 그림 (.ns.svg)</text>
<text x="16" y="86" font-family="sans-serif" font-size="14" fill="#151a22">${stamp}</text>
</svg>
`;
}

const PLAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
<rect x="1" y="1" width="318" height="118" fill="#ffffff" stroke="#999999" stroke-width="2"/>
<circle cx="60" cy="60" r="34" fill="#f0c674"/>
<text x="112" y="66" font-family="sans-serif" font-size="18" fill="#333333">일반 SVG (plain.svg)</text>
</svg>
`;

const NOTE = `# NS 스파이크 노트

첫 그림은 \`test.ns.svg\`, 둘째 그림은 일반 \`plain.svg\`입니다.

![[test.ns.svg]]

![[plain.svg]]
`;

class NsSpikeView extends FileView {
  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return this.file ? this.file.name : 'NS 스파이크'; }
  getIcon() { return 'layout-grid'; }
  canAcceptExtension(ext) { return ext === 'svg'; }

  async onLoadFile(file) {
    const text = await this.app.vault.read(file);
    const m = text.match(MODEL_RE);
    let model = null;
    try { model = m ? JSON.parse(m[1]) : null; } catch (e) { log('모델 해석 실패', e); }

    const el = this.contentEl;
    el.empty();
    el.createEl('h2', { text: 'NS 스파이크 편집기' });
    el.createEl('p', { text: `파일: ${file.path}` });
    el.createEl('p', { text: model ? `모델을 찾았습니다: ${m[1]}` : '이 파일에는 모델이 없습니다.' });

    const preview = el.createDiv();
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    if (doc.documentElement && doc.documentElement.nodeName === 'svg') {
      preview.appendChild(document.importNode(doc.documentElement, true));
    }

    const btn = el.createEl('button', { text: '그림 바꾸기 (색과 저장 시각)' });
    btn.addEventListener('click', async () => {
      const i = COLORS.indexOf(model ? model.color : '');
      const next = COLORS[(i + 1) % COLORS.length];
      const stamp = '마지막 저장: ' + new Date().toLocaleTimeString();
      await this.app.vault.modify(file, makeNsSvg(next, stamp));
      new Notice('저장했습니다. 노트의 그림이 다시 열지 않아도 바뀌었는지 보세요.');
      await this.onLoadFile(file);
    });
  }

  async onUnloadFile() { this.contentEl.empty(); }
}

module.exports = class NsSpikePlugin extends Plugin {
  async onload() {
    logAdapter = this.app.vault.adapter;
    const obs = require('obsidian');
    log('켜짐', { apiVersion: obs.apiVersion, platform: navigator.userAgent });
    this.registerView(VIEW_TYPE, (leaf) => new NsSpikeView(leaf));

    // 진단: Obsidian이 파일을 외부 프로그램으로 넘기는 순간과, 파일이 열리는 순간을 기록
    if (typeof this.app.openWithDefaultApp === 'function') {
      const origOpen = this.app.openWithDefaultApp;
      const app = this.app;
      app.openWithDefaultApp = function (path) {
        log('외부 프로그램으로 넘김(openWithDefaultApp)', path);
        return origOpen.apply(this, arguments);
      };
      this.register(() => { app.openWithDefaultApp = origOpen; });
    } else {
      log('openWithDefaultApp 없음');
    }
    this.registerEvent(this.app.workspace.on('file-open', (f) => log('file-open', f ? f.path : null)));
    const vr = this.app.viewRegistry;
    if (vr && vr.typeByExtension) {
      log('확장자 등록 상태', { svg: vr.typeByExtension['svg'], 'ns.svg': vr.typeByExtension['ns.svg'] });
    }

    // 시도 1: 점이 두 개인 확장자를 등록할 수 있는가?
    try {
      this.registerExtensions(['ns.svg'], VIEW_TYPE);
      log('registerExtensions(["ns.svg"]) 호출 성공');
      if (vr && vr.typeByExtension) {
        log('등록 뒤 상태', { svg: vr.typeByExtension['svg'], 'ns.svg': vr.typeByExtension['ns.svg'] });
      }
    } catch (e) {
      log('registerExtensions(["ns.svg"]) 실패', e);
    }

    // 시도 2: 파일을 열 때 보기 종류를 가로채서 .ns.svg만 우리 편집기로 돌린다.
    const REDIRECT_FROM = new Set(['image']);
    const orig = WorkspaceLeaf.prototype.setViewState;
    WorkspaceLeaf.prototype.setViewState = function (state, eState) {
      try {
        const file = state && state.state && state.state.file;
        if (typeof file === 'string' && file.toLowerCase().endsWith('.svg')) {
          const isNs = file.toLowerCase().endsWith('.ns.svg');
          log('setViewState', state.type, file);
          if (isNs && state.type !== VIEW_TYPE && REDIRECT_FROM.has(state.type)) {
            new Notice(`가로챔: ${state.type} → NS 편집기 (${file})`);
            state = Object.assign({}, state, { type: VIEW_TYPE });
          } else if (state.type !== VIEW_TYPE) {
            new Notice(`열림: 보기 종류 "${state.type}" (${file})`);
          }
        }
      } catch (e) {
        log('가로채기 오류', e);
      }
      return orig.call(this, state, eState);
    };
    this.register(() => { WorkspaceLeaf.prototype.setViewState = orig; });

    // 노트에 넣은 .ns.svg 그림 우클릭: Obsidian의 기존 메뉴는 그대로 두고 "Edit NS diagram"을 더한다
    const plugin = this;
    const openInEditor = async (file) => {
      const leaf = this.app.workspace.getLeaf('tab');
      await leaf.setViewState({ type: VIEW_TYPE, state: { file: file.path }, active: true });
    };
    const addEditItem = (menu, file, how) => {
      if (menu.__nsAdded) return;
      menu.__nsAdded = true;
      // system 구역(기본 앱에서 열기, 폴더에서 보기 …)의 맨 아래. 바로 아래가 삭제 항목이 있는 danger 구역
      menu.addItem((item) => item.setTitle('Edit NS diagram').setIcon('pencil').setSection('system').onClick(() => openInEditor(file)));
      log('메뉴에 항목 추가', how, file.path);
    };

    // 우클릭한 그림을 잠깐 기억해 둔다 (메뉴를 막지 않음)
    this.lastEmbed = null;
    this.registerDomEvent(document, 'contextmenu', (evt) => {
      const t = evt.target;
      const embed = t instanceof Element ? t.closest('.internal-embed') : null;
      if (!embed) { this.lastEmbed = null; return; }
      const src = (embed.getAttribute('src') || '').split('|')[0];
      const active = this.app.workspace.getActiveFile();
      const file = this.app.metadataCache.getFirstLinkpathDest(src, active ? active.path : '');
      this.lastEmbed = file && file.path.toLowerCase().endsWith('.ns.svg') ? { file, at: Date.now() } : null;
      log('그림 우클릭', src, this.lastEmbed ? '(.ns.svg)' : '');
    }, { capture: true });

    // 방법 1 (정식): file-menu 이벤트
    this.registerEvent(this.app.workspace.on('file-menu', (menu, file, source) => {
      log('file-menu 이벤트', source, file ? file.path : null);
      if (file instanceof TFile && file.path.toLowerCase().endsWith('.ns.svg')) addEditItem(menu, file, 'file-menu:' + source);
    }));

    // 질문 4: .ns.svg가 바뀌면, 열려 있는 노트의 그림을 다시 불러오게 한다
    this.registerEvent(this.app.vault.on('modify', (file) => {
      if (file instanceof TFile && file.path.toLowerCase().endsWith('.ns.svg')) this.refreshEmbeds(file);
    }));

    this.addCommand({
      id: 'create-test-files',
      name: '스파이크 테스트 파일 만들기',
      callback: () => this.createTestFiles(),
    });
  }

  refreshEmbeds(file) {
    const url = this.app.vault.getResourcePath(file); // 끝에 수정 시각이 붙어 있어 주소가 바뀐다
    let count = 0;
    this.app.workspace.iterateAllLeaves((leaf) => {
      const root = leaf.view && leaf.view.containerEl;
      if (!root) return;
      const sourcePath = leaf.view.file ? leaf.view.file.path : '';
      root.querySelectorAll('.internal-embed').forEach((embed) => {
        const src = embed.getAttribute('src') || '';
        const dest = this.app.metadataCache.getFirstLinkpathDest(src.split('|')[0], sourcePath);
        if (!dest || dest.path !== file.path) return;
        embed.querySelectorAll('img').forEach((img) => { img.src = url; count++; });
      });
    });
    log('노트 그림 갱신', file.path, count + '개');
  }

  async createTestFiles() {
    const vault = this.app.vault;
    if (!(vault.getAbstractFileByPath(DIR) instanceof TFolder)) await vault.createFolder(DIR);
    const put = async (name, content) => {
      const path = `${DIR}/${name}`;
      const f = vault.getAbstractFileByPath(path);
      if (f instanceof TFile) await vault.modify(f, content);
      else await vault.create(path, content);
    };
    await put('test.ns.svg', makeNsSvg(COLORS[0], '처음 만든 그림'));
    await put('plain.svg', PLAIN_SVG);
    await put('test-note.md', NOTE);
    new Notice(`${DIR}/ 폴더에 테스트 파일 세 개를 만들었습니다.`);
    const note = vault.getAbstractFileByPath(`${DIR}/test-note.md`);
    if (note instanceof TFile) await this.app.workspace.getLeaf('tab').openFile(note);
  }

  onunload() { log('꺼짐'); }
};
