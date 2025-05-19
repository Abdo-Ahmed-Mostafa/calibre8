"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const locales = ["en", "fr"];

const ChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const currentLang = locales.includes(parts[0]) ? parts[0] : "en"; // اللغة الحالية

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
        <SelectTrigger className="w-[180px] border-none outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none data-[state=open]:ring-0 data-[state=open]:ring-offset-0 data-[state=open]:outline-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <div className="flex items-center gap-2">
              <Image
                alt="English Flag"
                src={`/icons/amercaFlag.svg`}
                width={24}
                height={15}
              />
              English
            </div>
          </SelectItem>
          <SelectItem value="fr">
            <div className="flex items-center gap-2">
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
