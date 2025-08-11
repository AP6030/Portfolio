import AnimatedBackground from "@/components/animated-background"
import Nav from "@/components/nav"
import HeaderHero from "@/components/header-hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import About from "@/components/about"
import AISpace from "@/components/ai-space"
import Contact from "@/components/contact"
import CustomCursor from "@/components/custom-cursor"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden cursor-none">
      <CustomCursor />
      <AnimatedBackground />
      <div className="relative z-10">
        <Nav />
        <HeaderHero />
        <Skills />
        <Projects />
        <About />
        <AISpace />
        <Contact />
        <footer className="py-10 text-center text-sm text-muted-foreground">
          <p>
            {"© "}
            {new Date().getFullYear()} Aryan Patel — Crafted with care.
          </p>
        </footer>
      </div>
    </main>
  )
}
