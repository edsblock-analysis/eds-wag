// Survey content-page & homepage DOM structure across rendered pages that have
// few/no data-testid blocks, to design a content-block extractor.
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const dir = path.resolve(process.argv[2] || '.', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const roots = {};       // class-root -> page count (content pages only)
const idRoots = {};      // id-ish component markers
const sectionTags = {};
let contentPages = 0;
for (const f of files) {
  let html; try { html = fs.readFileSync(path.join(dir, f), 'utf8'); } catch (e) { continue; }
  if (!html.includes('data-render="pw"')) continue;
  const $ = cheerio.load(html);
  const testids = $('[data-testid]').length;
  // "content-ish" pages: not commerce SPA (few testids beyond global chrome ~9)
  if (testids > 15) continue;
  contentPages++;
  const seen = new Set();
  // component-ish class roots inside main content areas
  $('main [class], [role=main] [class], #maincontent [class], article [class], .content [class]').each((i, e) => {
    ($(e).attr('class') || '').split(/\s+/).forEach(c => {
      const r = c.split('__')[0].split('--')[0];
      if (/^[a-z][a-z0-9-]{5,}$/.test(r) && !/^(wag-|col-|row-|grid|aem-|icon|sr-only|d-|mt-|mb-|ml-|mr-|pt-|pb-|px-|py-|text-|font-|bg-|is-|has-|active|show|hide|open|close|display|position|flex|align|justify|width|height|margin|padding)/.test(r)) seen.add(r);
    });
  });
  seen.forEach(r => { roots[r] = (roots[r] || 0) + 1; });
  // data-component / data-block markers
  $('[data-component],[data-block],[data-module],[data-c],[data-testid-section]').each((i, e) => {
    const k = $(e).attr('data-component') || $(e).attr('data-block') || $(e).attr('data-module');
    if (k) idRoots[k.toLowerCase()] = (idRoots[k.toLowerCase()] || 0) + 1;
  });
}
function top(o, n) { return Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n); }
console.log('content-ish pages scanned:', contentPages);
console.log('\n=== component-ish class roots (page-weighted) ===');
top(roots, 70).forEach(kv => console.log('  ' + String(kv[1]).padStart(4) + '  ' + kv[0]));
console.log('\n=== data-component/block markers ===');
top(idRoots, 30).forEach(kv => console.log('  ' + String(kv[1]).padStart(4) + '  ' + kv[0]));
