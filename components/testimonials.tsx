"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      quote: "Notebrain has revolutionized how I study. I can now summarize entire lectures in minutes and organize everything perfectly.",
      author: "Sarah Chen",
      role: "Computer Science Student",
      avatar: "/placeholder-user.jpg",
      initials: "SC",
    },
    {
      quote: "As a researcher, I deal with hundreds of papers. Notebrain's AI summarization and organization features save me hours every week.",
      author: "Dr. Michael Rodriguez",
      role: "Research Scientist",
      avatar: "/placeholder-user.jpg",
      initials: "MR",
    },
    {
      quote: "The flashcard generation is incredible. I can turn any article into study material instantly. Game-changer for my learning.",
      author: "Emma Thompson",
      role: "Medical Student",
      avatar: "/placeholder-user.jpg",
      initials: "ET",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Testimonials
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by students & researchers
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          See how Notebrain is transforming the way people learn and organize knowledge.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <blockquote className="text-muted-foreground mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
