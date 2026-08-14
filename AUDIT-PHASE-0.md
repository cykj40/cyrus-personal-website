# Phase 0 — Portfolio Redesign v2 Audit

Audit date: 2026-08-14  
Audited branch: `redesign-v2` at `3c046f2` (`redesign-v1-complete-2026-08-v2`); there is no diff from that tag.

## 1. Build verification

**Stack verified:** Vite SPA (not Next.js), React 19.2.4, TypeScript 5.9.3, Tailwind CSS 3.4.19, Framer Motion 12, TanStack Router 1 and TanStack Query 5, using pnpm 10.25.0. Vercel deploys the static `dist/` output and functions in `api/` per `vercel.json`.

Commands run:

```text
pnpm install
Lockfile is up to date, resolution step is skipped
Already up to date
Done in 276ms using pnpm v10.25.0

pnpm build
> cyrus-personal-website@1.0.0 build
> tsc && vite build

vite v8.0.3 building client environment for production...
✓ 2350 modules transformed.
dist/index.html                   1.44 kB │ gzip:   0.59 kB
dist/assets/index-BKyKr7Ls.css   26.47 kB │ gzip:   6.13 kB
dist/assets/index-BXrg76Tg.js   609.17 kB │ gzip: 189.16 kB
✓ built in 575ms
```

**Result: PASS.** The only output is Vite's non-fatal advisory that the 609.17 kB minified main JS chunk exceeds the 500 kB chunk-size warning threshold. `dist/` is gitignored; the audit began with and retained a clean worktree until this report.

This verifies TypeScript and the client production build, but does **not** run the deployed Vercel functions against Anthropic or Resend. The serverless API file that has a local relative import is:

| File | Local import | `.js` extension? |
| --- | --- | --- |
| `api/chat.ts:4` | `../src/lib/portfolio-context.js` | Yes |

`api/contact.ts` has no local relative imports. There are no server-side local relative imports missing explicit `.js` extensions.

## 2. Site inventory

### Routes and pages

| URL | File | Current purpose |
| --- | --- | --- |
| `/` | `src/routes/index.tsx` | One long-form home page composing Hero, Services, Case Studies, Engagements, About, and Contact sections. Supports `?scrollTo=`. |
| `/contact` | `src/routes/contact.tsx` | Contact form page; supports `?service=automation\|mcp\|assistant` and displays the Cal.com inline scheduler. |
| `/engineering` | `src/routes/engineering.tsx` | Resume-style engineering page: profile/contact information, skills, experience, other projects, education/certifications, PDF download. |
| `/resume` | `src/routes/resume.tsx` | Client router redirect to `/engineering`; Vercel also sends an HTTP 301 for this path in `vercel.json:6-11`. |
| `/work/$slug` | `src/routes/work.$slug.tsx` | Dynamic case-study detail page. Existing data resolves `tsheets-billing`, `field-notes-pwa`, and `t1copilot`; unknown slugs show an in-page “not found” state. |
| Root layout | `src/routes/__root.tsx` | Shared navbar, footer, route outlet, and site-wide chatbot. |

There is no standalone `/work`, `/services`, `/about`, or catch-all 404 route. SPA fallback traffic is rewritten to `index.html` by `vercel.json:13-18`.

### Components

**Root/layout**

| File | Component(s) | Description |
| --- | --- | --- |
| `src/routes/__root.tsx` | `RootComponent` | Shared application shell; mounts navigation, footer, and `ChatWidget` around every route. |
| `src/components/layout/Navbar.tsx` | `Navbar` | Fixed responsive navigation; home section scrolling plus Engineering and Contact links. |
| `src/components/layout/Footer.tsx` | `Footer` | Branding, quick links, social links, and dynamic copyright year. |

**Home sections**

