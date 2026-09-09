"use client"

import { IconBell } from "@tabler/icons-react"
import * as React from "react"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import docMenu from "@/lib/doc-menu.json"

const pageTitles: Record<string, string> = {
  "/home": "仪表盘",
  "/activities": "活动记录",
  "/calendar": "活动日历",
  "/settings/profile": "个人资料",
  "/settings/accounts": "账号管理",
  "/settings/gpt": "GPT 授权码",
  "/settings/task": "定时任务",
}

const docTitleMap: Record<string, string> = Object.fromEntries(
  (docMenu as { items: { text: string; href: string }[] }[]).flatMap(
    (section) => section.items.map((item) => [item.href, item.text])
  )
)

function isDocPage(pathname: string): boolean {
  return pathname.startsWith("/doc/")
}

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname]
  if (docTitleMap[pathname]) return docTitleMap[pathname]
  return "仪表盘"
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {isDocPage(pathname) ? (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/doc/intro">文档</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon-sm">
            <IconBell />
            <span className="sr-only">消息通知</span>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
