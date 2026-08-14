import { createFileRoute } from '@tanstack/react-router';
import { EngineeringContent } from '@/routes/engineering';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Route = createFileRoute('/hire-me')({
  component: HireMePage,
});

function HireMePage() {
  useDocumentTitle('Hire Me | Cyrus Khiabani');

  return <EngineeringContent includeAbout />;
}
