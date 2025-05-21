import React from "react";

const IconCircle = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count?: number;
}) => (
  <div className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
    {icon}
    {count && count > 0 && (
      <span className="absolute -top-[4px] -right-[4px] bg-[#74C044] text-white text-[10px] px-[5px] py-[1px] rounded-full leading-none">
        {count}
      </span>
    )}
  </div>
);

export default IconCircle;
