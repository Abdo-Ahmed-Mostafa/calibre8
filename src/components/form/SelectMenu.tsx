import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectMenu = ({ placeholder }: any) => {
  return (
    <Select>
      <SelectTrigger className="border-0 rounded-none text-gray-700 w-[140px] h-full focus:ring-0 shadow-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[var(--main-green)]">
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="electronics">Electronics</SelectItem>
        <SelectItem value="fashion">Fashion</SelectItem>
        <SelectItem value="toys">Toys</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
