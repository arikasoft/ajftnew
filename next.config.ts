import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],

  experimental: {
    cpus: 2,
    workerThreads: false,
  },
};

export default nextConfig;
