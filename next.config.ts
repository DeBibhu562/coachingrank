import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/:slug(best-.+)",
        destination: "/rankings/:slug",
      },
      {
        source: "/:slug(top-.+)",
        destination: "/rankings/:slug",
      },
      {
        source: "/:slug(\\d+-.+)",
        destination: "/rankings/:slug",
      },
      {
        source: "/blog/:slug",
        destination: "/rankings/:slug",
      },
    ];
  },
};

export default nextConfig;
