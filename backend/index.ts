
import puppeteer from "puppeteer";
import { mongoDBURL } from "./config";
import { MongoClient } from "mongodb";


async function scrapeWebpage(url: string) {

  let browser;
  let client;
  try {

    // Connect to MongoDB
    client = new MongoClient(mongoDBURL!);
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db();
    const collection = db.collection('scrapedData');


    // Launch the browser  { headless: false } for debugging
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the URL
    const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    if (response && response.status() === 404) {
      throw new Error('Page Not Found (404)');
    }

    // Extract the title
    const title = await page.title();

    // Extract all paragraph texts
    const paragraphs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('p')).map(p => p.textContent)
    );

    // // Print the scraped data to the console
    // console.log('Title:', title);
    // console.log('Paragraphs:');
    // paragraphs.forEach((p, index) => console.log(`${index + 1}. ${p}`));

    // Store the scraped data in the MongoDB collection
    const data = {
      url,
      title,
      paragraphs,
      scrapedAt: new Date()
    };
    const result = await collection.insertOne(data);
    console.log(`Data inserted with ID: ${result.insertedId}`);

    // // Close the browser
    // await browser.close();

  } catch (error: Error | any) {
    console.error('Error scraping webpage:', error.message);

    // Store error in the MongoDB collection
    if (client) {
      const db = client.db();
      const errorCollection = db.collection('scrapeErrors');
      await errorCollection.insertOne({
        url,
        error: error.message,
        occurredAt: new Date()
      });
      console.log('Error logged to database');
    }
  }
  finally {
    // close the browser and client
    if (browser) await browser.close();
    if (client) await client.close();
  }
}

// const targetUrl = 'https://www.geeksforgeeks.org/immediately-invoked-function-expressions-iife-in-javascript/';
//const targetUrl = 'https://www.reddit.com/r/Headstarter/';
//'https://tushdev.co/';
// const targetUrl = 'https://old.reddit.com/';
const targetUrl = 'https://tushdev.co/';
scrapeWebpage(targetUrl);



// console.log("Hello World");