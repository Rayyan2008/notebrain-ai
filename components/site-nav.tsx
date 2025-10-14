"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteNav() {
  const { data: session } = useSession()

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
        href="/"
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
        {session ? (
          <>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Summary
            </Link>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </>
        ) : (
          <>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </>
        )}
      </nav>

      {/* Right auth */}
      <div className="flex items-center gap-2">
        {session ? (
          <>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Welcome, {session.user?.name || session.user?.email}
            </span>
            <Button
              variant="ghost"
              className="h-9 rounded-full px-4 text-sm"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
