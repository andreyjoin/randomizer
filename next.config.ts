import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/random",
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
