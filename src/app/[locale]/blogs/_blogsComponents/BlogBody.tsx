import Image from "next/image";
import BlogFilter from "./FilterBlogs";
import BlogCardList from "./BlogContent";
import EmptyBlogs from "./EmptyBlogs";

const BlogBody = ({
  openFiler,
  setOpenFiler,
  category,
  subCategory,
  setCategory,
  setSubCategory,
  blogs,
  onApplyFilter,
  getBlogs,
}: {
  openFiler: boolean;
  setOpenFiler: (con: boolean) => void;
  setSubCategory: any;
  setCategory: any;
  subCategory: any;
  category: any;
  blogs: any;
  onApplyFilter: any;
  getBlogs: () => void;
}) => {
  return (
    <div className="mt-10 flex flex-col lg:flex-row  gap-1.5">
      <button
        className="rounded-[12px] p-[8px] h-[44px] w-[44px] bg-[#F7FFF2] cursor-pointer"
        onClick={() => {
          setOpenFiler(!openFiler);
        }}
      >
        <Image
          src={"/icons/iconFilter.svg"}
          height={22}
          width={22}
          alt="filter"
        />
      </button>
      {openFiler && (
        <BlogFilter
          setSubCategory={setSubCategory}
          setCategory={setCategory}
          subCategory={subCategory}
          category={category}
          onApplyFilter={onApplyFilter}
        />
      )}
      {blogs?.length > 0 ? (
        <BlogCardList blogData={blogs} getBlogs={getBlogs} />
      ) : (
        <EmptyBlogs />
      )}
    </div>
  );
};

export default BlogBody;
