"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios/axiosInstance";
import toast from "react-hot-toast";
import { useMainHook } from "@/lib/Hook/useMainHook";

const fetchProducts = async ({
  page,
  category,
  brandID,
  unitsIDS,
  handle,
}: {
  page: number;
  category: string[];
  brandID: string[];
  unitsIDS: string[];
  handle?: string;
}) => {
  const params = new URLSearchParams();

  if (handle) {
    return axiosInstance
      .get(`/api/public/products?handle=${handle}`)
      .then((res) => res.data);
  }

  if (category.length > 0)
    category.forEach((id) => params.append("category_id[]", id));
  if (unitsIDS.length > 0)
    unitsIDS.forEach((id) => params.append("unit_id[]", id));
  if (brandID.length > 0)
    brandID.forEach((id) => params.append("brand_id[]", id));
  if (page) params.append("page", page.toString());

  const queryString = params.toString();
  const url = `/api/public/products${
    queryString ? `?${queryString}&per_page=6&page=${page}` : ""
  }`;

  return axiosInstance.get(url).then((res) => res.data);
};

const useProducts = () => {
  const { t } = useMainHook();
  const queryClient = useQueryClient();

  const [handle, setHandle] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [brandID, setBrandID] = useState<string[]>([]);
  const [unitsIDS, setUnitsIDS] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [openFilter, setOpenFilter] = useState(false);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", { page, category, brandID, unitsIDS, handle }],
    queryFn: () => fetchProducts({ page, category, brandID, unitsIDS, handle }),
    // @ts-expect-error: keepPreviousData is allowed, TypeScript infers wrong type
    keepPreviousData: true,
  });

  const addToCartMutation = useMutation({
    mutationFn: (productID: number) =>
      axiosInstance.post(`/api/user/carts`, {
        product_id: productID,
      }),
    onSuccess: () => {
      toast.dismiss();
      toast.success(t("product added to cart"));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("you are not auth"));
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ productID }: { productID: number }) =>
      axiosInstance.patch("/api/favorites/toggle", {
        model_type: "product",
        model_id: productID,
      }),
    onSuccess: (_data) => {
      toast.dismiss();
      toast.success(t("product favorite updated"));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.dismiss();
      toast.error(t("you are not auth"));
    },
  });

  const addToCart = (productID: number) => addToCartMutation.mutate(productID);

  const toggleFavorite = (productID: number) =>
    toggleFavoriteMutation.mutate({ productID });

  const handleSearch = () => {
    refetch();
  };

  return {
    products,
    isLoading,
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
    handle,
    setHandle,
    handleSearch,
    addToCart,
    toggleFavorite,
  };
};

export default useProducts;
