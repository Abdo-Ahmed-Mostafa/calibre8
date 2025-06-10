"use client";
import Image from "next/image";
import FilterProducts from "./FilterProducts";
import ProductCard from "@/components/card/ProductCard";
import EmptyPage from "@/components/EmptyPage";
import { useMainHook } from "@/lib/Hook/useMainHook";

const ProductsBody = ({
  openFilter,
  setOpenFilter,
  setBrandID,
  setCategory,
  brandID,
  category,
  products,
  toggleFavoirite,
  addToCart,
  setUnitsIDS,
  unitsIDS,
}: {
  unitsIDS: any;
  setUnitsIDS: any;
  addToCart: any;
  toggleFavoirite: any;
  openFilter: any;
  setOpenFilter: any;
  setBrandID: any;
  setCategory: any;
  brandID: any;
  category: any;
  products: any;
}) => {
  const { t } = useMainHook();
  return (
    <div className="mt-10 flex flex-col   gap-5 relative ">
      <button
        className="rounded-[12px] p-[8px] h-[44px] w-[44px] bg-[#F7FFF2] shadow-md cursor-pointer"
        onClick={() => {
          setOpenFilter(!openFilter);
        }}
      >
        <Image
          src={"/icons/iconFilter.svg"}
          height={22}
          width={22}
          alt="filter"
          className="mx-auto"
        />
      </button>
      {openFilter && (
        <FilterProducts
          setUnitsIDS={setUnitsIDS}
          unitsIDS={unitsIDS}
          setBrandID={setBrandID}
          setCategory={setCategory}
          brandID={brandID}
          category={category}
        />
      )}
      {products?.data?.length > 0 ? (
        <div className="grid  grid-cols-4 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products?.data?.map((product: any, index: number) => {
            return (
              <ProductCard
                product={product}
                key={index}
                toggleFavoirite={toggleFavoirite}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      ) : (
        <EmptyPage text={t("no products here")} />
      )}
    </div>
  );
};

export default ProductsBody;
