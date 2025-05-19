"use client";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ReusableSwiperProps {
  children: React.ReactNode;
  slidesPerView?: number;
  loop?: boolean;
  autoplayDelay?: number;
  autoplayDisableOnInteraction?: boolean;
  height?: string;
  spaceBetween?: number;
  pagination?: boolean;
  navigation?: boolean;
  breakpoints?: any;
  className?: string;
}

export default function ReusableSwiper({
  children,
  slidesPerView = 1,
  loop = true,
  autoplayDelay = 2500,
  autoplayDisableOnInteraction = false,
  height = "100vh",
  spaceBetween = 10,
  pagination = true,
  breakpoints,
  className = "",
}: ReusableSwiperProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop={loop}
      navigation={true}
      centeredSlides={true}
      pagination={pagination ? { clickable: true } : false}
      autoplay={{
        delay: autoplayDelay,
        disableOnInteraction: autoplayDisableOnInteraction,
      }}
      breakpoints={breakpoints}
      className={"overflow-hidden"}
      style={{ width: "100%", height }}
    >
      {children}
    </Swiper>
  );
}
