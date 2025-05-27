"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useMainHook } from "@/lib/Hook/useMainHook";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BlogFilter({
  category,
  subCategory,
  setCategory,
  setSubCategory,
  onApplyFilter,
}: {
  setSubCategory: any;
  setCategory: any;
  subCategory: any;
  category: any;
  onApplyFilter: any;
}) {
  const { t } = useMainHook();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const getCategories = () => {
    axiosInstance.get(`/select_menu/categoryBlogs`).then((resolved) => {
      setCategories(resolved?.data?.data);
    });
  };
  const getSubCategories = () => {
    axiosInstance.get(`/select_menu/subCategoryBlogs`).then((resolved) => {
      setSubCategories(resolved?.data?.data);
    });
  };
  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);
  return (
    <div
      className={`-ms-4 mt-10 sm:mt-0 sm:ms-12 w-[280px] bg-white rounded-xl border p-4 space-y-4 shadow absolute z-[40]`}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-[700] text-[#071200] text-[24px] ">{t("Blogs")}</h2>
        <Image
          alt="filter"
          src={`/icons/iconFilter.svg`}
          width={15}
          height={15}
        />
      </div>

      <Accordion type="multiple" defaultValue={["category", "subcategory"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">
            {t("blogs.Category")}
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[180px] pr-2">
              {categories.map(
                (
                  item: { id: number | string; name: string; image: string },
                  index
                ) => (
                  <div
                    onClick={() => setCategory(item?.id)}
                    key={index}
                    className={`${
                      item?.id == category && "!text-green-500"
                    } flex items-center justify-between py-2 cursor-pointer hover:bg-muted rounded-md px-2`}
                  >
                    <div className="flex items-center gap-2  w-full">
                      <Image
                        src={item?.image}
                        alt="category"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span
                        className={`${
                          item?.id == category
                            ? "text-green-500"
                            : "text-[#787878]"
                        } text-[16px] font-[400] `}
                      >
                        {item?.name}
                      </span>
                    </div>
                    <ChevronRight
                      className={`${
                        item?.id == category
                          ? "text-green-500"
                          : "text-muted-foreground"
                      } w-4 h-4 `}
                    />
                  </div>
                )
              )}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="subcategory">
          <AccordionTrigger className="font-semibold">
            {t("blogs.Sub Category")}
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[180px] pr-2">
              {subCategories.map(({ id, name }, index) => (
                <div
                  onClick={() => setSubCategory(id)}
                  key={index}
                  className={`${
                    id == subCategory && "text-green-500"
                  } flex items-center justify-between py-2 cursor-pointer hover:bg-muted rounded-md px-2`}
                >
                  <span
                    className={`${
                      id == subCategory ? "text-green-500" : ""
                    } text-sm`}
                  >
                    {name}
                  </span>
                  <ChevronRight
                    className={`${
                      id == subCategory
                        ? "text-green-500"
                        : "text-muted-foreground"
                    } w-4 h-4 `}
                  />
                </div>
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      <Button
        onClick={onApplyFilter}
        className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold cursor-pointer"
      >
        {t("blogs.Apply Filter")}
      </Button>
    </div>
  );
}
