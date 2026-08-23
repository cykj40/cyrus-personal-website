import { Link } from '@tanstack/react-router';
import { track } from '@vercel/analytics/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

const buildTypes = [
  {
    title: 'Chatbots',
    description:
      'Assistants that answer questions from your real business information — documents, databases, product data — with citations and no invented answers.',
    example: {
      label: 'View Health Journal AI on GitHub',
      href: 'https://github.com/cykj40/journal-ai-app',
      analyticsEvent: 'cta_home_build_chatbots_example',
    },
  },
  {
    title: 'Agents',
    description:
      'Agents that do repetitive work across your existing tools — intake, reporting, document processing, follow-ups. They run on a schedule or on a trigger, and a human approves anything that matters.',
    example: {
      label: 'See T1Copilot',
      slug: 't1copilot',
      analyticsEvent: 'cta_home_build_agents_example',
    },
  },
  {
    title: 'MCP Servers',
    description:
      "Secure MCP servers that let Claude and other AI tools read and write your actual business systems — OAuth2, type-safe validation, audit trails. This is the part most people can't build.",
    example: {
      label: 'See TSheets MCP',
      slug: 'tsheets-billing',
      analyticsEvent: 'cta_home_build_mcp_example',
    },
  },
] as const;

const actionClassName =
  'inline-flex items-center text-sm font-semibold text-ridge-700 transition-colors hover:text-ridge-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2';

export const WhatIBuild = () => {
  return (
    <section id="what-i-build" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What I Build"
          subtitle="Chatbots, agents & MCP servers that run in production — not demos."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {buildTypes.map((buildType) => (
            <Card key={buildType.title} className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>{buildType.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-granite-700">{buildType.description}</p>
              </CardContent>
              <CardFooter className="flex-col items-start gap-3 border-t border-granite-400/20 pt-4">
                <Link
                  to="/services"
                  onClick={() => track('cta_home_build_services', { category: buildType.title })}
                  className={actionClassName}
                >
                  Explore services →
                </Link>

                {'href' in buildType.example ? (
                  <a
                    href={buildType.example.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track(buildType.example.analyticsEvent)}
                    className={actionClassName}
                  >
                    {buildType.example.label} ↗
                  </a>
                ) : (
                  <CaseStudyExample example={buildType.example} />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

type CaseStudyExampleProps = {
  example: Extract<(typeof buildTypes)[number]['example'], { slug: string }>;
};

const CaseStudyExample = ({ example }: CaseStudyExampleProps) => (
  <Link
    to="/work/$slug"
    params={{ slug: example.slug }}
    onClick={() => track(example.analyticsEvent, { slug: example.slug })}
    className={actionClassName}
  >
    {example.label} →
  </Link>
);
