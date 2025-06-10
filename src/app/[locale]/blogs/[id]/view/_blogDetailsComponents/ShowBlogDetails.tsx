import React from "react";
import ViewBlogHeader from "./ViewBlogHeader";
import BlogBody from "./BlogBody";
import BlogTags from "./BlogTags";
import CommentLayout from "./comments/commentLayout";
import { showDetalisType } from "./types/showBlogDetalisTypes";
const ShowBlogDetails = ({
  blog,
  isAuth,
  id,
  me,
  publishedDate,
  publishedTime,
  setShowAllComments,
  showAllComments,
  editedContent,
  editingCommentId,
  fourComments,
  getBlogComments,
  setEditedContent,
  openReply,
  setEditingCommentId,
  setOpenReplay,
  t,
  setOpenLikeList,
  editingReplyId,
  setEditingReplyId,
  openReplyMenuId,
  replyingToReplyId,
  setOpenReplyMenuId,
  setReplyingToReplyId,
  getBlog,
}: showDetalisType) => {
  return (
    <div className="w-[90%] mx-auto overflow-hidden rounded-[16px] bg-white pb-10">
      <ViewBlogHeader
        blogID={id}
        favorite={blog?.favorite}
        getBlog={getBlog}
        comments={blog?.all_comments_count}
        date={publishedDate}
        time={publishedTime}
        srcBlog={blog?.image}
      />
      <div className="px-3 sm:px-8">
        <BlogBody
          title={blog?.title}
          autherSrcImg={blog?.author?.image}
          name={blog?.author?.name}
          desc={blog?.description}
        />
        <div className=" pb-6">
          {" "}
          <BlogTags tags={blog?.tags} />
        </div>

        <CommentLayout
          getBlog={getBlog}
          openReplyMenuId={openReplyMenuId}
          replyingToReplyId={replyingToReplyId}
          setOpenReplyMenuId={setOpenReplyMenuId}
          setReplyingToReplyId={setReplyingToReplyId}
          editingReplyId={editingReplyId}
          setEditingReplyId={setEditingReplyId}
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
          blogId={id}
          isAuth={isAuth}
          me={me}
          setShowAllComments={setShowAllComments}
          showAllComments={showAllComments}
        />
      </div>
    </div>
  );
};

export default ShowBlogDetails;
