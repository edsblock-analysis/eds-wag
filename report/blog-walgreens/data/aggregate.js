/* Aggregate pages.json into templates, blocks, variations, integrations. */
const fs = require('fs');
const path = require('path');
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf8'));

// ---- Template classification ----
// Primary: <meta name="template">. Secondary refinement using structure + URL depth.
function classify(p) {
  const t = p.template || 'unknown';
  const url = p.url;
  const seg = url.replace('https://blog.walgreens.com/', '').replace(/\.html$/, '').split('/').filter(Boolean);
  const depth = seg.length;
  const isTranscript = /transcript/i.test(url);
  const cards = p.cards || {};
  const hasListing = (cards.total || 0) >= 5;
  const hasTheater = (p.custom && p.custom.theater) || (p.media && p.media.theaterThumbs);

  const has = (b) => p.blocks && p.blocks[b];
  const heroCarousel = has('cmp-hero-carousel');
  const richHub = has('cmp-card-container-hero') || has('cmp-slick-carousel') || has('cmp-promo-blocks');

  // Refine within meta template
  if (t === 'blank-page-template') {
    if (heroCarousel) return 'home-landing';        // true homepage (+ content-hub mirror)
    if (richHub) return 'category-hub';             // rich editorial landing (e.g. vaccines-immunizations)
    return 'buying-guide-article';                  // buying-guides + otc guides (article-like on blank tpl)
  }
  if (t === 'page-content') {
    if (richHub) return 'category-hub';             // curated editorial hub (health.html, beauty.html, etc.)
    return 'category-listing';                      // plain paginated listing
  }
  if (t === 'article-page') {
    if (isTranscript) return 'video-transcript';
    if (hasTheater) return 'video-episode';
    return 'article';
  }
  return t;
}

const templates = {};       // template -> {count, urls[], blocks:Set, variations:Set}
const blockPages = {};      // block -> Set(url)
const variationPages = {};  // variation -> Set(url)
const customPages = {};     // custom widget -> Set(url)
const integrationPages = {};// integration -> Set(url)
const embedHosts = {};      // host -> count
const tplBlock = {};        // template -> {block -> count}
const tplVariation = {};    // template -> {variation -> count}

for (const p of pages) {
  const tpl = classify(p);
  p._tpl = tpl;
  p._mirror = p.url.includes('/content/content-hub/');
  templates[tpl] = templates[tpl] || { count: 0, urls: [], blocks: new Set(), variations: new Set(), custom: new Set() };
  templates[tpl].count++;
  templates[tpl].urls.push(p.url);
  tplBlock[tpl] = tplBlock[tpl] || {};
  tplVariation[tpl] = tplVariation[tpl] || {};

  Object.keys(p.blocks || {}).forEach(b => {
    (blockPages[b] = blockPages[b] || new Set()).add(p.url);
    templates[tpl].blocks.add(b);
    tplBlock[tpl][b] = (tplBlock[tpl][b] || 0) + 1;
  });
  Object.keys(p.variations || {}).forEach(v => {
    (variationPages[v] = variationPages[v] || new Set()).add(p.url);
    templates[tpl].variations.add(v);
    tplVariation[tpl][v] = (tplVariation[tpl][v] || 0) + 1;
  });
  Object.keys(p.custom || {}).forEach(c => {
    (customPages[c] = customPages[c] || new Set()).add(p.url);
    templates[tpl].custom.add(c);
  });
  (p.integrations || []).forEach(intg => {
    (integrationPages[intg] = integrationPages[intg] || new Set()).add(p.url);
  });
  (p.embeds || []).forEach(src => {
    try { const h = new URL(src, p.url).host; embedHosts[h] = (embedHosts[h] || 0) + 1; } catch (e) {}
  });
}

// Card variation page counts (special-cased since they are the core listing unit)
const cardVarPages = { hero: new Set(), small: new Set(), medium: new Set(), video: new Set() };
for (const p of pages) {
  const c = p.cards || {};
  ['hero', 'small', 'medium', 'video'].forEach(k => { if (c[k] > 0) cardVarPages[k].add(p.url); });
}

function setToCount(obj) { const o = {}; for (const k in obj) o[k] = obj[k].size; return o; }

const summary = {
  totalUrls: pages.length,
  ok: pages.filter(p => p.status === 200).length,
  templates: Object.fromEntries(Object.entries(templates).map(([k, v]) => [k, { count: v.count, blocks: [...v.blocks].sort(), variations: [...v.variations].sort(), custom: [...v.custom].sort() }])),
  templateCounts: Object.fromEntries(Object.entries(templates).map(([k, v]) => [k, v.count])),
  blockPageCounts: setToCount(blockPages),
  variationPageCounts: setToCount(variationPages),
  customPageCounts: setToCount(customPages),
  cardVariationPageCounts: setToCount(cardVarPages),
  integrationPageCounts: setToCount(integrationPages),
  embedHosts,
  tplBlock,
  tplVariation,
};

fs.writeFileSync(path.join(__dirname, 'summary.json'), JSON.stringify(summary, null, 1));
// Also persist template assignment per url
fs.writeFileSync(path.join(__dirname, 'url-templates.json'),
  JSON.stringify(pages.map(p => ({ url: p.url, template: p._tpl, metaTemplate: p.template, mirror: p._mirror, cards: p.cards, embeds: p.embeds, integrations: p.integrations, lang: p.lang })), null, 1));

const mirrorCount = pages.filter(p => p._mirror).length;
console.log('\n=== CONTENT-HUB MIRROR pages (duplicate /content/content-hub/ paths) ===\n  ' + mirrorCount);

// Console report
console.log('=== TEMPLATES (count) ===');
Object.entries(summary.templateCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`));
console.log('\n=== TOP BLOCKS (page count) ===');
Object.entries(summary.blockPageCounts).sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`));
console.log('\n=== VARIATIONS (page count) ===');
Object.entries(summary.variationPageCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`));
console.log('\n=== CARD VARIATIONS (page count) ===');
Object.entries(summary.cardVariationPageCounts).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  card--${k}`));
console.log('\n=== CUSTOM WIDGETS (page count) ===');
Object.entries(summary.customPageCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`));
console.log('\n=== INTEGRATIONS (page count) ===');
Object.entries(summary.integrationPageCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`));
console.log('\n=== EMBED HOSTS ===');
Object.entries(summary.embedHosts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v.toString().padStart(4)}  ${k}`));
