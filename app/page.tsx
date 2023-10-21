import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import SeachBar from "@/components/SeachBar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";
import React from "react";

const productsTrending = [
 { name: "Computer Products" },
 { name: "Clothing Products" },
 { name: "FootWear Products" },
];
const home = async () => {
 let allProducts = await getAllProducts();

 return (
  <>
   <section className="px-6 md:px-20 py-4  border-red-500">
    <div className="flex max-xl:flex-col gap-16">
     <div className="flex flex-col justify-center">
      <p className="small-text">
       Smart Shopping Start here
       <Image
        src="/assets/icons/arrow-right.svg"
        alt="arrow-right"
        width={20}
        height={20}
       />
      </p>

      <h1 className="head-text">
       <span className="text-primary"> Pricer </span>: Your Price-Beating
       Companion
      </h1>

      <p className="mt-6 paragraph-text">
       Pricer is here to make you a shopping genius. Discover the lowest prices
       on Amazon, AliExpress, and eBay effortlessly.
      </p>
      <SeachBar />
     </div>

     <div>
      <HeroCarousel />
     </div>
    </div>
   </section>

   <section className="trending-section">
    <h2 className="section-text">Trending</h2>
    <div className="flex flex-wrap gap-x-8 gap-y-16">
     {allProducts?.map((product) => (
      <>
       <ProductCard key={product._id} product={product} />
      </>
     ))}
    </div>
   </section>
  </>
 );
};

export default home;
