"use client";
import SearchBar from "@/components/Header/SearchBar";
import { useMainHook } from "@/lib/Hook/useMainHook";
import React from "react";

const ProductHeader = ({
  handleSearch,
  setHandle,
}: {
  handleSearch: () => void;
  setHandle: any;
}) => {
  const { t } = useMainHook();
  return (
    <div className="p-6 bg-[#ffffff] shadow rounded-[16px] border">
      <div className="flex items-center flex-col md:flex-row gap-5 justify-between">
        <div className="w-full lg:w-[550px]">
          <h1 className="text-[#83C55A] text-[20px] sm:text-[36px] font-[700] ">
            {t("Featured Products")}
          </h1>
          <div className="font-[400] text-[18px] text-[#4B5744] mt-3.5">
            {t(
              "Experience top quality and performance with our featured product"
            )}
          </div>
        </div>
        <div className="w-full xl:w-[600px]">
          <SearchBar
            category={false}
            setHandle={setHandle}
            placeHolder={t("search for products")}
            handleSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
