export const personal = {
  name: 'Daniel Samarin',
  email: 'danielsamarin.ai@gmail.com',
  github: 'https://github.com/dsamarin-ai',
  linkedin: 'https://www.linkedin.com/in/daniel--samarin/',
  resume: '/Daniel-Samarin_Resume.pdf',
  profileImage: '/Profile Picture.jpg',
  quote: 'The man who fears God fears nothing else',
  roles: [
    'AI Engineer',
    'Builder',
    'Problem Solver',
    'Entrepreneur',
    'Machine Learning Developer',
    'Full Stack Developer',
  ],
  tagline: 'Engineering intelligent systems that scale from prototype to production.',
  company: 'DS Labs',
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  features: string[]
  stack: string[]
  stats: { label: string; value: string }[]
  images?: string[]
  demo: string | null
  code: string | null
  color: string
  accent: string
}

export const projects: Project[] = [
  {
    id: 'catalog-generator',
    title: 'AI Multilingual Product Catalog Generator',
    tagline: 'Cloud-native AI workflow for automated multilingual catalog generation.',
    description:
      'Developed a cloud-based AI workflow system for automated multilingual product catalog generation using AWS services and Python — from image ingestion to translated, validated product listings.',
    features: [
      'Automated image upload and processing workflows using Amazon S3 and Rekognition',
      'AI-driven multilingual translation pipelines using AWS Translate APIs',
      'Backend orchestration for workflow automation and API integration',
      'Validation systems and error-handling logic for reliability and input consistency',
    ],
    stack: ['Python', 'AWS S3', 'Rekognition', 'Translate API', 'REST APIs'],
    stats: [
      { label: 'AWS Services', value: '4+' },
      { label: 'Languages', value: 'Multi' },
      { label: 'Pipelines', value: 'Auto' },
    ],
    demo: null,
    code: null,
    color: '#ff9900',
    accent: '#3b82f6',
  },
  {
    id: 'sentiment-analysis',
    title: 'Amazon Fashion Review Sentiment Analysis',
    tagline: 'Large-scale NLP pipelines for product review classification.',
    description:
      'Built and evaluated NLP sentiment analysis pipelines using Python and machine learning models for large-scale Amazon fashion product review classification.',
    features: [
      'Text preprocessing, tokenization, and lemmatization',
      'Sentiment classification using Logistic Regression and Naive Bayes',
      'NLP analysis using VADER and SentiWordNet',
      'Model evaluation through confusion matrices and classification metrics',
    ],
    stack: ['Python', 'scikit-learn', 'NLP', 'VADER', 'SentiWordNet'],
    stats: [
      { label: 'Models', value: '4' },
      { label: 'Reviews', value: '10K+' },
      { label: 'Metrics', value: 'F1/AUC' },
    ],
    demo: null,
    code: null,
    color: '#a855f7',
    accent: '#22d3ee',
  },
  {
    id: 'simplewealth',
    title: 'SimpleWealth',
    tagline: 'Personal finance & investment tracking with clarity over speculation.',
    description:
      'Full-stack personal finance and investment tracking platform focused on portfolio monitoring, contribution analysis, and long-term performance visualization — designed for realistic financial insights, not speculative forecasting.',
    features: [
      'Financial tracking and portfolio analysis features',
      'Interactive dashboards for investment and performance visualization',
      'Backend services for contributions, balances, and return calculations',
      'Clean UI/UX principles for accessibility and usability',
    ],
    stack: ['Python', 'Flask', 'React', 'MongoDB', 'REST APIs', 'JavaScript'],
    stats: [
      { label: 'Dashboards', value: '3+' },
      { label: 'Metrics', value: '12+' },
      { label: 'Stack', value: 'Full' },
    ],
    demo: null,
    code: null,
    color: '#22d3ee',
    accent: '#3b82f6',
  },
  {
    id: 'urgeease',
    title: 'UrgeEase',
    tagline: 'AI-powered recovery support with RAG-driven contextual assistance.',
    description:
      'Built and integrated backend and AI-driven features for a full-stack recovery support platform using Next.js, Flask, MongoDB, and Python — with RAG pipelines and modular architecture for contextual AI interactions.',
    features: [
      'REST API workflows for authentication, chat sessions, assessments, and recovery planning',
      'RAG-based AI pipelines using LangChain and FAISS vector search',
      'AI-assisted dashboard systems and session management workflows',
      'API testing and validation using Postman and structured test cases',
      'Scalable modular architecture for contextual AI and ML-driven services',
    ],
    stack: ['Python', 'Flask', 'Next.js', 'MongoDB', 'LangChain', 'FAISS', 'Postman'],
    stats: [
      { label: 'API Routes', value: '15+' },
      { label: 'RAG', value: 'FAISS' },
      { label: 'Stack', value: 'Full' },
    ],
    demo: null,
    code: null,
    color: '#6366f1',
    accent: '#a855f7',
  },
]

