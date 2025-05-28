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
      name: z.string().min(1, t("form.firstNameRequired")),
      lastName: z.string().min(1, t("form.lastNameRequired")),
      email: z.string().email(t("login.emailInvalid")),
      phone: z.string().min(10, t("form.phoneNumberInvalid")), // يفضل Regex هنا
      password: z.string().min(6, t("login.passwordMinLength")),
      password_confirmation: z.string(),
      gender: z.string().min(1, t("form.genderRequired")),
      address: z.string().min(1, t("form.addressRequired")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("form.passwordsDoNotMatch"),
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
            {t("signUp.title")}
          </h1>
          <p className="text-center text-[16px] md:text-[20px] mb-6 font-normal">
            {t("signUp.subtitle")}
          </p>

          <div className="flex gap-8 ">
            <InputWithIcon
              label={t("form.First Name")}
              isRequired
              placeholder={t("form.Enter Your First Name")}
              icon={<CiUser className="text-white text-[30px]" />}
              {...register("name")}
              error={errors.name?.message}
            />

            <InputWithIcon
              label={t("form.Last Name")}
              isRequired
              placeholder={t("form.Enter Your Last Name")}
              icon={<CiUser className="text-white text-[30px]" />}
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
          <div className="flex gap-8">
            <InputWithIcon
              label={t("form.email")}
              isRequired
              placeholder={t("form.Enter Your Email")}
              icon={<CiMail className="text-white text-[30px]" />}
              {...register("email")}
              error={errors.email?.message}
            />

            <Controller
              name="phone"
              control={control}
              rules={{ required: t("form.required") }}
              render={({ field }) => (
                <InputWithIcon
                  label={t("form.Phone Number")}
                  isRequired
                  type="phone"
                  placeholder={t("form.Enter Your Phone Number")}
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
              label={t("form.Password")}
              isRequired
              type="password"
              placeholder={t("form.Enter Your Password")}
              icon={
                <CiUnlock className="text-white text-[30px] scale-x-[-1]" />
              }
              {...register("password")}
              error={errors.password?.message}
            />
            <InputWithIcon
              label={t("form.Confirm Password")}
              isRequired
              type="password"
              placeholder={t("form.Confirm Your Password")}
              icon={
                <CiUnlock className="text-white text-[30px] scale-x-[-1]" />
              }
              {...register("password_confirmation")}
              error={errors.password_confirmation?.message}
            />
          </div>

          <InputWithIcon
            label={t("form.Gender")}
            isRequired
            placeholder={t("form.Enter Your Gender")}
            icon={<CiUser className="text-white text-[30px]" />}
            {...register("gender")}
            error={errors.gender?.message}
          />

          <InputWithIcon
            label={t("form.Address")}
            isRequired
            placeholder={t("form.Enter Your Address")}
            icon={<CiLocationOn className="text-white text-[30px]" />}
            {...register("address")}
            error={errors.address?.message}
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

          <p className="text-center text-md font-semibold mt-6 mb-3">
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

          <p className="text-center font-semibold text-md">
            {t("login.signUpQuestion")}
            <Link
              href={`/${locale}/login`}
              className="text-[var(--main)] hover:underline"
            >
              {" "}
              {t("login.login")}
            </Link>
          </p>
        </form>
        <BottomInfoCards />
      </div>
    </div>
  );
};

export default SignUpPage;
