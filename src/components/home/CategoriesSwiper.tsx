import React from "react";
import { useTranslations } from "next-intl";
import ReusableCarousel from "../ReusableCarousel/ReusableCarousel";
import Image from "next/image";
import HeaderSectionHome from "./HeaderSectionHome";
import ViewAllButton from "./ViewAllButton";
import DataFetcher from "../DataFetcher";

export default function CategoriesSection() {
  const t = useTranslations();

  return (
    <section>
      <div className=" mx-auto">
        <HeaderSectionHome
          title={t("Categories")}
          body={t("and planers perfect for precision and efficiency")}
        />
        <ViewAllButton href="/asdasd" />
        <DataFetcher<any>
          url="/api/public/categories"
          render={(categories) => {
            return (
              <ReusableCarousel slidesToShow={5} dots={false}>
                {categories?.data.map((card: any, idx: any) => (
                  <div key={idx} className="">
                    <div className=" rounded-lg  p-5 text-center">
                      <div className="bg-white shadow-md   min-h-[130px] max-h-[140px] mb-4 relative">
                        <Image
                          src={card?.image}
                          alt={card?.title || "test"}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <h3 className="text-lg font-semibold">{card?.name}</h3>
                      {card?.description && (
                        <p className="text-gray-500 mt-2">{card.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </ReusableCarousel>
            );
          }}
        />
      </div>
    </section>
  );
}
