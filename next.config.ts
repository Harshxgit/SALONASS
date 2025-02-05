import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
  reactStrictMode: true,
  experimental: {
  },
};

export default nextConfig;
