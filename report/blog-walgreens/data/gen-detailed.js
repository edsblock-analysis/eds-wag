/* Generate detailed standalone HTML reports (report hub + per-block + per-template
   + full consolidated report) and link them together. Reuses the same evidence data
   as the dashboard so all numbers stay consistent. */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const REP = path.join(OUT, 'reports');
fs.mkdirSync(REP, { recursive: true });

const S = JSON.parse(fs.readFileSync(path.join(__dirname, 'summary.json'), 'utf8'));
const { catalog } = require('./block-catalog.js');
const UT = JSON.parse(fs.readFileSync(path.join(__dirname, 'url-templates.json'), 'utf8'));
const BEH = JSON.parse(fs.readFileSync(path.join(__dirname, 'observed-behaviors.json'), 'utf8'));
const PAGES = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf8'));
const pageByUrl = Object.fromEntries(PAGES.map(p => [p.url, p]));

const tplLabel = {
  'article': 'Article', 'category-hub': 'Category Hub', 'category-listing': 'Category Listing (Community)',
  'video-episode': 'Video / Podcast Episode', 'video-transcript': 'Video Transcript',
  'home-landing': 'Home / Landing', 'buying-guide-article': 'Buying Guide',
};
const tplDesc = {
  'article': 'Standard editorial article: breadcrumb, title + date/read-time, rich-text body, "Explore more" related cards. Includes video-articles (YouTube/Scene7 lead media + optional Featured products + Transcript) and recipe articles (Jump to section).',
  'category-hub': 'Rich category landing: featured hero card container, "The latest" carousel, promo blocks, paginated article grid, watch-videos gallery, and "Explore more" subcategory tiles with live counts.',
  'category-listing': 'Community-stories landing: section hero, series list / series teasers, curated cards.',
  'video-episode': 'Series episode page: Scene7 or Spotify player, "More episodes" carousel with S:E badges, "Read transcript" link.',
  'video-transcript': 'Plain transcript page paired 1:1 with a video/podcast episode.',
  'home-landing': 'Homepage (and its content-hub mirror): hero carousel, trending, featured teaser, editor\'s pick, explore tiles.',
  'buying-guide-article': 'Buying-guide / OTC-selection article built on the blank template; article body + related cards.',
};

// map behavior key(s) to a block id (for embedding observed evidence in block pages)
const behaviorForBlock = {
  header: ['header-navigation'], search: ['search'], footer: ['footer'],
  'hero-carousel': ['hero-carousel'], card: [], 'card-container-hero': [],
  'slick-carousel': ['category-hub'], paginate: ['category-hub'], 'jump-to-section': ['jump-to-section'],
  'video-embed': ['video-article-youtube'], 'watch-videos': ['video-episode-theater'],
  'episode-container': ['video-episode-theater'], 'scroll-to-top': ['scroll-to-top'],
  'article-body': ['article'], 'video-transcript': ['video-transcript'],
};

// --- which raw components map to each catalog block, so we can list example URLs ---
const blockRawKeys = {
  header: ['cmp-header'], search: ['cmp-search'], footer: ['cmp-footer'],
  'hero-carousel': ['cmp-hero-carousel'], 'trending-articles': ['cmp-trending-articles'],
  'editors-pick': ['cmp-editors-pick', 'cmp-teaser', 'cmp-teaser-card'], card: ['cmp-card'],
  'card-container-hero': ['cmp-card-container-hero'], 'slick-carousel': ['cmp-slick-carousel'],
  paginate: ['cmp-paginate'], 'promo-blocks': ['cmp-promo-blocks'], explore: ['cmp-explore'],
  'explore-more': ['cmp-explore-more'], breadcrumb: ['cmp-breadcrumb'],
  'article-body': [], 'jump-to-section': ['cmp-jump-to-section'],
  'video-embed': ['cmp-embed', 'cmp-youtube', 'cmp-spotify'], 'watch-videos': ['cmp-watch-videos'],
  'episode-container': ['cmp-episode-container'], 'series-list': ['cmp-series-list', 'cmp-series-teaser'],
  'section-hero': ['cmp-hero'], 'scroll-to-top': ['cmp-scroll-to-top-button'],
  'background-container': ['cmp-background-container'], 'social-media': ['cmp-social-media'],
};
function customKeyForBlock(id) {
  return ({ 'watch-videos': 'watch-videos', 'jump-to-section': 'jump-to-section' })[id];
}
function exampleUrlsForBlock(b) {
  const keys = blockRawKeys[b.id] || [];
  const ck = customKeyForBlock(b.id);
  const hits = PAGES.filter(p => {
    if (keys.some(k => p.blocks && p.blocks[k])) return true;
    if (ck && p.custom && p.custom[ck]) return true;
    if (b.id === 'article-body') return ['article', 'buying-guide-article', 'video-transcript'].includes((UT.find(u => u.url === p.url) || {}).template);
    if (b.id === 'video-transcript') return (UT.find(u => u.url === p.url) || {}).template === 'video-transcript';
    return false;
  }).map(p => p.url);
  return hits;
}

