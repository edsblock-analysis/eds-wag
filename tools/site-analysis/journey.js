/* Commerce journey walk: PLP -> PDP -> add-to-cart -> cart, using the same realistic
   headless context that succeeded for the crawl. Captures the rendered DOM + testid
   families at each step to report/walgreens/journey/. Does NOT submit payment/PII. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '..', '..', 'report', 'walgreens', 'journey');
fs.mkdirSync(OUT, { recursive: true });
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36';

function tidFamilies(list) { return [...new Set(list)].sort(); }

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1366, height: 900 }, locale: 'en-US' });
  ctx.setDefaultTimeout(45000);
  const page = await ctx.newPage();
  const steps = [];
  async function capture(label, url) {
    try { await page.waitForLoadState('networkidle', { timeout: 15000 }); } catch (e) {}
    await page.waitForTimeout(1500);
    const data = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      h1: (document.querySelector('h1') || {}).innerText || null,
      testidCount: document.querySelectorAll('[data-testid]').length,
      testids: [...document.querySelectorAll('[data-testid]')].map(e => (e.getAttribute('data-testid') || '').replace(/[-_]?\d+$/, '')),
      addToCart: !!document.querySelector('[data-testid^=add-to-cart], [data-testid=add-to-fulfillment-btn], [data-testid=add-for-pickup-btn]'),
      cartCount: (document.querySelector('[data-testid=cart-icon]') || {}).innerText || null,
      denied: /Access Denied/i.test(document.title),
    }));
    data.step = label;
    steps.push(data);
    try { fs.writeFileSync(path.join(OUT, label + '.html'), await page.content()); } catch (e) {}
    console.log(`[${label}] ${data.denied ? 'ACCESS DENIED' : 'ok'} | ${data.url} | testids=${data.testidCount} | addToCart=${data.addToCart} | cart=${JSON.stringify(data.cartCount)}`);
    return data;
  }

  // 1) PLP via search (this path renders)
  await page.goto('https://www.walgreens.com/q/vitamin%20c', { waitUntil: 'domcontentloaded' });
  const plp = await capture('1-plp', page.url());

  // 2) PDP — click the first product card in-app
  const href = await page.evaluate(() => {
    const a = document.querySelector('[data-testid=product-list] a[href*="ID="]') || document.querySelector('a[href*="/store/c/"][href*="product"]');
    return a ? a.href : null;
  });
  if (href) {
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {}),
        page.evaluate(() => { const a = document.querySelector('[data-testid=product-list] a[href*="ID="]') || document.querySelector('a[href*="/store/c/"][href*="product"]'); if (a) a.click(); }),
      ]);
    } catch (e) {}
    await capture('2-pdp', href);
  }

  // 3) Add to cart (if a button is present and page not denied)
  const pdpDenied = steps.find(s => s.step === '2-pdp') && steps.find(s => s.step === '2-pdp').denied;
  if (!pdpDenied) {
    const clicked = await page.evaluate(() => {
      const b = document.querySelector('[data-testid=add-to-cart-btn], [data-testid=add-to-cart-btn-prod], [data-testid=add-for-pickup-btn], [data-testid=add-to-fulfillment-btn]');
      if (b) { b.click(); return true; } return false;
    });
    if (clicked) { await page.waitForTimeout(3000); await capture('3-after-add-to-cart', page.url()); }
    else console.log('[3] no add-to-cart button found on PDP');
  }

  // 4) Cart
  await page.goto('https://www.walgreens.com/cart/view-ui', { waitUntil: 'domcontentloaded' }).catch(() => {});
  await capture('4-cart', 'https://www.walgreens.com/cart/view-ui');

  fs.writeFileSync(path.join(OUT, 'journey.json'), JSON.stringify(steps, null, 1));
  await browser.close();
  console.log('\nJourney saved to report/walgreens/journey/');
})();
