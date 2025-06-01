import axiosInstance from "@/lib/axios/axiosInstance";
import { useMainHook } from "@/lib/Hook/useMainHook";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ViewBlogHeader = ({
  srcBlog,
  time,
  date,
  comments,
  getBlog,
  favorite,
  blogID,
}: {
  blogID: number;
  favorite: boolean;
  srcBlog: string;
  time: string;
  date: string;
  comments: string;
  getBlog: () => void;
}) => {
  const { t } = useMainHook();
  const toggleFavoirite = () => {
    axiosInstance
      .patch("/api/favorites/toggle", {
        model_type: "blog",
        model_id: blogID,
      })
      .then(() => {
        getBlog();
        if (favorite) {
          toast.success(t("blog removed from favorites"));
        } else {
          toast.success(t("blog added to favorites"));
        }
      })
      .catch(() => {
        toast.error(t("you are not auth"));
      });
  };
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-[16px] relative">
      <Image
        src={srcBlog}
        className="w-full h-[250px] sm:h-[474px] object-cover"
        width={200}
        height={200}
        alt="blog image"
      />
      <div
        className="absolute top-2.5 right-2.5 bg-[#e6faf0e6] rounded-full flex justify-center items-center z-10 cursor-pointer "
        style={{ width: 30, height: 30 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavoirite();
        }}
      >
        {favorite ? (
          <FaHeart className="w-4 h-4 text-[var(--main)]" />
        ) : (
          <FaRegHeart />
        )}
      </div>
      <div className="flex items-center gap-4 px-2 justify-center sm:justify-start sm:px-8">
        <div className="flex items-center gap-1 text-[#5A992E]">
          <Image
            src={`/icons/icon-park-outline_time.svg`}
            alt=""
            width={24}
            height={24}
          />
          {time}
        </div>
        <div className="flex items-center gap-1 text-[#5A992E]">
          <Image
            src={`/icons/hugeicons_date-time.svg`}
            alt=""
            width={24}
            height={24}
          />
          {date}
        </div>
        <div className="flex items-center gap-1 text-[#5A992E]">
          <Image
            src={`/icons/iconamoon_comment-dots-light.svg`}
            alt=""
            width={24}
            height={24}
          />
          {comments}
        </div>
      </div>
    </div>
  );
};

export default ViewBlogHeader;
