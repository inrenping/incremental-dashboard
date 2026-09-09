import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 独立部署：应用运行在自有域名根路径，自带 /sign-in、/sign-up 登录页
  async rewrites() {
    // 配置了 NEXT_PUBLIC_BACKEND_URL 时，把同源 /api/v1 代理到后端
    // 开发环境指向本机后端；生产环境指向后端服务（如 https://incremental.icu）
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      return [
        {
          source: "/api/v1/:path*",
          destination: `${backendUrl}/api/v1/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
