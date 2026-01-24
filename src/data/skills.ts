export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Core Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Frontend Engineering',
    skills: ['React', 'Next.js', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend & Data',
    skills: [
      'Node.js',
      'Fastify',
      'Express',
      'PostgreSQL',
      'Drizzle',
      'REST APIs',
      'GraphQL',
      'Auth (JWT/OAuth)',
      'Webhooks',
      'Background Jobs'
    ],
  },
  {
    category: 'Applied AI Systems',
    skills: [
      'Claude API',
      'MCP Protocol',
      'AI Agents',
      'LLM Integration',
      'Tool Calling',
      'Workflow Automation',
      'Dexcom API',
      'Time-Series Data'
    ],
  },
  {
    category: 'Infrastructure & Delivery',
    skills: ['Git', 'Docker', 'Linux', 'GitHub Actions', 'CI/CD', 'Vercel', 'Vite', 'pnpm'],
  },
];
