import axiosInstance from "@/lib/axios/axiosInstance";
import React, { useEffect, useState } from "react";

const useAddress = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/api/client/address")
      .then((res) => {
        setAllAddress(res.data.data);
      })
      .finally(() => {
        setLoading(false); // لازم تحط دي هنا
      }); // setLoading(false);
  }, []);
  return { isEdit, setIsEdit, allAddress, loading };
};

export default useAddress;
