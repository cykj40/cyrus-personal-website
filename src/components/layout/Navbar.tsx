import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';

const navigationItems = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Hire Me', to: '/hire-me' },
] as const;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-earth-400/20 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" search={{ scrollTo: '' }} className="text-xl font-bold text-forest-700 hover:text-forest-800 transition-colors">
            Cyrus Khiabani
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-earth-600 transition-colors hover:text-forest-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-forest-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-forest-700 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-earth-400/20 bg-white md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="text-left text-base font-medium text-earth-600 hover:text-forest-600"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-lg bg-forest-600 px-4 py-2 text-base font-medium text-white hover:bg-forest-700 transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
