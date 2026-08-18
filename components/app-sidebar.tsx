"use client"

import {
  BarChart3,
  Calendar,
  CircleHelp,
  HeartPulse,
  LayoutDashboard,
  MessageSquare,
  Moon,
  NotebookPen,
  Settings,
  Activity,
} from "lucide-react"
import * as React from "react"

import { NavMain, type NavItem } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
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

const navSecondary = [
  {
    title: "帮助中心",
    url: "#",
    icon: CircleHelp,
  },
  {
    title: "意见反馈",
    url: "#",
    icon: MessageSquare,
  },
]

const user = {
  name: "inrenping",
  email: "inrenping@gmail.com",
  avatar: "",
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Incremental</span>
            <span className="truncate text-xs text-muted-foreground">
              运动数据管理
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <SidebarSeparator className="mt-auto" />
        <NavSecondary items={navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
