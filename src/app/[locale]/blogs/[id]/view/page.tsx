import LayoutBlogDetails from "./_blogDetailsComponents/LayoutBlogDetails";
export async function generateMetadata({
  params,
}: {
  params: { id: string; locale: string };
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.id}`,
      {
        cache: "no-store", // أو "force-cache" حسب احتياجك
      }
    );

    const blog = await res.json();

    return {
      title: blog.title,
      description: blog.shortDescription || blog.desc,
      openGraph: {
        title: blog.title,
        description: blog.shortDescription || blog.desc,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.id}`,
        type: "article",
        images: [
          blog.image || `${process.env.NEXT_PUBLIC_BASE_URL}/default-image.jpg`,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.shortDescription || blog.desc,
        images: [
          blog.image || `${process.env.NEXT_PUBLIC_BASE_URL}/default-image.jpg`,
        ],
      },
    };
  } catch (error) {
    return {
      title: "مقال غير متاح",
      description: "حدث خطأ أثناء تحميل المقال",
    };
  }
}

const Page = () => {
  return <LayoutBlogDetails />;
};

export default Page;
