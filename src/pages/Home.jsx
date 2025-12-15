import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import TypingText from '../components/TypingText'

function Home() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    document.title = 'Daniel Samarin - Portfolio'
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Profile Picture */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl ring-4 ring-accent/20 dark:ring-accent/30">
                <img
                  src="/Profile Picture.jpg"
                  alt="Daniel Samarin"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Animated ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-accent/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Daniel Samarin
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            AI Engineering Student • Building Data-Driven Products in Finance, Real Estate & Health
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            I design and build intelligent, scalable systems — from AI investment dashboards to real-estate valuation tools and digital health concepts.
          </motion.p>
          <motion.div
            className="mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <TypingText
              text="The man who fears God fears nothing else"
              speed={60}
              className="text-base md:text-lg lg:text-xl italic text-gray-600 dark:text-gray-400 text-center font-light leading-relaxed"
            />
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.a
              href="/Daniel-Samarin_Resume.pdf"
              download
              className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent-light text-white rounded-lg font-medium hover:from-accent-dark hover:to-accent shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all focus-ring group overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Download CV</span>
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:border-accent hover:text-accent transition-all focus-ring group overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent-light/0 group-hover:from-accent/10 group-hover:to-accent-light/10 transition-all duration-300 rounded-lg" />
                <Mail className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Get In Touch</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Home

