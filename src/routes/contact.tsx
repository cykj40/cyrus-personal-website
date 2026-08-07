import { createFileRoute } from '@tanstack/react-router';
import { Contact } from '@/components/sections/Contact';

// Phase 1: this route reuses the existing Contact form so the "Book a call"
// nav button and service-card CTAs resolve. Phase 5b rebuilds this page as the
// booking page (scheduler embed + ?service= intent pre-fill).
export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="pt-16">
      <Contact />
    </div>
  );
}
