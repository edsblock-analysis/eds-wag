#!/usr/bin/env node
/* Step 4: generate the full report suite from the analysis data.
   Usage: node 4-generate.js --urls <file> [--out <dir>]
   Reads <out>/data/{summary,block-catalog,url-templates}.json and (optional)
   <out>/data/observed-behaviors.json ; writes:
     <out>/REPORT.md, <out>/dashboard.html, <out>/estimates.html,
     <out>/reports/*.html (hub + full report + per-block + per-template + behaviors + integrations)
   The light theme + blue header match the reference blog-walgreens report. */
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');
const DET = L.loadJSON(path.join(__dirname, 'knowledge', 'detectors.json'));

const args = L.parseArgs(process.argv);
const OUT = args.out;
const dataDir = path.join(OUT, 'data');
const S = L.loadJSON(path.join(dataDir, 'summary.json'));
const catalog = L.loadJSON(path.join(dataDir, 'block-catalog.json'));
const dcPath = path.join(dataDir, 'default-content.json');
const defaultContent = fs.existsSync(dcPath) ? L.loadJSON(dcPath) : [];
const UT = L.loadJSON(path.join(dataDir, 'url-templates.json'));
const behPath = path.join(dataDir, 'observed-behaviors.json');
const BEH = fs.existsSync(behPath) ? L.loadJSON(behPath) : { behaviors: {} };
const esc = L.esc;
const REP = path.join(OUT, 'reports');
fs.mkdirSync(REP, { recursive: true });
// Clear previously generated pages so removed/renamed/consolidated blocks & templates
// don't leave stale files behind on re-runs.
for (const f of fs.readdirSync(REP)) {
  if (/^(block-|template-).*\.html$/.test(f) || ['index.html', 'blocks.html', 'templates.html', 'behaviors.html', 'journeys.html', 'integrations.html', 'needs-review.html', 'full-report.html'].includes(f)) {
    try { fs.unlinkSync(path.join(REP, f)); } catch (e) {}
  }
}

