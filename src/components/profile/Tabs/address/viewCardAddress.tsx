import { useTranslations } from "next-intl";
import React from "react";

const ViewCardAddress = ({ allAddress }: any) => {
  console.log("asdasallAddress", allAddress);
  const t = useTranslations("");
  return (
    <div className="flex flex-col gap-3">
      <h2 className="border-2 border-gray-200 py-3 ps-7  rounded-xl shadow-md">
        <span className="text-[var(--main)] text-[20px] font-bold">
          {t("Country")} :
        </span>{" "}
        {allAddress?.country}
      </h2>
      <h2 className="border-2 border-gray-200 py-3 ps-7  rounded-xl shadow-md">
        <span className="text-[var(--main)] text-[20px] font-bold">
          {t("Governorate")} :
        </span>{" "}
        {allAddress?.governorate}
      </h2>
      <h2 className="border-2 border-gray-200 py-3 ps-7  rounded-xl shadow-md">
        <span className="text-[var(--main)] text-[20px] font-bold">
          {t("City")} :
        </span>{" "}
        {allAddress?.city}
      </h2>
      <h2 className="border-2 border-gray-200 py-3 ps-7  rounded-xl shadow-md">
        <span className="text-[var(--main)] text-[20px] font-bold">
          {t("Street name")} :
        </span>{" "}
        {allAddress?.street}
      </h2>
      <h2 className="border-2 border-gray-200 py-3 ps-7  rounded-xl shadow-md">
        <span className="text-[var(--main)] text-[20px] font-bold">
          {t("House number")} :
        </span>{" "}
        {allAddress?.building_number}
      </h2>
      <h2 className="border-2 border-gray-200 py-3 ps-7  rounded-xl shadow-md">
        <span className="text-[var(--main)] text-[20px] font-bold">
          {t("notes")} :
        </span>{" "}
        {allAddress?.notes}
      </h2>
    </div>
  );
};

export default ViewCardAddress;
