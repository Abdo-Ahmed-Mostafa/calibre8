import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const SavButton_Back = ({ handleBack, hadnleSave }: any) => {
  const t = useTranslations();
  return (
    <div className="gap-4 flex">
      <button
        onClick={handleBack}
        className=" w-full  text-[var(--main)] cursor-pointer border-[var(--main)] border-2 rounded-lg py-3 flex justify-center items-center gap-2 font-bold text-[19px]"
      >
        {" "}
        <Image
          src={`/icons/backIconProfile.svg`}
          width={20}
          height={20}
          alt="asd"
        />
        {t("Back")}
      </button>{" "}
      <button
        onClick={hadnleSave}
        className="bg-[var(--main)] cursor-pointer text-white rounded-lg w-full flex justify-center items-center gap-2 font-bold text-[19px]"
      >
        {t("Save")}
        <Image
          src={`/icons/saveIconProfile.svg`}
          width={20}
          height={20}
          alt="asd"
        />
      </button>
    </div>
  );
};

export default SavButton_Back;
