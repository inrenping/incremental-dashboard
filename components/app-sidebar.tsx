"use client"

import {
  IconLayoutDashboard,
  IconNotebook,
  IconSettings,
} from "@tabler/icons-react"
import * as React from "react"

import Image from "next/image"

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
    icon: IconLayoutDashboard,
    isActive: true,
  },
  {
    title: "运动日志",
    url: "#",
    icon: IconNotebook,
  },
  {
    title: "设置",
    url: "#",
    icon: IconSettings,
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <Image
            src="/dashboard/favicon.svg"
            alt="incremental.icu"
            width={20}
            height={20}
            className="size-5"
          />
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
