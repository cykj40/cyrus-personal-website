import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/Button';
import { scrollToSection } from '@/lib/utils';

// Typographic proof strip — no cards, no icons.
const proofStats = [
  { stat: '90% less manual billing work', label: 'construction firm, 50+ field users' },
  { stat: '5 production MCP servers', label: 'shipped and running on real infrastructure' },
  { stat: '30 min → 5 min', label: 'timesheet-to-invoice cycle' },
];

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-forest-50 via-white to-mountain-50 bg-topographic"
    >
      <div className="container mx-auto flex min-h-screen items-center px-4 pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
              <Link to="/contact">
                <Button size="lg">Book a project call</Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('projects')}
              >
                See case studies
              </Button>
            </div>

            {/* Proof strip */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-earth-400/20 pt-8">
              {proofStats.map((s) => (
                <div key={s.stat} className="max-w-[15rem]">
                  <p className="text-lg font-bold text-forest-800 sm:text-xl">{s.stat}</p>
                  <p className="mt-1 text-sm text-earth-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[500px] w-full max-w-[500px]">
              {/* Profile Photo */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-forest-100 to-mountain-100 shadow-2xl">
                <img
                  src="/images/profile/cyrus-portfolio-picture-1.png"
                  alt="Cyrus Jalili Khiabani"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sunrise-400/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-mountain-400/20 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-2 text-earth-400 transition-colors hover:text-forest-600"
          aria-label="Scroll to next section"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};
