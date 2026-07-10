import { motion } from 'framer-motion'
import { personal } from '../data/content'
import RevealOnScroll from '../components/ui/RevealOnScroll'
import MagneticButton from '../components/ui/MagneticButton'
import { Mail, Github, Linkedin, Send } from 'lucide-react'

const methods = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: '#3b82f6',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'dsamarin-ai',
    href: personal.github,
    color: '#a855f7',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'daniel--samarin',
    href: personal.linkedin,
    color: '#22d3ee',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-accent-cyan/60 mb-4 block">
              05 — Contact
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
              Let's build
              <br />
              <span className="bg-gradient-to-r from-white/80 to-white/30 bg-clip-text text-transparent">
                something extraordinary
              </span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              Internships, collaborations, or trading ideas about AI and finance — I'm all ears.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {methods.map((method, i) => {
            const Icon = method.icon
            return (
              <RevealOnScroll key={method.label} delay={i * 0.1}>
                <motion.a
                  href={method.href}
                  target={method.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="block p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/15 transition-all group text-center"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center transition-colors"
                    style={{ background: `${method.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: method.color }} />
                  </div>
                  <div className="text-xs text-white/30 uppercase tracking-wider mb-1">
                    {method.label}
                  </div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {method.value}
                  </div>
                </motion.a>
              </RevealOnScroll>
            )
          })}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="text-center">
            <MagneticButton
              href={`mailto:${personal.email}`}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-accent via-accent-purple to-accent-cyan text-white font-medium text-lg shadow-lg shadow-accent/20"
            >
              <Send className="w-5 h-5" />
              Start a Conversation
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
