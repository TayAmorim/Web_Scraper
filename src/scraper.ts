const puppeteer = require('puppeteer');

const bestsellersv = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.amazon.com.br/bestsellers)")

    await page.waitForSelector('.a-section a-spacing-large')

    const product = await page.$$eval('.a-carousel-card', (items) => {
        const bestsellers: string[] = []
        items.map((item) => {
            const name = item?.querySelector('a span div')?.innerText.trim()
            if (name) {
                bestsellers.push(name)
            }
            
            
        })
        return bestsellers
    })
    console.log(product);
    
}

bestsellersv(); 

