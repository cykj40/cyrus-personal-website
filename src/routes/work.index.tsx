import { createFileRoute } from '@tanstack/react-router';
import { Projects } from '@/components/sections/Projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Route = createFileRoute('/work/')({
  component: WorkIndexPage,
});

function WorkIndexPage() {
  useDocumentTitle('Work | Cyrus Khiabani');

  return (
    <div className="pt-16">
      <Projects />
    </div>
  );
}
