const { chromium } = require("playwright");

const SP = "C:/Users/DIVYAN~1/AppData/Local/Temp/claude/d--DBS-interior-dreamy-remix/39747f24-c6e4-469d-adbb-880fa74d49aa/scratchpad";
const pages = ["/", "/about", "/services", "/projects", "/contact"];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  for (const path of pages) {
    await page.goto(`http://localhost:8081${path}`, { waitUntil: "networkidle" });

    const before = await page.evaluate(() => {
      const header = document.querySelector("header");
      const rect = header.getBoundingClientRect();
      return { top: rect.top, scrollY: window.scrollY, position: getComputedStyle(header).position };
    });

    await page.mouse.wheel(0, 2500);
    await page.waitForTimeout(400);

    const after = await page.evaluate(() => {
      const header = document.querySelector("header");
      const rect = header.getBoundingClientRect();
      return { top: rect.top, scrollY: window.scrollY, position: getComputedStyle(header).position };
    });

    console.log(
      `${path.padEnd(12)} position=${after.position}  before(top=${before.top}, scrollY=${before.scrollY})  after(top=${after.top}, scrollY=${after.scrollY})  ` +
        (after.position === "sticky" && after.top === 0 && after.scrollY > 100
          ? "STICKY OK"
          : "NOT STICKY"),
    );

    await page.screenshot({ path: `${SP}/sticky_${path.replace(/\//g, "home")}.png` });
  }

  await browser.close();
})();
