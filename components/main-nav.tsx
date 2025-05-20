import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
        StateLegis
      </Link>
      <Link href="/bills" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Bills
      </Link>
      <Link
        href="/representatives"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Representatives
      </Link>
    </nav>
  )
}
