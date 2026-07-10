import { useRef, useState, MouseEvent, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  download?: boolean | string
  target?: string
  rel?: string
  glowColor?: string
}

interface Ripple {
  id: number
  x: number
  y: number
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  download,
  target,
  rel,
  glowColor = 'rgba(59,130,246,0.4)',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [hovering, setHovering] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [proximity, setProximity] = useState(0)

  const x = useSpring(0, { stiffness: 180, damping: 12, mass: 0.8 })
  const y = useSpring(0, { stiffness: 180, damping: 12, mass: 0.8 })
  const rotateX = useSpring(0, { stiffness: 200, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 18 })
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  const glowOpacity = useTransform(scale, [0.95, 1, 1.05], [0.6, 0.3, 0.8])

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = Math.max(rect.width, rect.height)

    x.set(dx * 0.35)
    y.set(dy * 0.35)
    rotateX.set((dy / rect.height) * -12)
    rotateY.set((dx / rect.width) * 12)
    const prox = Math.max(0, 1 - dist / maxDist)
    setProximity(prox)
    scale.set(1.02 + prox * 0.03)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    setProximity(0)
    setHovering(false)
  }

  const spawnRipple = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const ripple: Ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600)
  }, [])

  const handleClick = (e: MouseEvent) => {
    spawnRipple(e)
    onClick?.()
  }

  const motionProps = {
    style: { x, y, rotateX, rotateY, scale, transformStyle: 'preserve-3d' as const },
    onMouseMove: handleMove,
    onMouseEnter: () => setHovering(true),
    onMouseLeave: handleLeave,
    onClick: handleClick,
    whileTap: { scale: 0.94 },
    className: `relative inline-flex items-center justify-center gap-2 overflow-hidden ${className}`,
  }

  const inner = (
    <>
      <motion.span
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ opacity: glowOpacity }}
        animate={{
          boxShadow: hovering
            ? `0 0 ${20 + proximity * 30}px ${glowColor}, inset 0 0 ${10 + proximity * 20}px ${glowColor}`
            : '0 0 0px transparent',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      <span
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          opacity: hovering ? 0.15 + proximity * 0.2 : 0,
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
        }}
      />

      <motion.span
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        animate={{ rotate: hovering ? 360 : 0 }}
        transition={{ duration: 4, repeat: hovering ? Infinity : 0, ease: 'linear' }}
        style={{
          background: `conic-gradient(from 0deg, transparent, ${glowColor}, transparent, ${glowColor}40, transparent)`,
          opacity: hovering ? 0.4 + proximity * 0.3 : 0,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: glowColor,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
          animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {hovering &&
        Array.from({ length: 3 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{ background: glowColor }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 60,
              y: (Math.random() - 0.5) * 60,
              opacity: 0,
            }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
        ))}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    const safeRel = target === '_blank' ? rel ?? 'noopener noreferrer' : rel
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={safeRel}
        {...motionProps}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} {...motionProps}>
      {inner}
    </motion.button>
  )
}
