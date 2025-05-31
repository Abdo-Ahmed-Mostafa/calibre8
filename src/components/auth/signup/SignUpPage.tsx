"use client";
import React, { useState } from "react";
import BottomInfoCards from "../Login/BottomInfoCards";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookF } from "react-icons/fa";
import InputWithIcon from "@/components/form/InputWithIcon";
import {
  CiLocationOn,
  CiMail,
  CiPhone,
  CiUnlock,
  CiUser,
} from "react-icons/ci";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import toast from "react-hot-toast";
import LoginButtonLoading from "../../button/LoginButtonLoading";
import { useMainHook } from "@/lib/Hook/useMainHook";
import { ToasterSoonerSuccess } from "@/components/toaster/Toast_Sooner";

const SignUpPage = () => {
  const t = useTranslations();
  const { router } = useMainHook();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const signupSchema = z
    .object({
      name: z.string().min(1, t("first Name Required")),
      email: z.string().email(t("email Invalid")),
      phone: z.string().min(10, t("phone Number Invalid")), // يفضل Regex هنا
      password: z.string().min(6, t("password Min Length 6")),
      password_confirmation: z.string(),
      gender: z.string().min(1, t("gender Required")),
      address: z.string().min(1, t("address Required")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("passwords Do Not Match"),
      path: ["password_confirmation"],
    });

  type LoginInput = z.infer<typeof signupSchema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (formData: any) => {
    console.log("Submitting form...", formData);

    const dataToSend = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
    };
    delete dataToSend.firstName;
    delete dataToSend.lastName;

    setLoading(true);

    try {
      fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/register/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then(async (res) => {
          const data = await res.json();
          console.log("Asdasdasdasd", data?.data);

          if (!res.ok) {
            throw data?.data;
          }

          return data;
        })
        .then((data) => {
          console.log("asdasdasd,data", data);

          ToasterSoonerSuccess("تم انشاء الحساب بنجاج ");
          router.push(
            `/${locale}/vrefiy-user?email=${encodeURIComponent(formData.email)}`
          );
        })
        .catch((error) => {
          const err = error?.phone || error.email;
          toast.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className=" flex flex-col justify-center pt-8 items-center bg-[var(--main-green)] p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl w-[90%] p-8 border-1"
        >
          <h1 className="text-[20px] lg:text-[40px] font-bold text-center mb-1">
            {t("Welcome to Sign UP")}
          </h1>
          <p className="text-center text-[16px] md:text-[20px] mb-6 font-normal">
            {t("Create your account and get started!")}
          </p>

          <div className="flex gap-8 ">
            <InputWithIcon
              label={t("full name")}
              isRequired
              placeholder={t("Enter Your full name")}
              icon={<CiUser className="text-white text-[30px]" />}
              {...register("name")}
              error={errors.name?.message}
            />
          </div>
          <div className="flex gap-8">
            <InputWithIcon
              label={t("email")}
              isRequired
              placeholder={t("Enter Your Email")}
              icon={<CiMail className="text-white text-[30px]" />}
              {...register("email")}
              error={errors.email?.message}
            />

            <Controller
              name="phone"
              control={control}
              rules={{ required: t("required") }}
              render={({ field }) => (
                <InputWithIcon
                  label={t("Phone Number")}
                  isRequired
                  type="phone"
                  placeholder={t("Enter Your Phone Number")}
                  icon={<CiPhone className="text-white text-[30px]" />}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.phone?.message}
                />
              )}
            />
          </div>

          <div className="flex gap-8">
            {" "}
            <InputWithIcon
              label={t("Password")}
              isRequired
              type="password"
              placeholder={t("Enter Your Password")}
              icon={
                <CiUnlock className="text-white text-[30px] scale-x-[-1]" />
              }
              {...register("password")}
              error={errors.password?.message}
            />
            <InputWithIcon
              label={t("Confirm Password")}
              isRequired
              type="password"
              placeholder={t("Confirm Your Password")}
              icon={
                <CiUnlock className="text-white text-[30px] scale-x-[-1]" />
              }
              {...register("password_confirmation")}
              error={errors.password_confirmation?.message}
            />
          </div>

          <InputWithIcon
            label={t("Gender")}
            isRequired
            placeholder={t("Enter Your Gender")}
            icon={<CiUser className="text-white text-[30px]" />}
            {...register("gender")}
            error={errors.gender?.message}
          />

          <InputWithIcon
            label={t("Address")}
            isRequired
            placeholder={t("Enter Your Address")}
            icon={<CiLocationOn className="text-white text-[30px]" />}
            {...register("address")}
            error={errors.address?.message}
          />

          <div className="flex justify-end items-center mb-6 mt-4">
            <Link
              href="#"
              className="text-[var(--main)] text-sm hover:underline"
            >
              {t("Forget Password")}
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
              href={`/${locale}/login`}
              className="text-[var(--main)] hover:underline"
            >
              {" "}
              {t("login")}
            </Link>
          </p>
        </form>
        <BottomInfoCards />
      </div>
    </div>
  );
};

export default SignUpPage;
