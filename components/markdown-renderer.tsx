"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none text-base leading-relaxed",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-img:rounded-2xl prose-img:border prose-img:border-border/60 prose-img:mx-auto",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          iframe: ({ ...props }) => {
            if (!props.src || props.src === "") {
              return null
            }
            return (
              <iframe
                {...props}
                className={cn(
                  "w-full aspect-video rounded-2xl border border-border/60 shadow-sm my-6",
                  props.className
                )}
                loading="lazy"
              />
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