// ---------- shared HTML shell ----------
const esc = s => (s == null ? '' : String(s)).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const CSS = `
:root{--bg:#f4f7fb;--panel:#ffffff;--panel2:#eef3f9;--line:#d9e1ec;--txt:#1a2432;--mut:#5c6b80;--brand:#1560bd;--accent:#1560bd;--hi:#c0392b;--me:#9a6a00;--lo:#1e8f5b}
*{box-sizing:border-box}body{margin:0;font:14px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--txt)}
a{color:var(--accent)}
header.top{padding:20px 28px;background:linear-gradient(90deg,#0b3d91,#1560bd 55%,#2f80ed);color:#fff}
header.top h1{margin:0;font-size:19px}header.top p{margin:6px 0 0;opacity:.9;font-size:13px}
.crumbs{padding:12px 28px;background:var(--panel);border-bottom:1px solid var(--line);font-size:13px}
.crumbs a{text-decoration:none}.crumbs span{color:var(--mut)}
main{padding:24px 28px;max-width:1080px;margin:0 auto}
h2{font-size:16px;margin:26px 0 10px;border-left:3px solid var(--brand);padding-left:10px}
h3{font-size:14px;margin:18px 0 6px}
table{width:100%;border-collapse:collapse;font-size:13px;margin:8px 0}
th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--mut);font-weight:600}
tr:hover td{background:var(--panel2)}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px;margin:12px 0}
.pill{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600}
.High{background:rgba(255,107,107,.16);color:var(--hi)}.Medium{background:rgba(255,203,94,.16);color:var(--me)}.Low{background:rgba(90,209,155,.16);color:var(--lo)}
.tag{font-family:ui-monospace,Menlo,monospace;font-size:11px;background:var(--panel2);padding:1px 6px;border-radius:4px;color:var(--accent)}
.muted{color:var(--mut)}
ul.f{margin:6px 0 12px;padding-left:18px}ul.f li{margin:4px 0}
.varbox{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:8px 0}
.grid{display:grid;gap:12px}.g4{grid-template-columns:repeat(4,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:repeat(2,1fr)}
@media(max-width:760px){.g4,.g3,.g2{grid-template-columns:1fr 1fr}}
.stat{text-align:center;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px}
.stat .n{font-size:26px;font-weight:700}.stat .l{color:var(--mut);font-size:12px;margin-top:3px}
.chk{list-style:none;padding-left:0}.chk li{margin:6px 0;padding-left:26px;position:relative}
.chk li:before{content:"☐";position:absolute;left:0;color:var(--accent)}
.urllist{max-height:420px;overflow:auto;border:1px solid var(--line);border-radius:8px}
.urllist a{display:block;padding:6px 12px;border-bottom:1px solid var(--line);text-decoration:none;font-size:12px;color:var(--accent)}
.urllist a:hover{background:var(--panel2)}
.backlink{display:inline-block;margin:0 0 6px;font-size:13px;text-decoration:none}
.nav-blocks{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
.nav-blocks a{font-size:12px;text-decoration:none;background:var(--panel2);border:1px solid var(--line);padding:4px 9px;border-radius:16px;color:var(--txt)}
.nav-blocks a:hover{border-color:var(--accent)}
footer{padding:18px 28px;color:var(--mut);font-size:12px;border-top:1px solid var(--line);margin-top:30px}
`;
function shell(title, crumbs, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>${CSS}</style></head><body>
<header class="top"><h1>${esc(title)}</h1><p>blog.walgreens.com → Edge Delivery Services · evidence-based analysis · 2026-09-05</p></header>
<div class="crumbs">${crumbs}</div>
<main>${body}</main>
<footer>Generated from live-crawl evidence (all ${S.totalUrls} URLs) + Playwright-verified behavior. See <a href="../dashboard.html">dashboard</a> · <a href="index.html">report hub</a>.</footer>
</body></html>`;
}

const tplCounts = Object.entries(S.templateCounts).sort((a, b) => b[1] - a[1]);
const totals = {
  urls: S.totalUrls, templates: tplCounts.length, blocks: catalog.length,
  variations: catalog.reduce((n, b) => n + b.variations.length, 0),
  high: catalog.filter(b => b.complexity === 'High').length,
  medium: catalog.filter(b => b.complexity === 'Medium').length,
  low: catalog.filter(b => b.complexity === 'Low').length,
};

// ---------------- per-block detailed pages ----------------
catalog.forEach(b => {
  const ex = exampleUrlsForBlock(b);
  const exShown = ex.slice(0, 40);
  const behKeys = (behaviorForBlock[b.id] || []).filter(k => BEH.behaviors[k]);
  const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> <a href="blocks.html">Blocks</a> <span>›</span> ${esc(b.name)}`;
  let body = `<a class="backlink" href="blocks.html">← All blocks</a>
  <div class="card"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
    <div><h2 style="border:none;margin:0;padding:0">${esc(b.name)}</h2><div class="muted" style="margin-top:4px">EDS block: <span class="tag">${esc(b.edsBlock)}</span></div></div>
    <div style="text-align:right"><span class="pill ${b.complexity}">${b.complexity} complexity</span><div class="muted" style="margin-top:6px">${b.pages} pages · ${b.variations.length} variation(s)</div></div>
  </div><p class="muted" style="margin-bottom:0">${esc(b.complexityReason)}</p></div>

  <h2>Templates using this block</h2>
  <div class="nav-blocks">${b.templates.map(t => t === 'all' ? '<span class="tag">all templates (global)</span>' : `<a href="template-${t}.html">${esc(tplLabel[t] || t)}</a>`).join('')}</div>

  <h2>Variations (${b.variations.length})</h2>
  ${b.variations.map(v => `<div class="varbox"><b>${esc(v.name)}</b> — ${esc(v.desc)} <span class="muted">(${v.pages} pages)</span></div>`).join('')}

  <h2>Functional requirements</h2><ul class="f">${b.functional.map(f => `<li>${esc(f)}</li>`).join('')}</ul>

  <h2>Acceptance criteria</h2><ul class="chk">${b.acceptance.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
  `;
  if (behKeys.length) {
    body += `<h2>Observed behavior (Playwright-verified)</h2>`;
    behKeys.forEach(k => {
      const bh = BEH.behaviors[k];
      body += `<div class="card"><div class="muted" style="margin-bottom:6px">key: <span class="tag">${esc(k)}</span></div><p style="margin:0 0 8px">${esc(bh.observed)}</p><div class="nav-blocks">${(bh.states || []).map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></div>`;
    });
  }
  if (b.integrations && b.integrations.length) {
    body += `<h2>Third-party integrations</h2><div class="nav-blocks">${b.integrations.map(i => `<span class="tag">${esc(i)}</span>`).join('')}</div>`;
  }
  body += `<h2>Example source pages (${ex.length})</h2>`;
  if (ex.length) {
    body += `<div class="muted" style="font-size:12px;margin-bottom:6px">${ex.length > 40 ? 'Showing first 40 of ' + ex.length + '.' : 'All occurrences.'}</div><div class="urllist">${exShown.map(u => `<a href="${esc(u)}" target="_blank">${esc(u.replace('https://blog.walgreens.com', ''))}</a>`).join('')}</div>`;
  } else {
    body += `<p class="muted">Global block — present on all pages / derived from page structure.</p>`;
  }
  fs.writeFileSync(path.join(REP, `block-${b.id}.html`), shell(`Block · ${b.name}`, crumbs, body));
});

