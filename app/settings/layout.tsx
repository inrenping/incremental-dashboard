"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout><div className="flex-1 p-6">{children}</div></DashboardLayout>
}
