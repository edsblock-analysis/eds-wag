/* Generate the consolidated markdown report from summary + catalog + behaviors. */
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..');
const S = JSON.parse(fs.readFileSync(path.join(__dirname, 'summary.json'), 'utf8'));
const { catalog } = require('./block-catalog.js');
const UT = JSON.parse(fs.readFileSync(path.join(__dirname, 'url-templates.json'), 'utf8'));

const templateMeta = {
  'article': { label: 'Article', desc: 'Standard editorial health/wellness/beauty article: breadcrumb, title + date/read-time, rich-text body, "Explore more" related cards. Includes video-articles (YouTube/Scene7 lead media + optional Featured products + Transcript) and recipe articles (Jump to section).' },
  'category-hub': { label: 'Category Hub', desc: 'Rich editorial landing for a top-level/section category: featured hero card container, "The latest" carousel, promo blocks, paginated article grid, watch-videos gallery, and "Explore more" subcategory tiles with live counts.' },
  'category-listing': { label: 'Category Listing (Community/Series)', desc: 'Community-stories landing pages: section hero, series list / series teasers, curated cards.' },
  'video-episode': { label: 'Video / Podcast Episode', desc: 'Series episode page: Scene7 or Spotify player, "More episodes" carousel with S:E badges, "Read transcript" link.' },
  'video-transcript': { label: 'Video Transcript', desc: 'Plain transcript page paired 1:1 with a video/podcast episode.' },
  'home-landing': { label: 'Home / Landing', desc: 'Site homepage (and its content-hub mirror): hero carousel, trending, featured teaser, editor\'s pick, explore tiles.' },
  'buying-guide-article': { label: 'Buying Guide', desc: 'Buying-guide / OTC-selection article built on the blank template; article body + related cards.' },
};

const tplByCount = Object.entries(S.templateCounts).sort((a, b) => b[1] - a[1]);
const totalTemplates = tplByCount.length;

// Which templates use each block (from catalog)
function fmtPages(n) { return `${n} page${n === 1 ? '' : 's'}`; }

let md = '';
md += `# blog.walgreens.com — EDS Migration Functional Analysis\n\n`;
md += `**Source site:** https://blog.walgreens.com/ ("The Thread" by Walgreens)\n`;
md += `**Platform detected:** Adobe Experience Manager (AEM) Sites using WCM Core Components (\`cmp-*\`), Experience Fragments for header/footer, Scene7/Dynamic Media for video, Adobe Client Data Layer + Adobe Launch for analytics, OneTrust for consent.\n`;
md += `**Analysis date:** 2026-09-05\n`;
md += `**Method:** Every one of the ${S.totalUrls} URLs in \`url/blog-walgreens.txt\` was individually fetched (HTTP 200 for all ${S.ok}) and its DOM parsed for components, variations, embeds and integrations. Interactive behavior was verified live with Playwright on representative pages of every template and every interactive block (navigation drawer, predictive search, hero carousel, category pagination, "The latest" carousel, jump-to-section, YouTube/Spotify/Scene7 players, episode carousel). Findings below are based on observed evidence, not extrapolation.\n\n`;

md += `> **Note on totals.** ${countMirror()} of the ${S.totalUrls} URLs are content-hub mirror paths (\`/content/content-hub/us/en/...\`) that duplicate public article/hub URLs. They are counted in the crawl but represent the same authored content; the effective unique authored page count is ~${S.totalUrls - countMirror()}. 30 URLs are Spanish-language variants of English articles (same templates/blocks).\n\n`;

md += `---\n\n## 1. Executive Summary\n\n`;
md += `| Metric | Value |\n|---|---|\n`;
md += `| Total URLs analyzed | **${S.totalUrls}** (all HTTP 200) |\n`;
md += `| Unique page templates | **${totalTemplates}** |\n`;
md += `| EDS blocks to develop | **${catalog.length}** |\n`;
md += `| Total block variations | **${catalog.reduce((n, b) => n + b.variations.length, 0)}** |\n`;
md += `| Content-hub mirror (duplicate) URLs | ${countMirror()} |\n`;
md += `| Spanish-language pages | 30 |\n`;
md += `| High-complexity blocks | ${catalog.filter(b => b.complexity === 'High').length} |\n`;
md += `| Third-party integrations | ${Object.keys(S.integrationPageCounts).length + 1} (see §7) |\n\n`;

