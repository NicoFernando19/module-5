import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 
      'picsum.photos', 
      'placeimg.com', 
      'www.sephora.com', 
      'example.com', 
      'encrypted-tbn0.gstatic.com',
      'pravatar.cc',
      'i5.walmartimages.com',
      'via.placeholder.com',
      'amgiann.com',
      'mfakk.com',
      'dknkbnak.com',
      'dhffff.com'
    ]
  }
};

export default nextConfig;
