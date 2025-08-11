"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ExternalLink, Github } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  updated_at: string
  archived: boolean
  fork: boolean
}

const FIXED_USERNAME = "ap6030"

export default function Projects() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const fetchRepos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(FIXED_USERNAME)}&sort=updated&per_page=12`, {
        headers: { accept: "application/json" },
      })
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload?.error || `GitHub fetch failed: ${res.status}`)
      }
      const data = (await res.json()) as Repo[]
      const filtered = data.filter((r) => !r.fork && !r.archived)
      setRepos(filtered)
    } catch (e: any) {
      setError(e?.message || "Failed fetching repositories.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-28">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-bold text-transparent">
            My GitHub Projects
          </h2>
          <p className="mt-2 max-w-prose text-xs sm:text-sm text-muted-foreground">
            Live from GitHub for{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 via-cyan-200 to-lime-200 bg-clip-text font-medium text-transparent">
              @{FIXED_USERNAME}
            </span>
            .
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" asChild size="sm">
            <a href={`https://github.com/${FIXED_USERNAME}`} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Profile
            </a>
          </Button>
          <Button variant="secondary" onClick={fetchRepos} disabled={loading} size="sm">
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs sm:text-sm text-red-200"
        >
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-36 sm:h-40 animate-pulse border-white/10 bg-white/[0.04]" />
            ))
          : repos.length > 0
            ? repos.map((repo) => <ProjectCard key={repo.id} repo={repo} />)
            : !error && (
                <Card className="col-span-full border-white/10 bg-white/[0.04] p-6 text-xs sm:text-sm text-muted-foreground">
                  No repositories found. Try again later.
                </Card>
              )}
      </div>
    </section>
  )
}

function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/[0.04] p-0">
      {/* Glow layer strictly behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(255,0,200,0.28), rgba(0,245,212,0.28), rgba(184,255,44,0.28), rgba(255,0,200,0.28))",
          filter: "blur(14px)",
        }}
      />

      <div
        className="relative z-10 h-full rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4 sm:p-5 [perspective:1000px]"
        onMouseMove={(e) => {
          const el = e.currentTarget as HTMLDivElement
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width
          const py = (e.clientY - r.top) / r.height
          const rx = (py - 0.5) * 6
          const ry = (0.5 - px) * 6
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
            "radial-gradient(200px circle at calc(var(--px,0.5)*100%) calc(var(--py,0.5)*100%), rgba(255,255,255,0.06), transparent 60%)",
        }}
      >
        <div className="mb-2 flex items-start justify-between gap-2">
          <a
            className="line-clamp-1 text-xs sm:text-sm font-semibold text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] hover:underline"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            data-cursor="chatgpt"
          >
            {repo.name}
          </a>
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 sm:px-2 py-0.5 text-xs text-white/90">
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-300" aria-hidden="true" />
            <span className="text-xs">{repo.stargazers_count}</span>
          </div>
        </div>

        <p className="line-clamp-3 text-xs sm:text-sm text-muted-foreground">
          {repo.description || "No description available."}
        </p>

        <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs text-white/80">
          <span className="truncate">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
          <a
            className="ml-2 inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 sm:px-2.5 py-1 text-xs text-white hover:bg-white/20 shrink-0"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            data-cursor="grok"
          >
            Open <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </a>
        </div>
      </div>
    </Card>
  )
}