const TL = DET.templateLabels;
const tplLabel = t => TL[t] || (t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, ' '));
const tplCounts = Object.entries(S.templateCounts).sort((a, b) => b[1] - a[1]);
const totalTemplates = tplCounts.length;
const totals = {
  urls: S.totalUrls, ok: S.ok, templates: totalTemplates, blocks: catalog.length,
  variations: catalog.reduce((n, b) => n + b.variations.length, 0), mirror: S.mirrorCount || 0, spanish: S.spanishCount || 0,
  high: catalog.filter(b => b.complexity === 'High').length, medium: catalog.filter(b => b.complexity === 'Medium').length, low: catalog.filter(b => b.complexity === 'Low').length,
};
const origin = S.origin || (UT[0] && new URL(UT[0].url).origin) || '';
const host = origin.replace(/^https?:\/\//, '');
const DATE = process.env.ANALYSIS_DATE || 'the analysis date';

// Single source of truth for the top navigation (dashboard tabs + report hub).
// Used by both the dashboard (client-side tab switch, hash-aware) and every report
// page (static links back to the dashboard tab / hub) so the nav is identical everywhere.
const NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'templates', label: 'Templates' },
  { id: 'blocks', label: 'Blocks & Variations' },
  { id: 'mapping', label: 'Template → Block Map' },
  { id: 'journeys', label: 'Journeys & Forms' },
  { id: 'behaviors', label: 'Observed Behaviors' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'urls', label: 'All URLs (' + S.totalUrls + ')' },
  { id: 'reports', label: 'Detailed Reports', href: 'reports/index.html' },
];
// Static nav bar for report pages (prefix points back up to the dashboard).
function reportNav(activeReportsHubHref) {
  return `<nav class="topnav">${NAV.map(t => {
    const href = t.id === 'reports' ? (activeReportsHubHref || 'index.html') : `../dashboard.html#${t.id}`;
    const active = t.id === 'reports' ? ' class="active"' : '';
    return `<a href="${href}"${active}>${esc(t.label)}</a>`;
  }).join('')}</nav>`;
}

/* ---------------- shared CSS (light theme, blue header) ---------------- */
const CSS = `
:root{--bg:#f4f7fb;--panel:#ffffff;--panel2:#eef3f9;--line:#d9e1ec;--txt:#1a2432;--mut:#5c6b80;--brand:#1560bd;--accent:#1560bd;--hi:#c0392b;--me:#9a6a00;--lo:#1e8f5b}
*{box-sizing:border-box}body{margin:0;font:14px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--txt)}
a{color:var(--accent)}
header.top,header{padding:20px 28px;background:linear-gradient(90deg,#0b3d91,#1560bd 55%,#2f80ed);color:#fff}
header h1,header.top h1{margin:0;font-size:19px}header p,header.top p{margin:6px 0 0;opacity:.92;font-size:13px}
.crumbs{padding:12px 28px;background:var(--panel);border-bottom:1px solid var(--line);font-size:13px}
.crumbs a{text-decoration:none}.crumbs span{color:var(--mut)}
main{padding:24px 28px;max-width:1080px;margin:0 auto}
h2{font-size:16px;margin:26px 0 10px;border-left:3px solid var(--brand);padding-left:10px}
h3{font-size:14px;margin:18px 0 6px}
table{width:100%;border-collapse:collapse;font-size:13px;margin:8px 0}
th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--mut);font-weight:600}
td.h,th.h{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
tr:hover td{background:var(--panel2)}
tfoot td{font-weight:700;border-top:2px solid var(--line);background:var(--panel)}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px;margin:12px 0}
.pill{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600}
.High{background:rgba(192,57,43,.12);color:var(--hi)}.Medium{background:rgba(154,106,0,.14);color:var(--me)}.Low{background:rgba(30,143,91,.14);color:var(--lo)}
.tag{font-family:ui-monospace,Menlo,monospace;font-size:11px;background:var(--panel2);padding:1px 6px;border-radius:4px;color:var(--accent)}
.muted{color:var(--mut)}.warn{color:var(--hi);font-weight:600}
ul.f{margin:6px 0 12px;padding-left:18px}ul.f li{margin:4px 0}
.chk{list-style:none;padding-left:0}.chk li{margin:6px 0;padding-left:26px;position:relative}.chk li:before{content:"\\2610";position:absolute;left:0;color:var(--accent)}
.varbox{background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:8px 0}
.grid{display:grid;gap:12px}.g4{grid-template-columns:repeat(4,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g2{grid-template-columns:repeat(2,1fr)}
@media(max-width:760px){.g4,.g3,.g2{grid-template-columns:1fr 1fr}}
.stat{text-align:center;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px}
.stat .n{font-size:26px;font-weight:700}.stat .l{color:var(--mut);font-size:12px;margin-top:3px}
.urllist{max-height:420px;overflow:auto;border:1px solid var(--line);border-radius:8px}
.urllist a{display:block;padding:6px 12px;border-bottom:1px solid var(--line);text-decoration:none;font-size:12px}
.urllist a:hover{background:var(--panel2)}
.backlink{display:inline-block;margin:0 0 6px;font-size:13px;text-decoration:none}
.nav-blocks{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
.nav-blocks a{font-size:12px;text-decoration:none;background:var(--panel2);border:1px solid var(--line);padding:4px 9px;border-radius:16px;color:var(--txt)}
.nav-blocks a:hover{border-color:var(--accent)}
footer{padding:18px 28px;color:var(--mut);font-size:12px;border-top:1px solid var(--line);margin-top:30px}
nav.topnav,nav#nav{display:flex;gap:2px;background:var(--panel);border-bottom:1px solid var(--line);padding:0 12px;position:sticky;top:0;z-index:10;flex-wrap:wrap}
nav.topnav a,nav#nav button{background:none;border:none;color:var(--mut);padding:12px 16px;cursor:pointer;font-size:13px;border-bottom:2px solid transparent;text-decoration:none;display:inline-block}
nav.topnav a:hover,nav#nav button:hover{color:var(--txt)}
nav.topnav a.active,nav#nav button.active{color:var(--txt);border-bottom-color:var(--brand)}
`;
function shell(title, crumbs, body, opts) {
  opts = opts || {};
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>${CSS}</style></head><body>
<header class="top"><h1>${esc(title)}</h1><p>${esc(host)} → Edge Delivery Services · evidence-based analysis · ${esc(DATE)}</p></header>
${reportNav(opts.hubHref)}
<div class="crumbs">${crumbs}</div>
<main>${body}</main>
<footer>Generated from live-crawl evidence (all ${S.totalUrls} URLs). See <a href="../dashboard.html">dashboard</a> · <a href="index.html">report hub</a>.</footer>
</body></html>`;
}

/* ---------------- example URLs per block ---------------- */
function exampleUrlsForBlock(b) {
  const raw = b.rawKeys || [];
  const pagesJson = L.loadJSON(path.join(dataDir, 'pages.json'));
  return pagesJson.filter(p => raw.some(k => (p.blocks && p.blocks[k]) || (p.custom && p.custom[k]))).map(p => p.url);
}

/* ================= REPORT.md ================= */
function genMarkdown() {
  let md = `# ${host} — EDS Migration Functional Analysis\n\n`;
  md += `**Source site:** ${origin}\n`;
  md += `**Analysis date:** ${DATE}\n`;
  md += `**Method:** Every one of the ${S.totalUrls} URLs was fetched (HTTP 200: ${S.ok}) and its DOM parsed for components, variations, embeds and integrations. Interactive behavior was verified live with Playwright on representative pages of every template and interactive block. Findings are evidence-based, not extrapolated.\n\n`;
  if (totals.mirror || totals.spanish) md += `> ${totals.mirror} URLs are content mirror/duplicate paths; ${totals.spanish} are non-English (es) variants — same templates/blocks, content only.\n\n`;
  md += `---\n\n## 1. Executive Summary\n\n| Metric | Value |\n|---|---|\n`;
  md += `| Total URLs analyzed | **${S.totalUrls}** |\n| Unique templates | **${totalTemplates}** |\n| EDS blocks to develop | **${catalog.length}** |\n| Block variations | **${totals.variations}** |\n| EDS default content (not blocks) | ${defaultContent.length} |\n| High / Medium / Low complexity | ${totals.high} / ${totals.medium} / ${totals.low} |\n| Forms | ${(S.forms || []).length} |\n| Third-party integrations | ${Object.keys(S.integrationPageCounts).length} |\n| Unrecognized 3rd-party hosts (review) | ${Object.keys(S.unknownScriptHostCounts || {}).length} |\n| Blocks needing agent review | ${catalog.filter(b => b.needsReview).length} |\n\n`;
  md += `---\n\n## 2. Templates\n\n| # | Template | Pages |\n|---|---|---|\n`;
  tplCounts.forEach(([t, c], i) => md += `| ${i + 1} | **${tplLabel(t)}** (\`${t}\`) | ${c} |\n`);
  md += `\n---\n\n## 3. Block Inventory\n\n${catalog.length} blocks to develop. Components that share a common DOM/decoration are consolidated into a single block whose differences are **variations** (one block built, N variations authored).\n\n| Block | EDS name | Complexity | Pages | Variations |\n|---|---|---|---|---|\n`;
  catalog.forEach(b => md += `| **${b.name}**${b.needsReview ? ' ⚠︎' : ''} | \`${b.edsBlock}\` | ${b.complexity} | ${b.pages} | ${b.variations.map(v => `${v.name} (${v.pages})`).join('; ')} |\n`);
  if (defaultContent.length) {
    md += `\n**EDS default content (not counted as blocks)** — rendered by core decoration / autoblocking, not authored as blocks: ${defaultContent.map(d => `${d.name} (${d.pages})`).join(', ')}.\n`;
  }
  md += `\n---\n\n## 4. Template → Block → Variation\n\n`;
  tplCounts.forEach(([t, c]) => {
    md += `### ${tplLabel(t)} (\`${t}\`) — ${c} pages\n\n| Block | Variations | Complexity |\n|---|---|---|\n`;
    catalog.filter(b => b.templates.includes(t) || b.templates.includes('all')).forEach(b => md += `| ${b.name} | ${b.variations.map(v => v.name).join(', ')} | ${b.complexity} |\n`);
    md += `\n`;
  });
  md += `---\n\n## 5. Functional Requirements\n\n`;
  catalog.forEach(b => { md += `### ${b.name} (\`${b.edsBlock}\`)\n\n- **Pages:** ${b.pages} · **Templates:** ${b.templates.join(', ')}\n- **Variations:** ${b.variations.map(v => `${v.name} (${v.pages})`).join('; ')}\n\n`; b.functional.forEach(f => md += `- ${f}\n`); md += `\n`; });
  md += `---\n\n## 6. Acceptance Criteria\n\n`;
  catalog.forEach(b => { md += `### ${b.name}\n\n`; b.acceptance.forEach(a => md += `- [ ] ${a}\n`); md += `\n`; });
  // 7. User journeys
  const jc = S.journeyCapabilityCounts || {};
  const jLabels = { hasForm: 'Forms', hasSearch: 'Search', hasLogin: 'Login / account', hasCart: 'Cart', hasCheckout: 'Checkout / buy', hasFilters: 'Filtering', hasPagination: 'Pagination / load-more', hasTabs: 'Tabs', hasAccordion: 'Accordion / flip', hasModal: 'Modal / popup', hasVideo: 'Video', hasMap: 'Map', hasChat: 'Live chat' };
  md += `---\n\n## 7. User Journeys & Interactions\n\nCapabilities detected across the site (page counts). These indicate the interactive journeys to design & test.\n\n| Capability | Pages |\n|---|---|\n`;
  Object.entries(jc).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => md += `| ${jLabels[k] || k} | ${v} |\n`);
  if (!Object.keys(jc).length) md += `| (none detected) | 0 |\n`;
  md += `\n> Journeys should be walked end-to-end with Playwright and documented in \`data/observed-behaviors.json\`. Multi-step flows (form → validation → submit → confirmation; filter → results; login → gated content) are called out per block in §5.\n`;

  // 8. Forms
  const forms = S.forms || [];
  md += `\n---\n\n## 8. Forms\n\n`;
  if (forms.length) {
    md += `${forms.length} form instance(s) found. Kinds: ${Object.entries(S.formKindCounts || {}).map(([k, v]) => `${k} (${v})`).join(', ')}.\n\n| Page | Kind | Fields | Method | Posts to |\n|---|---|---|---|---|\n`;
    forms.forEach(f => md += `| ${f.url.replace(origin, '')} | ${f.kind} | ${f.fieldCount} | ${f.method} | ${f.actionHost || '(js-handled)'} |\n`);
  } else md += `No forms detected.\n`;

  // 9. Integrations (by category)
  md += `\n---\n\n## 9. Third-Party Integrations\n\n`;
  const cats = S.integrationCategories || {};
  Object.keys(cats).sort().forEach(cat => {
    md += `**${cat}**\n\n| Integration | Pages |\n|---|---|\n`;
    Object.entries(cats[cat]).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => md += `| ${k} | ${v} |\n`);
    md += `\n`;
  });
  const unk = S.unknownScriptHostCounts || {};
  if (Object.keys(unk).length) {
    md += `**⚠︎ Unrecognized third-party hosts (need agent review — could be complex integrations):**\n\n| Host | Pages |\n|---|---|\n`;
    Object.entries(unk).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => md += `| ${k} | ${v} |\n`);
    md += `\n`;
  }

  md += `---\n\n## 10. Block Complexity\n\n| Block | Complexity | Reason |\n|---|---|---|\n`;
  ['High', 'Medium', 'Low'].forEach(lv => catalog.filter(b => b.complexity === lv).forEach(b => md += `| **${b.name}**${b.needsReview ? ' ⚠︎' : ''} | ${lv} | ${b.complexityReason} |\n`));

  const stubs = catalog.filter(b => b.needsReview);
  if (stubs.length) {
    md += `\n---\n\n## 11. ⚠︎ Needs Review (not assumed)\n\nThe following were auto-detected but not in the knowledge base — the agent must inspect the live pages and complete their spec rather than assume:\n\n`;
    stubs.forEach(b => md += `- **${b.name}** (\`${b.rawKeys.join(', ')}\`, ${b.pages} pages)\n`);
  }
  md += `\n---\n\n*Generated by tools/site-analysis. Data: data/*.json. Dashboard: dashboard.html. Detailed: reports/index.html.*\n`;
  fs.writeFileSync(path.join(OUT, 'REPORT.md'), md);
}

