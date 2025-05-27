import { useMainHook } from "@/lib/Hook/useMainHook";
import { ArrowLeft } from "lucide-react";
import React from "react";
const AllCommentHeader = ({
  setShowAllComments,
}: {
  setShowAllComments: any;
}) => {
  const { t } = useMainHook();
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-[32px] font-[700] text-[#071200]">
        {t("All Comments")} :
      </h1>

      <div className="flex items-center gap-2.5">
        <p className="text-[#83C55A]"> {t("back")} </p>
        <button
          className="bg-[#F7FFF2] rounded-full size-[40px] flex justify-center items-center shadow-md border cursor-pointer"
          onClick={() => {
            setShowAllComments(false);
          }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>
    </div>
  );
};

export default AllCommentHeader;
