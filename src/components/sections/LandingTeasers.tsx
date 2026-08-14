import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

const teasers = [
  {
    id: 'work',
    title: 'Case Studies',
    description: 'Production systems built around real operational constraints and measurable outcomes.',
    to: '/work',
    cta: 'View work',
  },
  {
    id: 'services',
    title: 'What I Do',
    description: 'Specialized AI systems built around the tools and information your business already uses.',
    to: '/services',
    cta: 'View services',
  },
  {
    id: 'about',
    title: 'Who You’re Working With',
    description: 'I build production automation for construction operations and personal health.',
    to: '/hire-me',
    cta: 'Hire me',
  },
] as const;

export const LandingTeasers = () => {
  return (
    <div>
      {teasers.map((teaser, index) => (
        <section
          key={teaser.id}
          id={teaser.id}
          className={index % 2 === 0 ? 'bg-forest-50/30 py-16' : 'py-16'}
        >
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-3xl">
              <CardHeader>
                <CardTitle>{teaser.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earth-600">{teaser.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={teaser.to}>
                  <Button variant="outline">{teaser.cta}</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      ))}
    </div>
  );
};