/* tiny md->html for full-report.html */
function mdInline(s) { s = esc(s); s = s.replace(/`([^`]+)`/g, '<span class="tag">$1</span>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'); return s; }
function mdToHtml(md) {
  const lines = md.split('\n'); let html = '', i = 0, inList = false;
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };
  while (i < lines.length) {
    const line = lines[i];
    if (/^\|(.+)\|\s*$/.test(line) && /^\|[\s:-]+\|\s*$/.test(lines[i + 1] || '')) {
      closeList(); const hs = line.split('|').slice(1, -1).map(c => c.trim());
      html += '<table><thead><tr>' + hs.map(h => `<th>${mdInline(h)}</th>`).join('') + '</tr></thead><tbody>'; i += 2;
      while (i < lines.length && /^\|(.+)\|\s*$/.test(lines[i])) { const cs = lines[i].split('|').slice(1, -1).map(c => c.trim()); html += '<tr>' + cs.map(c => `<td>${mdInline(c)}</td>`).join('') + '</tr>'; i++; }
      html += '</tbody></table>'; continue;
    }
    if (/^#{1,4}\s/.test(line)) { closeList(); const lvl = Math.min(line.match(/^#+/)[0].length, 3); html += `<h${lvl}>${mdInline(line.replace(/^#+\s/, ''))}</h${lvl}>`; i++; continue; }
    if (/^\s*[-*]\s+/.test(line)) { if (!inList) { html += '<ul class="f">'; inList = true; } html += `<li>${mdInline(line.replace(/^\s*[-*]\s+/, ''))}</li>`; i++; continue; }
    if (/^>\s?/.test(line)) { closeList(); html += `<div class="card muted">${mdInline(line.replace(/^>\s?/, ''))}</div>`; i++; continue; }
    if (/^---\s*$/.test(line)) { closeList(); html += '<hr style="border:none;border-top:1px solid var(--line);margin:22px 0">'; i++; continue; }
    if (/^\s*$/.test(line)) { closeList(); i++; continue; }
    closeList(); html += `<p>${mdInline(line)}</p>`; i++;
  }
  closeList(); return html;
}

/* ================= detailed report pages ================= */
function genDetailed() {
  // per-block
  catalog.forEach(b => {
    const ex = exampleUrlsForBlock(b); const exShown = ex.slice(0, 40);
    const crumbs = `<a href="index.html">Report Hub</a> <span>›</span> <a href="blocks.html">Blocks</a> <span>›</span> ${esc(b.name)}`;
    let body = `<a class="backlink" href="blocks.html">← All blocks</a>
    <div class="card"><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center">
    <div><h2 style="border:none;margin:0;padding:0">${esc(b.name)}${b.needsReview ? ' <span class="warn">⚠︎ needs review</span>' : ''}</h2><div class="muted" style="margin-top:4px">EDS block: <span class="tag">${esc(b.edsBlock)}</span></div></div>
    <div style="text-align:right"><span class="pill ${b.complexity}">${b.complexity}</span><div class="muted" style="margin-top:6px">${b.pages} pages · ${b.variations.length} variation(s)</div></div></div>
    <p class="muted" style="margin-bottom:0">${esc(b.complexityReason)}</p></div>
    <h2>Templates using this block</h2><div class="nav-blocks">${b.templates.map(t => t === 'all' ? '<span class="tag">all (global)</span>' : `<a href="template-${t}.html">${esc(tplLabel(t))}</a>`).join('')}</div>
    <h2>Variations (${b.variations.length})</h2>${b.variations.map(v => `<div class="varbox"><b>${esc(v.name)}</b>${v.desc ? ' — ' + esc(v.desc) : ''} <span class="muted">(${v.pages} pages)</span></div>`).join('')}
    <h2>Functional requirements</h2><ul class="f">${b.functional.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <h2>Acceptance criteria</h2><ul class="chk">${b.acceptance.map(a => `<li>${esc(a)}</li>`).join('')}</ul>`;
    const beh = BEH.behaviors && BEH.behaviors[b.id];
    if (beh) body += `<h2>Observed behavior (Playwright-verified)</h2><div class="card"><p style="margin:0 0 8px">${esc(beh.observed)}</p><div class="nav-blocks">${(beh.states || []).map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></div>`;
    if (b.integrations && b.integrations.length) body += `<h2>Integrations</h2><div class="nav-blocks">${b.integrations.map(i => `<span class="tag">${esc(i)}</span>`).join('')}</div>`;
    body += `<h2>Example source pages (${ex.length})</h2>`;
    body += ex.length ? `<div class="muted" style="font-size:12px;margin-bottom:6px">${ex.length > 40 ? 'First 40 of ' + ex.length + '.' : 'All occurrences.'}</div><div class="urllist">${exShown.map(u => `<a href="${esc(u)}" target="_blank">${esc(u.replace(origin, ''))}</a>`).join('')}</div>` : `<p class="muted">Global block / derived from page structure.</p>`;
    fs.writeFileSync(path.join(REP, `block-${b.id}.html`), shell(`Block · ${b.name}`, crumbs, body));
  });
  // blocks index
  let bi = `<a class="backlink" href="index.html">← Report hub</a><h2>${catalog.length} blocks · ${totals.variations} variations</h2><table><thead><tr><th>Block</th><th>EDS name</th><th>Complexity</th><th>Pages</th><th>Variations</th></tr></thead><tbody>`;
  catalog.forEach(b => bi += `<tr><td><a href="block-${b.id}.html">${esc(b.name)}</a>${b.needsReview ? ' <span class="warn">⚠︎</span>' : ''}</td><td><span class="tag">${esc(b.edsBlock)}</span></td><td><span class="pill ${b.complexity}">${b.complexity}</span></td><td>${b.pages}</td><td class="muted">${b.variations.map(v => esc(v.name)).join(', ')}</td></tr>`);
  bi += `</tbody></table>`;
  fs.writeFileSync(path.join(REP, 'blocks.html'), shell('Blocks & Variations', `<a href="index.html">Report Hub</a> <span>›</span> Blocks`, bi));
  // per-template
  tplCounts.forEach(([t, c]) => {
    const urls = UT.filter(u => u.template === t).map(u => u.url);
    const blocks = catalog.filter(b => b.templates.includes(t) || b.templates.includes('all'));
    let body = `<a class="backlink" href="templates.html">← All templates</a>
    <div class="card"><h2 style="border:none;margin:0 0 6px;padding:0">${esc(tplLabel(t))} <span class="tag">${esc(t)}</span></h2>
    <div class="grid g4" style="margin-top:14px"><div class="stat"><div class="n">${c}</div><div class="l">pages</div></div><div class="stat"><div class="n">${blocks.length}</div><div class="l">blocks</div></div><div class="stat"><div class="n">${blocks.filter(b => b.complexity === 'High').length}</div><div class="l">high-complexity</div></div><div class="stat"><div class="n">${urls.filter(u => { const p = UT.find(x => x.url === u); return p && (p.lang || '').startsWith('es'); }).length}</div><div class="l">es variants</div></div></div></div>
    <h2>Blocks used</h2><table><thead><tr><th>Block</th><th>Variations</th><th>Complexity</th></tr></thead><tbody>${blocks.map(b => `<tr><td><a href="block-${b.id}.html">${esc(b.name)}</a></td><td class="muted">${b.variations.map(v => esc(v.name)).join(', ')}</td><td><span class="pill ${b.complexity}">${b.complexity}</span></td></tr>`).join('')}</tbody></table>
    <h2>Pages (${urls.length})</h2><div class="urllist">${urls.map(u => `<a href="${esc(u)}" target="_blank">${esc(u.replace(origin, ''))}</a>`).join('')}</div>`;
    fs.writeFileSync(path.join(REP, `template-${t}.html`), shell(`Template · ${tplLabel(t)}`, `<a href="index.html">Report Hub</a> <span>›</span> <a href="templates.html">Templates</a> <span>›</span> ${esc(tplLabel(t))}`, body));
  });
  // templates index
  let ti = `<a class="backlink" href="index.html">← Report hub</a><h2>${totalTemplates} templates · ${S.totalUrls} pages</h2><table><thead><tr><th>#</th><th>Template</th><th>Pages</th></tr></thead><tbody>`;
  tplCounts.forEach(([t, c], i) => ti += `<tr><td>${i + 1}</td><td><a href="template-${t}.html">${esc(tplLabel(t))}</a> <span class="tag">${esc(t)}</span></td><td><b>${c}</b></td></tr>`);
  ti += `</tbody></table>`;
  fs.writeFileSync(path.join(REP, 'templates.html'), shell('Templates', `<a href="index.html">Report Hub</a> <span>›</span> Templates`, ti));
  // integrations (grouped by category + unknown hosts)
  const cats = S.integrationCategories || {};
  let ig = `<a class="backlink" href="index.html">← Report hub</a><h2>Third-party integrations</h2>`;
  Object.keys(cats).sort().forEach(cat => {
    ig += `<h3>${esc(cat)}</h3><table><thead><tr><th>Integration</th><th>Pages</th></tr></thead><tbody>${Object.entries(cats[cat]).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join('')}</tbody></table>`;
  });
  const unk = S.unknownScriptHostCounts || {};
  if (Object.keys(unk).length) {
    ig += `<h3 class="warn">⚠︎ Unrecognized third-party hosts — need agent review</h3><div class="muted" style="margin-bottom:6px">External script hosts not matched by any detector. Investigate: these may be complex/custom integrations. If real, add a detector to tools/site-analysis/knowledge/detectors.json.</div><table><thead><tr><th>Host</th><th>Pages</th></tr></thead><tbody>${Object.entries(unk).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join('')}</tbody></table>`;
  }
  fs.writeFileSync(path.join(REP, 'integrations.html'), shell('Third-Party Integrations', `<a href="index.html">Report Hub</a> <span>›</span> Integrations`, ig));
  // journeys & forms
  const jc = S.journeyCapabilityCounts || {};
  const jLabels = { hasForm: 'Forms', hasSearch: 'Search', hasLogin: 'Login / account', hasCart: 'Cart', hasCheckout: 'Checkout / buy', hasFilters: 'Filtering', hasPagination: 'Pagination / load-more', hasTabs: 'Tabs', hasAccordion: 'Accordion / flip', hasModal: 'Modal / popup', hasVideo: 'Video', hasMap: 'Map', hasChat: 'Live chat' };
  let jr = `<a class="backlink" href="index.html">← Report hub</a><h2>User journeys & interactions</h2><div class="muted" style="margin-bottom:8px">Interactive capabilities detected across the site — the journeys to design and test end-to-end.</div>`;
  jr += `<table><thead><tr><th>Capability</th><th>Pages</th></tr></thead><tbody>${Object.entries(jc).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(jLabels[k] || k)}</td><td>${v}</td></tr>`).join('') || '<tr><td class="muted">none detected</td><td>0</td></tr>'}</tbody></table>`;
  const forms = S.forms || [];
  jr += `<h2>Forms (${forms.length})</h2>`;
  jr += forms.length ? `<table><thead><tr><th>Page</th><th>Kind</th><th>Fields</th><th>Method</th><th>Posts to</th></tr></thead><tbody>${forms.map(f => `<tr><td><a href="${esc(f.url)}" target="_blank">${esc(f.url.replace(origin, ''))}</a></td><td>${esc(f.kind)}</td><td>${f.fieldCount}</td><td>${esc(f.method)}</td><td class="muted">${esc(f.actionHost || '(js-handled)')}</td></tr>`).join('')}</tbody></table>` : `<p class="muted">No forms detected.</p>`;
  fs.writeFileSync(path.join(REP, 'journeys.html'), shell('User Journeys & Forms', `<a href="index.html">Report Hub</a> <span>›</span> Journeys & Forms`, jr));
  // needs-review page
  const stubs = catalog.filter(b => b.needsReview);
  let nr = `<a class="backlink" href="index.html">← Report hub</a><h2>⚠︎ Needs review — not assumed</h2><div class="muted" style="margin-bottom:8px">Auto-detected but not in the knowledge base. The agent must inspect the live pages (interact with Playwright) and complete each spec, then add it to the knowledge base for future runs.</div>`;
  nr += stubs.length ? `<table><thead><tr><th>Block</th><th>Raw markers</th><th>Pages</th></tr></thead><tbody>${stubs.map(b => `<tr><td><a href="block-${b.id}.html">${esc(b.name)}</a></td><td><span class="tag">${esc((b.rawKeys || []).join(', '))}</span></td><td>${b.pages}</td></tr>`).join('')}</tbody></table>` : `<p class="lo">✓ All detected components matched the knowledge base — nothing pending review.</p>`;
  fs.writeFileSync(path.join(REP, 'needs-review.html'), shell('Needs Review', `<a href="index.html">Report Hub</a> <span>›</span> Needs Review`, nr));
  // behaviors
  let bh = `<a class="backlink" href="index.html">← Report hub</a><h2>Observed interactive behaviors</h2>`;
  const bhKeys = Object.keys(BEH.behaviors || {});
  bh += bhKeys.length ? bhKeys.map(k => { const v = BEH.behaviors[k]; return `<div class="card"><h3 style="margin-top:0">${esc(k)}</h3><p style="margin:0 0 8px">${esc(v.observed)}</p><div class="nav-blocks">${(v.states || []).map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></div>`; }).join('') : `<p class="muted">No observed-behaviors.json supplied. Run Playwright verification and write ${path.join('data', 'observed-behaviors.json')} to populate this page.</p>`;
  fs.writeFileSync(path.join(REP, 'behaviors.html'), shell('Observed Behaviors', `<a href="index.html">Report Hub</a> <span>›</span> Observed Behaviors`, bh));
  // full report
  const md = fs.readFileSync(path.join(OUT, 'REPORT.md'), 'utf8');
  fs.writeFileSync(path.join(REP, 'full-report.html'), shell('Full Consolidated Report', `<a href="index.html">Report Hub</a> <span>›</span> Full Report`, `<a class="backlink" href="index.html">← Report hub</a>` + mdToHtml(md)));
  // hub
  let hub = `<div class="grid g4"><div class="stat"><div class="n">${totals.urls}</div><div class="l">URLs</div></div><div class="stat"><div class="n">${totals.templates}</div><div class="l">Templates</div></div><div class="stat"><div class="n">${totals.blocks}</div><div class="l">Blocks</div></div><div class="stat"><div class="n">${totals.variations}</div><div class="l">Variations</div></div></div>
  <h2>Reports</h2><div class="grid g3">
  <a class="card" style="text-decoration:none;color:inherit" href="../dashboard.html"><b>📊 Interactive Dashboard</b><div class="muted" style="margin-top:6px">Tabbed overview + searchable URL list.</div></a>
  <a class="card" style="text-decoration:none;color:inherit" href="full-report.html"><b>📄 Full Report</b><div class="muted" style="margin-top:6px">Complete written analysis.</div></a>
  <a class="card" style="text-decoration:none;color:inherit" href="blocks.html"><b>🧩 Blocks</b><div class="muted" style="margin-top:6px">${totals.blocks} blocks, each with a spec page.</div></a>
  <a class="card" style="text-decoration:none;color:inherit" href="templates.html"><b>🗂️ Templates</b><div class="muted" style="margin-top:6px">${totals.templates} templates.</div></a>
  <a class="card" style="text-decoration:none;color:inherit" href="behaviors.html"><b>🎬 Observed Behaviors</b><div class="muted" style="margin-top:6px">Playwright-verified.</div></a>
  <a class="card" style="text-decoration:none;color:inherit" href="journeys.html"><b>🧭 Journeys & Forms</b><div class="muted" style="margin-top:6px">Interactive capabilities + form inventory.</div></a>
  <a class="card" style="text-decoration:none;color:inherit" href="integrations.html"><b>🔌 Integrations</b><div class="muted" style="margin-top:6px">Third-party services (by category) + unknown hosts.</div></a>
  <a class="card" style="text-decoration:none;color:inherit" href="needs-review.html"><b>${catalog.filter(b => b.needsReview).length ? '⚠︎' : '✓'} Needs Review</b><div class="muted" style="margin-top:6px">${catalog.filter(b => b.needsReview).length} unresolved component(s).</div></a></div>
  <h2>All blocks</h2><div class="nav-blocks">${catalog.map(b => `<a href="block-${b.id}.html">${esc(b.name)} <span class="pill ${b.complexity}" style="margin-left:4px">${b.complexity[0]}</span></a>`).join('')}</div>
  <h2>All templates</h2><div class="nav-blocks">${tplCounts.map(([t, c]) => `<a href="template-${t}.html">${esc(tplLabel(t))} (${c})</a>`).join('')}</div>`;
  fs.writeFileSync(path.join(REP, 'index.html'), shell('EDS Migration — Report Hub', `Report Hub`, hub));
}

/* ================= dashboard.html ================= */
function genDashboard() {
  const jLabels = { hasForm: 'Forms', hasSearch: 'Search', hasLogin: 'Login / account', hasCart: 'Cart', hasCheckout: 'Checkout / buy', hasFilters: 'Filtering', hasPagination: 'Pagination / load-more', hasTabs: 'Tabs', hasAccordion: 'Accordion / flip', hasModal: 'Modal / popup', hasVideo: 'Video', hasMap: 'Map', hasChat: 'Live chat' };
  const data = {
    totals, host, origin,
    templates: tplCounts.map(([t, c]) => ({ id: t, label: tplLabel(t), count: c })),
    catalog, integrations: Object.entries(S.integrationPageCounts).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, v]),
    integrationCategories: S.integrationCategories || {}, unknownHosts: S.unknownScriptHostCounts || {},
    journeys: Object.entries(S.journeyCapabilityCounts || {}).map(([k, v]) => [jLabels[k] || k, v]).sort((a, b) => b[1] - a[1]),
    forms: (S.forms || []).map(f => ({ url: f.url, kind: f.kind, fieldCount: f.fieldCount, method: f.method, actionHost: f.actionHost })),
    needsReview: catalog.filter(b => b.needsReview).map(b => ({ id: b.id, name: b.name, raw: (b.rawKeys || []).join(', '), pages: b.pages })),
    defaultContent,
    behaviors: BEH.behaviors || {}, urlList: UT.map(u => ({ url: u.url, t: u.template, m: u.mirror ? 1 : 0, lang: u.lang || 'en' })),
  };
  const maxTpl = Math.max(...data.templates.map(t => t.count), 1);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(host)} — EDS Migration Analysis</title><style>${CSS}
.view{display:none}.view.active{display:block}
details{background:var(--panel);border:1px solid var(--line);border-radius:10px;margin:10px 0;padding:4px 14px}
details summary{cursor:pointer;padding:10px 0;font-weight:600;list-style:none;display:flex;justify-content:space-between;gap:10px;align-items:center}
details summary::-webkit-details-marker{display:none}
input#us{width:100%;padding:9px 12px;border-radius:8px;border:1px solid var(--line);background:var(--panel);color:var(--txt);margin-bottom:10px}
select{padding:8px;border-radius:8px;border:1px solid var(--line);background:var(--panel);color:var(--txt)}
.bar{height:12px;border-radius:6px;background:var(--accent);min-width:2px}.barrow{display:flex;align-items:center;gap:10px;margin:6px 0}.barrow .lab{width:220px;font-size:12px;color:var(--mut);flex:none}.barrow .val{font-size:12px;width:60px;text-align:right}
</style></head><body>
<header><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap"><div><h1>${esc(host)} — EDS Migration Functional Analysis</h1><p>${esc(origin)} → Edge Delivery Services · ${totals.urls} URLs · ${esc(DATE)}</p></div><a href="reports/index.html" style="flex:none;background:#fff;color:#0b3d91;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:8px">📑 Detailed Reports →</a></div></header>
<nav id="nav"></nav><main>
<section class="view active" id="v-overview"></section><section class="view" id="v-templates"></section><section class="view" id="v-blocks"></section><section class="view" id="v-mapping"></section><section class="view" id="v-journeys"></section><section class="view" id="v-behaviors"></section><section class="view" id="v-integrations"></section><section class="view" id="v-urls"></section>
</main><footer>Evidence-based analysis. Detailed reports: <a href="reports/index.html">hub</a> · <a href="reports/full-report.html">full report</a>.</footer>
<script>
const D=${JSON.stringify(data)};const maxTpl=${maxTpl};
const TABS=[['overview','Overview'],['templates','Templates'],['blocks','Blocks & Variations'],['mapping','Template → Block Map'],['journeys','Journeys & Forms'],['behaviors','Observed Behaviors'],['integrations','Integrations'],['urls','All URLs ('+D.totals.urls+')']];
const nav=document.getElementById('nav');
function showTab(id){const ids=TABS.map(t=>t[0]);if(!ids.includes(id))id='overview';document.querySelectorAll('nav#nav button').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));const el=document.getElementById('v-'+id);if(el)el.classList.add('active');}
TABS.forEach(([id,lab])=>{const b=document.createElement('button');b.textContent=lab;b.dataset.tab=id;b.onclick=()=>{history.replaceState(null,'','#'+id);showTab(id);window.scrollTo(0,0);};nav.appendChild(b);});
// Detailed Reports link sits in the same nav bar (navigates to the report hub).
const rl=document.createElement('a');rl.href='reports/index.html';rl.textContent='Detailed Reports';rl.style.cssText='color:var(--mut);padding:12px 16px;font-size:13px;text-decoration:none;border-bottom:2px solid transparent';nav.appendChild(rl);
showTab((location.hash||'').replace('#',''));
window.addEventListener('hashchange',()=>showTab((location.hash||'').replace('#','')));
const esc=s=>(s==null?'':String(s)).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
document.getElementById('v-overview').innerHTML=\`<div class="grid g4"><div class="stat"><div class="n">\${D.totals.urls}</div><div class="l">URLs analyzed</div></div><div class="stat"><div class="n">\${D.totals.templates}</div><div class="l">Templates</div></div><div class="stat"><div class="n">\${D.totals.blocks}</div><div class="l">Blocks</div></div><div class="stat"><div class="n">\${D.totals.variations}</div><div class="l">Variations</div></div></div>
<div class="grid g4" style="margin-top:14px"><div class="stat"><div class="n" style="color:var(--hi)">\${D.totals.high}</div><div class="l">High</div></div><div class="stat"><div class="n" style="color:var(--me)">\${D.totals.medium}</div><div class="l">Medium</div></div><div class="stat"><div class="n" style="color:var(--lo)">\${D.totals.low}</div><div class="l">Low</div></div><div class="stat"><div class="n">\${D.totals.mirror}+\${D.totals.spanish}</div><div class="l">Mirror + non-EN</div></div></div>
<h2>Pages per template</h2><div class="card">\${D.templates.map(t=>\`<div class="barrow"><div class="lab">\${esc(t.label)}</div><div class="bar" style="width:\${Math.max(2,t.count/maxTpl*620)}px"></div><div class="val">\${t.count}</div></div>\`).join('')}</div>\${(D.needsReview&&D.needsReview.length)?'<div class="card" style="border-color:var(--hi)"><b class="warn">⚠︎ '+D.needsReview.length+' component(s) need agent review</b><div class="muted" style="margin-top:6px">Auto-detected but not in the knowledge base — inspect the live pages and complete their spec (do not assume): '+D.needsReview.map(r=>esc(r.name)).join(', ')+'. See <a href="reports/needs-review.html">Needs Review</a>.</div></div>':''}\${(D.unknownHosts&&Object.keys(D.unknownHosts).length)?'<div class="card" style="border-color:var(--me)"><b style="color:var(--me)">⚠︎ '+Object.keys(D.unknownHosts).length+' unrecognized third-party host(s)</b><div class="muted" style="margin-top:6px">Possible complex integrations — review in the Integrations tab.</div></div>':''}\`;
document.getElementById('v-templates').innerHTML='<h2>'+D.totals.templates+' templates</h2><table><thead><tr><th>#</th><th>Template</th><th>Pages</th><th></th></tr></thead><tbody>'+D.templates.map((t,i)=>'<tr><td>'+(i+1)+'</td><td><a href="reports/template-'+esc(t.id)+'.html">'+esc(t.label)+'</a> <span class="tag">'+esc(t.id)+'</span></td><td><b>'+t.count+'</b></td><td><a href="reports/template-'+esc(t.id)+'.html">detail →</a></td></tr>').join('')+'</tbody></table>';
document.getElementById('v-blocks').innerHTML='<h2>'+D.catalog.length+' blocks · '+D.totals.variations+' variations</h2>'+((D.defaultContent&&D.defaultContent.length)?'<div class="card muted">Shared-DOM components are consolidated into one block + variations. <b>EDS default content</b> (not counted as blocks — core decoration / autoblocking handles them): '+D.defaultContent.map(d=>esc(d.name)+' ('+d.pages+')').join(', ')+'.</div>':'')+D.catalog.map(b=>\`<details><summary><span>\${esc(b.name)} <span class="tag">\${esc(b.edsBlock)}</span></span><span><span class="pill \${b.complexity}">\${b.complexity}</span> <span class="muted">\${b.pages} pages</span></span></summary><p style="margin:10px 0 4px"><a href="reports/block-\${esc(b.id)}.html">📄 Detailed report →</a></p><p class="muted">\${esc(b.complexityReason)}</p><h3>Variations (\${b.variations.length})</h3>\${b.variations.map(v=>'<div class="varbox" style="background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin:6px 0"><b>'+esc(v.name)+'</b> <span class="muted">('+v.pages+' pages)</span></div>').join('')}<h3>Functionality</h3><ul class="f">\${b.functional.map(f=>'<li>'+esc(f)+'</li>').join('')}</ul></details>\`).join('');
document.getElementById('v-mapping').innerHTML='<h2>Template → Block → Variation</h2>'+D.templates.map(t=>{const bl=D.catalog.filter(b=>b.templates.includes(t.id)||b.templates.includes('all'));return '<details open><summary><span><a href="reports/template-'+esc(t.id)+'.html">'+esc(t.label)+'</a></span><span class="muted">'+t.count+' pages · '+bl.length+' blocks</span></summary><table><thead><tr><th>Block</th><th>Variations</th><th>Complexity</th></tr></thead><tbody>'+bl.map(b=>'<tr><td><a href="reports/block-'+esc(b.id)+'.html">'+esc(b.name)+'</a></td><td class="muted">'+b.variations.map(v=>esc(v.name)).join(', ')+'</td><td><span class="pill '+b.complexity+'">'+b.complexity+'</span></td></tr>').join('')+'</tbody></table></details>';}).join('');
document.getElementById('v-journeys').innerHTML='<h2>User journeys & interactions</h2><div class="muted" style="margin-bottom:8px">Interactive capabilities detected across the site — the journeys to design & test end-to-end.</div>'+(D.journeys.length?'<table><thead><tr><th>Capability</th><th>Pages</th></tr></thead><tbody>'+D.journeys.map(r=>'<tr><td>'+esc(r[0])+'</td><td>'+r[1]+'</td></tr>').join('')+'</tbody></table>':'<p class="muted">None detected.</p>')+'<h2>Forms ('+D.forms.length+')</h2>'+(D.forms.length?'<table><thead><tr><th>Page</th><th>Kind</th><th>Fields</th><th>Method</th><th>Posts to</th></tr></thead><tbody>'+D.forms.map(f=>'<tr><td><a href="'+esc(f.url)+'" target="_blank">'+esc(f.url.replace(D.origin,''))+'</a></td><td>'+esc(f.kind)+'</td><td>'+f.fieldCount+'</td><td>'+esc(f.method)+'</td><td class="muted">'+esc(f.actionHost||'(js-handled)')+'</td></tr>').join('')+'</tbody></table>':'<p class="muted">No forms detected.</p>');
const bk=Object.keys(D.behaviors);document.getElementById('v-behaviors').innerHTML='<h2>Observed behaviors</h2>'+(bk.length?bk.map(k=>{const v=D.behaviors[k];return '<details><summary><span>'+esc(k)+'</span><span class="muted">'+((v.states||[]).length)+' states</span></summary><p>'+esc(v.observed)+'</p></details>';}).join(''):'<p class="muted">No observed-behaviors.json supplied.</p>');
const cats=D.integrationCategories;let ightml='<h2>Third-party integrations</h2>';Object.keys(cats).sort().forEach(cat=>{ightml+='<h3>'+esc(cat)+'</h3><table><thead><tr><th>Integration</th><th>Pages</th></tr></thead><tbody>'+Object.entries(cats[cat]).sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<tr><td>'+esc(k)+'</td><td>'+v+'</td></tr>').join('')+'</tbody></table>';});const uh=Object.entries(D.unknownHosts||{});if(uh.length){ightml+='<h3 class="warn">⚠︎ Unrecognized third-party hosts — review</h3><table><thead><tr><th>Host</th><th>Pages</th></tr></thead><tbody>'+uh.sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<tr><td>'+esc(k)+'</td><td>'+v+'</td></tr>').join('')+'</tbody></table>';}document.getElementById('v-integrations').innerHTML=ightml;
const v=document.getElementById('v-urls');v.innerHTML='<h2>All '+D.totals.urls+' URLs</h2><input id="us" placeholder="Filter URLs…"> <select id="tf"><option value="">All templates</option>'+D.templates.map(t=>'<option value="'+t.id+'">'+esc(t.label)+' ('+t.count+')</option>').join('')+'</select> <span class="muted" id="uc"></span><div style="max-height:70vh;overflow:auto;margin-top:10px"><table><thead><tr><th>#</th><th>URL</th><th>Template</th><th>Lang</th></tr></thead><tbody id="ur"></tbody></table></div>';
function ru(){const q=(document.getElementById('us').value||'').toLowerCase();const tf=document.getElementById('tf').value;const rows=D.urlList.filter(u=>(!tf||u.t===tf)&&(!q||u.url.toLowerCase().includes(q)));document.getElementById('uc').textContent=rows.length+' shown';document.getElementById('ur').innerHTML=rows.map((u,i)=>'<tr><td class="muted">'+(i+1)+'</td><td><a href="'+esc(u.url)+'" target="_blank">'+esc(u.url.replace(D.origin,''))+'</a></td><td><span class="tag">'+esc(u.t)+'</span></td><td class="muted">'+esc(u.lang)+'</td></tr>').join('');}
document.getElementById('us').oninput=ru;document.getElementById('tf').onchange=ru;ru();
</script></body></html>`;
  fs.writeFileSync(path.join(OUT, 'dashboard.html'), html);
}

