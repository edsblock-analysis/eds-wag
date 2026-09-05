#!/usr/bin/env node
/* Step 3: build the block catalog by merging discovered components with the
   reusable knowledge base. Unknown components are auto-stubbed with needsReview:true
   so the agent can fill in functional/acceptance/complexity detail.
   Usage: node 3-build-catalog.js --urls <file> [--out <dir>]
   Reads summary.json ; writes <out>/data/block-catalog.json */
const path = require('path');
const L = require('./lib.js');
const KB = L.loadJSON(path.join(__dirname, 'knowledge', 'aem-wcm-blocks.json')).entries;
const DET = L.loadJSON(path.join(__dirname, 'knowledge', 'detectors.json'));
const IGNORE = new Set(DET.ignoreComponents || []);
const FOLD = DET.foldInto || {};
// Index KB entries by their block id (KB is keyed by cmp-* class)
const KB_BY_ID = {};
for (const v of Object.values(KB)) { if (v && v.id && v.name) KB_BY_ID[v.id] = v; }

(async () => {
  const args = L.parseArgs(process.argv);
  const dataDir = path.join(args.out, 'data');
  const S = L.loadJSON(path.join(dataDir, 'summary.json'));
  const bp = S.blockPageCounts, cvp = S.cardVariationPageCounts, vpc = S.variationPageCounts;

  // Group discovered cmp-* components by the KB id (aliases fold e.g. cmp-youtube -> video-embed)
  const byId = {};      // id -> { entry, rawKeys:Set, pages:Set-count via max, variationExtras:[] }
  const idPages = {};   // id -> max page count across its raw keys
  const idVariations = {}; // id -> [{name, pages}]

  function ensure(id, entry) {
    if (!byId[id]) byId[id] = { id, entry: entry || {}, rawKeys: [], needsReview: false };
    return byId[id];
  }

  for (const [rawKey, count] of Object.entries(bp)) {
    if (IGNORE.has(rawKey)) continue;                       // structural wrapper, not a block
    const kb = KB[rawKey];
    if (kb) {
      const id = kb.id;
      const rec = ensure(id, KB_BY_ID[id] || (kb.name ? kb : null));
      rec.rawKeys.push(rawKey);
      idPages[id] = Math.max(idPages[id] || 0, count);
      if (kb.variation) (idVariations[id] = idVariations[id] || []).push({ name: kb.variation, pages: count });
    } else if (FOLD[rawKey]) {                              // composite sub-part -> fold into parent
      const id = FOLD[rawKey];
      const rec = ensure(id, KB_BY_ID[id] || null);
      if (!KB_BY_ID[id]) rec.needsReview = true;            // parent not in KB either
      rec.rawKeys.push(rawKey);
      idPages[id] = Math.max(idPages[id] || 0, count);
    } else if (/^cmp-[a-z0-9-]+$/.test(rawKey)) {
      // Unknown component -> auto-stub
      const id = rawKey.replace(/^cmp-/, '');
      const rec = ensure(id, null);
      rec.needsReview = true;
      rec.rawKeys.push(rawKey);
      idPages[id] = Math.max(idPages[id] || 0, count);
    }
  }

  // Card variations are special (single cmp-card, 4 visual variants)
  if (byId['card']) {
    idVariations['card'] = ['hero', 'medium', 'small', 'video'].filter(k => (cvp[k] || 0) > 0).map(k => ({ name: k, pages: cvp[k], desc: `${k} card variation` }));
  }
  // Generic cmp-*--variant variations attach to their base id
  for (const [vKey, count] of Object.entries(vpc)) {
    const m = vKey.match(/^(cmp-[a-z0-9-]+?)--([a-z0-9-]+)$/);
    if (!m) continue;
    const kb = KB[m[1]]; const id = kb ? kb.id : m[1].replace(/^cmp-/, '');
    if (byId[id] && !(id === 'card')) (idVariations[id] = idVariations[id] || []).push({ name: m[2], pages: count, desc: `${m[2]} variation` });
  }

  // Which templates use each id
  const idTemplates = {};
  for (const [tpl, blocks] of Object.entries(S.tplBlock)) {
    for (const rawKey of Object.keys(blocks)) {
      const kb = KB[rawKey]; const id = kb ? kb.id : rawKey.replace(/^cmp-/, '');
      if (byId[id]) (idTemplates[id] = idTemplates[id] || new Set()).add(tpl);
    }
  }

  const catalog = Object.values(byId).map(({ id, entry, rawKeys, needsReview }) => {
    const e = entry || {};
    const isGlobal = (e.templates || []).includes('all');
    const variations = idVariations[id] && idVariations[id].length ? idVariations[id] : [{ name: 'default', desc: e.name || id, pages: idPages[id] || 0 }];
    return {
      id,
      name: e.name || (id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ')),
      edsBlock: e.edsBlock || id,
      complexity: e.complexity || 'Medium',
      complexityReason: e.complexityReason || (needsReview ? 'AUTO-STUB — not in knowledge base; agent to assess complexity and rationale from observed markup/behavior.' : ''),
      templates: isGlobal ? ['all'] : [...(idTemplates[id] || new Set())].sort(),
      pages: idPages[id] || 0,
      variations,
      functional: e.functional || ['AUTO-STUB — agent to document functionality from observed markup/behavior.'],
      acceptance: e.acceptance || ['AUTO-STUB — agent to define acceptance criteria from observed behavior.'],
      verify: e.verify || [],
      integrations: e.integrations || [],
      needsReview: !!needsReview,
      rawKeys,
    };
  }).sort((a, b) => b.pages - a.pages);

  L.writeJSON(path.join(dataDir, 'block-catalog.json'), catalog);
  const stubs = catalog.filter(b => b.needsReview);
  console.log(`[3-build-catalog] ${catalog.length} blocks, ${catalog.reduce((n, b) => n + b.variations.length, 0)} variations`);
  if (stubs.length) {
    console.log(`[3-build-catalog] ${stubs.length} component(s) NEED AGENT REVIEW (not in knowledge base):`);
    stubs.forEach(s => console.log(`  - ${s.id}  (raw: ${s.rawKeys.join(', ')}, ${s.pages} pages)`));
  } else {
    console.log('[3-build-catalog] all components matched the knowledge base.');
  }
})();
