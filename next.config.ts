import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Vercel deployment
  reactStrictMode: true,
  
  // Allow serving static image frames from /public/images/
  // No external image domains needed since frames are local
  images: {
    unoptimized: false, // Use Next.js Image Optimization
  },
};

export default nextConfig;
