import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const BottomInfoCards = () => {
  const t = useTranslations();

  const data = [
    {
      icon: "/icons/aboutUsLogin.svg",
      title: t("About US"),
      description: t("Get to know more about us"),
    },
    {
      icon: "/icons/contactUsLogin.svg",
      title: t("Contact US"),
      description: t("We are Here to Help"),
    },
    {
      icon: "/icons/faqsLogin.svg",
      title: t("faq"),
      description: t("Get All Answers"),
    },
  ];
  return (
    <div className=" p-10 ">
      <div className="flex flex-wrap justify-center  ">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-[300px] md:w-[350px]  bg-white gap-8 rounded-lg shadow-md p-10 mx-4 my-4 flex flex-col items-center text-center"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={60}
              height={60}
              // className="w-10 h-10 mb-2"
            />
            <span>
              {" "}
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomInfoCards;
