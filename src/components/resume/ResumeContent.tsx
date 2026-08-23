import { motion } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import {
  Download, MapPin, Phone, Mail, Globe, Github, Linkedin,
  ExternalLink, CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// Single source of truth for the resume PDF path — every download button on the
// site (this component, the /hire-me sticky button, the resume modal) reads from
// `resume-pdf.ts` so they can never point at different files.
import { RESUME_PDF_PATH } from './resume-pdf';

export { RESUME_PDF_PATH };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

interface ResumeHeaderProps {
  headingId: string;
}

function ResumeHeader({ headingId }: ResumeHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-pine-50 via-white to-ridge-50 bg-topographic pt-10 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.h1
            id={headingId}
            variants={fadeUp}
            className="font-display text-4xl font-semibold text-pine-900 sm:text-5xl mb-3"
          >
            Cyrus Khiabani
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl font-medium text-ridge-700 mb-6"
          >
            AI Engineer &nbsp;·&nbsp; MCP Server Developer &nbsp;·&nbsp; Full-Stack Engineer
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-granite-600 mb-8"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-pine-500" />
              Holmdel, NJ
            </span>
            <a href="tel:6467456825" className="flex items-center gap-1.5 hover:text-pine-600 transition-colors">
              <Phone className="h-4 w-4 text-pine-500" />
              (646) 745-6825
            </a>
            <a href="mailto:cyrus@cyruskhiabani.com" className="flex items-center gap-1.5 hover:text-pine-600 transition-colors">
              <Mail className="h-4 w-4 text-pine-500" />
              cyrus@cyruskhiabani.com
            </a>
            <a href="https://cyruskhiabani.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-pine-600 transition-colors">
              <Globe className="h-4 w-4 text-pine-500" />
              cyruskhiabani.com
            </a>
            <a href="https://github.com/cykj40" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-pine-600 transition-colors">
              <Github className="h-4 w-4 text-pine-500" />
              github.com/cykj40
            </a>
            <a href="https://www.linkedin.com/in/cyrus-jalili-khiabani-44605b163" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-pine-600 transition-colors">
              <Linkedin className="h-4 w-4 text-pine-500" />
              LinkedIn
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <a
              href={RESUME_PDF_PATH}
              download
              onClick={() => track('resume_download', { source: 'resume_modal' })}
              className="inline-flex h-14 items-center justify-center rounded-lg bg-pine-600 px-8 text-lg font-medium text-white transition-all hover:bg-pine-700 active:bg-pine-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SummarySection() {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-pine-900 mb-6 pb-3 border-b-2 border-pine-100"
          >
            Summary
          </motion.h2>
          <motion.p variants={fadeUp} className="text-granite-700 leading-relaxed text-base">
            AI Engineer and Full-Stack Developer specializing in production-grade LLM integration,
            MCP server development, and agentic workflow automation. Builds real tools that solve
            real problems — from OAuth2-secured MCP servers connecting Claude AI to healthcare APIs
            and construction billing systems, to full-stack health platforms with real-time CGM data
            analysis. Proven 90% reduction in operational overhead through AI deployments built on
            TypeScript, Next.js, Node.js, and PostgreSQL. Strong bias toward clean architecture,
            type-safety, and systems that scale beyond prototypes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

interface SkillCategory {
  category: string;
  skills: string[];
}

const resumeSkills: SkillCategory[] = [
  { category: 'Core Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'HTML/CSS'] },
  { category: 'Frontend', skills: ['React', 'Next.js', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend & APIs', skills: ['Node.js', 'Fastify', 'Express', 'REST', 'GraphQL', 'Webhooks', 'Background Jobs'] },
  { category: 'Databases & ORM', skills: ['PostgreSQL', 'pgvector', 'SQLite', 'Drizzle ORM', 'Prisma', 'Upstash Redis'] },
  { category: 'AI & LLM Engineering', skills: ['Claude API', 'OpenAI API', 'MCP Protocol', 'AI Agents', 'Tool Calling', 'RAG', 'Pinecone', 'Whisper API'] },
  { category: 'Auth & Security', skills: ['OAuth2', 'JWT', 'iron-session', 'Clerk', 'Zod', 'Type-safe validation'] },
  { category: 'Infrastructure', skills: ['Git', 'Docker', 'Linux', 'GitHub Actions', 'CI/CD', 'Vercel', 'Vite', 'pnpm', 'Vitest'] },
];

function SkillsSection() {
  return (
    <section className="py-14 bg-pine-50/40">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-pine-900 mb-8 pb-3 border-b-2 border-pine-100 max-w-3xl mx-auto"
          >
            Technical Skills
          </motion.h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {resumeSkills.map((cat) => (
              <motion.div key={cat.category} variants={fadeUp}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{cat.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full bg-ridge-50 px-3 py-1 font-mono text-xs text-ridge-700"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const experienceBullets = [
  {
    label: 'MCP Server Architecture',
    text: 'Designed and shipped production TSheets/QuickBooks Time MCP server with full OAuth2 flow, reducing manual timesheet-to-billing processing by 90% and enabling Claude AI to extract, format, and route construction job notes directly into Sage 100 Contractor.',
  },
  {
    label: 'Agentic AI Deployment',
    text: 'Embedded Claude AI and Claude Code into core operations — automating invoice generation, document processing, and field-to-office communication pipelines using Next.js/React frontends with PostgreSQL backends.',
  },
  {
    label: 'Field Notes PWA',
    text: 'Built internal Next.js PWA with OpenAI Whisper bilingual voice transcription (English/Spanish), role-based auth via iron-session, photo capture with client-side compression, Upstash Redis persistence, and direct Google Chat integration — eliminating manual data entry for 50+ field supervisors.',
  },
  {
    label: 'Full-Stack Automation',
    text: 'Developed type-safe automation tools with TypeScript, Zod validation, and PostgreSQL for construction workflow tracking, project management, and billing systems.',
  },
  {
    label: 'Platform Administration',
    text: 'Owned Bluebeam and Procore Technologies environments for 50+ users including permissions, workflows, integrations, and system configuration.',
  },
  {
    label: 'Process Engineering',
    text: 'Built Excel/VBA macros cutting billing cycle from 30 to 5 minutes; designed LLM pipelines converting unstructured field notes into polished client reports.',
  },
];

function ExperienceSection() {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-pine-900 mb-8 pb-3 border-b-2 border-pine-100"
          >
            Experience
          </motion.h2>

          <motion.div variants={fadeUp}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
              <div>
                <h3 className="text-lg font-bold text-pine-900">
                  Technical Project Manager &amp; AI Automation Engineer
                </h3>
                <p className="text-sm text-ridge-700 font-medium">
                  Long &amp; DeLosa Construction Group
                </p>
              </div>
              <div className="text-sm text-granite-600 sm:text-right mt-1 sm:mt-0 shrink-0">
                <p>Brooklyn, NY</p>
                <p>Feb 2020 – Present</p>
              </div>
            </div>

            <ul className="mt-5 space-y-3 border-l-2 border-pine-200 pl-5">
              {experienceBullets.map((b) => (
                <li key={b.label} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-pine-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-granite-700 leading-relaxed">
                    <strong className="text-pine-800">{b.label}:</strong> {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface ResumeProject {
  name: string;
  github: string;
  tech: string[];
  description: string;
}

const resumeProjects: ResumeProject[] = [
  {
    name: 'Peloton MCP Server',
    github: 'https://github.com/cykj40/Peloton-MCP-Server',
    tech: ['TypeScript', 'Node.js', 'MCP SDK', 'SQLite', 'Zod', 'Axios', 'Vitest'],
    description:
      'Production MCP server correlating Peloton workout history with real-time Dexcom CGM blood glucose data for Type 1 diabetes management. Features JWT Bearer auth with auto-refresh, SQLite persistence, muscle group impact analytics, delayed hypoglycemia risk detection, and discipline-level glucose pattern insights. Ships with 55 tests across 9 test suites (Vitest) and an in-memory cache layer with rate-limit-aware retry logic.',
  },
  {
    name: 'Dexcom MCP Server',
    github: 'https://github.com/cykj40/dexcom-mcp-server',
    tech: ['TypeScript', 'Node.js', 'MCP Protocol', 'OAuth2', 'SQLite', 'Claude API'],
    description:
      'MCP server connecting Claude AI to Dexcom CGM devices for intelligent diabetes management. Implements adaptive metabolic modeling that learns insulin sensitivity over time, predictive intelligence for glucose impact estimation, parameter drift detection, and AGP visualization. Local-first architecture — all data stays on-device. Full OAuth2 for secure Dexcom API access.',
  },
  {
    name: 'TSheets / QuickBooks Time MCP Server',
    github: 'https://github.com/cykj40/Tsheets-MCP',
    tech: ['TypeScript', 'Node.js', 'Express.js', 'MCP Protocol', 'OAuth2', 'Zod', 'TSheets API', 'Claude API'],
    description:
      'Production MCP server enabling Claude AI to interact with the TSheets time-tracking API. Handles OAuth2 token management, hierarchical job structure parsing, and type-safe data extraction with Zod — cutting timesheet-to-Sage-100-Contractor billing from 30 minutes to under 5.',
  },
  {
    name: 'Diabetes AI Agent',
    github: 'https://github.com/cykj40',
    tech: ['Next.js', 'TypeScript', 'Fastify', 'PostgreSQL', 'Prisma', 'GPT-4o', 'Pinecone', 'JWT'],
    description:
      'Full-stack health platform with real-time Dexcom CGM integration, AI-driven glucose trend analysis, RAG-powered health Q&A via Pinecone vector store, JWT auth, and nutrition/workout tracking with interactive Recharts visualizations.',
  },
  {
    name: 'Health Journal AI',
    github: 'https://github.com/cykj40/journal-ai-app',
    tech: ['Next.js', 'TypeScript', 'Claude API', 'PostgreSQL', 'Drizzle ORM', 'Clerk', 'Recharts', 'Tailwind'],
    description:
      'AI-powered health journaling platform using Claude as the core reasoning layer. Log mood, sleep, vitals, and nutrition — Claude identifies patterns, flags anomalies, and surfaces actionable insights via a conversational chat interface with time-series visualizations.',
  },
  {
    name: 'T1Copilot',
    github: 'https://github.com/cykj40/t1pilot',
    tech: ['TypeScript', 'Next.js 15', 'Vercel AI SDK', 'LangGraph.ts', 'Claude API', 'MCP Protocol', 'Drizzle ORM', 'Neon Postgres', 'PGVector', 'Turso', 'Zod', 'Fly.io', 'Vitest', 'Laminar'],
    description:
      'Production multi-agent AI system for real-world T1D management. A 7-agent graph (Orchestrator, Glucose, Exercise, Modeling, Event Logger, Research, Insight) reasons over live Dexcom CGM readings, Peloton workout data, insulin events, and carb intake simultaneously. Built on Next.js 15, Vercel AI SDK streaming chat, LangGraph.ts, Drizzle ORM, Neon Postgres with PGVector, and two production MCP servers on Fly.io. Full HITL gate on all medical writes — no agent autonomously logs insulin or modifies parameters. Self-hosted BYOD architecture.',
  },
];

function ProjectsSection() {
  return (
    <section className="py-14 bg-pine-50/40">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-pine-900 mb-8 pb-3 border-b-2 border-pine-100"
          >
            Notable Projects
          </motion.h2>

          <div className="space-y-6">
            {resumeProjects.map((project) => (
              <motion.div key={project.name} variants={fadeUp}>
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex shrink-0 items-center gap-1 text-sm text-ridge-700 transition-colors hover:text-ridge-600"
                      >
                        <Github className="h-4 w-4" />
                        {project.github.replace('https://', '')}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-ridge-50 px-3 py-1 font-mono text-xs text-ridge-700"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-granite-700 leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const education = [
  {
    institution: 'Rutgers University',
    credential: 'Coding Bootcamp',
    period: '2022 – 2023',
    detail: 'Full-stack development, MERN stack, RESTful APIs, Git, testing methodologies.',
  },
  {
    institution: 'Santa Monica College',
    credential: 'A.S. General Sciences',
    period: '2018 – 2020',
    detail: 'Mathematics through Calculus I, Chemistry, Biology, C++ programming fundamentals.',
  },
  {
    institution: 'Frontend Masters',
    credential: 'Frontend & Fullstack Engineering',
    period: '2023 – Present',
    detail: '459+ hours — React, Next.js, Node.js, PostgreSQL, algorithms, performance optimization.',
  },
];

const certifications = [
  'DeepLearning.ai — Open Source Models with Hugging Face · Knowledge Graphs for RAG',
  'Kaggle — Python · Machine Learning · Pandas · Intermediate Machine Learning',
  'IBM — Web Development Professional Certificate',
  'Procore Technologies — Project Management · Field Productivity · AI in Construction',
  'FreeCodeCamp — JavaScript Algorithms & Data Structures · Front End Development Libraries',
  'Rutgers University — Full-Stack Coding Bootcamp (December 2022)',
];

function EducationSection() {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-pine-900 mb-8 pb-3 border-b-2 border-pine-100"
          >
            Education &amp; Certifications
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-5 mb-10">
            {education.map((edu) => (
              <div key={edu.institution} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <h3 className="font-bold text-pine-900">{edu.institution}</h3>
                  <p className="text-sm text-ridge-700 font-medium">{edu.credential}</p>
                  <p className="text-sm text-granite-600 mt-0.5">{edu.detail}</p>
                </div>
                <p className="text-sm text-granite-400 shrink-0 sm:text-right">{edu.period}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-bold text-pine-900 mb-4">Certifications</h3>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2 text-sm text-granite-700">
                  <CheckCircle2 className="h-4 w-4 text-pine-500 mt-0.5 shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface ResumeContentProps {
  /** id placed on the resume's h1, so a wrapping modal can point aria-labelledby at it. */
  headingId?: string;
}

export function ResumeContent({ headingId = 'resume-heading' }: ResumeContentProps) {
  return (
    <>
      <ResumeHeader headingId={headingId} />
      <SummarySection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
    </>
  );
}
