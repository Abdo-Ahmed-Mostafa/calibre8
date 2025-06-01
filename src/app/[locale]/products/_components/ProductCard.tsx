"use client";
import Image from "next/image";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({
  product,
  toggleFavoirite,
}: {
  product: any;
  toggleFavoirite: (id: number, favorite: boolean) => void;
}) => {
  return (
    <div className="col-span-full md:col-span-1 xl:col-span-1 p-4 relative">
      <div
        className="absolute top-2.5 right-2.5 bg-[#e6faf0e6] rounded-full flex justify-center items-center z-10"
        style={{ width: 30, height: 30 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavoirite(product?.id, product?.favorite);
        }}
      >
        {product?.favorite ? (
          <FaHeart className="w-4 h-4 text-[var(--main)]" />
        ) : (
          <FaRegHeart />
        )}
      </div>
      <Image
        className="w-full h-[250px] object-cover"
        src={product?.image}
        alt={product?.name}
        width={100}
        height={100}
      />
      <div className="mt-2 font-[600] text-[#071200] text-[24px] line-clamp-1">
        {product?.name}
      </div>
    </div>
  );
};

export default ProductCard;
