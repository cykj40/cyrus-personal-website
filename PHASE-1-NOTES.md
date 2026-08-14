# Phase 1 Notes

## What moved where

- The landing route (`/`) now contains the existing Hero followed by compact Work, Services, and Hire Me teaser cards. The full Services, Case Studies, Engagements, About, and Contact sections no longer render on the landing page.
- `/work` is a new case-study index route reusing the existing `Projects` card grid and case-study data. `/work/$slug` is unchanged.
- `/services` renders the existing `Services` and `Engagements` components unchanged, followed by the existing Cal.com scheduling slot. Service-card CTAs continue to use `/contact?service=automation|mcp|assistant`.
- `/hire-me` reuses the existing engineering/resume content first, then renders the existing About section. The existing resume PDF links and fixed desktop download control are unchanged. A `Get in touch` CTA links to `/contact`.
- The desktop/mobile navbar and footer now use the new Work, Services, and Hire Me routes. `/engineering` remains available as the existing legacy resume/accomplishments page; it is no longer linked from primary navigation.
- `/resume` now redirects to `/hire-me` in both the TanStack route and Vercel configuration.

## New copy added

No new marketing sentences were introduced. The landing teasers reuse existing headings and source wording. New UI labels are:

- `View work`
- `View services`
- `Hire me`
- `Get in touch` (an existing site label, now used as the Hire Me CTA)

## `vercel.json` and redirect findings

- The existing Vercel 301 for `/resume` previously targeted `/engineering`; it now targets `/hire-me`, matching the client-side redirect.
- The existing catch-all SPA rewrite remains appropriate for `/work`, `/services`, and `/hire-me`; no anchor-pattern rewrite or redirect rule exists in `vercel.json`.
- Existing links that use `/?scrollTo=work`, `/?scrollTo=services`, or `/?scrollTo=about` still land on matching compact-teaser section IDs on the landing page. The primary navigation and footer no longer create those URLs.
- `src/routes/resume.tsx` explicitly states that `/resume` is referenced from LinkedIn and job applications, so preserving its 301 avoids breaking those inbound links. No repository-owned external reference to `/engineering` was found; that route was retained as a legacy page rather than redirecting it unilaterally.

## Ambiguity retained

The requested target route list does not include `/engineering`, but it did not explicitly request removing or redirecting that established route. It remains reachable and unlinked so existing direct visits continue to work. A later decision can redirect `/engineering` to `/hire-me` if that URL should be formally retired.

## Verification

`pnpm build` passes after TanStack Router regenerated `src/routeTree.gen.ts`. Vite retains its non-fatal warning that the minified main JS chunk is 610.51 kB, above its 500 kB advisory threshold.
