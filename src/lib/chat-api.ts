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
      const errorData = await response.json().catch(() => ({}));

      // Prefer the server's code. Fall back to inferring one from the status so
      // an unexpected/proxy-generated response still maps to friendly copy.
      const code =
        errorData.code ??
        (response.status === 429
          ? 'RATE_LIMIT'
          : response.status >= 500
            ? 'UPSTREAM_ERROR'
            : 'UNKNOWN_ERROR');

      throw new ChatAPIError(
        errorData.error || 'Failed to get response. Please try again.',
        response.status,
        code
      );
    }

    const data = await response.json();

    // A 200 with no usable message would otherwise render as an empty bubble.
    if (typeof data?.message !== 'string' || data.message.trim().length === 0) {
      throw new ChatAPIError(
        'Malformed response from chat API.',
        response.status,
        'UPSTREAM_ERROR'
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ChatAPIError) {
      throw error;
    }

    // Network errors. A failed fetch throws TypeError; the message text varies
    // across browsers, so treat any TypeError here as a transport failure.
    if (error instanceof TypeError) {
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
