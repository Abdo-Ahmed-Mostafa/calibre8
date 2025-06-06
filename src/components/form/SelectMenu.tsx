import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OptionType = {
  id: number | string;
  name: string;
};

const SelectMenu = ({
  placeholder,
  className,
  options = [],
  value,
  onChange,
}: {
  placeholder: string;
  className?: string;
  options?: OptionType[];
  value?: string | number;
  onChange?: (value: string) => void;
}) => {
  return (
    <Select value={value?.toString()} onValueChange={onChange}>
      <SelectTrigger
        className={` text-gray-700 h-full  focus:ring-0 shadow-none  ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[var(--main-green)]">
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id.toString()}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
