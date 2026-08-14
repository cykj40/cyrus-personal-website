import { Link } from '@tanstack/react-router';
import { track } from '@vercel/analytics/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

export const LandingTeasers = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-3xl text-center">
          <CardHeader>
            <CardTitle>Who You’re Working With</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-granite-700">
              I build production automation for construction operations and personal health.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Link
              to="/hire-me"
              onClick={() => track('cta_home_hire')}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-ember-500 px-6 text-base font-semibold text-pine-950 transition-colors hover:bg-ember-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2"
            >
              Hire me
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
