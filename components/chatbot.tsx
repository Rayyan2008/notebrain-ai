"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Greetings, mortal! I'm VAEL, your witty AI companion. I can help with Notebrain, summarization, or just chat about the universe. What's on your mind, or should I start with a joke?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response with humor and context
    setTimeout(() => {
      const userInput = input.toLowerCase()
      let response = ""

      if (userInput.includes("joke") || userInput.includes("funny")) {
        response = "Why did the AI go to therapy? It had too many unresolved issues! 😄 But seriously, how can I help with Notebrain?"
      } else if (userInput.includes("summarize") || userInput.includes("summary")) {
        response = "Ah, summarization! Notebrain's my specialty. It turns long-winded content into bite-sized brilliance. Try uploading a YouTube video or PDF – I'll handle the rest with a wink and a nod."
      } else if (userInput.includes("notebrain") || userInput.includes("features")) {
        response = "Notebrain is like a digital brain on steroids! It transcribes, summarizes, and organizes info from videos, articles, and more. Bullet points, flashcards, Q&A – you name it, I've got it. What's your favorite feature?"
      } else if (userInput.includes("hello") || userInput.includes("hi")) {
        response = "Greetings, fellow human! VAEL here, ready to dazzle with wit and wisdom. What's brewing in that brilliant mind of yours?"
      } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
        response = "Farewell, my inquisitive friend! Remember, in the world of AI, I'm always just a chat away. Come back soon for more banter!"
      } else {
        const humorousResponses = [
          "Hmm, that's a thinker! While I ponder the mysteries of the universe, Notebrain can summarize your content faster than you can say 'artificial intelligence'. What else can I assist with?",
          "Ooh, intriguing! Did you know AI like me processes info at lightning speed? Notebrain uses that to create amazing summaries. Got a specific question?",
          "Ah, the eternal quest for knowledge! I'm here to help with Notebrain's features, summarization tips, or just some light-hearted conversation. What's next on your agenda?",
          "That's a good one! In the meantime, let me tell you: Notebrain supports YouTube, PDFs, audio, and web articles. Which format are you curious about?",
          "Witty query! But let's get practical: Notebrain extracts key info and organizes it neatly. Bullet points, flashcards, Q&A – pick your poison!",
        ]
        response = humorousResponses[Math.floor(Math.random() * humorousResponses.length)]
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-brand hover:bg-brand/90 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-2xl border-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-brand" />
            VAEL
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col h-80 p-0">
          <ScrollArea className="h-64 px-4" ref={scrollAreaRef}>
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-brand" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg px-3 py-2 ${
                      message.role === "user"
                        ? "bg-brand text-brand-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-brand" />
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="bg-brand hover:bg-brand/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
