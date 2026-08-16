import { createFileRoute } from '@tanstack/react-router';
import { Engagements } from '@/components/sections/Engagements';
import { SchedulingSlot } from '@/components/sections/Contact';
import { Services } from '@/components/sections/Services';
import { ServicesProcess } from '@/components/sections/ServicesProcess';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cyrus Khiabani — AI Engineering Services',
  url: 'https://cyruskhiabani.com/services',
  description: 'Freelance AI agent, MCP server, and RAG chatbot development for companies needing production-grade AI systems.',
  areaServed: 'US',
  provider: {
    '@type': 'Person',
    name: 'Cyrus Khiabani',
  },
} as const;

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});

function ServicesPage() {
  useDocumentTitle('Freelance & Project Work | Cyrus Khiabani', {
    description: 'Custom AI agents, MCP servers, and RAG chatbots — scoped, priced, and built for companies that need production-grade AI systems.',
    image: '/og/services.png',
    path: '/services',
  });

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(professionalServiceSchema)}</script>
      <div className="pt-16">
        <Services />
        <Engagements />
        <ServicesProcess />
        <div className="container mx-auto max-w-5xl px-4 pb-20">
          <SchedulingSlot />
        </div>
      </div>
    </>
  );
}
