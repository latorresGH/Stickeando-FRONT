import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "3001",
    //   },
    // ],
    domains: [
      "stickeando.onrender.com",  
      "stickeando.vercel.app",
      "res.cloudinary.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
