"use client";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useEffect, useState } from "react";
import HeaderBlogs from "./HeaderBlogs";
import BlogBody from "./BlogBody";
import BlogFooter from "./BlogFooter";
import { useMainHook } from "@/lib/Hook/useMainHook";

const Clientblog = () => {
  const { t } = useMainHook();
  const [blogs, setBolgs] = useState({
    data: [],
    meta: { total: 0, last_page: 1 },
  });
  const [handle, setHandle] = useState("");
  // const [author_id, setAuthor_id] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [page, setPage] = useState(1);
  console.log("hphphp-312", page);

  const getBlogs = () => {
    const params = new URLSearchParams();

    // if (author_id) params.append("author_id", author_id);
    if (category) params.append("category", category);
    if (subCategory) params.append("subCategory", subCategory);
    if (page) params.append("page", page.toString());

    axiosInstance
      .get(
        `/api/public/blogs${
          params.toString()
            ? `?${params.toString()}&per_page=6&page=${page}`
            : ""
        }`
      )
      .then((response) => {
        setBolgs(response?.data);
      });
  };
  const handleSearch = () => {
    if (handle.trim() === "") {
      getBlogs();
      return;
    }

    axiosInstance
      .get(`/api/public/blogs?handle=${handle}&per_page=6&page=${page}`)
      .then((response) => {
        setBolgs(response?.data);
      });
  };
  useEffect(() => {
    if (!handle) {
      getBlogs();
    }
  }, [handle, page, getBlogs]);
  return (
    <div className=" bg-[var(--main-green-2)] ">
      <div className="w-[85%] mx-auto py-10 ">
        <HeaderBlogs t={t} setHandle={setHandle} handleSearch={handleSearch} />
        <BlogBody
          openFiler={openFilter}
          setOpenFiler={setOpenFilter}
          setSubCategory={setSubCategory}
          setCategory={setCategory}
          subCategory={subCategory}
          category={category}
          blogs={blogs?.data}
          onApplyFilter={getBlogs} // ✅
        />
        <BlogFooter
          page={page}
          setPage={setPage}
          totalPages={blogs?.meta?.last_page}
        />
      </div>
    </div>
  );
};

export default Clientblog;