md += `---\n\n## 2. Templates\n\n`;
md += `**${totalTemplates} unique templates** identified (primary signal: each page's \`<meta name="template">\`, refined by structural evidence). Page counts:\n\n`;
md += `| # | Template | Pages | Description |\n|---|---|---|---|\n`;
tplByCount.forEach(([t, c], i) => {
  const m = templateMeta[t] || { label: t, desc: '' };
  md += `| ${i + 1} | **${m.label}** (\`${t}\`) | ${c} | ${m.desc} |\n`;
});
md += `\n**Total: ${S.totalUrls} pages across ${totalTemplates} templates.**\n\n`;

md += `---\n\n## 3. Block Inventory (with variations & page usage)\n\n`;
md += `${catalog.length} blocks / ${catalog.reduce((n, b) => n + b.variations.length, 0)} variations. "Pages" = number of the ${S.totalUrls} crawled pages the block/variation appears on (from DOM evidence).\n\n`;
md += `| Block | EDS block name | Complexity | Pages | Variations (pages) |\n|---|---|---|---|---|\n`;
catalog.forEach(b => {
  const vars = b.variations.map(v => `${v.name} (${v.pages})`).join('; ');
  md += `| **${b.name}** | \`${b.edsBlock}\` | ${b.complexity} | ${b.pages} | ${vars} |\n`;
});
md += `\n`;

md += `---\n\n## 4. Template → Block → Variation Mapping\n\n`;
tplByCount.forEach(([t, c]) => {
  const m = templateMeta[t] || { label: t };
  md += `### ${m.label} (\`${t}\`) — ${c} pages\n\n`;
  const blocks = catalog.filter(b => b.templates.includes(t) || b.templates.includes('all'));
  md += `| Block | Variations used | Notes |\n|---|---|---|\n`;
  blocks.forEach(b => {
    const vs = b.variations.map(v => v.name).join(', ');
    md += `| ${b.name} | ${vs} | ${b.templates.includes('all') ? 'Global (header/footer/search/social)' : ''} |\n`;
  });
  md += `\n`;
});

md += `---\n\n## 5. Block Functional Requirements\n\n`;
catalog.forEach(b => {
  md += `### ${b.name} (\`${b.edsBlock}\`)\n\n`;
  md += `- **Appears on:** ${fmtPages(b.pages)}  \n`;
  md += `- **Templates:** ${b.templates.join(', ')}  \n`;
  md += `- **Variations:** ${b.variations.map(v => `**${v.name}** — ${v.desc} (${v.pages} pages)`).join('; ')}\n\n`;
  md += `**Functionality / behavior:**\n`;
  b.functional.forEach(f => md += `- ${f}\n`);
  md += `\n`;
});

md += `---\n\n## 6. Acceptance Criteria (per block)\n\n`;
md += `Derived from observed behavior (Playwright-verified where interactive).\n\n`;
catalog.forEach(b => {
  md += `### ${b.name}\n\n`;
  b.acceptance.forEach(a => md += `- [ ] ${a}\n`);
  md += `\n`;
});

