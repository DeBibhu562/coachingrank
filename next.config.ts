import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/:slug(best-.+)',
        destination: '/rankings/:slug',
      },
      {
        source: '/:slug(top-.+)',
        destination: '/rankings/:slug',
      },
    ];
  },
};

export default nextConfig;

