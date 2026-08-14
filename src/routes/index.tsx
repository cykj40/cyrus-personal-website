import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Hero }     from '@/components/sections/Hero';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { scrollToSection } from '@/lib/utils';
import { LandingTeasers } from '@/components/sections/LandingTeasers';
import { WhatIBuild } from '@/components/sections/WhatIBuild';
import { FeaturedWork } from '@/components/sections/FeaturedWork';

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
      <WhatIBuild />
      <FeaturedWork />
      <LandingTeasers />
    </>
  );
}
