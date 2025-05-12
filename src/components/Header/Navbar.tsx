import React from "react";
import { Bell, Heart, User, ShoppingCart, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import ChangeLanguage from "../ui/changeLanguage/ChangeLanguage";

const Navbar = () => {
  return (
    <div className="border-b shadow-sm">
      {/* Top Bar */}
      <div className="flex justify-between bg-[#EBEBEB] items-center px-4 py-2 text-sm">
        <div className="flex items-center  gap-[1px]">
          {/* Social Icons */}
          {[
            "linkedin",
            "instagram",
            "youtube",
            "tiktok",
            "facebook",
            "x",
            "whatsapp",
          ].map((icon) => (
            <Image
              priority={true}
              key={icon}
              width={23}
              height={23}
              src={`/icons/${icon}.svg`}
              alt={icon}
              //   className="w-[23px] h-[23px]"
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Image src="/icons/IconMail.svg" width={30} height={23} alt="asd" />
          <span className="text-[16px]">calibre8@calibre-8.com</span>
        </div>

        <div className="flex items-center gap-2">
          <ChangeLanguage />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={96}
            objectFit="contain"
            // className="h-[96px] w-[254px]"
          />
          <span className="text-2xl font-bold"></span>
        </div>

        {/* Search */}
        <div className="flex items-center w-1/2">
          <Button variant="ghost" className="rounded-none border border-r-0">
            Categories
          </Button>
          <Input
            placeholder="Search for Product"
            className="rounded-none border-r-0"
          />
          <Button className="bg-green-600 text-white rounded-none">
            Search
          </Button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <IconWithBadge icon={<Bell />} count={0} />
          <IconWithBadge icon={<Heart />} count={0} />
          <IconWithBadge icon={<User />} count={0} />
          <IconWithBadge icon={<ShoppingCart />} count={0} />
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

// Badge component
const IconWithBadge = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count: number;
}) => (
  <div className="relative">
    <div className="w-6 h-6 text-gray-700">{icon}</div>
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1 rounded-full">
        {count}
      </span>
    )}
  </div>
);

export default Navbar;
