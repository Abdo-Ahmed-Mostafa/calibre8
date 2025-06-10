"use client";
import ProductHeader from "./ProductHeader";
import ProductsBody from "./ProductsBody";
import Footer from "./ProductFooter";
import useProducts from "@/lib/Hook/useProducts";

const ProductLayout = () => {
  const {
    products,
    setHandle,
    handleSearch,
    category,
    setCategory,
    brandID,
    setBrandID,
    unitsIDS,
    setUnitsIDS,
    page,
    setPage,
    openFilter,
    setOpenFilter,
    addToCart,
    toggleFavorite,
  }: any = useProducts();

  return (
    <div className="bg-[#F7FFF2] py-10">
      <div className="w-[90%] mx-auto">
        <ProductHeader handleSearch={handleSearch} setHandle={setHandle} />
        <ProductsBody
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          setBrandID={setBrandID}
          setUnitsIDS={setUnitsIDS}
          unitsIDS={unitsIDS}
          setCategory={setCategory}
          brandID={brandID}
          category={category}
          products={products}
          toggleFavoirite={toggleFavorite}
          addToCart={addToCart}
        />
        <Footer
          page={page}
          setPage={setPage}
          totalPages={products?.meta?.last_page}
        />
      </div>
    </div>
  );
};

export default ProductLayout;
