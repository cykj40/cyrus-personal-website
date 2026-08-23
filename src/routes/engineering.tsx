import { createFileRoute, redirect } from '@tanstack/react-router';

// /engineering is kept alive as a permanent redirect to /hire-me. The page body
// it used to hold now lives in src/components/sections/EngineeringContent.tsx so
// that route files export nothing but `Route` (a precondition for the router
// plugin's automatic per-route code splitting).
// vercel.json carries the matching production 301 for this same route.
export const Route = createFileRoute('/engineering')({
  beforeLoad: () => {
    throw redirect({ to: '/hire-me' });
  },
});
