import { ChevronDown, Bell, Heart, ShoppingCart } from "lucide-react";
import IconCircle from "./IconCircle";
import SearchBar from "./SearchBar";

const MobileMenu = () => {
  return (
    <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
      <SearchBar />
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
      <div className="flex gap-4 pt-2">
        <IconCircle icon={<Bell className="w-5 h-5" />} count={1} />
        <IconCircle icon={<Heart className="w-5 h-5" />} count={1} />
        <IconCircle icon={<ShoppingCart className="w-5 h-5" />} count={1} />
      </div>
    </div>
  );
};

export default MobileMenu;
