import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/button/Loading";
import toast from "react-hot-toast";
import CreateComment from "./CreateComment";
import { ReplayCardTypes } from "../../types/replayCardTypes";
const ReplayCardSplit = ({
  isOwner,
  reply,
  t,
  setEditingReplyId,
  setEditedContent,
  setOpenReplyMenuId,
  handleDelete,
  editingReplyId,
  handleLike,
  handleUpdateSubmit,
  editedContent,
  loading,
  isAuth,
  setReplyingToReplyId,
  replyingToReplyId,
  getBlogComments,
  BlogId,
  setOpenLikeList,
  me,
  getBlog,
}: ReplayCardTypes) => {
  return (
    <>
      {" "}
      <div className="flex items-start gap-3 w-[97.5%] mx-auto">
        <Image
          src={reply?.user?.avatar}
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
          alt="user"
        />
        <div className="bg-[#F7FFF2] p-3 rounded-[12px] relative w-full">
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={`/icons/tabler_dots.svg`}
                  width={24}
                  height={24}
                  className="cursor-pointer right-2 absolute"
                  alt="dots"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[173px] h-[152px] flex items-center flex-col justify-center bg-[#F8FFF3] shadow-md rounded-[16px] ">
                <DropdownMenuItem
                  onClick={() => handleDelete(reply.id)}
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
                  onClick={() => {
                    setEditingReplyId(reply.id);
                    setEditedContent(reply?.content);
                    setOpenReplyMenuId(null);
                  }}
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
          )}

          {editingReplyId === reply.id ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full py-2 pr-12 pl-4 bg-white h-[80px] rounded-[12px] resize-none text-black text-[14px] font-[400] focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => handleUpdateSubmit(reply?.id)}
                className="self-end bg-white text-[#83C55A] shadow px-4 py-1 rounded-md text-sm cursor-pointer"
              >
                {loading ? <Loading /> : t("Save")}
              </button>
            </div>
          ) : (
            <p className="text-sm">{reply.content}</p>
          )}
        </div>
      </div>
      <div className="ml-[60px] mt-1 flex gap-4 items-center justify-between">
        <div className="flex items-center gap-4 ps-5">
          <button
            onClick={() => {
              if (isAuth) {
                handleLike(reply.id, reply.like);
              } else {
                toast.dismiss();
                toast.error(t("please login first"));
              }
            }}
            className="text-sm text-black cursor-pointer"
          >
            {t("Like")}
          </button>
          <button
            onClick={() => {
              if (isAuth) {
                setReplyingToReplyId(
                  reply.id === replyingToReplyId ? null : reply.id
                );
              } else {
                toast.dismiss();
                toast.error(t("please login first"));
              }
            }}
            className="text-sm text-black cursor-pointer"
          >
            {t("Reply")}
          </button>
        </div>
        <span
          className="text-[#83C55A] text-sm flex items-center gap-1 pe-5"
          onClick={() => {
            setOpenLikeList({ open: true, id: reply?.id });
          }}
        >
          {reply?.like_count || 0}
          <Image
            src="/icons/iconamoon_like-fill.svg"
            width={16}
            height={16}
            alt="like"
          />
        </span>
      </div>
      {replyingToReplyId === reply.id && (
        <div className="ml-[60px] mt-2">
          <CreateComment
            getBlog={getBlog}
            setOpenReplay={setReplyingToReplyId}
            replay
            BlogId={BlogId}
            me={me}
            getBlogComments={getBlogComments}
            idCommentAndReplay={reply.id}
          />
        </div>
      )}
    </>
  );
};

export default ReplayCardSplit;
