"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

type ResponsiveSetting = {
  breakpoint: number;
  settings: {
    slidesToShow?: number;
    slidesToScroll?: number;
    arrows?: boolean;
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
  };
};

type CarouselProps = {
  children: React.ReactNode;
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
  responsive?: ResponsiveSetting[];
  centerMode?: any;
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent", // خلي الخلفية شفافة لو حبيت
        borderRadius: "50%",
        right: "-25px",
        zIndex: 10,
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Image
        src={`/chevron-right.svg`}
        width={30}
        height={30}
        alt="next arrow"
      />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent",
        borderRadius: "50%",
        left: "-25px",
        zIndex: 10,
        width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Image
        src={`/chevron-right2.svg`}
        width={30}
        height={30}
        alt="prev arrow"
      />
    </div>
  );
};

export default function ReusableCarousel({
  children,
  dots = true,
  infinite = true,
  speed = 500,
  slidesToShow = 3,
  slidesToScroll = 1,
  centerMode = false,
  arrows = true,
  responsive = [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: Math.min(slidesToShow, 4),
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(slidesToShow, 2),
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}: CarouselProps) {
  const settings = {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    arrows,
    responsive,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode,
  };

  return (
    <div className="mx-auto px-4 relative">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
