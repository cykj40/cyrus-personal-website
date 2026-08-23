import { createFileRoute } from '@tanstack/react-router';
import { Projects } from '@/components/sections/Projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Route = createFileRoute('/work/')({
  component: WorkIndexPage,
});

function WorkIndexPage() {
  useDocumentTitle('Work | Cyrus Khiabani', {
    description: 'Case studies: production MCP servers, multi-agent AI systems, and automation tools built for real users — not demos.',
    image: '/og/work.png',
    path: '/work',
  });

  return (
    <div className="pt-16">
      <Projects />
    </div>
  );
}
