export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  live?: string;
  image: string;
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
    image: '/images/projects/t-sheets-mcp.png',
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
    image: '/images/projects/field-notes-app.jpeg',
    featured: false,
    category: 'productivity',
  },
  {
    id: 'journalai',
    title: 'JournalAI',
    description: 'AI-powered journaling with real-time sentiment analysis and mood tracking',
    longDescription:
      'Full-stack journaling platform with OpenAI-powered sentiment analysis. Features include real-time autosave rich text editor with emoji support and image uploads, AI-driven mood detection with sentiment scoring (-10 to +10 scale), interactive analytics dashboard with time-series visualizations, natural language Q&A over journal history using vector embeddings, and comprehensive data export (JSON/CSV/PDF with customizable filters). Built with Next.js 14 App Router, Drizzle ORM, and Clerk authentication.',
    tech: [
      'Next.js',
      'TypeScript',
      'React',
      'OpenAI API',
      'LangChain',
      'PostgreSQL',
      'Drizzle ORM',
      'Clerk',
      'TipTap',
      'Recharts',
      'Tailwind CSS'
    ],
    github: 'https://github.com/cykj40/journal-ai-app',
    live: 'journal-ai-app-eta.vercel.app', // Verify this URL or replace with actual deployment
    image: '/images/projects/journalai.png',
    featured: true, // Consider making this featured - it's production-grade
    category: 'productivity',
  },
  {
    id: 'reelingit',
    title: 'ReelingIt',
    description: 'Movie list management built with Go and server-side rendering',
    longDescription:
      'Full-stack Go web application demonstrating backend template rendering, RESTful routing, and stateful data persistence for movie list management. Built without frontend frameworks to showcase Go\'s html/template package and HTTP server capabilities. Features CRUD operations, form handling, and in-memory data storage with persistent state management.',
    tech: ['Go', 'HTML', 'CSS', 'JavaScript', 'HTTP Server', 'html/template'],
    github: 'https://github.com/cykj40/MovieList',
    live: 'https://movie-list-eight-gamma.vercel.app/',
    image: '/images/projects/Reelingit.png',
    featured: false,
    category: 'web',
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
    image: '/images/projects/peloton-mcp.png',
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
    image: '/images/projects/dexcom-mcp-server.png',
    featured: true,
    category: 'health',
  }
];

export const featuredProjects = projectsData.filter((p) => p.featured);
