import { FormEvent, useState } from "react";
import { Link, Loader2 } from "lucide-react";

interface ScrapedData {
    url: string;
    title: string;
    paragraphs: string[];
    scrapedAt: string; // Timestamp of when the data was scraped
}

export default function ScrapeForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);

    async function handleSubmit(_event: FormEvent<HTMLFormElement>): Promise<void> {
        _event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: inputValue }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setScrapedData(data);
            console.log("Scraped data:", data);
        } catch (error) {
            console.error("Error during scraping:", error);
            setScrapedData(null);
        } finally {
            setLoading(false);
        }
    }

    // async function handleSubmit(_event: FormEvent<HTMLFormElement>): Promise<void> {
    //     _event.preventDefault();
    //     setLoading(true);
    //     try {
    //         const response = await fetch('http://localhost:8080/scrape', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ url: inputValue }),
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         setScrapedData(data)
    //         console.log("Response from server:", data);
    //         // console.log(data);

    //     } catch (error) {
    //         console.error("Error:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <section className='mt-16 w-full max-w-xl'>
            <img src="/scrape-spider.png" alt="scrape spider" />
            <div className='flex flex-col w-full gap-2'>
                <form
                    className='relative flex justify-center items-center'
                    onSubmit={handleSubmit}
                >
                    <div className='absolute left-0 my-2 ml-3 w-5'>
                        <Link className="w-4 h-4" />
                    </div>

                    <input
                        type='url'
                        placeholder='Paste the website link'
                        required
                        className='url_input peer text-muted-foreground'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} // Track input value
                    />
                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-muted-foreground peer-focus:text-muted-foreground'
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <p>↵</p>}
                    </button>
                </form>
            </div>
            {/* Display the scraped data */}
            {scrapedData && (
                <div className="mt-8">
                    <h3>{scrapedData.title}</h3>
                    <p><strong>URL:</strong> {scrapedData.url}</p>
                    <div>
                        <h4>Paragraphs:</h4>
                        <ul>
                            {scrapedData.paragraphs.map((paragraph: string, index: number) => (
                                <li key={index}>{paragraph}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}

// throw new Error("Function not implemented.");
// console.log('please implement me')