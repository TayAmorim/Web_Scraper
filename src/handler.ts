import { bestseller } from './scraper';


async function handleBd () {
    try {
        const listProduct = await bestseller()
    console.log(listProduct);
    } catch (error) {
        
    }

   
    

}

handleBd()