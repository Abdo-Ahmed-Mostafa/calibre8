import Image from "next/image";
import React from "react";
import ReviewMenuEmoje from "./ReviewMenuEmoje";
import Loading from "@/components/button/Loading";
import { IoIosSearch } from "react-icons/io";

const CreateMesure = ({
  profile,
  t,
  measurement,
  setMeasurement,
  loading,
  addEmojiToContent,
  handleSubmit,
  openMenu,
  selectedCategory,
  setOpenMenu,
  setSelectedCategory,
}: {
  profile: any;
  t: any;
  measurement: any;
  setMeasurement: any;
  addEmojiToContent: any;
  selectedCategory: any;
  openMenu: any;
  setOpenMenu: any;
  handleSubmit: any;
  loading: any;
  setSelectedCategory: any;
}) => {
  return (
    <>
      {" "}
      <div className="bg-[#F7FFF2] p-4 rounded-[16px] shadow border">
        <h3 className="text-[#4B5744] font-[400] text-[16px]">
          {t(
            "Your search results will be intelligently generated using AI technology to provide you with the most relevant and accurate information"
          )}
        </h3>
        <div className="flex gap-4 mt-8">
          <Image
            src={profile?.avatar}
            alt="me"
            width={30}
            height={30}
            className="size-[60px] lg:size-[117px] rounded-full object-cover"
          />
          <div className="flex gap-3 flex-col w-full">
            <h4 className="text-[#071200] font-[700] text-[24px]">
              {profile?.name}
            </h4>
            <div className=" relative">
              <textarea
                className="border-2 rounded-[16px] p-3 w-full  min-h-[136px] resize-none focus:outline-none shadow-md bg-white"
                placeholder={t("Write your review description")}
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
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
              className="bg-[#83C55A] flex items-center gap-2.5 cursor-pointer font-[700] hover:bg-[#63bf52] text-white px-6 py-2 rounded-xl w-fit self-end "
              onClick={handleSubmit}
            >
              {loading ? (
                <Loading color="#ffffff" />
              ) : (
                <>
                  {" "}
                  {t("Search")} <IoIosSearch size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMesure;
