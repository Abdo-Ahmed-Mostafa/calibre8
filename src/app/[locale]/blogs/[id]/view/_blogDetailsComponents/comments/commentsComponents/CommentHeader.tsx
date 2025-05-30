import { useMainHook } from "@/lib/Hook/useMainHook";
import Image from "next/image";
import React from "react";

const CommentHeader = ({ setShowAllComments }: { setShowAllComments: any }) => {
  const { t } = useMainHook();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[#071200] text-[24px] font-[700]">
        {t("Comments")} :
      </h1>
      <div className="flex items-center gap-2.5">
        <p className="text-[#83C55A]">{t("view all")}</p>
        <button
          className="bg-[#F7FFF2] rounded-full size-[40px] flex justify-center items-center shadow-md border cursor-pointer"
          onClick={() => {
            setShowAllComments(true);
          }}
        >
          <Image
            src={`/icons/chevron-right.svg`}
            alt=""
            width={22}
            height={22}
          />
        </button>
      </div>
    </div>
  );
};

export default CommentHeader;
