"use client";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useMainHook } from "@/lib/Hook/useMainHook";
import React, { useState } from "react";
import ViewHeader from "./ViewHeader";
import ReviewsTab from "./ReviewsTab";
import EmptyPage from "@/components/EmptyPage";
import { useSelector } from "react-redux";
import Pagination from "@/components/Tfooter/NextPrevFooter";
import CreateReview from "./CreateReview";
import { useQuery } from "@tanstack/react-query";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { AxiosError } from "axios";
type Review = {
  id: number;
  comment: string;
  rating: number;
  user: {
    name: string;
    avatar: string;
  };
  created_at: string;
};

type PaginatedReviews = {
  data: Review[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
};
const ReviewsProduct = ({ productID }: { productID: string }) => {
  const { t } = useMainHook();
  const [openAllReviews, setOpenAllReviews] = useState(false);
  const { profile } = useSelector((state: any) => state.profileReducer);
  const [page, setPage] = useState(1);

  // جلب التقييمات باستخدام React Query
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  }: any = useQuery<PaginatedReviews, AxiosError>({
    queryKey: ["product-reviews", productID, page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/public/reviews/product/${productID}?per_page=6&page=${page}`
      );
      return res?.data;
    },
    // @ts-expect-error: keepPreviousData is allowed, TypeScript infers wrong type

    keepPreviousData: true, // يحافظ على البيانات القديمة عند تغيير الصفحة
  });

  return (
    <>
      <div className="bg-[#F7FFF2] p-4 rounded-[16px] shadow border">
        {isLoading ? (
          <LoaderPage />
        ) : isError ? (
          <EmptyPage text={t("no review on this product")} />
        ) : reviews?.data?.length > 0 ? (
          <>
            <ViewHeader
              t={t}
              setOpenAllReviews={setOpenAllReviews}
              openAllReviews={openAllReviews}
            />
            <ReviewsTab
              reviews={reviews}
              profile={profile}
              getReviews={refetch} // ممكن تمرره كـ refetch
            />
          </>
        ) : (
          <EmptyPage text={t("no review on this product")} />
        )}

        {openAllReviews && reviews?.meta?.last_page > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={reviews?.meta?.last_page}
          />
        )}
      </div>

      {/* إظهار نموذج إضافة تقييم فقط لو المستخدم مسجل دخول */}
      {profile !== null && (
        <CreateReview profile={profile} getReviews={refetch} />
      )}
    </>
  );
};

export default ReviewsProduct;
