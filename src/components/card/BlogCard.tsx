"use client";
import { formatDateToCustom } from "@/lib/Hook/formatDateToCustom";
import { useMainHook } from "@/lib/Hook/useMainHook";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa";

const BlogCard = ({ blog }: any) => {
  const { router } = useMainHook();
  const locale = useLocale();

  return (
    <div className="bg-[#f7fff2] col-span-2 lg:col-span-1   rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg">
      {/* الصورة العلوية */}
      <div
        className="relative h-[280px] w-full cursor-pointer"
        onClick={() => router.push(`/${locale}/blogs/${blog?.id}/view`)}
      >
        <Image
          src={blog?.image}
          alt="Blog Image"
          fill
          priority
          className="w-full h-full object-cover"
        />
        {/* زر القلب */}
        <div
          className="absolute top-2.5 right-2.5 bg-[#e6faf0e6] rounded-full flex justify-center items-center z-10"
          style={{ width: 30, height: 30 }}
        >
          <FaHeart className="w-4 h-4 text-[var(--main)]" />
        </div>
      </div>

      {/* التاريخ */}
      <div className="px-4 relative">
        <span className="bg-[var(--main)] text-white text-[12px] px-3 py-1.5 rounded-md inline-block absolute right-4 -top-5">
          {formatDateToCustom(blog?.date)}
        </span>
      </div>

      {/* النص */}
      <div className="px-4 pt-3 pb-4 flex flex-col justify-between relative ">
        <div>
          <h3 className="text-[24px] text-[#071200] font-[600]  mb-2 line-clamp-1">
            {blog?.title}
          </h3>
          <p className="text-[14px] font-[400] text-[#787878] leading-relaxed line-clamp-3">
            {blog?.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-5 flex-col sm:flex-row gap-3">
          {/* الكاتب */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={"/icons/amercaFlag.svg"}
                priority
                fill
                alt="avatarBlog"
                className="object-cover"
              />
            </div>
            <span className="text-[#071200] text-[18px] font-[600]">
              {blog?.author?.name}
            </span>
          </div>

          {/* الفئة */}
          <div className="bg-[var(--main)] text-white px-3 py-1 text-xs font-semibold line-clamp-1 w-[166px] rounded sm:absolute right-0">
            {blog?.sub_category?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
