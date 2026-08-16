import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Send } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SchedulingSlot } from '@/components/sections/SchedulingSlot';
import { CONTACT_SERVICE_VALUES, type ContactService } from '@/components/sections/contact-services';

export { CONTACT_SERVICE_VALUES };
export type { ContactService };

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
    <section id="contact" className="bg-pine-50/30 py-20">
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
                  <h3 className="text-2xl font-bold text-pine-900">Send a message</h3>
                  <p className="mt-2 text-granite-700">
                    Tell me what you’re working on and I’ll follow up by email.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-pine-900">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="w-full rounded-lg border border-granite-400/30 px-4 py-2 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-pine-900">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full rounded-lg border border-granite-400/30 px-4 py-2 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
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
                      className="mb-1 block text-sm font-medium text-pine-900"
                    >
                      What do you need?
                    </label>
                    <select
                      id="service"
                      {...register('service', {
                        setValueAs: (value) => value || undefined,
                      })}
                      className="w-full rounded-lg border border-granite-400/30 bg-white px-4 py-2 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
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
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium text-pine-900">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      {...register('subject')}
                      className="w-full rounded-lg border border-granite-400/30 px-4 py-2 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-pine-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={5}
                      className="w-full rounded-lg border border-granite-400/30 px-4 py-2 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
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
              <h3 className="mb-4 text-2xl font-bold text-pine-900">Let's Connect</h3>
              <p className="text-granite-700">
                I'm always interested in hearing about new projects, opportunities, and
                collaborations. Whether you need a developer, consultant, or just want to chat about
                tech—reach out!
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="rounded-lg bg-pine-100 p-3">
                    <Mail className="h-5 w-5 text-pine-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-pine-900">Email</p>
                    <a
                      href="mailto:cyrus@cyruskhiabani.com"
                      className="text-granite-700 hover:text-pine-600"
                    >
                      cyrus@cyruskhiabani.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="rounded-lg bg-ridge-100 p-3">
                    <MapPin className="h-5 w-5 text-ridge-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-pine-900">Location</p>
                    <p className="text-granite-700">New Jersey Shore, USA</p>
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
