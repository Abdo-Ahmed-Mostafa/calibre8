import { formatDateToCustom } from "@/lib/Hook/formatDateToCustom";
import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa";

const BlogCard = ({ blog }: any) => {
  return (
    <div
      className="
    w-full
    max-w-[95%]
    sm:max-w-[90%]
    md:max-w-[360px]
    lg:max-w-[500px]
    h-[420px]       /* ارتفاع الموبايل */
    sm:h-[460px]    /* ارتفاع التابلت */
    lg:h-[440px]    /* ارتفاع الشاشات الكبيرة */
    rounded-lg
    shadow-md
    overflow-hidden
    font-sans
    bg-white
    relative
    text-gray-800
    mx-auto
    flex
    flex-col
  "
    >
      {/* صورة التاجن */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[220px]">
        <Image
          src={blog?.image}
          alt="Blog Image"
          fill
          priority={true}
          className="object-cover"
        />
        <div
          className="absolute top-2.5 right-2.5 bg-[#e6faf0e6] rounded-full flex justify-center items-center cursor-pointer"
          style={{ width: 30, height: 30 }}
        >
          <FaHeart className="w-4 h-4 text-[var(--main)]" />
        </div>
      </div>

      {/* التاريخ */}
      <div className="font-bold absolute text-sm -mt-4 right-3">
        <h1 className="bg-[var(--main)] text-[12px] sm:text-[14px] font-normal text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md">
          {formatDateToCustom(blog?.created_at)}
        </h1>
      </div>

      {/* المحتوى النصي */}
      <div className="flex flex-col justify-between flex-grow pt-4">
        <div>
          <h3 className="mx-4 mb-2 font-bold text-[18px] sm:text-[20px] md:text-[22px] text-black">
            {blog?.title}
          </h3>
          <p className="text-sm mx-4 line-clamp-3 mb-3 text-gray-600 leading-relaxed">
            {blog?.description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap items-center mt-auto pb-4">
          {/* معلومات الكاتب */}
          <div className="flex px-4 items-center gap-2 mb-2 sm:mb-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={blog?.author_image}
                priority={true}
                fill
                alt="avatarBlog"
                className="!w-[32px] !h-[32px] object-cover"
              />
            </div>
            <span className="font-bold text-sm">{blog?.author_name}</span>
          </div>
          {/* الفئة */}
          <div className="bg-[var(--main)] text-white px-3 py-1 text-xs font-semibold mr-4">
            {blog?.sub_category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
