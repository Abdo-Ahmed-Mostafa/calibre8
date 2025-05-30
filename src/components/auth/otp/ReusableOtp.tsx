"use client";

import React from "react";
import OtpInput from "react-otp-input";

const ReusableOtp = ({ otp, setOtp }: any) => {
  return (
    <div className="flex justify-center">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<div className="w-4" />} // مسافة بين الخانات
        renderInput={(props, index) => (
          <input
            {...props}
            placeholder={`${index + 1}`} // هنا بيحط لكل خانة رقم مختلف
            className="text-center text-3xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
            style={{ width: "80px", height: "80px" }}
          />
        )}
      />
    </div>
  );
};

export default ReusableOtp;
