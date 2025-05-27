import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SelectMenu = ({
  placeholder,
  className,
  options,
}: // url,
{
  placeholder: string;
  className?: string;
  options?: any;
  url?: string;
}) => {
  return (
    <Select>
      <SelectTrigger
        className={`border-0 rounded-none text-gray-700 h-full focus:ring-0 shadow-none ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[var(--main-green)]">
        {options &&
          options.map((option: any) => (
            <SelectItem key={option?.id} value={option?.id}>
              {option?.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
