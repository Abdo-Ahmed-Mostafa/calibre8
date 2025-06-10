import { useMainHook } from "@/lib/Hook/useMainHook";
import React, { useState } from "react";
import { EmojiCategory } from "@/components/Emojies/emojies";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useSelector } from "react-redux";
import CreateMesure from "./CreateMesure";
import RealatedProducts from "./RealatedProducts";

const Measurement = ({ productDetails }: { productDetails: any }) => {
  const { t } = useMainHook();
  const { profile } = useSelector((state: any) => state.profileReducer);
  const [measurement, setMeasurement] = useState("");
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const addEmojiToContent = (emoji: string) => {
    setMeasurement((prev) => prev + emoji);
  };
  const [selectedCategory, setSelectedCategory] =
    useState<EmojiCategory>("All");
  const handleSubmit = () => {
    setLoading(true);
    axiosInstance.post(``).then(() => {});
  };
  return (
    <>
      <CreateMesure
        addEmojiToContent={addEmojiToContent}
        handleSubmit={handleSubmit}
        loading={loading}
        measurement={measurement}
        openMenu={openMenu}
        profile={profile}
        selectedCategory={selectedCategory}
        setMeasurement={setMeasurement}
        setOpenMenu={setOpenMenu}
        setSelectedCategory={setSelectedCategory}
        t={t}
      />
      <RealatedProducts productDetails={productDetails} />
    </>
  );
};

export default Measurement;
