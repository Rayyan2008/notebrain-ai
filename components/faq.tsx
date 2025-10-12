"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function FAQ() {
  const faqs = [
    {
      question: "What types of content can Notebrain process?",
      answer: "Notebrain supports YouTube videos, PDF documents, articles, audio files, and plain text. Our AI can transcribe and summarize content from all these formats.",
    },
    {
      question: "How accurate is the AI summarization?",
      answer: "Our AI uses advanced language models trained on educational content. While highly accurate, we recommend reviewing important summaries for critical information.",
    },
    {
      question: "Can I export my summaries?",
      answer: "Yes! You can export summaries in multiple formats including text, PDF, and structured formats. Pro and Team plans also support additional export options.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your content with third parties. Your data is used only to provide our services.",
    },
    {
      question: "Can I collaborate with others?",
      answer: "Team plans include collaboration features allowing you to share folders and summaries with team members. Individual plans are private.",
    },
    {
      question: "What if I need help?",
      answer: "We offer email support for all users, with priority support for Pro and Team plans. Check our documentation or contact us anytime.",
    },
  ]

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          FAQ
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about Notebrain. Can't find the answer you're looking for? Contact our support team.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
