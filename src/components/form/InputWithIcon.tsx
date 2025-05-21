"use client";
import { forwardRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputWithIcon = forwardRef<HTMLInputElement, any>(
  (
    {
      label,
      isRequired = false,
      icon,
      placeholder,
      className,
      error,
      type = "text",
      ...rest
    },
    ref
  ) => {
    const t = useTranslations();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full h-full">
        <label className="text-[14px] ms-1 font-[600] ">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-center w-full my-2">
          {icon && (
            <div
              className={`w-[64px] h-[56px] bg-[var(--main)] rounded-s-lg flex items-center justify-center ${
                error ? "border-2 border-red-500 border-e-0" : ""
              }`}
            >
              {icon}
            </div>
          )}
          <div className="flex-grow relative">
            <input
              {...rest}
              ref={ref}
              type={type === "password" && !showPassword ? "password" : "text"}
              className={`${className} border-2 w-full bg-[var(--main-green)] border-[#757575] border-s-0 rounded-lg rounded-s-none p-2 h-[56px] outline-none ${
                error ? "border-red-500" : ""
              }`}
              placeholder={placeholder || t("writeHere")}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            )}
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1 font-bold ms-4">{error}</p>
        )}
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
