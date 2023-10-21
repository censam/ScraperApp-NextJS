import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
 product: Product;
}

const ProductCard = ({ product }: Props) => {
 return (
  <Link className="product-card" href={`/products/${product._id}`}>
   <div className="product-card_img-container">
    <Image
     src={product.image}
     alt={product.title}
     width={400}
     height={600}
     className="product-card_img"
    />
    <div className="flex flex-col gap-3">
     <h3 className="product-title">{product.title}</h3>

     <div className="flex justify-between">
      <p className="text-black opacity-50 text-lg capitalize">
       {product.category}
      </p>
      <p className="text-black text-lg font-serif">
       <span>{product?.currency}</span>
       <span>{product?.currentPrice}</span>
      </p>
     </div>
    </div>
   </div>
  </Link>
 );
};

export default ProductCard;
