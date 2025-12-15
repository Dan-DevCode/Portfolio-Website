import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import SectionHead from '../components/SectionHead'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'danielsamarin.ai@gmail.com',
    href: 'mailto:danielsamarin.ai@gmail.com',
    ariaLabel: 'Send email to Daniel',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/dsamarin-ai',
    href: 'https://github.com/dsamarin-ai',
    ariaLabel: 'Visit GitHub profile',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/daniel--samarin',
    href: 'https://www.linkedin.com/in/daniel--samarin/',
    ariaLabel: 'Visit LinkedIn profile',
  },
]

function Contact() {
  useEffect(() => {
    document.title = 'Contact - Daniel Samarin'
  }, [])

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <SectionHead
          title="Get In Touch"
          subtitle="Whether it's internships, collaborations, or just trading ideas about AI and finance, feel free to reach out."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent-light/0 group-hover:from-accent/5 group-hover:to-accent-light/5 transition-all duration-500 pointer-events-none rounded-2xl" />
          <div className="relative z-10">
          <div className="space-y-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={method.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  aria-label={method.ariaLabel}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group focus-ring"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-lg group-hover:bg-accent transition-colors">
                    <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {method.label}
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {method.value}
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Feel free to reach out if you'd like to collaborate or just say hello!
            </p>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

