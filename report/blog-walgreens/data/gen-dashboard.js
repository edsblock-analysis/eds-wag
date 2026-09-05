/* Build a self-contained interactive HTML dashboard from the analysis data. */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const S = JSON.parse(fs.readFileSync(path.join(__dirname, 'summary.json'), 'utf8'));
const { catalog } = require('./block-catalog.js');
const UT = JSON.parse(fs.readFileSync(path.join(__dirname, 'url-templates.json'), 'utf8'));
const BEH = JSON.parse(fs.readFileSync(path.join(__dirname, 'observed-behaviors.json'), 'utf8'));

const templateMeta = {
  'article': 'Standard editorial article (breadcrumb, title/meta, rich body, related cards). Includes video-articles & recipes.',
  'category-hub': 'Rich category landing: hero cluster, "latest" carousel, promo blocks, paginated grid, watch-videos, explore tiles.',
  'category-listing': 'Community-stories landing: section hero, series list/teasers, curated cards.',
  'video-episode': 'Series episode page: Scene7/Spotify player, "More episodes" carousel, transcript link.',
  'video-transcript': 'Plain transcript paired 1:1 with an episode.',
  'home-landing': 'Homepage (+ mirror): hero carousel, trending, featured teaser, editor\'s pick, explore.',
  'buying-guide-article': 'Buying-guide/OTC-selection article on the blank template.',
};
const tplLabel = {
  'article': 'Article', 'category-hub': 'Category Hub', 'category-listing': 'Category Listing (Community)',
  'video-episode': 'Video / Podcast Episode', 'video-transcript': 'Video Transcript',
  'home-landing': 'Home / Landing', 'buying-guide-article': 'Buying Guide',
};

const tplCounts = Object.entries(S.templateCounts).sort((a, b) => b[1] - a[1]);
const mirror = UT.filter(u => u.mirror).length;
const spanish = UT.filter(u => u.lang && u.lang.startsWith('es')).length;

const data = {
  totals: {
    urls: S.totalUrls, ok: S.ok, templates: tplCounts.length, blocks: catalog.length,
    variations: catalog.reduce((n, b) => n + b.variations.length, 0), mirror, spanish,
    high: catalog.filter(b => b.complexity === 'High').length,
    medium: catalog.filter(b => b.complexity === 'Medium').length,
    low: catalog.filter(b => b.complexity === 'Low').length,
  },
  templates: tplCounts.map(([t, c]) => ({ id: t, label: tplLabel[t] || t, count: c, desc: templateMeta[t] || '' })),
  catalog,
  integrations: [
    ['Adobe Launch / DTM', 'Tag mgmt & analytics', S.integrationPageCounts['Adobe Launch/DTM (Analytics tag mgmt)'] || 0, 'Global'],
    ['Adobe Client Data Layer', 'Analytics data layer', S.integrationPageCounts['Adobe Client Data Layer'] || 0, 'Global'],
    ['Adobe Helix RUM', 'Real User Monitoring', S.integrationPageCounts['Adobe Helix RUM'] || 0, 'Global'],
    ['Adobe Scene7 / Dynamic Media', 'Video hosting + VideoViewer', S.integrationPageCounts['Scene7 / Dynamic Media (video)'] || 0, 'Video embed / Watch Videos / Episodes'],
    ['OneTrust', 'Cookie consent', S.integrationPageCounts['OneTrust (cookie consent)'] || 0, 'Global'],
    ['YouTube', 'In-article video', S.integrationPageCounts['YouTube embed'] || 0, 'Video-article, Category hub'],
    ['Spotify', 'Podcast episodes', S.integrationPageCounts['Spotify embed'] || 0, 'Video/podcast episode'],
    ['walgreens.com', 'Featured products PDP links + store', 5, 'Video-article, Footer'],
    ['Social (Pinterest/FB/X/IG)', 'Footer profile links', S.blockPageCounts['cmp-social-media'] || 0, 'Footer'],
    ['AEM search servlet', 'Predictive search JSON (rebuild on EDS index)', S.blockPageCounts['cmp-search'] || 0, 'Search (all pages)'],
  ],
  behaviors: BEH.behaviors,
  urlList: UT.map(u => ({ url: u.url, t: u.template, m: u.mirror ? 1 : 0, lang: u.lang || 'en' })),
};

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>blog.walgreens.com — EDS Migration Analysis Dashboard</title>
<style>
:root{--bg:#f4f7fb;--panel:#ffffff;--panel2:#eef3f9;--line:#d9e1ec;--txt:#1a2432;--mut:#5c6b80;--brand:#1560bd;--accent:#1560bd;--hi:#c0392b;--me:#9a6a00;--lo:#1e8f5b}
*{box-sizing:border-box}body{margin:0;font:14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--txt)}
header{padding:22px 28px;background:linear-gradient(90deg,#0b3d91,#1560bd 55%,#2f80ed);color:#fff}
header h1{margin:0;font-size:20px;letter-spacing:.2px}
header p{margin:6px 0 0;opacity:.9;font-size:13px}
nav{display:flex;gap:2px;background:var(--panel);border-bottom:1px solid var(--line);padding:0 12px;position:sticky;top:0;z-index:10;flex-wrap:wrap}
nav button{background:none;border:none;color:var(--mut);padding:12px 16px;cursor:pointer;font-size:13px;border-bottom:2px solid transparent}
nav button:hover{color:var(--txt)}nav button.active{color:var(--txt);border-bottom-color:var(--brand)}
main{padding:22px 28px;max-width:1200px;margin:0 auto}
.view{display:none}.view.active{display:block}
.grid{display:grid;gap:14px}.g4{grid-template-columns:repeat(4,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:repeat(2,1fr)}
@media(max-width:800px){.g4,.g3,.g2{grid-template-columns:1fr 1fr}}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px}
.stat{text-align:center}.stat .n{font-size:30px;font-weight:700}.stat .l{color:var(--mut);font-size:12px;margin-top:4px}
h2{font-size:16px;margin:26px 0 12px;border-left:3px solid var(--brand);padding-left:10px}
h3{font-size:14px;margin:0 0 6px}
table{width:100%;border-collapse:collapse;font-size:13px}
th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--mut);font-weight:600;position:sticky;top:44px;background:var(--panel)}
tr:hover td{background:var(--panel2)}
.pill{display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600}
.High{background:rgba(255,107,107,.16);color:var(--hi)}.Medium{background:rgba(255,203,94,.16);color:var(--me)}.Low{background:rgba(90,209,155,.16);color:var(--lo)}
.bar{height:12px;border-radius:6px;background:var(--accent);min-width:2px}
.barrow{display:flex;align-items:center;gap:10px;margin:6px 0}
.barrow .lab{width:230px;font-size:12px;color:var(--mut);flex:none}
.barrow .val{font-size:12px;color:var(--txt);width:60px;text-align:right}
.muted{color:var(--mut)}
.tag{font-family:ui-monospace,Menlo,monospace;font-size:11px;background:var(--panel2);padding:1px 6px;border-radius:4px;color:var(--accent)}
details{background:var(--panel);border:1px solid var(--line);border-radius:10px;margin:10px 0;padding:4px 14px}
details summary{cursor:pointer;padding:10px 0;font-weight:600;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:10px}
details summary::-webkit-details-marker{display:none}
details[open] summary{border-bottom:1px solid var(--line)}
.varbox{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin:8px 0}
ul.f{margin:6px 0 12px;padding-left:18px}ul.f li{margin:3px 0}
.ac li{margin:4px 0}
input#urlsearch{width:100%;padding:9px 12px;border-radius:8px;border:1px solid var(--line);background:var(--panel2);color:var(--txt);margin-bottom:10px}
select{padding:8px;border-radius:8px;border:1px solid var(--line);background:var(--panel2);color:var(--txt)}
.legend{font-size:12px;color:var(--mut);margin:4px 0 14px}
.kv{display:flex;gap:8px;flex-wrap:wrap}.kv .tag{margin:2px}
footer{padding:18px 28px;color:var(--mut);font-size:12px;border-top:1px solid var(--line)}
</style></head><body>
<header>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap">
    <div>
      <h1>blog.walgreens.com — EDS Migration Functional Analysis</h1>
      <p>"The Thread" by Walgreens · Adobe AEM (WCM Core Components) → Edge Delivery Services · ${data.totals.urls} URLs analyzed individually · verified with live Playwright interaction · 2026-09-05</p>
    </div>
    <a href="reports/index.html" style="flex:none;background:#fff;color:#0b3d91;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:8px;white-space:nowrap">📑 Detailed Reports →</a>
  </div>
