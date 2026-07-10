import { motion } from 'framer-motion'
import { personal } from '../../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6 md:px-12 pb-28">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {personal.name} · {personal.company}
          </p>
          <p className="text-white/25 text-xs mt-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono text-[10px]">
              ↑↑↓↓←→←→BA
            </kbd>
            {' '}for terminal
          </p>
        </div>

        <motion.div
          className="flex items-center gap-2 text-[10px] font-mono text-white/20"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          All systems operational
        </motion.div>
      </div>
    </footer>
  )
}
