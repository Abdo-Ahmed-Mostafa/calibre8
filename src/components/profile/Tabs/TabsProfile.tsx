"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUserAlt, FaClipboardList } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdLock, MdDelete } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import ProfilePageTab from "./ProfilePageTab";
import ViewAdress from "./address/ViewAdress";

interface profileType {
  label: string;
  icon: React.ReactNode;
  query: string; // كلمة مختصرة للـ URL
}

const TabsProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const profileTabs: profileType[] = [
    { label: "Profile", icon: <FaUserAlt />, query: "profile" },
    { label: "Add address", icon: <IoLocationSharp />, query: "add" },
    { label: "Change password", icon: <MdLock />, query: "change" },
    { label: "Delete account", icon: <MdDelete />, query: "delete" },
    { label: "Orders", icon: <FaClipboardList />, query: "orders" },
    { label: "Chat support", icon: <BiSupport />, query: "chat" },
  ];

  // ⬇️ نحول query الصغيرة للـ label الكامل
  const tabQuery = searchParams.get("tab") || "profile";
  const foundTab = profileTabs.find((t) => t.query === tabQuery);
  const [currentTab, setCurrentTab] = useState(foundTab?.label || "Profile");

  useEffect(() => {
    if (foundTab) setCurrentTab(foundTab.label);
  }, [tabQuery, foundTab]);

  const handleTabChange = (label: string) => {
    const tab = profileTabs.find((t) => t.label === label);
    if (!tab) return;

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("tab", tab.query);
    router.replace(`?${params.toString()}`, { scroll: false });
    setCurrentTab(label);
  };

  return (
    <div className="">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="flex flex-col ms-4 pt-8 mt-28">
          {profileTabs.map((data, index) => (
            <TabsTrigger
              key={index}
              className="data-[state=active]:bg-[var(--main)] text-[var(--main)] text-[15px] font-semibold py-5 rounded-2xl ps-4 data-[state=active]:text-white w-full justify-start"
              value={data.label}
            >
              {data.icon}
              <span className="ml-2">{data.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Profile">
          <div className="border shadow-sm h-full bg-white">
            <ProfilePageTab />
          </div>
        </TabsContent>
        <TabsContent value="Add address">
          <ViewAdress />
        </TabsContent>
        <TabsContent value="Change password">Password Form</TabsContent>
        <TabsContent value="Delete account">
          Delete Account Confirmation
        </TabsContent>
        <TabsContent value="Orders">Orders List</TabsContent>
        <TabsContent value="Chat support">Chat Support Section</TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsProfile;
