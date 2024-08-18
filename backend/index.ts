import express, { Request, Response } from 'express';
import { scrapeWebpage } from "./scraper";
const cors = require('cors');
import { PORT } from "./config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/scrape', async (req: Request, res: Response) => {
    try {
        const url: string = req.body.url; // Assuming the URL is sent as JSON { url: "http://example.com" }
        const data = await scrapeWebpage(url);
        res.json(data);
    } catch (error: Error | any) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



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