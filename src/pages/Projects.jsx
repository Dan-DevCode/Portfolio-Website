import { useEffect } from 'react'
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
]

function Projects() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

