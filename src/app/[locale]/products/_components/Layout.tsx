"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProductHeader from "./ProductHeader";
import ProductsBody from "./ProductsBody";
import ProductFooter from "./ProductFooter";
import axiosInstance from "@/lib/axios/axiosInstance";
import toast from "react-hot-toast";
import { useMainHook } from "@/lib/Hook/useMainHook";

const ProductLayout = () => {
  const [handle, setHandle] = useState<string>("");
  const [products, setProducts] = useState<any>({});
  const [category, setCategory] = useState([]);
  const [brandID, setBrandID] = useState([]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const { t } = useMainHook();
  const toggleFavoirite = (productID: number, favorite: boolean) => {
    axiosInstance
      .patch("/api/favorites/toggle", {
        model_type: "product",
        model_id: productID,
      })
      .then(() => {
        getFilterProducts();
        if (favorite) {
          toast.success(t("blog removed from favorites"));
        } else {
          toast.success(t("blog added to favorites"));
        }
      })
      .catch(() => {
        toast.error(t("you are not auth"));
      });
  };
  const getFilterProducts = useCallback(() => {
    const params = new URLSearchParams();

    if (category?.length > 0)
      params.append("category_id[]", JSON.stringify(category));
    if (brandID?.length > 0)
      params.append("brand_id[]", JSON.stringify(brandID));
    if (page) params.append("page", page.toString());

    const queryString = params.toString();
    const url = `/api/public/products${
      queryString ? `?${queryString}&per_page=6&page=${page}` : ""
    }`;

    axiosInstance.get(url).then((response) => {
      setProducts(response?.data);
    });
  }, [page, category, brandID]);
  const handleSearch = () => {
    axiosInstance
      .get(`/api/public/products?handle=${handle}`)
      .then((resolved) => {
        setProducts(resolved?.data);
      });
  };
  useEffect(() => {
    getFilterProducts();
  }, [getFilterProducts]);
  return (
    <div className="bg-[#F7FFF2] py-10">
      <div className="w-[90%] mx-auto">
        <ProductHeader handleSearch={handleSearch} setHandle={setHandle} />
        <ProductsBody
          onApplyFilter={getFilterProducts}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          setBrandID={setBrandID}
          setCategory={setCategory}
          brandID={brandID}
          category={category}
          products={products}
          toggleFavoirite={toggleFavoirite}
        />
        <ProductFooter
          page={page}
          setPage={setPage}
          totalPages={products?.meta?.last_page}
        />
      </div>
    </div>
  );
};

export default ProductLayout;
