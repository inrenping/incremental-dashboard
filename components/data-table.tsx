import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { trainingRecords, type TrainingRecord } from "@/lib/data"

const statusMap: Record<
  TrainingRecord["status"],
  { label: string; className: string }
> = {
  completed: {
    label: "已完成",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  },
  scheduled: {
    label: "已计划",
    className:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300",
  },
  skipped: {
    label: "已跳过",
    className:
      "border-border bg-muted text-muted-foreground",
  },
}

export function DataTable() {
  return (
    <Card className="@container/card px-0">
      <CardHeader className="px-4 lg:px-6">
        <CardTitle>训练记录</CardTitle>
        <CardDescription>最近一周的训练数据明细</CardDescription>
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="search"
            placeholder="搜索记录..."
            className="h-8 w-full max-w-60 shadow-none"
          />
          <Button size="sm" className="ml-auto">
            <Plus />
            添加记录
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">日期</TableHead>
              <TableHead>类型</TableHead>
              <TableHead className="text-right">时长</TableHead>
              <TableHead className="text-right">距离</TableHead>
              <TableHead className="text-right">平均心率</TableHead>
              <TableHead className="text-right">卡路里</TableHead>
              <TableHead className="w-[100px] text-right">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainingRecords.map((record) => {
              const status = statusMap[record.status]
              return (
                <TableRow key={record.id}>
                  <TableCell className="font-medium tabular-nums">
                    {record.date}
                  </TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {record.duration}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {record.distance}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {record.avgHeartRate} bpm
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {record.calories} kcal
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={status.className}>
                      {status.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
