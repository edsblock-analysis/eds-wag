/* Generate a DEV-ONLY effort estimate (hours) for the blog.walgreens.com -> EDS
   migration. Standalone report/blog-walgreens/estimates.html (NOT linked from any
   other page). Numbers tie to the analysis evidence (block-catalog.json, summary.json). */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const S = JSON.parse(fs.readFileSync(path.join(__dirname, 'summary.json'), 'utf8'));
const { catalog } = require('./block-catalog.js');

const esc = s => (s == null ? '' : String(s)).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// ---- effort model (dev hours) ----
// Per-block build effort = JS decoration + CSS + content-model + block-level unit/browser test.
const BLOCK_HOURS = { High: 26, Medium: 15, Low: 8 };
const blocksByCx = { High: [], Medium: [], Low: [] };
catalog.forEach(b => blocksByCx[b.complexity].push(b));
const blockDevRows = catalog.map(b => ({
  item: b.name + ' (' + b.variations.length + ' variation' + (b.variations.length === 1 ? '' : 's') + ')',
  detail: b.edsBlock + ' — ' + b.complexity + ' complexity',
  hours: BLOCK_HOURS[b.complexity] + (b.variations.length > 1 ? (b.variations.length - 1) * 2 : 0),
}));
const blockDevTotal = blockDevRows.reduce((n, r) => n + r.hours, 0);

const totalPages = S.totalUrls;
const uniquePages = 754;   // 804 minus 50 content-hub mirror duplicates
const spanish = 30;
const templates = Object.keys(S.templateCounts).length;

// group definitions: [group, [ [item, detail, hours], ... ] ]
const groups = [
  ['1 · Project setup & environment', [
    ['Repo & boilerplate setup', 'Fork aem-boilerplate, wire GitHub, AEM Code Sync, aem-cli, .hlxignore, branch/PR workflow', 12],
    ['Local dev environment & CI', 'aem up local proxy, npm scripts, ESLint/Stylelint config, Husky, GitHub Actions checks', 10],
    ['Site config (tools.aem.live)', 'fstab/paths config, sidekick config, preview/publish setup, robots/sitemap wiring', 8],
    ['Global styles & design tokens', 'Extract typography, colour, spacing tokens from source; styles.css, fonts, CSS custom properties', 20],
    ['Core decoration (scripts.js/aem.js layer)', 'Section decoration, eager/lazy loading, buildAutoBlocks, block loader conventions', 16],
    ['Header + Footer (Experience Fragment equivalents)', 'Global nav/footer scaffolding shared across all pages (block builds costed separately)', 10],
  ]],
  ['2 · Page templates', [
    ['Template scaffolding (7 templates)', 'Article, Category Hub, Category Listing, Video Episode, Video Transcript, Home/Landing, Buying Guide — section models, metadata, per-template CSS', 7 * 6],
    ['Template-level responsive & layout QA', 'Grid/section layout verification per template across breakpoints', 14],
  ]],
  ['3 · Block development', blockDevRows.map(r => [r.item, r.detail, r.hours])],
  ['4 · Content migration (import automation & execution)', [
    ['Import script scaffolding', 'Bundled import script, run-bulk-import harness, images/DAM handling', 16],
    ['Block parsers', 'Per-block/variant parser files mapping source DOM → block tables (24 blocks / 36 variations)', 72],
    ['Page transformers', 'Cleanup, section-break, Dynamic Media/Scene7 and metadata transformers', 24],
    ['Page template mapping (page-templates.json)', 'DOM-selector mapping + block-mapping-manager per template', 16],
    ['Bulk import execution', 'Run import for ' + totalPages + ' URLs, monitor, re-run failures', 16],
    ['Post-import validation tooling', 'Automated source-vs-output content-completeness scoring across all pages', 20],
    ['Post-import remediation', 'Fix systemic parser gaps + spot-fix flagged pages (dev remediation, not authoring)', 60],
    ['Spanish-language variants', 'Verify/handle ' + spanish + ' es-language pages (same templates, locale handling)', 8],
    ['Content-hub mirror & redirects', 'Handle 50 duplicate /content/content-hub/ paths + redirect map', 10],
  ]],
  ['5 · Third-party integrations', [
    ['Predictive search (rebuild on EDS index)', 'query-index.json config + client-side typeahead against index (backend of Search block; min-length/results/loading/clear)', 28],
    ['Adobe Launch / DTM', 'Re-add tag manager loader in head/scripts, verify tags fire', 12],
    ['Adobe Client Data Layer', 'Re-implement page + interaction analytics events (nav, search, carousel, video, pagination)', 24],
    ['Adobe Helix RUM', 'Native to EDS — verify sampling/config', 3],
    ['Scene7 / Dynamic Media video', 'VideoViewer embed integration for video embed / watch-videos / episodes', 18],
    ['OneTrust cookie consent', 'Consent banner script + gating of tags', 10],
    ['YouTube embed', 'Provider variation of embed block (lazy facade + play)', 6],
    ['Spotify podcast embed', 'Provider variation of embed block', 5],
    ['walgreens.com commerce links', '"Featured products" PDP deep-links + footer store links (link handling/validation)', 6],
    ['Social media links', 'Footer social profile links (Pinterest/Facebook/X/Instagram)', 3],
  ]],
  ['6 · Cross-cutting quality', [
    ['Responsive implementation & QA', 'Mobile/tablet/desktop across all blocks & templates (drawer nav, carousels, grids)', 32],
    ['Accessibility (WCAG)', 'Keyboard nav, ARIA, focus states, screen-reader passes on interactive blocks', 28],
    ['Performance / Core Web Vitals', 'LCP/CLS/INP tuning, image optimization, lazy-loading, Lighthouse ≥ target', 24],
    ['SEO & metadata', 'Metadata mapping, canonical, sitemap, structured data parity with source', 14],
    ['Cross-browser QA', 'Chrome/Safari/Firefox/Edge + iOS/Android verification', 16],
    ['Integration/E2E test suite', 'Automated tests for interactive blocks (search, nav, carousel, pagination, video)', 24],
    ['UAT support & defect fixing', 'Dev time to triage/fix issues raised during UAT', 40],
  ]],
];

