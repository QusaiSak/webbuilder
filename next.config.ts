import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com', 'juwpvupkxcbnjilqtzpx.supabase.co']
  }
};

export default nextConfig;
