import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "文档 - incremental.icu",
  description: "incremental.icu 使用文档",
}

export default function DocLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center border-b px-6">
        <a href="/" className="flex items-center gap-2 text-sm font-semibold">
          incremental.icu
        </a>
        <nav className="ml-6 flex gap-4 text-sm text-muted-foreground">
          <a href="/doc/intro" className="hover:text-primary transition-colors">
            项目介绍
          </a>
          <a href="/doc/guide" className="hover:text-primary transition-colors">
            快速开始
          </a>
          <a href="/doc/faq" className="hover:text-primary transition-colors">
            常见问题
          </a>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} incremental.icu
      </footer>
    </div>
  )
}
