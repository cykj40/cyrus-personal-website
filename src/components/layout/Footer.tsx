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
    <footer className="border-t border-earth-400/20 bg-forest-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-forest-900">Cyrus Khiabani</h3>
            <p className="text-sm text-earth-500">
              AI agents, MCP integrations, and automation
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-forest-900">Quick Links</h4>
            <ul className="space-y-1 text-sm text-earth-500">
              <li>
                <Link to="/services" className="hover:text-forest-600">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-forest-600">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/hire-me" className="hover:text-forest-600">
                  Hire Me
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-forest-600">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-forest-900">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-earth-500 transition-colors hover:text-forest-600"
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
        <div className="mt-8 border-t border-earth-400/20 pt-8 text-center text-sm text-earth-500">
          <p>© {currentYear} Cyrus Khiabani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
