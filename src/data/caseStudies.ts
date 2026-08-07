export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  problem: string;
  build: string;
  result: string[];
  stack: string[];
  featured: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'tsheets-billing',
    client: 'Construction group, Brooklyn NY',
    title: 'From Timesheets to Billing in Under 5 Minutes',
    problem:
      'Timesheet-to-billing processing was 30 minutes of manual transcription per cycle, translating TSheets time entries into Sage 100 Contractor billing data by hand.',
    build:
      'Built a production MCP server with full OAuth2 token management, hierarchical job structure parsing, and Zod-validated data extraction. Claude reads the TSheets API through the server and routes formatted job notes directly into Sage 100 Contractor.',
    result: [
      '30 minutes reduced to under 5',
      '90% reduction in manual processing',
      'Zero transcription errors since deployment',
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'Express.js',
      'MCP Protocol',
      'OAuth2',
      'Zod',
      'TSheets API',
      'Claude API',
    ],
    featured: true,
  },
  {
    slug: 'field-notes-pwa',
    client: 'Construction group, Brooklyn NY',
    title: 'Field Reports Delivered in Seconds',
    problem:
      '50+ field supervisors, many Spanish-speaking, were phoning in daily reports that office staff retyped by hand — slow, error-prone, and a bottleneck between the field and the office.',
    build:
      'Built an installable PWA with OpenAI Whisper bilingual voice transcription (English/Spanish), photo capture with client-side compression, role-based auth via iron-session, Upstash Redis persistence, and direct delivery into Google Chat.',
    result: [
      'Eliminated manual data entry for 50+ field supervisors',
      'Reports land in the office within seconds of being recorded',
      'Works offline on a job site',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'OpenAI Whisper API',
      'iron-session',
      'Upstash Redis',
      'PWA',
    ],
    featured: true,
  },
  {
    slug: 't1copilot',
    client: 'Personal product',
    title: 'Safety-Gated AI for Type 1 Diabetes',
    problem:
      'Type 1 diabetes management requires reasoning over glucose, exercise, insulin, and carb data simultaneously — no single consumer tool does this.',
    build:
      'Built a 7-agent LangGraph.ts system (Orchestrator, Glucose, Exercise, Modeling, Event Logger, Research, Insight agents) reasoning over live Dexcom CGM readings, Peloton workout data, insulin events, and carb intake. Two production MCP servers deployed on Fly.io. Next.js 15 with Vercel AI SDK streaming chat. Neon Postgres with pgvector.',
    result: [
      'Full human-in-the-loop gate on all medical writes — no agent autonomously logs insulin or modifies parameters',
      'Production system, self-hosted BYOD architecture',
      'Demonstrates multi-agent orchestration with hard safety constraints',
    ],
    stack: [
      'TypeScript',
      'Next.js 15',
      'Vercel AI SDK',
      'LangGraph.ts',
      'Claude API',
      'MCP Protocol',
      'Drizzle ORM',
      'Neon Postgres',
      'pgvector',
    ],
    featured: true,
  },
];
