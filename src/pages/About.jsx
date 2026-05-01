import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHead from '../components/SectionHead'

const skills = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'SQL',
  'C#',
  'React',
  'Vite',
  'Tailwind CSS',
  'FastAPI',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'TensorFlow',
  'scikit-learn',
  'basic NLP pipelines',
  'Git/GitHub',
  'Linux/Unix',
  'Postman',
  'Docker (basics)',
  'REST APIs',
]

const additionalSkills = [
  'Project management',
  'Team collaboration',
  'Technical communication',
  'Research & analysis',
]

function About() {
  const skillsRef = useRef(null)
  const timelineRef = useRef(null)
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 })
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 })

  useEffect(() => {
    document.title = 'About - Daniel Samarin'
  }, [])

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHead
          title="About Me"
          subtitle="A brief introduction to who I am and what I do."
        />

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-balance max-w-3xl mx-auto">
            I'm an AI engineering student who loves building intelligent, data-driven systems. Most of my work lives at the intersection of AI, backend development, and finance, where I focus on turning messy data into tools that people can actually use.
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-balance max-w-3xl mx-auto">
            Recently, I've been working on projects like SimpleGrowth, an AI investment dashboard for ETFs, stocks, and crypto, and RenovaIQ, a real-estate valuation and renovation ROI planner. I enjoy designing clean APIs, solid architecture, and frontends that make complex things feel simple.
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-balance max-w-3xl mx-auto">
            Outside of coding, I'm constantly learning about financial markets, business strategy, and how technology creates real-world value. You'll usually find me experimenting with new ideas, reading market news, or refining side projects late at night.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Skills</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  skillsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gradient-to-r hover:from-accent hover:to-accent-light hover:text-white transition-all cursor-default shadow-sm hover:shadow-md hover:scale-105"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Additional Skills</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  skillsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gradient-to-r hover:from-accent hover:to-accent-light hover:text-white transition-all cursor-default shadow-sm hover:shadow-md hover:scale-105"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Interests & Passions */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Interests & Passions</h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                timelineInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0, duration: 0.5 }}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/30 dark:hover:border-accent/30 transition-all hover:shadow-lg text-center"
            >
              <h4 className="text-xl font-semibold mb-2 text-accent"> AI & Innovation</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Exploring modern AI techniques and how they can be applied to real-world problems in finance, real estate, and healthcare.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                timelineInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/30 dark:hover:border-accent/30 transition-all hover:shadow-lg text-center"
            >
              <h4 className="text-xl font-semibold mb-2 text-accent"> Business & Strategy</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Interested in business models, entrepreneurship, and how technology can unlock new value in traditional industries.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                timelineInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/30 dark:hover:border-accent/30 transition-all hover:shadow-lg text-center"
            >
              <h4 className="text-xl font-semibold mb-2 text-accent"> Finance & Investments</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Curious about markets, portfolio construction, and long-term wealth building. A lot of my side projects are basically excuses to build tools I'd actually use myself.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

