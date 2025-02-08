import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'picsum.photos', 'placeimg.com', 'www.sephora.com']
  }
};

export default nextConfig;
