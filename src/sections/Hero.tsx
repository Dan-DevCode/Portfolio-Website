import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { personal } from '../data/content'
import MorphingRoles from '../components/ui/MorphingRoles'
import MagneticButton from '../components/ui/MagneticButton'
import LightBeams from '../components/effects/LightBeams'
import { Download, ArrowDown, Mail, Sparkles } from 'lucide-react'

export default function Hero() {
  const [introComplete, setIntroComplete] = useState(false)
  const name = personal.name.split(' ')
  const { scrollYProgress } = useScroll()
  const cameraY = useTransform(scrollYProgress, [0, 0.3], [0, 150])
  const cameraScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  useEffect(() => {
    const timer = setTimeout(() => setIntroComplete(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-28 pb-20 overflow-hidden"
    >
      <LightBeams />

      <motion.div
        style={{ y: cameraY, scale: cameraScale, opacity: heroOpacity }}
        className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10"
      >
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03] backdrop-blur-md text-[11px] text-white/50 tracking-[0.2em] uppercase">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {personal.company} · Neural Interface v2
            </span>
          </motion.div>

          <div className="overflow-hidden mb-3">
            {name.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] text-white"
                  initial={{ y: '110%', rotateX: 40 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.7 + i * 0.12,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    mass: 1.2,
                  }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-6"
          >
            <MorphingRoles />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 20 }}
            className="text-base md:text-xl text-white/40 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <MagneticButton
              href={personal.resume}
              download
              glowColor="rgba(59,130,246,0.5)"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accent to-accent-purple text-white font-medium"
            >
              <Download className="w-4 h-4" />
              Download CV
            </MagneticButton>
            <MagneticButton
              href="#contact"
              glowColor="rgba(34,211,238,0.4)"
              className="px-8 py-3.5 rounded-full border border-white/12 text-white/70 font-medium backdrop-blur-sm"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-10 text-xs italic text-white/25 font-light flex items-center justify-center lg:justify-start gap-2"
          >
            <Sparkles className="w-3 h-3 text-accent-cyan/50" />
            "{personal.quote}"
          </motion.p>
        </div>

        <motion.div
          className="order-1 lg:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.3, rotateY: -45 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 80, damping: 15, mass: 1.5 }}
          style={{ perspective: 1200 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-8 rounded-full blur-3xl"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <motion.div
              className="relative w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06, rotateY: 8, rotateX: -6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/30 via-accent-purple/20 to-accent-cyan/30 blur-sm" />
              <div className="absolute inset-0 rounded-full border border-white/15 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md" />
              <div className="absolute inset-1.5 rounded-full overflow-hidden ring-1 ring-white/20">
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-accent/5" />
              </div>

              <motion.div
                className="absolute inset-0 rounded-full border border-accent-cyan/20"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />

              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#22d3ee' : '#a855f7',
                    top: `${15 + i * 20}%`,
                    right: `${-8 - i * 2}%`,
                  }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 1, 0.3],
                    x: [0, 5, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {introComplete && (
          <motion.a
            href="#projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors z-10"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  )
}
