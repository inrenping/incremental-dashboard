# Incremental Dashboard

运动数据管理仪表盘，作为 [incremental.icu](https://github.com/inrenping/incremental.icu) 的独立前端子应用，部署在 `https://i.incremental.icu/dashboard` 路径下。

## 技术栈

- **Next.js 16**（App Router）+ React 19 + TypeScript
- **Clerk**（与主站共用同一 Clerk 应用，共享用户 session）
- **Tailwind CSS v4** + shadcn/ui（Base UI）
- **Recharts**（图表）

## 架构

```
浏览器 ──HTTPS──> Cloudflare (i.incremental.icu)
                    └── Worker 路径分流
                         ├── /          → incremental 主站（Vercel）
                         └── /dashboard → 本应用（Vercel, basePath=/dashboard）
```

- 主站与本应用**同源**（`i.incremental.icu/dashboard` 与 `i.incremental.icu` 同源），无跨域问题。
- Clerk 的 `__session` cookie 按域名共享：在主站 `/` 登录后，访问 `/dashboard` 自动已登录，无需重复登录。
- 后端 API 走同源路径 `/api/v1`（生产由主站 Vercel `vercel.json` 代理到后端 `incremental.icu/api`），请求头带 Clerk JWT。

## 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:3000/dashboard`（受 `next.config.ts` 中 `basePath: "/dashboard"` 影响）。

本地 `.env.development` 中：

- 登录页指向本应用自身：`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/dashboard/sign-in`
- 开发 API 由 `next.config.ts` 的 rewrites 代理到 `NEXT_PUBLIC_BACKEND_URL`（默认 `127.0.0.1:8000`）

## 环境变量

| 变量 | 说明 | 生产值 |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk 公钥 | 与主站同一套（`pk_live_...`） |
| `CLERK_SECRET_KEY` | Clerk 密钥 | 与主站同一套（`sk_live_...`） |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | 登录页地址 | `/sign-in`（同源指向主站登录页） |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | 注册页地址 | `/sign-up` |
| `NEXT_PUBLIC_BACKEND_URL` | 本地后端地址（仅开发） | `http://127.0.0.1:8000` |

> **重要**：`NEXT_PUBLIC_CLERK_*` 必须与主站使用**同一 Clerk 应用**的 key，才能共享用户 session。

## 部署

### 1. 部署到 Vercel

在 Vercel 导入本仓库，创建独立项目（`incremental-dashboard`）。在项目的 **Settings → Environment Variables** 中配置：

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx   # 与主站相同
CLERK_SECRET_KEY=sk_live_xxxxx                    # 与主站相同
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in            # 生产指向主站登录页
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

部署完成后，记录 Vercel 分配的域名（如 `incremental-dashboard-xxx.vercel.app`），用于下一步。

### 2. 配置 Cloudflare Worker 分流

编辑 `cloudflare-worker.js`，把 `DASHBOARD_ORIGIN` 替换为 dashboard 项目的实际 Vercel 域名：

```js
const DASHBOARD_ORIGIN = "https://incremental-dashboard-xxx.vercel.app"; // TODO: 替换
```

在 Cloudflare 控制台：

1. **Workers & Pages** → 创建 Worker，粘贴 `cloudflare-worker.js` 内容，命名为 `i-incremental-icu-proxy`。
2. Worker 详情 → **Settings → Domains & Routes → Add route**：
   - Route：`i.incremental.icu/*`
   - Worker：`i-incremental-icu-proxy`
3. 现有 DNS 无需改动（`i.incremental.icu` 继续走 Cloudflare 代理到主站 Vercel 项目）。

> `DASHBOARD_ORIGIN` 不能填 `i.incremental.icu` 自身（会造成 Worker 请求死循环），必须是 Vercel 项目的原始域名。

### 3. 验证

- 主站：`https://i.incremental.icu/` 正常访问。
- Dashboard：`https://i.incremental.icu/dashboard` 打开。
- 登录共享：在主站 `/` 登录后访问 `/dashboard`，无需再次登录。
- 未登录访问 `/dashboard` 时，会被重定向到主站 `/sign-in`，登录成功后自动回跳 `/dashboard`。

## 目录结构

```
app/                     # App Router 页面（sign-in/sign-up/layout/page）
components/              # 组件（含 token-provider、ui/）
lib/                     # 工具（api.ts、token-manager.ts、utils.ts）
cloudflare-worker.js     # Cloudflare Worker 路径分流脚本
next.config.ts           # basePath=/dashboard + 开发环境 API 代理
```
