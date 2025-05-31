import React from "react";

const HeaderSectionHome = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-grow border-t border-[1px] border-[#787878]"></div>
        <h2 className="text-2xl md:text-3xl font-[700] text-gray-900 whitespace-nowrap">
          {title}
        </h2>
        <div className="flex-grow border-t border-[1px] border-[#787878]"></div>
      </div>
      <p className="text-center md:text-[20px] font-normal  mx-auto mb-8 text-gray-700">
        {body}
      </p>
    </div>
  );
};

export default HeaderSectionHome;
