import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Portfolio context for RAG
const PORTFOLIO_CONTEXT = `
# Cyrus Khiabani — Portfolio Context

## Identity & Philosophy
I am a systems-driven software developer focused on usefulness, correctness, and reality. I build tools that remove friction, surface truth, and respect constraints.

## Technical Profile
- **Languages**: TypeScript, JavaScript, Python, Go, SQL
- **Frontend**: React 19, Next.js, TanStack Router, TanStack Query, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Fastify, Express.js, Go, PostgreSQL, Drizzle ORM
- **AI/ML**: Claude API, OpenAI API, MCP Protocol, LangChain, Pinecone
- **Specialties**: MCP server development, Healthcare APIs, Construction Tech automation

## Featured Projects
1. **Personal Diabetes AI Tracker**: Integrates Dexcom CGM data with AI for holistic glucose management
2. **TSheets MCP Server**: Production MCP server reducing manual timesheet processing by 90%
3. **Health Journal AI**: Full-stack health journaling platform with Claude AI analysis and personalized health insights
4. **Dexcom MCP Server**: OAuth2-enabled MCP server for glucose monitoring data

## Professional Experience
**Technical Project Manager** at Long & DeLosa Construction Group (Feb 2020 - Present)
- Built production QuickBooks Time MCP server
- Deployed Claude AI into operations
- Manage Bluebeam and Procore for 50+ users

## Contact
- Email: cyrus@cyruskhiabani.com
- GitHub: https://github.com/cykj40
- LinkedIn: https://www.linkedin.com/in/cyrus-jalili-khiabani-44605b163
- Location: New Jersey Shore, USA

## Values
Usefulness, Correctness, Discipline, Authenticity, Accountability
`;

const SYSTEM_PROMPT = `You are the AI assistant on Cyrus Khiabani's portfolio website. Your role is to help visitors learn about Cyrus's skills, projects, experience, and values.

PERSONALITY & TONE:
- Direct and honest, like Cyrus himself
- No corporate speak or empty phrases
- Concise but thorough when detail matters
- Friendly but not performative
- Respect the visitor's time

GUIDELINES:
1. Answer questions accurately based on the portfolio context
2. If asked about something not covered, say so honestly
3. For technical questions, be specific about technologies and approaches
4. Share relevant project examples when they illustrate a point
5. If someone asks about hiring or working together, encourage them to reach out via email
6. Don't make up information—stick to what's documented
7. Be proud of the work but not boastful—let the projects speak for themselves

If asked about topics completely unrelated to Cyrus or his work, politely redirect:
"I'm here to help you learn about Cyrus's work and experience. Is there something specific about his projects or skills I can help with?"

Remember: Cyrus values authenticity over performance. Represent him accurately.`;

// Validation schema
const ChatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  conversationHistory: z
    .array(
      z.object({
        id: z.string(),
        role: z.enum(['user', 'assistant']),
        content: z.string(),
        timestamp: z.string().or(z.date()),
      })
    )
    .optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const validatedData = ChatRequestSchema.parse(req.body);
    const { message, conversationHistory = [] } = validatedData;

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('Missing ANTHROPIC_API_KEY environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({ apiKey });

    // Build conversation context
    const messages: Anthropic.MessageParam[] = [];

    // Add recent conversation history (last 10 messages for context)
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    // Add current user message with portfolio context
    messages.push({
      role: 'user',
      content: `Context about Cyrus:
${PORTFOLIO_CONTEXT}

User question: ${message}`,
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    // Extract the assistant's response
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude API');
    }

    const assistantMessage = content.text;

    return res.status(200).json({
      message: assistantMessage,
      sources: [], // Can add source tracking later
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.issues,
      });
    }

    // Handle Anthropic API errors
    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return res.status(429).json({
          error: 'Rate limit exceeded. Please try again in a moment.',
          code: 'RATE_LIMIT',
        });
      }

      console.error('Anthropic API error:', error.status, error.message);
      return res.status(500).json({
        error: 'Failed to process your message. Please try again.',
      });
    }

    // Generic error
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again.',
    });
  }
}
