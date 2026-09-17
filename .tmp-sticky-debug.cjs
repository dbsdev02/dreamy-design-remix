const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://localhost:8081/", { waitUntil: "networkidle" });

  const chain = await page.evaluate(() => {
    const header = document.querySelector("header");
    const out = [];
    let el = header;
    while (el) {
      const cs = getComputedStyle(el);
      out.push({
        tag: el.tagName,
        cls: el.className && el.className.toString().slice(0, 60),
        overflow: cs.overflow,
        overflowX: cs.overflowX,
        overflowY: cs.overflowY,
        display: cs.display,
        position: cs.position,
        transform: cs.transform,
      });
      el = el.parentElement;
    }
    return out;
  });

  console.log(JSON.stringify(chain, null, 2));
  await browser.close();
})();
