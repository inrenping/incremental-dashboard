"use client"

import {
  BarChart3,
  Calendar,
  HeartPulse,
  LayoutDashboard,
  Moon,
  NotebookPen,
  Settings,
} from "lucide-react"
import * as React from "react"

import { NavMain, type NavItem } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const navMain: NavItem[] = [
  {
    title: "仪表盘",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "训练计划",
    url: "#",
    icon: Calendar,
  },
  {
    title: "运动日志",
    url: "#",
    icon: NotebookPen,
  },
  {
    title: "身体指标",
    url: "#",
    icon: HeartPulse,
  },
  {
    title: "数据分析",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "睡眠记录",
    url: "#",
    icon: Moon,
  },
  {
    title: "设置",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <img src="/favicon.svg" alt="incremental.icu" className="size-5" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">incremental.icu</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
