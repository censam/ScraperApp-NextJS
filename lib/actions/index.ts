"use server";

import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../scraper/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) { return; }

    try {
        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        if (!scrapedProduct) { return; }

        let product = scrapedProduct;

        console.log("scrapedProduct", scrapedProduct);
        //store product data to db  

        const existingProduct = await Product.findOne({ url: scrapedProduct.url });

        if (existingProduct) {
            //update price history data

            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory, { price: scrapedProduct.currentPrice }
            ];

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory)
            }

        }
        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true }
        )

        revalidatePath(`/products/${newProduct._id}`);
    } catch (error: any) {
        console.log(error);
        throw new Error('Failed to create/update product : ', error);
    }
}


export async function getProductById(productId: string) {
    try {
        connectToDB();

        const product = await Product.findOne({ _id: productId });
        if (!product) { return null; }
        return product;
    } catch (error) {
        console.log(error);
    }
}


export async function getAllProducts() {
    try {
        connectToDB();
        const products = await Product.find({});
        if (!products) return null;

        return products;

    } catch (error) {
        console.log(error);
    }
}
