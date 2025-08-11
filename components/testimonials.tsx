"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

const QUOTES = [
  {
    quote:
      "Aryan’s sense of motion and detail turned our product into an experience.",
    author: "Alex Kim",
    role: "Design Lead, Flux",
  },
  {
    quote: "A rare blend of engineering rigor and creative spark. A joy to collaborate with.",
    author: "Jordan Lee",
    role: "VP Product, Northstar",
  },
  {
    quote:
      "From concept to polish, Aryan continuously pushed for accessibility and delight.",
    author: "Priya Sharma",
    role: "Founder, Looma",
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % QUOTES.length)
    }, 4000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <h2 className="mb-6 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
        Testimonials
      </h2>

      <div className="relative">
        {QUOTES.map((q, i) => (
          <Card
            key={i}
            aria-live={i === idx ? "polite" : "off"}
            className={`absolute inset-0 mx-auto max-w-3xl border-white/10 bg-white/[0.04] p-6 transition-all duration-500 ${
              i === idx ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
            }`}
          >
            <blockquote className="text-balance text-lg">{'“'}{q.quote}{'”'}</blockquote>
            <p className="mt-4 text-sm text-muted-foreground">— {q.author}, {q.role}</p>
          </Card>
        ))}
        {/* Spacer to prevent layout overlap */}
        <div className="h-44 sm:h-36" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === idx ? "bg-foreground" : "bg-white/20 hover:bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  )
}
