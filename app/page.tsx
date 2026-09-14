"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  IconBrandGithubFilled,
  IconChartBar,
  IconMinusVertical,
  IconRepeat,
  IconShield,
  IconStack,
  IconStarFilled,
  IconTrendingUp,
} from "@tabler/icons-react"

import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { StarsCount } from "@/components/github-link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-24 px-4 text-left bg-cover bg-center bg-no-repeat">
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="flex items-center justify-start gap-4 text-6xl font-black tracking-tighter text-foreground">
              <Image src="/favicon.svg" alt="Logo" width={64} height={64} className="h-16 w-16" />
              incremental.icu
            </h1>
            <p className="text-5xl text-foreground font-black tracking-tighter">
              保持你各个平台的数据同步
            </p>
            <p className="max-w-xl text-lg text-muted-foreground">
              incremental.icu 是一个专注于跨平台同步运动数据的网页应用。它是完全免费开源的，通过调用官方公开的
              API 来实现跨平台的数据同步，目前已经支持佳明和高驰两个平台。
            </p>
            <div className="flex flex-col items-start gap-6 pt-8">
              <div className="flex flex-wrap justify-start gap-6">
                <Button
                  onClick={() => router.push("/sign-in")}
                  size="lg"
                  className="h-14 gap-2 rounded-full px-8 text-lg font-semibold shadow-lg transition-all hover:shadow-xl"
                >
                  开始使用
                  <IconTrendingUp className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => router.push("https://github.com/inrenping/incremental.icu")}
                  variant="outline"
                  size="lg"
                  className="h-14 gap-2 rounded-full px-8 text-lg font-semibold shadow-lg transition-all hover:shadow-xl"
                >
                  <IconBrandGithubFilled className="h-4 w-4" />
                  Github
                  <IconMinusVertical className="h-4 w-1" />
                  <IconStarFilled className="h-4 w-4 text-yellow-400" />
                  <StarsCount />
                </Button>
              </div>

              <div className="flex flex-wrap justify-start gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full px-4 text-muted-foreground hover:text-foreground"
                  onClick={() => router.push("/doc/intro")}
                >
                  项目介绍
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full px-4 text-muted-foreground hover:text-foreground"
                  onClick={() => router.push("/doc/guide")}
                >
                  快速开始
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full px-4 text-muted-foreground hover:text-foreground"
                  onClick={() => router.push("https://github.com/users/inrenping/projects/1")}
                >
                  开发进度
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full px-4 text-muted-foreground hover:text-foreground"
                  onClick={() => router.push("https://status.incremental.icu")}
                >
                  网站状态
                </Button>
              </div>
            </div>
          </div>
          <hr className="mx-auto mt-8 max-w-6xl border-border/50" />
        </section>

        {/* Feature Cards */}
        <section className="mx-auto max-w-6xl py-10 px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "一键同步",
                desc: "一键拉取最新数据比对后差量同步。",
                icon: <IconRepeat className="h-6 w-6" />,
              },
              {
                title: "定时任务",
                desc: "自动更新记录，你偷懒的时候程序也还在跑。",
                icon: <IconStack className="h-6 w-6" />,
              },
              {
                title: "免费使用",
                desc: "反正试试也不花钱。",
                icon: <IconShield className="h-6 w-6" />,
              },
              {
                title: "开源透明",
                desc: "欢迎提交 PR 或者 issue 来完善这个项目。",
                icon: <IconChartBar className="h-6 w-6" />,
              },
            ].map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-black">
      <div className="flex items-center gap-2.5">
        <div className="shrink-0 text-2xl text-green-500">{icon}</div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  )
}
