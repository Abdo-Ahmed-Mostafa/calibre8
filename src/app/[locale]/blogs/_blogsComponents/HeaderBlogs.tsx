import SearchBar from "@/components/Header/SearchBar";
import React from "react";

const HeaderBlogs = ({
  t,
  setHandle,
  handleSearch,
}: {
  t: (word: string) => string;
  setHandle: any;
  handleSearch: () => void;
}) => {
  return (
    <>
      {" "}
      <div className="p-5 bg-white shadow-[0_4px_4px_rgba(0,0,0,0.10)] rounded-[16px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#83C55A] font-bold text-[36px]">{t("Blogs")}</h2>
          <div className="w-[600px]">
            <SearchBar
              classNameInput={`bg-[#F7FFF2]`}
              setHandle={setHandle}
              category={false}
              placeHolder="search in blogs"
              handleSearch={handleSearch}
              className="bg-transparent"
            />
          </div>
        </div>
        <div className="text-[18px] font-[400] text-[#4B5744] mt-5">
          {t("blogs.blogTITELMESSAGE")}
        </div>
      </div>
    </>
  );
};

export default HeaderBlogs;
