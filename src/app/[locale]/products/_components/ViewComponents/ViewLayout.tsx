"use client"; // هذا يعني أن الكومبوننت يُنفذ في المتصفح (Client Component)

import { usePathname } from "next/navigation"; // للحصول على مسار الصفحة
import { useState } from "react"; // لإدارة حالة السلايدر
import { useQuery } from "@tanstack/react-query"; // لجلب البيانات وتخزينها مؤقتًا
import axiosInstance from "@/lib/axios/axiosInstance"; // axios مخصص يحتوي على الإعدادات الأساسية
import MainHeader from "./ViewProdcutHeader"; // عنوان الصفحة
import { useMainHook } from "@/lib/Hook/useMainHook"; // يحتوي على الدوال العامة مثل الترجمة
import ProductDetails from "./ProductDetails"; // مكون عرض صور ومواصفات المنتج
import ProductPagesLayout from "./ProductPagesLayout"; // مكون عرض بقية تفاصيل المنتج مثل التعليقات أو المواصفات
import LoaderPage from "@/components/LoaderPage/LoaderPage";

// 👇 دالة جلب بيانات المنتج من API
const fetchProduct = async (productID: string) => {
  const res = await axiosInstance.get(`/api/public/products/${productID}`);
  return res.data.data; // نُرجع فقط بيانات المنتج بدون الأغلفة (wrappers)
};

const ViewLayout = () => {
  const pathname = usePathname(); // بنستخدمه لاستخراج ID المنتج من الرابط
  const { t } = useMainHook(); // دالة الترجمة
  const productID = pathname.split("/")[3]; // استخراج ID المنتج من URL

  const [currentSlide, setCurrentSlide] = useState(0); // لحفظ رقم الصورة الحالية في السلايدر

  // 👇 استخدام React Query لجلب بيانات المنتج
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", productID], // مفتاح التخزين المؤقت
    queryFn: () => fetchProduct(productID), // دالة الجلب
    enabled: !!productID, // نمنع التنفيذ إذا ما كانش فيه productID
  });

  const imgs: string[] = product?.image
    ? [product.image, ...(product.other_images || [])]
    : [""];

  return (
    <div className="bg-[var(--main-green-2)] py-8">
      <div className="w-[90%] mx-auto flex flex-col gap-4">
        <MainHeader
          header={t("Featured Products details")}
          subHeader={t(
            "Experience top quality and performance with our featured product"
          )}
        />

        {isLoading ? (
          <LoaderPage />
        ) : (
          <>
            <ProductDetails
              setCurrentSlide={setCurrentSlide}
              currentSlide={currentSlide}
              product={product}
              imgs={imgs}
            />
            <ProductPagesLayout product={product} productID={productID} />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewLayout;
