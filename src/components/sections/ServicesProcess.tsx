import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    title: 'Audit',
    description:
      'I map the current workflow, confirm access and constraints, and document the recommended scope, effort, and acceptance criteria.',
  },
  {
    title: 'Build',
    description:
      'I implement the agreed scope in a working environment and review progress with you at defined checkpoints.',
  },
  {
    title: 'Deploy',
    description:
      'I move the approved system into production, verify its integrations, and provide setup and operating documentation.',
  },
  {
    title: 'Support',
    description:
      'After launch, support can continue under the monthly retainer for maintenance, iteration, and priority help.',
  },
] as const;

export const ServicesProcess = () => (
  <section id="process" className="bg-pine-50/30 py-20">
    <div className="container mx-auto px-4">
      <SectionHeading
        title="How This Works"
        subtitle="Audit → Build → Deploy → Support"
      />

      <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Card className="h-full">
              <CardHeader>
                <p className="font-mono text-xs font-medium uppercase tracking-wide text-ridge-700">
                  Step {index + 1}
                </p>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-granite-700">{step.description}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
