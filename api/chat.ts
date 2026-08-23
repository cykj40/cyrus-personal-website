import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { CHAT_SYSTEM_PROMPT, PORTFOLIO_CONTEXT } from '../src/lib/portfolio-context.js';
import { checkRateLimit, getClientIdentifier } from './_lib/rate-limit.js';

const SYSTEM_PROMPT = `${CHAT_SYSTEM_PROMPT}

${PORTFOLIO_CONTEXT}`;

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
    // Rate limit before doing any billable work. Fail-open: if Redis is
    // unreachable the decision comes back allowed, and the reason is logged
    // inside the limiter.
    const identifier = getClientIdentifier(req);
    const decision = await checkRateLimit(identifier);

    if (!decision.allowed) {
      res.setHeader('Retry-After', String(decision.retryAfterSeconds));
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again later.',
        code: 'RATE_LIMIT',
      });
    }

    // Validate request body
    const validatedData = ChatRequestSchema.parse(req.body);
    const { message, conversationHistory = [] } = validatedData;

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('Missing ANTHROPIC_API_KEY environment variable');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Initialize Anthropic client. The explicit timeout keeps a hung upstream
    // call from holding the function open until the platform kills it, which
    // would leave the widget spinning with no response.
    const anthropic = new Anthropic({
      apiKey,
      timeout: 60_000,
      maxRetries: 2,
    });

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

    // Add current user message
    messages.push({
      role: 'user',
      content: message,
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages,
    });

    // Extract the assistant's response. The model may emit non-text blocks
    // (e.g. thinking) before the text block, so find the text block rather
    // than assuming it is first.
    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock) {
      // Malformed/unexpected shape rather than a transport failure — log the
      // block types so the cause is diagnosable from the function logs.
      console.error(
        'Chat API error: no text block in Claude response.',
        `stop_reason=${response.stop_reason}`,
        `blockTypes=${JSON.stringify(response.content.map((block) => block.type))}`
      );
      return res.status(502).json({
        error: 'Failed to process your message. Please try again.',
        code: 'UPSTREAM_ERROR',
      });
    }

    const assistantMessage = textBlock.text;

    return res.status(200).json({
      message: assistantMessage,
      sources: [], // Can add source tracking later
    });
  } catch (error) {
    // Handle validation errors. Zod issues describe the caller's own payload,
    // so echoing them back leaks nothing internal.
    if (error instanceof z.ZodError) {
      console.error('Chat API validation error:', error.issues);
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.issues,
      });
    }

    // Connection-level failures (DNS, socket, TLS) never produced a response.
    if (error instanceof Anthropic.APIConnectionError) {
      console.error('Anthropic connection error:', error.name, error.message);
      return res.status(503).json({
        error: 'The assistant is unavailable right now. Please try again.',
        code: 'UPSTREAM_ERROR',
      });
    }

    // Handle Anthropic API errors
    if (error instanceof Anthropic.APIError) {
      // Upstream quota exhaustion, not the visitor's fault. Distinguished from
      // our own limiter by code so the client can word it correctly.
      if (error.status === 429) {
        console.error('Anthropic rate limit hit:', error.message);
        return res.status(503).json({
          error: 'The assistant is unavailable right now. Please try again.',
          code: 'UPSTREAM_ERROR',
        });
      }

      console.error(
        'Anthropic API error:',
        `status=${error.status}`,
        `type=${error.name}`,
        error.message
      );
      return res.status(502).json({
        error: 'Failed to process your message. Please try again.',
        code: 'UPSTREAM_ERROR',
      });
    }

    // Generic error — log the full object server-side, return nothing specific.
    console.error('Chat API unexpected error:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again.',
      code: 'UNKNOWN_ERROR',
    });
  }
}
