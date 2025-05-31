import React from "react";
import HeaderSectionHome from "./HeaderSectionHome";

import ViewAllButton from "./ViewAllButton";
import DataFetcher from "../DataFetcher";
import ReusableCarousel from "../ReusableCarousel/ReusableCarousel";

import TestomenolCard from "../card/TestomenolCard";

import { getTranslations } from "next-intl/server";

const TestomenolsHome = async () => {
  const t = await getTranslations();
  return (
    <section>
      <HeaderSectionHome
        title={t("Testomenols")}
        body={t(
          "See what our happy customers have to say about their experience with our products"
        )}
      />
      <ViewAllButton href="/asdasd" />
      <DataFetcher<any>
        url="/api/public/testimonials"
        render={(Testomenols) => {
          return (
            <ReusableCarousel
              slidesToShow={2}
              slidesToScroll={1}
              centerMode={true}
              dots={false}
            >
              {Testomenols?.data.map((data: any, index: number) => (
                <div key={index} className="px-2">
                  {" "}
                  {/* ممكن تضيف padding للترتيب */}
                  <TestomenolCard data={data} />
                </div>
              ))}
            </ReusableCarousel>
          );
        }}
      />
    </section>
  );
};

export default TestomenolsHome;
