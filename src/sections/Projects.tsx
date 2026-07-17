import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { projects, type Project } from '../data/content'
import { projectWorkflowMap } from '../data/workflow'
import { useWorkflow } from '../context/WorkflowContext'
import RevealOnScroll from '../components/ui/RevealOnScroll'
import MagneticButton from '../components/ui/MagneticButton'
import ProjectVisual from '../components/ui/ProjectVisual'
import { ExternalLink, Github, Check, GitBranch } from 'lucide-react'

function AnimatedMetric({ value, label, color }: { value: string; label: string; color: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const num = parseInt(value)
    if (isNaN(num)) {
      setDisplay(value)
      return
    }
    let frame = 0
    const total = 30
    const interval = setInterval(() => {
      frame++
      setDisplay(String(Math.round((num * frame) / total)))
      if (frame >= total) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center relative overflow-hidden group"
      whileHover={{ y: -4, borderColor: `${color}40` }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `radial-gradient(circle at center, ${color}10, transparent)` }}
      />
      <div className="text-2xl font-bold text-white relative">{display}{value.includes('+') ? '+' : ''}</div>
      <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider relative">{label}</div>
    </motion.div>
  )
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { openProjectWorkflow } = useWorkflow()
  const hasWorkflow = !!projectWorkflowMap[project.id]

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
    mass: 0.8,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 18,
    mass: 0.8,
  })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <RevealOnScroll delay={index * 0.1} variant="assemble">
      <div
        className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center py-8 ${
          index % 2 === 1 ? '' : ''
        }`}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
          className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ boxShadow: `0 30px 100px -30px ${project.color}40` }}
          >
            <ProjectVisual project={project} />
          </div>
          <motion.div
            className="absolute -z-10 inset-6 rounded-2xl blur-3xl"
            style={{ background: project.color }}
            animate={{ opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>

        <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '3rem' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-px mb-6"
            style={{ background: `linear-gradient(to right, ${project.color}, transparent)` }}
          />

          <span
            className="text-[10px] font-mono tracking-[0.3em] uppercase px-3 py-1 rounded-full border mb-4 inline-block"
            style={{ borderColor: `${project.color}40`, color: project.color }}
          >
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="text-base md:text-lg mb-6" style={{ color: project.accent }}>
            {project.tagline}
          </p>
          <p className="text-white/45 leading-relaxed mb-8 text-sm md:text-base">{project.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {project.stats.map((stat) => (
              <AnimatedMetric
                key={stat.label}
                value={stat.value}
                label={stat.label}
                color={project.color}
              />
            ))}
          </div>

          <div className="mb-8 space-y-2.5">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
                className="flex items-start gap-3 group"
              >
                <div
                  className="mt-0.5 p-0.5 rounded-full flex-shrink-0"
                  style={{ background: `${project.color}20` }}
                >
                  <Check className="w-3 h-3" style={{ color: project.color }} />
                </div>
                <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 400, damping: 20 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3 py-1 text-[11px] rounded-full border border-white/8 text-white/45 bg-white/[0.02] cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {hasWorkflow && (
              <MagneticButton
                onClick={() => openProjectWorkflow(project.id)}
                glowColor={`${project.color}50`}
                className="px-5 py-2.5 rounded-full border text-sm font-medium flex items-center gap-2"
                style={{
                  borderColor: `${project.color}40`,
                  color: project.color,
                  background: `${project.color}10`,
                }}
              >
                <GitBranch className="w-4 h-4" />
                View workflow behind this project
              </MagneticButton>
            )}
            {project.demo && (
              <MagneticButton
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                glowColor={`${project.color}60`}
                className="px-6 py-2.5 rounded-full bg-white text-void font-medium text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </MagneticButton>
            )}
            {project.code && (
              <MagneticButton
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                glowColor={`${project.accent}60`}
                className="px-6 py-2.5 rounded-full border border-white/15 text-white/70 text-sm"
              >
                <Github className="w-4 h-4" />
                Source
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll variant="cinematic">
          <div className="mb-24 md:mb-36">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-accent-cyan/50 mb-6 block">
              Product Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Systems shipped
              <br />
              <span className="bg-gradient-to-r from-accent via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                to production
              </span>
            </h2>
            <p className="text-white/35 mt-6 max-w-xl text-lg">
              Cloud AI workflows, NLP pipelines, and full-stack platforms — each built end-to-end.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-24 md:space-y-40">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
