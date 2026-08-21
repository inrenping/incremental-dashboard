import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 独立部署在 i.incremental.icu/dashboard 子路径下
  basePath: "/dashboard",
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          // 与主站保持一致：开发环境把 /api/v1 代理到本机后端
          source: "/api/v1/:path*",
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
