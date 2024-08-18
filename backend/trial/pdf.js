const puppeteer = require('puppeteer');


async function savePdf(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({ path: `tush.pdf` });
    await browser.close();
}

const targetUrl = 'https://tushdev.co/';
// const targetUrl = 'https://bot.sannysoft.com/';
savePdf(targetUrl);




// const puppeteer = require('puppeteer');

// (async () => {

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://news.ycombinator.com', {
//         waitUntil: 'networkidle2',
//     });
//     // Saves the PDF to hn.pdf.
//     await page.pdf({
//         path: 'hn.pdf',
//     });

//     await browser.close();
// })