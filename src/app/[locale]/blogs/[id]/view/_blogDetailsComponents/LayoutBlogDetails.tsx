"use client";
import axiosInstance from "@/lib/axios/axiosInstance";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowBlogDetails from "./ShowBlogDetails";
import ShowAllComments from "./comments/ShowAllComments";
import { useMainHook } from "@/lib/Hook/useMainHook";
import CommentList from "./comments/commentsComponents/CommentList";
const LayoutBlogDetails = ({ id }: { id: string | number }) => {
  const [blog, setBlog] = useState<any>({});
  const [publishedDate, setPublishedDate] = useState<string>("");
  const [publishedTime, setPublishedTime] = useState<string>("");

  const [showAllComments, setShowAllComments] = useState(false);
  const me = useSelector((state: any) => state.profileReducer.profile);
  const isAuth = me !== null;
  const getBlog = useCallback(() => {
    axiosInstance.get(`/api/public/blogs/${id}`).then((resolved) => {
      const blogData = resolved?.data?.data;
      setBlog(blogData);

      if (blogData?.date) {
        const dateObj = new Date(blogData.date);

        const dateFormatted = dateObj.toLocaleDateString("en-CA");
        setPublishedDate(dateFormatted.replace(/-/g, "/"));

        const timeFormatted = dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        setPublishedTime(timeFormatted.toLowerCase());
      }
    });
  }, [id]);

  useEffect(() => {
    getBlog();
  }, [id, getBlog]);
  const { t } = useMainHook();
  const [fourComments, setFourComments] = useState<any[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [openReplyMenuId, setOpenReplyMenuId] = useState<number | null>(null);
  const [replyingToReplyId, setReplyingToReplyId] = useState<number | null>(
    null
  );

  const [page, setPage] = useState(1);
  const [openLikeList, setOpenLikeList] = useState({ open: false, id: 0 });
  const [openReply, setOpenReplay] = useState(null);
  const [paginition, setPaginition] = useState({ last_page: 0 });
  const getBlogComments = useCallback(() => {
    axiosInstance
      .get(`/api/public/comments/${id}?page=${page}`)
      .then((resolved) => {
        setFourComments(resolved?.data?.data);
        setPaginition(resolved?.data?.meta);
      });
  }, [id, page]);

  useEffect(() => {
    getBlogComments();
  }, [page, id, getBlogComments]);
  return (
    <div className="bg-[var(--main-green-2)] py-10">
      {showAllComments ? (
        <ShowAllComments
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
          page={page}
          paginition={paginition}
          setEditedContent={setEditedContent}
          setEditingCommentId={setEditingCommentId}
          setOpenReplay={setOpenReplay}
          setPage={setPage}
          t={t}
          id={id}
          isAuth={isAuth}
          me={me}
          setOpenLikeList={setOpenLikeList}
          setShowAllComments={setShowAllComments}
          showAllComments={showAllComments}
        />
      ) : (
        <ShowBlogDetails
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
          page={page}
          paginition={paginition}
          setEditedContent={setEditedContent}
          setEditingCommentId={setEditingCommentId}
          setOpenReplay={setOpenReplay}
          setPage={setPage}
          t={t}
          setShowAllComments={setShowAllComments}
          showAllComments={showAllComments}
          blog={blog}
          id={id}
          isAuth={isAuth}
          me={me}
          publishedDate={publishedDate}
          publishedTime={publishedTime}
        />
      )}

      <CommentList
        open={openLikeList?.open}
        commentId={openLikeList?.id}
        onClose={() => setOpenLikeList({ id: 0, open: false })}
      />
    </div>
  );
};

export default LayoutBlogDetails;
