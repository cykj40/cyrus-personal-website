import { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendChatMessage, ChatAPIError } from '@/lib/chat-api';
import type { ChatMessage } from '@/types/chat';
import { WELCOME_MESSAGE } from '@/types/chat';

const STORAGE_KEY = 'chat-messages';
const STORAGE_OPEN_KEY = 'chat-is-open';

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

  const [isOpen, setIsOpen] = useState(() => {
    // Load open state from sessionStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(STORAGE_OPEN_KEY);
        return stored === 'true';
      } catch (error) {
        return false;
      }
    }
    return false;
  });

  const [error, setError] = useState<string | null>(null);

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

  // Persist open state to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_OPEN_KEY, String(isOpen));
      } catch (error) {
        console.error('Failed to save chat open state:', error);
      }
    }
  }, [isOpen]);

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
      if (err instanceof ChatAPIError) {
        setError(err.message);
      } else {
        setError("Sorry, I'm having trouble responding right now. Please try again.");
      }
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

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    messages,
    isLoading: mutation.isPending,
    error,
    isOpen,
    sendMessage,
    clearChat,
    toggleChat,
    openChat,
    closeChat,
  };
}
