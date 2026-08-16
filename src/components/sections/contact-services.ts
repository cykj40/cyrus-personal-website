/**
 * The service options offered by the contact form.
 *
 * Kept in its own module because `/contact` validates the `?service=` search
 * param at route-definition time. Route definitions live in the entry chunk, so
 * reading these values straight from `Contact.tsx` would pull that component —
 * and with it react-hook-form + zod — into the initial download for every page.
 */
export const CONTACT_SERVICE_VALUES = ['automation', 'mcp', 'assistant'] as const;

export type ContactService = (typeof CONTACT_SERVICE_VALUES)[number];

export const isContactService = (value: unknown): value is ContactService =>
  typeof value === 'string' && (CONTACT_SERVICE_VALUES as readonly string[]).includes(value);
