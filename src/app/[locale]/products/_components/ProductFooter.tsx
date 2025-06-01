import Pagination from "@/components/Tfooter/NextPrevFooter";
import React from "react";
interface BlogPaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}
const Footer = ({ totalPages, page, setPage }: BlogPaginationProps) => {
  return (
    <div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Footer;
