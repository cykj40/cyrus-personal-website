import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  Download, MapPin, Phone, Mail, Globe, Github, Linkedin,
  ArrowLeft, ExternalLink, CheckCircle2,
} from 'lucide-react';
import { skills } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const Route = createFileRoute('/engineering')({
  component: EngineeringPage,
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
    <section className="bg-gradient-to-br from-forest-50 via-white to-mountain-50 bg-topographic pt-28 pb-16">
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
              className="inline-flex items-center gap-2 text-sm text-earth-500 hover:text-forest-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold text-forest-900 sm:text-6xl mb-3"
          >
            Cyrus Khiabani
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl font-medium text-mountain-600 mb-6"
          >
            AI Engineer &nbsp;·&nbsp; MCP Server Developer &nbsp;·&nbsp; Full-Stack Engineer
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-earth-500 mb-8"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-forest-500" />
              Holmdel, NJ
            </span>
            <a href="tel:6467456825" className="flex items-center gap-1.5 hover:text-forest-600 transition-colors">
              <Phone className="h-4 w-4 text-forest-500" />
              (646) 745-6825
            </a>
            <a href="mailto:cyrus@cyruskhiabani.com" className="flex items-center gap-1.5 hover:text-forest-600 transition-colors">
              <Mail className="h-4 w-4 text-forest-500" />
              cyrus@cyruskhiabani.com
            </a>
            <a href="https://cyruskhiabani.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-forest-600 transition-colors">
              <Globe className="h-4 w-4 text-forest-500" />
              cyruskhiabani.com
            </a>
            <a href="https://github.com/cykj40" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-forest-600 transition-colors">
              <Github className="h-4 w-4 text-forest-500" />
              github.com/cykj40
            </a>
            <a href="https://www.linkedin.com/in/cyrus-jalili-khiabani-44605b163" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-forest-600 transition-colors">
              <Linkedin className="h-4 w-4 text-forest-500" />
              LinkedIn
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <a href="/resume/Cyrus_Khiabani_AI_Engineer_Resume.pdf" download>
              <Button size="lg">
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </Button>
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
            className="text-2xl font-bold text-forest-900 mb-6 pb-3 border-b-2 border-forest-100"
          >
            Summary
          </motion.h2>
          <motion.p variants={fadeUp} className="text-earth-600 leading-relaxed text-base">
            AI Engineer and Full-Stack Developer specializing in production-grade LLM integration,
            MCP server development, and agentic workflow automation. Currently building T1Copilot —
            an open-source, self-hosted multi-agent AI platform for Type 1 Diabetes management,
            with 7 specialized agents reasoning over live CGM, workout, and metabolic data. Proven 90%
            reduction in operational overhead through AI deployments built on TypeScript, Next.js,
            Vercel AI SDK, and PostgreSQL. Strong bias toward clean architecture, type-safety, and
            systems that scale beyond prototypes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="py-14 bg-forest-50/40">
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-forest-900 mb-8 pb-3 border-b-2 border-forest-100 max-w-3xl mx-auto"
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
                          className="rounded-full bg-mountain-50 px-3 py-1 text-xs text-mountain-700"
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
            className="text-2xl font-bold text-forest-900 mb-8 pb-3 border-b-2 border-forest-100"
          >
            Experience
          </motion.h2>

          <motion.div variants={fadeUp}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
              <div>
                <h3 className="text-lg font-bold text-forest-900">
                  Long &amp; DeLosa Construction Group
                </h3>
                <p className="text-sm text-mountain-600 font-medium">
                  Technical Project Manager &amp; AI Automation Engineer
                </p>
              </div>
              <div className="text-sm text-earth-500 sm:text-right mt-1 sm:mt-0 shrink-0">
                <p>Brooklyn, NY</p>
                <p>Feb 2020 – Present</p>
              </div>
            </div>

            <ul className="mt-5 space-y-3 border-l-2 border-forest-200 pl-5">
              {experienceBullets.map((b) => (
                <li key={b.label} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-forest-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-earth-600 leading-relaxed">
                    <strong className="text-forest-800">{b.label}:</strong> {b.text}
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

function ProjectsSection() {
  return (
    <section className="py-14 bg-forest-50/40">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-forest-900 mb-8 pb-3 border-b-2 border-forest-100"
          >
            Notable Projects
          </motion.h2>

          {/* Featured: T1Copilot */}
          <motion.div variants={fadeUp} className="mb-6">
            <Card className="border-2 border-forest-200 bg-forest-50/40">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-xs font-semibold text-forest-600 uppercase tracking-wide mb-1 block">
                      Flagship Project
                    </span>
                    <h3 className="font-bold text-forest-900 text-lg">T1Copilot</h3>
                  </div>
                  <a
                    href="https://github.com/cykj40/t1pilot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-mountain-600 hover:text-mountain-700 shrink-0 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['TypeScript', 'Next.js 15', 'Vercel AI SDK', 'LangGraph.ts', 'Claude API', 'MCP Protocol', 'Drizzle ORM', 'Neon Postgres', 'PGVector', 'Turso', 'Zod', 'Fly.io', 'Vitest', 'Laminar'].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-mountain-50 px-2.5 py-0.5 text-xs text-mountain-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-earth-600 leading-relaxed">
                  Production multi-agent AI system built for real-world T1D management. A 7-agent graph
                  (Orchestrator, Glucose, Exercise, Modeling, Event Logger, Research, Insight) reasons over
                  live Dexcom CGM readings, Peloton workout data, insulin events, and carb intake
                  simultaneously. Built on Next.js 15, Vercel AI SDK streaming chat, LangGraph.ts, Drizzle
                  ORM, Neon Postgres with PGVector, and two production MCP servers deployed on Fly.io.
                  Implements a full HITL gate on all medical writes — no agent autonomously logs insulin or
                  modifies parameters. Self-hosted BYOD architecture; each user owns their instance and
                  their data.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-4">
            {projectsData.filter((p) => p.id !== 't1copilot').map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <Card>
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-forest-900 text-base">{project.title}</h3>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-mountain-600 hover:text-mountain-700 shrink-0 transition-colors"
                        >
                          <Github className="h-3.5 w-3.5" />
                          GitHub
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-mountain-50 px-2.5 py-0.5 text-xs text-mountain-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-earth-600 leading-relaxed">
                      {project.longDescription}
                    </p>
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
            className="text-2xl font-bold text-forest-900 mb-8 pb-3 border-b-2 border-forest-100"
          >
            Education &amp; Certifications
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-5 mb-10">
            {education.map((edu) => (
              <div key={edu.institution} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <h3 className="font-bold text-forest-900">{edu.institution}</h3>
                  <p className="text-sm text-mountain-600 font-medium">{edu.credential}</p>
                  <p className="text-sm text-earth-500 mt-0.5">{edu.detail}</p>
                </div>
                <p className="text-sm text-earth-400 shrink-0 sm:text-right">{edu.period}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-bold text-forest-900 mb-4">Certifications</h3>
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2 text-sm text-earth-600">
                  <CheckCircle2 className="h-4 w-4 text-forest-500 mt-0.5 shrink-0" />
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
      <Button size="md" className="shadow-lg shadow-forest-900/20">
        <Download className="h-4 w-4 mr-2" />
        Download PDF
      </Button>
    </a>
  );
}

function EngineeringPage() {
  return (
    <>
      <PageHeader />
      <SummarySection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <StickyDownload />
    </>
  );
}
