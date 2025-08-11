"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      const el = e.target as HTMLElement | null
      const interactive =
        el?.closest("a, button, [role='button'], input, textarea, select, [contenteditable='true']") || null
      const hoverCursor = el?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor || "default"

      if (ringRef.current) {
        ringRef.current.dataset.state = interactive ? "interactive" : "default"
        ringRef.current.dataset.cursor = hoverCursor
      }

      // Show native caret over text inputs
      if (
        interactive &&
        (interactive.tagName === "INPUT" || interactive.tagName === "TEXTAREA" || interactive.tagName === "SELECT")
      ) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }

    const onEnter = () => setHidden(false)
    const onLeave = () => setHidden(true)

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseenter", onEnter)
    window.addEventListener("mouseleave", onLeave)

    let raf: number
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2
      pos.current.y += (target.current.y - pos.current.y) * 0.2
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseenter", onEnter)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[60] hidden md:block ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{
          width: 24,
          height: 24,
          borderRadius: 9999,
          transition: "opacity 150ms ease, transform 80ms ease-out, box-shadow 150ms ease, background 150ms ease",
          backdropFilter: "blur(2px)",
        }}
        data-state="default"
        data-cursor="default"
      />
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[60] hidden md:block ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: "linear-gradient(135deg, rgba(255,0,200,0.9), rgba(0,245,212,0.9))",
          boxShadow: "0 0 8px rgba(255,0,200,0.5), 0 0 8px rgba(0,245,212,0.5)",
          transform: "translate(-100px, -100px)",
          transition: "opacity 150ms ease",
        }}
      />
      <style>{`
        /* Default ring */
        [data-cursor="default"][data-state="default"] {
          box-shadow: 0 0 0 1px rgba(255,255,255,0.18), 0 0 20px rgba(255,0,200,0.22), 0 0 28px rgba(0,245,212,0.22);
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
        }
        [data-cursor="default"][data-state="interactive"] {
          width: 36px; height: 36px;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.25), 0 0 30px rgba(255,0,200,0.35), 0 0 40px rgba(0,245,212,0.35);
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
        }

        /* ChatGPT: emerald neon */
        [data-cursor="chatgpt"] {
          box-shadow: 0 0 0 1px rgba(16,185,129,0.45), 0 0 28px rgba(16,185,129,0.45), 0 0 44px rgba(16,185,129,0.30) !important;
          background: radial-gradient(circle at 50% 50%, rgba(16,185,129,0.20), rgba(16,185,129,0.08)) !important;
        }

        /* Gemini: cyan neon */
        [data-cursor="gemini"] {
          box-shadow: 0 0 0 1px rgba(34,211,238,0.45), 0 0 28px rgba(34,211,238,0.45), 0 0 44px rgba(34,211,238,0.30) !important;
          background: radial-gradient(circle at 50% 50%, rgba(34,211,238,0.20), rgba(34,211,238,0.08)) !important;
        }

        /* Grok: fuchsia neon */
        [data-cursor="grok"] {
          box-shadow: 0 0 0 1px rgba(217,70,239,0.45), 0 0 28px rgba(217,70,239,0.45), 0 0 44px rgba(236,72,153,0.30) !important;
          background: radial-gradient(circle at 50% 50%, rgba(217,70,239,0.20), rgba(217,70,239,0.08)) !important;
        }
      `}</style>
    </>
  )
}