// ---------------- blocks index ----------------
{
  const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> Blocks`;
  let body = `<a class="backlink" href="index.html">← Report hub</a><h2>${catalog.length} blocks · ${totals.variations} variations</h2>
  <div class="muted" style="margin-bottom:10px">Click a block for its full spec (variations, functional requirements, acceptance criteria, observed behavior, example URLs).</div>
  <table><thead><tr><th>Block</th><th>EDS name</th><th>Complexity</th><th>Pages</th><th>Variations</th></tr></thead><tbody>`;
  catalog.forEach(b => {
    body += `<tr><td><a href="block-${b.id}.html">${esc(b.name)}</a></td><td><span class="tag">${esc(b.edsBlock)}</span></td><td><span class="pill ${b.complexity}">${b.complexity}</span></td><td>${b.pages}</td><td class="muted">${b.variations.map(v => esc(v.name)).join(', ')}</td></tr>`;
  });
  body += `</tbody></table>`;
  fs.writeFileSync(path.join(REP, 'blocks.html'), shell('Blocks & Variations', crumbs, body));
}

// ---------------- per-template detailed pages ----------------
tplCounts.forEach(([t, c]) => {
  const urls = UT.filter(u => u.template === t).map(u => u.url);
  const blocks = catalog.filter(b => b.templates.includes(t) || b.templates.includes('all'));
  const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> <a href="templates.html">Templates</a> <span>›</span> ${esc(tplLabel[t] || t)}`;
  let body = `<a class="backlink" href="templates.html">← All templates</a>
  <div class="card"><h2 style="border:none;margin:0 0 6px;padding:0">${esc(tplLabel[t] || t)} <span class="tag">${esc(t)}</span></h2>
  <div class="muted">${esc(tplDesc[t] || '')}</div>
  <div class="grid g4" style="margin-top:14px"><div class="stat"><div class="n">${c}</div><div class="l">pages</div></div><div class="stat"><div class="n">${blocks.length}</div><div class="l">blocks</div></div><div class="stat"><div class="n">${blocks.filter(b=>b.complexity==='High').length}</div><div class="l">high-complexity</div></div><div class="stat"><div class="n">${urls.filter(u=>(pageByUrl[u]||{}).lang && (pageByUrl[u]||{}).lang.startsWith('es')).length}</div><div class="l">Spanish variants</div></div></div></div>

  <h2>Blocks used on this template</h2>
  <table><thead><tr><th>Block</th><th>Variations</th><th>Complexity</th><th>Scope</th></tr></thead><tbody>
  ${blocks.map(b => `<tr><td><a href="block-${b.id}.html">${esc(b.name)}</a></td><td class="muted">${b.variations.map(v => esc(v.name)).join(', ')}</td><td><span class="pill ${b.complexity}">${b.complexity}</span></td><td class="muted">${b.templates.includes('all') ? 'Global' : 'Template-specific'}</td></tr>`).join('')}
  </tbody></table>

  <h2>All pages using this template (${urls.length})</h2>
  <div class="urllist">${urls.map(u => `<a href="${esc(u)}" target="_blank">${esc(u.replace('https://blog.walgreens.com', ''))}</a>`).join('')}</div>`;
  fs.writeFileSync(path.join(REP, `template-${t}.html`), shell(`Template · ${tplLabel[t] || t}`, crumbs, body));
});

