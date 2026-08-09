import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { CHAT_SYSTEM_PROMPT, PORTFOLIO_CONTEXT } from '../src/lib/portfolio-context.js';

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
      throw new Error('No text block in Claude API response');
    }

    const assistantMessage = textBlock.text;

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
