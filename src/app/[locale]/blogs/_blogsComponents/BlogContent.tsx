import BlogCard from "@/components/card/BlogCard";

export default function BlogCardList({ blogData, getBlogs }: any) {
  return (
    <div className="grid grid-cols-2 w-full gap-5 lg:gap-10 lg:p-14">
      {blogData.map((item: any, index: number) => (
        <BlogCard getBlogs={getBlogs} key={index} blog={item} />
      ))}
    </div>
  );
}
