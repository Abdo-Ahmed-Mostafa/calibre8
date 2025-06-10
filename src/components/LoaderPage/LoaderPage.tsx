import React from "react";

const LoaderPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[var(--main-green-2)]">
      <div className="loader animate-spin rounded-full border-8 border-white border-t-transparent w-16 h-16"></div>
    </div>
  );
};

export default LoaderPage;
