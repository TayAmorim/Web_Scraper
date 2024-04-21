import { ProductProps } from "../scraperTypes";
import chromium  from '@sparticuz/chromium'
import puppeteer from 'puppeteer';

export const bestseller = async (): Promise<ProductProps[]>  => {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto("https://www.amazon.com.br/bestsellers")
    await page.setViewport({width: 1080, height: 1024});


    try {
        
       const bestProducts = await page.$$eval('[data-a-carousel-options]', (items: any[]) => {
            const bestsellers: ProductProps[] = []
            items.forEach((item) => {
                const categoria = item?.querySelector('.a-carousel-heading')?.innerText.trim()
                const newName = categoria.split(' ')[3]
                item.querySelectorAll('.a-carousel-card').forEach((element: HTMLLIElement, index: number) => {
                    const productId = element.querySelector<HTMLDivElement>('div')?.dataset.asin;
                    const name = element.querySelector<HTMLDivElement>('a span div')?.innerText.trim()
                    const price = element.querySelector<HTMLSpanElement>('.a-color-price')?.innerText.trim()
                    if (index < 2 && name && price && productId) {
                        bestsellers.push({categoria: newName, name, price, productId})
                    }
                    
                })
                
            })
            return bestsellers
        })

        await browser.close();
        return bestProducts
        
        
    } catch (error) {
        await browser.close();
        throw error
        
        
    }
    
}


