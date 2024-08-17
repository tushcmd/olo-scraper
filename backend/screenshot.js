const puppeteer = require('puppeteer');


async function takeScreenshot(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: `screenshot.png` });
    await browser.close();
}

const targetUrl = 'https://tushdev.co/';
takeScreenshot(targetUrl);
