"use client";
import React from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "description", label: "Description" },
  { id: "reviews", label: "Reviews product" },
  { id: "measure", label: "What do you want measure?" },
  { id: "compare", label: "Compare product" },
];

const ProductTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: any;
  setActiveTab: any;
}) => {
  return (
    <div className="overflow-x-auto ">
      <div className="flex border-b border-gray-300 whitespace-nowrap min-w-max">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative py-2 px-4 text-[15px] font-[700] cursor-pointer flex items-center justify-center duration-300 transition-all",
              activeTab === tab.id
                ? "bg-[#83C55A] text-white"
                : "bg-[#9EA39B66] text-[#071200] hover:bg-gray-200",
              index !== tabs.length - 1 &&
                "after:content-[''] after:absolute after:top-[22%] after:right-0 after:h-[80%] after:w-[0.5px] after:bg-[#071200]"
            )}
            style={{
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              height: "40px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductTabs;
