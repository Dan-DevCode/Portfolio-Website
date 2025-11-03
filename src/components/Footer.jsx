import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/dsamarin-ai',
    ariaLabel: 'Visit GitHub profile',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/daniel--samarin/',
    ariaLabel: 'Visit LinkedIn profile',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:danielsamarin.ai@gmail.com',
    ariaLabel: 'Send email',
  },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Daniel Samarin. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={social.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  aria-label={social.ariaLabel}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors focus-ring"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