// compute
let grand = 0;
const groupTotals = groups.map(([g, rows]) => {
  const t = rows.reduce((n, r) => n + r[2], 0);
  grand += t;
  return t;
});
const contingency = Math.round(grand * 0.15);
const grandWithCont = grand + contingency;

const CSS = `
:root{--bg:#f4f7fb;--panel:#ffffff;--panel2:#eef3f9;--line:#d9e1ec;--txt:#1a2432;--mut:#5c6b80;--brand:#1560bd;--accent:#1560bd;--hi:#c0392b;--me:#9a6a00;--lo:#1e8f5b}
*{box-sizing:border-box}body{margin:0;font:14px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--txt)}
header.top{padding:22px 28px;background:linear-gradient(90deg,#0b3d91,#1560bd 55%,#2f80ed);color:#fff}
header.top h1{margin:0;font-size:20px}header.top p{margin:6px 0 0;opacity:.9;font-size:13px}
main{padding:24px 28px;max-width:1080px;margin:0 auto}
h2{font-size:16px;margin:30px 0 6px;border-left:3px solid var(--brand);padding-left:10px}
table{width:100%;border-collapse:collapse;font-size:13px;margin:8px 0 4px}
th,td{text-align:left;padding:9px 11px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--mut);font-weight:600}
td.h,th.h{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
tr:hover td{background:var(--panel2)}
tfoot td{font-weight:700;border-top:2px solid var(--line);background:var(--panel)}
.grid{display:grid;gap:12px;grid-template-columns:repeat(4,1fr)}@media(max-width:760px){.grid{grid-template-columns:1fr 1fr}}
.stat{text-align:center;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px}
.stat .n{font-size:26px;font-weight:700}.stat .l{color:var(--mut);font-size:12px;margin-top:3px}
.muted{color:var(--mut)}
.tag{font-family:ui-monospace,Menlo,monospace;font-size:11px;background:var(--panel2);padding:1px 6px;border-radius:4px;color:var(--accent)}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px;margin:14px 0}
ul.f{margin:6px 0;padding-left:18px}ul.f li{margin:4px 0}
.summary-tbl td:first-child{width:60%}
.pill{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:600;background:var(--panel2);color:var(--accent)}
footer{padding:18px 28px;color:var(--mut);font-size:12px;border-top:1px solid var(--line);margin-top:30px}
`;

let body = '';
body += `<div class="grid">
  <div class="stat"><div class="n">${grand}</div><div class="l">Dev hours (base)</div></div>
  <div class="stat"><div class="n">${grandWithCont}</div><div class="l">With 15% contingency</div></div>
  <div class="stat"><div class="n">${Math.round(grandWithCont / 8)}</div><div class="l">Person-days (÷8h)</div></div>
  <div class="stat"><div class="n">${(grandWithCont / 8 / 5).toFixed(1)}</div><div class="l">Person-weeks (5d)</div></div>
</div>`;

