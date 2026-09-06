#!/usr/bin/env node
/* Step 2: classify templates + aggregate blocks/variations/integrations.
   Usage: node 2-aggregate.js --urls <file> [--out <dir>]
   Reads <out>/data/pages.json ; writes <out>/data/summary.json + url-templates.json */
const path = require('path');
const L = require('./lib.js');

// Heuristic template classifier. Primary signal: <meta name="template">, refined by structure.
// Generic enough for AEM content sites; falls back to metaTemplate value when unknown.
// Order of precedence: explicit meta-template families (blog/content) > named-hero page
// types (bespoke marketing sites) > structural fallback.
const blockKeys = (p) => Object.keys(p.blocks || {});
// A named hero like cmp-about-hero / cmp-solutions-detail-hero strongly identifies a page
// type on bespoke AEM sites. Return a normalized template id derived from it, else null.
const HERO_NOT_PAGETYPE = new Set(['cmp-hero-carousel', 'cmp-card-container-hero', 'cmp-hero']);
function heroPageType(p) {
  // Only treat *named* section heroes (cmp-<name>-hero) as page-type signals, and only
  // when there is exactly one — this is the bespoke-marketing-site pattern. Generic heroes
  // (hero-carousel, card-container-hero, plain hero) are NOT page-type markers.
  const named = blockKeys(p).filter(k => /^cmp-[a-z0-9-]+-hero$/.test(k) && !HERO_NOT_PAGETYPE.has(k));
  if (named.length !== 1) return null;
  const base = named[0].replace(/^cmp-/, '').replace(/-hero$/, '');
  return 'page-' + base;
}
// Commerce/SPA page-type from data-testid families (react-testid-blocks.json page hints)
// + URL heuristics. Returns a template id or null.
const TESTID_FAM = (() => { try { return require('./knowledge/react-testid-blocks.json').testidFamilies || []; } catch (e) { return []; } })();
function spaPageType(p) {
  const spa = p.spaBlocks || {};
  const has = (b) => spa[b] > 0;
  const u = p.url.toLowerCase();
  // URL structure is the most reliable signal on this kind of site — check it FIRST,
  // because cart-icon / account-auth appear in the GLOBAL HEADER on every page and would
  // otherwise mis-classify content/home pages as "cart".
  if (/\/storelocator\//.test(u)) return 'store-locator';           // store search/results by area
  if (/\/(locator|store)\//.test(u)) return 'store-detail';          // individual store page
  if (/\/rx-checkout\//.test(u)) return 'rx-checkout';
  if (/\/(cart|checkout)(\/|$|\?)/.test(u)) return 'cart';
  if (/\/findcare/.test(u)) return 'find-care';
  if (/\/(youraccount|register|password|mywalgreens|familymgmt|caremanagement)/.test(u)) return 'account';
  if (/\/q\//.test(u) || /\/search/.test(u) || /\/store\/c\/productlist/.test(u)) return 'plp'; // search/browse results = product listing
  if (/\/store\/c\/.*-product/.test(u) || /ID=[0-9a-z]+-product/i.test(u)) return 'pdp';        // product detail
  // Component signals (only when URL is inconclusive). Ignore cart/account (global chrome).
  if (has('product-detail')) return 'pdp';
  if (has('product-listing') || has('product-filters')) return 'plp';
  return null;
}
function classify(p) {
  const t = p.template || 'unknown';
  const url = p.url;
  const isTranscript = /transcript/i.test(url);
  const has = (b) => p.blocks && p.blocks[b];
  const cards = p.cards || {};
  const notableCount = blockKeys(p).filter(k => !/^cmp-(container|experiencefragment|button|image|text|title|list|separator|header|footer|social-media)/.test(k)).length;
  const spaCount = Object.keys(p.spaBlocks || {}).length;
  const hasTheater = (p.custom && p.custom.theater) || (p.media && p.media.theaterThumbs) || has('cmp-episode-container');
  const heroCarousel = has('cmp-hero-carousel');
  const richHub = has('cmp-card-container-hero') || has('cmp-slick-carousel') || has('cmp-promo-blocks');

  // Non-200 responses (403/404/500/timeouts) and true redirect/non-HTML/empty stubs
  // (visible-text based; see extractor) are not real content pages.
  if ((p.status && p.status !== 200) || p.error || p.isRedirect) return 'redirect-stub';

  // Commerce / SPA page types (React sites with data-testid components, few/no cmp-*).
  if (spaCount || /\/(storelocator|locator|store|cart|rx-checkout|checkout|findcare|youraccount|register|password|mywalgreens|familymgmt|caremanagement|q|search)\b/i.test(url)) {
    const spt = spaPageType(p);
    if (spt) return spt;
  }
  if (t === 'unknown' && notableCount === 0 && spaCount === 0) return 'content-page'; // real page, generic content

  // Blog-style meta template families (keeps blog.walgreens.com behavior intact)
  if (t === 'blank-page-template') {
    if (heroCarousel) return 'home-landing';
    if (richHub) return 'category-hub';
    return 'buying-guide-article';
  }
  if (t === 'article-page') {
    if (isTranscript) return 'video-transcript';
    if (hasTheater) return 'video-episode';
    return 'article';
  }
  // meta=page-content on a content site is a curated hub when it has hub components
  // (card-container-hero / slick-carousel / promo-blocks) — classify before hero-derivation
  // so blog category hubs stay 'category-hub' regardless of card count.
  if (t === 'page-content' && richHub) return 'category-hub';

  // Bespoke marketing sites: many pages share meta=page-content but are distinct layouts.
  // Prefer an explicit non-generic meta template, else derive the type from the named hero.
  if (t && !['page-content', 'unknown', 'article-page', 'blank-page-template'].includes(t)) {
    return t; // explicit custom template (e.g. page-case-studies, page-contact, page-insight)
  }
  // Homepage: root URL with a rich composition but no single named hero → home-landing
  try { if (new URL(url).pathname.replace(/\/$/, '') === '' && notableCount >= 4) return 'home-landing'; } catch (e) {}
  const ht = heroPageType(p);
  if (ht) return ht;
  if (heroCarousel) return 'home-landing';

  // Structural fallback (blog-style content sites)
  if (richHub && (cards.total || 0) >= 5) return 'category-hub';
  if ((cards.total || 0) >= 5) return 'category-listing';
  if (isTranscript) return 'video-transcript';
  if (hasTheater) return 'video-episode';
  if (t === 'page-content') return 'category-listing';
  if (t === 'unknown') return 'article';
  return t;
}

(async () => {
  const args = L.parseArgs(process.argv);
  const dataDir = path.join(args.out, 'data');
  const pages = L.loadJSON(path.join(dataDir, 'pages.json'));

  const DET = L.loadJSON(path.join(__dirname, 'knowledge', 'detectors.json'));
  const intgCategory = Object.fromEntries((DET.integrations || []).map(d => [d.name, d.category || 'Other']));

  const templates = {}, blockPages = {}, variationPages = {}, customPages = {}, integrationPages = {}, embedHosts = {};
  const genericBlockPages = {}, unknownHostPages = {}, formKindPages = {}, formActionHosts = {}, journeyPages = {};
  const tplBlock = {}, tplVariation = {};
  const cardVarPages = { hero: new Set(), small: new Set(), medium: new Set(), video: new Set() };
  const allForms = [];

  for (const p of pages) {
    const tpl = classify(p); p._tpl = tpl; p._mirror = /\/content\/[a-z-]+\/[a-z]{2}\/[a-z]{2}\//i.test(p.url) || p.url.includes('/content/content-hub/');
    templates[tpl] = templates[tpl] || { count: 0, urls: [], blocks: new Set(), variations: new Set(), custom: new Set() };
    templates[tpl].count++; templates[tpl].urls.push(p.url);
    tplBlock[tpl] = tplBlock[tpl] || {}; tplVariation[tpl] = tplVariation[tpl] || {};

    Object.keys(p.blocks || {}).forEach(b => { (blockPages[b] = blockPages[b] || new Set()).add(p.url); templates[tpl].blocks.add(b); tplBlock[tpl][b] = (tplBlock[tpl][b] || 0) + 1; });
    // SPA/React blocks (data-testid families) are first-class blocks; namespace with spa: so
    // the catalog builder maps them via react-testid-blocks.json.
    Object.keys(p.spaBlocks || {}).forEach(b => { const key = 'spa:' + b; (blockPages[key] = blockPages[key] || new Set()).add(p.url); templates[tpl].blocks.add(key); tplBlock[tpl][key] = (tplBlock[tpl][key] || 0) + 1; });
    Object.keys(p.variations || {}).forEach(v => { (variationPages[v] = variationPages[v] || new Set()).add(p.url); templates[tpl].variations.add(v); tplVariation[tpl][v] = (tplVariation[tpl][v] || 0) + 1; });
    Object.keys(p.custom || {}).forEach(c => { (customPages[c] = customPages[c] || new Set()).add(p.url); templates[tpl].custom.add(c); });
    Object.keys(p.genericBlocks || {}).forEach(g => { (genericBlockPages[g] = genericBlockPages[g] || new Set()).add(p.url); });
    (p.integrations || []).forEach(intg => (integrationPages[intg] = integrationPages[intg] || new Set()).add(p.url));
    (p.unknownScriptHosts || []).forEach(h => (unknownHostPages[h] = unknownHostPages[h] || new Set()).add(p.url));
    (p.embeds || []).forEach(src => { try { const h = new URL(src, p.url).host; embedHosts[h] = (embedHosts[h] || 0) + 1; } catch (e) {} });
    (p.forms || []).forEach(f => {
      allForms.push({ url: p.url, template: tpl, kind: f.kind, fieldCount: f.fieldCount, actionHost: f.actionHost, method: f.method, submitText: f.submitText, fields: (f.fields || []).map(x => x.name || x.label || x.type) });
      (formKindPages[f.kind] = formKindPages[f.kind] || new Set()).add(p.url);
      if (f.actionHost) (formActionHosts[f.actionHost] = formActionHosts[f.actionHost] || new Set()).add(p.url);
    });
    const jr = p.journey || {};
    Object.keys(jr).forEach(k => { if (jr[k] === true) (journeyPages[k] = journeyPages[k] || new Set()).add(p.url); });
    const c = p.cards || {}; ['hero', 'small', 'medium', 'video'].forEach(k => { if (c[k] > 0) cardVarPages[k].add(p.url); });
  }

  const setCount = o => { const r = {}; for (const k in o) r[k] = o[k].size; return r; };
  // integration counts grouped by category
  const integrationCategories = {};
  Object.keys(integrationPages).forEach(name => {
    const cat = intgCategory[name] || 'Other';
    (integrationCategories[cat] = integrationCategories[cat] || {})[name] = integrationPages[name].size;
  });

  const summary = {
    slug: args.slug, origin: L.originOf(pages.map(p => p.url)), totalUrls: pages.length, ok: pages.filter(p => p.status === 200).length,
    templateCounts: Object.fromEntries(Object.entries(templates).map(([k, v]) => [k, v.count])),
    templates: Object.fromEntries(Object.entries(templates).map(([k, v]) => [k, { count: v.count, blocks: [...v.blocks].sort(), variations: [...v.variations].sort(), custom: [...v.custom].sort() }])),
    blockPageCounts: setCount(blockPages), variationPageCounts: setCount(variationPages), customPageCounts: setCount(customPages),
    genericBlockPageCounts: setCount(genericBlockPages),
    cardVariationPageCounts: setCount(cardVarPages), integrationPageCounts: setCount(integrationPages), integrationCategories,
    unknownScriptHostCounts: setCount(unknownHostPages),
    formKindCounts: setCount(formKindPages), formActionHostCounts: setCount(formActionHosts), forms: allForms,
    journeyCapabilityCounts: setCount(journeyPages),
    embedHosts, tplBlock, tplVariation,
    mirrorCount: pages.filter(p => p._mirror).length,
    spanishCount: pages.filter(p => (p.lang || '').startsWith('es')).length,
  };
  L.writeJSON(path.join(dataDir, 'summary.json'), summary);
  L.writeJSON(path.join(dataDir, 'url-templates.json'), pages.map(p => ({ url: p.url, template: p._tpl, metaTemplate: p.template, mirror: !!p._mirror, cards: p.cards, embeds: p.embeds, integrations: p.integrations, lang: p.lang || 'en', forms: (p.forms || []).length, journey: p.journey || {} })));

  console.log('[2-aggregate] templates:');
  Object.entries(summary.templateCounts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
  console.log('[2-aggregate] top components:');
  Object.entries(summary.blockPageCounts).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([k, v]) => console.log(`  ${String(v).padStart(4)}  ${k}`));
  if (Object.keys(summary.genericBlockPageCounts).length) console.log('[2-aggregate] generic (non-AEM) blocks:', Object.keys(summary.genericBlockPageCounts).length);
  console.log('[2-aggregate] integrations:', Object.keys(summary.integrationPageCounts).join(', ') || '(none)');
  console.log('[2-aggregate] forms:', allForms.length, 'kinds:', Object.keys(summary.formKindCounts).join(', ') || '(none)');
  console.log('[2-aggregate] journey capabilities:', Object.keys(summary.journeyCapabilityCounts).join(', ') || '(none)');
  if (Object.keys(summary.unknownScriptHostCounts).length) console.log('[2-aggregate] ⚠︎ UNKNOWN 3rd-party hosts (agent review):', Object.keys(summary.unknownScriptHostCounts).join(', '));
})();
