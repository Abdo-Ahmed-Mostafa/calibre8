"use client";
import { showProfileUser } from "@/lib/redux/profileSlice";
import { AppDispatch } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewProfile from "./profile_user/ViewProfile";
import EditProfile from "./profile_user/EditProfile";

const ProfilePageTab = () => {
  const data = useSelector((state: any) => state.profileReducer.profile);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(showProfileUser());
  }, [dispatch]);
  return (
    <>
      {isEdit ? (
        <EditProfile data={data} setIsEdit={setIsEdit} />
      ) : (
        <ViewProfile data={data} setIsEdit={setIsEdit} />
      )}
    </>
  );
};

export default ProfilePageTab;