body += `<div class="card muted"><b>Scope:</b> development effort only (engineering). Excludes project management, business analysis, UX/visual design, copywriting/content authoring, QA-analyst salaries, and hosting/infra costs. Figures are effort <b>hours</b>, not calendar time. Based on the evidence in this analysis: <b>${totalPages}</b> URLs, <b>${templates}</b> templates, <b>${catalog.length}</b> blocks (${blocksByCx.High.length} High / ${blocksByCx.Medium.length} Medium / ${blocksByCx.Low.length} Low), <b>${catalog.reduce((n,b)=>n+b.variations.length,0)}</b> variations.</div>`;

// group tables
groups.forEach(([g, rows], gi) => {
  body += `<h2>${esc(g)} <span class="muted" style="font-weight:400;font-size:13px">— ${groupTotals[gi]} h</span></h2>`;
  body += `<table><thead><tr><th style="width:32%">Item</th><th>Detail</th><th class="h">Hours</th></tr></thead><tbody>`;
  rows.forEach(r => {
    body += `<tr><td>${esc(r[0])}</td><td class="muted">${esc(r[1])}</td><td class="h">${r[2]}</td></tr>`;
  });
  body += `</tbody><tfoot><tr><td colspan="2">Subtotal</td><td class="h">${groupTotals[gi]}</td></tr></tfoot></table>`;
});

// block dev complexity note
body += `<div class="card"><b>Block development rate card</b> (per block, dev-only: JS + CSS + content model + block-level test):
<ul class="f">
<li>High complexity — ${BLOCK_HOURS.High} h base &nbsp;(${blocksByCx.High.length} blocks: ${blocksByCx.High.map(b=>esc(b.name)).join(', ')})</li>
<li>Medium complexity — ${BLOCK_HOURS.Medium} h base &nbsp;(${blocksByCx.Medium.length} blocks)</li>
<li>Low complexity — ${BLOCK_HOURS.Low} h base &nbsp;(${blocksByCx.Low.length} blocks)</li>
<li>+2 h per additional variation beyond the first.</li>
</ul>
Block development subtotal: <b>${blockDevTotal} h</b>.</div>`;

// grand summary
body += `<h2>Grand total</h2>`;
body += `<table class="summary-tbl"><tbody>`;
groups.forEach(([g], gi) => { body += `<tr><td>${esc(g)}</td><td class="h">${groupTotals[gi]} h</td></tr>`; });
body += `<tr><td><b>Base development total</b></td><td class="h"><b>${grand} h</b></td></tr>`;
body += `<tr><td>Contingency / risk buffer (15%)</td><td class="h">${contingency} h</td></tr>`;
body += `</tbody><tfoot><tr><td>Total dev effort (with contingency)</td><td class="h">${grandWithCont} h &nbsp;≈ ${Math.round(grandWithCont/8)} person-days</td></tr></tfoot></table>`;

body += `<div class="card muted"><b>Assumptions:</b>
<ul class="f">
<li>Content <b>authoring</b> of ${uniquePages} unique pages (~${spanish} Spanish variants; 50 mirror duplicates excluded) is handled by a content team — only dev-side <b>import automation, remediation and tooling</b> is costed here (Group 4).</li>
<li>Predictive search is rebuilt against an EDS index (query-index.json); the Search block UI is in Group 3 and its index/backend is in Group 5.</li>
<li>Analytics (Launch/Client Data Layer), consent (OneTrust) and video (Scene7/YouTube/Spotify) are re-integrated, not re-built from scratch.</li>
<li>Rates: 1 person-day = 8 h; 1 person-week = 5 days. Adjust for team seniority and parallelism.</li>
<li>Contingency (15%) covers unknowns in source-content variance, third-party quirks and UAT churn.</li>
</ul></div>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>blog.walgreens.com → EDS · Development Effort Estimate</title><style>${CSS}</style></head><body>
<header class="top"><h1>blog.walgreens.com → EDS — Development Effort Estimate</h1><p>Dev-only effort in hours · derived from the site analysis (${totalPages} URLs, ${templates} templates, ${catalog.length} blocks) · 2026-09-05</p></header>
<main>${body}</main>
<footer>Development-only effort estimate. Excludes PM, design, content authoring and infra. Hours are effort, not calendar time.</footer>
</body></html>`;

fs.writeFileSync(path.join(OUT, 'estimates.html'), html);
console.log('Wrote estimates.html');
console.log('Base:', grand, 'h · +15% =', grandWithCont, 'h ·', Math.round(grandWithCont/8), 'person-days');
groups.forEach(([g], gi) => console.log('  ' + groupTotals[gi] + 'h  ' + g));
