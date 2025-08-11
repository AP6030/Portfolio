"use client"

import { Button } from "@/components/ui/button"
import { Github, ArrowDownRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function HeaderHero() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.from("[data-reveal='hero']", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      })
      gsap.to("[data-float]", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: "sine.inOut",
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col items-start justify-center gap-8 px-4 py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full blur-2xl [background:radial-gradient(closest-side,rgba(255,0,200,0.35),transparent)]" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full blur-2xl [background:radial-gradient(closest-side,rgba(0,245,212,0.35),transparent)]" />
      </div>

      <div className="flex w-full flex-col items-start gap-6 md:gap-8 md:flex-row md:items-center">
        <div className="relative w-[140px] shrink-0 sm:w-[160px] md:w-[180px] lg:w-[200px]" data-reveal="hero">
          <div
            className="absolute -inset-2 rounded-full opacity-80 blur-xl"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(255,0,200,0.35), rgba(0,245,212,0.35), rgba(184,255,44,0.35), rgba(255,0,200,0.35))",
            }}
            aria-hidden="true"
          />
          <img
            src="/images/profile-aryan.jpg"
            alt="Profile photo"
            className="relative aspect-square w-full rounded-full border border-white/15 object-cover shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          />
          <span
            data-float
            className="absolute -right-2 -top-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur-md"
          >
            <Sparkles className="h-3 w-3 text-fuchsia-300" />
            creating daily
          </span>
        </div>

        <div className="max-w-2xl">
          <span
            data-reveal="hero"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur-md"
          >
            Creative Developer & Engineer
          </span>

          <h1
            data-reveal="hero"
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Aryan Patel
            <span className="block bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-transparent">
              Builds Unforgettable Experiences
            </span>
          </h1>

          <p data-reveal="hero" className="mt-4 text-pretty text-sm sm:text-base text-muted-foreground">
            I blend code, motion, and design to craft immersive, accessible products. I love pushing the web beyond
            templates into something that feels alive.
          </p>

          <div data-reveal="hero" className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-fuchsia-600 via-cyan-500 to-lime-500 text-white"
            >
              <a href="#projects" aria-label="Jump to projects">
                <span className="relative z-10">See Projects</span>
                <ArrowDownRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span className="absolute inset-0 -z-0 opacity-0 transition-opacity group-hover:opacity-20 [background:radial-gradient(closest-side,white,transparent)]" />
              </a>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="https://github.com/ap6030" target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div
        data-reveal="hero"
        className="mt-8 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 backdrop-blur-md [perspective:1000px]"
      >
        <div
          className="group relative grid grid-cols-1 gap-3 sm:gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-3 sm:p-4 transition-transform will-change-transform sm:grid-cols-3"
          onMouseMove={(e) => {
            const el = e.currentTarget as HTMLDivElement
            const r = el.getBoundingClientRect()
            const px = (e.clientX - r.left) / r.width
            const py = (e.clientY - r.top) / r.height
            const rx = (py - 0.5) * 8
            const ry = (0.5 - px) * 8
            el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
            el.style.setProperty("--px", String(px))
            el.style.setProperty("--py", String(py))
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement
            el.style.transform = "rotateX(0deg) rotateY(0deg)"
          }}
          style={{
            background:
              "radial-gradient(200px circle at calc(var(--px,0.5)*100%) calc(var(--py,0.5)*100%), rgba(255,255,255,0.08), transparent 60%)",
          }}
        >
          {[
            { title: "Learn", desc: "Dive into docs, reverse‑engineer systems, and absorb patterns fast." },
            { title: "Build", desc: "Ship full‑stack apps, iterate openly, and polish to production quality." },
            { title: "Understand", desc: "Connect AI + systems thinking, improve continuously." },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-black/20 p-3 sm:p-4 transition-all hover:-translate-y-1 hover:border-fuchsia-400/40"
            >
              <p className="font-semibold bg-gradient-to-r from-fuchsia-300 via-cyan-200 to-lime-200 bg-clip-text text-transparent text-sm sm:text-base">
                {item.title}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
