import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 px-4 md:px-20">
      <div className="flex flex-col md:flex-row gap-8 pb-10 border-b border-gray-300">
        {/* Logo & Address */}
        <div className="space-y-4 max-w-[373px]">
          <div className="flex items-center gap-2">
            <Image src="/logo2.svg" alt="Logo" width={140} height={70} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Image
              src={`/icons/location.svg`}
              alt="location"
              width={23}
              height={23}
            />
            <p>Rue Louis Lumiere, 30 B.P 836</p>
          </div>
          <p className="text-sm text-gray-500">
            We provide high-quality tools and equipment for all your appliance
            repair needs—reliable, durable, and built to get the job done right.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm flex-1">
          <div>
            <h4 className="font-bold mb-2">Links</h4>
            <ul className="space-y-1">
              <li className="text-green-500">Home</li>
              <li>Categories</li>
              <li>Brands</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">More</h4>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Terms & Conditions</li>
              <li>Price Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <ul className="space-y-1">
              <li>Product return policy</li>
              <li>FQS</li>
              <li>Terms & Purchase</li>
              <li>Testimonials</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Download Links & Social Media */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4 text-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
          <Link
            href="#"
            className="bg-[#787878] text-white w-[230px] justify-center py-3 rounded-lg flex items-center gap-4 shadow-md hover:bg-[#6a6a6a]"
          >
            <FaGooglePlay className="text-2xl" />
            <div className="flex flex-col">
              <h2 className="text-[12px]">Download on the</h2>
              <h2 className="text-[18px] font-semibold">Google Play</h2>
            </div>
          </Link>
          <Link
            href="#"
            className="bg-[#787878] text-white w-[230px] justify-center py-3 rounded-lg flex items-center gap-4 shadow-md hover:bg-[#6a6a6a]"
          >
            <FaApple className="text-2xl" />
            <div className="flex flex-col">
              <h2 className="text-[12px]">Download on the</h2>
              <h2 className="text-[18px] font-semibold">App Store</h2>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {[
            "linkedin",
            "instagram",
            "youtube",
            "tiktok",
            "facebook",
            "x",
            "whatsapp",
          ].map((icon) => (
            <Image
              key={icon}
              src={`/icons/${icon}.svg`}
              alt={icon}
              width={29}
              height={29}
              className="hover:opacity-80 cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-center items-center py-4 text-sm">
        <p className="text-center">
          Copy Rights Designed By{" "}
          <span className="text-green-500">Dr.Code</span> @2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
