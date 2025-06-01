import React from "react";
import ReusableCarousel from "../ReusableCarousel/ReusableCarousel";
import HeaderSectionHome from "./HeaderSectionHome";
import ViewAllButton from "./ViewAllButton";

import DataFetcher from "../DataFetcher";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const PartnersSwiper = async () => {
  const t = await getTranslations();

  return (
    <div>
      <HeaderSectionHome
        title={t("Customers Who Trust Us")}
        body={t(
          "Our trusted partners ensure we bring you the best products and services available"
        )}
      />
      <ViewAllButton href="/asdasd" />
      <DataFetcher<any>
        url="/api/public/partners"
        render={(partner) => {
          return (
            <ReusableCarousel
              slidesToShow={4}
              slidesToScroll={1}
              centerMode={true}
              dots={false}
            >
              {partner?.data.map((partner: any, index: number) => (
                <div key={partner.id || index} className="px-2 my-8">
                  <Link href={partner?.link} target="_blank">
                    <Image
                      src={partner?.image}
                      width={302}
                      height={238}
                      alt="asd"
                    />
                  </Link>
                  <h2 className="text-center text-[20px] font-semibold line-clamp-1">
                    {partner?.name}
                  </h2>
                </div>
              ))}
            </ReusableCarousel>
          );
        }}
      />
    </div>
  );
};

export default PartnersSwiper;