// ---------------- templates index ----------------
{
  const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> Templates`;
  let body = `<a class="backlink" href="index.html">← Report hub</a><h2>${tplCounts.length} templates · ${S.totalUrls} pages</h2>
  <table><thead><tr><th>#</th><th>Template</th><th>Pages</th><th>Description</th></tr></thead><tbody>`;
  tplCounts.forEach(([t, c], i) => {
    body += `<tr><td>${i + 1}</td><td><a href="template-${t}.html">${esc(tplLabel[t] || t)}</a><br><span class="tag">${esc(t)}</span></td><td><b>${c}</b></td><td class="muted">${esc(tplDesc[t] || '')}</td></tr>`;
  });
  body += `</tbody></table>`;
  fs.writeFileSync(path.join(REP, 'templates.html'), shell('Templates', crumbs, body));
}

// ---------------- integrations page ----------------
{
  const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> Integrations`;
  const rows = [
    ['Adobe Launch / DTM', 'Tag management & analytics', S.integrationPageCounts['Adobe Launch/DTM (Analytics tag mgmt)'] || 0, 'All templates (global)'],
    ['Adobe Client Data Layer', 'Analytics data layer', S.integrationPageCounts['Adobe Client Data Layer'] || 0, 'All templates (global)'],
    ['Adobe Helix RUM', 'Real User Monitoring', S.integrationPageCounts['Adobe Helix RUM'] || 0, 'All templates (global)'],
    ['Adobe Scene7 / Dynamic Media', 'Video hosting + VideoViewer', S.integrationPageCounts['Scene7 / Dynamic Media (video)'] || 0, 'Video embed / Watch Videos / Episodes'],
    ['OneTrust', 'Cookie consent', S.integrationPageCounts['OneTrust (cookie consent)'] || 0, 'All templates (global)'],
    ['YouTube', 'In-article video', S.integrationPageCounts['YouTube embed'] || 0, 'Video-article, Category hub'],
    ['Spotify', 'Podcast episodes', S.integrationPageCounts['Spotify embed'] || 0, 'Video/podcast episode'],
    ['walgreens.com', 'Featured products PDP links + store', 5, 'Video-article, Footer'],
    ['Social (Pinterest/FB/X/IG)', 'Footer profile links', S.blockPageCounts['cmp-social-media'] || 0, 'Footer'],
    ['AEM search servlet', 'Predictive search JSON (rebuild on EDS index)', S.blockPageCounts['cmp-search'] || 0, 'Search (all pages)'],
  ];
  let body = `<a class="backlink" href="index.html">← Report hub</a><h2>Third-party integrations</h2>
  <table><thead><tr><th>Integration</th><th>Purpose</th><th>Pages</th><th>Used by</th></tr></thead><tbody>
  ${rows.map(r => `<tr><td><b>${esc(r[0])}</b></td><td class="muted">${esc(r[1])}</td><td>${r[2]}</td><td class="muted">${esc(r[3])}</td></tr>`).join('')}
  </tbody></table>
  <div class="card muted"><b>Migration note:</b> Analytics (Launch/Client Data Layer), consent (OneTrust) and search are global AEM services. In EDS, RUM is native; Launch/OneTrust re-added via site scripts; predictive search rebuilt against an EDS index (query-index.json). Scene7/YouTube/Spotify handled by a single <span class="tag">embed</span> block with provider variations.</div>`;
  fs.writeFileSync(path.join(REP, 'integrations.html'), shell('Third-Party Integrations', crumbs, body));
}

// ---------------- observed behaviors page ----------------
{
  const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> Observed Behaviors`;
  let body = `<a class="backlink" href="index.html">← Report hub</a><h2>Observed interactive behaviors (Playwright-verified)</h2>
  <div class="muted" style="margin-bottom:10px">Captured by live interaction on representative pages of every template & interactive block.</div>`;
  Object.entries(BEH.behaviors).forEach(([k, v]) => {
    body += `<div class="card"><h3 style="margin-top:0">${esc(k)}</h3><p style="margin:0 0 8px">${esc(v.observed)}</p><div class="nav-blocks">${(v.states || []).map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></div>`;
  });
  fs.writeFileSync(path.join(REP, 'behaviors.html'), shell('Observed Behaviors', crumbs, body));
}

