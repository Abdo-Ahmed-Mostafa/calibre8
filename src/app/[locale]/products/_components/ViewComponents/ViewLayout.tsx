"use client";
import axiosInstance from "@/lib/axios/axiosInstance";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

const ViewLayout = () => {
  const pathname = usePathname();
  const productID = pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const getProductDetails = useCallback(() => {
    axiosInstance.get(`/api/public/products/${productID}`).then((resolved) => {
      setProduct(resolved?.data?.data);
    });
  }, [productID]);
  return <></>;
};

export default ViewLayout;
