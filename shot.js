const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const contact = page.locator("section").last();
  await contact.scrollIntoViewIfNeeded();
  await contact.screenshot({ path: "/private/tmp/claude-502/-Users-dscoble-Desktop-misc-dev-site-portfolio/f656aef7-4ba1-4c92-bc96-d023c577bfb8/scratchpad/footer.png" });
  await page.screenshot({ path: "/private/tmp/claude-502/-Users-dscoble-Desktop-misc-dev-site-portfolio/f656aef7-4ba1-4c92-bc96-d023c577bfb8/scratchpad/full.png", fullPage: true });
  await browser.close();
})();
