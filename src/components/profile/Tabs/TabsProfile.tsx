import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUserAlt, FaClipboardList } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdLock, MdDelete } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import ProfilePageTab from "./ProfilePageTab";

interface profileType {
  label: string;
  icon: React.ReactNode;
}

const TabsProfile = () => {
  const profileTaps = [
    { label: "Profile", icon: <FaUserAlt /> },
    { label: "Add address", icon: <IoLocationSharp /> },
    { label: "Change password", icon: <MdLock /> },
    { label: "Delete account", icon: <MdDelete /> },
    { label: "Orders", icon: <FaClipboardList /> },
    { label: "Chat support", icon: <BiSupport /> },
  ];

  return (
    <div className="">
      <Tabs defaultValue="Profile">
        <TabsList className="flex flex-col ms-4 pt-8 mt-28">
          {profileTaps.map((data: profileType, index: number) => (
            <TabsTrigger
              key={index}
              className="data-[state=active]:bg-[var(--main)] text-[var(--main)] text-[15px] font-semibold py-5 rounded-2xl ps-4 data-[state=active]:text-white w-full justify-start"
              value={data.label}
            >
              {data.icon}
              {data.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Profile">
          <div className="border shadow-sm h-full bg-white">
            <ProfilePageTab />
          </div>
        </TabsContent>
        <TabsContent value="Add address">Address Form</TabsContent>
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
