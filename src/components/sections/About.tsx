import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="border-t border-earth-400/20 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Who You’re Working With" />

        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[280px_1fr] lg:gap-14">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[280px]"
          >
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-forest-100 to-mountain-100 shadow-xl">
              <img
                src="/images/profile/cyrus-portfolio-picture-1.png"
                alt="Cyrus Khiabani"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-lg leading-relaxed text-earth-600"
          >
            <p>
              I’m Cyrus, a full-stack developer and AI engineer based on the New Jersey Shore.
              I build production automation for construction operations and personal health, where
              access, reliability, and human judgment matter.
            </p>
            <p>
              You work directly with me from the first workflow map through deployment and handoff.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
