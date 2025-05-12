import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";

const locales = ["en", "fr"];

const ChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (lang: string) => {
    // Split the path and replace the first part with the new lang
    const parts = pathname.split("/").filter(Boolean);
    if (locales.includes(parts[0])) {
      parts[0] = lang;
    } else {
      parts.unshift(lang);
    }
    const newPath = "/" + parts.join("/");
    router.push(newPath);
  };

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChangeLanguage;
