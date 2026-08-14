import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import { Bot, Workflow, Puzzle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const services = [
  {
    icon: Workflow,
    title: 'Workflow Automation & AI Agents',
    description:
      'Agents that do repetitive work across your existing tools — intake, reporting, document processing, follow-ups. They run on a schedule or on a trigger, and a human approves anything that matters.',
    bestFor: 'operations, back-office, reporting, field-to-office handoffs',
    cta: 'Automate a workflow',
    service: 'automation',
    analyticsEvent: 'cta_service_automation',
  },
  {
    icon: Puzzle,
    title: 'System & MCP Integrations',
    description:
      "Secure MCP servers that let Claude and other AI tools read and write your actual business systems — OAuth2, type-safe validation, audit trails. This is the part most people can't build.",
    bestFor: 'internal tools, third-party APIs, legacy line-of-business software',
    cta: 'Discuss an integration',
    service: 'mcp',
    analyticsEvent: 'cta_service_mcp',
  },
  {
    icon: Bot,
    title: 'AI Assistants & Chatbots',
    description:
      'Assistants that answer questions from your real business information — documents, databases, product data — with citations and no invented answers.',
    bestFor: 'customer support, internal knowledge bases, sales enablement',
    cta: 'Discuss an assistant',
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

                  <CardContent className="flex-1">
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
                    >
                      <Button size="sm">{service.cta}</Button>
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