md += `---\n\n## 7. Third-Party Integrations\n\n`;
md += `| Integration | Purpose | Pages | Used by (templates / blocks) |\n|---|---|---|---|\n`;
const intgRows = [
  ['Adobe Launch / DTM', 'Tag management & analytics', S.integrationPageCounts['Adobe Launch/DTM (Analytics tag mgmt)'] || 0, 'All templates (global)'],
  ['Adobe Client Data Layer', 'Analytics data layer (page/interaction events)', S.integrationPageCounts['Adobe Client Data Layer'] || 0, 'All templates (global)'],
  ['Adobe Helix RUM', 'Real User Monitoring (rum.hlx.page)', S.integrationPageCounts['Adobe Helix RUM'] || 0, 'All templates (global)'],
  ['Adobe Scene7 / Dynamic Media', 'Video hosting & VideoViewer player', S.integrationPageCounts['Scene7 / Dynamic Media (video)'] || 0, 'Video embed, Watch Videos, Episode container (player JS loaded globally)'],
  ['OneTrust', 'Cookie consent / privacy banner', S.integrationPageCounts['OneTrust (cookie consent)'] || 0, 'All templates (global)'],
  ['YouTube', 'In-article video embeds', S.integrationPageCounts['YouTube embed'] || 0, 'Video-article variant (article), category-hub'],
  ['Spotify', 'Podcast episode embeds', S.integrationPageCounts['Spotify embed'] || 0, 'Video/podcast episode template'],
  ['walgreens.com (commerce)', '"Featured products" PDP deep-links & footer/store links', 5, 'Video-article "Featured products"; footer "Visit Walgreens.com"'],
  ['Social platforms', 'Footer profile links (Pinterest, Facebook, X, Instagram)', S.blockPageCounts['cmp-social-media'] || 0, 'Footer / Social Media block'],
  ['AEM search servlet', 'Predictive search JSON endpoint (to be replaced by an EDS index query in migration)', S.blockPageCounts['cmp-search'] || 0, 'Search block (all pages)'],
];
intgRows.forEach(r => md += `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} |\n`);
md += `\n**Migration note:** Analytics (Launch/Client Data Layer), consent (OneTrust) and search are AEM/global services. In EDS, RUM is native; Launch/OneTrust can be re-added via the site's \`head.html\`/scripts; predictive search must be rebuilt against an EDS index (e.g. \`query-index.json\`). Scene7 videos can be retained via embed or migrated to EDS video handling.\n\n`;

md += `---\n\n## 8. Block Complexity\n\n`;
md += `| Block | Complexity | Reason |\n|---|---|---|\n`;
['High', 'Medium', 'Low'].forEach(level => {
  catalog.filter(b => b.complexity === level).forEach(b => {
    md += `| **${b.name}** | ${b.complexity} | ${b.complexityReason} |\n`;
  });
});
const hi = catalog.filter(b => b.complexity === 'High').length;
const me = catalog.filter(b => b.complexity === 'Medium').length;
const lo = catalog.filter(b => b.complexity === 'Low').length;
md += `\n**Distribution:** High: ${hi} · Medium: ${me} · Low: ${lo}.\n\n`;

md += `---\n\n## 9. Migration Notes & Recommendations\n\n`;
md += `- **Effort concentration:** ${S.templateCounts.article || 0} of ${S.totalUrls} pages (~${Math.round(((S.templateCounts.article||0)/S.totalUrls)*100)}%) use the **Article** template — a low-complexity, content-driven page. The bulk of migration effort is *content authoring volume*, not block complexity.\n`;
md += `- **High-complexity blocks** (header/nav drawer, predictive search, hero carousel, carousels, client-side pagination, video/embed, watch-videos, episode container) are concentrated on the homepage (${S.templateCounts['home-landing']||0}), category hubs (${S.templateCounts['category-hub']||0}) and video pages (${(S.templateCounts['video-episode']||0)}), i.e. a small number of pages — build these blocks once and reuse.\n`;
md += `- **Card** is the single most reused unit (${S.blockPageCounts['cmp-card']||0} pages, 4 variations); prioritize it.\n`;
md += `- **Content-hub mirror URLs (${countMirror()})** and **Spanish variants (30)** reuse the same templates/blocks — no additional block work, only content.\n`;
md += `- **Video/podcast** content spans 3 providers (Scene7, YouTube, Spotify) — a single \`embed\` block with provider variations covers all.\n`;
md += `- Header, footer, search and social are **global** (Experience Fragments) — implement as EDS nav/footer + shared scripts.\n\n`;

md += `---\n\n*Generated from live crawl evidence. Supporting data: \`data/pages.json\` (per-URL), \`data/summary.json\` (aggregates), \`data/block-catalog.json\` (blocks), \`data/observed-behaviors.json\` (Playwright findings), \`data/url-templates.json\` (per-URL template assignment). Interactive dashboard: \`dashboard.html\`.*\n`;

function countMirror() { return UT.filter(u => u.mirror).length; }

fs.writeFileSync(path.join(OUT, 'REPORT.md'), md);
console.log('Wrote REPORT.md (' + md.length + ' chars)');