// ---------------- full consolidated report (render REPORT.md → HTML) ----------------
{
  const md = fs.readFileSync(path.join(OUT, 'REPORT.md'), 'utf8');
  const htmlBody = mdToHtml(md);
  const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> Full Report`;
  fs.writeFileSync(path.join(REP, 'full-report.html'), shell('Full Consolidated Report', crumbs, `<a class="backlink" href="index.html">← Report hub</a>` + htmlBody));
}

// ---------------- report hub (index) ----------------
{
  let body = `<div class="grid g4">
    <div class="stat"><div class="n">${totals.urls}</div><div class="l">URLs analyzed</div></div>
    <div class="stat"><div class="n">${totals.templates}</div><div class="l">Templates</div></div>
    <div class="stat"><div class="n">${totals.blocks}</div><div class="l">Blocks</div></div>
    <div class="stat"><div class="n">${totals.variations}</div><div class="l">Variations</div></div>
  </div>
  <h2>Reports</h2>
  <div class="grid g3">
    <a class="card" style="text-decoration:none;color:inherit" href="../dashboard.html"><b>📊 Interactive Dashboard</b><div class="muted" style="margin-top:6px">Tabbed overview with charts, searchable URL list & expandable blocks.</div></a>
    <a class="card" style="text-decoration:none;color:inherit" href="full-report.html"><b>📄 Full Consolidated Report</b><div class="muted" style="margin-top:6px">The complete written analysis (all sections) as one page.</div></a>
    <a class="card" style="text-decoration:none;color:inherit" href="blocks.html"><b>🧩 Blocks & Variations</b><div class="muted" style="margin-top:6px">${totals.blocks} blocks — each with a detailed spec page.</div></a>
    <a class="card" style="text-decoration:none;color:inherit" href="templates.html"><b>🗂️ Templates</b><div class="muted" style="margin-top:6px">${totals.templates} templates — blocks used + page lists.</div></a>
    <a class="card" style="text-decoration:none;color:inherit" href="behaviors.html"><b>🎬 Observed Behaviors</b><div class="muted" style="margin-top:6px">Playwright-verified interactive behavior per block.</div></a>
    <a class="card" style="text-decoration:none;color:inherit" href="integrations.html"><b>🔌 Integrations</b><div class="muted" style="margin-top:6px">Third-party services & migration notes.</div></a>
  </div>
  <h2>All block spec pages</h2>
  <div class="nav-blocks">${catalog.map(b => `<a href="block-${b.id}.html">${esc(b.name)} <span class="pill ${b.complexity}" style="margin-left:4px">${b.complexity[0]}</span></a>`).join('')}</div>
  <h2>All template pages</h2>
  <div class="nav-blocks">${tplCounts.map(([t, c]) => `<a href="template-${t}.html">${esc(tplLabel[t] || t)} (${c})</a>`).join('')}</div>`;
  const crumbs = `Report Hub`;
  fs.writeFileSync(path.join(REP, 'index.html'), shell('EDS Migration — Report Hub', crumbs, body));
}

// ---------- tiny markdown → HTML (tables, headings, lists, inline) ----------
function mdInline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<span class="tag">$1</span>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}
function mdToHtml(md) {
  const lines = md.split('\n');
  let html = '', i = 0, inList = false, inTable = false;
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };
  const closeTable = () => { if (inTable) { html += '</tbody></table>'; inTable = false; } };
  while (i < lines.length) {
    const line = lines[i];
    if (/^\|(.+)\|\s*$/.test(line) && /^\|[\s:-]+\|\s*$/.test(lines[i + 1] || '')) {
      closeList();
      const headers = line.split('|').slice(1, -1).map(c => c.trim());
      html += '<table><thead><tr>' + headers.map(h => `<th>${mdInline(h)}</th>`).join('') + '</tr></thead><tbody>';
      inTable = true; i += 2;
      while (i < lines.length && /^\|(.+)\|\s*$/.test(lines[i])) {
        const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
        html += '<tr>' + cells.map(c => `<td>${mdInline(c)}</td>`).join('') + '</tr>'; i++;
      }
      closeTable(); continue;
    }
    if (/^#{1,4}\s/.test(line)) { closeList(); closeTable(); const lvl = line.match(/^#+/)[0].length; const txt = line.replace(/^#+\s/, ''); html += `<h${Math.min(lvl,3)}>${mdInline(txt)}</h${Math.min(lvl,3)}>`; i++; continue; }
    if (/^\s*[-*]\s+/.test(line)) { if (!inList) { html += '<ul class="f">'; inList = true; } html += `<li>${mdInline(line.replace(/^\s*[-*]\s+/, ''))}</li>`; i++; continue; }
    if (/^>\s?/.test(line)) { closeList(); html += `<div class="card muted">${mdInline(line.replace(/^>\s?/, ''))}</div>`; i++; continue; }
    if (/^---\s*$/.test(line)) { closeList(); closeTable(); html += '<hr style="border:none;border-top:1px solid var(--line);margin:22px 0">'; i++; continue; }
    if (/^\s*$/.test(line)) { closeList(); i++; continue; }
    closeList(); html += `<p>${mdInline(line)}</p>`; i++;
  }
  closeList(); closeTable();
  return html;
}

const nBlockPages = catalog.length, nTplPages = tplCounts.length;
console.log(`Wrote reports/ : index.html, blocks.html, templates.html, behaviors.html, integrations.html, full-report.html, ${nBlockPages} block-*.html, ${nTplPages} template-*.html`);
console.log('Total files:', 6 + nBlockPages + nTplPages);
