"use client";

import { Button } from "@/components/ui/button";
import { useMainHook } from "@/lib/Hook/useMainHook";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({
  page,
  setPage,
  totalPages,
}: BlogPaginationProps) {
  const { t } = useMainHook();

  const baseButtonClass =
    "w-[50px] cursor-pointer h-[70px] cur p-0 m-0 border border-[#E9E9E9] rounded-none text-base text-[#83C55A] ";

  const renderPages = () => {
    const pages = [];
    const visiblePages = 5;

    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(totalPages - 1, page + 1);

    if (page <= 3) {
      endPage = Math.min(visiblePages, totalPages - 1);
    }

    if (page >= totalPages - 2) {
      startPage = Math.max(totalPages - visiblePages + 1, 2);
    }

    // Always show first page
    pages.push(
      <Button
        key={1}
        variant="outline"
        onClick={() => setPage(1)}
        className={cn(baseButtonClass, page === 1 && "bg-[#83C55A] text-white")}
      >
        1
      </Button>
    );

    // Ellipsis before middle
    if (startPage > 2) {
      pages.push(
        <span
          key="start-ellipsis"
          className={baseButtonClass + " flex items-center justify-center"}
        >
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant="outline"
          onClick={() => setPage(i)}
          className={cn(
            baseButtonClass,
            page === i && "bg-[#83C55A] text-white"
          )}
        >
          {i}
        </Button>
      );
    }

    // Ellipsis after middle
    if (endPage < totalPages - 1) {
      pages.push(
        <span
          key="end-ellipsis"
          className={baseButtonClass + " flex items-center justify-center"}
        >
          ...
        </span>
      );
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant="outline"
          onClick={() => setPage(totalPages)}
          className={cn(
            baseButtonClass,
            page === totalPages && "bg-[#83C55A] text-white"
          )}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    totalPages !== 1 && (
      <div className="flex justify-center items-center mt-6 flex-wrap overflow-hidden rounded-xl border border-[#E9E9E9] w-fit mx-auto">
        {page > 1 && (
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            className={`${cn(baseButtonClass)} w-[84px]`}
          >
            {t("Prev")}
          </Button>
        )}

        {renderPages()}

        {page < totalPages && (
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            className={`${cn(baseButtonClass)} w-[84px]`}
          >
            {t("Next")}
          </Button>
        )}
      </div>
    )
  );
}
