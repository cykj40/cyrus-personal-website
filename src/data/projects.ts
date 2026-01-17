export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
  featured: boolean;
  category: 'health' | 'ai' | 'productivity' | 'entertainment';
}

export const projectsData: Project[] = [
  {
    id: 'tsheets-mcp',
    title: 'TSheets MCP Server',
    description: 'AI-powered time tracking integration for Claude Desktop',
    longDescription:
      'Built a Model Context Protocol (MCP) server that integrates TSheets time tracking with Claude Desktop. Enables AI-assisted time entry, reporting, and analytics through natural language. Features automatic timesheet generation, project tracking, and intelligent time suggestions.',
    tech: ['TypeScript', 'MCP Protocol', 'TSheets API', 'Claude API', 'Node.js'],
    github: 'https://github.com/cyrusae/tsheets-mcp-server',
    image: '/images/projects/tsheets-mcp.png',
    featured: true,
    category: 'ai',
  },
  {
    id: 'diabetes-ai',
    title: 'Diabetes AI Assistant',
    description: 'Real-time glucose monitoring and AI-powered health insights',
    longDescription:
      'Comprehensive diabetes management system with real-time CGM data integration. Features AI-powered trend analysis, meal logging, insulin tracking, and predictive alerts. Built with React, TypeScript, and Dexcom API integration for seamless data sync.',
    tech: ['React', 'TypeScript', 'Dexcom API', 'TanStack Query', 'Recharts', 'Tailwind CSS'],
    github: 'https://github.com/cyrusae/diabetes-ai',
    image: '/images/projects/diabetes-ai.png',
    featured: true,
    category: 'health',
  },
  {
    id: 'dexcom-mcp',
    title: 'Dexcom MCP Server',
    description: 'Claude Desktop integration for continuous glucose monitoring',
    longDescription:
      'MCP server enabling Claude Desktop to access and analyze Dexcom CGM data. Provides natural language querying of glucose trends, statistical analysis, and health pattern recognition. Enables conversational diabetes management through AI.',
    tech: ['Go', 'MCP Protocol', 'Dexcom API', 'OAuth 2.0', 'REST API'],
    github: 'https://github.com/cyrusae/dexcom-mcp-server',
    image: '/images/projects/dexcom-mcp.png',
    featured: true,
    category: 'health',
  },
  {
    id: 'journalai',
    title: 'JournalAI',
    description: 'Intelligent journaling with sentiment analysis and insights',
    longDescription:
      'Modern journaling application with AI-powered sentiment analysis, mood tracking, and pattern recognition. Features rich text editing, tag-based organization, and personalized insights. Built with a focus on privacy and user experience.',
    tech: ['React', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    github: 'https://github.com/cyrusae/journalai',
    image: '/images/projects/journalai.png',
    featured: false,
    category: 'productivity',
  },
  {
    id: 'reelingit',
    title: 'ReelingIt',
    description: 'Movie discovery platform with personalized recommendations',
    longDescription:
      'Full-stack movie discovery and tracking platform. Features personalized recommendations, watchlist management, user reviews, and social features. Integrates with TMDB API for comprehensive movie data and trailers.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'TMDB API', 'JWT Auth'],
    github: 'https://github.com/cyrusae/reelingit',
    demo: 'https://reelingit.vercel.app',
    image: '/images/projects/reelingit.png',
    featured: false,
    category: 'entertainment',
  },
  {
    id: 'password-gen',
    title: 'Secure Password Generator',
    description: 'Cryptographically secure password generation with customization',
    longDescription:
      'Browser-based password generator using Web Crypto API for true randomness. Features customizable length, character sets, pattern avoidance, and entropy visualization. Zero server interaction ensures complete privacy.',
    tech: ['TypeScript', 'React', 'Web Crypto API', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/cyrusae/password-generator',
    demo: 'https://password-gen.cyrus.dev',
    image: '/images/projects/password-gen.png',
    featured: false,
    category: 'productivity',
  },
];

export const featuredProjects = projectsData.filter((p) => p.featured);
