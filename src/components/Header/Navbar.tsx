"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import MobileMenu from "./MobileMenu";
import IconCircle from "./IconCircle";
import { useDispatch, useSelector } from "react-redux";
import { showProfileUser } from "@/lib/redux/profileSlice";
import { usePathname } from "next/navigation";
import SelectMenu from "../form/SelectMenu";
import { getAllBrands, getAllCategory } from "@/lib/selectMenu/SelectMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (href: string) => pathname === href;
  const dispatch = useDispatch<any>();
  const { profile } = useSelector((state: any) => state.profileReducer);
  const { brand, category } = useSelector(
    (state: any) => state.selectMenuSlice
  );
  useEffect(() => {
    dispatch(showProfileUser());
    dispatch(getAllBrands());
    dispatch(getAllCategory());
  }, [dispatch]);
  console.log("proprofile", brand);

  return (
    <div className="border-b shadow-sm text-sm font-normal">
      <TopBar />

      <div className="flex justify-between items-center px-2 md:px-9   py-4">
        {/* Logo */}
        <Link href={`/${locale}`}>
          <Image src="/logo2.svg" alt="Logo" width={140} height={70} />
        </Link>

        {/* Search (desktop only) */}
        <div className="hidden md:flex w-[50%]">
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Desktop icons */}
          <div className="hidden md:flex">
            <NavIcons user={profile} />
          </div>

          {/* Mobile: only show user icon + hamburger */}
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
      <div className="gap-6 mt-2 mb-9 hidden md:flex px-2 md:px-9 text-[16px] font-semibold items-center text-gray-600">
        <Link
          href={`/${locale}`}
          className={`hover:text-black transition relative ${
            isActive(`/${locale}`)
              ? "text-[var(--main)] before:content-[''] before:absolute before:top-[-10px] before:left-0 before:w-full before:border-t-4 before:border-[var(--main)]"
              : ""
          }`}
        >
          Home
        </Link>
        <SelectMenu
          placeholder="Categoties"
          className="!p-0"
          options={category}
        />
        <SelectMenu placeholder="Brands" className="!p-0" options={brand} />
        <Link
          href={`/${locale}/products`}
          className={`hover:text-black transition relative ${
            isActive(`/${locale}/products`)
              ? "text-[var(--main)] before:content-[''] before:absolute before:top-[-10px] before:left-0 before:w-full before:border-t-4 before:border-[var(--main)]"
              : ""
          }`}
        >
          Products
        </Link>

        <Link
          href={`/${locale}/blogs`}
          className={`hover:text-black transition relative ${
            isActive(`/${locale}/blogs`)
              ? "text-[var(--main)] before:content-[''] before:absolute before:top-[-10px] before:left-0 before:w-full before:border-t-4 before:border-[var(--main)]"
              : ""
          }`}
        >
          Blogs
        </Link>

        <Link
          href={`/${locale}/about-us`}
          className={`hover:text-black transition relative ${
            isActive(`/${locale}/about-us`)
              ? "text-[var(--main)] before:content-[''] before:absolute before:top-[-10px] before:left-0 before:w-full before:border-t-4 before:border-[var(--main)]"
              : ""
          }`}
        >
          About Us
        </Link>

        <Link
          href={`/${locale}/contact-us`}
          className={`hover:text-black transition relative ${
            isActive(`/${locale}/contact-us`)
              ? "text-[var(--main)] before:content-[''] before:absolute before:top-[-10px] before:left-0 before:w-full before:border-t-4 before:border-[var(--main)]"
              : ""
          }`}
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && <MobileMenu />}
    </div>
  );
};

export default Navbar;
