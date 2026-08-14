import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Send } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const CONTACT_SERVICE_VALUES = ['automation', 'mcp', 'assistant'] as const;
export type ContactService = (typeof CONTACT_SERVICE_VALUES)[number];

const contactServiceOptions: { value: ContactService; label: string }[] = [
  { value: 'automation', label: 'Workflow Automation & AI Agents' },
  { value: 'mcp', label: 'System & MCP Integrations' },
  { value: 'assistant', label: 'AI Assistants & Chatbots' },
];

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  service: z.enum(CONTACT_SERVICE_VALUES).optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  service?: ContactService;
  showSchedulingSlot?: boolean;
}

type CalFunction = {
  (...args: unknown[]): CalFunction | void;
  loaded?: boolean;
  ns?: Record<string, CalFunction>;
  q?: unknown[][];
  config?: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalFunction;
    portfolioCal?: CalFunction;
    portfolioCalScript?: Promise<void>;
  }
}

const CAL_EMBED_ID = 'my-cal-inline-project-call';
const CAL_NAMESPACE = 'project-call';
const CAL_SCRIPT_URL = 'https://app.cal.com/embed/embed.js';

const enqueueCalCall = (api: CalFunction, args: unknown[]) => {
  api.q = api.q || [];
  api.q.push(args);
};

const getCalApi = () => {
  if (window.portfolioCal) return window.portfolioCal;

  const cal: CalFunction = (...args: unknown[]) => {
    if (args[0] === 'init') {
      const namespace = args[1];
      const namespaceApi: CalFunction = (...namespaceArgs: unknown[]) => {
        enqueueCalCall(namespaceApi, namespaceArgs);
      };
      namespaceApi.q = namespaceApi.q || [];

      if (typeof namespace === 'string') {
        cal.ns = cal.ns || {};
        cal.ns[namespace] = cal.ns[namespace] || namespaceApi;
        enqueueCalCall(cal.ns[namespace], args);
        enqueueCalCall(cal, ['initNamespace', namespace]);
      } else {
        enqueueCalCall(cal, args);
      }

      return namespaceApi;
    }

    enqueueCalCall(cal, args);
  };

  cal.ns = {};
  cal.q = [];
  window.Cal = cal;
  window.portfolioCal = cal;
  return cal;
};

const loadCalScript = (cal: CalFunction) => {
  if (window.portfolioCalScript) return window.portfolioCalScript;

  window.portfolioCalScript = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = CAL_SCRIPT_URL;
    script.async = true;
    script.dataset.portfolioCal = 'true';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener(
      'error',
      () => {
        script.remove();
        cal.loaded = false;
        delete window.portfolioCalScript;
        reject(new Error('Unable to load the Cal.com scheduling embed.'));
      },
      { once: true }
    );

    cal.loaded = true;
    document.head.appendChild(script);
  });

  return window.portfolioCalScript;
};

export const SchedulingSlot = () => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const embedElement = embedRef.current;
    if (!embedElement) return;

    const cal = getCalApi();
    if (!cal.ns?.[CAL_NAMESPACE]) {
      cal('init', CAL_NAMESPACE, { origin: 'https://app.cal.com' });
    }

    cal.config = cal.config || {};
    cal.config.forwardQueryParams = true;

    let isActive = true;
    void loadCalScript(cal).then(() => {
      if (!isActive) return;

      cal.ns?.[CAL_NAMESPACE]?.('inline', {
        elementOrSelector: `#${CAL_EMBED_ID}`,
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: 'cyrus-khiabani-cy-hepdhf/project-call',
      });
      cal.ns?.[CAL_NAMESPACE]?.('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    });

    return () => {
      isActive = false;
      embedElement.replaceChildren();
    };
  }, []);

  return (
    <Card className="bg-white/70 shadow-none">
      <CardContent className="py-5">
        <p className="font-medium text-forest-900">Prefer to talk it through?</p>
        <p className="mt-1 text-sm text-earth-600">
          You can also book a 30-minute call.
        </p>
        <div
          ref={embedRef}
          id={CAL_EMBED_ID}
          className="mt-4 min-h-[600px] w-full"
        />
      </CardContent>
    </Card>
  );
};

export const Contact = ({ service, showSchedulingSlot = false }: ContactProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { service },
  });

  useEffect(() => {
    setValue('service', service);
  }, [service, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    track('contact_submit');
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset({ service });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-forest-50/30 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's talk about how we can work together."
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
          {/* Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="py-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-forest-900">Send a message</h3>
                  <p className="mt-2 text-earth-600">
                    Tell me what you’re working on and I’ll follow up by email.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-forest-900">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="w-full rounded-lg border border-earth-400/30 px-4 py-2 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-forest-900">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full rounded-lg border border-earth-400/30 px-4 py-2 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label
                      htmlFor="service"
                      className="mb-1 block text-sm font-medium text-forest-900"
                    >
                      What do you need?
                    </label>
                    <select
                      id="service"
                      {...register('service', {
                        setValueAs: (value) => value || undefined,
                      })}
                      className="w-full rounded-lg border border-earth-400/30 bg-white px-4 py-2 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                    >
                      <option value="">Select a service</option>
                      {contactServiceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium text-forest-900">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      {...register('subject')}
                      className="w-full rounded-lg border border-earth-400/30 px-4 py-2 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-forest-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className="w-full rounded-lg border border-earth-400/30 px-4 py-2 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <p className="text-center text-sm text-green-600">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-center text-sm text-red-600">
                      Failed to send message. Please try again or email directly.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info and Secondary Scheduling Option */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-4 text-2xl font-bold text-forest-900">Let's Connect</h3>
              <p className="text-earth-600">
                I'm always interested in hearing about new projects, opportunities, and
                collaborations. Whether you need a developer, consultant, or just want to chat about
                tech—reach out!
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="rounded-lg bg-forest-100 p-3">
                    <Mail className="h-5 w-5 text-forest-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest-900">Email</p>
                    <a
                      href="mailto:cyrus@cyruskhiabani.com"
                      className="text-earth-600 hover:text-forest-600"
                    >
                      cyrus@cyruskhiabani.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="rounded-lg bg-mountain-100 p-3">
                    <MapPin className="h-5 w-5 text-mountain-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest-900">Location</p>
                    <p className="text-earth-600">New Jersey Shore, USA</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {showSchedulingSlot && <SchedulingSlot />}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
