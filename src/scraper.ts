const puppeteer = require('puppeteer');


type ProductProps = {
    categoria: string,
    name: string
}


const bestseller = async () => {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.amazon.com.br/bestsellers)")


    const product = await page.$$eval('[data-a-carousel-options]', (items: any[]) => {
        const bestsellers: ProductProps[] = []
        items.map((item) => {
            //item.querySelectorAll('card').forEach((element) => {})

            const categoria = item?.querySelector('.a-carousel-heading')?.innerText.trim()
            const name = item?.querySelector('.a-carousel-card a span div')?.innerText.trim()
            
            if (name) {
                bestsellers.push({categoria, name})
            }
            
            
        })
        return bestsellers
    })
    console.log(product);


    await browser.close();
    
}

bestseller(); 

