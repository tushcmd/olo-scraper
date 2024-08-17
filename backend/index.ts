import puppeteer from "puppeteer";

async function scrapeWebpage(url: string) {
    try {
        // Launch the browser  { headless: false } for debugging
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Navigate to the URL
        await page.goto(url);

        // Extract the title
        const title = await page.title();

        // Extract all paragraph texts
        const paragraphs = await page.evaluate(() =>
            Array.from(document.querySelectorAll('p')).map(p => p.textContent)
    );

    // Print the scraped data to the console
    console.log('Title:', title);
    console.log('Paragraphs:');
    paragraphs.forEach((p, index) => console.log(`${index + 1}. ${p}`));

    // Close the browser
    await browser.close();

  } catch (error: Error | any ) {
    console.error('Error scraping webpage:', error.message);
  }
}

// const targetUrl = 'https://www.geeksforgeeks.org/immediately-invoked-function-expressions-iife-in-javascript/';
//const targetUrl = 'https://www.reddit.com/r/Headstarter/';
//'https://tushdev.co/';
const targetUrl = 'https://old.reddit.com/';
scrapeWebpage(targetUrl);



// console.log("Hello World");