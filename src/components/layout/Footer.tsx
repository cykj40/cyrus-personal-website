import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const socialLinks = [
  { icon: Github, href: 'https://github.com/cykj40', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/cyrus-jalili-khiabani-44605b163', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:cyrus@cyruskhiabani.com', label: 'Email' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-pine-700 bg-pine-900 font-sans text-pine-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em] text-birch-100">Cyrus Khiabani</h3>
            <p className="text-sm text-pine-200">
              AI agents, MCP integrations, and automation
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-birch-100">Quick Links</h4>
            <ul className="space-y-1 text-sm text-pine-200">
              <li>
                <Link to="/services" className="transition-colors hover:text-ocean-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/work" className="transition-colors hover:text-ocean-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/hire-me" className="transition-colors hover:text-ocean-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900">
                  Hire Me
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-ocean-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-birch-100">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pine-200 transition-colors hover:text-ocean-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300 focus-visible:ring-offset-2 focus-visible:ring-offset-pine-900"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-pine-700 pt-8 text-center text-sm text-pine-300">
          <p>© {currentYear} Cyrus Khiabani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
