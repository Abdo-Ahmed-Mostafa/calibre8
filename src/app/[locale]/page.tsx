"use client";
import Navbar from "@/components/Header/Navbar";
// import { useTranslations } from "next-intl";
// import Link from "next/link";
import "../globals.css";
// import ChangeLanguage from "@/components/ui/changeLanguage/ChangeLanguage";
// import Loading from "@/components/loading/Loading";
export default function HomePage() {
  // const t = useTranslations("HomePage");
  return (
    <div>
      <Navbar />
      {/* <Loading /> */}
    </div>
  );
}
