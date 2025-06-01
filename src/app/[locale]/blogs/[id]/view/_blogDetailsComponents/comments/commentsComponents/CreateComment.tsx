"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useMainHook } from "@/lib/Hook/useMainHook";
import { EmojiCategory, emojis } from "@/components/Emojies/emojies";
import Loading from "@/components/button/Loading";
import EmojiesMenu from "./EmojiesMenu";

const CreateComment = ({
  BlogId,
  me,
  replay = false,
  getBlogComments,
  idCommentAndReplay,
  setOpenReplay,
  getBlog,
}: {
  BlogId: string | number;
  me: any;
  replay?: boolean;
  getBlogComments: () => void;
  getBlog: () => void;
  idCommentAndReplay?: number | null;
  setOpenReplay: (val: any) => void;
}) => {
  const { t } = useMainHook();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>("All");
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const addEmojiToContent = (emoji: string) => {
    setContent((prev) => prev + emoji);
  };

  const createComment = () => {
    if (!content.trim()) {
      toast.error(t("Write something first!"));
      return;
    }

    const data: {
      blog_id: string | number;
      content: string;
      parent_id?: number;
    } = {
      blog_id: BlogId,
      content,
    };

    if (idCommentAndReplay) data.parent_id = idCommentAndReplay;

    setLoading(true);
    axiosInstance
      .post(`/api/user/comments`, data)
      .then(() => {
        toast.success(t("commentCreatedSuccefully"));
        getBlogComments();
        setContent("");
        setOpenReplay(null);
        setShowEmojiPicker(false);
        getBlog();
      })
      .catch(() => {
        toast.error(t("commentCreatedUnSuccefully"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-5 flex items-center gap-5">
      <div>
        <Image
          className={`${
            replay
              ? "w-[40px] h-[40px] sm:w-[85px] sm:h-[85px]"
              : "w-[60px] h-[60px] sm:w-[117px] sm:h-[117px]"
          } rounded-full object-cover`}
          height={100}
          width={100}
          alt="avatar"
          src={me?.avatar}
        />
      </div>
      <div className="relative grow">
        <textarea
          autoFocus
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className={`${
            replay ? "h-[40px]" : "h-[80px]"
          } w-full py-2 pr-12 pl-4 bg-[#F7FFF2] rounded-[12px] resize-none text-black text-[14px] font-[400] focus:outline-none`}
          placeholder={t("Write your comment")}
        />
        <div className="absolute right-3 top-2/4 -translate-y-2/4 flex flex-col gap-2">
          <button
            type="button"
            className="cursor-pointer"
            onClick={createComment}
            disabled={loading}
          >
            {loading ? (
              <Loading />
            ) : (
              <Image
                src="/icons/iconamoon_send-fill.svg"
                alt="send"
                width={24}
                height={24}
              />
            )}
          </button>
          <EmojiesMenu
            addEmojiToContent={addEmojiToContent}
            emojis={emojis}
            replay={replay}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setShowEmojiPicker={setShowEmojiPicker}
            showEmojiPicker={showEmojiPicker}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
