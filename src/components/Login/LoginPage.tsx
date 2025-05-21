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
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoginButtonLoading from "../button/LoginButtonLoading";
import { showProrfileuser } from "@/lib/redux/profileSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";

const LoginPage = () => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const loginSchema = z.object({
    email: z.string().email(t("login.emailInvalid")),
    password: z.string().min(2, t("login.passwordMinLength")),
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
        dispatch(showProrfileuser());
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
      <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--main-green)] p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg w-[90%] p-8 border-1"
        >
          <h1 className="text-[20px] lg:text-[40px] font-bold text-center mb-1">
            {t("login.title")}
          </h1>
          <p className="text-center text-[16px] md:text-[20px] mb-6 font-normal">
            {t("login.subtitle")}
          </p>

          <InputWithIcon
            label={t("from.email")}
            isRequired
            placeholder={t("from.Enter Your Email")}
            icon={<CiMail className="text-white text-[24px]" />}
            {...register("email")}
            error={errors.email?.message}
          />

          <InputWithIcon
            label={t("from.Password")}
            isRequired
            type="password"
            placeholder={t("from.Enter Your Password")}
            icon={
              <CiUnlock className="text-white text-[24px] transform scale-x-[-1]" />
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
              {t("login.forgetPassword")}
            </Link>
          </div>
          <LoginButtonLoading
            title={t("login.signInButton")}
            loading={loading}
            url="/icons/loginUser.svg"
          />

          <p className="text-center text-[14px] font-normal mt-6 mb-3">
            {t("login.orSignUpWith")}
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

          <p className="text-center text-sm">
            {t("login.signUpQuestion")}
            <Link href="#" className="text-green-600 hover:underline">
              {t("login.signUpLink")}
            </Link>
          </p>
        </form>
        <BottomInfoCards />
      </div>
    </div>
  );
};

export default LoginPage;
{
  /**
  
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
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoginButtonLoading from "../button/LoginButtonLoading";
import axiosInstance from "@/lib/axios/axiosInstance";

const LoginPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const loginSchema = z.object({
    email: z.string().email(t("login.emailInvalid")),
    password: z.string().min(2, t("login.passwordMinLength")),
  });
  type LoginInput = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    axiosInstance.get("/sanctum/csrf-cookie").then(() => {
      axiosInstance
        .post("/auth/login/website", data)
        .then(({ data }) => {
          console.log("dadasdasdasd", data.data);
          localStorage.setItem("token", data.data?.token);
          localStorage.setItem("token_expires_at", data.data?.token_expires_at);
          localStorage.setItem("refresh_token", data.data?.refresh_token);
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
    });
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--main-green)] p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg w-[90%] p-8 border-1"
        >
          <h1 className="text-[20px] lg:text-[40px] font-bold text-center mb-1">
            {t("login.title")}
          </h1>
          <p className="text-center text-[16px] md:text-[20px] mb-6 font-normal">
            {t("login.subtitle")}
          </p>

          <InputWithIcon
            label={t("from.email")}
            isRequired
            placeholder={t("from.Enter Your Email")}
            icon={<CiMail className="text-white text-[24px]" />}
            {...register("email")}
            error={errors.email?.message}
          />

          <InputWithIcon
            label={t("from.Password")}
            isRequired
            type="password"
            placeholder={t("from.Enter Your Password")}
            icon={
              <CiUnlock className="text-white text-[24px] transform scale-x-[-1]" />
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
              {t("login.forgetPassword")}
            </Link>
          </div>
          <LoginButtonLoading
            title={t("login.signInButton")}
            loading={loading}
            url="/icons/loginUser.svg"
          />

          <p className="text-center text-[14px] font-normal mt-6 mb-3">
            {t("login.orSignUpWith")}
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

          <p className="text-center text-sm">
            {t("login.signUpQuestion")}
            <Link href="#" className="text-green-600 hover:underline">
              {t("login.signUpLink")}
            </Link>
          </p>
        </form>
        <BottomInfoCards />
      </div>
    </div>
  );
};

export default LoginPage;
*/
}
