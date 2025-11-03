import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-200/50 dark:border-gray-700/50 hover:border-accent/30 dark:hover:border-accent/30 relative overflow-hidden"
      whileHover={{ y: -5 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent-light/0 group-hover:from-accent/5 group-hover:to-accent-light/5 transition-all duration-300 pointer-events-none rounded-2xl" />
      <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-2">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus-ring"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View ${project.title} demo`}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
          {project.code && (
            <motion.a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus-ring"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`View ${project.title} code`}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard

