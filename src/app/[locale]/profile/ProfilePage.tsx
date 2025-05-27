"use client";
import { showProrfileuser } from "@/lib/redux/profileSlice";
import { AppDispatch } from "@/lib/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const data = useSelector((state: any) => state.profileReducer.profile);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(showProrfileuser());
  }, [dispatch]);
  return <div>Welcome : {data?.name}</div>;
};

export default ProfilePage;
