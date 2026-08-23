import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Hero }     from '@/components/sections/Hero';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { scrollToSection } from '@/lib/utils';
import { LandingTeasers } from '@/components/sections/LandingTeasers';
import { WhatIBuild } from '@/components/sections/WhatIBuild';
import { FeaturedWork } from '@/components/sections/FeaturedWork';

const HOME_TITLE = 'Cyrus Khiabani — AI-First Programmer | Chatbots, Agents & MCP Servers';
const HOME_DESCRIPTION = 'AI Engineer building production chatbots, agents, and MCP servers. Open to full-time, part-time, and freelance work.';

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>) => ({
    scrollTo: typeof search.scrollTo === 'string' ? search.scrollTo : '',
  }),
  component: HomePage,
});

function HomePage() {
  const { scrollTo } = useSearch({ from: '/' });

  useDocumentTitle(HOME_TITLE, {
    description: HOME_DESCRIPTION,
    image: '/og/home.png',
    path: '/',
  });

  useEffect(() => {
    if (!scrollTo) return;
    const timer = setTimeout(() => scrollToSection(scrollTo), 100);
    return () => clearTimeout(timer);
  }, [scrollTo]);

  return (
    <>
      <Hero />
      <WhatIBuild />
      <FeaturedWork />
      <LandingTeasers />
    </>
  );
}
