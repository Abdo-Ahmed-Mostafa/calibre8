import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const EmptyPage = ({ text, handleAdd }: { text?: string; handleAdd?: any }) => {
  const t = useTranslations("");
  return (
    <div className=" w-full">
      <Image
        src={"/icons/144641328_10142439 2.svg"}
        alt=""
        width={1000}
        height={1000}
        className="w-[450px] mx-auto lg:w-[450px] lg:h-[450px]"
      />
      <div className="flex flex-col gap-6">
        <p className="text-center text-[#000000] text-[40px] md:text-[48px] font-[700] mt-4">
          {text}
        </p>{" "}
        {handleAdd && (
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              className="bg-[var(--main)]  py-2 cursor-pointer text-white rounded-xl w-[35%] flex justify-center items-center gap-2 font-bold text-[19px]"
            >
              {" "}
              <IoLocationSharp />
              {t("Add Address")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyPage;
