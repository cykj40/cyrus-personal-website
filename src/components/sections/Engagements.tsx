import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

const engagements = [
  {
    title: 'Automation Audit',
    description:
      'One week, fixed fee. I map your workflows, identify what’s automatable, and deliver a written build plan with effort estimates. You keep the plan whether or not we work together.',
    price: '$3,500',
  },
  {
    title: 'Build',
    description:
      'Scoped project, fixed fee. Typically 2–6 weeks. Design, build, deploy, hand off with documentation.',
    price: null,
  },
  {
    title: 'Ongoing',
    description:
      'Monthly retainer. Maintenance, iteration, and new automations as your operations change.',
    price: null,
  },
];

export const Engagements = () => {
  return (
    <section id="engagements" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Ways to Work Together"
          subtitle="Start with a focused assessment, a defined build, or ongoing support."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>{engagement.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-earth-600">{engagement.description}</p>
                </CardContent>
                <CardFooter className="border-t border-earth-400/20 pt-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-earth-500">Price</p>
                    {engagement.price ? (
                      <p className="mt-1 text-xl font-bold text-forest-900">{engagement.price}</p>
                    ) : (
                      <p className="mt-1 text-sm text-earth-500">
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
