"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 10 summaries per month",
        "Basic AI summarization",
        "PDF and text support",
        "Export to text format",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      description: "For students and researchers",
      features: [
        "Unlimited summaries",
        "Advanced AI features",
        "All file formats supported",
        "Flashcard generation",
        "Q&A format",
        "Folder organization",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "$29",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Shared folders",
        "Admin dashboard",
        "API access",
        "Custom integrations",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Pricing
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Choose your plan
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Start free and upgrade as you grow. All plans include our core AI summarization features.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-brand shadow-lg' : 'border-0 shadow-sm'}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-brand text-brand-foreground">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Contact" && <span className="text-muted-foreground">/month</span>}
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="size-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-6 ${plan.popular ? 'bg-brand hover:bg-brand/90' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
