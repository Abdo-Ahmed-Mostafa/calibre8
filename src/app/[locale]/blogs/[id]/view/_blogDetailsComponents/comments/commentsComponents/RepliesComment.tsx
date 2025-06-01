"use client";
import React from "react";
import { useMainHook } from "@/lib/Hook/useMainHook";
import { replayTypes } from "../../types/replay";
import ReplayCard from "./ReplayCard";

const RepliesComment = ({
  replies,
  me,
  getBlogComments,
  BlogId,
  openReply,
  isAuth,
  handleLike,
  setOpenLikeList,
  handleUpdateSubmit,
  loading,
  editedContent,
  setEditedContent,
  setEditingReplyId,
  editingReplyId,
  setOpenReplyMenuId,
  setReplyingToReplyId,
  openReplyMenuId,
  replyingToReplyId,
  handleDelete,
  getBlog,
}: replayTypes) => {
  const { t } = useMainHook();

  return (
    <>
      {replies.map((reply) => {
        const isOwner = me?.id === reply?.user?.id;

        return (
          <div key={reply.id} className="mt-4 ">
            <ReplayCard
              getBlog={getBlog}
              BlogId={BlogId}
              editedContent={editedContent}
              editingReplyId={editingReplyId}
              getBlogComments={getBlogComments}
              handleDelete={handleDelete}
              handleLike={handleLike}
              handleUpdateSubmit={handleUpdateSubmit}
              isAuth={isAuth}
              isOwner={isOwner}
              loading={loading}
              me={me}
              openReply={openReply}
              openReplyMenuId={openReplyMenuId}
              reply={reply}
              replyingToReplyId={replyingToReplyId}
              setEditedContent={setEditedContent}
              setEditingReplyId={setEditingReplyId}
              setOpenLikeList={setOpenLikeList}
              setOpenReplyMenuId={setOpenReplyMenuId}
              setReplyingToReplyId={setReplyingToReplyId}
              t={t}
            />
          </div>
        );
      })}
    </>
  );
};

export default RepliesComment;
