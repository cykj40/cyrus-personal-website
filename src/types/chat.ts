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
