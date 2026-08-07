import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Contact, CONTACT_SERVICE_VALUES } from '@/components/sections/Contact';

const contactSearchSchema = z.object({
  service: z.enum(CONTACT_SERVICE_VALUES).optional(),
});

export const Route = createFileRoute('/contact')({
  validateSearch: contactSearchSchema,
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();

  return (
    <div className="pt-16">
      <Contact service={service} showSchedulingSlot />
    </div>
  );
}
