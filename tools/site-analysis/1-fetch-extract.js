#!/usr/bin/env node
/* Step 1: fetch every URL individually + extract structural evidence.
   Usage: node 1-fetch-extract.js --urls <file> [--out <dir>] [--slug <name>] [--concurrency N]
   Outputs: <out>/pages/<slug>.html (cache), <out>/data/pages.json */
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');
const cheerio = L.requireCheerio();
const DET = L.loadJSON(path.join(__dirname, 'knowledge', 'detectors.json'));
const TESTID = (() => { try { return L.loadJSON(path.join(__dirname, 'knowledge', 'react-testid-blocks.json')); } catch (e) { return { families: [], blocks: {} }; } })();
TESTID.families = TESTID.testidFamilies || TESTID.families || [];

function extract(url, html, status) {
  const $ = cheerio.load(html);
  const rec = { url, status, template: null, title: null, description: null, lang: null, blocks: {}, variations: {}, custom: {}, integrations: [], embeds: [], meta: {}, cards: {}, media: {}, scriptSrcs: [], forms: [], journey: {}, genericBlocks: {}, spaBlocks: {}, unknownScriptHosts: [] };

  rec.template = $('meta[name="template"]').attr('content') || null;
  // Real-page vs stub test based on VISIBLE TEXT, not cmp-* count (React/SPA sites have
  // zero cmp-* but are real pages). A page is a redirect/stub only if it truly has no
  // rendered content: explicit meta-refresh, or a near-empty body.
  const metaRefresh = $('meta[http-equiv="refresh" i]').attr('content') || '';
  const bodyClone = $('body').clone();
  bodyClone.find('script,style,noscript,template,svg').remove();
  const visibleText = (bodyClone.text() || '').replace(/\s+/g, ' ').trim();
  rec.meta.visibleTextLen = visibleText.length;
  const isApiOrAsset = /\.(js|json|css|xml|txt|jpg|png|gif|svg|pdf)(\?|$)/i.test(url) || !/<html/i.test(html);
  rec.isRedirect = /url=/i.test(metaRefresh) || isApiOrAsset || visibleText.length < 200;
  rec.title = ($('title').first().text() || '').trim().replace(/instagram-logo.*$/i, '').slice(0, 200);
  rec.description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || null;
  rec.lang = $('html').attr('lang') || null;
  rec.meta.h1 = $('h1').length;

  // WCM Core base components (cmp-name) and variations (cmp-name--variant)
  const base = {}, vary = {};
  $('[class]').each((i, el) => {
    ($(el).attr('class') || '').split(/\s+/).forEach(c => {
      if (/^cmp-[a-z0-9]+(-[a-z0-9]+)*$/.test(c)) base[c] = (base[c] || 0) + 1;
      const m = c.match(/^(cmp-[a-z0-9-]+?)--([a-z0-9-]+)$/);
      if (m) vary[c] = (vary[c] || 0) + 1;
    });
  });
  rec.blocks = base;
  rec.variations = vary;

  // Custom widget markers (non-cmp) worth tracking
  [['theater', '.theater__container'], ['watch-videos', '[class*="watch-videos"]'],
   ['hero-carousel', '[class*="hero-carousel"]'], ['jump-to-section', '[class*="jump-to-section"]'],
   ['breadcrumb', '.cmp-breadcrumb'], ['embed', '.cmp-embed, .embed']].forEach(([name, sel]) => {
    const n = $(sel).length; if (n) rec.custom[name] = n;
  });

  // Card variation breakdown (common listing unit)
  rec.cards = {
    total: $('.cmp-card').length,
    hero: $('.cmp-card--variation-hero').length,
    small: $('.cmp-card--variation-small').length,
    medium: $('.cmp-card--variation-medium').length,
    video: $('.cmp-card--variation-video').length,
  };

  rec.media = {
    scene7Viewer: /s7viewers|scene7\.com/.test(html),
    videoTag: $('video').length,
    theaterThumbs: $('.theater__thumb').length,
  };

  $('iframe[src]').each((i, el) => rec.embeds.push($(el).attr('src') || ''));

  const scripts = $('script[src]').map((i, el) => $(el).attr('src')).get();
  rec.scriptSrcs = scripts;
  const hay = scripts.join(' ') + ' ' + html;
  DET.integrations.forEach(d => { if (new RegExp(d.re, 'i').test(hay)) rec.integrations.push(d.name); });

  // ---- Forms (lead-gen / contact / search / newsletter / checkout) ----
  rec.forms = [];
  $('form').each((i, el) => {
    const $f = $(el);
    const fields = $f.find('input:not([type=hidden]),select,textarea').map((j, e) => {
      const $e = $(e);
      return { name: $e.attr('name') || $e.attr('id') || null, type: ($e.attr('type') || e.tagName || '').toLowerCase(), required: $e.attr('required') != null || /required/i.test($e.attr('class') || ''), label: ($e.attr('placeholder') || $e.attr('aria-label') || '').slice(0, 40) };
    }).get();
    const action = $f.attr('action') || '';
    let actionHost = null; try { actionHost = action ? new URL(action, url).host : null; } catch (e) {}
    const submitText = ($f.find('[type=submit],button').first().text() || '').trim().slice(0, 40);
    rec.forms.push({
      action: action || '(js-handled)', actionHost, method: ($f.attr('method') || 'get').toLowerCase(),
      fieldCount: fields.length, hiddenCount: $f.find('input[type=hidden]').length,
      fields: fields.slice(0, 25), submitText,
      kind: classifyForm($f, fields, action, url),
    });
  });

  // ---- User-journey signals (what a visitor can DO) ----
  const bodyTxt = ($('body').text() || '').toLowerCase();
  const linkHosts = {};
  $('a[href]').each((i, el) => { try { const h = new URL($(el).attr('href'), url).host; if (h && h !== new URL(url).host) linkHosts[h] = (linkHosts[h] || 0) + 1; } catch (e) {} });
  rec.journey = {
    hasForm: rec.forms.length > 0,
    hasSearch: $('input[type=search], [role=search], [class*="search" i] input, form[action*="search" i]').length > 0,
    hasLogin: /\b(log ?in|sign ?in|my account|register|create account)\b/i.test(bodyTxt) || $('a[href*="login" i],a[href*="signin" i],a[href*="account" i]').length > 0,
    hasCart: $('[class*="cart" i],[href*="cart" i],[class*="basket" i],[aria-label*="cart" i]').length > 0,
    hasCheckout: /\b(checkout|add to cart|add to bag|buy now|place order)\b/i.test(bodyTxt),
    hasFilters: $('[class*="filter" i] input, [class*="facet" i], input[type=checkbox]').length > 0,
    hasPagination: $('[class*="paginat" i], [aria-label*="pagination" i], [class*="load-more" i]').length > 0,
    hasTabs: $('[role=tab], [class*="tab" i][class*="nav" i], .cmp-tabs').length > 0,
    hasAccordion: $('[class*="accordion" i], [class*="flip" i], details').length > 0,
    hasModal: $('[class*="modal" i], [role=dialog], [class*="popup" i], [class*="lightbox" i]').length > 0,
    hasVideo: $('video, iframe[src*="youtube" i], iframe[src*="vimeo" i], iframe[src*="spotify" i], [class*="s7video" i]').length > 0,
    hasMap: $('iframe[src*="google.com/maps" i], [class*="map" i][id], .mapboxgl-map').length > 0,
    hasChat: /(intercom|drift|zendesk|livechat|tidio|hubspot.*conversations)/i.test(hay),
    ctas: $('a,button').map((i, el) => ($(el).text() || '').trim()).get().filter(t => /^(get started|contact|sign up|subscribe|request|book|demo|apply|download|learn more|buy|shop|register|log ?in|start|try)/i.test(t)).slice(0, 12),
    externalLinkHosts: linkHosts,
  };

  // ---- Unknown third-party script hosts (integrations we don't yet name) ----
  const knownHostFrag = /(walgreens|hlx\.page|adobedtm|scene7|cookielaw|googletagmanager|google-analytics|typekit|gstatic|googleapis|salesforce|clientlibs|jsdelivr|jquery|fonts)/i;
  const unknownHosts = {};
  scripts.forEach(s => { try { const h = new URL(s, url).host; if (h && h !== new URL(url).host && !knownHostFrag.test(h)) unknownHosts[h] = (unknownHosts[h] || 0) + 1; } catch (e) {} });
  rec.unknownScriptHosts = Object.keys(unknownHosts);

  // ---- React/SPA block extraction (data-testid families) ----
  // Sites built as React/SPA apps expose components via data-testid rather than cmp-*.
  // Group testids into known block families (react-testid-blocks.json); anything not
  // matched is kept as its own testid-family so nothing is missed.
  rec.spaBlocks = {};
  const testidSeen = {};
  $('[data-testid]').each((i, el) => {
    let t = ($(el).attr('data-testid') || '').replace(/[-_]?\d+$/, '').replace(/[-_][0-9a-f]{6,}$/i, '').trim();
    if (t) testidSeen[t] = (testidSeen[t] || 0) + 1;
  });
  for (const t in testidSeen) {
    const fam = (TESTID.families || []).find(f => new RegExp(f.match, 'i').test(t));
    const key = fam ? fam.block : ('testid:' + t);
    rec.spaBlocks[key] = (rec.spaBlocks[key] || 0) + testidSeen[t];
  }
  rec.meta.reactRoots = $('#root,#app,[data-reactroot],[data-testid]').length;

  // ---- Generic (non-AEM) block fallback ----
  // If the page has few/no cmp-* AND few/no data-testid blocks, capture data-block /
  // BEM-ish top-level section classes so non-AEM sites still yield a block inventory.
  rec.genericBlocks = {};
  if (Object.keys(base).length < 3 && Object.keys(rec.spaBlocks).length < 2) {
    $('[data-block], [data-component], main section[class], main > div[class], [class*="block-"], [class*="section-"]').each((i, el) => {
      let key = $(el).attr('data-block') || $(el).attr('data-component');
      if (!key) { const c = ($(el).attr('class') || '').split(/\s+/).find(x => /^(block|section|component|c-|o-|b-)[-_]?[a-z]/i.test(x)); key = c; }
      if (key) { key = key.toLowerCase().slice(0, 40); rec.genericBlocks[key] = (rec.genericBlocks[key] || 0) + 1; }
    });
  }

  return rec;
}

