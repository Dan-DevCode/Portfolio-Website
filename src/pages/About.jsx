import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHead from '../components/SectionHead'

const skills = [
  'Python',
  'JavaScript',
  'HTML/CSS',
  'Node.js',
  'React',
  'Machine Learning',
  'AI/ML',
  'Project Management',
  'Team Leadership',
  'Communication',
  'Research',
  'Web Development',
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
            I'm an AI Engineer passionate about leveraging artificial intelligence and technology to solve complex problems and drive innovation. My work focuses on building intelligent systems that make a meaningful impact.
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-balance max-w-3xl mx-auto">
            Beyond engineering, I'm deeply passionate about innovation, business strategy, investments, stocks, and finance. I believe in the power of technology to transform industries and create value. I'm constantly exploring the intersection of AI, business, and finance to identify opportunities and drive growth.
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-balance max-w-3xl mx-auto">
            When I'm not building AI solutions, you'll find me analyzing market trends, exploring innovative business models, or diving deep into the latest developments in finance and technology.
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
              <h4 className="text-xl font-semibold mb-2 text-accent">🤖 AI & Innovation</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Constantly exploring cutting-edge AI technologies and their applications in solving real-world challenges. Passionate about staying at the forefront of innovation.
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
              <h4 className="text-xl font-semibold mb-2 text-accent">💼 Business & Strategy</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Deeply interested in business strategy, entrepreneurship, and how technology can transform industries and create value.
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
              <h4 className="text-xl font-semibold mb-2 text-accent">📈 Finance & Investments</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Passionate about financial markets, stock analysis, investments, and understanding how economic forces shape the technology landscape.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

