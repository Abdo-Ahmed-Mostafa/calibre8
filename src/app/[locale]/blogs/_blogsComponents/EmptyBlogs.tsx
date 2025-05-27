import Image from "next/image";
import React from "react";

const EmptyBlogs = () => {
  return (
    <div className=" w-full">
      <Image
        src={"/icons/144641328_10142439 2.svg"}
        alt=""
        width={1000}
        height={1000}
        className="w-[450px] mx-auto lg:w-[450px] lg:h-[450px]"
      />
      <p className="text-center text-[#000000] text-[40px] md:text-[72px] font-[700] mt-4">
        {/* {t("emptyPlogs")} */}
      </p>
    </div>
  );
};

export default EmptyBlogs;
