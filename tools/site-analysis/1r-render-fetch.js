#!/usr/bin/env node
/* Step 1r (SPA/commerce): fetch every LIVE url through a real headless browser and
   save the POST-JavaScript rendered DOM. Use this instead of 1-fetch-extract's raw
   HTTP fetch for React/SPA/AJAX sites where content is client-rendered.
   Usage: node 1r-render-fetch.js --urls <file> [--out <dir>] [--slug <name>] [--concurrency N] [--limit N]
   Writes: <out>/pages/<slug>.html (rendered), <out>/data/render-meta.json
   Then run 2-aggregate / 3-build-catalog / 4-generate as usual (they read pages/). */
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');
let chromium;
try { chromium = require('playwright').chromium; }
catch (e) { console.error('[1r] playwright not installed. Run: cd tools/site-analysis && npm i playwright && node node_modules/playwright/cli.js install chromium'); process.exit(1); }

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36';

async function renderOne(context, url) {
  const page = await context.newPage();
  const xhrHosts = new Set();
  page.on('request', (r) => { if (['xhr', 'fetch'].includes(r.resourceType())) { try { xhrHosts.add(new URL(r.url()).host); } catch (e) {} } });
  let status = 0, finalUrl = url, err = null;
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    status = resp ? resp.status() : 0;
    finalUrl = page.url();
    // let client-side data/AJAX settle
    try { await page.waitForLoadState('networkidle', { timeout: 20000 }); } catch (e) {}
    // dismiss common consent overlays so they don't mask content
    for (const sel of ['#onetrust-accept-btn-handler', 'button#truste-consent-button', '[aria-label="Close" i]']) {
      try { const el = await page.$(sel); if (el) { await el.click({ timeout: 1500 }); } } catch (e) {}
    }
    // trigger lazy/intersection content: scroll through the page
    try {
      await page.evaluate(async () => {
        await new Promise((res) => {
          let y = 0; const step = () => { window.scrollTo(0, y); y += 900; if (y < document.body.scrollHeight && y < 12000) setTimeout(step, 120); else res(); };
          step();
        });
      });
      await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0));
    } catch (e) {}
    var html = await page.content();
    var testids = await page.evaluate(() => document.querySelectorAll('[data-testid]').length);
    var visLen = await page.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').trim().length);
  } catch (e) { err = e.message.slice(0, 120); }
  await page.close().catch(() => {});
  return { status, finalUrl, err, html: (typeof html === 'string' ? html : ''), testids: testids || 0, visLen: visLen || 0, xhrHosts: [...xhrHosts] };
}

(async () => {
  const args = L.parseArgs(process.argv);
  let urls = L.readUrlList(args.urls);
  const lim = process.argv.includes('--limit') ? parseInt(process.argv[process.argv.indexOf('--limit') + 1], 10) : 0;
  if (lim) urls = urls.slice(0, lim);
  const htmlDir = path.join(args.out, 'pages');
  const dataDir = path.join(args.out, 'data');
  fs.mkdirSync(htmlDir, { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });
  const force = process.argv.includes('--force');
  const conc = Math.min(args.concurrency || 5, 6);
  console.error(`[1r] rendering ${urls.length} LIVE URLs (headless Chromium, concurrency ${conc}) -> ${args.out}`);

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({ userAgent: UA, viewport: { width: 1366, height: 900 }, locale: 'en-US' });
  context.setDefaultTimeout(45000);

  const meta = [];
  let done = 0, idx = 0;
  async function worker() {
    while (idx < urls.length) {
      const my = idx++; const url = urls[my];
      const htmlPath = path.join(htmlDir, L.slugForUrl(url) + '.html');
      if (!force && fs.existsSync(htmlPath) && fs.statSync(htmlPath).size > 2000 && fs.readFileSync(htmlPath, 'utf8').includes('data-render="pw"')) {
        meta[my] = { url, cached: true }; done++; continue;
      }
      const r = await renderOne(context, url);
      if (r.status && r.html && r.html.length > 500) {
        // tag rendered files so we can distinguish from raw cache
        const tagged = r.html.replace(/<html/i, '<html data-render="pw"');
        fs.writeFileSync(htmlPath, tagged);
      }
      meta[my] = { url, status: r.status, finalUrl: r.finalUrl, err: r.err, testids: r.testids, visLen: r.visLen, xhrHosts: r.xhrHosts };
      done++;
      if (done % 25 === 0) process.stderr.write(`  ...${done}/${urls.length}\n`);
    }
  }
  await Promise.all(Array.from({ length: conc }, worker));
  await browser.close();
  L.writeJSON(path.join(dataDir, 'render-meta.json'), meta);
  const ok = meta.filter(m => m && (m.cached || m.status === 200)).length;
  const avgTestids = Math.round(meta.filter(m => m && m.testids).reduce((n, m) => n + m.testids, 0) / Math.max(1, meta.filter(m => m && m.testids).length));
  console.log(`[1r] rendered ${meta.length} URLs; 200/cached: ${ok}; avg testids/page: ${avgTestids}`);
})();
