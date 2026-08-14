import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { caseStudies } from '@/data/caseStudies';

export const Projects = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="work" className="bg-pine-50/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Case Studies"
          subtitle="Production systems built around real operational constraints and measurable outcomes."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies
            .filter((caseStudy) => caseStudy.featured)
            .map((caseStudy, index) => (
              <motion.div
                key={caseStudy.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="flex h-full flex-col">
                  <CardHeader>
                    <p className="text-sm font-medium text-ridge-700">{caseStudy.client}</p>
                    <CardTitle>{caseStudy.title}</CardTitle>
                    <p className="text-sm text-granite-600">{caseStudy.problem}</p>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <ul className="mb-5 space-y-2">
                      {caseStudy.result.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm text-granite-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pine-500" />
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {caseStudy.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-ridge-50 px-2 py-1 text-xs text-ridge-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Link
                      to="/work/$slug"
                      params={{ slug: caseStudy.slug }}
                      onClick={() => track('case_study_click', { slug: caseStudy.slug })}
                    >
                      <Button variant="outline" size="sm">
                        View case study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
