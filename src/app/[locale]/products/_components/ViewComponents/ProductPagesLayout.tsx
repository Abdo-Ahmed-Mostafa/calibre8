import React, { useState } from "react";
import ProductTabs from "./ProductTabs";
import DescProduct from "./DescProduct";
import ReviewsProduct from "./ReviewsProduct";
import Measurement from "./Measurement";
import Compare from "./Compare";

const ProductPagesLayout = ({
  product,
  productID,
}: {
  product: any;
  productID: string;
}) => {
  const [activeTab, setActiveTab] = useState("description");
  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return <DescProduct product={product} />;
      case "reviews":
        return <ReviewsProduct productID={productID} />;
      case "measure":
        return <Measurement productDetails={product} />;
      case "compare":
        return <Compare productDetails={product} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="">
        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="bg-white p-4 border rounded-[16px] shadow-sm ">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default ProductPagesLayout;
