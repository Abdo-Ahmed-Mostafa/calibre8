import React from "react";
import CreateComment from "./CreateComment";
import RepliesComment from "./RepliesComment";
import ContentAndActions from "./ContentAndActions";
import Image from "next/image";
import { splitFiewComment } from "../../types/splitFiewCommentTypes";

const SplitFiewComments = ({
  fourComments,
  editingCommentId,
  me,
  loading,
  isAuth,
  handleLike,
  setOpenReplay,
  openReply,
  editedContent,
  handleDelete,
  handleEdit,
  handleUpdateSubmit,
  setEditedContent,
  setOpenLikeList,
  openReplyMenuId,
  getBlogComments,
  replyingToReplyId,
  setOpenReplyMenuId,
  setReplyingToReplyId,
  editingReplyId,
  setEditingReplyId,
  blogID,
  showAllComments,
  getBlog,
}: splitFiewComment) => {
  return (
    <>
      <div className="flex flex-col">
        {fourComments.map((comment: any, index: number) => {
          const isOwner = me?.id === comment?.user?.id;
          const isEditing = editingCommentId === comment.id;
          const color =
            comment?.replies?.length > 0 ? "text-[#83C55A]" : "text-[#000000]";
          return (
            <div
              className="flex flex-col border-b-2 border-b-[#787878] pb-5"
              key={index}
            >
              <div
                className="flex sm:items-center flex-row gap-1 sm:gap-5  "
                key={index}
              >
                <div className="flex-shrink-0 w-[50px] h-[50px] lg:w-[117px] lg:h-[117px] mt-5 sm:mt-0">
                  <Image
                    src={comment?.user?.avatar}
                    alt="user"
                    className="rounded-full object-cover w-full h-full"
                    height={117}
                    width={117}
                  />
                </div>
                <ContentAndActions
                  loading={loading}
                  color={color}
                  isAuth={isAuth}
                  handleLike={handleLike}
                  setOpenReplay={setOpenReplay}
                  openReply={openReply}
                  comment={comment}
                  editedContent={editedContent}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleUpdateSubmit={handleUpdateSubmit}
                  isEditing={isEditing}
                  isOwner={isOwner}
                  setEditedContent={setEditedContent}
                  setOpenLikeList={setOpenLikeList}
                />
              </div>
              {comment?.replies?.length > 0 && (
                <div className="ms-10 sm:ms-28">
                  <RepliesComment
                    getBlog={getBlog}
                    handleDelete={handleDelete}
                    openReplyMenuId={openReplyMenuId}
                    replyingToReplyId={replyingToReplyId}
                    setOpenReplyMenuId={setOpenReplyMenuId}
                    setReplyingToReplyId={setReplyingToReplyId}
                    editingReplyId={editingReplyId}
                    setEditingReplyId={setEditingReplyId}
                    setEditedContent={setEditedContent}
                    editedContent={editedContent}
                    handleUpdateSubmit={handleUpdateSubmit}
                    loading={loading}
                    setOpenLikeList={setOpenLikeList}
                    openReply={openReply}
                    BlogId={blogID}
                    replies={
                      showAllComments
                        ? comment?.replies
                        : comment?.replies?.slice(0, 1)
                    }
                    me={me}
                    handleLike={handleLike}
                    getBlogComments={getBlogComments}
                    isAuth={isAuth}
                  />
                </div>
              )}
              {openReply === comment?.id && (
                <div className="ml-[60px] mt-2">
                  <CreateComment
                    getBlog={getBlog}
                    setOpenReplay={setOpenReplay}
                    replay
                    BlogId={blogID}
                    me={me}
                    getBlogComments={getBlogComments}
                    idCommentAndReplay={comment?.id}
                  />
                </div>
              )}
            </div>
          );
        })}
        {isAuth && (
          <CreateComment
            getBlog={getBlog}
            setOpenReplay={setOpenReplay}
            replay={false}
            BlogId={blogID}
            me={me}
            getBlogComments={getBlogComments}
          />
        )}
      </div>
    </>
  );
};

export default SplitFiewComments;
