"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi";
const locales = ["en", "fr"];

const ChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const currentLang = locales.includes(parts[0]) ? parts[0] : "en";

  const handleChange = (lang: string) => {
    const newParts = [...parts];
    if (locales.includes(newParts[0])) {
      newParts[0] = lang;
    } else {
      newParts.unshift(lang);
    }
    const newPath = "/" + newParts.join("/");
    router.push(newPath);
  };

  return (
    <div>
      <Select onValueChange={handleChange} value={currentLang}>
        <SelectTrigger className="cursor-pointer relative w-[180px] border-none outline-none ring-0 shadow-none px-2 pr-3 justify-between items-center flex gap-2 text-black data-[state=open]:bg-transparent [&>svg]:hidden">
          <div className="flex items-center gap-2">
            <Image
              alt="Flag"
              src={
                currentLang === "en"
                  ? "/icons/amercaFlag.svg"
                  : "/icons/FrenchFlag.svg"
              }
              width={24}
              height={15}
            />
            <span className="text-black font-bold capitalize">
              {currentLang === "en" ? "English" : "Français"}
            </span>
            <HiChevronDown className="text-black text-lg transition-transform duration-200 data-[state=open]:rotate-180" />
          </div>
        </SelectTrigger>

        <SelectContent className="cursor-pointer">
          <SelectItem className="cursor-pointer" value="en">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                alt="English Flag"
                src={`/icons/amercaFlag.svg`}
                width={24}
                height={15}
              />
              English
            </div>
          </SelectItem>
          <SelectItem className="cursor-pointer" value="fr">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                alt="French Flag"
                src={`/icons/FrenchFlag.svg`}
                width={24}
                height={15}
              />
              Français
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChangeLanguage;
