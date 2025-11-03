import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function AnimatedLink({ to, children, className = '', external = false, ...props }) {
  const baseClasses = 'inline-block transition-colors hover:text-accent focus-ring'
  const combinedClasses = `${baseClasses} ${className}`

  if (external) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    </motion.div>
  )
}

export default AnimatedLink

