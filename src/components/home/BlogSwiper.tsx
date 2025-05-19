import React from "react";
import HeaderSectionHome from "./HeaderSectionHome";
import ViewAllButton from "./ViewAllButton";
import { getTranslations } from "next-intl/server";
import DataFetcher from "../DataFetcher";
import ReusableCarousel from "../ReusableCarousel/ReusableCarousel";
import BlogCard from "../card/BlogCard";

const BlogSwiper = async () => {
  const t = await getTranslations();
  return (
    <div>
      <HeaderSectionHome
        title={t("HomePage.Blogs")}
        body={t("HomePage.Stay updated with Blogs")}
      />
      <ViewAllButton href="/asdasd" />
      <DataFetcher<any>
        url="/api/public/blogs"
        render={(blogs) => {
          console.log("blogs", blogs);

          return (
            <ReusableCarousel slidesToScroll={1} slidesToShow={2} dots={false}>
              {blogs?.data.map((blog: any, index: number) => (
                <div key={index}>
                  <BlogCard blog={blog} />
                </div>
              ))}
            </ReusableCarousel>
          );
        }}
      />
    </div>
  );
};

export default BlogSwiper;