| File | Component(s) | Description |
| --- | --- | --- |
| `src/components/sections/Hero.tsx` | `Hero`, private `ToolCallPane` | Split hero with service positioning, contact/case-study CTAs, proof stats, and a static sanitized MCP call visual. |
| `src/components/sections/Services.tsx` | `Services` | Three offering cards linking to the contact form with a selected service. |
| `src/components/sections/Projects.tsx` | `Projects` | Featured-case-study card grid linking to dynamic detail routes. |
| `src/components/sections/Engagements.tsx` | `Engagements` | Four pricing/engagement cards. |
| `src/components/sections/About.tsx` | `About` | Brief portrait and two-paragraph personal/introduction section. |
| `src/components/sections/Contact.tsx` | `Contact`, private `SchedulingSlot` | Validated contact form, contact cards, and optional lazy-loaded Cal.com inline appointment embed. |

**Chatbot**

| File | Component(s) | Description |
| --- | --- | --- |
| `src/components/chat/ChatWidget.tsx` | `ChatWidget` | Switches between launch button and panel; manages Escape and focus restoration. |
| `src/components/chat/ChatButton.tsx` | `ChatButton` | Fixed animated pure-CSS/SVG robot launcher. |
| `src/components/chat/ChatPanel.tsx` | `ChatPanel` | Floating dialog with animated panel, message list, errors, and auto-scroll. |
| `src/components/chat/ChatHeader.tsx` | `ChatHeader` | Assistant identity and close control. |
| `src/components/chat/ChatInput.tsx` | `ChatInput` | Auto-growing textarea and send control. |
| `src/components/chat/ChatMessage.tsx` | `ChatMessage`, `TypingIndicator` | User/assistant bubbles and three-dot loading state. |

**Shared UI primitives**

| File | Component(s) | Description |
| --- | --- | --- |
| `src/components/ui/Button.tsx` | `Button` | Forward-ref button with four visual variants and three sizes. |
| `src/components/ui/Card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Reusable card container and structural subcomponents. |
| `src/components/ui/SectionHeading.tsx` | `SectionHeading` | Centered heading/subtitle pattern for landing-page sections. |

The Engineering page also has page-local `PageHeader`, `SummarySection`, `SkillsSection`, `ExperienceSection`, `ProjectsSection`, `EducationSection`, and `StickyDownload` components in `src/routes/engineering.tsx:27-408`. The case-study route has its local `CaseStudyPage`; page route components are `HomePage`, `ContactPage`, and `EngineeringPage`.

### Tailwind theme tokens

`tailwind.config.ts` only extends the default theme; it defines no custom spacing scale.

| Token family | Values |
| --- | --- |
| `forest` | `50 #f0f7ed`, `100 #dcecd3`, `200 #b9daa8`, `300 #91c277`, `400 #6ba54d`, `500 #4d8a31`, `600 #3a6b24`, `700 #2d5016`, `800 #264213`, `900 #203812` |
| `mountain` | `50 #f0f9ff`, `100 #e0f2fe`, `200 #b9e6fe`, `300 #7dd3fc`, `400 #4A7C9C`, `500 #0ea5e9`, `600 #0284c7`, `700 #0369a1`, `800 #075985`, `900 #0c4a6e` |
| `sunrise` | `400 #fb923c`, `500 #f97316`, `600 #ea580c`, `700 #D97706` |
| `earth` | `400 #a8a29e`, `500 #78716C`, `600 #57534e` |
| Fonts | `sans: Inter, system-ui, sans-serif`; `mono: JetBrains Mono, Fira Code, monospace` |
| Background images | `gradient-radial`; `topographic` (a 60×60 inline SVG data URI) |

`src/index.css:6-10` additionally exposes three unused-looking RGB CSS custom properties for primary forest, mountain, and sunrise colors.

### API routes / serverless functions

| Route / file | What it does |
| --- | --- |
| `POST /api/chat` — `api/chat.ts` | Zod-validates a 1–1,000-character message and optional chat history, keeps the last 10 messages, calls Anthropic, then returns the first text-type output block as `{ message, sources: [] }`. |
| `POST /api/contact` — `api/contact.ts` | Performs required-field/email validation and sends an HTML email through Resend to `cyrus@cyruskhiabani.com`, with the submitter as `replyTo`. |