</header>
<nav id="nav"></nav>
<main>
  <section class="view active" id="v-overview"></section>
  <section class="view" id="v-templates"></section>
  <section class="view" id="v-blocks"></section>
  <section class="view" id="v-mapping"></section>
  <section class="view" id="v-behaviors"></section>
  <section class="view" id="v-integrations"></section>
  <section class="view" id="v-urls"></section>
</main>
<footer>Evidence-based analysis. All ${data.totals.urls} URLs fetched (HTTP 200) & parsed individually; interactive behavior verified with Playwright. Detailed HTML reports: <a href="reports/index.html">report hub</a> · <a href="reports/full-report.html">full report</a>. Data files under <span class="tag">report/blog-walgreens/data/</span>.</footer>
<script>
const D=${JSON.stringify(data)};
const TABS=[['overview','Overview'],['templates','Templates'],['blocks','Blocks & Variations'],['mapping','Template → Block Map'],['behaviors','Observed Behaviors'],['integrations','Integrations'],['urls','All URLs ('+D.totals.urls+')']];
const nav=document.getElementById('nav');
TABS.forEach(([id,lab],i)=>{const b=document.createElement('button');b.textContent=lab;b.className=i===0?'active':'';b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.getElementById('v-'+id).classList.add('active');window.scrollTo(0,0);};nav.appendChild(b);});
const esc=s=>(s==null?'':String(s)).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const maxTpl=Math.max(...D.templates.map(t=>t.count));

