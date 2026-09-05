/* Shared helpers for the site-analysis toolkit. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function parseArgs(argv) {
  const a = { urls: null, out: null, slug: null, concurrency: 12 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--urls') a.urls = argv[++i];
    else if (k === '--out') a.out = argv[++i];
    else if (k === '--slug') a.slug = argv[++i];
    else if (k === '--concurrency') a.concurrency = parseInt(argv[++i], 10) || 12;
  }
  if (!a.urls) throw new Error('Missing --urls <file>');
  // Derive slug + out from the urls filename if not given: url/blog-walgreens.txt -> blog-walgreens
  if (!a.slug) a.slug = path.basename(a.urls).replace(/\.[^.]+$/, '');
  if (!a.out) a.out = path.join('report', a.slug);
  return a;
}

function readUrlList(file) {
  return fs.readFileSync(file, 'utf8')
    .split('\n')
    .map(l => l.replace(/^\s*\d+\s+/, '').trim())   // strip leading "123  " line numbers if present
    .filter(l => /^https?:\/\//.test(l));
}

function slugForUrl(u) {
  return u.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 180);
}

function originOf(urls) {
  try { return new URL(urls[0]).origin; } catch (e) { return ''; }
}

function get(url, redirects = 0) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EDS-Migration-Analysis/1.0)' },
      timeout: 30000,
    }, (res) => {
      const { statusCode } = res;
      if ([301, 302, 303, 307, 308].includes(statusCode) && res.headers.location && redirects < 5) {
        res.resume();
        const next = new URL(res.headers.location, url).href;
        return resolve(get(next, redirects + 1).then(r => ({ ...r, redirectedFrom: url })));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', c => data += c);
      res.on('end', () => resolve({ statusCode, body: data, finalUrl: url }));
    });
    req.on('timeout', () => { req.destroy(); resolve({ statusCode: 0, body: '', error: 'timeout' }); });
    req.on('error', (e) => resolve({ statusCode: 0, body: '', error: e.message }));
  });
}

async function runPool(items, concurrency, worker) {
  let idx = 0;
  const results = new Array(items.length);
  async function run() {
    while (idx < items.length) {
      const my = idx++;
      results[my] = await worker(items[my], my);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

function loadJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJSON(p, obj) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(obj, null, 1)); }
function esc(s) { return (s == null ? '' : String(s)).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

// Require cheerio from the toolkit's own node_modules (installed by run-analysis.js)
function requireCheerio() {
  try { return require('cheerio'); }
  catch (e) {
    try { return require(path.join(__dirname, 'node_modules', 'cheerio')); }
    catch (e2) { throw new Error('cheerio not installed. Run: cd tools/site-analysis && npm install cheerio'); }
  }
}

module.exports = { parseArgs, readUrlList, slugForUrl, originOf, get, runPool, loadJSON, writeJSON, esc, requireCheerio };
