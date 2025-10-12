"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload or Paste Content",
      description: "Paste a YouTube link, upload a PDF, article, or audio file. Notebrain handles all formats effortlessly.",
    },
    {
      icon: Mic,
      title: "AI Transcribes",
      description: "Our advanced AI transcribes audio and video content into text, ensuring accuracy and speed.",
    },
    {
      icon: Brain,
      title: "Summarize & Organize",
      description: "Content is summarized into bullet points, flashcards, or Q&A. Key topics are detected and organized into folders.",
    },
    {
      icon: Share2,
      title: "Export & Share",
      description: "Export your notes in PDF/DOCX or share them via links. Collaborate and learn anywhere.",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          How it Works
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          From content to insights in minutes
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Follow these simple steps to transform any content into organized, actionable knowledge.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={index} className="border-0 shadow-sm relative">
            <CardHeader className="pb-4">
              <div className="mb-2 text-brand">
                <step.icon className="size-8" />
              </div>
              <div className="absolute -top-3 -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                {index + 1}
              </div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {step.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* Icons */
function Upload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 18v-6m0 0l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Mic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 19v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Brain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 12a5 5 0 1 1 10 0v5a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 12v5a2 2 0 0 0 2 2h1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  )
}

function Share2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
