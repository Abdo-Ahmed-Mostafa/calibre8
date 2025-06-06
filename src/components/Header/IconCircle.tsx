import React from "react";

const IconCircle = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count?: number;
}) => (
  <div className="relative !size-[48px] rounded-full bg-gray-100 flex items-center justify-center text-gray-800 cursor-pointer">
    {icon}
    {count && count > 0 && (
      <span className="absolute -top-[4px] -right-[4px] bg-[#787878] font-[400] text-[10px] text-white  flex justify-center items-center !size-[15px] rounded-full leading-none">
        {count}
      </span>
    )}
  </div>
);

export default IconCircle;
