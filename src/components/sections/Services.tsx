import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import { Bot, Workflow, Puzzle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { caseStudies } from '@/data/caseStudies';
import { projectsData } from '@/data/projects';

const tsheetsBilling = caseStudies.find((caseStudy) => caseStudy.slug === 'tsheets-billing');
const fieldNotes = caseStudies.find((caseStudy) => caseStudy.slug === 'field-notes-pwa');
const healthJournal = projectsData.find((project) => project.id === 'journalai');

if (!tsheetsBilling || !fieldNotes || !healthJournal) {
  throw new Error('Missing project data required by the services page.');
}

const services = [
  {
    icon: Puzzle,
    title: 'MCP Servers',
    description:
      'A production MCP server or integration that connects an AI client to the business systems you already use. The scope includes authentication, typed tools, input validation, testing, deployment, documentation, and handoff.',
    exampleTitle: 'TSheets MCP',
    example: tsheetsBilling.result[0],
    price:
      'Custom MCP server builds start at $8,000. Existing-server setup is $2,500 for up to five integrations, plus $750 for each additional integration.',
    bestFor: 'third-party APIs, internal tools, and legacy line-of-business software',
    cta: 'Discuss an integration',
    service: 'mcp',
    analyticsEvent: 'cta_service_mcp',
  },
  {
    icon: Workflow,
    title: 'Agents',
    description:
      'A custom agent or automation for a defined operational workflow. The build includes triggers, integrations, validation, human approval steps where needed, production deployment, documentation, and handoff.',
    exampleTitle: 'Field Notes PWA',
    example: fieldNotes.result[0],
    price: 'Custom AI agent builds start at $10,000.',
    bestFor: 'operations, back-office work, reporting, and field-to-office handoffs',
    cta: 'Discuss an agent',
    service: 'automation',
    analyticsEvent: 'cta_service_automation',
  },
  {
    icon: Bot,
    title: 'RAG Chatbots',
    description:
      'A retrieval-backed chatbot that answers questions from approved documents, databases, or product data. The build includes source ingestion, retrieval and citation setup, interface integration, deployment, documentation, and handoff.',
    exampleTitle: healthJournal.title,
    example: healthJournal.description,
    price: 'RAG chatbot builds start at $8,000.',
    bestFor: 'customer support, internal knowledge bases, and sales enablement',
    cta: 'Discuss a chatbot',
    service: 'assistant',
    analyticsEvent: 'cta_service_assistant',
  },
] as const;

export const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What I Do"
          subtitle="Specialized AI systems built around the tools and information your business already uses"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="flex h-full flex-col">
                  <CardHeader>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-pine-100 p-3">
                        <Icon className="h-6 w-6 text-pine-600" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <p className="text-granite-700">{service.description}</p>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-granite-700">
                      <span className="font-medium text-pine-800">Example:</span>{' '}
                      {service.exampleTitle} — {service.example}
                    </p>
                    <p className="text-sm text-granite-700">
                      <span className="font-medium text-pine-800">Price:</span>{' '}
                      {service.price}
                    </p>
                    <p className="text-sm text-granite-700">
                      <span className="font-medium text-pine-800">Best for:</span>{' '}
                      {service.bestFor}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <Link
                      to="/contact"
                      search={{ service: service.service }}
                      onClick={() =>
                        track(service.analyticsEvent, { service: service.service })
                      }
                      className="inline-flex h-9 items-center justify-center rounded-lg bg-pine-600 px-3 text-sm font-medium text-white transition-all hover:bg-pine-700 active:bg-pine-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2"
                    >
                      {service.cta}
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
