"use client";
import Image from "next/image";
import ChangeLanguage from "@/components/ui/changeLanguage/ChangeLanguage";

const TopBar = () => {
  return (
    <div className=" bg-[#EBEBEB] pe-16">
      <div className="hidden md:flex  justify-between items-center w-[77.9%] pe-10  ms-auto  bg-[#EBEBEB] px-6 py-[6px] text-[14px]">
        <div className="flex items-center xl:w-[57%]   xl:justify-between gap-4">
          <div className="flex gap-2  ">
            {[
              "linkedin",
              "instagram",
              "youtube",
              "tiktok",
              "facebook",
              "x",
              "whatsapp",
            ].map((icon) => (
              <Image
                key={icon}
                src={`/icons/${icon}.svg`}
                alt={icon}
                width={20}
                height={20}
                className="hover:opacity-80 cursor-pointer !size-[24px]"
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/IconMail.svg"
              alt="mail"
              width={18}
              height={18}
              className=" w-[30px] h-[23px]"
            />
            <span className="text-[#071200] font-[400] text-[16px]">
              calibre8@calibre-8.com
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
          <ChangeLanguage />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
