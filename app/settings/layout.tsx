"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  IconUser,
  IconApps,
  IconKey,
  IconClock,
} from "@tabler/icons-react"

const settingsNavItems = [
  { title: "个人资料", href: "/settings/profile", icon: IconUser },
  { title: "账号管理", href: "/settings/accounts", icon: IconApps },
  { title: "GPT 授权码", href: "/settings/gpt", icon: IconKey },
  { title: "定时任务", href: "/settings/task", icon: IconClock },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <DashboardLayout>
      <div className="flex flex-1">
        {/* 左侧设置导航 */}
        <aside className="hidden lg:block w-48 shrink-0 border-r">
          <nav className="flex flex-col gap-1 p-4">
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* 移动端顶部导航 */}
        <div className="flex flex-1 flex-col">
          <nav className="flex lg:hidden gap-1 overflow-x-auto border-b p-2 px-4">
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </DashboardLayout>
  )
}
