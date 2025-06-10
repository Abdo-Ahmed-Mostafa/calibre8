import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useMainHook } from "@/lib/Hook/useMainHook";
const ReviewMenu = ({
  review,
  handleDelete,
  handleEdit,
}: {
  review: any;
  handleDelete: any;
  handleEdit: any;
}) => {
  const { t } = useMainHook();
  return (
    <>
      {" "}
      <>
        {" "}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={`/icons/tabler_dots.svg`}
              width={24}
              height={24}
              className="cursor-pointer size-[16px] lg:size-[24px]"
              alt="dots"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full   lg:w-[173px] h-[152px] flex items-center flex-col justify-center bg-[#F8FFF3] shadow-md rounded-[16px] ">
            <DropdownMenuItem
              onClick={() => handleDelete(review.id)}
              className="flex items-center gap-2 text-[#C50606] font-[700] text-[24px] cursor-pointer"
            >
              {t("Delete")}
              <Image
                src={`/icons/material-symbols_delete-rounded.svg`}
                alt="Delete"
                height={24}
                width={24}
                className="size-[24px]"
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleEdit(review)}
              className="flex items-center gap-2 text-[#83C55A] font-[700] text-[24px] cursor-pointer"
            >
              {t("Update")}
              <Image
                src={`/icons/mage_edit-fill.svg`}
                alt="Update"
                height={24}
                width={24}
                className="size-[24px]"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    </>
  );
};

export default ReviewMenu;
