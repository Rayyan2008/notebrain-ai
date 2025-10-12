import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Spotlight background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 45% at 50% 25%, var(--color-hero-spotlight) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <header className="mx-auto max-w-screen-xl px-4 pt-4 md:pt-6">
          <SiteNav />
        </header>
        <section className="mx-auto max-w-screen-xl px-4">
          <Hero />
        </section>
        <section id="features" className="mx-auto max-w-screen-xl px-4 py-16">
          <Features />
        </section>
        <section id="how-it-works" className="mx-auto max-w-screen-xl px-4 py-16 bg-secondary/20">
          <HowItWorks />
        </section>
        <section id="pricing" className="mx-auto max-w-screen-xl px-4 py-16 bg-secondary/20">
          <Pricing />
        </section>
        <section id="testimonials" className="mx-auto max-w-screen-xl px-4 py-16">
          <Testimonials />
        </section>
        <section id="faq" className="mx-auto max-w-screen-xl px-4 py-16 bg-secondary/20">
          <FAQ />
        </section>
      </div>
    </main>
  )
}
