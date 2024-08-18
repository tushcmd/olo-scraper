import express, { Request, Response } from 'express';
import { scrapeWebpage } from "./scraper";
import cors from 'cors';
import { PORT } from "./config";

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);
app.use(express.json());
app.use(express.static('public'));

app.post('/scrape', async (req: Request, res: Response) => {
    try {
        const { url }: { url: string } = req.body;
        // const { url } = req.body; // Extract the url from req.body
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const data = await scrapeWebpage(url);
        res.json(data);
        // await scrapeWebpage(url);
        // res.json({ message: "Scraping completed successfully" });
    } catch (error: Error | any) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});


// import express, { Request, Response } from 'express';
// import { scrapeWebpage } from "./scraper";
// const cors = require('cors');
// import { PORT } from "./config";

// const app = express();

// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
// app.use(express.json());
// app.use(express.static('public'));

// app.post('/scrape', async (req: Request, res: Response) => {
//     try {
//         // const url: string = req.body.url; // Assuming the URL is sent as JSON { url: "http://example.com" }
//         const url = req.body; // data received is stringified
//         const data = await scrapeWebpage(url);
//         res.json(data);
//     } catch (error: Error | any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



// import { scrapeWebpage } from "./scraper";
// import express, { Request, Response } from 'express';
// const cors = require('cors');
// import { PORT } from "./config";


// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// app.post('/scrape', async (req: Request, res: Response) => {
//   try {
//     const url = req.body;
//     const data = await scrapeWebpage(url);
//     // res.json(data);
//     res.json();
//   } catch (error: Error | any) {
//     res.status(500).json({ error: error.message });
//   }
// })

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });