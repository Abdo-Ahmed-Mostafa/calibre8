"use cleint";
import { useTranslations } from "next-intl";
import React from "react";

const HeadSectionProfile = () => {
  const t = useTranslations();
  return (
    <div className="bg-white px-6 flex flex-col gap-4 py-5 border-2 rounded-lg">
      <h2 className="text-[var(--main)] text-[27px] font-bold">
        {t("Client Profile")}
      </h2>
      <h3>{t("gives  values, and commitment to serving you better")}</h3>
    </div>
  );
};

export default HeadSectionProfile;
