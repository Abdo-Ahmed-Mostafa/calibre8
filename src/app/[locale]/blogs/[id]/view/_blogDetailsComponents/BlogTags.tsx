"use client";
import { useMainHook } from "@/lib/Hook/useMainHook";
import React from "react";

const BlogTags = ({ tags }: { tags: [] }) => {
  const { t } = useMainHook();

  return (
    <div className="py-4 ps-3 sm:px-[45px] rounded-[12px] flex items-center  bg-[#F7FFF2]  mt-10 shadow-lg w-full mx-auto">
      <h1 className="text-[#071200] font-[700] text-[15px] sm:text-[24px]  ">
        {t("tags")}
      </h1>
      <span>:</span>
      <div className="flex items-center flex-wrap gap-[12px] ps-5 ">
        {tags?.map((tag: string) => (
          <div className="bg-[#83C55A] py-1 px-2 sm:px-5 text-white rounded-[16px]">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
