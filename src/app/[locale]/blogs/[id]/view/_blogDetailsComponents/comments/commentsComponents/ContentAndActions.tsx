import React from "react";
import CommentMenu from "./CommentMenu";
import { useMainHook } from "@/lib/Hook/useMainHook";
import toast from "react-hot-toast";
import Image from "next/image";
import Loading from "@/components/button/Loading";

const ContentAndActions = ({
  comment,
  isOwner,
  handleDelete,
  handleEdit,
  isEditing,
  editedContent,
  handleUpdateSubmit,
  setEditedContent,
  setOpenReplay,
  openReply,
  isAuth,
  handleLike,
  color,
  setOpenLikeList,
  loading,
}: {
  comment: any;
  isOwner: any;
  setOpenLikeList: any;
  handleDelete: any;
  handleEdit: any;
  isEditing: any;
  editedContent: any;
  handleUpdateSubmit: any;
  setEditedContent: any;
  setOpenReplay: any;
  openReply: any;
  handleLike: any;
  isAuth: boolean;
  color: string;
  loading: boolean;
}) => {
  const { t } = useMainHook();

  return (
    <>
      {" "}
      <div className="flex flex-col gap-2 py-2 px-4 grow">
        <div className="w-full bg-[#F7FFF2] flex flex-col p-2 rounded-[12px] gap-3.5">
          <div className="flex items-center justify-between w-full ">
            <h1 className="text-[12px] sm:text-[20px] line-clamp-1 font-[700] text-[#071200]">
              {comment?.user?.name.slice(0, 15)}
            </h1>
            <div className="flex items-center gap-3">
              <span className="font-[400] text-[10px] sm:text-[14px] text-[#000000]">
                {new Date(comment?.created_at).toLocaleDateString()}
              </span>
              {isOwner && (
                <CommentMenu
                  comment={comment}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder={t("update your comment")}
                className="w-full py-2 pr-12 pl-4 bg-white h-[80px] rounded-[12px] resize-none text-black text-[14px] font-[400] focus:outline-none"
              />
              <button
                onClick={() => handleUpdateSubmit(comment.id)}
                className="self-end bg-white text-[#83C55A] shadow px-4 py-1 rounded-md text-sm cursor-pointer"
              >
                {loading ? <Loading /> : t("Save")}
              </button>
            </div>
          ) : (
            <div className="text-[#4B5744] font-[400] text-[16px]">
              {comment?.content}
            </div>
          )}
        </div>
        <div className="self-start flex items-center justify-between gap-8 ps-4  w-full">
          <div className="flex items-center gap-8">
            <button
              className="text-[#000000] font-[500] text-[16px] cursor-pointer"
              onClick={() => {
                if (isAuth) {
                  handleLike(comment?.id, comment?.like);
                } else {
                  toast.dismiss();
                  toast.error(t("please login first"));
                }
              }}
            >
              {t("Like")}
            </button>
            <button
              className={`${color} font-[500] text-[16px] cursor-pointer`}
              onClick={() => {
                if (isAuth) {
                  setOpenReplay(openReply === comment?.id ? null : comment?.id);
                } else {
                  toast.dismiss();
                  toast.error(t("please login first"));
                }
              }}
            >
              {t("Reply")}
            </button>
          </div>

          <button
            className="flex items-center gap-2 text-[#83C55A] font-[400] text-[16px] pe-5 cursor-pointer"
            onClick={() => {
              setOpenLikeList({ open: true, id: comment?.id });
            }}
          >
            {comment?.like_count || 0}{" "}
            <Image
              src={`/icons/iconamoon_like-fill.svg`}
              className="size-[24px]"
              alt="like"
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ContentAndActions;
