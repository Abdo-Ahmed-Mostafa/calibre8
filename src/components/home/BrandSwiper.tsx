import React from "react";
import ReusableCarousel from "../ReusableCarousel/ReusableCarousel";
import HeaderSectionHome from "./HeaderSectionHome";
import ViewAllButton from "./ViewAllButton";

import DataFetcher from "../DataFetcher";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const PrandsSwiper = async () => {
  const t = await getTranslations();
  return (
    <div>
      <HeaderSectionHome
        title={t("HomePage.Brands")}
        body={t("HomePage.Experience top quality Brand")}
      />
      <ViewAllButton href="/asdasd" />
      <DataFetcher<any>
        url="/api/public/brand"
        render={(brand) => {
          console.log("221342412412412", brand);

          return (
            <ReusableCarousel slidesToShow={4} centerMode={true} dots={false}>
              {brand?.data.map((brand: any, index: number) => (
                <div
                  key={brand?.id || index}
                  className="px-2 my-8 flex flex-col items-center"
                >
                  <div className="  w-[210px] h-[210px]  xl:w-[250px] xl:h-[250px] rounded-full overflow-hidden mx-auto">
                    <Image
                      src={"/flukeRounded.png"}
                      width={250}
                      height={250}
                      alt="asd"
                      className="object-cover w-full h-full"
                      style={{ clipPath: "circle(50%)" }}
                    />
                  </div>
                  <h2 className="text-center text-[20px] font-semibold mt-4">
                    {brand?.name}
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

export default PrandsSwiper;
