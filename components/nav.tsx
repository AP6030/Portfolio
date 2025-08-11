"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

export default function Nav() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[]
    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement
      const id = a.getAttribute("href")?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false) // Close mobile menu on navigation
    }
    links.forEach((a) => a.addEventListener("click", onClick))
    return () => links.forEach((a) => a.removeEventListener("click", onClick))
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <a href="#hero" className="group text-sm font-extrabold tracking-widest">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-lime-400 transition-transform group-hover:scale-125" />
          <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,0,200,0.35)] group-hover:drop-shadow-[0_0_18px_rgba(0,245,212,0.35)]">
            ARYAN
          </span>
        </a>

        <nav className="hidden gap-6 md:flex">
          <a className="text-muted-foreground hover:text-foreground transition-colors" href="#skills">
            Skills
          </a>
          <a className="text-muted-foreground hover:text-foreground transition-colors" href="#projects">
            Projects
          </a>
          <a className="text-muted-foreground hover:text-foreground transition-colors" href="#about">
            About
          </a>
          <a className="text-muted-foreground hover:text-foreground transition-colors" href="#testimonials">
            AI Space
          </a>
          <a className="text-muted-foreground hover:text-foreground transition-colors" href="#contact">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-black/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <a
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
              href="#skills"
            >
              Skills
            </a>
            <a
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
              href="#about"
            >
              About
            </a>
            <a
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
              href="#testimonials"
            >
              AI Space
            </a>
            <a
              className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
              href="#contact"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
