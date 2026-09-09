import { IconHeartFilled, IconSlash } from "@tabler/icons-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-4 px-6 text-sm tracking-wide text-zinc-400 dark:text-zinc-500">
        <span>© 2026 incremental.icu. All rights reserved.</span>
        <IconSlash className="h-3 w-3 opacity-40" />
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <IconHeartFilled className="h-3 w-3" />
          <span>by inrenping.</span>
        </div>
      </div>
    </footer>
  )
}
