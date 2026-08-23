import { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendChatMessage, ChatAPIError } from '@/lib/chat-api';
import type { ChatErrorState, ChatMessage } from '@/types/chat';
import { CHAT_ERROR_COPY, DEFAULT_CHAT_ERROR, WELCOME_MESSAGE } from '@/types/chat';

const STORAGE_KEY = 'chat-messages';

/**
 * The chat conversation: history, the send mutation, and error mapping.
 *
 * Open/closed state lives in `useChatOpenState` instead, so that the widget
 * shell can render the launcher without loading this module (and with it
 * react-query, ~28 kB minified).
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load messages from sessionStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert timestamp strings back to Date objects
          return parsed.map((msg: ChatMessage) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
    return [WELCOME_MESSAGE];
  });

  const [error, setError] = useState<ChatErrorState | null>(null);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save chat history:', error);
      }
    }
  }, [messages]);

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setError(null);
    },
    onError: (err: Error) => {
      // Map to friendly copy by code — the server's own message string is kept
      // generic on purpose and isn't shown to the visitor.
      const code = err instanceof ChatAPIError ? err.code : undefined;
      setError((code && CHAT_ERROR_COPY[code]) || DEFAULT_CHAT_ERROR);
    },
  });

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      setError(null);

      // Add user message immediately (optimistic update)
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Send to API
      mutation.mutate({
        message: content.trim(),
        conversationHistory: messages.slice(-10), // Send last 10 messages for context
      });
    },
    [messages, mutation]
  );

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear chat history:', error);
      }
    }
  }, []);

  return {
    messages,
    isLoading: mutation.isPending,
    error,
    sendMessage,
    clearChat,
  };
}
