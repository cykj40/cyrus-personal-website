import { createFileRoute } from '@tanstack/react-router';
import { Engagements } from '@/components/sections/Engagements';
import { SchedulingSlot } from '@/components/sections/Contact';
import { Services } from '@/components/sections/Services';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});

function ServicesPage() {
  useDocumentTitle('Services | Cyrus Khiabani');

  return (
    <div className="pt-16">
      <Services />
      <Engagements />
      <div className="container mx-auto max-w-5xl px-4 pb-20">
        <SchedulingSlot />
      </div>
    </div>
  );
}
