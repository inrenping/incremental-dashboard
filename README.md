# Incremental Dashboard

运动数据管理仪表盘（独立前端应用），逐步取代旧 [incremental.icu](https://github.com/inrenping/incremental.icu) 主站，自带 Clerk 登录页，部署在自有域名根路径。

## 技术栈

- **Next.js 16**（App Router）+ React 19 + TypeScript
- **Clerk**（沿用现有 Clerk 应用实例，登录/注册页由本应用自身提供）
- **Tailwind CSS v4** + shadcn/ui（Base UI）
- **Recharts**（图表）

## 架构

```
浏览器 ──HTTPS──> 本应用（Vercel，域名根路径）
                    ├── /sign-in   → Clerk 登录页（本应用）
                    ├── /sign-up   → Clerk 注册页（本应用）
                    ├── /home      → 仪表盘（受保护，登录后访问）
                    └── /api/v1    → Vercel rewrite 代理到后端
```

- 应用独立部署，无 basePath、无路径分流。
- 登录态由 Clerk 管理：未登录访问受保护页面（含 `/home`）会被重定向到 `/sign-in`，登录成功后自动回跳原页面。
- 后端 API 走同源路径 `/api/v1`，由 `next.config.ts` 的 rewrites 代理到后端服务（开发指向本机，生产指向后端域名），请求头带 Clerk JWT。

## 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`。开发 API 由 `next.config.ts` 的 rewrites 代理到 `NEXT_PUBLIC_BACKEND_URL`（默认 `127.0.0.1:8000`）。

## 环境变量

| 变量 | 说明 | 生产值 |
| --- | --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk 公钥 | 现有 Clerk 应用的 `pk_live_...` |
| `CLERK_SECRET_KEY` | Clerk 密钥 | 现有 Clerk 应用的 `sk_live_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | 登录页地址（本应用自身） | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | 注册页地址（本应用自身） | `/sign-up` |
| `NEXT_PUBLIC_BACKEND_URL` | 后端 API 地址（用于同源 `/api/v1` rewrite） | 后端域名，如 `https://incremental.icu` |

> **重要**：`NEXT_PUBLIC_CLERK_*` 沿用旧主站使用的同一 Clerk 应用 key，用户数据无需迁移。若应用部署域名发生变化，需在 Clerk Dashboard 的 Allowed origins / Redirect URLs 中补充新域名。

## 部署

### 1. 部署到 Vercel

在 Vercel 导入本仓库，创建独立项目。在项目的 **Settings → Environment Variables** 中配置：

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_BACKEND_URL=https://<backend-domain>
```

### 2. 配置域名与 Clerk

1. 在 Vercel 项目里绑定自有域名（根路径，无子路径）。
2. 在 [Clerk Dashboard](https://dashboard.clerk.com) 的应用设置中，把该域名加入 **Allowed origins**，并配置 **Redirect URLs**（sign-in / sign-up 回调）。
3. 本应用不需要 `cloudflare-worker.js`（该文件是旧主站 `/dashboard` 路径分流的遗留，已弃用）。

### 3. 验证

- `https://<your-domain>/home` 打开仪表盘；未登录时自动跳转 `/sign-in`。
- 在 `/sign-in` 登录成功后自动回跳 `/home`。
- `/sign-up` 可正常注册新账号。

## 目录结构

```
app/                     # App Router 页面（sign-in/sign-up/layout/page）
components/              # 组件（含 token-provider、ui/）
lib/                     # 工具（api.ts、token-manager.ts、utils.ts）
next.config.ts           # /api/v1 rewrite 代理
```
