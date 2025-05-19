import Image from "next/image";
import React from "react";
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
        <div className="spinner"></div>
      ) : (
        <>
          {title}
          <Image src={url} alt="LoginUser" width={26} height={21} />
        </>
      )}
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
};

export default LoginButtonLoading;
