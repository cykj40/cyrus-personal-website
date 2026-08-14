import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Route = createFileRoute('/work/$slug')({
  component: CaseStudyPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const caseStudy = caseStudies.find((entry) => entry.slug === slug);
  const shouldReduceMotion = useReducedMotion();
  const pageTitle = caseStudy ? `${caseStudy.title} | Cyrus Khiabani` : 'Case Study | Cyrus Khiabani';
  const pageFadeUp = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : fadeUp;
  const pageStagger = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : stagger;

  useDocumentTitle(pageTitle);

  if (!caseStudy) {
    return (
      <section className="bg-gradient-to-br from-pine-50 via-white to-ridge-50 bg-topographic px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold text-pine-900">Case study not found</h1>
          <Link
            to="/"
            search={{ scrollTo: 'work' }}
            className="inline-flex items-center gap-2 text-pine-600 transition-colors hover:text-pine-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to case studies
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-pine-50 via-white to-ridge-50 bg-topographic pb-16 pt-28">
        <div className="container mx-auto px-4">
          <motion.div
            variants={pageStagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl"
          >
            <motion.div variants={pageFadeUp} className="mb-6">
              <Link
                to="/"
                search={{ scrollTo: 'work' }}
                className="inline-flex items-center gap-2 text-sm text-granite-600 transition-colors hover:text-pine-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to case studies
              </Link>
            </motion.div>

            <motion.p
              variants={pageFadeUp}
              className="mb-3 text-sm font-medium text-ridge-700"
            >
              {caseStudy.client}
            </motion.p>
            <motion.h1
              variants={pageFadeUp}
              className="text-4xl font-bold leading-tight text-pine-900 sm:text-5xl"
            >
              {caseStudy.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <motion.div
          variants={pageStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="container mx-auto max-w-3xl space-y-12 px-4"
        >
          <motion.div variants={pageFadeUp}>
            <h2 className="mb-5 border-b-2 border-pine-100 pb-3 text-2xl font-bold text-pine-900">
              Problem
            </h2>
            <p className="leading-relaxed text-granite-700">{caseStudy.problem}</p>
          </motion.div>

          <motion.div variants={pageFadeUp}>
            <h2 className="mb-5 border-b-2 border-pine-100 pb-3 text-2xl font-bold text-pine-900">
              Build
            </h2>
            <p className="leading-relaxed text-granite-700">{caseStudy.build}</p>
          </motion.div>

          <motion.div variants={pageFadeUp}>
            <h2 className="mb-5 border-b-2 border-pine-100 pb-3 text-2xl font-bold text-pine-900">
              Result
            </h2>
            <ul className="space-y-3">
              {caseStudy.result.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-granite-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pine-500" />
                  {outcome}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={pageFadeUp}>
            <h2 className="mb-5 border-b-2 border-pine-100 pb-3 text-2xl font-bold text-pine-900">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-ridge-50 px-3 py-1 text-sm text-ridge-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
