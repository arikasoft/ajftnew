
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],

  experimental: {
    cpus: 2,
    workerThreads: false,
  },

  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '<https://ajftrust.org/llms.txt>; rel="alternate"; type="text/plain"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
