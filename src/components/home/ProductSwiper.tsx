import React from "react";
import ReusableCarousel from "../ReusableCarousel/ReusableCarousel";
// import Image from "next/image";
import HeaderSectionHome from "./HeaderSectionHome";
// import Link from "next/link";
import ViewAllButton from "./ViewAllButton";
import DataFetcher from "../DataFetcher";

import { getTranslations } from "next-intl/server";

export default async function ProductSwiper() {
  const t = await getTranslations();
  return (
    <section className="">
      <div className=" mx-auto">
        <HeaderSectionHome
          title={t("Featured Products")}
          body={t(
            "Experience top quality and performance with our featured product"
          )}
        />
        <div className="mb-5">
          {" "}
          <ViewAllButton href="/asdasd" />
        </div>
        <DataFetcher<any>
          url="/api/public/products"
          render={(products) => (
            <ReusableCarousel
              slidesToShow={4}
              slidesToScroll={1}
              centerMode={true}
              dots={false}
            >
              {products?.data.map((product: any, index: number) => (
                <div key={index} className="px-2">
                  {/* <ProductCard product={product} /> */}
                </div>
              ))}
            </ReusableCarousel>
          )}
        />
      </div>
    </section>
  );
}
