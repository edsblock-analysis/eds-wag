#!/usr/bin/env node
/* Step 2: classify templates + aggregate blocks/variations/integrations.
   Usage: node 2-aggregate.js --urls <file> [--out <dir>]
   Reads <out>/data/pages.json ; writes <out>/data/summary.json + url-templates.json */
const path = require('path');
const L = require('./lib.js');

// Heuristic template classifier. Primary signal: <meta name="template">, refined by structure.
// Generic enough for AEM content sites; falls back to metaTemplate value when unknown.
function classify(p) {
  const t = p.template || 'unknown';
  const url = p.url;
  const isTranscript = /transcript/i.test(url);
  const has = (b) => p.blocks && p.blocks[b];
  const cards = p.cards || {};
  const hasTheater = (p.custom && p.custom.theater) || (p.media && p.media.theaterThumbs) || has('cmp-episode-container');
  const heroCarousel = has('cmp-hero-carousel');
  const richHub = has('cmp-card-container-hero') || has('cmp-slick-carousel') || has('cmp-promo-blocks');

  if (t === 'blank-page-template') {
    if (heroCarousel) return 'home-landing';
    if (richHub) return 'category-hub';
    return 'buying-guide-article';
  }
  if (t === 'page-content') return richHub ? 'category-hub' : 'category-listing';
  if (t === 'article-page') {
    if (isTranscript) return 'video-transcript';
    if (hasTheater) return 'video-episode';
    return 'article';
  }
  // Fallback for unknown/custom templates: infer from structure
  if (heroCarousel) return 'home-landing';
  if (richHub && (cards.total || 0) >= 5) return 'category-hub';
  if ((cards.total || 0) >= 5) return 'category-listing';
  if (isTranscript) return 'video-transcript';
  if (hasTheater) return 'video-episode';
  if (t === 'unknown') return 'article'; // most content pages are articles
  return t;
}

(async () => {
  const args = L.parseArgs(process.argv);
  const dataDir = path.join(args.out, 'data');
  const pages = L.loadJSON(path.join(dataDir, 'pages.json'));

  const templates = {}, blockPages = {}, variationPages = {}, customPages = {}, integrationPages = {}, embedHosts = {};
  const tplBlock = {}, tplVariation = {};
  const cardVarPages = { hero: new Set(), small: new Set(), medium: new Set(), video: new Set() };

  for (const p of pages) {
    const tpl = classify(p); p._tpl = tpl; p._mirror = /\/content\/[a-z-]+\/[a-z]{2}\/[a-z]{2}\//i.test(p.url) || p.url.includes('/content/content-hub/');
    templates[tpl] = templates[tpl] || { count: 0, urls: [], blocks: new Set(), variations: new Set(), custom: new Set() };
    templates[tpl].count++; templates[tpl].urls.push(p.url);
    tplBlock[tpl] = tplBlock[tpl] || {}; tplVariation[tpl] = tplVariation[tpl] || {};

    Object.keys(p.blocks || {}).forEach(b => { (blockPages[b] = blockPages[b] || new Set()).add(p.url); templates[tpl].blocks.add(b); tplBlock[tpl][b] = (tplBlock[tpl][b] || 0) + 1; });
    Object.keys(p.variations || {}).forEach(v => { (variationPages[v] = variationPages[v] || new Set()).add(p.url); templates[tpl].variations.add(v); tplVariation[tpl][v] = (tplVariation[tpl][v] || 0) + 1; });
    Object.keys(p.custom || {}).forEach(c => { (customPages[c] = customPages[c] || new Set()).add(p.url); templates[tpl].custom.add(c); });
    (p.integrations || []).forEach(intg => (integrationPages[intg] = integrationPages[intg] || new Set()).add(p.url));
    (p.embeds || []).forEach(src => { try { const h = new URL(src, p.url).host; embedHosts[h] = (embedHosts[h] || 0) + 1; } catch (e) {} });
    const c = p.cards || {}; ['hero', 'small', 'medium', 'video'].forEach(k => { if (c[k] > 0) cardVarPages[k].add(p.url); });
  }

  const setCount = o => { const r = {}; for (const k in o) r[k] = o[k].size; return r; };
  const summary = {
    slug: args.slug, origin: L.originOf(pages.map(p => p.url)), totalUrls: pages.length, ok: pages.filter(p => p.status === 200).length,
    templateCounts: Object.fromEntries(Object.entries(templates).map(([k, v]) => [k, v.count])),
    templates: Object.fromEntries(Object.entries(templates).map(([k, v]) => [k, { count: v.count, blocks: [...v.blocks].sort(), variations: [...v.variations].sort(), custom: [...v.custom].sort() }])),
    blockPageCounts: setCount(blockPages), variationPageCounts: setCount(variationPages), customPageCounts: setCount(customPages),
    cardVariationPageCounts: setCount(cardVarPages), integrationPageCounts: setCount(integrationPages), embedHosts, tplBlock, tplVariation,
    mirrorCount: pages.filter(p => p._mirror).length,
    spanishCount: pages.filter(p => (p.lang || '').startsWith('es')).length,
  };
  L.writeJSON(path.join(dataDir, 'summary.json'), summary);
  L.writeJSON(path.join(dataDir, 'url-templates.json'), pages.map(p => ({ url: p.url, template: p._tpl, metaTemplate: p.template, mirror: !!p._mirror, cards: p.cards, embeds: p.embeds, integrations: p.integrations, lang: p.lang || 'en' })));

  console.log('[2-aggregate] templates:');
  Object.entries(summary.templateCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
  console.log('[2-aggregate] top components:');
  Object.entries(summary.blockPageCounts).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
  console.log('[2-aggregate] integrations:', Object.keys(summary.integrationPageCounts).join(', ') || '(none)');
})();
