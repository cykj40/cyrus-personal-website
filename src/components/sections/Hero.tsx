import { Link } from '@tanstack/react-router';
import { track } from '@vercel/analytics/react';
import { TopographicContours } from '@/components/ui/TopographicContours';
import { scrollToSection } from '@/lib/utils';

/**
 * Proof strip. Set as a map scale bar — hairline rule, mono, tabular figures —
 * so the numbers read as measurements rather than marketing tiles.
 */
const proof = [
  { value: '90%', label: 'ops reduction' },
  { value: '6', label: 'production MCP servers & AI systems' },
  { value: '50+', label: 'daily field users' },
  { value: '55 tests / 9 suites', label: 'on Peloton MCP' },
];

export const Hero = () => {
  return (
    <section id="hero" className="relative isolate min-h-svh overflow-hidden bg-pine-900">
      <TopographicContours />

      {/* Atmosphere over the summits, so the field has a light source. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(58% 62% at 74% 34%, rgba(95,168,160,0.16) 0%, rgba(95,168,160,0.05) 42%, rgba(95,168,160,0) 72%)',
        }}
      />

      {/* Legibility scrim. Vertical on narrow screens where the copy spans the
          full width; from md up it becomes a left margin the terrain fades out
          of, keeping the map visible where nothing is set over it. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,42,31,0.86) 0%, rgba(14,42,31,0.58) 46%, rgba(14,42,31,0.40) 72%, rgba(14,42,31,0.30) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            'linear-gradient(92deg, #0E2A1F 0%, rgba(14,42,31,0.94) 24%, rgba(14,42,31,0.62) 41%, rgba(14,42,31,0.16) 55%, rgba(14,42,31,0) 66%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(8,26,19,0.45) 0%, rgba(8,26,19,0) 18%, rgba(8,26,19,0) 62%, rgba(8,26,19,0.55) 100%)',
        }}
      />

      <div className="container relative z-[2] mx-auto flex min-h-svh flex-col justify-center px-5 pb-[4.5rem] pt-[5.75rem] sm:px-6 sm:pb-20 sm:pt-28">
        <div className="max-w-3xl">
          {/* Availability — an eyebrow, not a section. */}
          <span className="inline-flex items-baseline gap-2.5 rounded-full border border-ocean-400/30 bg-ocean-400/[0.07] px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.055em] text-ocean-200 sm:px-4 sm:text-xs sm:tracking-[0.09em]">
            <span className="size-1.5 shrink-0 self-center rounded-full bg-ocean-400 ring-[3px] ring-ocean-400/20" />
            Open to Full-time · Part-time · Freelance
          </span>

          <h1 className="mt-5 font-display text-[clamp(2.9rem,8vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.025em] text-birch-100">
            AI-First Programmer<span className="text-ocean-400">.</span>
          </h1>

          <p className="mt-4 max-w-xl text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-pine-100">
            Chatbots, agents &amp; MCP servers that run in production — not demos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/hire-me"
              onClick={() => track('cta_hero_hire')}
              className="inline-flex h-[3.25rem] w-full items-center justify-center rounded-lg bg-ember-500 px-7 text-base font-semibold text-pine-950 transition-colors hover:bg-ember-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900 min-[480px]:w-auto"
            >
              Hire Me
            </Link>
            <Link
              to="/services"
              onClick={() => track('cta_hero_freelance')}
              className="inline-flex h-[3.25rem] w-full items-center justify-center rounded-lg border border-birch-100/30 bg-pine-900/45 px-7 text-base font-semibold text-birch-100 transition-colors hover:border-ocean-400/60 hover:bg-pine-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900 min-[480px]:w-auto"
            >
              Freelance &amp; Project Work
            </Link>
          </div>

          <ul className="mt-10 grid max-w-4xl grid-cols-1 font-mono text-xs tracking-[0.03em] tabular-nums min-[400px]:grid-cols-2 min-[400px]:gap-x-5 sm:mt-14 lg:grid-cols-4">
            {proof.map((item) => (
              <li
                key={item.label}
                className="mt-2.5 border-t border-ocean-400/30 pt-3 leading-normal text-pine-300"
              >
                <span className="mb-0.5 block text-sm font-medium tracking-[0.01em] text-ocean-300">
                  {item.value}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('work')}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-2 p-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ocean-400 transition-colors hover:text-ocean-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900 md:flex"
      >
        Scroll
        <span className="block h-6 w-px animate-topo-cue bg-gradient-to-b from-ocean-400/0 to-ocean-400/75 motion-reduce:animate-none motion-reduce:opacity-90" />
      </button>
    </section>
  );
};
