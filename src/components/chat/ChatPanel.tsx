import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from '@tanstack/react-router';
import { ChatHeader } from './ChatHeader';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatErrorState, ChatMessage as ChatMessageType } from '@/types/chat';
import { CONTACT_EMAIL } from '@/types/chat';
import { AlertCircle } from 'lucide-react';

interface ChatPanelProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: ChatErrorState | null;
  onSend: (message: string) => void;
  onClose: () => void;
}

const HIRE_ME_QUESTIONS = [
  'What has Cyrus shipped in production?',
  'How does he work with AI coding agents?',
  "Walk me through T1Copilot's architecture.",
  'Is Cyrus open to full-time roles?',
];

const SERVICES_QUESTIONS = [
  'What does a custom MCP server cost?',
  'How does the Automation Audit work?',
  "What's included in ongoing support?",
  'Can you build a RAG chatbot for us?',
];

function getSuggestedQuestions(pathname: string): string[] | null {
  if (pathname.startsWith('/hire-me')) return HIRE_ME_QUESTIONS;
  if (pathname.startsWith('/services')) return SERVICES_QUESTIONS;
  return null;
}

const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const reducedPanelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function ChatPanel({ messages, isLoading, error, onSend, onClose }: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  }, [messages, isLoading, shouldReduceMotion]);

  const hasUserMessage = messages.some((message) => message.role === 'user');
  const suggestedQuestions = !hasUserMessage && !isLoading ? getSuggestedQuestions(location.pathname) : null;

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedPanelVariants : panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bottom-6 right-6 w-[380px] h-[520px] max-md:w-[calc(100vw-32px)] max-md:h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
      role="dialog"
      aria-label="Chat with Cyrus's AI Assistant"
    >
      <ChatHeader onClose={onClose} />

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-ocean-50/30 scroll-smooth"
        aria-live="polite"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {/*
          Rendered with the same geometry as an assistant message so it reads as
          part of the conversation, in ember rather than ocean so it's still
          clearly a notice and not an answer.
        */}
        {error && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
            role="status"
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-ember-500 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="max-w-[80%] rounded-2xl border border-ember-200 bg-ember-50 px-4 py-2.5">
              <p className="text-sm leading-relaxed text-pine-900">{error.message}</p>
              {error.showContact && (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-1.5 inline-block rounded text-sm font-medium text-ember-700 underline underline-offset-2 hover:text-ember-800 focus:outline-none focus:ring-2 focus:ring-ember-500"
                >
                  {CONTACT_EMAIL}
                </a>
              )}
            </div>
          </motion.div>
        )}

        {suggestedQuestions && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => onSend(question)}
                className="text-xs font-medium text-ocean-700 bg-ocean-50 border border-ocean-200 rounded-full px-3 py-1.5 hover:bg-ocean-100 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={onSend} isLoading={isLoading} />
    </motion.div>
  );
}
