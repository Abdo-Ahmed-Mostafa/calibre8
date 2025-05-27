import Image from "next/image";
import React from "react";
import Loading from "./Loading";
const LoginButtonLoading = ({ title, loading, url }: any) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full cursor-pointer bg-[var(--main)] text-[16px] md:text-[24px] text-white font-semibold py-4 rounded-md flex justify-center items-center gap-2 ${
        loading ? "cursor-not-allowed opacity-70" : ""
      }`}
    >
      {loading ? (
        <Loading color={"#ffffff"} />
      ) : (
        <>
          {title}
          <Image src={url} alt="LoginUser" width={26} height={21} />
        </>
      )}
    </button>
  );
};

export default LoginButtonLoading;
