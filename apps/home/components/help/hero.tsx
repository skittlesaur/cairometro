import { useEffect, useRef } from 'react'

interface HeroProps {
  children: React.ReactNode
}
const Hero = ({ children }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // animate the canvas to have dots moving around with a rainbow blur effect on them
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const dots: { x: number, y: number, vx: number, vy: number }[] = []
    const dotsCount = 50
    const dotsRadius = 3
    const dotsSpeed = 3

    const clear = (color = '#fff') => {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const update = () => {
      for (let i = 0; i < dotsCount; i++) {
        dots[i].x += dots[i].vx
        dots[i].y += dots[i].vy

        if (dots[i].x < 0 || dots[i].x > canvas.width)
          dots[i].vx = -dots[i].vx
        if (dots[i].y < 0 || dots[i].y > canvas.height)
          dots[i].vy = -dots[i].vy
      }

      draw()
    }

    const draw = () => {
      clear('rgba(255,255,255,0.3)')

      for (let i = 0; i < dotsCount; i++) {
        ctx.fillStyle = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ')'
        ctx.fillRect(dots[i].x, dots[i].y, dotsRadius, dotsRadius)
      }

      setTimeout(update, 1000 / 60)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      for (let i = 0; i < dotsCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * dotsSpeed * 2 - dotsSpeed,
          vy: Math.random() * dotsSpeed * 2 - dotsSpeed,
        })
      }

      draw()
    }

    init()
  }, [])

  return (
    <div className="overflow-hidden relative w-screen h-[40vh] border-b border-neutral-200 flex items-center justify-center">
      <div className="bg-gradient-to-r from-transparent via-white to-transparent px-14 py-5 relative z-[1]">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  )
}

export default Hero