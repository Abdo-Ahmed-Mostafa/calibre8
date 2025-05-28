"use client";
import { forwardRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
      value,
      onChange,
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
          {isRequired && <span className=""> : </span>}
          {isRequired && <span className="text-red-500 text-md">*</span>}
        </label>
        <div className="flex items-center w-full my-2">
          {icon && (
            <div
              className={`w-[74px] h-[66px] bg-[var(--main)] rounded-s-lg flex items-center justify-center ${
                error ? "border-2 border-red-500 border-e-0" : ""
              }`}
            >
              {icon}
            </div>
          )}
          <div className="flex-grow relative">
            {type == "phone" ? (
              <PhoneInput
                country={"eg"}
                value={value}
                onChange={onChange}
                inputStyle={{
                  width: "100%",
                  height: "66px",
                  paddingLeft: "48px",
                  backgroundColor: "var(--main-green)",
                  borderColor: error ? "red" : "#757575",
                }}
                buttonStyle={{
                  width: "0px",
                }}
                containerStyle={{ width: "100%" }}
                inputProps={{
                  name: rest.name, // مهم علشان يتحفظ الاسم في form
                }}
              />
            ) : (
              <input
                {...rest}
                ref={ref}
                type={
                  type === "password" && !showPassword ? "password" : "text"
                }
                className={`${className} placeholder:ps-6 border-[1px] w-full placeholder:text-[15px] placeholder:font-normal placeholder:text-[var(--gray-footer)] bg-[var(--main-green)] border-[#757575] border-s-0 rounded-lg rounded-s-none p-2 h-[66px] outline-none ${
                  error ? "border-red-500" : ""
                }`}
                placeholder={placeholder || t("writeHere")}
              />
            )}

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
