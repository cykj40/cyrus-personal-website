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
  content: "Hi! 👋 I'm Cyrus's AI assistant. I can tell you about his projects, skills, experience, or help you get in touch. What would you like to know?",
  timestamp: new Date(),
};
