import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  Download, MapPin, Phone, Mail, Globe, Github, Linkedin,
  ArrowLeft, ExternalLink, CheckCircle2,
} from 'lucide-react';
import { skills } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { About } from '@/components/sections/About';

export const Route = createFileRoute('/engineering')({
  beforeLoad: () => {
    throw redirect({ to: '/hire-me' });
  },
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function PageHeader() {
  return (
    <section className="bg-gradient-to-br from-pine-50 via-white to-ridge-50 bg-topographic pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <Link
              to="/"
              search={{ scrollTo: '' }}
              className="inline-flex items-center gap-2 text-sm text-granite-600 hover:text-pine-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold text-pine-900 sm:text-6xl mb-3"
          >
            Cyrus Khiabani
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl font-medium text-ridge-700 mb-6"
          >
            AI Engineer &nbsp;·&nbsp; MCP Server Developer &nbsp;·&nbsp; Full-Stack Engineer
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ocean-400/30 bg-ocean-400/[0.07] px-4 py-2 text-sm font-medium text-pine-800"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-ocean-500 ring-[3px] ring-ocean-400/20" />
            Open to full-time and part-time roles. Based in Monmouth County, NJ — willing to travel for the right opportunity.
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

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a href="/resume/Cyrus_Khiabani_AI_Engineer_Resume.pdf" download>
              <Button size="lg">
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline">Get in touch</Button>
            </Link>
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
            MCP server development, and agentic workflow automation. Currently building T1Copilot —
            an open-source, self-hosted multi-agent AI platform for Type 1 Diabetes management,
            with a 7-agent graph reasoning over live CGM, workout, and metabolic data. Every medical
            write passes through a human-in-the-loop gate; no agent autonomously logs insulin or
            modifies parameters. Proven 90% reduction in operational overhead through AI deployments built on TypeScript, Next.js,
            Vercel AI SDK, and PostgreSQL. Strong bias toward clean architecture, type-safety, and
            systems that scale beyond prototypes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="border-y border-granite-400/20 bg-pine-50/40 py-14">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="mb-6 border-b-2 border-pine-100 pb-3 text-2xl font-bold text-pine-900"
          >
            The path here
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base leading-relaxed text-granite-700">
            Tech's been an obsession since Atari — arcades, consoles, gadgets, all of it — channeled through a science background into a coding bootcamp about five years ago instead of a lab. Three months in, he picked up GitHub Copilot during its free trial, before AI-assisted coding was common knowledge, and has spent the years since figuring out what actually works — testing tools, refining habits, building AI-first the whole way. A lot of that drive now goes into building the health tech he needs for his own Type 1 diabetes.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 rounded-xl border border-ocean-400/30 bg-white p-5 shadow-sm sm:p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.09em] text-ridge-700">
              Continue the conversation
            </p>
            <p className="mt-2 text-sm leading-relaxed text-granite-700">
              Use the <span className="font-medium text-pine-900">“Ask me about Cyrus”</span> launcher in the bottom-right corner for the longer version. Try:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Suggested chat questions">
              {[
                'What’s Cyrus’s path into tech?',
                'How does he work with AI coding agents?',
                'Why is he building health tech?',
              ].map((question) => (
                <li
                  key={question}
                  className="rounded-full bg-ocean-50 px-3 py-1.5 text-sm text-pine-800"
                >
                  {question}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
            {skills.map((cat) => (
              <motion.div key={cat.category} variants={fadeUp}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{cat.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-ridge-50 px-3 py-1 text-xs text-ridge-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
    label: 'MCP Servers Shipped',
    text: 'Designed and shipped production MCP servers, including TSheets/QuickBooks Time with full OAuth2 flow, reducing manual timesheet-to-billing processing by 90% and enabling Claude AI to extract, format, and route construction job notes directly into Sage 100 Contractor.',
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
                  Long &amp; DeLosa Construction Group
                </h3>
                <p className="text-sm text-ridge-700 font-medium">
                  Technical Project Manager &amp; AI Automation Engineer
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

const caseStudyProjectIds = new Set(['tsheets-mcp', 'field-notes', 't1copilot']);
const engineeringProjects = projectsData.filter((project) => !caseStudyProjectIds.has(project.id));

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
            More Engineering Projects
          </motion.h2>

          <motion.div variants={fadeUp}>
            <Card className="divide-y divide-granite-400/20 p-0">
              {engineeringProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div>
                    <h3 className="font-bold text-pine-900">{project.title}</h3>
                    <p className="mt-1 text-sm text-granite-700">{project.description}</p>
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-1 text-sm text-ridge-700 transition-colors hover:text-ridge-700"
                    >
                      <Github className="h-4 w-4" />
                      Repository
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </Card>
          </motion.div>
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
  'CompTIA A+ Core 1 (220-1101) — passed',
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

function StickyDownload() {
  // Pinned bottom-LEFT so it clears the chat button (bottom-right, z-50).
  // Hidden below md: at 24px from the bottom its lower edge intrudes into the
  // iOS home-indicator / Android gesture-nav safe area, so on mobile we rely on
  // the inline "Download PDF" button in the page header instead.
  return (
    <a
      href="/resume/Cyrus_Khiabani_AI_Engineer_Resume.pdf"
      download
      className="hidden md:block fixed bottom-6 left-6 z-40"
      aria-label="Download resume PDF"
    >
      <Button size="md" className="shadow-lg shadow-pine-900/20">
        <Download className="h-4 w-4 mr-2" />
        Download PDF
      </Button>
    </a>
  );
}

interface EngineeringContentProps {
  includeAbout?: boolean;
}

export function EngineeringContent({ includeAbout = false }: EngineeringContentProps) {
  return (
    <>
      <PageHeader />
      <SummarySection />
      <StorySection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <StickyDownload />
      {includeAbout && <About />}
    </>
  );
}
