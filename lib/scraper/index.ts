'use server';
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url:string){
    if(!url) return;

    //Implement scraper
    //Bright data proxy intergrations
    const username = String(process.env.BRIGHT_DATA_USER_NAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);      
    const port = String(process.env.BRIGHT_DATA_PORT);
    const session_id = (1000000 * Math.random()) | 0;    
    const options=    {
        auth :{
            username:`${username}-session-${session_id}`,
            password:password,
        },
        host:'brd.superproxy.io',
        port:port,
        rejectUnauthorized: false,
        }

        try {
     
            const response = await axios.get(url, options);
            const $ = cheerio.load(response.data);
            const title = $('#productTitle').text().trim();
            const currentPrice = extractPrice($('#apex_desktop_dealsAccordionRow >#corePriceDisplay_desktop_feature_div >.a-section > .priceToPay > span.a-offscreen'),$('.priceToPay > span.a-offscreen'));
            const originalPrice = extractPrice( $('.a-size-base.a-color-price'),$('.a-price.a-text-price span.a-offscreen'),$('#priceblock_dealprice'),$('#listPrice'),$('.a-price.a-text-price span.a-offscreen'),$('.priceblock_ourprice'));
            const outOfStock = $('#availability span').text().trim();
            const image = $('#imgBlkFront').attr('data-a-dynamic-image') ||  $('#landingImage').attr('data-a-dynamic-image')||'{}';
            const imageUrls = Object.keys(JSON.parse(image));
            const currency = extractCurrency($('.a-price-symbol'));
            const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');
            const description = extractDescription($);
           
           
            const data = {
                url,
                currency: currency||'$',
                image: imageUrls[0],
                title,
                currentPrice:Number(currentPrice)||Number(originalPrice),
                originalPrice:Number(originalPrice)||Number(currentPrice),
                priceHistory:[],
                discountRate: Number(discountRate),
                category: 'category',
                reviewsCount:100,
                stars:4.5,
                isOutOfStock:outOfStock,
                description,
                lowestPrice:Number(currentPrice)||Number(originalPrice) , 
                highestPrice:Number(originalPrice)||Number(currentPrice) , 
                averagePrice:Number(currentPrice)||Number(originalPrice) , 
            }
         
           return data;
           
        } catch (error: any) {
            throw new Error("Failed to scrape product: " + error);
        }


}