import React from "react";
import RepliesComment from "./RepliesComment";
import ReplayCardSplit from "./ReplayCardSplit";
import { ReplayCardTypes } from "../../types/replayCardTypes";
const ReplayCard = ({
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
  openReply,
  editedContent,
  loading,
  isAuth,
  setReplyingToReplyId,
  replyingToReplyId,
  openReplyMenuId,
  getBlogComments,
  BlogId,
  setOpenLikeList,
  me,
}: ReplayCardTypes) => {
  return (
    <>
      {" "}
      <ReplayCardSplit
        openReply={openReply}
        openReplyMenuId={openReplyMenuId}
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
        reply={reply}
        replyingToReplyId={replyingToReplyId}
        setEditedContent={setEditedContent}
        setEditingReplyId={setEditingReplyId}
        setOpenLikeList={setOpenLikeList}
        setOpenReplyMenuId={setOpenReplyMenuId}
        setReplyingToReplyId={setReplyingToReplyId}
        t={t}
      />
      {reply?.replies?.length > 0 && (
        <RepliesComment
          handleDelete={handleDelete}
          openReplyMenuId={openReplyMenuId}
          replyingToReplyId={replyingToReplyId}
          setOpenReplyMenuId={setOpenReplyMenuId}
          setReplyingToReplyId={setReplyingToReplyId}
          editingReplyId={editingReplyId}
          setEditingReplyId={setEditingReplyId}
          editedContent={editedContent}
          setEditedContent={setEditedContent}
          loading={loading}
          handleUpdateSubmit={handleUpdateSubmit}
          setOpenLikeList={setOpenLikeList}
          replies={reply.replies}
          me={me}
          getBlogComments={getBlogComments}
          BlogId={BlogId}
          openReply={openReply}
          isAuth={isAuth}
          handleLike={handleLike}
        />
      )}
    </>
  );
};

export default ReplayCard;
