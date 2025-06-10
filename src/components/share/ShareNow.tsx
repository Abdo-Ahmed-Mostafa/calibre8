import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ShareNow = () => {
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
    <>
      {" "}
      <div className="bg-white flex justify-center items-center shadow-md rounded-[4px] size-[34px] relative group">
        <Image
          src={`/icons/mdi_share.svg`}
          className="cursor-pointer"
          alt=""
          width={24}
          height={24}
        />
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
    </>
  );
};

export default ShareNow;
