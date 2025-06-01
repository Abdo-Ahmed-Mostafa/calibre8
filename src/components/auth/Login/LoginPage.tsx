"use client";
import React, { useState } from "react";
import BottomInfoCards from "./BottomInfoCards";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import InputWithIcon from "@/components/form/InputWithIcon";
import { CiMail, CiUnlock } from "react-icons/ci";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoginButtonLoading from "../../button/LoginButtonLoading";
import { showProfileUser } from "@/lib/redux/profileSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";

const LoginPage = () => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const loginSchema = z.object({
    email: z.string().email(t("email Invalid")),
    password: z.string().min(2, t("password Min Length 6")),
  });
  type LoginInput = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_FRONT_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          // لو كود الاستجابة مش بين 200 و 299 يبقى في خطأ، ترميه
          throw new Error(data.message || "Something went wrong");
        }

        return data;
      })
      .then(({ data }) => {
        console.log("22314ewdad", data);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("token_expires_at", data?.token_expires_at);
        localStorage.setItem("refresh_token", data?.refresh_token);
        dispatch(showProfileUser());
        toast.success("تم تسجيل الدخول بنجاح");
        router.push("/");
      })
      .catch((error) => {
        // if anything went wrong show a toast error
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className=" flex flex-col justify-center pt-8 items-center bg-[var(--main-green)] p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl w-[90%] p-8 border-1"
        >
          <h1 className="text-[20px] lg:text-[40px] font-bold text-center mb-1">
            {t("Welcome Back to Sign In")}
          </h1>
          <p className="text-center text-[16px] md:text-[20px] mb-6 font-normal">
            {t("Log in and dive back in")}
          </p>

          <InputWithIcon
            label={t("email")}
            isRequired
            placeholder={t("Enter Your Email")}
            icon={<CiMail className="text-white text-[30px]" />}
            {...register("email")}
            error={errors.email?.message}
          />

          <InputWithIcon
            label={t("Password")}
            isRequired
            type="password"
            placeholder={t("Enter Your Password")}
            icon={
              <CiUnlock className="text-white text-[30px] transform scale-x-[-1]" />
            }
            {...register("password")}
            error={errors.password?.message}
            // لو عندك خاصية showToggle في الكمبوننت InputWithIcon فعلها هنا لو موجودة
          />

          <div className="flex justify-end items-center mb-6 mt-4">
            <Link
              href="#"
              className="text-[var(--main)] text-sm hover:underline"
            >
              {t("forgetPassword")}
            </Link>
          </div>
          <LoginButtonLoading
            title={t("Sign In")}
            loading={loading}
            url="/icons/loginUser.svg"
          />

          <p className="text-center text-md font-semibold mt-6 mb-3">
            {t("Or Sign up With")}
          </p>
          <div className="flex justify-center gap-6 mb-4">
            <button aria-label="Sign in with Google" className="text-3xl">
              <FcGoogle />
            </button>
            <button
              aria-label="Sign in with Apple"
              className="text-3xl text-black"
            >
              <FaApple />
            </button>
            <button
              aria-label="Sign in with Facebook"
              className="text-3xl text-blue-600 hover:text-blue-800"
            >
              <FaFacebookF />
            </button>
          </div>

          <p className="text-center font-semibold text-md">
            {t("Already have account ?")}
            <Link
              href={`/${locale}/signup`}
              className="text-[var(--main)] hover:underline"
            >
              {" "}
              {t("Sign up")}
            </Link>
          </p>
        </form>
        <BottomInfoCards />
      </div>
    </div>
  );
};

export default LoginPage;
