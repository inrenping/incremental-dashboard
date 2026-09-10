"use client"

import * as React from "react"

import { clerkFetch } from "@/lib/api"

interface RunningTotalData {
  monthly_total?: number
  monthly_target?: number
  monthly_count?: number
  monthly_duration?: number
  yearly_total?: number
  yearly_target?: number
  yearly_count?: number
  yearly_duration?: number
}

interface RunningTotalResponse {
  status: string
  data?: RunningTotalData
}

function formatValue(value?: number, digits = 2) {
  if (value === undefined || value === null) return "—"
  return Number(value).toFixed(digits)
}

/** 年内/月内已过去时间的百分比（无 dayjs，用原生 Date 计算） */
function elapsedPercent(period: "year" | "month") {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const dayMs = 24 * 60 * 60 * 1000

  if (period === "year") {
    const dayOfYear = Math.floor((now.getTime() - new Date(year, 0, 1).getTime()) / dayMs) + 1
    const daysInYear = Math.round((new Date(year + 1, 0, 1).getTime() - new Date(year, 0, 1).getTime()) / dayMs)
    return (dayOfYear / daysInYear) * 100
  }
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return (now.getDate() / daysInMonth) * 100
}

function ProgressBar({
  value,
  indicatorClassName,
}: {
  value: number
  indicatorClassName: string
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={`h-full rounded-full transition-all ${indicatorClassName}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function RunningStatCard({
  title,
  period,
  data,
}: {
  title: string
  period: "year" | "month"
  data: RunningTotalData
}) {
  const total = period === "year" ? data.yearly_total : data.monthly_total
  const target = period === "year" ? data.yearly_target : data.monthly_target
  const count = period === "year" ? data.yearly_count : data.monthly_count
  const duration = period === "year" ? data.yearly_duration : data.monthly_duration

  const completionPercent = (target ?? 0) > 0 ? ((total ?? 0) / (target ?? 1)) * 100 : 0
  const elapsed = elapsedPercent(period)

  return (
    <div className="flex flex-col rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <span className="text-lg font-semibold">
          跑步 <span className="tabular-nums">{count ?? "—"}</span> 次
        </span>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">距离</span>
          <span className="text-lg font-semibold tabular-nums">
            <span className="text-emerald-600 dark:text-emerald-400">{formatValue(total)}</span> /{" "}
            {formatValue(target)} 公里
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">时长</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatValue(duration)} 小时
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">目标完成</span>
            <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
              {completionPercent.toFixed(2)}%
            </span>
          </div>
          <ProgressBar value={completionPercent} indicatorClassName="bg-emerald-600" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">时间已过</span>
            <span className="tabular-nums">{elapsed.toFixed(2)}%</span>
          </div>
          <ProgressBar
            value={elapsed}
            indicatorClassName="bg-black dark:bg-white"
          />
        </div>
      </div>
    </div>
  )
}

function RunningStatSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-7 w-16 animate-pulse rounded bg-muted" />
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-2 animate-pulse rounded-full bg-muted" />
        <div className="h-2 animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  )
}

export default function DashPage() {
  const [runningData, setRunningData] = React.useState<RunningTotalData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false

    async function fetchRunningData() {
      setLoading(true)
      try {
        const response = await clerkFetch("/api/v1/base/getRunningTotal")
        if (cancelled) return
        if (!response.ok) {
          setError(true)
          return
        }
        const result: RunningTotalResponse = await response.json()
        if (cancelled) return
        if (result.status === "success" && result.data) {
          setRunningData(result.data)
        } else {
          setError(true)
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchRunningData()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {loading ? (
          <>
            <RunningStatSkeleton />
            <RunningStatSkeleton />
          </>
        ) : error || !runningData ? (
          <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground shadow-sm md:col-span-2">
            统计信息加载失败，请确认后端服务已启动后刷新页面。
          </div>
        ) : (
          <>
            <RunningStatCard title="今年" period="year" data={runningData} />
            <RunningStatCard title="本月" period="month" data={runningData} />
          </>
        )}
      </div>
    </div>
  )
}
