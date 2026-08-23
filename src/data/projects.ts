export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  live?: string;
  featured: boolean;
  category: 'health' | 'ai' | 'productivity' | 'entertainment' | 'construction' | 'web' | 'security';
}

export const projectsData: Project[] = [
  {
    id: 'tsheets-mcp',
    title: 'TSheets MCP Server',
    description: 'AI-powered time tracking integration for Claude Desktop',
    longDescription:
      'Tired of manually transcribing field notes into billing systems, I built an MCP server that lets Claude AI do it automatically. Construction crews log time in TSheets with job notes and photos—Claude extracts everything, formats it for Sage 100 Contractor, and generates professional reports. What used to take 30 minutes now takes 5. Full OAuth2 implementation, type-safe throughout, handles hierarchical job structures automatically. This is what AI automation should look like: real tools solving real problems.',
    tech: ['TypeScript', 'Node.js', 'Express.js', 'MCP Protocol', 'OAuth2', 'Zod', 'TSheets API', 'Claude API'],
    github: 'https://github.com/cykj40/Tsheets-MCP',
    featured: true,
    category: 'construction',
  },
  {
    id: 'field-notes',
    title: 'Field Notes',
    description: 'Internal PWA built for Long & DeLosa Construction Group field supervisors. Speak job site notes in English or Spanish — OpenAI Whisper handles bilingual voice transcription — then submit directly to Google Chat.',
    longDescription:
      'Built for Long & DeLosa Construction Group to streamline field-to-office communication. Supervisors tap a mic button, speak job site notes in English or Spanish, and OpenAI Whisper transcribes the audio server-side via /api/transcribe before appending it to the notes textarea. Notes are sent directly to the team Google Chat space, keeping all field communications in one place without phone calls or manual data entry. Features role-based authentication, photo capture with client-side compression, Upstash Redis for note storage, and an installable PWA so supervisors can add it to their home screen like a native app.',
    tech: ['Next.js', 'TypeScript', 'Whisper API', 'Upstash Redis', 'Zod', 'iron-session', 'PWA', 'Tailwind CSS'],
    github: 'https://github.com/cykj40/field-notes-assistant',
    live: '',
    featured: false,
    category: 'productivity',
  },
  {
    id: 'journalai',
    title: 'Health Journal AI',
    description: 'AI-powered health journaling with intelligent data analysis and personalized health insights',
    longDescription:
      'Full-stack health journaling platform built to analyze personal health data using Claude AI and surface actionable insights. Log mood, sleep, activity, vitals, and nutrition — then let the AI identify patterns, flag anomalies, and recommend improvements. Features a conversational chat interface for querying your health history in plain English, time-series visualizations, and AI-driven health scoring. Currently being rebuilt with Claude as the core AI layer for deeper reasoning and more nuanced health analysis. Built with Next.js 14 App Router, Drizzle ORM, and Clerk authentication.',
    tech: [
      'Next.js',
      'TypeScript',
      'React',
      'Claude API',
      'PostgreSQL',
      'Drizzle ORM',
      'Clerk',
      'Recharts',
      'Tailwind CSS'
    ],
    github: 'https://github.com/cykj40/journal-ai-app',
    live: 'https://journal-ai-app-eta.vercel.app',
    featured: true,
    category: 'health',
  },
  {
    id: 't1copilot',
    title: 'T1Copilot',
    description: 'Open-source, self-hosted AI health management platform for Type 1 Diabetes — multi-agent reasoning over live CGM, workout, and metabolic data.',
    longDescription:
      'Production multi-agent AI system built for real-world T1D management. A 7-agent graph (Orchestrator, Glucose, Exercise, Modeling, Event Logger, Research, Insight) reasons over live Dexcom CGM readings, Peloton workout data, insulin events, and carb intake simultaneously. Built on Next.js 15, Vercel AI SDK streaming chat, LangGraph.ts, Drizzle ORM, Neon Postgres with PGVector, and two production MCP servers deployed on Fly.io. Implements a full HITL gate on all medical writes — no agent autonomously logs insulin or modifies parameters. Self-hosted BYOD architecture; each user owns their instance and their data.',
    tech: [
      'TypeScript',
      'Next.js 15',
      'Vercel AI SDK',
      'LangGraph.ts',
      'Claude API',
      'MCP Protocol',
      'Drizzle ORM',
      'Neon Postgres',
      'PGVector',
      'Turso',
      'Zod',
      'Fly.io',
      'Vitest',
      'Laminar',
    ],
    github: 'https://github.com/cykj40/t1pilot',
    featured: true,
    category: 'health',
  },
  {
    id: 'peloton-mcp-server',
    title: 'Peloton MCP Server',
    description: 'MCP server correlating Peloton workout data with Dexcom CGM for Type 1 diabetes management',
    longDescription:
      'Production MCP server enabling AI assistants to correlate Peloton workout history with real-time blood glucose data from Dexcom CGM. Features JWT Bearer token auth with auto-refresh, SQLite persistence via better-sqlite3, muscle group impact analytics, delayed hypoglycemia risk detection, and discipline-level glucose pattern insights. Built with TypeScript, Zod schema validation, rate-limit-aware retry logic, and an in-memory cache layer. 55 tests across 9 test suites with Vitest.',
    tech: ['TypeScript', 'Node.js', 'MCP SDK', 'better-sqlite3', 'Zod', 'Axios', 'Vitest'],
    github: 'https://github.com/cykj40/Peloton-MCP-Server',
    live: '',
    featured: true,
    category: 'health',
  },

  {
    id: 'dexcom-mcp-server',
    title: 'Dexcom MCP Server',
    description: 'Human-in-the-loop diabetes management assistant powered by Claude AI and real-time CGM data',
    longDescription:
      'Model Context Protocol server that connects Claude AI to Dexcom CGM devices for intelligent diabetes management assistance. Features real-time glucose monitoring with trend analysis, adaptive metabolic modeling that learns insulin sensitivity over time, predictive intelligence for estimating glucose impact of insulin and carbs, parameter drift detection to identify when physiology changes, and comprehensive event logging for meals, insulin, and exercise. Built with TypeScript and SQLite for local-first privacy—all data stays on your machine. Implements OAuth2 for secure Dexcom API access and provides visualization tools including AGP (Ambulatory Glucose Profile) charts. Pure assistive intelligence: Claude analyzes and recommends, but you decide and act.',
    tech: ['TypeScript', 'Node.js', 'MCP Protocol', 'OAuth2', 'SQLite', 'Dexcom API', 'Claude API'],
    github: 'https://github.com/cykj40/dexcom-mcp-server',
    featured: true,
    category: 'health',
  }
];

export const featuredProjects = projectsData.filter((p) => p.featured);
