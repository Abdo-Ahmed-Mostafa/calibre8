"use client";
import React from "react";
import ProductCard from "@/components/card/ProductCard";
import { useMainHook } from "@/lib/Hook/useMainHook";
import useProducts from "@/lib/Hook/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import EmptyPage from "@/components/EmptyPage";

const Compare = ({ productDetails }: { productDetails: any }) => {
  const { products, toggleFavorite, addToCart }: any = useProducts();
  const { t } = useMainHook();

  const relatedProducts = products?.data?.filter(
    (product: any) =>
      product?.category?.id === productDetails?.category?.id &&
      product?.id !== productDetails?.id
  );

  return (
    <div className="mt-10 bg-[#F7FFF2] border shadow rounded-[16px] p-5">
      <div className="ps-4">
        <h3 className="text-[#071200] font-[700] text-[20px]  mb-5 xl:text-[32px]">
          {t("Related Top Product Compare")}
        </h3>
        <p className="text-[#4B5744] text-[16px] font-[400]">
          {t("You can choose at least 3 products to compare them")}
        </p>
      </div>
      {relatedProducts?.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-4"
        >
          {relatedProducts.map((product: any) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                toggleFavoirite={toggleFavorite}
                addToCart={addToCart}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <EmptyPage text={t("No Related Products")} />
      )}
    </div>
  );
};

export default Compare;
