/* eslint-disable import/no-anonymous-default-export */
/**
 * Cloudflare Worker —— i.incremental.icu 路径分流
 *
 * 把请求按路径分发到两个独立的 Vercel 前端项目：
 *   /dashboard*  -> incremental-dashboard（next.config basePath = /dashboard）
 *   其他         -> incremental 主站
 *
 * 部署方式（Cloudflare Dashboard）：
 *   1. Workers & Pages -> 创建 Worker，粘贴本文件，名为 i-incremental-icu-proxy
 *   2. Workers 详情 -> Settings -> Domains & Routes -> Add route
 *       Route: i.incremental.icu/*
 *       Worker: i-incremental-icu-proxy
 *   3. 无需改动现有 DNS（继续走 Cloudflare 代理到 Vercel）
 *
 * 注意：
 *   - DASHBOARD_ORIGIN 必须是 Vercel 项目的原始域名（xxx.vercel.app），
 *     不能填 i.incremental.icu（会造成 Worker 死循环）。
 *   - 主站用 return fetch(request) 透传到 Cloudflare 配置的源站（即主站 Vercel 项目），
 *     无需额外配置，请求仍保持 Host: i.incremental.icu。
 */

const PUBLIC_HOST = "i.incremental.icu";

// TODO: 替换为 incremental-dashboard 项目在 Vercel 上的部署域名
const DASHBOARD_ORIGIN = "https://incremental-dashboard.vercel.app";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ---- /dashboard 开头的请求 -> dashboard 前端 ----
    if (path === "/dashboard" || path.startsWith("/dashboard/")) {
      const target = new URL(path + url.search, DASHBOARD_ORIGIN);
      const headers = new Headers(request.headers);
      // 让 Vercel 按 Host 识别到 dashboard 项目；原始 Host 放入 X-Forwarded-Host
      headers.set("Host", new URL(DASHBOARD_ORIGIN).host);
      headers.set("X-Forwarded-Host", PUBLIC_HOST);
      headers.set("X-Forwarded-Proto", "https");

      const res = await fetch(target, {
        method: request.method,
        headers,
        body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
        // 手动处理重定向，把 Location 里的内部域名改回公共域名
        redirect: "manual",
      });

      // 重写 3xx 的 Location，避免浏览器跳到 raw vercel.app 域名
      const location = res.headers.get("Location");
      if (location) {
        const locationUrl = new URL(location, DASHBOARD_ORIGIN);
        if (locationUrl.host === new URL(DASHBOARD_ORIGIN).host) {
          locationUrl.protocol = "https:";
          locationUrl.host = PUBLIC_HOST;
          res.headers.set("Location", locationUrl.toString());
        }
      }

      return res;
    }

    // ---- 其余请求 -> 主站（透传到源站） ----
    return fetch(request);
  },
};
