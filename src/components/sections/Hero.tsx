import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { track } from '@vercel/analytics/react';
import { Button } from '@/components/ui/Button';
import { scrollToSection } from '@/lib/utils';

// Typographic proof strip — no cards, no icons.
const proofStats = [
  { stat: '90% less manual billing work', label: 'construction firm, 50+ field users' },
  { stat: '5 production MCP servers', label: 'shipped and running on real infrastructure' },
  { stat: '30 min → 5 min', label: 'timesheet-to-invoice cycle' },
];

// A REAL, sanitized call to the TSheets/QuickBooks Time MCP server.
// Tool name, input fields (dateRange), and result fields (totalHours,
// userTotals[].userName/hours, jobcodeTotals[].jobcodeName/hours) are taken
// verbatim from the actual server source (cykj40/Tsheets-MCP,
// src/index.ts + src/tools/get-project-report-summary.ts). Every identifying
// value — employee names, job numbers, client names, IDs — is replaced with a
// generic placeholder. Static; no typing/cursor animation.
function ToolCallPane() {
  const key = 'text-forest-200';
  const str = 'text-mountain-200';
  const num = 'text-sunrise-400';
  const punc = 'text-earth-400';
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-forest-800 bg-forest-900 font-mono text-xs shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-forest-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-sunrise-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-sunrise-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-forest-400/70" />
        <span className="ml-2 text-[11px] text-earth-400">tsheets-mcp · claude</span>
      </div>
      {/* Body */}
      <div className="overflow-x-auto p-4 leading-relaxed text-forest-50">
        <div className="space-y-1 whitespace-nowrap">
          <div>
            <span className={punc}>tool_use →</span>{' '}
            <span className={str}>get_project_report_summary</span>
          </div>
          <div>
            <span className={punc}>{'{ '}</span>
            <span className={key}>"dateRange"</span>
            <span className={punc}>: </span>
            <span className={str}>"last week"</span>
            <span className={punc}>{' }'}</span>
          </div>
          <div className="h-2" />
          <div>
            <span className={punc}>tool_result ←</span>
          </div>
          <div>
            <span className={punc}>{'{'}</span>
          </div>
          <div className="pl-3">
            <span className={key}>"totalHours"</span>
            <span className={punc}>: </span>
            <span className={num}>342.5</span>
            <span className={punc}>,</span>
          </div>
          <div className="pl-3">
            <span className={key}>"userTotals"</span>
            <span className={punc}>: [ {'{ '}</span>
            <span className={key}>"userName"</span>
            <span className={punc}>: </span>
            <span className={str}>"Employee A"</span>
            <span className={punc}>, </span>
            <span className={key}>"hours"</span>
            <span className={punc}>: </span>
            <span className={num}>41.0</span>
            <span className={punc}> {'}'}, … ]</span>
          </div>
          <div className="pl-3">
            <span className={key}>"jobcodeTotals"</span>
            <span className={punc}>: [ {'{ '}</span>
            <span className={key}>"jobcodeName"</span>
            <span className={punc}>: </span>
            <span className={str}>"Project 1"</span>
            <span className={punc}>, </span>
            <span className={key}>"hours"</span>
            <span className={punc}>: </span>
            <span className={num}>118.5</span>
            <span className={punc}> {'}'}, … ]</span>
          </div>
          <div>
            <span className={punc}>{'}'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-forest-50 via-white to-mountain-50 bg-topographic"
    >
      <div className="container mx-auto flex min-h-screen items-center px-4 pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-block">
              <span className="rounded-full bg-forest-100 px-4 py-1.5 text-sm font-medium text-forest-700">
                AI integration &amp; automation
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-forest-900 sm:text-5xl lg:text-6xl">
              AI that plugs into{' '}
              <span className="text-gradient-mountain">the software you already run.</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg text-earth-500 sm:text-xl">
              I build custom agents, MCP servers, and assistants that connect Claude and GPT to
              your real tools — QuickBooks, Procore, your database, your internal APIs. Not demos.
              Systems that run in production and get used every week.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" onClick={() => track('cta_hero_book')}>
                <Button size="lg">Book a project call</Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('work')}
              >
                See case studies
              </Button>
            </div>

            {/* Proof strip — one row of three (sm+), clean stack on mobile */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 border-t border-earth-400/20 pt-8 sm:grid-cols-3">
              {proofStats.map((s) => (
                <div key={s.stat}>
                  <p className="text-lg font-bold text-forest-800">{s.stat}</p>
                  <p className="mt-1 text-sm text-earth-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Real MCP tool call.
              Hidden below md (cramped at 375px); on md–lg it stacks below the
              copy, at lg+ it sits in the second column. */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden items-center justify-center md:flex"
          >
            <ToolCallPane />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('services')}
          className="flex flex-col items-center gap-2 text-earth-400 transition-colors hover:text-forest-600"
          aria-label="Scroll to next section"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="h-5 w-5 animate-bounce motion-reduce:animate-none" />
        </button>
      </motion.div>
    </section>
  );
};
