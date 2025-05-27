import React from "react";
import LayoutBlogDetails from "./_blogDetailsComponents/LayoutBlogDetails";

const page = ({ params }: { params: { id: string | number } }) => {
  console.log("hasan:", params?.id);

  return <LayoutBlogDetails id={params?.id} />;
};

export default page;
