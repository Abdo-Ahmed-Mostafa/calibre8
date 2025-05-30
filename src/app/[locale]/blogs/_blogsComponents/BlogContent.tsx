import BlogCard from "@/components/card/BlogCard";

export default function BlogCardList({ blogData }: any) {
  return (
    <div className="grid grid-cols-2 w-full gap-5 lg:gap-10 lg:p-14">
      {blogData.map((item: any, index: number) => (
        <BlogCard key={index} blog={item} />
      ))}
    </div>
  );
}
