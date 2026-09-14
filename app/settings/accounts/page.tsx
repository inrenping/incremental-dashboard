"use client"

import { useState, useEffect, useCallback } from "react"
import { clerkFetch } from "@/lib/api"
import { AppConnectionDialog } from "@/components/dash/connection-dialog"
import { AppCard } from "@/components/dash/app-card"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import type { AppConfig } from "@/lib/types"

export default function AccountsPage() {
  const [apps, setApps] = useState<AppConfig[]>([])
  const [open, setOpen] = useState(false)
  const [currentApp, setCurrentApp] = useState<AppConfig | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchAppsStatus = useCallback(async () => {
    setLoading(true)
    try {
      const response = await clerkFetch("/api/v1/base/getConnectConfigs")
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch status")
      }
      const data = await response.json()
      setApps(data)
    } catch (err) {
      console.error("Fetch status error:", err)
      toast.error("获取应用状态失败")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => fetchAppsStatus())
  }, [fetchAppsStatus])

  const handleRefreshAuth = async (id: number) => {
    setLoading(true)
    try {
      const response = await clerkFetch(
        `/api/v1/base/relogin?connect_id=${id}`,
        { method: "POST" }
      )
      const result = await response.json()
      if (result.status === "success") {
        toast.success("认证刷新成功")
        fetchAppsStatus()
      } else {
        toast.error(result.message || "刷新失败")
      }
    } catch (err) {
      console.error("Refresh auth error:", err)
      toast.error("刷新失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 md:gap-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold">我的应用程序</h1>
          <Button
            onClick={() => {
              setCurrentApp({
                id: 0,
                user_id: 0,
                guid: null,
                account: "",
                source_type: "garmin_cn",
                region: "cn",
                is_active: true,
                master: false,
                access_token: null,
                access_token_expires_at: null,
                refresh_token: null,
                refresh_token_expires_at: null,
                oauth_token: null,
                oauth_token_secret: null,
                secret_string: null,
                total_count: 0,
                created_at: "",
                updated_at: "",
                last_synced_at: null,
              })
              setOpen(true)
            }}
          >
            <IconPlus className="h-4 w-4 mr-2" />
            连接账户
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          你已授权本站点访问你的应用数据。
        </p>
      </div>
      <section>
        <div className="grid grid-cols-1 gap-4">
          {loading && apps.length === 0 ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : (
            apps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onConnect={(selectedApp) => {
                  setCurrentApp(selectedApp)
                  setOpen(true)
                }}
                onRefresh={(id) => handleRefreshAuth(id)}
              />
            ))
          )}
        </div>
      </section>

      <AppConnectionDialog
        key={currentApp?.id}
        open={open}
        onOpenChange={(val) => {
          setOpen(val)
          if (!val) setCurrentApp(null)
        }}
        app={currentApp}
        action={currentApp?.id ? "update" : "add"}
        onSuccess={fetchAppsStatus}
      />
    </div>
  )
}
