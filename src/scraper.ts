const puppeteer = require('puppeteer');
import { ProductProps } from "./scraperTypes";




export const bestseller = async (): Promise<ProductProps[] | undefined>  => {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.amazon.com.br/bestsellers)")


    try {
        
       const bestProducts = await page.$$eval('[data-a-carousel-options]', (items: any[]) => {
            const bestsellers: ProductProps[] = []
            items.forEach((item) => {
                const categoria = item?.querySelector('.a-carousel-heading')?.innerText.trim()
                const newName = categoria.split(' ')[3]
                item.querySelectorAll('.a-carousel-card ').forEach((element: { querySelector: (arg0: string) => { (): any; new(): any; innerText: string; }; }, index: number) => {
                    const name = element?.querySelector('a span div')?.innerText.trim()
                    const price = element?.querySelector('._cDEzb_p13n-sc-price_3mJ9Z')?.innerText.trim()
                    if (index < 2 && name && newName === 'Ferramentas') {
                        bestsellers.push({categoria: newName, name, price})
                    } else if (index < 3 && name && newName === 'Livros') {
                        bestsellers.push({categoria: newName, name, price})
                    }
                    
                })
                
            })
            return bestsellers
        })

        await browser.close();
        return bestProducts
        
        
    } catch (error) {
        console.log({status: 500, mensage: 'Erro ao buscar Produto'});
        await browser.close();
        return undefined
        
        
    }
    
}


module.exports = {bestseller};