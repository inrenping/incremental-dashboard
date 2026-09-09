"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
