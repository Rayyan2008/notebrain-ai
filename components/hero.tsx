"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DoodleArrows } from "@/components/doodle-arrows"
import { LogoStrip } from "@/components/logo-strip"
import { cn } from "@/lib/utils"

function Badge() {
  return (
    <div
      className={cn(
        "mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1",
        "border-border/70 bg-secondary/60 text-muted-foreground",
      )}
    >
      <Sparkles className="size-4" aria-hidden="true" />
      <span className="text-xs">Auto‑summarizer, latest update</span>
    </div>
  )
}

export function Hero() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center pb-16 pt-14 md:pt-20">
      <Badge />

      <h1 className="text-balance font-extrabold tracking-tight text-foreground">
        <span className="block text-5xl leading-tight md:text-7xl">{"Summarize & organize"}</span>
        <span className="block text-5xl leading-tight md:text-7xl">
          {"everything "}
          <em className="not-italic font-extrabold italic opacity-90">effortlessly</em>
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-pretty text-muted-foreground leading-relaxed">
        Paste a YouTube link, PDF, article, or audio. Notebrain.ai transcribes, summarizes into bullet points,
        flashcards, or Q&amp;A, detects key topics, and organizes them into folders — then lets you export and share.
      </p>

      <div className="mt-10">
        <DoodleArrows />
      </div>

      {/* CTA group */}
      <div className="mt-5 flex items-center gap-3">
        <Link href="/auth/signup">
          <Button className="h-12 rounded-full bg-brand px-5 text-base text-brand-foreground hover:bg-brand/90">
            <Globe className="mr-2 size-4" aria-hidden="true" />
            Get started
          </Button>
        </Link>
        <button
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-full border",
            "border-border bg-background/70 text-foreground/80 hover:text-foreground",
            "transition-colors",
          )}
          aria-label="Scroll to features"
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">Trusted by students & researchers</p>

      <div className="mt-6">
        <LogoStrip />
      </div>
    </div>
  )
}

/* Minimal inline SVG icons to avoid extra deps */

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l1.3 3.4L17 7.7l-3.7 1.3L12 12l-1.3-3L7 7.7l3.7-1.3L12 3Z" stroke="currentColor" />
      <path d="M6 14l.8 1.8L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8L6 14Z" stroke="currentColor" />
      <path d="M18 13l.8 1.8L21 15l-2.2.8L18 18l-.8-2.2L15 15l2.2-.8L18 13Z" stroke="currentColor" />
    </svg>
  )
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M12 3c2.5 3 2.5 15 0 18m-6-9h12" stroke="currentColor" />
    </svg>
  )
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
