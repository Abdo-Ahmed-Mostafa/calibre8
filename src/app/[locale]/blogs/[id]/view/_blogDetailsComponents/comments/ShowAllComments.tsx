import React from "react";
import CommentLayout from "./commentLayout";
import Pagination from "@/components/Tfooter/NextPrevFooter";
import { showAllTypes } from "../types/showAllComment";

const ShowAllComments = ({
  id,
  isAuth,
  me,
  setShowAllComments,
  showAllComments,
  page,
  setPage,
  paginition,
  editedContent,
  editingCommentId,
  fourComments,
  getBlogComments,
  setEditedContent,
  openReply,
  setEditingCommentId,
  setOpenReplay,
  setOpenLikeList,
  t,
  setEditingReplyId,
  editingReplyId,
  openReplyMenuId,
  replyingToReplyId,
  setOpenReplyMenuId,
  setReplyingToReplyId,
}: showAllTypes) => {
  return (
    <>
      <div className="w-[90%] mx-auto bg-white p-6 rounded-lg shadow">
        <CommentLayout
          openReplyMenuId={openReplyMenuId}
          replyingToReplyId={replyingToReplyId}
          setOpenReplyMenuId={setOpenReplyMenuId}
          setReplyingToReplyId={setReplyingToReplyId}
          editingReplyId={editingReplyId}
          setEditingReplyId={setEditingReplyId}
          editedContent={editedContent}
          editingCommentId={editingCommentId}
          fourComments={fourComments}
          getBlogComments={getBlogComments}
          openReply={openReply}
          setEditedContent={setEditedContent}
          setEditingCommentId={setEditingCommentId}
          setOpenReplay={setOpenReplay}
          t={t}
          blogId={id}
          isAuth={isAuth}
          me={me}
          setShowAllComments={setShowAllComments}
          showAllComments={showAllComments}
          setOpenLikeList={setOpenLikeList}
        />
      </div>
      {showAllComments && (
        <div className="my-10">
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={paginition?.last_page}
          />
        </div>
      )}
    </>
  );
};

export default ShowAllComments;