// Heuristically label a form's purpose from its fields/action/context.
function classifyForm($f, fields, action, url) {
  const names = fields.map(x => (x.name || '') + ' ' + (x.label || '')).join(' ').toLowerCase();
  const a = (action || '').toLowerCase();
  const ctx = ($f.text() || '').toLowerCase();
  if (/salesforce|webtolead|marketo|hubspot|pardot|eloqua/.test(a)) return 'lead-gen (CRM)';
  if (/search/.test(a) || fields.some(x => (x.type === 'search'))) return 'search';
  if (/newsletter|subscribe|signup|email.?only/.test(names + a + ctx) && fields.length <= 2) return 'newsletter';
  if (/login|signin|password/.test(names + a) || fields.some(x => x.type === 'password')) return 'login/auth';
  if (/checkout|payment|billing|card|order/.test(names + a + ctx)) return 'checkout/payment';
  if (/contact|message|inquiry|company|brand|phone/.test(names + ctx)) return 'contact/lead';
  return 'generic';
}

(async () => {
  const args = L.parseArgs(process.argv);
  const urls = L.readUrlList(args.urls);
  const htmlDir = path.join(args.out, 'pages');
  const dataDir = path.join(args.out, 'data');
  fs.mkdirSync(htmlDir, { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });
  console.error(`[1-fetch-extract] ${urls.length} URLs -> ${args.out}`);

  let done = 0;
  const results = await L.runPool(urls, args.concurrency, async (url) => {
    const htmlPath = path.join(htmlDir, L.slugForUrl(url) + '.html');
    let html, status;
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).size > 500) { html = fs.readFileSync(htmlPath, 'utf8'); status = 200; }
    else { const r = await L.get(url); status = r.statusCode; html = r.body || ''; if (status === 200 && html.length > 500) fs.writeFileSync(htmlPath, html); }
    let rec;
    const empty = { blocks: {}, variations: {}, custom: {}, integrations: [], embeds: [], cards: {}, forms: [], journey: {}, genericBlocks: {}, spaBlocks: {}, unknownScriptHosts: [] };
    try { rec = (status === 200 && html.length > 200) ? extract(url, html, status) : { url, status, error: 'non-200 or empty', ...empty }; }
    catch (e) { rec = { url, status, error: 'parse:' + e.message, ...empty }; }
    if (++done % 50 === 0) process.stderr.write(`  ...${done}/${urls.length}\n`);
    return rec;
  });

  L.writeJSON(path.join(dataDir, 'pages.json'), results);
  const ok = results.filter(r => r.status === 200).length;
  console.log(`[1-fetch-extract] done: ${results.length} URLs, ${ok} OK, ${results.length - ok} non-200`);
})();
