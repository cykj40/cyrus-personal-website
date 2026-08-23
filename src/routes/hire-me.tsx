import { createFileRoute } from '@tanstack/react-router';
import { EngineeringContent } from '@/components/sections/EngineeringContent';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Route = createFileRoute('/hire-me')({
  component: HireMePage,
});

function HireMePage() {
  useDocumentTitle('Hire Me | Cyrus Khiabani', {
    description: 'AI-First Programmer open to full-time and part-time roles. Monmouth County, NJ — willing to travel.',
    image: '/og/hire-me.png',
    path: '/hire-me',
  });

  return <EngineeringContent includeAbout />;
}
