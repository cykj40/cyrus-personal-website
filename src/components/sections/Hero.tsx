import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { scrollToSection } from '@/lib/utils';

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
                Full-Stack Developer & AI Specialist
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-forest-900 sm:text-6xl lg:text-7xl">
              Building Systems
              <br />
              <span className="text-gradient-mountain">That Work</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg text-earth-500 sm:text-xl">
              I create intelligent, scalable solutions that merge clean code with cutting-edge AI.
              From health tech integrations to MCP servers, I build tools that solve real problems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollToSection('projects')}>
                View My Work
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/cyrusae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-500 transition-colors hover:text-forest-600"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/cyruskhiabani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-500 transition-colors hover:text-forest-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:cyrus@example.com"
                className="text-earth-500 transition-colors hover:text-forest-600"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
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
              {/* 📸 ADD PROFILE PHOTO HERE */}
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-forest-100 to-mountain-100 shadow-2xl">
                <div className="text-center text-earth-400">
                  <div className="mb-4 text-6xl">🌲</div>
                  <p className="text-sm">Profile photo placeholder</p>
                  <p className="text-xs">Add your image to /public/images/profile/avatar.jpg</p>
                </div>
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
          aria-label="Scroll to About section"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};
