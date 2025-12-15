import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import SectionHead from '../components/SectionHead'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    title: 'SimpleGrowth – AI Investment Dashboard',
    tagline: 'AI-powered portfolio insights for ETFs, stocks, and crypto.',
    description:
      'SimpleGrowth is a full-stack investment dashboard that analyzes ETFs, stocks, and crypto assets using Python, FastAPI, and machine learning models. It provides an interactive interface for exploring portfolio risk, asset performance, and long-term growth scenarios, with recommendations tailored to user goals. The focus is on turning complex market data into clear, actionable insights for everyday investors.',
    stack: ['Python', 'FastAPI', 'React', 'Vite', 'TypeScript', 'TensorFlow', 'REST APIs', 'PostgreSQL/MongoDB'],
    demo: null,
    code: null,
    displayImages: [
      '/simplegrowth-landing-page.png',
      '/simplegrowth-dashboard.png',
      '/simplegrowth-daily-briefing.png',
      '/simplegrowth-ai-insights.png',
      '/simplegrowth-signup-page.png',
    ],
  },
  {
    title: 'RenovaIQ – AI Real Estate Valuation & Renovation ROI Planner',
    tagline: 'Predict property value and renovation ROI before spending a dollar.',
    description:
      'RenovaIQ is an AI-driven real estate analytics tool that estimates current property value, post-renovation value, ROI, profit, and risk based on property details and renovation plans. The system combines regression-style models with renovation-cost logic to help homeowners and investors compare different upgrade scenarios. An interactive dashboard visualizes value changes and highlights the highest-impact improvements.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Python', 'ML/Regression', 'Data Visualization'],
    demo: null,
    code: null,
  },
  {
    title: 'Remote Patient Monitoring System (RPMS)',
    tagline: 'Concept platform for tracking vitals and supporting chronic care.',
    description:
      'RPMS is a digital health concept focused on remotely monitoring patient vitals such as heart rate, blood pressure, and oxygen saturation. The system is designed to help clinicians manage chronic conditions, prioritize high-risk patients, and extend care to remote or rural communities. The project explores system architecture, data flows, alert logic, and UX for both patients and healthcare providers.',
    stack: ['System Design', 'Healthcare Technology', 'Research', 'Data Modeling', 'UX Planning'],
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
          subtitle="A selection of projects that sit at the intersection of AI, backend engineering, and applied domains like finance, real estate, and digital health. I care about building systems that are technically solid and genuinely useful in the real world."
        />
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects

