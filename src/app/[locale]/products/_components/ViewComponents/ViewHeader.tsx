import React from "react";

const ViewHeader = ({
  t,
  setOpenAllReviews,
  openAllReviews,
}: {
  t: any;
  setOpenAllReviews: any;
  openAllReviews: boolean;
}) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-[#83C55A] text-[16px] lg:text-[23px] font-[700]">
        {t("Reviews product")}
      </h3>
      <button
        className="text-[#83C55A] font-[400] text-[15px cursor-pointer"
        onClick={() => setOpenAllReviews(!openAllReviews)}
      >
        {openAllReviews ? t("See less Reviews") : t("See More Reviews")}
      </button>
    </div>
  );
};

export default ViewHeader;
