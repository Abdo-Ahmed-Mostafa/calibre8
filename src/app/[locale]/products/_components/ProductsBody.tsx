"use client";
import Image from "next/image";
import FilterProducts from "./FilterProducts";
import EmptyBlogs from "../../blogs/_blogsComponents/EmptyBlogs";
import ProductCard from "@/components/card/ProductCard";

const ProductsBody = ({
  openFilter,
  setOpenFilter,
  setBrandID,
  setCategory,
  brandID,
  category,
  products,
  onApplyFilter,
  toggleFavoirite,
}: {
  onApplyFilter: any;
  toggleFavoirite: any;
  openFilter: any;
  setOpenFilter: any;
  setBrandID: any;
  setCategory: any;
  brandID: any;
  category: any;
  products: any;
}) => {
  return (
    <div className="mt-10 flex flex-col lg:flex-row  gap-1.5">
      <button
        className="rounded-[12px] p-[8px] h-[44px] w-[44px] bg-[#F7FFF2] cursor-pointer"
        onClick={() => {
          setOpenFilter(!openFilter);
        }}
      >
        <Image
          src={"/icons/iconFilter.svg"}
          height={22}
          width={22}
          alt="filter"
        />
      </button>
      {openFilter && (
        <FilterProducts
          onApply={onApplyFilter}
          setBrandID={setBrandID}
          setCategory={setCategory}
          brandID={brandID}
          category={category}
        />
      )}
      {products?.data?.length > 0 ? (
        <div className="grid c grid-cols-4 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products?.data?.map((product: any, index: number) => {
            return (
              <ProductCard
                product={product}
                key={index}
                toggleFavoirite={toggleFavoirite}
              />
            );
          })}
        </div>
      ) : (
        <EmptyBlogs />
      )}
    </div>
  );
};

export default ProductsBody;
