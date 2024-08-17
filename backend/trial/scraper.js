const puppeteer = require('puppeteer');

async function scrapeWebpage(url) {
  try {
    // Launch the browser
    const browser = await puppeteer.launch();
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

  } catch (error) {
    console.error('Error scraping webpage:', error.message);
  }
}

// Example usage
const targetUrl = 'https://www.geeksforgeeks.org/immediately-invoked-function-expressions-iife-in-javascript/';
scrapeWebpage(targetUrl);