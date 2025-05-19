import Image from "next/image";
import React from "react";
import Stars from "../Stars/Stars";
import { userType } from "@/lib/enum/UserType";

const TestomenolCard = ({ data }: any) => {
  return (
    <div className="flex w-[500px] bg-white rounded-md shadow-md overflow-hidden min-h-[200px] max-h-[200px]">
      <div className="relative w-[150px] h-[200px]">
        <Image
          src={"/fixed-height.png"}
          alt="img"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className="p-5 w-full flex flex-col justify-between">
        <div>
          <Stars rating={data?.rate} />
          <h5 className="text-[14px] mt-4">{data?.content}</h5>
        </div>
        <div className="mt-2">
          <h2 className="text-[17px] font-bold">{data?.user?.name}</h2>
          <h2 className="text-[14px] text-green-600">
            {userType[data?.user?.type]}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TestomenolCard;