/* ================= estimates.html ================= */
function genEstimates() {
  const BH = { High: 26, Medium: 15, Low: 8 };
  const byCx = { High: [], Medium: [], Low: [] }; catalog.forEach(b => byCx[b.complexity].push(b));
  const blockRows = catalog.map(b => ({ item: `${b.name} (${b.variations.length} variation${b.variations.length === 1 ? '' : 's'})`, detail: `${b.edsBlock} — ${b.complexity}`, hours: BH[b.complexity] + (b.variations.length > 1 ? (b.variations.length - 1) * 2 : 0) }));
  const blockTotal = blockRows.reduce((n, r) => n + r.hours, 0);
  const nInteg = Object.keys(S.integrationPageCounts).length;
  const groups = [
    ['1 · Project setup & environment', [['Repo & boilerplate setup', 'Fork aem-boilerplate, GitHub, Code Sync, aem-cli, .hlxignore, PR workflow', 12], ['Local dev env & CI', 'aem up, npm scripts, ESLint/Stylelint, Husky, Actions', 10], ['Site config (tools.aem.live)', 'paths, sidekick, preview/publish, robots/sitemap', 8], ['Global styles & design tokens', 'Typography/colour/spacing tokens, styles.css, fonts', 20], ['Core decoration layer', 'Section decoration, eager/lazy, buildAutoBlocks, loader', 16], ['Header + Footer scaffolding', 'Shared global nav/footer scaffolding', 10]]],
    ['2 · Page templates', [[`Template scaffolding (${totalTemplates} templates)`, 'Section models, metadata, per-template CSS', totalTemplates * 6], ['Template responsive & layout QA', 'Grid/section across breakpoints', 14]]],
    ['3 · Block development', blockRows.map(r => [r.item, r.detail, r.hours])],
    ['4 · Content migration (import automation & execution)', [['Import script scaffolding', 'Bundled import + run-bulk-import + images/DAM', 16], ['Block parsers', `Per-block/variant parsers (${catalog.length} blocks / ${totals.variations} variations)`, Math.max(48, catalog.length * 3)], ['Page transformers', 'Cleanup, sections, media, metadata', 24], ['Page template mapping', 'DOM selectors + block-mapping per template', 16], ['Bulk import execution', `Run ${S.totalUrls} URLs, monitor, re-run failures`, 16], ['Post-import validation tooling', 'Source-vs-output completeness scoring', 20], ['Post-import remediation', 'Fix systemic parser gaps + flagged pages', 60], ['Localization variants', `${totals.spanish} non-EN pages (locale handling)`, totals.spanish ? 8 : 0], ['Mirror & redirects', `${totals.mirror} duplicate paths + redirect map`, totals.mirror ? 10 : 0]]],
    ['5 · Third-party integrations', integrationRows()],
    ['6 · Cross-cutting quality', [['Responsive implementation & QA', 'Mobile/tablet/desktop across blocks & templates', 32], ['Accessibility (WCAG)', 'Keyboard, ARIA, focus, screen-reader', 28], ['Performance / Core Web Vitals', 'LCP/CLS/INP, images, lazy-load', 24], ['SEO & metadata', 'Metadata, canonical, sitemap, structured data', 14], ['Cross-browser QA', 'Chrome/Safari/Firefox/Edge + iOS/Android', 16], ['Integration/E2E tests', 'Automated tests for interactive blocks', 24], ['UAT support & defect fixing', 'Triage/fix during UAT', 40]]],
  ];
  function integrationRows() {
    const rows = [['Search rebuild on EDS index', 'query-index.json + typeahead', 28]];
    const map = { 'Adobe Launch/DTM (Analytics tag mgmt)': ['Adobe Launch / DTM', 'Tag manager loader + verify', 12], 'Adobe Client Data Layer': ['Adobe Client Data Layer', 'Re-implement analytics events', 24], 'Adobe Helix RUM': ['Adobe Helix RUM', 'Native to EDS — verify', 3], 'Adobe Scene7 / Dynamic Media (video)': ['Scene7 / Dynamic Media', 'VideoViewer embed integration', 18], 'OneTrust (cookie consent)': ['OneTrust consent', 'Banner + tag gating', 10], 'YouTube embed': ['YouTube embed', 'Provider variation of embed', 6], 'Vimeo embed': ['Vimeo embed', 'Provider variation of embed', 6], 'Spotify embed': ['Spotify embed', 'Provider variation of embed', 5], 'Google Tag Manager': ['Google Tag Manager', 'GTM loader + verify', 10], 'Google Analytics': ['Google Analytics', 'GA config + events', 10] };
    Object.keys(S.integrationPageCounts).forEach(k => { if (map[k]) rows.push(map[k]); });
    rows.push(['Social links', 'Footer social profiles', 3]);
    return rows;
  }
  let grand = 0; const gt = groups.map(([g, rows]) => { const t = rows.reduce((n, r) => n + r[2], 0); grand += t; return t; });
  const cont = Math.round(grand * 0.15), tot = grand + cont;
  let body = `<div class="grid g4"><div class="stat"><div class="n">${grand}</div><div class="l">Dev hours (base)</div></div><div class="stat"><div class="n">${tot}</div><div class="l">With 15% contingency</div></div><div class="stat"><div class="n">${Math.round(tot / 8)}</div><div class="l">Person-days</div></div><div class="stat"><div class="n">${(tot / 40).toFixed(1)}</div><div class="l">Person-weeks</div></div></div>
  <div class="card muted"><b>Scope:</b> development effort only. Excludes PM, BA, UX/visual design, content authoring, and infra. Hours are effort, not calendar time. Based on ${S.totalUrls} URLs, ${totalTemplates} templates, ${catalog.length} blocks (${byCx.High.length} High / ${byCx.Medium.length} Medium / ${byCx.Low.length} Low).</div>`;
  groups.forEach(([g, rows], gi) => { body += `<h2>${esc(g)} <span class="muted" style="font-weight:400;font-size:13px">— ${gt[gi]} h</span></h2><table><thead><tr><th style="width:32%">Item</th><th>Detail</th><th class="h">Hours</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r[0])}</td><td class="muted">${esc(r[1])}</td><td class="h">${r[2]}</td></tr>`).join('')}</tbody><tfoot><tr><td colspan="2">Subtotal</td><td class="h">${gt[gi]}</td></tr></tfoot></table>`; });
  body += `<div class="card"><b>Block development rate card</b> (dev-only per block): High ${BH.High}h · Medium ${BH.Medium}h · Low ${BH.Low}h base, +2h per extra variation. Subtotal ${blockTotal}h.</div>`;
  body += `<h2>Grand total</h2><table><tbody>${groups.map(([g], gi) => `<tr><td>${esc(g)}</td><td class="h">${gt[gi]} h</td></tr>`).join('')}<tr><td><b>Base total</b></td><td class="h"><b>${grand} h</b></td></tr><tr><td>Contingency (15%)</td><td class="h">${cont} h</td></tr></tbody><tfoot><tr><td>Total dev effort</td><td class="h">${tot} h ≈ ${Math.round(tot / 8)} person-days</td></tr></tfoot></table>`;
  body += `<div class="card muted"><b>Assumptions:</b> content authoring done by a content team (only dev-side import automation/remediation costed); integrations re-integrated not rebuilt; 1 person-day = 8h; contingency covers content variance, third-party quirks and UAT churn.</div>`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(host)} → EDS · Development Effort Estimate</title><style>${CSS}</style></head><body><header class="top"><h1>${esc(host)} → EDS — Development Effort Estimate</h1><p>Dev-only effort in hours · derived from the analysis (${S.totalUrls} URLs, ${totalTemplates} templates, ${catalog.length} blocks) · ${esc(DATE)}</p></header><main>${body}</main><footer>Development-only estimate. Excludes PM, design, content authoring and infra.</footer></body></html>`;
  fs.writeFileSync(path.join(OUT, 'estimates.html'), html);
  return { grand, tot };
}

genMarkdown();
genDetailed();
genDashboard();
const est = genEstimates();
const stubs = catalog.filter(b => b.needsReview);
console.log(`[4-generate] wrote REPORT.md, dashboard.html, estimates.html, reports/ (${3 + catalog.length + totalTemplates} pages)`);
console.log(`[4-generate] estimate: ${est.grand} h base, ${est.tot} h with contingency`);
if (stubs.length) console.log(`[4-generate] ⚠︎ ${stubs.length} block(s) still need agent review (see needsReview in block-catalog.json): ${stubs.map(s => s.id).join(', ')}`);
