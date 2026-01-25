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
    id: 'fungi-finders',
    title: 'Fungi Finders',
    description: 'Interactive mushroom identification guide with dynamic filtering and theme switching',
    longDescription:
      'Educational web application for mushroom foraging enthusiasts. Features real-time filtering by season and edibility, interactive mushroom database with detailed identification notes, and custom light/dark theme implementation. Built with semantic HTML, vanilla JavaScript, and CSS Grid/Flexbox for responsive layouts. Demonstrates frontend fundamentals without framework dependencies.',
    tech: ['HTML', 'CSS', 'JavaScript', 'CSS Grid', 'Flexbox', 'Responsive Design'],
    github: 'https://github.com/cykj40/Fungi-Finders',
    live: 'https://fem-class-fungi-finder-wonderfu.netlify.app/',
    image: '/images/projects/fungi-finders.png',
    featured: false,
    category: 'web',
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
    id: 'password-gen',
    title: 'Secure Password Generator PWA',
    description: 'Progressive Web App for cryptographically secure password generation',
    longDescription:
      'Installable PWA password generator with real-time strength analysis using zxcvbn algorithm. Features customizable length (8-32 chars), character set filtering, similar/ambiguous character exclusion, visual strength meter with 5-tier scoring, and clipboard integration. Built as offline-first PWA with service worker caching for complete privacy - zero server interaction.',
    tech: ['Next.js', 'TypeScript', 'React', 'PWA', 'zxcvbn', 'next-pwa', 'Tailwind CSS', 'Heroicons'],
    github: 'https://github.com/cykj40/password-generator',
    live: 'https://password-generator-ashy-gamma.vercel.app/',
    image: '/images/projects/password-generator.png',
    featured: false,
    category: 'security',
  },
  {
    id: 'periodic-table-speller',
    title: 'Periodic Table Word Speller',
    description: 'Interactive web app that spells words using chemical element symbols',
    longDescription:
      'Educational tool that attempts to spell any word using the symbols from the periodic table. Features recursive algorithm for finding valid element combinations, real-time validation, and interactive element cards displaying atomic details. Built with vanilla JavaScript and modern async/await patterns for efficient data handling.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'JSON', 'Recursive Algorithms'],
    github: 'https://github.com/cykj40/periodic-table-name-finder',
    demo: 'https://periodic-table-name-finder.vercel.app/',
    image: '/images/projects/periodic-table.png',
    featured: true,
    category: 'web',
  }
];

export const featuredProjects = projectsData.filter((p) => p.featured);
