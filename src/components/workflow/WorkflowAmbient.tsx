const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 17) % 84),
  y: 6 + ((i * 23) % 88),
  size: 1 + (i % 3),
  delay: (i % 7) * 0.8,
  duration: 10 + (i % 5) * 2,
}))

export default function WorkflowAmbient() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-accent-cyan/30 animate-particleDrift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: '0 0 6px rgba(34, 211, 238, 0.25)',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(99,102,241,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(34,211,238,0.04),transparent_45%)]" />
    </div>
  )
}
