"use client"

import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { clerkFetch } from "@/lib/api"
import { IconRefresh, IconCopy, IconCheck } from "@tabler/icons-react"

interface OauthCodeResponse {
  code: string
  expires_at: string
  expires_in: number
}

export default function GptCodePage() {
  const [code, setCode] = useState<string>("")
  const [expiresAt, setExpiresAt] = useState<number>(0)
  const [remaining, setRemaining] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)

  const loadCode = useCallback(async (force: boolean) => {
    try {
      const res = await clerkFetch("/api/v1/user/oauth-code", {
        method: force ? "POST" : "GET",
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.detail || "加载授权码失败")
        return
      }
      const data: OauthCodeResponse = await res.json()
      setCode(data.code)
      setExpiresAt(new Date(data.expires_at).getTime())
      setRemaining(Math.max(0, data.expires_in))
    } catch {
      toast.error("加载授权码失败")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    clerkFetch("/api/v1/user/oauth-code", { method: "GET" })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          if (!cancelled) toast.error(data.detail || "加载授权码失败")
          return
        }
        const data: OauthCodeResponse = await res.json()
        if (cancelled) return
        setCode(data.code)
        setExpiresAt(new Date(data.expires_at).getTime())
        setRemaining(Math.max(0, data.expires_in))
      })
      .catch(() => {
        if (!cancelled) toast.error("加载授权码失败")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!expiresAt) return
    const timer = setInterval(() => {
      const secs = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
      setRemaining(secs)
      if (secs <= 0) {
        setCode("")
        loadCode(false)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [expiresAt, loadCode])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await loadCode(true)
      toast.success("授权码已刷新")
    } finally {
      setRefreshing(false)
    }
  }

  const handleCopy = async () => {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("已复制到剪贴板")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("复制失败")
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">GPT 授权码</h1>
        <p className="text-sm text-muted-foreground">
          用于 OpenAI / ChatGPT 连接 incremental.icu 时的登录授权。
        </p>
      </div>

      {/* 授权码展示卡片 */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">当前授权码</span>
          {code && (
            <span className="text-xs text-muted-foreground">
              {remaining > 0
                ? `剩余 ${remaining} 秒后过期`
                : "已过期"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="h-16 flex items-center justify-center text-sm text-muted-foreground">
            加载中...
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-lg bg-muted px-4 py-4 text-center font-mono text-3xl font-semibold tracking-[0.4em]">
              {code || "······"}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0"
              onClick={handleCopy}
              disabled={!code}
            >
              {copied ? (
                <IconCheck className="h-5 w-5 text-green-500" />
              ) : (
                <IconCopy className="h-5 w-5" />
              )}
            </Button>
          </div>
        )}

        {/* 过期进度条 */}
        {code && (
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000"
              style={{ width: `${(remaining / 300) * 100}%` }}
            />
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            验证码 5 分钟内有效且只能使用一次，请勿泄露给他人。
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            <IconRefresh
              className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            生成新验证码
          </Button>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 text-sm font-semibold">如何使用</h2>
        <ol className="space-y-3 text-sm text-foreground">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              1
            </span>
            <span>
              在 ChatGPT 中连接 incremental.icu 插件
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              2
            </span>
            <span>复制上方授权码</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              3
            </span>
            <span>在 ChatGPT 中输入授权码完成登录</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
