// import "./globals.css";

import AdsSwiper from "@/components/home/AdsSwiper";
import CategoriesSwiper from "@/components/home/CategoriesSwiper";
// import ProductSwiper from "@/components/home/ProductSwiper";
import PartnersSwiper from "@/components/home/PartnersSwiper";
import PrandsSwiper from "@/components/home/BrandSwiper";
import FQSHome from "@/components/home/FQSHome";
// import ChangeLanguage from "@/components/ui/changeLanguage/ChangeLanguage";
import TestomenolsHome from "@/components/home/TestomenolsHome";
import BlogSwiper from "@/components/home/BlogSwiper";
export default function HomePage() {
  // const t = useTranslations("HomePage");

  return (
    <div>
      <div className="">
        <AdsSwiper />
      </div>
      <div className="bg-[var(--main-gray)] py-16  px-6">
        <CategoriesSwiper />
      </div>{" "}
      <div className="bg-[var(--main-green)] py-16   px-6">
        <PrandsSwiper />
      </div>
      <div className="bg-[var(--main-gray)] py-16  px-6">
        <PartnersSwiper />
      </div>
      <div className="bg-[var(--main-green)] py-16   px-6">
        {/* <ProductSwiper /> */}
      </div>
      <div className="bg-[var(--main-green)] py-16   px-6">
        {/* <BlogCard /> */}
        <BlogSwiper />
      </div>
      <div className="bg-[var(--main-gray)] py-16  px-6">
        <FQSHome />
      </div>
      <div className="bg-[var(--main-green)] py-16   px-6">
        <TestomenolsHome />
      </div>
      {/* <Loading /> */}
    </div>
  );
}
