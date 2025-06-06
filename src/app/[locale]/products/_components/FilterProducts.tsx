"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useMainHook } from "@/lib/Hook/useMainHook";
import Image from "next/image";
import { useEffect, useState } from "react";

const FilterProducts = ({
  setBrandID,
  setCategory,
  brandID,
  category,
  unitsIDS,
  setUnitsIDS,
}: {
  setBrandID: any;
  setUnitsIDS: any;
  unitsIDS: any;
  setCategory: any;
  brandID: any;
  category: any;
}) => {
  const { t } = useMainHook();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [untis, setUnits] = useState([]);
  const [tempunits, setTempUnits] = useState(unitsIDS || []);
  const [tempCategories, setTempCategories] = useState<number[]>(
    category || []
  );
  const [tempBrands, setTempBrands] = useState<number[]>(brandID || []);
  const getCategories = () => {
    axiosInstance.get(`/select_menu/parent-categories`).then((resolved) => {
      setCategories(resolved?.data?.data);
    });
  };
  const getUnits = () => {
    axiosInstance.get(`/select_menu/units`).then((resolved) => {
      setUnits(resolved?.data?.data);
    });
  };

  const getBrands = () => {
    axiosInstance.get(`/select_menu/brands`).then((resolved) => {
      setBrands(resolved?.data?.data);
    });
  };

  useEffect(() => {
    getCategories();
    getBrands();
    getUnits();
  }, []);

  const toggleSelection = (
    id: number,
    selectedItems: number[],
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="w-full  sm:w-[280px] top-12 sm:top-0 absolute sm:left-12  md:left-14 lg:left-12 xl:left-[3.5%] bg-white rounded-xl border p-4 space-y-6 shadow z-[50] h-[400px] overflow-auto">
      <h2 className="font-bold text-lg">{t("Filters products")}</h2>

      <Accordion type="multiple" className="w-full space-y-4">
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-left font-bold text-base cursor-pointer">
            {t("Category")}
          </AccordionTrigger>
          <AccordionContent>
            {categories.map((cat: any) => (
              <div key={cat.id} className="flex items-center gap-2 py-1 ">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="flex-1 text-sm">{cat.name}</span>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={tempCategories.includes(cat.id)}
                  onChange={() =>
                    toggleSelection(cat.id, tempCategories, setTempCategories)
                  }
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger className="text-left font-bold text-base cursor-pointer">
            {t("Brands")}
          </AccordionTrigger>
          <AccordionContent>
            {brands.map((brand: any) => (
              <div key={brand.id} className="flex items-center gap-2 py-1">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="flex-1 text-sm">{brand.name}</span>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={tempBrands.includes(brand.id)}
                  onChange={() =>
                    toggleSelection(brand.id, tempBrands, setTempBrands)
                  }
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="units">
          <AccordionTrigger className="text-left font-bold text-base cursor-pointer">
            {t("units")}
          </AccordionTrigger>
          <AccordionContent>
            {untis.map((unit: any) => (
              <div key={unit.id} className="flex items-center gap-2 py-1">
                <span className="flex-1 text-sm">{unit?.name}</span>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={tempunits.includes(unit?.id)}
                  onChange={() =>
                    toggleSelection(unit.id, tempunits, setTempUnits)
                  }
                />
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="w-full bg-[#83C55A] hover:bg-lime-600 text-white cursor-pointer"
        onClick={() => {
          setCategory(tempCategories);
          setBrandID(tempBrands);
          setUnitsIDS(tempunits);
        }}
      >
        {t("Apply Filter")}
      </Button>
    </div>
  );
};

export default FilterProducts;
