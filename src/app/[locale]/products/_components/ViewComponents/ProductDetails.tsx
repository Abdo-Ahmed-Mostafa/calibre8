import ShareNow from "@/components/share/ShareNow";
import Stars from "@/components/Stars/Stars";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useMainHook } from "@/lib/Hook/useMainHook";

const ProductDetails = ({
  product,
  imgs,
  setCurrentSlide,
  currentSlide,
}: {
  product: any;
  imgs: string[];
  setCurrentSlide: (index: number) => void;
  currentSlide: number;
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const { t } = useMainHook();
  const handleNextSlide = () => {
    const nextIndex = (currentSlide + 1) % imgs.length;
    setCurrentSlide(nextIndex);
  };
  console.log("product-321", product);

  return (
    <div className="bg-white border-2 p-3 rounded-xl">
      <div className="relative flex flex-col lg:flex-row gap-10">
        <div className="w-full flex flex-col gap-5 lg:w-[360px]">
          <div className="w-full h-[300px] border-2 rounded-md overflow-hidden">
            <Image
              src={imgs[currentSlide]}
              alt="Main Image"
              className="w-full h-full object-cover"
              height={300}
              width={300}
            />
          </div>

          {imgs.length > 1 && (
            <div className="flex gap-2 items-center">
              {imgs.map((img, index) => (
                <div
                  key={index}
                  className={`w-[60px] h-[60px] border-2 rounded-md overflow-hidden cursor-pointer ${
                    index === currentSlide ? "ring-2 ring-green-500" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${index}`}
                    className="!w-full !h-full  object-cover"
                    width={60}
                    height={60}
                  />
                </div>
              ))}
              <div
                onClick={handleNextSlide}
                className="-ms-4 flex items-center justify-center bg-[#83C55A] rounded-full h-[32px] w-[32px] cursor-pointer shadow-2xl"
              >
                <ChevronRight className="text-white " />
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:grow flex flex-col gap-3">
          <h1 className="text-[32px] font-[700] text-[#071200]">
            {product?.name}
          </h1>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Image
                src={product?.brand?.image}
                alt=""
                className="!w-[46px]  object-cover !h-[46px] rounded-full"
                height={30}
                width={30}
              />
              <span>
                <span className="text-[#787878]">{product?.brand?.name}</span>{" "}
                <span className="text-[#83C55A]">{">"}</span>{" "}
                <span className="text-[#787878]">
                  {" "}
                  {product?.category?.name}{" "}
                </span>
                <span className="text-[#83C55A]">{">"}</span>{" "}
                <span className="text-[#83C55A]">{product?.id}</span>{" "}
              </span>
            </div>
            <div className="">
              <Image
                src={product?.category?.image}
                alt=""
                className="!w-[46px]  object-cover !h-[46px] rounded-full shadow-sm"
                height={30}
                width={30}
              />
            </div>
          </div>

          <div
            className={`text-[#787878] ${
              product?.description?.length > 150 && "cursor-pointer"
            }`}
            onClick={() => setShowDesc(!showDesc)}
          >
            {product?.description?.length > 150 ? (
              showDesc ? (
                <>
                  {product?.description}{" "}
                  <span className="text-[#83C55A]">...Read less</span>
                </>
              ) : (
                <>
                  {product?.description.slice(0, 20)}{" "}
                  <span className="text-[#83C55A]">...Read more</span>
                </>
              )
            ) : (
              product?.description
            )}
          </div>

          <div className="flex items-center flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Stars rating={product?.rating_average} />{" "}
              <span className="flex text-[#000000] font-[600]">
                {product?.rating_average}/{" "}
                <span className="text-[#787878] font-normal">5</span>
              </span>
            </div>
            <div className="text-[16px] text-[#000000] font-[500]">
              {product?.orders_count || 0} {t("Order")}
            </div>
            <div className="text-[16px] text-[#000000] font-[500]">
              {product?.reviews_count} {t("Review")}
            </div>
          </div>
          {product?.unit_of_measure?.length > 0 && (
            <div className="flex items-center gap-2">
              <h2 className="font-[600] text-[20px]">
                {t("Unit of measurement")}:
              </h2>
              <span>
                {product?.unit_of_measure?.map(
                  (item: { id: number; unit: string }) => {
                    return `${item?.unit} ${
                      product?.unit_of_measure?.length > 1 ? "," : ""
                    }  `;
                  }
                )}
              </span>
            </div>
          )}

          <div className="flex items-center justify-end">
            <ShareNow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
