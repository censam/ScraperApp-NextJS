"use server";

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string){
    if(!productUrl){return;}

    try {

        
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct){return;}

        //store product data to db  
    } catch (error: any) {
        throw new Error('Failed to create/update product : ' + productUrl, error);
    }
}