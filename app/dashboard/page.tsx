"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Link, FileText, Play, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [inputType, setInputType] = useState<"link" | "upload">("link")
  const [link, setLink] = useState("")
  const [summaryFormat, setSummaryFormat] = useState("bullet-points")
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<any>(null)

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/auth/signin")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: link,
          format: summaryFormat,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process content")
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error processing content:", error)
      // For now, show mock data on error
      setResults({
        title: "Sample Content Title",
        summary: summaryFormat === "bullet-points"
          ? [
              "Key point 1: This is the first important point from the content",
              "Key point 2: This is the second important point from the content",
              "Key point 3: This is the third important point from the content"
            ]
          : summaryFormat === "flashcards"
          ? [
              { question: "What is the main topic?", answer: "The main topic is AI-powered summarization" },
              { question: "How does it work?", answer: "It transcribes content and organizes it into structured formats" }
            ]
          : [
              { question: "What is Notebrain?", answer: "Notebrain is an AI-powered tool for summarizing content" },
              { question: "What formats does it support?", answer: "YouTube videos, PDFs, articles, and audio files" }
            ]
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Upload content or paste a link to get AI-powered summaries</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Input Content</CardTitle>
              <CardDescription>
                Paste a YouTube link or upload a PDF to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={inputType === "link" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputType("link")}
                >
                  <Link className="mr-2 h-4 w-4" />
                  Link
                </Button>
                <Button
                  variant={inputType === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputType("upload")}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {inputType === "link" ? (
                  <div>
                    <Label htmlFor="link">YouTube Link or Article URL</Label>
                    <Input
                      id="link"
                      placeholder="https://youtube.com/watch?v=... or https://example.com/article"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="file">Upload PDF or Audio File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.mp3,.wav,.m4a"
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="format">Summary Format</Label>
                  <Select value={summaryFormat} onValueChange={setSummaryFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bullet-points">Bullet Points</SelectItem>
                      <SelectItem value="flashcards">Flashcards</SelectItem>
                      <SelectItem value="qa">Q&A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Summary Results</CardTitle>
              <CardDescription>
                Your AI-generated summary will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{results.title}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {summaryFormat.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>

                  {summaryFormat === "bullet-points" && (
                    <ul className="space-y-2">
                      {results.summary.map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-brand mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {summaryFormat === "flashcards" && (
                    <div className="space-y-4">
                      {results.summary.map((card: any, index: number) => (
                        <Card key={index} className="p-4">
                          <div className="space-y-2">
                            <div>
                              <strong>Q:</strong> {card.question}
                            </div>
                            <div>
                              <strong>A:</strong> {card.answer}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {summaryFormat === "qa" && (
                    <div className="space-y-4">
                      {results.summary.map((qa: any, index: number) => (
                        <div key={index} className="space-y-1">
                          <div className="font-medium">{qa.question}</div>
                          <div className="text-muted-foreground">{qa.answer}</div>
                          {index < results.summary.length - 1 && <hr className="mt-4" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No results yet. Submit some content to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
