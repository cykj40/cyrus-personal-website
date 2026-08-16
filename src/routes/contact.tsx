import { createFileRoute } from '@tanstack/react-router';
import { Contact } from '@/components/sections/Contact';
import { isContactService, type ContactService } from '@/components/sections/contact-services';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Route = createFileRoute('/contact')({
  // Hand-rolled rather than a zod schema: `validateSearch` runs during route
  // matching, so it stays in the entry chunk. A zod schema here would put all
  // ~55 kB of zod on the critical path of every page for one optional enum.
  // The return type is annotated so `service` stays *optional* on the way in,
  // matching the zod `.optional()` this replaced — otherwise every
  // `<Link to="/contact">` in the app would be required to pass a search object.
  validateSearch: (search: Record<string, unknown>): { service?: ContactService } => ({
    service: isContactService(search.service) ? search.service : undefined,
  }),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();

  useDocumentTitle('Contact | Cyrus Khiabani');

  return (
    <div className="pt-16">
      <Contact service={service} showSchedulingSlot />
    </div>
  );
}
