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
        title={t("HomePage.Partners")}
        body={t("HomePage.Our trusted partners")}
      />
      <ViewAllButton href="/asdasd" />
      <DataFetcher<any>
        url="/api/public/partners"
        render={(partner) => {
          console.log("aasdafax", partner);

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
                      src={"/FlukeTest.png"}
                      width={302}
                      height={238}
                      alt="asd"
                    />
                  </Link>
                  <h2 className="text-center text-[20px] font-semibold line-clamp-1">
                    {partner?.title}
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
