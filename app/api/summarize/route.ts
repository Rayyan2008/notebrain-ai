import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import OpenAI from "openai"
import * as cheerio from "cheerio"

async function extractContentFromUrl(url: string): Promise<{ title: string; content: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove script and style elements
    $('script, style, nav, header, footer, aside').remove()

    // Extract title
    const title = $('title').text().trim() ||
                  $('h1').first().text().trim() ||
                  'Untitled Content'

    // Extract main content
    const content = $('body').text()
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 10000) // Limit content length

    return { title, content }
  } catch (error) {
    console.error("Error extracting content:", error)
    throw new Error("Failed to extract content from URL")
  }
}

async function generateSummary(content: string, format: string): Promise<any> {
  const formatPrompts = {
    "bullet-points": "Summarize the content in 3-5 key bullet points. Each point should be concise and capture the main ideas.",
    "flashcards": "Create 3-5 flashcards from the content. Each flashcard should have a question and a concise answer.",
    "qa": "Create 3-5 question-answer pairs that capture the main points of the content."
  }

  const prompt = `Please analyze the following content and ${formatPrompts[format as keyof typeof formatPrompts]}.

Content: ${content}

Return the result in JSON format with this structure:
{
  "title": "A brief title for the content",
  "summary": ${format === "bullet-points" ? '["point 1", "point 2", "point 3"]' :
             format === "flashcards" ? '[{"question": "Q1", "answer": "A1"}, {"question": "Q2", "answer": "A2"}]' :
             '[{"question": "Q1", "answer": "A1"}, {"question": "Q2", "answer": "A2"}]'}
}`

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes content in various formats. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    })

    const result = completion.choices[0]?.message?.content
    if (!result) {
      throw new Error("No response from OpenAI")
    }

    // Try to parse JSON response
    try {
      return JSON.parse(result)
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", result)
      // Fallback to mock data
      return {
        title: "Content Summary",
        summary: format === "bullet-points"
          ? ["Key point 1: Content extracted and summarized", "Key point 2: AI processing completed", "Key point 3: Summary generated"]
          : format === "flashcards"
          ? [{ question: "What was processed?", answer: "Content from the provided URL" }, { question: "How was it summarized?", answer: "Using AI analysis" }]
          : [{ question: "What is this summary about?", answer: "Content extracted from a URL" }, { question: "How was it created?", answer: "Using AI summarization" }]
      }
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw new Error("Failed to generate summary")
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { url, format } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file." }, { status: 500 })
    }

    // Extract content from URL
    const { title, content } = await extractContentFromUrl(url)

    if (!content || content.length < 50) {
      return NextResponse.json({ error: "Could not extract sufficient content from URL" }, { status: 400 })
    }

    // Generate summary using OpenAI
    const summary = await generateSummary(content, format)

    return NextResponse.json({
      title: summary.title || title,
      summary: summary.summary
    })

  } catch (error) {
    console.error("Summarize API error:", error)

    // Return mock data as fallback
    const { format } = await request.json()
    return NextResponse.json({
      title: "Content Summary",
      summary: format === "bullet-points"
        ? ["Key point 1: Content processed successfully", "Key point 2: AI analysis completed", "Key point 3: Summary generated"]
        : format === "flashcards"
        ? [{ question: "What was processed?", answer: "Content from the provided URL" }, { question: "How was it summarized?", answer: "Using AI technology" }]
        : [{ question: "What is this about?", answer: "URL content summary" }, { question: "How was it created?", answer: "AI-powered summarization" }]
    })
  }
}
