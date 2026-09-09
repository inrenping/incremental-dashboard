"use client"

import React, { useEffect, useState, use, useRef } from "react"
import MarkdownRenderer from "@/components/markdown-renderer"

interface DocPageProps {
  params: Promise<{ slug: string }>
}

export default function DocPage({ params }: DocPageProps) {
  const { slug } = use(params)
  const [mdContent, setMdContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [toc, setToc] = useState<{ id: string; text: string }[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`/docs/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("文档加载失败")
        return res.text()
      })
      .then((data) => {
        setMdContent(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setMdContent("# 加载失败")
        setIsLoading(false)
      })
  }, [slug])

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      const headers = contentRef.current.querySelectorAll("h2")
      const items = Array.from(headers).map((header, index) => {
        const text = header.textContent || ""
        const id =
          text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || `section-${index}`
        header.id = id
        return { id, text }
      })
      setToc(items)
    }
  }, [isLoading, mdContent])

  const scrollToAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  return (
    <div className="flex flex-row gap-12 p-6 mx-auto bg-slate-50/50 dark:bg-background flex-1 text-sm transition-all duration-300 w-full max-w-7xl">
      {/* 正文内容 */}
      <div className="flex-1 min-w-0" ref={contentRef}>
        <section className="space-y-4">
          <div className="text-left space-y-5 px-8 py-7 bg-muted/20 dark:bg-muted/10 rounded-2xl border border-border/50 text-base text-foreground/90 leading-relaxed">
            <div className="space-y-4 text-foreground">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 text-muted-foreground animate-pulse">
                  正在加载文档内容...
                </div>
              ) : (
                <MarkdownRenderer content={mdContent} />
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 右侧目录 */}
      {!isLoading && toc.length > 0 && (
        <aside className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-10 space-y-4">
            <nav className="flex flex-col border-l border-border/60">
              {toc.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToAnchor(e, item.id)}
                  className="block pl-4 py-2 text-muted-foreground hover:text-primary hover:border-l hover:border-primary -ml-px transition-all duration-200"
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  )
}
