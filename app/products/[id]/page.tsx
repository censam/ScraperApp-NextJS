import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
 params: { id: string };
};

const productDetails = async ({ params: { id } }: Props) => {
 const product: Product = await getProductById(id);
 if (!product) redirect("/");

 const similarProducts = await getSimilarProducts(id);

 return (
  <div className="product-container">
   <div className="flex gap-28 xl:flex-row flex-col">
    <div className="product-image">
     <Image
      src={product.image}
      alt={product.title}
      width={400}
      height={500}
      className="mx-auto"
     />
    </div>
    <div className="flex flex-1 flex-col">
     <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
      <div className="flex flex-col gap-3">
       <p className="text-[28px] text-secondary font-semibold">
        {product.title}
       </p>

       <Link
        href={product.url}
        className="text-base text-black opacity-50"
        target="_blank"
        rel="noopener">
        Visit Product
       </Link>
      </div>

      <div className="flex items-center gap-3">
       <div className="product-hearts">
        <Image
         src="/assets/icons/red-heart.svg"
         alt="heart"
         width={20}
         height={20}
        />

        <p className="text-base font-semibold text-[#D46F77]">
         {product.reviewsCount}
        </p>
       </div>

       <div className="p-2 bg-white-200 rounded-10">
        <Image
         src={"/assets/icons/bookmark.svg"}
         alt="bookmark"
         width={20}
         height={20}
        />
       </div>

       <div className="p-2 bg-white-200 rounded-10">
        <Image
         src={"/assets/icons/share.svg"}
         alt="share"
         width={20}
         height={20}
        />
       </div>
      </div>
     </div>

     <div className="product-info">
      <div className="flex flex-col gap-2">
       <p className="text-[34px] text-secondary font-bold">
        {product.currency} {formatNumber(product.currentPrice)}
       </p>
       <p className="text-[21px] text-black line-through opacity-50">
        {product.currency} {formatNumber(product.originalPrice)}
       </p>
      </div>

      <div className="flex flex-col gap-4">
       <div className="flex gap-3">
        <div className="product-stars">
         <Image
          src={"/assets/icons/star.svg"}
          alt="star"
          width={16}
          height={16}
         />
         <p className="text-sm text-primary-orange font-semibold">
          {product.stars || "25"}
         </p>
        </div>

        <div className="product-reviews">
         <Image
          src={"/assets/icons/comment.svg"}
          alt="comment"
          width={16}
          height={16}
         />
         <p className="text-sm text-secondary font-semibold">
          {product.reviewsCount || "25"} Reviews
         </p>
        </div>
       </div>
       <p className="text-xs text-black opacity-90">
        <span className="text-primary-green font-semibold">93% </span> buyers
        reccommended this product.
       </p>
      </div>
     </div>
     <div className="my-7 flex flex-col gap-5">
      <div className="flex gap-5 flex-wrap">
       <PriceInfoCard
        title="Current Price"
        iconSrc="/assets/icons/price-tag.svg"
        value={`${product.currency} ${formatNumber(product.currentPrice)}`}
        borderColor="#b6bdff"
       />
       <PriceInfoCard
        title="Current Price"
        iconSrc="/assets/icons/chart.svg"
        value={`${product.currency} ${formatNumber(product.averagePrice)}`}
        borderColor="#cb1278"
       />
       <PriceInfoCard
        title="Highest Price"
        iconSrc="/assets/icons/arrow-up.svg"
        value={`${product.currency} ${formatNumber(product.highestPrice)}`}
        borderColor="#2e12cb"
       />
       <PriceInfoCard
        title="Lowest Price"
        iconSrc="/assets/icons/arrow-down.svg"
        value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
        borderColor="orange-400"
       />
      </div>
     </div>

     <div>
      <div>
       <Modal />
      </div>
     </div>
    </div>
   </div>
   <div className="flex flex-col gap-4">{product.description?.split(`\n`)}</div>
   <button className="btn w-fit mx-auto flex items-start justify-center gap-3 min-w-[200px]">
    <Image src="/assets/icons/bag.svg" alt="check" width={22} height={22} />
    <Link href={""} className="text-base text-white">
     Buy Now
    </Link>
   </button>

   {similarProducts && similarProducts.length > 0 && (
    <section className="trending-section">
     <h2 className="section-text">Similar Products</h2>
     <div className="flex flex-wrap gap-x-8 gap-y-16">
      {similarProducts?.map((similarProduct) => (
       <>
        <ProductCard key={similarProduct._id} product={similarProduct} />
       </>
      ))}
     </div>
    </section>
   )}

   {!similarProducts && <div className="py-4">No Similar Products</div>}
  </div>
 );
};

export default productDetails;
