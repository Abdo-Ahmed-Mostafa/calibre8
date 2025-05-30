"use client";
import React, { useState, useEffect, useRef } from "react";
import ReusableOtp from "../otp/ReusableOtp";
import { useMainHook } from "@/lib/Hook/useMainHook";
import LoginButtonLoading from "@/components/button/LoginButtonLoading";
import BottomInfoCards from "../Login/BottomInfoCards";
import {
  ToasterSoonerError,
  ToasterSoonerSuccess,
} from "@/components/toaster/Toast_Sooner";
import axiosInstance from "@/lib/axios/axiosInstance";

const VerifyAccountPage = () => {
  const { t, loading, setLoading, getQueryParam, router, locale } =
    useMainHook();
  const [otp, setOtp] = useState("");
  const handle = getQueryParam("email");
  const [resendTimer, setResendTimer] = useState(120); // 120 ثانية (دقيقتين)
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // عداد تنازلي للـ resend
  useEffect(() => {
    if (resendTimer === 0) {
      setCanResend(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    if (resendTimer > 0) {
      setCanResend(false);
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTimer]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (otp.length !== 4) {
      ToasterSoonerError("minimum 4 numbers");
      return;
    }
    setLoading(true);
    axiosInstance
      .post("/auth/password/validate_code", {
        handle,
        code: otp,
        type: 2,
      })
      .then((data) => {
        console.log("Verification success", data);
        ToasterSoonerSuccess("Verification successful");
        router.push(`/${locale}/login`);
      })
      .catch((err) => {
        console.log("error", err);
        ToasterSoonerError("Verification failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResend = () => {
    if (!canResend) return;
    setLoading(true);
    axiosInstance
      .post("/auth/verify_user/resend", { handle: handle })
      .then(() => {
        ToasterSoonerSuccess(t("signUp.The code has been resend"));
        setResendTimer(120);
        setCanResend(false);
      })
      .catch((err) => {
        console.log("Resend error", err);
        ToasterSoonerError("حدث خطأ أثناء إعادة الإرسال");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div>
      <div className="flex flex-col justify-center pt-8 items-center bg-[var(--main-green)] p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl w-[90%] p-8 border-1"
        >
          <h1 className="text-[20px] lg:text-[40px] font-bold text-center mb-1">
            {t("login.title")}
          </h1>
          <p className="text-center text-[16px] md:text-[20px] mb-6 font-normal">
            {t("login.subtitle")}
          </p>
          <p className="text-center text-[12px] md:text-[16px] mb-6 font-bold">
            {handle}
          </p>
          <div className="py-10">
            <ReusableOtp otp={otp} setOtp={setOtp} />
          </div>
          <LoginButtonLoading
            title={t("login.submit")}
            loading={loading}
            url="/icons/loginUser.svg"
          />

          {/* زر إعادة الإرسال */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend || loading}
              className={`px-4 py-2 cursor-pointer rounded-md font-semibold ${"text-[var(--main)]"}`}
            >
              {t("Resend Code")}?
              <span className="text-red-600"> {formatTime(resendTimer)}</span>
            </button>
          </div>

          <p className="text-center text-md font-semibold mt-6 mb-3">
            {t("login.orSignUpWith")}
          </p>
        </form>
        <BottomInfoCards />
      </div>
    </div>
  );
};

export default VerifyAccountPage;
