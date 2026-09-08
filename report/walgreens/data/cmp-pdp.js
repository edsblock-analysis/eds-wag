const { chromium } = require('/backups/edsblock-analysis/eds-wag/repo/tools/site-analysis/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ headless: true, args:['--no-sandbox','--disable-dev-shm-usage'] });
  const ctx = await b.newContext({ userAgent:'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', viewport:{width:1366,height:900}, locale:'en-US' });
  const urls = process.argv.slice(2);
  for (const url of urls) {
    const p = await ctx.newPage();
    let denied=false;
    try { await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000}); } catch(e){}
    try { await p.waitForLoadState('networkidle',{timeout:20000}); } catch(e){}
    await p.waitForTimeout(2500);
    const d = await p.evaluate(()=>{
      const tids=[...new Set([...document.querySelectorAll('[data-testid]')].map(e=>(e.getAttribute('data-testid')||'').replace(/[-_]?\d+$/,'')))].filter(Boolean).sort();
      return { title:document.title, h1:(document.querySelector('h1')||{}).innerText||null, denied:/Access Denied/i.test(document.title), count:document.querySelectorAll('[data-testid]').length, tids };
    });
    console.log('\n===== '+url.replace('https://www.walgreens.com','')+' =====');
    console.log('  title:',(d.title||'').slice(0,60),'| denied:',d.denied,'| testids:',d.count);
    console.log('  h1:',(d.h1||'').slice(0,60));
    console.log('  TIDS: '+d.tids.join(', '));
    await p.close();
    await new Promise(r=>setTimeout(r,4000));
  }
  await b.close();
})();
