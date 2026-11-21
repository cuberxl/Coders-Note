const fs = require('fs');
const path = require('path');

const ROOT = '.';
const OUT = 'stats.html';
const SKIP = new Set(['.git', '.github', 'node_modules', 'assets', '_includes', '.stackedit-trash', '.noteser']);
const FENCE = String.fromCharCode(96, 96, 96);

function walk(dir, base = dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else if (e.name.endsWith('.md')) out.push(path.relative(base, p).split(path.sep).join('/'));
  }
  return out;
}

const files = [];
for (const rel of walk(ROOT)) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const lines = text.split('\n');

  let code = 0, inCode = false;
  for (const l of lines) {
    if (l.startsWith(FENCE)) { inCode = !inCode; continue; }
    if (inCode) code++;
  }

  const prose = text.replace(/```[\s\S]*?```/g, ' ');
  const cjk = (prose.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = (prose.match(/[A-Za-z][A-Za-z0-9_'-]*/g) || []).length;
  const display = (text.match(/\$\$[\s\S]*?\$\$/g) || []).length;
  const inline = text.replace(/\$\$[\s\S]*?\$\$/g, ' ').match(/\$[^$\n]+\$/g) || [];

  const titleLine = lines.find(l => /^##\s+/.test(l)) || '';
  const title = titleLine.replace(/^##\s+/, '').trim() || path.basename(rel, '.md');

  files.push({
    path: rel,
    chapter: rel.split('/')[0].replace(/\.md$/, '') || '(根目录)',
    title,
    cjk,
    words,
    total: cjk + words,
    code,
    formula: display + inline.length,
  });
}

const chapters = {};
for (const f of files) {
  const c = chapters[f.chapter] || { chapter: f.chapter, files: 0, cjk: 0, words: 0, total: 0, code: 0, formula: 0 };
  c.files++; c.cjk += f.cjk; c.words += f.words; c.total += f.total; c.code += f.code; c.formula += f.formula;
  chapters[f.chapter] = c;
}
const chapterList = Object.values(chapters).sort((a, b) => b.total - a.total);

const sum = k => files.reduce((s, f) => s + f[k], 0);
const totals = { files: files.length, cjk: sum('cjk'), words: sum('words'), total: sum('total'), code: sum('code'), formula: sum('formula') };
totals.avg = Math.round(totals.total / totals.files);

const data = JSON.stringify({ totals, chapters: chapterList, files }, null, 0);

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>笔记用量统计 · Coders-Note</title>
<style>
  :root {
    --bg: #f7f8fa; --card: #fff; --line: #e5e7eb; --text: #1f2937; --muted: #6b7280;
    --accent: #2563eb; --accent-soft: #dbeafe;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 32px 20px 64px; background: var(--bg); color: var(--text);
    font: 15px/1.6 system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif;
  }
  .wrap { max-width: 1080px; margin: 0 auto; }
  header h1 { margin: 0 0 6px; font-size: 24px; letter-spacing: .5px; }
  header p { margin: 0 0 24px; color: var(--muted); font-size: 13px; }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 28px; }
  .card { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; }
  .card .k { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .card .v { font-size: 22px; font-weight: 650; font-variant-numeric: tabular-nums; }
  .card .v small { font-size: 12px; font-weight: 400; color: var(--muted); margin-left: 4px; }
  h2 { font-size: 16px; margin: 32px 0 12px; }
  .panel { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 16px; }
  .bar-row { display: grid; grid-template-columns: 150px 1fr 90px; align-items: center; gap: 10px; padding: 5px 0; }
  .bar-row .name { font-size: 13px; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bar-track { background: #eef2f7; border-radius: 4px; height: 14px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); border-radius: 4px; }
  .bar-row .num { text-align: right; font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
  .tools { display: flex; gap: 10px; margin: 12px 0; align-items: center; flex-wrap: wrap; }
  input[type=search] {
    flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid var(--line);
    border-radius: 8px; font-size: 13px; background: var(--card); color: var(--text);
  }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { padding: 8px 10px; border-bottom: 1px solid var(--line); text-align: left; }
  th { cursor: pointer; user-select: none; color: var(--muted); font-weight: 600; white-space: nowrap; }
  th:hover { color: var(--accent); }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; }
  tbody tr:hover { background: #fafbfc; }
  .muted { color: var(--muted); }
  .empty { padding: 20px; text-align: center; color: var(--muted); }
  footer { margin-top: 36px; font-size: 12px; color: var(--muted); }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>笔记用量统计</h1>
    <p>统计规则：正文中文按字计、英文按词计；代码块单独统计行数，不计入字数；公式统计行内与块级总数。</p>
  </header>

  <section class="cards" id="cards"></section>

  <h2>各章篇幅</h2>
  <div class="panel" id="bars"></div>

  <h2>全部页面</h2>
  <div class="tools">
    <input type="search" id="q" placeholder="搜索标题或路径…">
    <span class="muted" id="hint"></span>
  </div>
  <div class="panel">
    <table>
      <thead>
        <tr>
          <th data-key="title">页面</th>
          <th data-key="chapter">所属章节</th>
          <th class="num" data-key="total">字数</th>
          <th class="num" data-key="cjk">中文字</th>
          <th class="num" data-key="words">英文词</th>
          <th class="num" data-key="code">代码行</th>
          <th class="num" data-key="formula">公式</th>
        </tr>
      </thead>
      <tbody id="rows"></tbody>
    </table>
  </div>

  <footer>数据由 tools/gen-stats.js 生成，页面无外部依赖，可离线打开。</footer>
</div>

<script>
const DATA = ${data};

const fmt = n => n.toLocaleString('en-US');

const cards = [
  ['总字数', DATA.totals.total, '中 ' + fmt(DATA.totals.cjk) + ' + 英 ' + fmt(DATA.totals.words)],
  ['中文字', DATA.totals.cjk, ''],
  ['英文词', DATA.totals.words, ''],
  ['代码行', DATA.totals.code, '不计入字数'],
  ['公式', DATA.totals.formula, '行内 + 块级'],
  ['页面', DATA.totals.files, '平均 ' + fmt(DATA.totals.avg) + ' 字/篇'],
];

document.getElementById('cards').innerHTML = cards.map(([k, v, sub]) =>
  '<div class="card"><div class="k">' + k + '</div><div class="v">' + fmt(v) +
  (sub ? '<small>' + sub + '</small>' : '') + '</div></div>'
).join('');

const max = Math.max(...DATA.chapters.map(c => c.total));
document.getElementById('bars').innerHTML = DATA.chapters.map(c =>
  '<div class="bar-row"><div class="name" title="' + c.chapter + '">' + c.chapter + '</div>' +
  '<div class="bar-track"><div class="bar-fill" style="width:' + (c.total / max * 100).toFixed(1) + '%"></div></div>' +
  '<div class="num">' + fmt(c.total) + '</div></div>'
).join('');

let sortKey = 'total', sortAsc = false;
const q = document.getElementById('q');
const rows = document.getElementById('rows');
const hint = document.getElementById('hint');

function render() {
  const kw = q.value.trim().toLowerCase();
  let list = DATA.files.filter(f =>
    !kw || f.title.toLowerCase().includes(kw) || f.path.toLowerCase().includes(kw)
  );
  list.sort((a, b) => {
    const x = a[sortKey], y = b[sortKey];
    if (typeof x === 'string') return sortAsc ? x.localeCompare(y) : y.localeCompare(x);
    return sortAsc ? x - y : y - x;
  });
  rows.innerHTML = list.length ? list.map(f =>
    '<tr><td>' + f.title + '</td><td class="muted">' + f.chapter + '</td>' +
    '<td class="num">' + fmt(f.total) + '</td><td class="num">' + fmt(f.cjk) + '</td>' +
    '<td class="num">' + fmt(f.words) + '</td><td class="num">' + fmt(f.code) + '</td>' +
    '<td class="num">' + fmt(f.formula) + '</td></tr>'
  ).join('') : '<tr><td colspan="7" class="empty">没有匹配的页面</td></tr>';
  hint.textContent = '共 ' + list.length + ' 篇';
}

document.querySelectorAll('th[data-key]').forEach(th => {
  th.addEventListener('click', () => {
    const key = th.dataset.key;
    sortAsc = (sortKey === key) ? !sortAsc : false;
    sortKey = key;
    render();
  });
});
q.addEventListener('input', render);
render();
</script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log('已生成 ' + OUT + '（' + Math.round(html.length / 1024) + ' KB）');
console.log('页面 ' + totals.files + ' 个，总字数 ' + totals.total);
