import { useEffect, useRef, useState } from 'react'

export function useMouseVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = now - lastPos.current.time
      if (dt < 16) return

      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const v = dist / dt

      setVelocity(Math.min(v * 10, 1))
      lastPos.current = { x: e.clientX, y: e.clientY, time: now }
    }

    const decay = setInterval(() => {
      setVelocity((v) => v * 0.92)
    }, 50)

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      clearInterval(decay)
    }
  }, [])

  return velocity
}
