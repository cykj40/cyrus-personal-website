import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chat';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cyrus Khiabani',
  jobTitle: 'AI Engineer, MCP Server Developer, Full-Stack Engineer',
  url: 'https://cyruskhiabani.com',
  sameAs: [
    'https://github.com/cykj40',
    'https://www.linkedin.com/in/cyrus-jalili-khiabani-44605b163',
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'NJ',
    addressCountry: 'US',
  },
} as const;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </>
  );
}