Both return `405` for non-POST requests. Client code calls them from `src/lib/chat-api.ts` and `src/components/sections/Contact.tsx:194-217`, respectively.

### Third-party integrations

- **Anthropic:** direct `@anthropic-ai/sdk` Messages API for the chatbot; `ANTHROPIC_API_KEY` is expected (`api/chat.ts:37`).
- **Resend:** direct transactional email send from the contact function; `RESEND_API_KEY` is expected (`api/contact.ts:18,42`).
- **Cal.com:** dynamically inserts `https://app.cal.com/embed/embed.js` only on `/contact`, embedding `cyrus-khiabani-cy-hepdhf/project-call` (`src/components/sections/Contact.tsx:52-54,94-149`).
- **Vercel:** static hosting/serverless functions and `@vercel/analytics/react`; event tracking is attached to selected hero, service, case-study, and contact-form actions.
- **Core UI/runtime libraries:** TanStack Router/Query, Framer Motion, React Hook Form + Zod, and Lucide React. There is no active authentication-provider integration in this site.

## 3. Chatbot audit (critical)

### API behavior

- Chatbot function: `api/chat.ts`.
- Pinned model string: **`claude-sonnet-5`** at `api/chat.ts:68`.
- The response extraction is correct and production-safe: `response.content.find((block) => block.type === 'text')` at `api/chat.ts:83`, with a missing-text-block error at line 85. A repository-wide code search found **no** `response.content[0]` or other positional `content[...]` indexing.
- This is not retrieval-augmented generation in the usual sense: the complete static source context is concatenated into the Anthropic system prompt on every request (`api/chat.ts:6-8`). There is no embedding generation, vector store, document retrieval, citation retrieval, or external knowledge-base service.

### Knowledge base / context

The authoritative chatbot material is in `src/lib/portfolio-context.ts`:

- `PORTFOLIO_CONTEXT` (`:4-343`): technical stack and expertise; featured and historical projects; Long & DeLosa experience; education/certifications; a detailed life/personal narrative; career goals; services; contact information; safety/confidentiality practices; the four current engagement tiers; and claims about strengths/production work.
- `CHAT_SYSTEM_PROMPT` (`:346-386`): tone, evidence/no-overstatement rules, personal-detail boundaries, prompt-injection/confidentiality instructions, pricing-answer instructions, and a light project-call CTA rule.
- `QUICK_FACTS` (`:389-416`): a separate structured quick-reference object. It is exported but **not imported or used** by the current API path.

The visible welcome message is separately defined in `src/types/chat.ts:18-24`; client chat history and open state use browser `sessionStorage` in `src/hooks/useChat.ts:7-66`.

### Prompt caching

The server sends its entire combined system prompt as a single Anthropic text system block with `cache_control: { type: 'ephemeral' }` (`api/chat.ts:70-76`). This enables Anthropic prompt caching for that prefix subject to Anthropic's cache behavior/TTL. There is no application-side cache, cache key, or persisted response cache.

### Rate limiting and errors

- **No site-owned rate limiting exists.** There is no IP/session quota, middleware, durable store, or abuse control before the Anthropic request.
- Anthropic `429` is translated to a `429` JSON response with `RATE_LIMIT` (`api/chat.ts:105-112`); the browser turns it into a friendly retry message (`src/lib/chat-api.ts:24-31`).
- Request validation returns `400`; unsupported HTTP methods return `405`; a missing Anthropic API key returns `500`; Anthropic non-429 failures and unexpected failures return sanitized `500`s (`api/chat.ts:25-123`).
- The client separately maps fetch/network failures to an offline message and surfaces API errors in the chat panel (`src/lib/chat-api.ts:43-63`, `src/hooks/useChat.ts:80-86`).
- The contact API has basic validation, configuration checks, and one generic `500` catch, but no CAPTCHA/rate limiting (`api/contact.ts:20-71`).

