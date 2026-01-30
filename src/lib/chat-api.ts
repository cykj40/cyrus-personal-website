import type { ChatRequest, ChatResponse } from '@/types/chat';

export class ChatAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ChatAPIError';
  }
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new ChatAPIError(
          'I need a moment to catch up. Please try again in a few seconds.',
          429,
          'RATE_LIMIT'
        );
      }

      const errorData = await response.json().catch(() => ({}));
      throw new ChatAPIError(
        errorData.error || 'Failed to get response. Please try again.',
        response.status,
        errorData.code
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ChatAPIError) {
      throw error;
    }

    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ChatAPIError(
        'You appear to be offline. Please check your connection.',
        0,
        'NETWORK_ERROR'
      );
    }

    // Generic error
    throw new ChatAPIError(
      "Sorry, I'm having trouble responding right now. Please try again or contact Cyrus directly.",
      500,
      'UNKNOWN_ERROR'
    );
  }
}
