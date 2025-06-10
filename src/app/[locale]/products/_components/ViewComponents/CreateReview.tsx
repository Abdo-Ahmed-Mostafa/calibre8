import { useMainHook } from "@/lib/Hook/useMainHook";
import Image from "next/image";
import React, { useState } from "react";
import ReviewMenuEmoje from "./ReviewMenuEmoje";
import { EmojiCategory } from "@/components/Emojies/emojies";
import { IoMdStar } from "react-icons/io";
import axiosInstance from "@/lib/axios/axiosInstance";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/components/button/Loading";

const CreateReview = ({
  profile,
  getReviews,
}: {
  profile: any;
  getReviews: any;
}) => {
  const { t } = useMainHook();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const addEmojiToContent = (emoji: string) => {
    setReview((prev) => prev + emoji);
  };
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>("All");
  const handleSubmit = () => {
    setLoading(true);
    axiosInstance
      .post(`/api/user/reviews`, {
        rate: rating,
        content: review,
        product_id: pathName.split("/")[3],
      })
      .then(() => {
        getReviews();
        toast.dismiss();
        toast.success(t("review created succefully"));
        setReview("");
        setRating(0);
      })
      .catch((rejected) => {
        toast.dismiss();
        if (rejected?.response?.data?.message == "Already rated") {
          toast.error(t("you have rated once before"));
        } else {
          toast.error(t("you are not auth"));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-[#F7FFF2] border-2 rounded-[16px] shadow p-4 mt-14">
      <h4 className="text-[#071200] text-[24px] font-[700]">
        {t("Your review")}
      </h4>
      <div className="flex sm:flex-row flex-col gap-4 mt-4">
        <div className="flex  gap-3 w-[150px]">
          <Image
            className="size-[117px] rounded-full object-cover"
            src={profile?.avatar}
            alt="me"
            height={117}
            width={117}
          />
          <h5 className=" block sm:hidden font-[700] text-[20px] text-[#071200]">
            {profile?.name.slice(0, 10)}
          </h5>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <h5 className="font-[700] hidden sm:block text-[20px] text-[#071200]">
            {profile?.name}
          </h5>
          <div className="flex gap-3 items-center">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <IoMdStar
                  key={starValue}
                  className="cursor-pointer"
                  size={28}
                  color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              );
            })}
          </div>

          <div className=" relative">
            <textarea
              className="border-2 rounded-[16px] p-3 w-full  min-h-[136px] resize-none focus:outline-none shadow-md bg-white"
              placeholder={t("Write your review description")}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <ReviewMenuEmoje
              addEmojiToContent={addEmojiToContent}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setShowEmojiPicker={setOpenMenu}
              showEmojiPicker={openMenu}
            >
              <button type="button" className="absolute bottom-3 right-3">
                <Image
                  src={"/icons/ic_outline-emoji-emotions.svg"}
                  alt="emotions"
                  height={20}
                  width={20}
                  className="cursor-pointer"
                />
              </button>
            </ReviewMenuEmoje>
          </div>
          <button
            className="bg-[#83C55A] flex items-center gap-2.5 cursor-pointer font-[700] hover:bg-[#63bf52] text-white px-6 py-2 rounded-xl w-fit self-end -mt-3"
            onClick={handleSubmit}
          >
            {loading ? (
              <Loading color="#ffffff" />
            ) : (
              <>
                {" "}
                {t("Send")}{" "}
                <Image
                  src={"/icons/Vectorsend.svg"}
                  alt="send"
                  className="size-[20px]"
                  height={20}
                  width={20}
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
