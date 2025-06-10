import React from "react";

const MainHeader = ({
  header,
  subHeader,
}: {
  header: string;
  subHeader: string;
}) => {
  return (
    <div className="p-3 lg:p-5 bg-white  rounded-[16px] border-2">
      <h1 className="font-[700] text-[16px] lg:text-[36px] text-[#83C55A]">
        {header}
      </h1>
      <span className="text-[#4B5744] text-[10px] lg:text-[12px] ">
        {subHeader}
      </span>
    </div>
  );
};

export default MainHeader;
