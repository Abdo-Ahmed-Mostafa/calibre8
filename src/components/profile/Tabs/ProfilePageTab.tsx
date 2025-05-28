"use client";
import { showProfileUser } from "@/lib/redux/profileSlice";
import { AppDispatch } from "@/lib/redux/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const ProfilePageTab = () => {
  const data = useSelector((state: any) => state.profileReducer.profile);
  console.log("dataasdasdasd", data);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(showProfileUser());
  }, [dispatch]);
  return (
    <div className="p-6 h-f">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6  h-full  rounded-xl p-6 ">
        {/* صورة البروفايل */}
        <div className="flex-shrink-0">
          <Image
            src={data?.avatar}
            alt="Profile"
            width={181}
            height={181}
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* بيانات البروفايل */}
        <div className="flex-1 w-full">
          <div className="flex justify-end mb-4">
            <button className="text-[var(--main)] cursor-pointer flex items-center gap-1 text-sm font-semibold">
              <FiEdit className="text-base" />
              Edit profile
            </button>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="border rounded-lg p-4 bg-white">
              <p className="text-[var(--main)] font-semibold">Full Name</p>
              <p className="text-sm text-gray-800">{data?.name}</p>
            </div>

            {/* Email */}
            <div className="border rounded-lg p-4 bg-white">
              <p className="text-[var(--main)] font-semibold">Email</p>
              <p className="text-sm text-gray-800">{data?.email}</p>
            </div>

            {/* Phone */}
            <div className="border rounded-lg p-4 bg-white">
              <p className="text-[var(--main)] font-semibold">Phone Number</p>
              <p className="text-sm text-gray-800">{data?.phone || "-"}</p>
            </div>

            {/* Gender */}
            <div className="border rounded-lg p-4 bg-white">
              <p className="text-[var(--main)] font-semibold">Gender</p>
              <p className="text-sm text-gray-800">{data?.gender || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageTab;
