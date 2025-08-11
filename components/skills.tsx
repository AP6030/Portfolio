"use client"

import type React from "react"
import { Code2, Braces, FileCode, Database, Brain, Scan, CircuitBoard, TerminalSquare } from "lucide-react"
import { Card } from "@/components/ui/card"

type Skill = { name: string; icon: React.ComponentType<{ className?: string }>; hue: number }

const skills: Skill[] = [
  { name: "Python", icon: Brain, hue: 200 },
  { name: "CSS", icon: FileCode, hue: 320 },
  { name: "HTML", icon: FileCode, hue: 90 },
  { name: "JavaScript", icon: Code2, hue: 180 },
  { name: "C#", icon: CircuitBoard, hue: 280 },
  { name: "C", icon: Braces, hue: 210 },
  { name: "C++", icon: Braces, hue: 150 },
  { name: "SQL", icon: Database, hue: 120 },
  { name: "Machine Learning", icon: Brain, hue: 60 },
  { name: "NLP", icon: TerminalSquare, hue: 330 },
  { name: "OpenCV", icon: Scan, hue: 30 },
]

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-28">
      <h2 className="mb-6 sm:mb-8 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-bold text-transparent">
        Skills
      </h2>

      <div className="grid gap-4 sm:gap-5 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((s, idx) => {
          const Icon = s.icon
          return (
            <Card
              key={idx}
              className="group relative overflow-hidden border-white/10 bg-white/[0.04] p-4 sm:p-5 text-foreground transition-all hover:-translate-y-1 hover:border-fuchsia-400/40"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  aria-hidden="true"
                  className="rounded-lg p-1.5 sm:p-2 transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, hsla(${s.hue}, 100%, 60%, 0.25), rgba(255,255,255,0.05))`,
                  }}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-3" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white truncate">{s.name}</span>
              </div>

              <span
                aria-hidden="true"
                className="mt-3 sm:mt-4 block h-px w-0 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-lime-400 transition-all duration-500 group-hover:w-full"
              />

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
