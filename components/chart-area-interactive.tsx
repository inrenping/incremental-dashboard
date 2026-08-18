"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { monthlyTrend } from "@/lib/data"

const chartConfig = {
  duration: {
    label: "训练时长",
    color: "var(--chart-1)",
  },
  distance: {
    label: "距离",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const ranges = [
  { value: "3m", label: "近 3 月", months: 3 },
  { value: "6m", label: "近 6 月", months: 6 },
  { value: "all", label: "全年", months: monthlyTrend.length },
]

export function ChartAreaInteractive() {
  const [range, setRange] = React.useState("6m")
  const months = ranges.find((r) => r.value === range)?.months ?? 6
  const data = monthlyTrend.slice(-months)

  const totalDuration = data.reduce((sum, d) => sum + d.duration, 0)
  const totalDistance = data.reduce((sum, d) => sum + d.distance, 0)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>训练趋势</CardTitle>
        <CardDescription>训练时长与里程的月度变化</CardDescription>
        <CardAction>
          <Tabs value={range} onValueChange={setRange}>
            <TabsList>
              {ranges.map((r) => (
                <TabsTrigger key={r.value} value={r.value}>
                  {r.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="duration"
              type="natural"
              fill="var(--color-duration)"
              stroke="var(--color-duration)"
              stackId="a"
            />
            <Area
              dataKey="distance"
              type="natural"
              fill="var(--color-distance)"
              stroke="var(--color-distance)"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <div className="mt-4 grid grid-cols-2 gap-4 border-t p-4 text-center sm:text-left lg:px-6 lg:py-5">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="size-2.5 rounded-full bg-[var(--color-duration)]" />
          <span className="text-sm text-muted-foreground">训练时长</span>
          <span className="ml-auto font-semibold tabular-nums sm:ml-1">
            {totalDuration} 小时
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="size-2.5 rounded-full bg-[var(--color-distance)]" />
          <span className="text-sm text-muted-foreground">总距离</span>
          <span className="ml-auto font-semibold tabular-nums sm:ml-1">
            {totalDistance} km
          </span>
        </div>
      </div>
    </Card>
  )
}
