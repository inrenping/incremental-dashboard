"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export type NavItem = {
  title: string
  url: string
  icon?: React.ComponentType
  isActive?: boolean
  items?: NavItem[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0
          const isGroupActive = hasChildren
            ? item.items!.some((sub) => pathname === sub.url)
            : pathname === item.url

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isGroupActive}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.items!.map((sub) => (
                      <SidebarMenuSubItem key={sub.url}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === sub.url}
                        >
                          <Link href={sub.url}>
                            {sub.icon && <sub.icon />}
                            <span>{sub.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </>
              ) : (
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isGroupActive}
                  asChild
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