export interface Milestone {
  year: string
  title: string
  subtitle: string
  type: 'education' | 'experience' | 'achievement'
}

export const milestones: Milestone[] = [
  {
    year: '2022',
    title: 'AI Engineering Foundations',
    subtitle: 'Formal education in artificial intelligence and machine learning.',
    type: 'education',
  },
  {
    year: '2023',
    title: 'AWS & Cloud AI Workflows',
    subtitle: 'Built multilingual catalog generation with S3, Rekognition, and Translate.',
    type: 'achievement',
  },
  {
    year: '2024',
    title: 'NLP & Sentiment Analysis',
    subtitle: 'Large-scale Amazon fashion review classification with ML and NLP pipelines.',
    type: 'achievement',
  },
  {
    year: '2024',
    title: 'SimpleWealth Platform',
    subtitle: 'Shipped full-stack finance tracking with Flask, React, and MongoDB.',
    type: 'experience',
  },
  {
    year: '2025',
    title: 'UrgeEase — RAG Recovery Platform',
    subtitle: 'Integrated LangChain, FAISS, and Next.js for AI-driven recovery support.',
    type: 'achievement',
  },
  {
    year: 'Now',
    title: 'Building at the Frontier',
    subtitle: 'Shipping production AI systems across cloud, NLP, and full-stack domains.',
    type: 'achievement',
  },
]

export interface SkillNode {
  name: string
  category: 'language' | 'framework' | 'ml' | 'cloud' | 'tool'
  proficiency: number
  x: number
  y: number
}

export const skills: SkillNode[] = [
  { name: 'Python', category: 'language', proficiency: 95, x: 50, y: 12 },
  { name: 'AWS', category: 'cloud', proficiency: 88, x: 78, y: 22 },
  { name: 'React', category: 'framework', proficiency: 90, x: 22, y: 28 },
  { name: 'Flask', category: 'framework', proficiency: 88, x: 68, y: 38 },
  { name: 'Next.js', category: 'framework', proficiency: 85, x: 38, y: 42 },
  { name: 'LangChain', category: 'ml', proficiency: 86, x: 82, y: 55 },
  { name: 'scikit-learn', category: 'ml', proficiency: 90, x: 18, y: 58 },
  { name: 'MongoDB', category: 'tool', proficiency: 85, x: 55, y: 68 },
  { name: 'FAISS', category: 'ml', proficiency: 82, x: 72, y: 72 },
  { name: 'NLP', category: 'ml', proficiency: 88, x: 30, y: 75 },
  { name: 'REST APIs', category: 'tool', proficiency: 92, x: 48, y: 22 },
  { name: 'TypeScript', category: 'language', proficiency: 88, x: 62, y: 82 },
]

export const interests = [
  {
    title: 'Cloud AI Systems',
    description: 'AWS-native workflows, multimodal pipelines, and production-grade orchestration.',
    icon: '◈',
  },
  {
    title: 'NLP & Machine Learning',
    description: 'Sentiment analysis, RAG architectures, and model evaluation at scale.',
    icon: '◇',
  },
  {
    title: 'Full-Stack Products',
    description: 'End-to-end platforms from API design to polished, accessible interfaces.',
    icon: '◆',
  },
]

export const navLinks = [
  { label: 'Home', href: '#hero', icon: 'home' },
  { label: 'Work', href: '#projects', icon: 'layers' },
  { label: 'About', href: '#about', icon: 'user' },
  { label: 'Skills', href: '#skills', icon: 'orbit' },
  { label: 'Journey', href: '#experience', icon: 'timeline' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
]