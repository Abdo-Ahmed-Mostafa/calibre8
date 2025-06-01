import React from "react";
import CommentHeader from "./commentsComponents/CommentHeader";
import FiewComments from "./commentsComponents/FiewComments";
import AllCommentHeader from "./commentsComponents/AllCommentHeader";
import { commentLayoutType } from "../types/commentLayouttype";

const CommentLayout = ({
  blogId,
  isAuth,
  me,
  setShowAllComments,
  showAllComments,
  editedContent,
  editingCommentId,
  fourComments,
  setEditedContent,
  openReply,
  getBlogComments,
  setOpenReplay,
  t,
  setEditingCommentId,
  setOpenLikeList,
  editingReplyId,
  openReplyMenuId,
  replyingToReplyId,
  setOpenReplyMenuId,
  setReplyingToReplyId,
  setEditingReplyId,
  getBlog,
}: commentLayoutType) => {
  return (
    <div className="flex flex-col gap-10">
      {showAllComments ? (
        <AllCommentHeader setShowAllComments={setShowAllComments} />
      ) : (
        <CommentHeader setShowAllComments={setShowAllComments} />
      )}

      <FiewComments
        getBlog={getBlog}
        openReplyMenuId={openReplyMenuId}
        replyingToReplyId={replyingToReplyId}
        setOpenReplyMenuId={setOpenReplyMenuId}
        setReplyingToReplyId={setReplyingToReplyId}
        setEditingReplyId={setEditingReplyId}
        editingReplyId={editingReplyId}
        setOpenLikeList={setOpenLikeList}
        editedContent={editedContent}
        editingCommentId={editingCommentId}
        fourComments={fourComments}
        getBlogComments={getBlogComments}
        openReply={openReply}
        setEditedContent={setEditedContent}
        setEditingCommentId={setEditingCommentId}
        setOpenReplay={setOpenReplay}
        t={t}
        blogID={blogId}
        isAuth={isAuth}
        me={me}
        showAllComments={showAllComments}
      />
    </div>
  );
};

export default CommentLayout;
