import { createFileRoute, redirect } from '@tanstack/react-router';

// /resume is kept alive as a permanent redirect to /engineering.
// The URL is referenced from LinkedIn and job applications, so it must not 404.
// (The resume PDF at /resume/Cyrus_Khiabani_AI_Engineer_Resume.pdf is a static
// asset served directly by Vercel and is unaffected by this route.)
export const Route = createFileRoute('/resume')({
  beforeLoad: () => {
    throw redirect({ to: '/engineering' });
  },
});
