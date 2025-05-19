"use client";
import React, { useState } from "react";
import {
  Bell,
  Heart,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { IoIosSearch } from "react-icons/io";
import ChangeLanguage from "../ui/changeLanguage/ChangeLanguage";
import SelectMenu from "../form/SelectMenu";
import Link from "next/link";
import { useLocale } from "next-intl";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  return (
    <div className="border-b shadow-sm text-sm font-normal">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center bg-[#EBEBEB] px-6 py-[6px] text-[14px]">
        <div className="flex items-center gap-4">
          {/* Social Icons */}
          <div className="flex gap-2">
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
                key={icon}
                src={`/icons/${icon}.svg`}
                alt={icon}
                width={20}
                height={20}
                className="hover:opacity-80 cursor-pointer"
              />
            ))}
          </div>

          {/* Email */}
          <div className="flex items-center gap-1">
            <Image
              src="/icons/IconMail.svg"
              alt="mail"
              width={18}
              height={18}
            />
            <span>calibre8@calibre-8.com</span>
          </div>
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
          <ChangeLanguage />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo2.svg" alt="Logo" width={140} height={70} />
        </div>

        {/* Center: Search (hidden on mobile) */}
        <div className="hidden md:flex items-center w-[50%] h-10 overflow-hidden border-2 rounded-s-2xl rounded-e-2xl">
          <Input
            placeholder="Search for Product"
            className=" border-0 rounded-none rounded-s-3xl border-e border-[var(--main)] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full shadow-none"
          />
          <SelectMenu placeholder="asd" />
          <button className="bg-[var(--main)] h-full rounded-e-xl px-8 flex items-center justify-center text-white">
            <IoIosSearch size={20} />
          </button>
        </div>

        {/* Right: Icons & Menu */}
        <div className="flex items-center gap-4">
          {/* Large Screens: Show Icons */}
          <div className="hidden md:flex items-center gap-5">
            <IconCircle icon={<Bell className="w-5 h-5" />} count={1} />
            <IconCircle icon={<Heart className="w-5 h-5" />} count={1} />
            <Link href={`/${locale}/login`}>
              <IconCircle icon={<User className="w-5 h-5" />} />
            </Link>
            <IconCircle icon={<ShoppingCart className="w-5 h-5" />} count={1} />
          </div>

          {/* Mobile: Show User + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link href={`/${locale}/login`}>
              <IconCircle icon={<User className="w-5 h-5" />} />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
          {/* Search Bar */}
          <div className="flex items-center w-full h-10 overflow-hidden border-2 rounded-s-2xl rounded-e-2xl">
            <Input
              placeholder="Search for Product"
              className="border-0 rounded-none rounded-s-3xl border-e border-[var(--main)] focus:ring-0 h-full shadow-none"
            />
            <SelectMenu placeholder="asd" />

            <button className="bg-[var(--main)] h-full rounded-e-xl px-5 flex items-center justify-center text-white">
              <IoIosSearch size={20} />
            </button>
          </div>

          {/* Links */}
          {[
            "Home",
            "Categories",
            "Brands",
            "Products",
            "Blogs",
            "About Us",
            "Contact Us",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between text-gray-700 border-b py-2"
            >
              <span>{item}</span>
              {["Categories", "Brands", "Products"].includes(item) && (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          ))}

          {/* Icons */}
          <div className="flex gap-4 pt-2">
            <IconCircle icon={<Bell className="w-5 h-5" />} count={1} />
            <IconCircle icon={<Heart className="w-5 h-5" />} count={1} />
            <IconCircle icon={<ShoppingCart className="w-5 h-5" />} count={1} />
          </div>
        </div>
      )}
    </div>
  );
};

const IconCircle = ({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count?: number;
}) => (
  <div className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
    {icon}
    {count && count > 0 && (
      <span className="absolute -top-[4px] -right-[4px] bg-[#74C044] text-white text-[10px] px-[5px] py-[1px] rounded-full leading-none">
        {count}
      </span>
    )}
  </div>
);

export default Navbar;
