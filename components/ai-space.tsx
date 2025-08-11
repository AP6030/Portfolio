"use client"

import { Card } from "@/components/ui/card"
import { Bot, Sparkles, Brain, Stars } from "lucide-react"

const tools = [
  {
    name: "ChatGPT",
    desc: "Fast ideation, code help, and debugging with structured prompts.",
    icon: Bot,
    cursor: "chatgpt",
  },
  {
    name: "Gemini",
    desc: "Reasoning on complex topics and multimodal understanding.",
    icon: Stars,
    cursor: "gemini",
  },
  {
    name: "Grok",
    desc: "Exploration and fast Q&A with a curious mindset.",
    icon: Sparkles,
    cursor: "grok",
  },
  {
    name: "Other Models",
    desc: "I’m AI-literate and adapt to new tools and techniques quickly.",
    icon: Brain,
    cursor: "default",
  },
]

export default function AISpace() {
  return (
    <section id="ai-space" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <h2 className="mb-2 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
        AI Space
      </h2>
      <p className="mb-8 max-w-prose text-muted-foreground">
        I use various AI tools and techniques to understand unknowns, accelerate learning, and prototype solutions. I’m
        AI-literate and continuously evolving my workflow.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
        {tools.map((t, i) => {
          const Icon = t.icon
          return (
            <Card
              key={i}
              className="group relative overflow-hidden border-white/10 bg-white/[0.04] p-5 transition-all hover:-translate-y-1 hover:border-fuchsia-400/40"
              data-cursor={t.cursor}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg p-2 bg-white/[0.06] border border-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
              </div>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: "radial-gradient(400px circle at 50% 10%, rgba(255,255,255,0.06), transparent 60%)",
                }}
              />
            </Card>
          )
        })}
      </div>
    </section>
  )
}
