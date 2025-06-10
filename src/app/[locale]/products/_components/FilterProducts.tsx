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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchCategories = async () => {
  const res = await axiosInstance.get(`/api/public/categories`);
  return res.data?.data || [];
};

const fetchBrands = async () => {
  const res = await axiosInstance.get(`/select_menu/brands`);
  return res.data?.data || [];
};

const fetchUnits = async () => {
  const res = await axiosInstance.get(`/select_menu/units`);
  return res.data?.data || [];
};

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

  const [tempunits, setTempUnits] = useState(unitsIDS || []);
  const [tempCategories, setTempCategories] = useState<number[]>(
    category || []
  );
  const [tempBrands, setTempBrands] = useState<number[]>(brandID || []);

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  const { data: brands = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: 1000 * 60 * 5,
  });

  const { data: units = [], isLoading: loadingUnits } = useQuery({
    queryKey: ["units"],
    queryFn: fetchUnits,
    staleTime: 1000 * 60 * 5,
  });

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
    <div className="w-full sm:w-[280px] top-12 sm:top-0 absolute sm:left-12 md:left-14 lg:left-12 xl:left-[3.5%] bg-white rounded-xl border p-4 space-y-6 shadow z-[50] h-[400px] overflow-auto">
      <h2 className="font-bold text-lg">{t("Filters products")}</h2>

      <Accordion type="multiple" className="w-full space-y-4">
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-left font-bold text-base cursor-pointer">
            {t("Category")}
          </AccordionTrigger>
          <AccordionContent>
            {loadingCategories ? (
              <div>Loading...</div>
            ) : (
              categories.map((cat: any) => (
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
              ))
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger className="text-left font-bold text-base cursor-pointer">
            {t("Brands")}
          </AccordionTrigger>
          <AccordionContent>
            {loadingBrands ? (
              <div>Loading...</div>
            ) : (
              brands.map((brand: any) => (
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
              ))
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Units */}
        <AccordionItem value="units">
          <AccordionTrigger className="text-left font-bold text-base cursor-pointer">
            {t("units")}
          </AccordionTrigger>
          <AccordionContent>
            {loadingUnits ? (
              <div>Loading...</div>
            ) : (
              units.map((unit: any) => (
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
              ))
            )}
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
