import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "calibra8-api.doctor-code.net",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "calibra8-api.doctor-code.net",
        pathname: "/images/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
