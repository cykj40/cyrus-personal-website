export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'HTML/CSS'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'AI & Automation',
    skills: ['Claude API', 'MCP Protocol', 'Prompt Engineering', 'AI Agents', 'Workflow Automation'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'Vercel', 'GitHub Actions', 'Vite', 'pnpm'],
  },
  {
    category: 'Health Tech',
    skills: ['Dexcom API', 'TSheets API', 'Health Data Integration', 'CGM Systems', 'Medical APIs'],
  },
];
