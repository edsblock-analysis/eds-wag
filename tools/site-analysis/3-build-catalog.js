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
const TESTID = (() => { try { return L.loadJSON(path.join(__dirname, 'knowledge', 'react-testid-blocks.json')); } catch (e) { return { blocks: {} }; } })();
const SPA_BLOCKS = TESTID.blocks || {};
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
    // React/SPA blocks: key is "spa:<block>" (known family) or "spa:testid:<name>" (unknown).
    if (rawKey.startsWith('spa:')) {
      const sub = rawKey.slice(4);
      if (sub.startsWith('testid:')) {                      // unrecognized testid family -> stub
        const id = 'spa-' + sub.slice(7).replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
        const rec = ensure(id, null); rec.needsReview = true; rec.rawKeys.push(rawKey);
        idPages[id] = Math.max(idPages[id] || 0, count);
      } else {                                              // known SPA block from knowledge base
        const rec = ensure(sub, SPA_BLOCKS[sub] || null);
        if (!SPA_BLOCKS[sub]) rec.needsReview = true;
        rec.rawKeys.push(rawKey);
        idPages[sub] = Math.max(idPages[sub] || 0, count);
      }
      continue;
    }
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

  // Generic (non-AEM) blocks: only surface if the site has essentially no cmp-* blocks,
  // so AEM sites are unaffected. Each becomes a needsReview stub for the agent.
  const gb = S.genericBlockPageCounts || {};
  if (Object.keys(byId).length < 3 && Object.keys(gb).length) {
    for (const [key, count] of Object.entries(gb)) {
      const id = 'generic-' + key.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
      const rec = ensure(id, null); rec.needsReview = true; rec.rawKeys.push(key);
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

  let catalog = Object.values(byId).map(({ id, entry, rawKeys, needsReview }) => {
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
  });

  // ---- (1) Split out EDS default content — NOT authored blocks ----
  const DEFAULT_CONTENT = new Set(DET.defaultContent || []);
  const defaultContent = catalog.filter(b => DEFAULT_CONTENT.has(b.id))
    .map(b => ({ id: b.id, name: b.name, edsBlock: b.edsBlock, pages: b.pages }))
    .sort((a, b) => b.pages - a.pages);
  catalog = catalog.filter(b => !DEFAULT_CONTENT.has(b.id));

  // ---- (2) Consolidate shared-DOM components into one block + variations ----
  const CONS = DET.consolidate || {};
  const byIdCat = Object.fromEntries(catalog.map(b => [b.id, b]));
  const rank = { Low: 1, Medium: 2, High: 3 };
  for (const b of [...catalog]) {
    const rule = CONS[b.id];
    if (!rule) continue;
    let target = byIdCat[rule.into];
    if (!target) {
      // canonical block not independently present — promote this one into it
      const kb = KB_BY_ID[rule.into];
      target = { id: rule.into, name: kb ? kb.name : (rule.into.charAt(0).toUpperCase() + rule.into.slice(1).replace(/-/g, ' ')),
        edsBlock: kb ? kb.edsBlock : rule.into, complexity: kb ? kb.complexity : b.complexity,
        complexityReason: kb ? kb.complexityReason : b.complexityReason,
        templates: [], pages: 0, variations: [], functional: kb ? kb.functional : [], acceptance: kb ? kb.acceptance : [],
        verify: kb ? (kb.verify || []) : [], integrations: [], needsReview: false, rawKeys: [], _consolidated: true };
      byIdCat[rule.into] = target; catalog.push(target);
    }
    // fold b's variations in under the consolidated name
    const varName = rule.as || b.id;
    const folded = (b.variations || []).map(v => ({ name: v.name === 'default' ? varName : `${varName}-${v.name}`, desc: v.desc || b.name, pages: v.pages }));
    target.variations.push(...(folded.length ? folded : [{ name: varName, desc: b.name, pages: b.pages }]));
    target.pages = Math.max(target.pages, b.pages);
    target.templates = [...new Set([...(target.templates || []), ...(b.templates || [])])].filter(t => t !== undefined).sort();
    target.rawKeys = [...(target.rawKeys || []), ...(b.rawKeys || [])];
    target.integrations = [...new Set([...(target.integrations || []), ...(b.integrations || [])])];
    if (rank[b.complexity] > rank[target.complexity]) { target.complexity = b.complexity; } // keep the highest complexity
    if (b.needsReview) target.needsReview = true;
    // remove the now-merged block
    catalog = catalog.filter(x => x !== b);
    delete byIdCat[b.id];
  }
  // dedupe/merge variations by name within each consolidated block
  catalog.forEach(b => {
    const seen = {}; const merged = [];
    for (const v of b.variations) { if (seen[v.name] != null) { merged[seen[v.name]].pages = Math.max(merged[seen[v.name]].pages, v.pages); } else { seen[v.name] = merged.length; merged.push({ ...v }); } }
    b.variations = merged;
  });

  catalog.sort((a, b) => b.pages - a.pages);

  L.writeJSON(path.join(dataDir, 'block-catalog.json'), catalog);
  L.writeJSON(path.join(dataDir, 'default-content.json'), defaultContent);
  const stubs = catalog.filter(b => b.needsReview);
  const consolidated = catalog.filter(b => (b.rawKeys || []).length > 1 && CONS && Object.values(CONS).some(r => r.into === b.id));
  console.log(`[3-build-catalog] ${catalog.length} blocks, ${catalog.reduce((n, b) => n + b.variations.length, 0)} variations (excludes ${defaultContent.length} default-content: ${defaultContent.map(d => d.id).join(', ') || 'none'})`);
  if (consolidated.length) console.log(`[3-build-catalog] consolidated shared-DOM components into: ${consolidated.map(b => b.id + ' (' + b.variations.length + ' vars)').join(', ')}`);
  if (stubs.length) {
    console.log(`[3-build-catalog] ${stubs.length} component(s) NEED AGENT REVIEW (not in knowledge base):`);
    stubs.forEach(s => console.log(`  - ${s.id}  (raw: ${s.rawKeys.join(', ')}, ${s.pages} pages)`));
  } else {
    console.log('[3-build-catalog] all components matched the knowledge base.');
  }
})();
