import React from "react";
import HeaderSectionHome from "./HeaderSectionHome";
import ViewAllButton from "./ViewAllButton";
import AccordionReusable from "../form/AccordionReusable";
import Image from "next/image";
import DataFetcher from "../DataFetcher";
import { getTranslations } from "next-intl/server";

const FQSHome = async () => {
  const t = await getTranslations();
  return (
    <div>
      {" "}
      <HeaderSectionHome
        title={t("FQS")}
        body={t(
          "Find answers to common questions about our products, services, and policies We've got you covered!"
        )}
      />
      <div className="my-6">
        {" "}
        <ViewAllButton href="/asdasd" />
      </div>
      <div className="mx-5 flex flex-col md:flex-row gap-24">
        <div className="md:hidden block w-full h-full">
          <Image
            src="/FQSImage.png"
            alt="FQSImage"
            width={900}
            height={900}
            className="object-contain"
            priority
          />{" "}
        </div>
        <div className="w-full md:w-[50%]">
          {" "}
          <DataFetcher<any>
            url="/api/public/fq"
            render={(fq) => {
              console.log("asdasdasfavxzfq", fq);

              return (
                <>
                  {fq?.data?.map((data: any, index: number) => {
                    return (
                      <div key={index} className="flex flex-col gap-3">
                        {" "}
                        <div className="my-3">
                          {" "}
                          <AccordionReusable
                            title={data?.question}
                            discreption={data?.answer}
                          />
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            }}
          />
        </div>
        <div className="hidden md:block w-[535px] h-[535px]">
          <Image
            src="/FQSImage.png"
            alt="FQSImage"
            width={535}
            height={535}
            className="object-contain"
            priority
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default FQSHome;
