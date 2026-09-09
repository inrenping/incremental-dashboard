"use client"

import {
  IconLayoutDashboard,
  IconUser,
  IconApps,
  IconKey,
  IconClock,
  IconBook,
  IconActivity,
  IconCalendar,
} from "@tabler/icons-react"
import * as React from "react"

import Image from "next/image"
import Link from "next/link"

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
    url: "/home",
    icon: IconLayoutDashboard,
    isActive: true,
  },
  {
    title: "活动记录",
    url: "/activities",
    icon: IconActivity,
  },
  {
    title: "活动日历",
    url: "/calendar",
    icon: IconCalendar,
  },
  {
    title: "个人资料",
    url: "/settings/profile",
    icon: IconUser,
  },
  {
    title: "账号管理",
    url: "/settings/accounts",
    icon: IconApps,
  },
  {
    title: "GPT 授权码",
    url: "/settings/gpt",
    icon: IconKey,
  },
  {
    title: "定时任务",
    url: "/settings/task",
    icon: IconClock,
  },
  {
    title: "文档",
    url: "/doc/intro",
    icon: IconBook,
    items: [
      { title: "项目介绍", url: "/doc/intro" },
      { title: "联系作者", url: "/doc/community" },
      { title: "快速开始", url: "/doc/guide" },
      { title: "常见问题", url: "/doc/faq" },
      { title: "推荐", url: "/doc/recommended" },
      { title: "开发指南", url: "/doc/development" },
      { title: "使用条款", url: "/doc/tos" },
      { title: "隐私政策", url: "/doc/privacy" },
    ],
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/home" className="flex items-center gap-2 px-2 py-1">
          <Image
            src="/favicon.svg"
            alt="incremental.icu"
            width={20}
            height={20}
            className="size-5"
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">incremental.icu</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
