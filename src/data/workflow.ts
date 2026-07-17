export interface WorkflowTool {
  id: string
  name: string
  shortLabel: string
  category: 'ide' | 'ai' | 'language' | 'frontend' | 'backend' | 'database' | 'cloud' | 'platform' | 'ml'
  color: string
  x: number
  y: number
  connections: string[]
  whyPersonal: string
  whenChoose: string
  problemsSolved: string
  workflowFit: string
  projectExamples: string[]
  strengths: string[]
}

export interface SuggestedWorkflow {
  id: string
  name: string
  tagline: string
  tools: string[]
  color: string
  purpose: string
  whyTogether: string
  dataFlow: string[]
  whenUse: string
  exampleProjects: string[]
  tradeoffs: string[]
  layoutPositions: Record<string, { x: number; y: number }>
}

export interface ProjectWorkflowLink {
  projectId: string
  workflowId: string
  tools: string[]
  journey: string[]
}

export const workflowTools: WorkflowTool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    shortLabel: 'Cr',
    category: 'ide',
    color: '#6366f1',
    x: 20,
    y: 18,
    connections: ['claude', 'typescript', 'python', 'react', 'github'],
    whyPersonal:
      'I treat Cursor as my engineering cockpit — not a autocomplete toy. It keeps me inside the codebase while I think, refactor, and ship.',
    whenChoose:
      'Every session. It is my default when I am building features, debugging production issues, or exploring architecture before committing to a design.',
    problemsSolved:
      'Slow context switching between docs, terminal, and editor. Large refactors that used to take hours. Getting unstuck without losing momentum.',
    workflowFit:
      'Everything starts here. I sketch in Cursor, validate with Claude, implement in Python or TypeScript, and push through GitHub.',
    projectExamples: ['UrgeEase', 'SimpleWealth', 'AI Catalog Generator', 'This portfolio'],
    strengths: ['Multi-file refactors', 'Test scaffolding', 'Architecture spikes before I commit'],
  },
  {
    id: 'claude',
    name: 'Claude',
    shortLabel: 'Cl',
    category: 'ai',
    color: '#d97706',
    x: 38,
    y: 12,
    connections: ['cursor', 'python', 'fastapi', 'langchain', 'openai'],
    whyPersonal:
      'Claude is the engineer I talk to when the problem is ambiguous — API contracts, RAG design, error-handling strategy, trade-offs I have not made yet.',
    whenChoose:
      'Before I write complex backend logic, when debugging distributed flows, or when I need a second opinion on system design.',
    problemsSolved:
      'Under-specified requirements. Messy debugging paths. Designing resilient APIs and RAG pipelines without over-engineering.',
    workflowFit:
      'Pairs with Cursor for implementation and Python for execution. I use it to think, then I build.',
    projectExamples: ['UrgeEase RAG architecture', 'Catalog Generator orchestration', 'API design reviews'],
    strengths: ['System design reviews', 'Debugging strategy', 'Robust error-handling patterns'],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    shortLabel: 'AI',
    category: 'ai',
    color: '#10b981',
    x: 55,
    y: 16,
    connections: ['python', 'langchain', 'fastapi', 'claude'],
    whyPersonal:
      'When I need embeddings or completions in production, OpenAI is the API I reach for first — predictable, well-documented, fast to integrate.',
    whenChoose:
      'Production AI features: embeddings for retrieval, structured completions, agent behaviors I need to ship this week.',
    problemsSolved:
      'Building embedding pipelines from scratch. Prototyping LLM features without training models. Standardizing AI outputs for APIs.',
    workflowFit:
      'Sits behind LangChain and FastAPI/Flask. Python calls the API; the frontend never touches keys directly.',
    projectExamples: ['UrgeEase conversational AI', 'RAG embedding pipelines'],
    strengths: ['Embedding pipelines', 'Structured API outputs', 'Rapid agent prototyping'],
  },
  {
    id: 'langchain',
    name: 'LangChain',
    shortLabel: 'LC',
    category: 'ml',
    color: '#22d3ee',
    x: 75,
    y: 14,
    connections: ['python', 'openai', 'faiss', 'mongodb', 'flask'],
    whyPersonal:
      'I use LangChain when retrieval and chaining logic would otherwise become spaghetti. It gives me patterns, not magic.',
    whenChoose:
      'Any RAG system, multi-step AI workflow, or when I need prompt templates and vector store glue without reinventing plumbing.',
    problemsSolved:
      'Ad-hoc LLM call chains. Inconsistent prompt management. Wiring embeddings to retrieval to generation cleanly.',
    workflowFit:
      'Python backend + OpenAI + FAISS + MongoDB. Flask exposes the chain; React renders the experience.',
    projectExamples: ['UrgeEase recovery support RAG', 'Document Q&A backends'],
    strengths: ['RAG chains', 'Prompt templates', 'Vector store integration'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    shortLabel: 'TS',
    category: 'language',
    color: '#3b82f6',
    x: 14,
    y: 38,
    connections: ['react', 'cursor', 'vercel', 'github'],
    whyPersonal:
      'TypeScript catches the bugs I would otherwise discover at 2am in production. I will not ship a React app without it.',
    whenChoose:
      'Every frontend, shared API contracts, and anywhere UI state touches backend shapes.',
    problemsSolved:
      'Runtime type errors. Drift between frontend and API contracts. Unmaintainable component props as apps grow.',
    workflowFit:
      'React + Vercel on the surface; GitHub for CI; Cursor for authoring.',
    projectExamples: ['This portfolio', 'SimpleWealth dashboards', 'UrgeEase frontend'],
    strengths: ['Strict mode configs', 'Shared API types', 'Component contracts'],
  },
  {
    id: 'python',
    name: 'Python',
    shortLabel: 'Py',
    category: 'language',
    color: '#3b82f6',
    x: 36,
    y: 36,
    connections: ['fastapi', 'flask', 'aws', 'langchain', 'claude', 'postgresql'],
    whyPersonal:
      'Python is my default for backends, ML, and automation — one language from notebook experiment to production API.',
    whenChoose:
      'APIs, NLP pipelines, AWS orchestration, RAG backends, data processing. If it is server-side and intelligent, it is probably Python.',
    problemsSolved:
      'Fragmented stacks between ML and web. Slow iteration on AI features. Glue code for cloud services and databases.',
    workflowFit:
      'Central hub — connects to FastAPI/Flask, AWS, LangChain, PostgreSQL, and every AI tool in the graph.',
    projectExamples: ['All four portfolio projects', 'Catalog Generator', 'Sentiment Analysis', 'UrgeEase'],
    strengths: ['FastAPI services', 'NLP preprocessing', 'AWS workflow orchestration'],
  },
  {
    id: 'react',
    name: 'React',
    shortLabel: 'Re',
    category: 'frontend',
    color: '#22d3ee',
    x: 56,
    y: 34,
    connections: ['typescript', 'vercel', 'github', 'fastapi', 'flask'],
    whyPersonal:
      'React is how I build interfaces that feel alive — dashboards, product UIs, and interactive experiences recruiters can actually click through.',
    whenChoose:
      'User-facing products, data visualization, anything that needs stateful UI with a mature ecosystem.',
    problemsSolved:
      'Static pages that cannot showcase real product thinking. Complex UI state. Pairing polished frontends with REST backends.',
    workflowFit:
      'TypeScript for safety, Vercel for deploy, Flask/FastAPI for data. GitHub ties the loop.',
    projectExamples: ['SimpleWealth', 'UrgeEase', 'This portfolio'],
    strengths: ['Dashboard layouts', 'Data visualization', 'Framer Motion micro-interactions'],
  },
  {
    id: 'faiss',
    name: 'FAISS',
    shortLabel: 'FI',
    category: 'ml',
    color: '#22d3ee',
    x: 74,
    y: 38,
    connections: ['langchain', 'python', 'openai'],
    whyPersonal:
      'FAISS is the retrieval engine behind every RAG system I have shipped — fast similarity search without running a full vector database on day one.',
    whenChoose:
      'Semantic search, document retrieval, embedding indexes where latency and recall matter.',
    problemsSolved:
      'Slow linear scans over embeddings. Building retrieval from scratch. Sub-second Q&A over knowledge bases.',
    workflowFit:
      'OpenAI embeds → FAISS indexes → LangChain retrieves → Flask serves → React displays.',
    projectExamples: ['UrgeEase knowledge retrieval'],
    strengths: ['Semantic search', 'Embedding indexes', 'Sub-second retrieval'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    shortLabel: 'FA',
    category: 'backend',
    color: '#a855f7',
    x: 12,
    y: 56,
    connections: ['python', 'postgresql', 'aws', 'react', 'github'],
    whyPersonal:
      'FastAPI is my go-to when I want production-grade validation, async performance, and auto-generated docs on day one.',
    whenChoose:
      'New Python APIs, ML-serving endpoints, structured REST with OpenAPI — especially cloud AI pipelines.',
    problemsSolved:
      'Hand-rolled validation. Missing API documentation. Slow sync endpoints under load.',
    workflowFit:
      'Python logic → PostgreSQL persistence → AWS services → React consumption → GitHub deploy pipeline.',
    projectExamples: ['AI Catalog Generator', 'ML-serving endpoints'],
    strengths: ['Auto-generated docs', 'Pydantic validation', 'Async request handling'],
  },
  {
    id: 'flask',
    name: 'Flask',
    shortLabel: 'Fl',
    category: 'backend',
    color: '#a855f7',
    x: 30,
    y: 60,
    connections: ['python', 'mongodb', 'langchain', 'react', 'postman'],
    whyPersonal:
      'Flask is what I reach for when I need a focused backend fast — minimal ceremony, maximum clarity.',
    whenChoose:
      'MVPs, RAG backends, REST APIs where I want control without framework weight. SimpleWealth and UrgeEase both started here.',
    problemsSolved:
      'Over-engineered backends for early products. Quick API iteration. Pairing Python AI logic with document stores.',
    workflowFit:
      'Python + MongoDB + LangChain on the server; Postman validates; React consumes.',
    projectExamples: ['SimpleWealth', 'UrgeEase'],
    strengths: ['Blueprint modularization', 'Quick REST endpoints', 'MongoDB pairing'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    shortLabel: 'PG',
    category: 'database',
    color: '#6366f1',
    x: 50,
    y: 54,
    connections: ['python', 'fastapi', 'aws'],
    whyPersonal:
      'When data has relationships and integrity matters, PostgreSQL is non-negotiable. I trust it with production state.',
    whenChoose:
      'Structured schemas, joins, migrations, and any API where bad data is worse than slow data.',
    problemsSolved:
      'Inconsistent relational data. Complex queries across entities. ACID guarantees for production APIs.',
    workflowFit:
      'FastAPI + Python ORM layer + AWS-hosted pipelines that need durable, queryable storage.',
    projectExamples: ['AI Catalog Generator', 'Production API backends'],
    strengths: ['Schema migrations', 'Complex SQL', 'JSONB when flexibility is needed'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    shortLabel: 'Mg',
    category: 'database',
    color: '#22c55e',
    x: 70,
    y: 58,
    connections: ['flask', 'langchain', 'react'],
    whyPersonal:
      'MongoDB lets me move fast when the data model is still evolving — chat history, session state, document-heavy AI workflows.',
    whenChoose:
      'Early-stage products, flexible schemas, RAG document stores, session and chat persistence.',
    problemsSolved:
      'Rigid schemas during rapid iteration. Storing heterogeneous documents. Session and chat history at scale.',
    workflowFit:
      'Flask writes documents; LangChain reads them; React surfaces the experience.',
    projectExamples: ['SimpleWealth', 'UrgeEase session data'],
    strengths: ['Flexible documents', 'Fast schema iteration', 'Chat & session history'],
  },
  {
    id: 'postman',
    name: 'Postman',
    shortLabel: 'Pm',
    category: 'platform',
    color: '#ff6c37',
    x: 24,
    y: 76,
    connections: ['flask', 'fastapi', 'python'],
    whyPersonal:
      'Postman is my contract checkpoint — I validate every endpoint before the frontend trusts it.',
    whenChoose:
      'Before UI integration, auth flow testing, and whenever I am defining a new API surface.',
    problemsSolved:
      'Frontend debugging that is really a backend bug. Undocumented auth flows. Regressions after API changes.',
    workflowFit:
      'Sits between Flask/FastAPI and React. I build the API, prove it in Postman, then wire the UI.',
    projectExamples: ['UrgeEase API validation', 'Every backend before UI wiring'],
    strengths: ['Test collections', 'Environment variables', 'Auth flow testing'],
  },
  {
    id: 'aws',
    name: 'AWS',
    shortLabel: 'AW',
    category: 'cloud',
    color: '#ff9900',
    x: 12,
    y: 88,
    connections: ['python', 'fastapi', 'postgresql'],
    whyPersonal:
      'AWS is how I ship cloud-native AI without building infra from scratch — S3, Rekognition, Translate, and orchestration I can trust.',
    whenChoose:
      'Multimodal AI pipelines, image processing at scale, managed translation, serverless workflows.',
    problemsSolved:
      'Building image pipelines manually. Scaling storage and compute. Multilingual content generation at production volume.',
    workflowFit:
      'Python orchestrates AWS services; FastAPI exposes results; PostgreSQL tracks state; GitHub versions the pipeline.',
    projectExamples: ['AI Multilingual Product Catalog Generator'],
    strengths: ['S3 pipelines', 'Rekognition analysis', 'Translate orchestration'],
  },
  {
    id: 'github',
    name: 'GitHub',
    shortLabel: 'GH',
    category: 'platform',
    color: '#f0f6fc',
    x: 44,
    y: 84,
    connections: ['cursor', 'vercel', 'react', 'python'],
    whyPersonal:
      'GitHub is the spine of how I work — every project, every PR, every deploy starts with a commit here.',
    whenChoose:
      'Always. Version control, code review, CI hooks, and the bridge to Vercel deploys.',
    problemsSolved:
      'Untracked changes. Deploying without history. Collaborating without a single source of truth.',
    workflowFit:
      'Cursor commits → GitHub stores → Vercel deploys frontends. Python and React both flow through here.',
    projectExamples: ['Every project in this portfolio'],
    strengths: ['PR-based workflow', 'CI integration', 'Clean commit history'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    shortLabel: 'Vc',
    category: 'platform',
    color: '#f0f6fc',
    x: 64,
    y: 82,
    connections: ['react', 'typescript', 'github'],
    whyPersonal:
      'Vercel is how I get React apps in front of people in minutes — push to GitHub, preview branch, production URL.',
    whenChoose:
      'Frontend deploys, edge functions, portfolio sites, any React product that needs global performance.',
    problemsSolved:
      'Painful frontend deploys. No preview environments. Slow iteration from code to live URL.',
    workflowFit:
      'TypeScript + React build on Vercel; GitHub triggers deploys; backends stay on Flask/FastAPI.',
    projectExamples: ['This portfolio', 'SimpleWealth frontend', 'UrgeEase frontend'],
    strengths: ['Git push deploys', 'Preview branches', 'Edge API routes'],
  },
]

const layoutFullstackAi: Record<string, { x: number; y: number }> = {
  cursor: { x: 28, y: 28 },
  claude: { x: 42, y: 22 },
  python: { x: 38, y: 42 },
  fastapi: { x: 22, y: 52 },
  react: { x: 54, y: 40 },
  typescript: { x: 48, y: 58 },
  postgresql: { x: 32, y: 62 },
  github: { x: 58, y: 54 },
  vercel: { x: 62, y: 66 },
}

const layoutRag: Record<string, { x: number; y: number }> = {
  cursor: { x: 26, y: 26 },
  claude: { x: 42, y: 20 },
  python: { x: 36, y: 40 },
  langchain: { x: 54, y: 32 },
  openai: { x: 48, y: 22 },
  faiss: { x: 62, y: 44 },
  mongodb: { x: 44, y: 56 },
  flask: { x: 30, y: 54 },
}

const layoutCloudAi: Record<string, { x: number; y: number }> = {
  cursor: { x: 28, y: 30 },
  python: { x: 40, y: 42 },
  aws: { x: 24, y: 54 },
  fastapi: { x: 36, y: 56 },
  postgresql: { x: 52, y: 50 },
  github: { x: 56, y: 62 },
}

const layoutRapid: Record<string, { x: number; y: number }> = {
  cursor: { x: 26, y: 28 },
  claude: { x: 42, y: 22 },
  python: { x: 36, y: 42 },
  flask: { x: 28, y: 54 },
  react: { x: 52, y: 44 },
  mongodb: { x: 44, y: 58 },
  github: { x: 56, y: 54 },
  vercel: { x: 60, y: 66 },
}

const layoutNlp: Record<string, { x: number; y: number }> = {
  cursor: { x: 30, y: 30 },
  claude: { x: 48, y: 24 },
  python: { x: 40, y: 48 },
  github: { x: 54, y: 56 },
}

export const suggestedWorkflows: SuggestedWorkflow[] = [
  {
    id: 'fullstack-ai',
    name: 'Full-Stack AI Product',
    tagline: 'From IDE to production URL — how I ship complete AI-powered applications.',
    tools: ['cursor', 'claude', 'python', 'fastapi', 'react', 'typescript', 'postgresql', 'github', 'vercel'],
    color: '#3b82f6',
    purpose:
      'End-to-end AI products where a typed frontend, validated Python API, relational data, and one-click deploys all need to work together.',
    whyTogether:
      'Cursor and Claude handle thinking and implementation. Python + FastAPI ship the intelligence. TypeScript + React make it tangible. PostgreSQL keeps state honest. GitHub and Vercel close the loop from commit to live.',
    dataFlow: [
      'Design & scaffold in Cursor with Claude for architecture review',
      'Python + FastAPI expose AI endpoints with Pydantic validation',
      'PostgreSQL stores structured application state',
      'TypeScript + React consume APIs with typed contracts',
      'GitHub PR → Vercel preview → production deploy',
    ],
    whenUse:
      'When I am building a product-facing AI feature that needs a real UI, durable data, and a deploy path — not a notebook demo.',
    exampleProjects: ['AI Catalog Generator (backend-heavy variant)', 'Future full-stack AI products'],
    tradeoffs: [
      'More moving parts than a Flask MVP — worth it when data integrity and UI polish matter',
      'PostgreSQL adds migration overhead but prevents document-store chaos at scale',
      'FastAPI + React split means two deploy targets — Vercel + API host — but cleaner separation of concerns',
    ],
    layoutPositions: layoutFullstackAi,
  },
  {
    id: 'rag-pipeline',
    name: 'RAG & Recovery AI',
    tagline: 'Retrieval, embeddings, and contextual AI — how I build systems that actually know things.',
    tools: ['cursor', 'claude', 'python', 'langchain', 'openai', 'faiss', 'mongodb', 'flask'],
    color: '#22d3ee',
    purpose:
      'Contextual AI that retrieves real knowledge before generating — recovery support, document Q&A, and any domain where hallucination is unacceptable.',
    whyTogether:
      'OpenAI embeds, FAISS retrieves fast, LangChain chains the logic, MongoDB stores sessions and documents, Flask serves it all. Claude designs the pipeline; Cursor builds it.',
    dataFlow: [
      'Documents & sessions land in MongoDB',
      'OpenAI generates embeddings → FAISS indexes for similarity search',
      'LangChain orchestrates retrieve → augment → generate',
      'Flask exposes chat and assessment APIs',
      'React/Next.js renders the recovery experience',
    ],
    whenUse:
      'When the AI must cite real context — support chat, knowledge bases, domain-specific Q&A.',
    exampleProjects: ['UrgeEase'],
    tradeoffs: [
      'FAISS is fast and simple but lacks managed scaling — right for MVP, revisit for massive corpora',
      'LangChain adds abstraction cost but saves weeks of retrieval plumbing',
      'MongoDB flexibility trades schema rigor for iteration speed — perfect for evolving chat data',
    ],
    layoutPositions: layoutRag,
  },
  {
    id: 'cloud-ai',
    name: 'Cloud AI Automation',
    tagline: 'AWS-native multimodal pipelines — images in, translated catalogs out.',
    tools: ['cursor', 'python', 'aws', 'fastapi', 'postgresql', 'github'],
    color: '#ff9900',
    purpose:
      'Automated cloud workflows that process images, run AI services, and produce structured multilingual output at scale.',
    whyTogether:
      'Python orchestrates AWS (S3, Rekognition, Translate). FastAPI exposes pipeline status and results. PostgreSQL tracks jobs. GitHub versions the automation. Cursor is where the pipeline code lives.',
    dataFlow: [
      'Images upload to S3 → Rekognition extracts product attributes',
      'AWS Translate generates multilingual listings',
      'Python orchestrates validation and error handling',
      'FastAPI surfaces pipeline state; PostgreSQL persists job records',
      'GitHub tracks every pipeline version',
    ],
    whenUse:
      'Batch AI processing, multimodal workflows, and any project where managed cloud services beat self-hosted models.',
    exampleProjects: ['AI Multilingual Product Catalog Generator'],
    tradeoffs: [
      'AWS costs require careful pipeline design — but Rekognition and Translate beat building CV/NLP from scratch',
      'FastAPI adds an API layer over batch jobs — worth it for monitoring and integration',
      'Less flexible than a pure notebook workflow — far more production-ready',
    ],
    layoutPositions: layoutCloudAi,
  },
  {
    id: 'rapid-prototype',
    name: 'Rapid Prototype → Ship',
    tagline: 'Idea to deployed MVP — fast iteration without cutting corners on UX.',
    tools: ['cursor', 'claude', 'python', 'flask', 'react', 'mongodb', 'github', 'vercel'],
    color: '#a855f7',
    purpose:
      'Getting a working product in front of users quickly — finance dashboards, internal tools, MVPs that need to evolve.',
    whyTogether:
      'Flask + MongoDB minimizes backend ceremony. React + Vercel ships the UI fast. Claude accelerates decisions; Cursor accelerates code. GitHub keeps it all versioned.',
    dataFlow: [
      'Claude + Cursor spike the feature set and data model',
      'Flask + MongoDB stand up APIs in hours',
      'React dashboard consumes REST endpoints',
      'Postman validates contracts (when APIs grow)',
      'GitHub → Vercel for instant previews and production',
    ],
    whenUse:
      'Early-stage products, personal tools, and any build where speed matters more than microservice architecture.',
    exampleProjects: ['SimpleWealth'],
    tradeoffs: [
      'Flask scales fine for MVPs but I migrate to FastAPI when validation and async matter',
      'MongoDB schema flexibility can become tech debt — I plan migrations early',
      'Monolith deploy is simpler than split stacks — right until traffic demands otherwise',
    ],
    layoutPositions: layoutRapid,
  },
  {
    id: 'nlp-research',
    name: 'ML & NLP Research',
    tagline: 'From raw text to evaluated models — how I approach data science work.',
    tools: ['cursor', 'claude', 'python', 'github'],
    color: '#a855f7',
    purpose:
      'Exploratory NLP and ML — preprocessing pipelines, model comparison, and rigorous evaluation before any production talk.',
    whyTogether:
      'Python is the entire stack for research. Claude helps design experiments and interpret results. Cursor keeps notebooks and scripts organized. GitHub tracks datasets, models, and reproducibility.',
    dataFlow: [
      'Raw text → preprocessing, tokenization, lemmatization in Python',
      'Train & compare models (Logistic Regression, Naive Bayes, VADER, SentiWordNet)',
      'Evaluate with confusion matrices, F1, AUC',
      'Claude reviews methodology; Cursor refactors into clean modules',
      'GitHub preserves experiment history',
    ],
    whenUse:
      'Academic projects, sentiment analysis, classification tasks, and any ML work that needs proper evaluation metrics.',
    exampleProjects: ['Amazon Fashion Review Sentiment Analysis'],
    tradeoffs: [
      'No production API layer — intentional for research-focused work',
      'Simpler stack means faster iteration but manual path to deployment later',
      'Model choice driven by interpretability and metrics, not hype',
    ],
    layoutPositions: layoutNlp,
  },
]

export const projectWorkflowMap: Record<string, ProjectWorkflowLink> = {
  'catalog-generator': {
    projectId: 'catalog-generator',
    workflowId: 'cloud-ai',
    tools: ['cursor', 'python', 'aws', 'fastapi', 'postgresql', 'github'],
    journey: ['Ingest images', 'AWS AI processing', 'Validate & store', 'Ship pipeline'],
  },
  'sentiment-analysis': {
    projectId: 'sentiment-analysis',
    workflowId: 'nlp-research',
    tools: ['cursor', 'claude', 'python', 'github'],
    journey: ['Preprocess text', 'Train models', 'Evaluate metrics', 'Document findings'],
  },
  simplewealth: {
    projectId: 'simplewealth',
    workflowId: 'rapid-prototype',
    tools: ['cursor', 'claude', 'python', 'flask', 'react', 'mongodb', 'github', 'vercel'],
    journey: ['Spike MVP', 'Flask + MongoDB API', 'React dashboards', 'Deploy to Vercel'],
  },
  urgeease: {
    projectId: 'urgeease',
    workflowId: 'rag-pipeline',
    tools: ['cursor', 'claude', 'python', 'langchain', 'openai', 'faiss', 'mongodb', 'flask', 'postman'],
    journey: ['Design RAG', 'Embed & index', 'Flask APIs', 'Validate & ship'],
  },
}

export const toolMap = Object.fromEntries(workflowTools.map((t) => [t.id, t])) as Record<
  string,
  WorkflowTool
>

export const workflowMap = Object.fromEntries(suggestedWorkflows.map((w) => [w.id, w])) as Record<
  string,
  SuggestedWorkflow
>

export function getConnectionsForTool(toolId: string): { from: string; to: string }[] {
  const tool = toolMap[toolId]
  if (!tool) return []
  return tool.connections.map((to) => ({ from: toolId, to }))
}

export function getWorkflowConnections(toolIds: string[]): { from: string; to: string }[] {
  const lines: { from: string; to: string }[] = []
  const set = new Set(toolIds)
  for (let i = 0; i < toolIds.length - 1; i++) {
    lines.push({ from: toolIds[i], to: toolIds[i + 1] })
  }
  for (const id of toolIds) {
    const tool = toolMap[id]
    if (!tool) continue
    for (const conn of tool.connections) {
      if (set.has(conn) && toolIds.indexOf(conn) > toolIds.indexOf(id)) {
        const exists = lines.some((l) => (l.from === id && l.to === conn) || (l.from === conn && l.to === id))
        if (!exists) lines.push({ from: id, to: conn })
      }
    }
  }
  return lines
}

export function getDisplayPositions(
  activeWorkflowId: string | null,
  focusToolIds?: string[]
): Record<string, { x: number; y: number }> {
  const workflow = activeWorkflowId ? workflowMap[activeWorkflowId] : null
  const focusSet = new Set(focusToolIds ?? workflow?.tools ?? [])

  if (workflow?.layoutPositions && focusSet.size > 0) {
    const result: Record<string, { x: number; y: number }> = {}
    for (const tool of workflowTools) {
      if (workflow.layoutPositions[tool.id]) {
        result[tool.id] = workflow.layoutPositions[tool.id]
      } else if (focusSet.has(tool.id)) {
        const connected = tool.connections.find((c) => workflow.layoutPositions[c])
        const anchor = connected ? workflow.layoutPositions[connected] : { x: 42, y: 48 }
        result[tool.id] = { x: Math.min(88, anchor.x + 6), y: Math.min(88, anchor.y + 8) }
      } else {
        const dx = tool.x - 50
        const dy = tool.y - 50
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        result[tool.id] = {
          x: Math.min(92, Math.max(6, 50 + (dx / dist) * (dist * 0.35 + 18))),
          y: Math.min(92, Math.max(8, 50 + (dy / dist) * (dist * 0.35 + 18))),
        }
      }
    }
    return result
  }

  return Object.fromEntries(workflowTools.map((t) => [t.id, { x: t.x, y: t.y }]))
}
