import Stars from "@/components/Stars/Stars";
import Image from "next/image";
import React, { useState } from "react";
import ReviewMenu from "./ReviewMenu";
import axiosInstance from "@/lib/axios/axiosInstance";
import toast from "react-hot-toast";
import { useMainHook } from "@/lib/Hook/useMainHook";

const ReviewsTab = ({
  reviews,
  profile,
  getReviews,
}: {
  reviews: any;
  profile: any;
  getReviews: any;
}) => {
  const { t } = useMainHook();
  const [content, setContent] = useState("");
  const [rate, setRate] = useState(0);
  console.log("haha-312", rate, content);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const handleConfirmEdit = () => {
    if (editingReviewId !== null) {
      setEditingReviewId(null);
      setContent("");
      setRate(0);
      getReviews();
    }
  };
  const editReviewConfirm = (id: string) => {
    axiosInstance
      .put(`/api/user/reviews/${id}`, {
        rate,
        content,
      })
      .then(() => {
        toast.success(t("review edited successfully"));
      })
      .catch((rejected) => {
        console.log("hahah-312", rejected);

        toast.error(t("you are not auth"));
      });
  };
  const handleDelete = (id: string) => {
    axiosInstance
      .delete(`/api/user/reviews/${id}`)
      .then(() => {
        getReviews();
        toast.success(t("review Delete successfully"));
      })
      .catch(() => {
        toast.error(t("you are not auth"));
      });
  };
  const handleEdit = (review: any) => {
    setContent(review?.content);
    setRate(review?.rate);
    setEditingReviewId(review?.id);
  };
  return (
    <>
      {reviews?.data?.map(
        (
          review: {
            id: any;
            user: {
              avatar: string;
              name: string;
              id: number;
            };
            created_at: string;
            content: string;
            rate: number;
          },
          index: number
        ) => {
          return (
            <div
              className={`${
                index !== reviews?.data?.length - 1
                  ? "border-b border-b-black"
                  : ""
              }  pb-3 flex items-center gap-2 lg:gap-5 pt-5`}
              key={index}
            >
              <Image
                src={review?.user?.avatar}
                className="size-[50px] lg:size-[117px] object-cover rounded-full"
                alt=""
                height={39}
                width={39}
              />
              <div className="flex flex-col  w-full">
                <div className="flex items-center justify-between  ">
                  <div className="flex sm:items-center flex-col sm:flex-row gap-1 lg:gap-5">
                    <span className="text-[#071200] font-[700] text-[12px] lg:text-[24px]">
                      {review?.user?.name.slice(0, 15)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Stars rating={review?.rate} size={18} />{" "}
                      <span className="flex text-[#000000] font-[600] text-[10px] lg:text-[15px]">
                        {review?.rate}/{" "}
                        <span className="text-[#787878] text-[10px] lg:text-[15px] font-normal">
                          5
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] lg:text-[14px] text-[#000000] font-[400] flex items-center gap-1">
                    {new Date(review?.created_at).toLocaleDateString()}
                    {profile !== null && profile?.id === review?.user?.id && (
                      <ReviewMenu
                        review={review}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    )}
                  </div>
                </div>
                {editingReviewId === review?.id ? (
                  <div className="flex flex-col gap-2 mt-2 w-full grow ">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="p-2 border rounded-lg w-full min-h-[136px] resize-none "
                    />
                    <div className="flex items-center gap-2 justify-end">
                      {" "}
                      <button
                        onClick={handleConfirmEdit}
                        className="bg-white border-2 hover:bg-[#63bf52] hover:text-white cursor-pointer text-[#63bf52] font-bold py-1 px-3 rounded self-end w-fit"
                      >
                        {t("Cancel")}
                      </button>
                      <button
                        onClick={() => editReviewConfirm(review?.id)}
                        className="bg-[#83C55A] border-2 border-[#83C55A] cursor-pointer hover:bg-[#63bf52] text-white font-bold py-1 px-3 rounded self-end w-fit"
                      >
                        {t("Confirm Edit")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-[#4B5744] font-[400] text-[10px] lg:text-[16px]">
                    {review?.content}
                  </div>
                )}
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default ReviewsTab;
