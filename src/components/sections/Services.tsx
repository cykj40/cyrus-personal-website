import { motion } from 'framer-motion';
import { Bot, Code2, Database, Puzzle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'End-to-end web application development with React, TypeScript, Node.js, and modern frameworks. Clean, maintainable code that scales.',
    features: ['React & Next.js', 'TypeScript', 'REST & GraphQL APIs', 'PostgreSQL & Prisma'],
  },
  {
    icon: Bot,
    title: 'AI Integration & Automation',
    description:
      'Build intelligent systems with Claude API, MCP servers, and custom AI workflows. Make your tools smarter.',
    features: [
      'MCP Server Development',
      'Claude API Integration',
      'Workflow Automation',
      'Prompt Engineering',
    ],
  },
  {
    icon: Database,
    title: 'Health Tech Integration',
    description:
      'Specialized in medical device APIs (Dexcom, TSheets) and health data systems. HIPAA-aware development.',
    features: [
      'Dexcom CGM Integration',
      'Medical API Development',
      'Health Data Visualization',
      'Secure Data Handling',
    ],
  },
  {
    icon: Puzzle,
    title: 'Technical Consulting',
    description:
      'Architecture reviews, code audits, and strategic guidance for your projects. Get expert advice on technical decisions.',
    features: [
      'Code Review & Audits',
      'Architecture Design',
      'Tech Stack Selection',
      'Performance Optimization',
    ],
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What I Do"
          subtitle="Specialized services for startups, health tech companies, and developers"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-forest-100 p-3">
                        <Icon className="h-6 w-6 text-forest-600" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <p className="text-earth-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-earth-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-lg text-earth-600">
            Ready to build something great together?
          </p>
          <a
            href="#contact"
            className="inline-block rounded-lg bg-forest-600 px-8 py-3 font-medium text-white transition-colors hover:bg-forest-700"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>
    </section>
  );
};
