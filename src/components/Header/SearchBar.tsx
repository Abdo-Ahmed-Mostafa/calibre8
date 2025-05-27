"use client";

import { Input } from "@/components/ui/input";
import SelectMenu from "@/components/form/SelectMenu";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({
  category = true,
  placeHolder = "",
  setHandle,
  className,
  handleSearch,
  classNameInput,
}: {
  category?: boolean;
  placeHolder?: string;
  classNameInput?: string;
  className?: string;
  setHandle?: any;
  handleSearch?: () => void;
}) => {
  return (
    <div
      className={`${className} flex bg-[var(--main-green-2)] items-center w-full h-[55px] overflow-hidden border-2 rounded-s-2xl rounded-e-2xl`}
    >
      <Input
        placeholder={placeHolder || "Search for Product"}
        onChange={(e) => {
          setHandle(e.target.value);
        }}
        className={`${classNameInput} border-0 rounded-none rounded-s-3xl border-e border-[var(--main)] focus:ring-0 h-full shadow-none`}
      />
      {category && <SelectMenu placeholder="Categoties" />}
      <button
        onClick={handleSearch}
        className="bg-[var(--main)] h-full rounded-e-xl px-5 flex items-center justify-center text-white cursor-pointer"
      >
        <IoIosSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
