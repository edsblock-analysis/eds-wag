/* Fetch + structural extraction for every URL in url/blog-walgreens.txt
   Produces:
   - pages/<slug>.html            raw HTML (cached)
   - data/pages.json              per-URL structured evidence
   No sampling: every URL is fetched and parsed individually.
*/
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const URL_FILE = path.join(ROOT, 'url', 'blog-walgreens.txt');
const OUT_DIR = path.resolve(__dirname, '..');
const HTML_DIR = path.join(OUT_DIR, 'pages');
const DATA_DIR = __dirname;
fs.mkdirSync(HTML_DIR, { recursive: true });

const urls = fs.readFileSync(URL_FILE, 'utf8')
  .split('\n')
  .map(l => l.replace(/^\s*\d+\s+/, '').trim())
  .filter(l => l.startsWith('http'));

function slugFor(u) {
  return u.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').slice(0, 180);
}

function get(url, redirects = 0) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EDS-Migration-Analysis/1.0)' },
      timeout: 30000,
    }, (res) => {
      const { statusCode } = res;
      if ([301, 302, 303, 307, 308].includes(statusCode) && res.headers.location && redirects < 5) {
        res.resume();
        const next = new URL(res.headers.location, url).href;
        return resolve(get(next, redirects + 1).then(r => ({ ...r, redirectedTo: next, origStatus: statusCode })));
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

// ---- structural extraction ----
function extract(url, html, status) {
  const $ = cheerio.load(html);
  const rec = { url, status, template: null, title: null, description: null, lang: null, blocks: {}, variations: {}, integrations: [], embeds: [], meta: {} };

  rec.template = $('meta[name="template"]').attr('content') || null;
  rec.title = ($('title').first().text() || '').trim().replace(/instagram-logo.*$/i, '').slice(0, 200);
  rec.description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || null;
  rec.lang = $('html').attr('lang') || null;
  rec.meta.h1 = $('h1').length;
  rec.meta.wordCount = ($('main, .main, body').first().text() || '').split(/\s+/).filter(Boolean).length;

  // Base components (cmp-name) and their variations (cmp-name--variant)
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

  // Non-cmp structural markers (custom widgets)
  const custom = {};
  [
    ['theater', '.theater__container'],
    ['watch-videos', '[class*="watch-videos"]'],
    ['hero-carousel', '[class*="hero-carousel"]'],
    ['trending-articles', '[class*="trending-articles"]'],
    ['editors-pick', '[class*="editors-pick"]'],
    ['teaser-card-list', '[class*="teaser-card-list"]'],
    ['teaser-card', '[class*="cmp-teaser-card"]'],
    ['explore', '[class*="cmp-explore"]'],
    ['explore-more', '[class*="cmp-explore-more"]'],
    ['breadcrumb', '.cmp-breadcrumb'],
    ['social-media', '.cmp-social-media'],
    ['scroll-to-top', '[class*="scroll-to-top"]'],
    ['search', '.cmp-search'],
    ['rich-text', '.cmp-text, .richtext, .rich-text'],
    ['image', '.cmp-image'],
    ['title', '.cmp-title'],
    ['button', '.cmp-button'],
    ['separator', '.cmp-separator'],
    ['embed', '.cmp-embed, .embed'],
  ].forEach(([name, sel]) => {
    const n = $(sel).length; if (n) custom[name] = n;
  });
  rec.custom = custom;

  // Card variation breakdown (the primary listing unit)
  rec.cards = {
    total: $('.cmp-card').length,
    hero: $('.cmp-card--variation-hero').length,
    small: $('.cmp-card--variation-small').length,
    medium: $('.cmp-card--variation-medium').length,
    video: $('.cmp-card--variation-video').length,
  };

  // Video / media detection
  rec.media = {
    scene7Viewer: /s7viewers|scene7\.com/.test(html),
    scene7VideoContainer: $('[class*="s7video"], [id*="s7viewer"], .theater__thumb').length,
    videoTag: $('video').length,
    theaterThumbs: $('.theater__thumb').length,
  };

  // iframes / embeds
  $('iframe[src]').each((i, el) => {
    const src = $(el).attr('src') || '';
    rec.embeds.push(src);
  });

  // Third-party integrations (by script src + inline hints)
  const scripts = $('script[src]').map((i, el) => $(el).attr('src')).get();
  const inline = $('script:not([src])').text().toLowerCase();
  const allSrc = scripts.join(' ');
  const detect = [
    ['Adobe Launch/DTM (Analytics tag mgmt)', /assets\.adobedtm\.com|launch-/i.test(allSrc)],
    ['Adobe Client Data Layer', /adobe-client-data-layer/i.test(allSrc) || /adobedatalayer|adobedatalayer/.test(inline)],
    ['Adobe Helix RUM', /rum\.hlx\.page|helix-rum/i.test(allSrc)],
    ['Scene7 / Dynamic Media (video)', /s7viewers|scene7\.com/i.test(allSrc + html)],
    ['OneTrust (cookie consent)', /cookielaw\.org|onetrust/i.test(allSrc)],
    ['Spotify embed', /open\.spotify\.com/i.test(html)],
    ['YouTube embed', /youtube\.com\/embed|youtu\.be/i.test(html)],
    ['Vimeo embed', /player\.vimeo\.com/i.test(html)],
    ['Google Tag Manager', /googletagmanager\.com/i.test(allSrc)],
    ['Bazaarvoice (ratings)', /bazaarvoice/i.test(allSrc + html)],
  ];
  detect.forEach(([name, present]) => { if (present) rec.integrations.push(name); });
  rec.scriptSrcs = scripts;

  return rec;
}

(async () => {
  const results = [];
  const concurrency = 12;
  let idx = 0, done = 0;
  async function worker() {
    while (idx < urls.length) {
      const my = idx++;
      const url = urls[my];
      const slug = slugFor(url);
      const htmlPath = path.join(HTML_DIR, slug + '.html');
      let html, status;
      if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).size > 500) {
        html = fs.readFileSync(htmlPath, 'utf8');
        status = 200; // cached
      } else {
        const r = await get(url);
        status = r.statusCode;
        html = r.body || '';
        if (status === 200 && html.length > 500) fs.writeFileSync(htmlPath, html);
      }
      let rec;
      try {
        rec = (status === 200 && html.length > 200) ? extract(url, html, status)
          : { url, status, template: null, error: 'non-200 or empty', blocks: {}, variations: {}, integrations: [], embeds: [] };
      } catch (e) {
        rec = { url, status, error: 'parse:' + e.message, blocks: {}, variations: {}, integrations: [], embeds: [] };
      }
      results[my] = rec;
      done++;
      if (done % 50 === 0) process.stderr.write(`  ...${done}/${urls.length}\n`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  fs.writeFileSync(path.join(DATA_DIR, 'pages.json'), JSON.stringify(results, null, 1));
  const ok = results.filter(r => r.status === 200).length;
  console.log(`Fetched/parsed ${results.length} URLs. 200 OK: ${ok}. Non-200: ${results.length - ok}`);
})();
