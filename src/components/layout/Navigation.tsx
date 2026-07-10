import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, personal } from '../../data/content'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-40 md:hidden"
      >
        <div className="flex items-center justify-between px-6 h-14">
          <a href="#hero" className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{personal.company}</span>
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/50"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-void/95 backdrop-blur-2xl pt-16 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
                  className="text-2xl text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
