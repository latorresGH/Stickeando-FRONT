import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "stickeando.onrender.com",  // Si tus imágenes están alojadas en Render
      "stickeando.vercel.app",    // Si las imágenes están alojadas en Vercel
    ],
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true, // Es una buena práctica mantener el modo estricto activado
};

export default nextConfig;
