"use client";

import axiosInstance from "@/lib/axios/axiosInstance";
import React, { useState } from "react";

import toast from "react-hot-toast";

import { fiewTypes } from "../../types/fiewCommentsTypes";
import SplitFiewComments from "./SplitFiewComments";

const FiewComments = ({
  blogID,
  setOpenLikeList,
  isAuth,
  me,
  showAllComments,
  getBlogComments,
  setEditingCommentId,
  setOpenReplay,
  setEditedContent,
  editedContent,
  t,
  editingCommentId,
  fourComments,
  openReply,
  editingReplyId,
  setEditingReplyId,
  openReplyMenuId,
  replyingToReplyId,
  setOpenReplyMenuId,
  setReplyingToReplyId,
  getBlog,
}: fiewTypes) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = (commentId: number) => {
    axiosInstance
      .delete(`/api/user/comments/${commentId}`)
      .then(() => {
        toast.success(t("comment has been deleted"));
        getBlogComments();
        setEditingCommentId(null);
        setOpenReplay(null);
        setEditedContent("");
      })
      .catch(() => {
        toast.error(t("you are not auth"));
      });
  };

  const handleEdit = (comment: any) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleUpdateSubmit = (commentId: number) => {
    setLoading(true);
    axiosInstance
      .put(`/api/user/comments/${commentId}`, {
        content: editedContent,
      })
      .then(() => {
        toast.success(t("comment has been edited successfully"));
        getBlogComments();
        setEditingCommentId(null);
        setOpenReplay(null);
        setEditingReplyId(null);
        setEditedContent("");
      })
      .catch(() => {
        toast.error(t("you are not auth"));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleLike = (modelID: number, IsLiked: boolean) => {
    const payload = {
      model_type: "comment",
      model_id: modelID,
    };
    axiosInstance
      .patch(`/api/favorites/toggle`, payload)
      .then(() => {
        getBlogComments();
        setEditingCommentId(null);
        setOpenReplay(null);
        setEditedContent("");
        if (IsLiked) {
          toast.dismiss();
          toast.success(t("comment like removed"));
        } else {
          toast.dismiss();
          toast.success(t("comment liked successfully"));
        }
      })
      .catch(() => {
        toast.error(t("you are not auth"));
      });
  };

  return (
    <>
      <SplitFiewComments
        getBlog={getBlog}
        blogID={blogID}
        editedContent={editedContent}
        editingCommentId={editingCommentId}
        editingReplyId={editingReplyId}
        fourComments={fourComments}
        getBlogComments={getBlogComments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleLike={handleLike}
        handleUpdateSubmit={handleUpdateSubmit}
        isAuth={isAuth}
        loading={loading}
        me={me}
        openReply={openReply}
        openReplyMenuId={openReplyMenuId}
        replyingToReplyId={replyingToReplyId}
        setEditedContent={setEditedContent}
        setEditingReplyId={setEditingReplyId}
        setOpenLikeList={setOpenLikeList}
        setOpenReplay={setOpenReplay}
        setOpenReplyMenuId={setOpenReplyMenuId}
        setReplyingToReplyId={setReplyingToReplyId}
        showAllComments={showAllComments}
      />
    </>
  );
};

export default FiewComments;
