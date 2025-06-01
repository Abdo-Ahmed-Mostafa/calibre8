import Pagination from "@/components/Tfooter/NextPrevFooter";
import React from "react";

const ProductFooter = ({ totalPages, page, setPage }) => {
  return (
    <div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ProductFooter;
