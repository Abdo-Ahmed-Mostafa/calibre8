import Pagination from "@/components/Tfooter/NextPrevFooter";
import React from "react";

const BlogFooter = ({ totalPages, setPage, page }: any) => {
  return (
    <div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default BlogFooter;
