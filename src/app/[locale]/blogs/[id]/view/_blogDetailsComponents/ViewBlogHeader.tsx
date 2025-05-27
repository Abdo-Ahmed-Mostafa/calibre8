import Image from "next/image";
import React from "react";

const ViewBlogHeader = ({
  srcBlog,
  time,
  date,
  comments,
}: {
  srcBlog: string;
  time: string;
  date: string;
  comments: string;
}) => {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-[16px]">
      <Image
        src={srcBlog}
        className="w-full h-[250px] sm:h-[474px] object-cover"
        width={200}
        height={200}
        alt="blog image"
      />
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
