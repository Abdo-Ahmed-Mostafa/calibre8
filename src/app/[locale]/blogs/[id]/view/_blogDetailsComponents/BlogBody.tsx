"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const BlogBody = ({
  autherSrcImg,
  name,
  title,
  desc,
}: {
  autherSrcImg: string;
  name: string;
  title: string;
  desc: string;
}) => {
  const pathname = usePathname();
  const currentUrl = typeof window !== "undefined" ? pathname : "";

  const shareLinks: Record<string, string> = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
  };

  return (
    <div className="flex flex-col gap-4  mt-5">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="font-[700] text-[24px] text-[#071200] ">{title}</h1>
        <p className="text-[16px] text-[#4B5744] font-[400]">{desc}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 md:justify-between w-full mt-3">
        <div className="flex items-center gap-3">
          <Image
            alt="Author"
            src={autherSrcImg}
            width={58}
            height={58}
            className="rounded-full"
          />
          <span className="text-[#071200] text-[24px] font-[700]">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
            {Object.entries(shareLinks).map(([icon, url]) => (
              <Link
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/icons/${icon}.svg`}
                  alt={icon}
                  width={29}
                  height={29}
                  className="hover:opacity-80 cursor-pointer"
                />
              </Link>
            ))}
          </div>
          <div className="bg-white flex justify-center items-center shadow-md rounded-[4px] size-[34px] relative group">
            <Image src={`/icons/mdi_share.svg`} alt="" width={24} height={24} />
            <div className="px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 absolute right-0 -top-14 opacity-0 group-hover:opacity-100 w-[200px]  z-10 transition-all duration-300">
              {" "}
              {Object.entries(shareLinks).map(([icon, url]) => (
                <Link
                  key={icon}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/icons/${icon}.svg`}
                    alt={icon}
                    width={29}
                    height={29}
                    className="hover:opacity-80 cursor-pointer"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogBody;
