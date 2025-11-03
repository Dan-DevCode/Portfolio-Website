import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHead from '../components/SectionHead'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    title: 'Church Website',
    description:
      "Working with a team to develop a comprehensive website for our church using HTML, CSS, JavaScript, and Node.js. The platform features a homepage, event calendar, donation system, and member resources. We're implementing modern web development practices to ensure the site is responsive, accessible, and SEO-friendly. The project involves API integration, database management, user authentication, and cloud deployment for reliability and scalability. The goal is to help the church community stay updated and connected.",
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'APIs', 'Database Management', 'SEO'],
    demo: null,
    code: null,
  },
  {
    title: 'Hangry - Application',
    description:
      "A comprehensive meal planning and ingredient inventory management application designed to help home cooks reduce food waste and improve meal planning efficiency. The app integrates recipe management, meal scheduling, ingredient inventory tracking with expiration dates, automated shopping list generation, and budget management. Built with a focus on user experience, it provides a seamless all-in-one solution for home cooks to organize recipes, plan meals, track ingredients, and manage costs effectively.",
    stack: ['Project Management', 'Team Leadership', 'Product Design', 'User Experience'],
    demo: null,
    code: null,
  },
  {
    title: 'Remote Patient Monitoring System (RPMS)',
    description:
      'A digital health solution designed to improve patient care through remote monitoring of vital signs including heart rate, blood pressure, and oxygen saturation. The system enables healthcare providers to diagnose, manage, and intervene in patient care without requiring in-person visits, especially beneficial for patients in remote or rural areas. RPMS enhances healthcare access, optimizes resource allocation in clinics and hospitals, manages chronic illnesses through continuous monitoring, and improves patient engagement in self-care.',
    stack: ['Project Management', 'Healthcare Technology', 'Research', 'System Design', 'Team Collaboration'],
    demo: null,
    code: null,
  },
  {
    title: 'Google BigQuery Architecture Analysis',
    description:
      'An in-depth exploration of Google\'s cloud-based data warehouse platform, analyzing its architecture, performance, and scalability. The project involved researching key components including BigQuery\'s serverless design, columnar storage (Capacitor), compute engine (Dremel), and integration with Google Cloud services like Dataflow, Pub/Sub, and Looker Studio. Included comparative research with competitors such as Snowflake, Amazon Redshift, and Azure Synapse Analytics, focusing on pricing models, performance, and cloud flexibility. This analysis strengthened understanding of modern data warehousing, distributed systems, and how serverless architecture enhances scalability and cost optimization in enterprise data analytics.',
    stack: ['Cloud Computing', 'Data Warehousing', 'Research', 'BigQuery', 'SQL', 'Google Cloud Platform (GCP)', 'Analytical Thinking'],
    demo: null,
    code: null,
  },
  {
    title: 'Workforce Outsourcing Platform – Entrepreneurship Project',
    description:
      'Developed as part of an entrepreneurship course to address hiring challenges faced by early-stage startups. The platform connects new tech businesses with qualified professionals through an AI-driven matching system that uses data analysis to generate compatibility scores between companies and candidates. Designed the business model, conducted market analysis, and explored technical feasibility of integrating cloud-based infrastructure and machine learning for intelligent recruitment. Identified critical industry forces, developed a value proposition, and validated the concept through interviews, prototype testing, and user feedback. The goal was to provide a cost-effective, efficient, and scalable hiring solution that helps startups focus on growth while simplifying workforce management.',
    stack: ['Entrepreneurship', 'Business Development', 'Teamwork', 'Market Research', 'Cloud Computing', 'Artificial Intelligence (AI)', 'Communication', 'Problem Solving'],
    demo: null,
    code: null,
  },
  {
    title: 'Neural Networks',
    description:
      'A full-stack AI solution integrating a trained TensorFlow neural network model with a modern web interface and backend API framework. The system demonstrates real-world AI applications relevant to Canada 2026, tackling problems such as healthcare analytics, sustainability, finance, or education. The backend was built using Flask with MVC-style modular architecture, exposing RESTful endpoints for prediction, summarization (via Gemini API), chatbot interaction, and system health checks. The frontend was developed using React 19 + Vite, styled with React-Bootstrap, and includes screens for data input, model predictions, GenAI summaries, chatbot responses, and visualization dashboards with accuracy/loss charts and confusion matrices. The project demonstrates complete end-to-end integration between machine learning, cloud-based APIs, and responsive UI design.',
    stack: ['Artificial Intelligence (AI)', 'Neural Networks', 'TensorFlow', 'Machine Learning', 'Flask', 'React', 'Vite', 'API Development', 'Gemini API Integration', 'Teamwork', 'Project Management', 'Cloud Deployment', 'Data Visualization', 'Ethical AI'],
    demo: null,
    code: null,
  },
]

function Projects() {
  const [showAll, setShowAll] = useState(false)
  const initialProjectsToShow = 3
  const projectsToShow = showAll ? projects : projects.slice(0, initialProjectsToShow)
  const hasMoreProjects = projects.length > initialProjectsToShow

  useEffect(() => {
    document.title = 'Projects - Daniel Samarin'
  }, [])

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          title="Projects"
          subtitle="A collection of projects I've worked on, showcasing my skills in web development, AI solutions, and project management."
        />
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectsToShow.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
            ))}
          </div>
        </AnimatePresence>
        
        {hasMoreProjects && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:border-accent hover:text-accent transition-all focus-ring group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{showAll ? 'Show Less' : 'Show More'}</span>
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects

