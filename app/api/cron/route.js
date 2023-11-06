import { generateEmailBody, sendEmail } from "@/lib/NODEMAILER";
import Product from "@/lib/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scraper";
import {
 getAveragePrice,
 getEmailNotifType,
 getHighestPrice,
 getLowestPrice,
} from "@/lib/utils";
import { NextResponse } from "next/server";

export const maxDuration = 9;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
 try {
  connectToDB();

  const products = await Product.find({});
  if (!products) throw new Error("Product not found");

  //scrape latest product details and update DB
  const updatedProducts = await Promise.all(
   products.map(async (currentProduct) => {
    const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

    if (!scrapedProduct) throw new Error("Product not found");

    const updatedPriceHistory = [
     ...currentProduct.priceHistory,
     { price: scrapedProduct.currentPrice },
    ];

    const product = {
     ...scrapedProduct,
     priceHistory: updatedPriceHistory,
     lowestPrice: getLowestPrice(updatedPriceHistory),
     highestPrice: getHighestPrice(updatedPriceHistory),
     averagePrice: getAveragePrice(updatedPriceHistory),
    };

    console.log(scrapedProduct);

    const updatedProduct = await Product.findOneAndUpdate(
     { url: product.url },
     product,
     { upsert: true, new: true }
    );

    //check each products status and send email accordingly
    const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct);

    if (emailNotifType && updatedProduct.users.length > 0) {
     const productInfo = {
      title: updatedProduct.title,
      url: updatedProduct.url,
     };

     const emailContent = await generateEmailBody(productInfo, emailNotifType);

     const userEmails = updatedProduct.users.map((user) => user.email);

     await sendEmail(emailContent, userEmails);
    }

    return updatedProduct;
   })
  );
  return NextResponse.json({ message: "ok", data: updatedProduct });
  //send notifications to subscribers
 } catch (error) {}
}
