"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; hue: number }[]
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!particlesRef.current.length) initParticles()
    }

    const initParticles = () => {
      const count = Math.floor((width * height) / 12000)
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1 + Math.random() * 2,
        hue: 290 + Math.random() * 140, // magenta -> lime
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    let t = 0
    const render = () => {
      t += 0.005
      const grd = ctx.createRadialGradient(
        width * 0.7,
        height * 0.3,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.6,
        Math.max(width, height)
      )
      grd.addColorStop(0, "#0b0b0f")
      grd.addColorStop(1, "#0b0b0f")
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, width, height)

      // glowing blobs
      const glowCount = 3
      for (let i = 0; i < glowCount; i++) {
        const gx = width * (0.2 + 0.6 * ((Math.sin(t + i) + 1) / 2))
        const gy = height * (0.2 + 0.6 * ((Math.cos(t * 0.8 + i) + 1) / 2))
        const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(width, height) * 0.6)
        const hueBase = [320, 180, 90][i]
        gr.addColorStop(0, `hsla(${hueBase}, 92%, 60%, 0.12)`)
        gr.addColorStop(1, "hsla(0, 0%, 0%, 0)")
        ctx.fillStyle = gr
        ctx.fillRect(0, 0, width, height)
      }

      const particles = particlesRef.current
      const mx = (mouseRef.current.x / width - 0.5) || 0
      const my = (mouseRef.current.y / height - 0.5) || 0

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx + mx * 0.2
        p.y += p.vy + my * 0.2
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
      }

      ctx.save()
      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, 0.35)`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // linking lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]; const b = particles[j]
          const dx = a.x - b.x; const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 90 * 90) {
            const alpha = 0.08 * (1 - dist2 / (90 * 90))
            ctx.strokeStyle = `hsla(200, 100%, 80%, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.restore()

      if (!prefersReduced) {
        rafRef.current = requestAnimationFrame(render)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(document.body)
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(render)
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMouseMove)
      ro.disconnect()
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 mix-blend-overlay opacity-[0.15] [background:radial-gradient(transparent,rgba(0,0,0,0.6)),repeating-conic-gradient(from_0deg,rgba(255,255,255,0.05)_0deg,rgba(255,255,255,0.05)_1deg,transparent_1deg,transparent_12deg)]" />
    </div>
  )
}
