import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <button className="flex justify-center items-center w-8 h-8">
      <FaSpinner className="animate-spin text-[20px] text-[#83C55A]" />
    </button>
  );
};

export default Loading;
