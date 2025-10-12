import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"

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
      </div>
    </main>
  )
}
