export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  sources?: string[];
}

export const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! 👋 This chatbot is one of the things I build. Ask it anything about my work, projects, or experience—or how to get in touch.",
  timestamp: new Date(),
};

/** Direct-contact fallback surfaced when the assistant can't answer. */
export const CONTACT_EMAIL = 'cyrus@cyruskhiabani.com';

/**
 * A recoverable failure, rendered as an in-conversation notice rather than a
 * raw error. Held outside `messages` so it never gets replayed to the model as
 * conversation history.
 */
export interface ChatErrorState {
  message: string;
  /** Whether to offer the direct-contact fallback alongside the message. */
  showContact: boolean;
}

/**
 * Client-side copy for each failure the API can report. The server returns
 * deliberately generic strings so it leaks nothing internal; the friendly
 * wording lives here.
 */
export const CHAT_ERROR_COPY: Record<string, ChatErrorState> = {
  RATE_LIMIT: {
    message:
      "This chatbot's getting a lot of use right now. Try again in a bit — or skip the queue and reach Cyrus directly.",
    showContact: true,
  },
  UPSTREAM_ERROR: {
    message:
      "The assistant dropped the connection on its end. That one's not your fault — try again in a moment, or reach Cyrus directly.",
    showContact: true,
  },
  NETWORK_ERROR: {
    message: 'You appear to be offline. Check your connection and try again.',
    showContact: false,
  },
  UNKNOWN_ERROR: {
    message:
      'Something broke on my end. Try again in a moment, or reach Cyrus directly.',
    showContact: true,
  },
};

export const DEFAULT_CHAT_ERROR: ChatErrorState = CHAT_ERROR_COPY.UNKNOWN_ERROR;
