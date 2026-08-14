import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

const engagements = [
  {
    title: 'Automation Audit',
    description:
      "One week, fixed fee. I map your workflows, identify what's automatable, and deliver a written build plan with effort estimates. You keep the plan whether or not we work together.",
    price: '$3,500',
  },
  {
    title: 'Setup & Integration',
    description:
      'Configuring existing MCP servers and AI tools into your systems — vetted, credentialed safely, and tested. Covers up to 2 integrations.',
    price: '$2,500',
  },
  {
    title: 'Build',
    description:
      'Scoped project, fixed fee. Typically 2–6 weeks. Design, build, deploy, hand off with documentation.',
    price: 'Starting at $8,000',
  },
  {
    title: 'Ongoing',
    description:
      'Monthly retainer. Up to 10 hours of maintenance, iteration, and priority support. Additional work billed at the Build rate.',
    price: '$3,000/mo',
  },
];

export const Engagements = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="engagements" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Engagements"
          subtitle="Start with a focused assessment, a defined build, or ongoing support."
        />

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>{engagement.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-granite-700">{engagement.description}</p>
                </CardContent>
                <CardFooter className="border-t border-granite-400/20 pt-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-granite-600">Price</p>
                    {engagement.price ? (
                      <p className="mt-1 text-xl font-bold text-pine-900">{engagement.price}</p>
                    ) : (
                      <p className="mt-1 text-sm text-granite-600">
                        {/* TODO: fill in price */}
                        To be confirmed
                      </p>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
