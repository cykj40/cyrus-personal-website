import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body as ContactFormData;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // TODO: Integrate with your email service (SendGrid, Resend, etc.)
    // For now, just log the data and return success
    console.log('Contact form submission:', { name, email, subject, message });

    // Example with SendGrid (uncomment and configure when ready):
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'cyrus@example.com',
      from: 'noreply@example.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><br><strong>Message:</strong><br>${message}`,
    };

    await sgMail.send(msg);
    */

    return res.status(200).json({
      success: true,
      message: 'Message received successfully'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
