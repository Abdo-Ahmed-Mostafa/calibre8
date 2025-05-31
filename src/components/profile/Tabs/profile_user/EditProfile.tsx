import InputWithIcon from "@/components/form/InputWithIcon";
import { useMainHook } from "@/lib/Hook/useMainHook";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiPhone, CiUser } from "react-icons/ci";
import { z } from "zod";
import { MdEmail, MdWc } from "react-icons/md";
import SavButton_Back from "@/components/button/SavButton_Back";
import axiosInstance from "@/lib/axios/axiosInstance";
import { showProfileUser } from "@/lib/redux/profileSlice";

const EditProfile = ({ data, setIsEdit }: any) => {
  const { t, dispatch } = useMainHook();

  const profileSchema = z.object({
    name: z.string().min(1, t("first Name Required")),
    email: z.string().email(t("email Invalid")),
    phone: z.string().min(10, t("phone Number Invalid")),
    gender: z.string().min(1, t("gender Required")),
  });

  type profileInput = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<profileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      gender: data?.gender || "",
    },
  });

  // لما المستخدم يضغط باك (إلغاء)
  const handleBack = () => {
    setIsEdit(false);
  };

  // لما المستخدم يحفظ البيانات
  const handleSave = async (formData: profileInput) => {
    console.log("profileInput", formData);

    try {
      await axiosInstance.post("/auth/profile", formData);
      await dispatch(showProfileUser());

      setIsEdit(false);
    } catch (error) {
      console.error("Failed to save profile", error);
    }
  };
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  return (
    <div>
      <div className="p-6">
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="flex flex-col md:flex-row items-start justify-between gap-6  h-full  rounded-xl p-6 ">
            <div className="flex-shrink-0 relative w-32 h-32">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="Profile"
                  width={181}
                  height={181}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <Image
                  src={data?.avatar || "/default-avatar.png"} // رابط صورة افتراضية لو مفيش
                  alt="Profile"
                  width={181}
                  height={181}
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}

              <div className="absolute right-0 bottom-0 cursor-pointer">
                <label htmlFor="avatarUpload">
                  <Image
                    src={`/icons/flowbite_edit-outline.svg`}
                    alt="Edit Profile"
                    width={30}
                    height={30}
                    className="rounded-full object-cover cursor-pointer"
                  />
                </label>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setProfileImageUrl(url);
                    }
                  }}
                />
              </div>
            </div>
            {/* بيانات البروفايل */}
            <div className="flex-1 w-full">
              <div className="space-y-4">
                <InputWithIcon
                  label={t("Full Name")}
                  isRequired
                  placeholder={t("Enter Your Full Name")}
                  icon={<CiUser className="text-white text-[30px]" />}
                  {...register("name")}
                  error={errors.name?.message}
                />

                <InputWithIcon
                  label={t("Email")}
                  isRequired
                  placeholder={t("Enter your email")}
                  icon={<MdEmail className="text-white text-[30px]" />}
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
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: t("required") }}
                  render={({ field }) => (
                    <InputWithIcon
                      label={t("gender")}
                      isRequired
                      option={[
                        { id: 0, name: t("male") },
                        { id: 1, name: t("female") },
                      ]}
                      type="gender"
                      placeholder={t("Enter Your Gender")}
                      icon={<CiPhone className="text-white text-[30px]" />}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.gender?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <SavButton_Back
            handleBack={handleBack}
            hadnleSave={handleSubmit(handleSave)}
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
