import { Link } from '@tanstack/react-router';
import { track } from '@vercel/analytics/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { caseStudies } from '@/data/caseStudies';

const featuredSlugs = ['t1copilot', 'tsheets-billing', 'field-notes-pwa'] as const;

const featuredCaseStudies = featuredSlugs.map((slug) => {
  const caseStudy = caseStudies.find((entry) => entry.slug === slug);

  if (!caseStudy) {
    throw new Error(`Missing featured case study: ${slug}`);
  }

  return caseStudy;
});

const proofFor = (slug: (typeof featuredSlugs)[number]) => {
  const caseStudy = featuredCaseStudies.find((entry) => entry.slug === slug);

  if (!caseStudy) {
    throw new Error(`Missing featured case study: ${slug}`);
  }

  return slug === 't1copilot' ? [caseStudy.build, caseStudy.result[0]] : [caseStudy.result[0]];
};

export const FeaturedWork = () => {
  return (
    <section id="work" className="bg-pine-50/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Featured Work"
          subtitle="Production systems built around real operational constraints and measurable outcomes."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCaseStudies.map((caseStudy) => (
            <Card key={caseStudy.slug} className="flex h-full flex-col">
              <CardHeader>
                <p className="text-sm font-medium text-ridge-700">{caseStudy.client}</p>
                <CardTitle>{caseStudy.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4 text-granite-700">
                  {proofFor(caseStudy.slug as (typeof featuredSlugs)[number]).map((proof) => (
                    <p key={proof}>{proof}</p>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-granite-400/20 pt-4">
                <Link
                  to="/work/$slug"
                  params={{ slug: caseStudy.slug }}
                  onClick={() => track('cta_featured_work_case_study', { slug: caseStudy.slug })}
                  className="inline-flex items-center text-sm font-semibold text-ridge-700 transition-colors hover:text-ridge-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2"
                >
                  View case study →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/work"
            onClick={() => track('cta_featured_work_all')}
            className="inline-flex items-center text-base font-semibold text-ridge-700 transition-colors hover:text-ridge-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2"
          >
            See all work →
          </Link>
        </div>
      </div>
    </section>
  );
};
