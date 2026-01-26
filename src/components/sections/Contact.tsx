import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Send } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
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
        reset();
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

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="py-6">
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
        </div>
      </div>
    </section>
  );
};
