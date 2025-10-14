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
import { FileText, Play, Loader2, Sparkles, Brain, Zap } from "lucide-react"
import { AnimatedCat } from "@/components/animated-cat"
import { Chatbot } from "@/components/chatbot"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [url, setUrl] = useState("")
  const [format, setFormat] = useState("bullet-points")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [summary, setSummary] = useState<any>(null)

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/auth/signin")
  }

  const handleSummarize = async () => {
    setLoading(true)
    setError("")
    setSummary(null)

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, format }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")

      setSummary(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Spotlight background like landing page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 45% at 50% 25%, var(--color-hero-spotlight) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-4xl relative z-10 p-4">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-brand animate-pulse" />
            <h1 className="text-4xl font-bold text-foreground">
              Notebrain Dashboard
            </h1>
            <Sparkles className="h-8 w-8 text-brand animate-bounce" />
          </div>
          <p className="text-muted-foreground text-lg">Transform any content into smart summaries with AI magic ✨</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Form */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-brand" />
                Input Content
              </CardTitle>
              <CardDescription>
                Paste a YouTube link or upload a PDF to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="url">YouTube / Article URL</Label>
                <Input
                  id="url"
                  placeholder="Paste a YouTube / article URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-background text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="format">Summary Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="bg-background text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bullet-points">Bullet Points</SelectItem>
                    <SelectItem value="flashcards">Flashcards</SelectItem>
                    <SelectItem value="qa">Q&A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSummarize}
                disabled={loading || !url}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Generate Summary"}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand" />
                Summary Results
              </CardTitle>
              <CardDescription>
                Your AI-generated summary will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500">{error}</p>}

              {summary && (
                <>
                  <h2 className="text-xl font-semibold mb-2">{summary.title}</h2>
                  {format === "bullet-points" && (
                    <ul className="list-disc list-inside space-y-1">
                      {summary.summary.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}

                  {format !== "bullet-points" && (
                    <div className="space-y-2">
                      {summary.summary.map((item: any, i: number) => (
                        <div key={i}>
                          <p className="font-medium">Q: {item.question}</p>
                          <p>A: {item.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Animated Cat */}
      <AnimatedCat />

      {/* Chatbot */}
      <Chatbot />
    </main>
  )
}
