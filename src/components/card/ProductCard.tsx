import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product, toggleFavoirite }: any) => {
  const t = useTranslations();
  return (
    <div className="rounded-2xl border border-[#DDEFD3] p-4 relative shadow-sm w-full max-w-[280px] space-y-2 bg-white">
      {/* Favorite icon */}
      <div
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm z-10"
        onClick={() => {
          toggleFavoirite(product?.id, product?.favorite);
        }}
      >
        {product?.favorite ? (
          <FaHeart className="w-4 h-4 text-[var(--main)]" />
        ) : (
          <FaRegHeart />
        )}
        {/* <div className="w-[26px] h-[26px] flex justify-center items-center">
          <Image
            src={product?.image || `/icons/HartIcons.svg`}
            alt="HartIcons"
            width={26}
            height={26}
          />
        </div> */}
      </div>

      {/* Product Image */}
      <div className="mb-14">
        <Image
          src="/product.png"
          alt="Product"
          width={200}
          height={170}
          className="mx-auto object-contain w-full h-auto max-h-[170px]"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold line-clamp-1">{product?.name}</h2>

      {/* Brand + Type + ID */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
          <Image src="/fluke.png" alt="Brand" width={20} height={20} />
          <span className="text-black font-medium">Fluke</span>
          <span>›</span>
          <span>TRMS Multimeter</span>
          <span>›</span>
          <span className="text-green-600 font-semibold">117</span>
        </div>
        <Image src="/Frame 2608905.png" alt="Brand" width={30} height={30} />
      </div>

      {/* Description */}
      <div className="text-xs text-gray-500">
        <p className="line-clamp-2 pr-1">{product?.description}</p>
      </div>

      {/* Arrow */}
      <div className="flex justify-end">
        <Image src="/leftArow.svg" alt="Arrow" width={30} height={30} />
      </div>

      {/* Unit of measurement */}
      <p className="text-sm font-medium mt-3 text-gray-800">
        Unit of measurement:{" "}
        <span className="font-semibold text-black">
          {product?.unit_of_measure}
        </span>
      </p>

      {/* Add to Cart Button */}
      <div className="flex justify-center items-center">
        <Button className="w-full mt-5 bg-black text-white rounded-lg flex items-center justify-center gap-2 text-sm py-2">
          <Image
            src={`/icons/CartIcons.svg`}
            alt="CartIcons"
            width={24}
            height={24}
          />
          {t("HomePage.add to cart")}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
