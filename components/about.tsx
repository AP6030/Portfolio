"use client"

export default function About() {
  const timeline = [
    {
      year: "2022",
      title: "Foundations",
      desc: "I began my college journey, focusing on understanding foundational concepts and how things work in the real world.",
    },
    {
      year: "2023",
      title: "AI Entry",
      desc: "I dove into AI, machine learning, and deep learning. Gaming interests led me to explore how AI is applied there. I also learned web basics: HTML, CSS, JavaScript.",
    },
    {
      year: "2024",
      title: "Data Science Exploration",
      desc: "I dedicated significant time to data science and related topics—exploring and navigating diverse domains in tech.",
    },
    {
      year: "2025",
      title: "Building Advanced Projects",
      desc: "As a third-year student, I built a SMART Cart system with OpenCV and a basic mod menu for GTA V using Script Hook V.",
    },
  ]

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-28">
      <h2 className="mb-6 sm:mb-8 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-bold text-transparent">
        About Me
      </h2>
      <p className="mb-8 sm:mb-10 max-w-prose text-sm sm:text-base text-muted-foreground">
        {
          "My name is Aryan Patel. I'm an engineer, coder, and gamer with a deep curiosity for the world of tech and culture. Whatever I pursue, I do so with unwavering dedication."
        }
      </p>

      <div className="relative">
        <div className="absolute left-3 sm:left-4 top-0 h-full w-[2px] rounded bg-gradient-to-b from-fuchsia-500/70 via-cyan-400/70 to-lime-400/70" />
        <div className="space-y-6 sm:space-y-8 pl-8 sm:pl-10">
          {timeline.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute left-0 top-1 h-3 w-3 -translate-x-1 rounded-full bg-gradient-to-tr from-fuchsia-400 via-cyan-300 to-lime-300 shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 sm:p-4">
                <div className="text-xs text-muted-foreground">{item.year}</div>
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
