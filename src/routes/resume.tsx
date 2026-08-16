import { createFileRoute, redirect } from '@tanstack/react-router';

// /resume is kept alive as a permanent redirect to /hire-me.
// The URL may already be indexed or bookmarked from earlier testing, so it must
// not 404. The full resume now renders inside a modal on /hire-me
// (see src/components/resume/ResumeModal.tsx) rather than as its own page.
// vercel.json carries the matching production 301 for this same route.
export const Route = createFileRoute('/resume')({
  beforeLoad: () => {
    throw redirect({ to: '/hire-me' });
  },
});
