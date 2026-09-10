"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { GitHubLink } from "@/components/github-link"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-6">
        <Image src="/favicon.svg" alt="Logo" width={24} height={24} className="h-6 w-6" />
        <h1
          className="cursor-pointer text-base font-medium"
          onClick={() => router.push("/")}
        >
          incremental.icu
        </h1>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <GitHubLink />
        </div>
      </div>
    </header>
  )
}
