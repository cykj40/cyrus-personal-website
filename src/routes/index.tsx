import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Hero }     from '@/components/sections/Hero';
import { About }    from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { Engagements } from '@/components/sections/Engagements';
import { Contact }  from '@/components/sections/Contact';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { scrollToSection } from '@/lib/utils';

const HOME_TITLE = 'Cyrus Khiabani — AI Agents, MCP Servers & Workflow Automation';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    scrollTo: typeof search.scrollTo === 'string' ? search.scrollTo : '',
  }),
  component: HomePage,
});

function HomePage() {
  const { scrollTo } = useSearch({ from: '/' });

  useDocumentTitle(HOME_TITLE);

  useEffect(() => {
    if (!scrollTo) return;
    const timer = setTimeout(() => scrollToSection(scrollTo), 100);
    return () => clearTimeout(timer);
  }, [scrollTo]);

  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Engagements />
      <About />
      <Contact />
    </>
  );
}
