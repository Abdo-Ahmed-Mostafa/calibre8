import EmptyPage from "@/components/EmptyPage";
import { useTranslations } from "next-intl";
import React from "react";
import useAddress from "./useAddress";
import ViewCardAddress from "./viewCardAddress";
import LoadingPage from "@/components/loading/Loading";
const ViewAdress = () => {
  const t = useTranslations();
  const { allAddress, loading } = useAddress();

  if (loading) return <LoadingPage />;

  return (
    <div className="bg-white h-full">
      {allAddress.length == 0 ? (
        <EmptyPage text={t("No address")} handleAdd={() => console.log()} />
      ) : (
        <div className="">
          <div className="overflow-auto max-h-svh  ">
            {allAddress?.map((data: any, index: number) => {
              return (
                <div key={index}>
                  <div className="flex justify-end pt-7 pb-3 gap-3">
                    {" "}
                    <h2 className="text-[#FF004F] text-[16px] font-bold ">
                      Delete address
                    </h2>
                    <h2 className="text-[16px] font-bold text-[var(--main)] ">
                      Edit address
                    </h2>
                  </div>
                  <ViewCardAddress allAddress={data} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAdress;
