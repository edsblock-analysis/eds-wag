#!/usr/bin/env node
/* Step 1: fetch every URL individually + extract structural evidence.
   Usage: node 1-fetch-extract.js --urls <file> [--out <dir>] [--slug <name>] [--concurrency N]
   Outputs: <out>/pages/<slug>.html (cache), <out>/data/pages.json */
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');
const cheerio = L.requireCheerio();
const DET = L.loadJSON(path.join(__dirname, 'knowledge', 'detectors.json'));

function extract(url, html, status) {
  const $ = cheerio.load(html);
  const rec = { url, status, template: null, title: null, description: null, lang: null, blocks: {}, variations: {}, custom: {}, integrations: [], embeds: [], meta: {}, cards: {}, media: {}, scriptSrcs: [] };

  rec.template = $('meta[name="template"]').attr('content') || null;
  // Redirect / external-stub detection: meta-refresh, JS location change, or a page with
  // no AEM components (cmp-*) at all.
  const metaRefresh = $('meta[http-equiv="refresh" i]').attr('content') || '';
  const hasJsRedirect = /(window\.location|location\.href|location\.replace)\s*[=(]/.test($('script:not([src])').text());
  const cmpCount = $('[class*="cmp-"]').length;
  rec.isRedirect = /url=/i.test(metaRefresh) || (hasJsRedirect && cmpCount < 3) || cmpCount === 0;
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

  return rec;
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
    try { rec = (status === 200 && html.length > 200) ? extract(url, html, status) : { url, status, error: 'non-200 or empty', blocks: {}, variations: {}, custom: {}, integrations: [], embeds: [], cards: {} }; }
    catch (e) { rec = { url, status, error: 'parse:' + e.message, blocks: {}, variations: {}, custom: {}, integrations: [], embeds: [], cards: {} }; }
    if (++done % 50 === 0) process.stderr.write(`  ...${done}/${urls.length}\n`);
    return rec;
  });

  L.writeJSON(path.join(dataDir, 'pages.json'), results);
  const ok = results.filter(r => r.status === 200).length;
  console.log(`[1-fetch-extract] done: ${results.length} URLs, ${ok} OK, ${results.length - ok} non-200`);
})();
