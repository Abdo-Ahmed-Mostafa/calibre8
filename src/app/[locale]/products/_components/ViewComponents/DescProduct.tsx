import { useMainHook } from "@/lib/Hook/useMainHook";
import React from "react";

const DescProduct = ({ product }: { product: any }) => {
  const { t } = useMainHook();
  return (
    <div className="bg-[var(--main-green-2)] p-5">
      <div>
        <h3 className="text-[#83C55A] text-[16px] lg:text-[24px] font-[700]">
          {t("Description feature product")}
        </h3>
        <p className="text-[#4B5744] font-[400] text-[11px] lg:text-[16px]">
          {product?.description}
        </p>
      </div>
    </div>
  );
};

export default DescProduct;
