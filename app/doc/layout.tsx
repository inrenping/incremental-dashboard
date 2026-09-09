import type { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard-layout"

export const metadata: Metadata = {
  title: "文档 - incremental.icu",
  description: "incremental.icu 使用文档",
}

export default function DocLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
