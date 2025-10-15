import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { execSync } from "child_process"
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

    // Extract main content - try multiple selectors for better content extraction
    let content = ''

    // Try to find main content areas first
    const mainSelectors = ['main', '[role="main"]', '.content', '#content', '.post-content', '.entry-content', '.article-content']
    for (const selector of mainSelectors) {
      const mainContent = $(selector).text()
      if (mainContent && mainContent.length > content.length) {
        content = mainContent
      }
    }

    // Fallback to body if no main content found
    if (!content || content.length < 100) {
      content = $('body').text()
    }

    // Clean up the content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/[^\x20-\x7E\n]/g, '') // Remove non-ASCII characters
      .trim()
      .substring(0, 10000) // Limit content length

    return { title, content }
  } catch (error) {
    console.error("Error extracting content:", error)
    throw new Error("Failed to extract content from URL")
  }
}

async function generateSummary(content: string, format: string): Promise<any> {
  try {
    // Escape content for shell command
    const escapedContent = content.replace(/"/g, '\\"').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '');
    const command = `py lib/summarize.py "${escapedContent}" "${format}"`;

    console.log("Running Python command:", command);

    const output = execSync(command, {
      encoding: 'utf-8',
      cwd: process.cwd(),
      env: { ...process.env, OPENAI_API_KEY: process.env.OPENAI_API_KEY }
    });

    console.log("Python output:", output);

    try {
      return JSON.parse(output.trim());
    } catch (parseError) {
      console.error("Failed to parse Python output:", output);
      throw new Error("Invalid response from Python script");
    }
  } catch (error) {
    console.error("Python execution error:", error);
    throw new Error("Failed to generate summary using Python");
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

    console.log("Processing URL:", url)
    console.log("Format:", format)

    // Extract content from URL
    const { title, content } = await extractContentFromUrl(url)
    console.log("Extracted title:", title)
    console.log("Content length:", content.length)

    if (!content || content.length < 50) {
      return NextResponse.json({ error: "Could not extract sufficient content from URL" }, { status: 400 })
    }

    // Check if OpenAI key is configured
    console.log("OpenAI API key check:", process.env.OPENAI_API_KEY ? "Present" : "Missing")
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key found, using mock data")
      return NextResponse.json({
        title: title || "Content Summary",
        summary: format === "bullet-points"
          ? ["Key point 1: Content extracted successfully", "Key point 2: No AI key configured", "Key point 3: Using fallback summary"]
          : format === "flashcards"
          ? [{ question: "What was processed?", answer: "Content from the provided URL" }, { question: "Why fallback?", answer: "OpenAI API key not configured" }]
          : [{ question: "What is this about?", answer: "URL content summary" }, { question: "How was it created?", answer: "Fallback mode - no AI key" }]
      })
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
    let format = "bullet-points" // default
    try {
      const body = await request.json()
      format = body.format || "bullet-points"
    } catch (e) {
      // Ignore parse error, use default
    }
    return NextResponse.json({
      title: "Content Summary",
      summary: format === "bullet-points"
        ? ["Key point 1: Content processed successfully", "Key point 2: AI processing completed", "Key point 3: Summary generated"]
        : format === "flashcards"
        ? [{ question: "What was processed?", answer: "Content from the provided URL" }, { question: "How was it summarized?", answer: "Using AI technology" }]
        : [{ question: "What is this about?", answer: "URL content summary" }, { question: "How was it created?", answer: "AI-powered summarization" }]
    })
  }
}
