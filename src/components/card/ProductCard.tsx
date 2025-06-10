import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useMainHook } from "@/lib/Hook/useMainHook";

const ProductCard = ({
  product,
  toggleFavoirite,
  addToCart,
  selected,
  seSelected,
}: {
  product?: any;
  toggleFavoirite?: any;
  seSelected?: any;
  selected?: any;
  addToCart?: any;
}) => {
  const pathname = usePathname();
  const { router, locale } = useMainHook();
  const handleCopyLink = () => {
    const productUrl = `${pathname}/${product.id}/view`;
    navigator.clipboard.writeText(productUrl);
    toast.success(t("Product link copied"));
  };
  const t = useTranslations();
  return (
    <div
      className={`rounded-2xl ${
        selected && selected
          ? "border-4  border-[#83C55A]"
          : "border  border-[#DDEFD3]"
      }   relative shadow-sm col-span-full md:col-span-1  xl:col-span-1 space-y-2 bg-white`}
      onClick={() =>
        seSelected && seSelected((prev: any) => [...prev, product?.id])
      }
    >
      {/* Favorite icon */}
      <div
        className="absolute top-3 right-3 bg-[#F7FFF2] p-2 rounded-full shadow-md z-10 cursor-pointer"
        onClick={() => {
          toggleFavoirite(product?.id, product?.favorite);
        }}
      >
        {product?.favorite ? (
          <FaHeart className="w-4 h-4 text-[var(--main)]" />
        ) : (
          <FaRegHeart className="w-4 h-4 text-[var(--main)]" />
        )}
      </div>

      {/* Product Image */}
      <div className="mb-14  p-4 relative group">
        <div className="absolute flex top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 bg-[#78787899] transition-all duration-500 justify-center items-center ">
          <div
            className="size-[50px] rounded-full flex justify-center items-center cursor-pointer bg-[#F7FFF2]"
            onClick={() => {
              router.push(`/${locale}/products/${product?.id}/view`);
            }}
          >
            <MdOutlineRemoveRedEye className="text-[35px] text-[#83C55A]" />
          </div>
        </div>
        <Image
          src={product?.image}
          alt="Product"
          width={200}
          height={170}
          className="mx-auto object-contain w-full h-auto max-h-[170px]"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold line-clamp-1 p-4">
        {product?.name}
      </h2>

      {/* Brand + Type + ID */}
      <div className="flex justify-between items-center gap-2 p-4">
        <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
          <Image
            src={product?.brand?.image}
            alt={product?.brand?.name}
            width={20}
            height={20}
          />
          <span className="text-black font-medium">
            {product?.category?.name}
          </span>
          <span>›</span>
          <span>{product?.brand?.name}</span>
          <span>›</span>
          <span className="text-green-600 font-semibold"> {product?.id}</span>
        </div>
        <Image
          src={product?.category?.image}
          alt="Brand"
          width={30}
          height={30}
        />
      </div>

      {/* Description */}
      <div className="text-xs text-gray-500 px-4">
        <p className="line-clamp-2 pr-1">{product?.description}</p>
      </div>

      {/* Arrow */}
      <div
        className="flex justify-end cursor-pointer px-4"
        onClick={handleCopyLink}
      >
        <Image src="/leftArow.svg" alt="Arrow" width={30} height={30} />
      </div>

      {/* Unit of measurement */}
      <p className="text-sm font-medium mt-3 text-gray-800 px-4">
        {t("Unit of measurement")}:{" "}
        <span className="font-semibold text-black">
          {product?.unit_of_measure?.unit || "-"}
        </span>
      </p>

      {/* Add to Cart Button */}
      <div className="flex justify-center items-center px-4 pb-4">
        <Button
          onClick={() => {
            addToCart(product?.id);
          }}
          className="cursor-pointer w-[226px] font-[600] text-[24px] h-[48px] mt-5 bg-black text-white rounded-lg flex items-center justify-center gap-2 py-2"
        >
          <Image
            src={`/icons/CartIcons.svg`}
            alt="CartIcons"
            width={24}
            height={24}
          />
          {t("add to cart")}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