## 4. Pricing references

A repository-wide source scan found the current public-price values only in the locations below. **No `$750` additional-work price appears.** The resumé PDF is a compressed two-page static asset; the available environment lacks a PDF text extractor, but a printable-strings scan found no verified pricing text. No structured-data, page-specific meta, sitemap, or robots source exists to contain pricing.

| File and line(s) | Current pricing reference |
| --- | --- |
| `src/components/sections/Engagements.tsx:10` | Automation Audit: `$3,500` |
| `src/components/sections/Engagements.tsx:16` | Setup & Integration: `$2,500` |
| `src/components/sections/Engagements.tsx:22` | Build: `Starting at $8,000` |
| `src/components/sections/Engagements.tsx:28` | Ongoing: `$3,000/mo` |
| `src/lib/portfolio-context.ts:309-318` | Chatbot knowledge base repeats all four tiers, including scope/weekly/hour details. |
| `src/lib/portfolio-context.ts:360-368` | Chatbot behavioral prompt repeats all four tiers and instructs the assistant not to provide custom/hourly/timeline pricing. |

Therefore a v2 change to a `$10,000` agent-build base must update at least `Engagements.tsx:22` and both context sections above. The customer-visible product copy around the prices also exists in `Engagements.tsx:8-28`.

## 5. Gap analysis vs v2 requirements

| v2 requirement | Status | Evidence and delta |
| --- | --- | --- |
| Home hero + dual CTA (employer path and client path) | **NEEDS MODIFICATION** | Hero exists at `src/components/sections/Hero.tsx`, but its CTAs are “Get in touch” and “See case studies.” They are not explicitly segmented for employers/recruiters versus clients. |
| Work page with project case studies | **NEEDS MODIFICATION** | Featured studies appear on the home page and individual pages exist at `/work/$slug`, but there is no standalone `/work` landing page. |
| Services page with offerings, pricing, Cal.com booking embed | **NEEDS MODIFICATION** | Offerings and pricing are home sections (`Services`, `Engagements`); Cal.com is only rendered on `/contact`. No dedicated `/services` page exists. |
| Hire Me / About page with story, accomplishments, resume PDF, inline chatbot prompt/suggested questions, contact block | **NEEDS MODIFICATION** | `/engineering` has accomplishments and the downloadable resume; home `About` has a very short story; the site has a contact block and global widget. No unified Hire Me/About page or inline chatbot prompt/suggested-question UI exists. |
| Chatbot widget on all pages | **EXISTS** | `ChatWidget` is mounted in the root route (`src/routes/__root.tsx:19`), so it is included in every current SPA route. |
| Per-page 1200×630 OG images | **NEEDS MODIFICATION** | One global image exists at `public/images/og-image.png`, confirmed at 1200×630, and one static global set of OG tags exists in `index.html:10-15`. Routes only alter `document.title` client-side; they do not have page-specific OG assets/tags. |
| Person / ProfessionalService structured data | **MISSING** | No JSON-LD or schema.org markup was found. |
| Sitemap + `robots.txt` | **MISSING** | Neither file exists in `public/` or project configuration. |
| Zero auth/login friction | **EXISTS** | No auth package, protected route, login/sign-in UI, or access wall exists. References to Clerk, `iron-session`, OAuth, or role-based auth describe portfolio projects in content only, not this site's runtime. |

## 6. Design system snapshot

### Fonts

No font is loaded from Google Fonts, another CDN, or self-hosted assets: there is no `<link>` font resource or `@font-face`. Tailwind declares `Inter, system-ui, sans-serif` for `font-sans` and `JetBrains Mono, Fira Code, monospace` for `font-mono` (`tailwind.config.ts:44-47`). As a result, Inter/JetBrains Mono are only used if already installed on a visitor's device; there is no subsetting or guaranteed webfont delivery.