// OVERVIEW
document.getElementById('v-overview').innerHTML=\`
<div class="grid g4">
  <div class="card stat"><div class="n">\${D.totals.urls}</div><div class="l">URLs analyzed (all 200)</div></div>
  <div class="card stat"><div class="n">\${D.totals.templates}</div><div class="l">Page templates</div></div>
  <div class="card stat"><div class="n">\${D.totals.blocks}</div><div class="l">EDS blocks to build</div></div>
  <div class="card stat"><div class="n">\${D.totals.variations}</div><div class="l">Block variations</div></div>
</div>
<div class="grid g4" style="margin-top:14px">
  <div class="card stat"><div class="n" style="color:var(--hi)">\${D.totals.high}</div><div class="l">High complexity</div></div>
  <div class="card stat"><div class="n" style="color:var(--me)">\${D.totals.medium}</div><div class="l">Medium complexity</div></div>
  <div class="card stat"><div class="n" style="color:var(--lo)">\${D.totals.low}</div><div class="l">Low complexity</div></div>
  <div class="card stat"><div class="n">\${D.totals.mirror}+\${D.totals.spanish}</div><div class="l">Mirror + Spanish (dup content)</div></div>
</div>
<h2>Pages per template</h2>
<div class="card">\${D.templates.map(t=>\`<div class="barrow"><div class="lab">\${esc(t.label)}</div><div class="bar" style="width:\${Math.max(2,t.count/maxTpl*640)}px"></div><div class="val">\${t.count}</div></div>\`).join('')}</div>
<h2>Platform</h2>
<div class="card muted">Source is <b>Adobe Experience Manager (AEM) Sites</b> using WCM Core Components (<span class="tag">cmp-*</span>), Experience Fragments for header/footer, Scene7/Dynamic Media for video, Adobe Client Data Layer + Adobe Launch for analytics, and OneTrust for consent. The overwhelming majority of pages (\${D.templates[0].count}) are simple content-driven <b>Article</b> pages — migration effort is dominated by content volume, while interactive complexity is concentrated in a handful of hub/home/video pages.</div>\`;

// TEMPLATES
document.getElementById('v-templates').innerHTML='<h2>'+D.totals.templates+' unique templates ('+D.totals.urls+' pages)</h2><div class="legend">Primary signal: each page\\'s &lt;meta name="template"&gt;, refined by structural evidence. Click a template for its detailed report.</div><table><thead><tr><th>#</th><th>Template</th><th>Pages</th><th>Description</th><th></th></tr></thead><tbody>'+D.templates.map((t,i)=>'<tr><td>'+(i+1)+'</td><td><b><a href="reports/template-'+esc(t.id)+'.html">'+esc(t.label)+'</a></b><br><span class="tag">'+esc(t.id)+'</span></td><td><b>'+t.count+'</b></td><td class="muted">'+esc(t.desc)+'</td><td><a href="reports/template-'+esc(t.id)+'.html">detail →</a></td></tr>').join('')+'</tbody></table>';

// BLOCKS
document.getElementById('v-blocks').innerHTML='<h2>'+D.catalog.length+' blocks · '+D.totals.variations+' variations</h2><div class="legend">"Pages" = number of the '+D.totals.urls+' crawled pages the block appears on (DOM evidence). Expand a block for a summary, or open its detailed report page for example URLs & observed behavior.</div>'+D.catalog.map(b=>\`
<details><summary><span>\${esc(b.name)} <span class="tag">\${esc(b.edsBlock)}</span></span><span><span class="pill \${b.complexity}">\${b.complexity}</span> <span class="muted">\${b.pages} pages</span></span></summary>
<p style="margin:10px 0 4px"><a href="reports/block-\${esc(b.id)}.html">📄 Open detailed report for \${esc(b.name)} →</a></p>
<p class="muted" style="margin:6px 0 4px">\${esc(b.complexityReason)}</p>
<div class="kv" style="margin:8px 0"><b style="color:var(--mut)">Templates:</b> \${b.templates.map(t=>'<span class="tag">'+esc(t)+'</span>').join('')}</div>
<h3>Variations (\${b.variations.length})</h3>
\${b.variations.map(v=>'<div class="varbox"><b>'+esc(v.name)+'</b> — '+esc(v.desc)+' <span class="muted">('+v.pages+' pages)</span></div>').join('')}
<h3>Functionality</h3><ul class="f">\${b.functional.map(f=>'<li>'+esc(f)+'</li>').join('')}</ul>
<h3>Acceptance criteria</h3><ul class="f ac">\${b.acceptance.map(a=>'<li>☐ '+esc(a)+'</li>').join('')}</ul>
\${b.integrations&&b.integrations.length?'<div class="kv"><b style="color:var(--mut)">Integrations:</b> '+b.integrations.map(i=>'<span class="tag">'+esc(i)+'</span>').join('')+'</div>':''}
</details>\`).join('');

// MAPPING
document.getElementById('v-mapping').innerHTML='<h2>Template → Block → Variation</h2>'+D.templates.map(t=>{
 const blocks=D.catalog.filter(b=>b.templates.includes(t.id)||b.templates.includes('all'));
 return '<details open><summary><span><a href="reports/template-'+esc(t.id)+'.html">'+esc(t.label)+'</a> <span class="tag">'+esc(t.id)+'</span></span><span class="muted">'+t.count+' pages · '+blocks.length+' blocks</span></summary><table><thead><tr><th>Block</th><th>Variations</th><th>Complexity</th><th>Scope</th></tr></thead><tbody>'+blocks.map(b=>'<tr><td><a href="reports/block-'+esc(b.id)+'.html">'+esc(b.name)+'</a></td><td class="muted">'+b.variations.map(v=>esc(v.name)).join(', ')+'</td><td><span class="pill '+b.complexity+'">'+b.complexity+'</span></td><td class="muted">'+(b.templates.includes('all')?'Global':'Template-specific')+'</td></tr>').join('')+'</tbody></table></details>';
}).join('');

// BEHAVIORS
document.getElementById('v-behaviors').innerHTML='<h2>Observed interactive behaviors (Playwright-verified)</h2><div class="legend">'+esc(D.behaviors?'':'')+'Captured by live interaction on representative pages of every template & interactive block.</div>'+Object.entries(D.behaviors).map(([k,v])=>\`<details><summary><span>\${esc(k)}</span><span class="muted">\${(v.states||[]).length} states</span></summary><p style="margin:10px 0">\${esc(v.observed)}</p><div class="kv"><b style="color:var(--mut)">States:</b> \${(v.states||[]).map(s=>'<span class="tag">'+esc(s)+'</span>').join('')}</div></details>\`).join('');

// INTEGRATIONS
document.getElementById('v-integrations').innerHTML='<h2>Third-party integrations</h2><table><thead><tr><th>Integration</th><th>Purpose</th><th>Pages</th><th>Used by</th></tr></thead><tbody>'+D.integrations.map(r=>'<tr><td><b>'+esc(r[0])+'</b></td><td class="muted">'+esc(r[1])+'</td><td>'+r[2]+'</td><td class="muted">'+esc(r[3])+'</td></tr>').join('')+'</tbody></table><div class="card muted" style="margin-top:14px"><b>Migration note:</b> Analytics (Launch/Client Data Layer), consent (OneTrust) and search are global AEM services. In EDS, RUM is native; Launch/OneTrust re-added via site scripts; predictive search rebuilt against an EDS index (query-index.json). Scene7/YouTube/Spotify handled by a single <span class="tag">embed</span> block with provider variations.</div>';

// URLS
const v=document.getElementById('v-urls');
v.innerHTML='<h2>All '+D.totals.urls+' URLs (individually analyzed)</h2><input id="urlsearch" placeholder="Filter URLs…"> <select id="tplfilter"><option value="">All templates</option>'+D.templates.map(t=>'<option value="'+t.id+'">'+esc(t.label)+' ('+t.count+')</option>').join('')+'</select> <span class="muted" id="ucount"></span><div style="max-height:70vh;overflow:auto;margin-top:10px"><table><thead><tr><th>#</th><th>URL</th><th>Template</th><th>Lang</th><th>Dup</th></tr></thead><tbody id="urows"></tbody></table></div>';
function renderUrls(){const q=(document.getElementById('urlsearch').value||'').toLowerCase();const tf=document.getElementById('tplfilter').value;const rows=D.urlList.filter(u=>(!tf||u.t===tf)&&(!q||u.url.toLowerCase().includes(q)));document.getElementById('ucount').textContent=rows.length+' shown';document.getElementById('urows').innerHTML=rows.map((u,i)=>'<tr><td class="muted">'+(i+1)+'</td><td><a href="'+esc(u.url)+'" target="_blank" style="color:var(--accent);text-decoration:none">'+esc(u.url.replace('https://blog.walgreens.com',''))+'</a></td><td><span class="tag">'+esc(u.t)+'</span></td><td class="muted">'+esc(u.lang)+'</td><td>'+(u.m?'<span class="pill Medium">mirror</span>':'')+'</td></tr>').join('');}
document.getElementById('urlsearch').oninput=renderUrls;document.getElementById('tplfilter').onchange=renderUrls;renderUrls();
</script>
</body></html>`;

fs.writeFileSync(path.join(OUT, 'dashboard.html'), html);
console.log('Wrote dashboard.html (' + html.length + ' chars)');
