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

        items.forEach((item) => {
            const categoria = item?.querySelector('.a-carousel-heading')?.innerText.trim()
            const newName = categoria.split(' ')[3]
            item.querySelectorAll('.a-carousel-card ').forEach((element: { querySelector: (arg0: string) => { (): any; new(): any; innerText: string; }; }, index: number) => {
                const name = element?.querySelector('a span div')?.innerText.trim()
                if (index < 1 && name && newName === 'Ferramentas') {
                    bestsellers.push({categoria: newName, name})
                } else if (index < 2 && name && newName === 'Cozinha') {
                    bestsellers.push({categoria: newName, name})
                }
                
            })
            
        })
        return bestsellers
    })
    console.log(product);


    await browser.close();
    
}

bestseller(); 

