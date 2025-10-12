"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Features() {
  const features = [
    {
      icon: FileText,
      title: "Multi-format Support",
      description: "Paste YouTube links, upload PDFs, articles, or audio files. Notebrain handles it all.",
    },
    {
      icon: Brain,
      title: "AI-Powered Summarization",
      description: "Advanced AI transcribes and summarizes content into bullet points, flashcards, or Q&A format.",
    },
    {
      icon: FolderOpen,
      title: "Smart Organization",
      description: "Automatically detects key topics and organizes your summaries into structured folders.",
    },
    {
      icon: Share2,
      title: "Export & Share",
      description: "Export your organized notes in multiple formats and share with others effortlessly.",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Features
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to organize knowledge
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful tools to transform any content into structured, actionable insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="mb-2 text-brand">
                <feature.icon className="size-8" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* Icons */
function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 13H8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 17H8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9H8" stroke="currentColor" strokeWidth="1.5" />
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

function FolderOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v0" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z" stroke="currentColor" strokeWidth="1.5" />
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