### Topographic pattern

The `topographic` token is an inline data-URI SVG in `tailwind.config.ts:48-51`. It is applied as `bg-topographic` on:

- the Hero (`src/components/sections/Hero.tsx:100-103`),
- the Engineering page header (`src/routes/engineering.tsx:27-30`), and
- the case-study route's valid and not-found header states (`src/routes/work.$slug.tsx:37,55`).

### Motion and performance

Most explicit Framer Motion transitions animate only `opacity`, translate (`x`/`y`), or `scale`; CSS robot keyframes also use only `transform`/`opacity`. One layout-triggering animation violates the stated performance rule:

| File / lines | Trigger | Layout-triggering property |
| --- | --- | --- |
| `src/components/layout/Navbar.tsx:75-79` | Mobile-menu enter/exit | Framer Motion animates `height` from `0` to `auto` and back. |

Related non-animation layout work: `src/components/chat/ChatInput.tsx:14-20,28-31` adjusts a textarea's inline `height` as the visitor types; this causes layout but is an autoresize behavior, not an animation. `transition-all` occurs in the shared Button/Card primitives (`Button.tsx:15`, `Card.tsx:16`); current state changes are background/color, transform, and shadow rather than an identified layout-property transition, but it is broad enough to merit tightening during a performance pass.

### Reduced motion

Reduced-motion handling is partial:

- **Respected:** Hero, Services, Projects, Engagements, Contact, and case-study pages use Framer Motion's `useReducedMotion`; the hero's bounce indicator is disabled with `motion-reduce:animate-none`; global CSS changes smooth scrolling to `auto` under `prefers-reduced-motion` (`src/index.css:155-159`).
- **Not respected:** Engineering-page animations do not call `useReducedMotion`; navbar height animation and chat panel/message/typing/launcher motions do not have a reduced-motion branch; persistent robot CSS animations (`bubbleIn`, `bob`, `wave`, `blink`) continue inside the media query.

## Open Questions

1. Should “Work,” “Services,” and “Hire Me” become dedicated top-level routes, or should v2 retain a one-page sales flow plus detail pages? The requirements use “page,” while the existing information architecture makes these home sections.
2. The desired v2 price list explicitly changes the agent build to a `$10,000` base, but does not state the final treatment of the existing $3,500 audit, $2,500 setup, $3,000 monthly retainer, or a potential $750 additional-work price. The latter is not currently in source.
3. Which personal details from the unusually expansive chatbot context (health, partner, sobriety, early life) remain intended for the public Hire Me page and for chatbot answers in v2?
4. Is the existing Cal.com event (`cyrus-khiabani-cy-hepdhf/project-call`) the booking destination that should remain in the dedicated Services flow?
5. Does v2 need true retrieval/citations for the chatbot, or is a maintained static cached system prompt the intended architecture?

## Recommended v2 work order

1. Lock the page information architecture and navigation: define the employer and client paths, then choose the dedicated `/work`, `/services`, and `/hire-me` route shape before moving components.
2. Establish a single v2 content source for services/pricing and update chatbot context/prompt at the same time, including the `$10,000` build base and any decision on the $750 item.
3. Build the reusable v2 design system and landing-page hero/dual CTA, then implement the Work, Services (with Cal.com), and Hire Me pages from that shared system.
4. Update chatbot UX/content after the final portfolio copy exists: add the Hire Me inline suggested-question entry point, preserve the safe response-block extraction and prompt cache, and decide whether to add application-side abuse protection/retrieval.
5. Implement SEO as part of the new route work: server/prerender strategy suitable for a Vite SPA, per-route 1200×630 OG images/meta, Person/ProfessionalService JSON-LD, sitemap, and robots.
6. Finish with accessibility/performance QA: reduce-motion coverage for every persistent animation, replace mobile-menu height animation, narrow `transition-all`, test the contact/Cal.com/Anthropic/Resend production flows, and consider code-splitting the 609 kB main bundle.
