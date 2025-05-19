import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ViewAllButton = ({ href = "#" }) => {
  const t = useTranslations();
  return (
    <div className="text-right me-8 mt-4">
      <Link
        href={href}
        className="text-[var(--main)] font-medium flex items-center justify-end gap-1  cursor-pointer"
      >
        {t("HomePage.View All") || "View All"}{" "}
        <span className="w-[30px] h-[30px] bg-white rounded-full flex justify-center items-center">
          <Image
            src={`/viewAllIicons.svg`}
            width={20}
            height={20}
            alt="viewAllIicons"
          />
        </span>
      </Link>
    </div>
  );
};

export default ViewAllButton;
