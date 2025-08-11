"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Linkedin, Github, Mail } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-28">
      <h2 className="mb-3 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-bold text-transparent">
        Contact
      </h2>
      <p className="mb-6 sm:mb-8 max-w-prose text-sm sm:text-base text-muted-foreground">
        Let's build something memorable. Reach out and I'll reply within 48 hours.
      </p>

      <form className="grid gap-4 sm:gap-6 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <FormField label="Name" name="name">
          <Input
            name="name"
            id="contact-name"
            autoComplete="name"
            className="border-white/20 bg-white/[0.06] text-sm text-white placeholder:text-white/60 focus:border-fuchsia-400/50 focus-visible:ring-2 focus-visible:ring-fuchsia-400/30 caret-white"
            placeholder="Your full name"
          />
        </FormField>

        <FormField label="Email" name="email">
          <Input
            name="email"
            id="contact-email"
            type="email"
            autoComplete="email"
            className="border-white/20 bg-white/[0.06] text-sm text-white placeholder:text-white/60 focus:border-fuchsia-400/50 focus-visible:ring-2 focus-visible:ring-fuchsia-400/30 caret-white"
            placeholder="you@example.com"
          />
        </FormField>

        <FormField label="Message" name="message" className="sm:col-span-2">
          <Textarea
            name="message"
            id="contact-message"
            className="min-h-[120px] sm:min-h-[160px] border-white/20 bg-white/[0.06] text-sm text-white placeholder:text-white/60 focus:border-fuchsia-400/50 focus-visible:ring-2 focus-visible:ring-fuchsia-400/30 caret-white resize-none"
            placeholder="Tell me about your idea, timeline, and goals..."
          />
        </FormField>

        <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="button"
            className="cursor-not-allowed bg-gradient-to-r from-fuchsia-600 via-cyan-500 to-lime-500 text-white opacity-70"
            title="Disabled for now"
            size="lg"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send (coming soon)
          </Button>
        </div>
      </form>

      <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          aria-label="Open GitHub profile"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:scale-105 hover:text-white"
          href="https://github.com/ap6030"
          target="_blank"
          rel="noreferrer"
          data-cursor="chatgpt"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          aria-label="Open LinkedIn profile"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:scale-105 hover:text-white"
          href="https://www.linkedin.com/in/aryan-y-patel-93a9ab25a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noreferrer"
          data-cursor="gemini"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  children,
  className,
}: {
  label: string
  name: string
  className?: string
  children: React.ReactNode
}) {
  const id = (children as any)?.props?.id || `${name}-${Math.random().toString(36).slice(2)}`
  return (
    <div className={`group ${className || ""}`}>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-white">
        {label}
      </label>
      <div className="relative">
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition-opacity group-focus-within:opacity-100"
          style={{
            background:
              "conic-gradient(from 180deg, rgba(255,0,200,0.2), rgba(0,245,212,0.2), rgba(184,255,44,0.2), rgba(255,0,200,0.2))",
            filter: "blur(10px)",
          }}
        />
      </div>
    </div>
  )
}
