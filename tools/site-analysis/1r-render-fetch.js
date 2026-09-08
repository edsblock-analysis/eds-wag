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
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
// deterministic jitter (no Math.random for reproducibility); varies by index
const jitter = (i, base, spread) => base + ((i * 977) % spread);
function isBlocked(status, html) {
  if (status === 403 || status === 429) return true;
  if (!html) return false;
  // Only treat as a bot wall on strong signals (title/heading-level access-denied or
  // Akamai edge error), NOT loose body text like "Reference #" which appears in normal
  // content. Require the phrase near a <title>/<h1> or an edgesuite error host.
  const head = html.slice(0, 6000);
  if (/errors\.edgesuite\.net|Pardon the Interruption|Request unsuccessful\. Incapsula/i.test(head)) return true;
  if (/<title>[^<]*Access Denied[^<]*<\/title>|<h1[^>]*>\s*Access Denied/i.test(head)) return true;
  return false;
}

async function renderOne(context, url, attempt) {
  const page = await context.newPage();
  const xhrHosts = new Set();
  page.on('request', (r) => { if (['xhr', 'fetch'].includes(r.resourceType())) { try { xhrHosts.add(new URL(r.url()).host); } catch (e) {} } });
  let status = 0, finalUrl = url, err = null, blocked = false;
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
    blocked = isBlocked(status, html);
  } catch (e) { err = e.message.slice(0, 120); }
  await page.close().catch(() => {});
  return { status, finalUrl, err, blocked, attempt, html: (typeof html === 'string' ? html : ''), testids: testids || 0, visLen: visLen || 0, xhrHosts: [...xhrHosts] };
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
  // Gentle defaults to avoid tripping bot protection: low concurrency + per-request delay.
  const conc = Math.min(args.concurrency || 3, 6);
  const argN = (flag, def) => process.argv.includes(flag) ? parseInt(process.argv[process.argv.indexOf(flag) + 1], 10) : def;
  const delayMs = argN('--delay', 300);       // small pause between requests per worker
  const maxRetries = argN('--retries', 3);    // retries on blocked/403
  const cooldownMs = argN('--cooldown', 90000); // fixed cooldown on a block (~1.5 min), capped at 2 min
  console.error(`[1r] rendering ${urls.length} LIVE URLs (concurrency ${conc}, delay ${delayMs}ms, cooldown ${Math.round(cooldownMs / 1000)}s, retries ${maxRetries}) -> ${args.out}`);

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  let context = await browser.newContext({ userAgent: UA, viewport: { width: 1366, height: 900 }, locale: 'en-US' });
  context.setDefaultTimeout(45000);

  const meta = [];
  let done = 0, idx = 0, blockedCount = 0;
  async function worker(wid) {
    while (idx < urls.length) {
      const my = idx++; const url = urls[my];
      const htmlPath = path.join(htmlDir, L.slugForUrl(url) + '.html');
      if (!force && fs.existsSync(htmlPath) && fs.statSync(htmlPath).size > 2000 && fs.readFileSync(htmlPath, 'utf8').includes('data-render="pw"')) {
        meta[my] = { url, cached: true }; done++; continue;
      }
      // Skip pure API/asset endpoints (health-check APIs, JS/JSON): they are not pages and
      // always block/empty — rendering them just burns cooldown time.
      if (/\/v[0-9]+\/health(\?|$)|\.(js|json|css|xml|txt|map)(\?|$)|\/api\//i.test(url)) {
        meta[my] = { url, status: 0, err: 'api/asset endpoint (skipped)', skipped: true }; done++; continue;
      }
      // gentle pacing with per-worker jitter
      await sleep(jitter(my, delayMs, 700));
      let r = await renderOne(context, url, 1);
      // retry blocked/403 after a short fixed cooldown (default ~90s, capped) — no long escalation
      let attempt = 1;
      while (r.blocked && attempt < maxRetries) {
        attempt++;
        const cooldown = Math.min(cooldownMs + jitter(my, 0, 15000), 120000);
        process.stderr.write(`  [retry ${attempt}] blocked, cooling down ${Math.round(cooldown / 1000)}s: ${url.replace(/^https?:\/\/[^/]+/, '')}\n`);
        await sleep(cooldown);
        r = await renderOne(context, url, attempt);
      }
      if (r.blocked) blockedCount++;
      if (r.status && r.html && r.html.length > 500 && !r.blocked) {
        const tagged = r.html.replace(/<html/i, '<html data-render="pw"');
        fs.writeFileSync(htmlPath, tagged);
      }
      meta[my] = { url, status: r.status, finalUrl: r.finalUrl, err: r.err, blocked: r.blocked, attempts: r.attempt, testids: r.testids, visLen: r.visLen, xhrHosts: r.xhrHosts };
      done++;
      if (done % 25 === 0) { process.stderr.write(`  ...${done}/${urls.length} (blocked so far: ${blockedCount})\n`); L.writeJSON(path.join(dataDir, 'render-meta.json'), meta); }
    }
  }
  await Promise.all(Array.from({ length: conc }, (_, i) => worker(i)));
  await browser.close();
  L.writeJSON(path.join(dataDir, 'render-meta.json'), meta);
  const ok = meta.filter(m => m && (m.cached || (m.status === 200 && !m.blocked))).length;
  const avgTestids = Math.round(meta.filter(m => m && m.testids).reduce((n, m) => n + m.testids, 0) / Math.max(1, meta.filter(m => m && m.testids).length));
  console.log(`[1r] rendered ${meta.length} URLs; ok: ${ok}; blocked: ${blockedCount}; avg testids/page: ${avgTestids}`);
  if (blockedCount) console.log('[1r] NOTE: ' + blockedCount + ' URLs blocked after retries — re-run to retry just those (cached ones are skipped).');
})();
