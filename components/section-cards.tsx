import { Clock, Dumbbell, HeartPulse, TrendingDown, TrendingUp, Route, type LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Stat = {
  title: string
  value: string
  delta: string
  trend: "up" | "down"
  icon: LucideIcon
}

const stats: Stat[] = [
  {
    title: "本周训练次数",
    value: "12 次",
    delta: "+2 次",
    trend: "up",
    icon: Dumbbell,
  },
  {
    title: "本周训练时长",
    value: "6.5 小时",
    delta: "+12%",
    trend: "up",
    icon: Clock,
  },
  {
    title: "本周总距离",
    value: "58.6 km",
    delta: "+8.2%",
    trend: "up",
    icon: Route,
  },
  {
    title: "平均心率",
    value: "142 bpm",
    delta: "-3.1%",
    trend: "down",
    icon: HeartPulse,
  },
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-4 lg:px-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
              <stat.icon className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-semibold tabular-nums">{stat.value}</div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="size-3.5" />
              ) : (
                <TrendingDown className="size-3.5" />
              )}
              {stat.delta}
              <span className="text-muted-foreground">较上周</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
