"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteNav() {
  return (
    <div
      className={cn(
        "mx-auto flex items-center justify-between rounded-full border",
        "border-border/60 bg-secondary/60 px-3 py-2 backdrop-blur",
        "shadow-[0_0_0_1px_inset_var(--color-border)]",
      )}
    >
      {/* Left logo glyph */}
      <Link
        href="#"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60"
        aria-label="Notebrain.ai"
      >
        {/* Minimal brain-glyph */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 12a5 5 0 1 1 10 0v5a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 12v5a2 2 0 0 0 2 2h1" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
        </svg>
      </Link>

      {/* Center nav */}
      <nav className="hidden gap-6 text-sm md:flex">
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          Features
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          Testimonials
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
          FAQ
        </Link>
      </nav>

      {/* Right auth */}
      <div className="flex items-center gap-2">
        <Link href="/auth/signin">
          <Button variant="ghost" className="h-9 rounded-full px-4 text-sm">
            Log in
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button className="h-9 rounded-full bg-brand px-4 text-brand-foreground hover:bg-brand/90 text-sm">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  )
}
