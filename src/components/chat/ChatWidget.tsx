import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import { ChatButton } from './ChatButton';
import { ChatPanel } from './ChatPanel';
import { useChat } from '@/hooks/useChat';

export function ChatWidget() {
  const { messages, isLoading, error, isOpen, sendMessage, closeChat, openChat } = useChat();

  const handleOpenChat = () => {
    track('chatbot_open');
    openChat();
  };

  // Handle Escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeChat]);

  // Trap focus within chat panel when open
  useEffect(() => {
    if (isOpen) {
      const previouslyFocused = document.activeElement as HTMLElement;

      return () => {
        previouslyFocused?.focus();
      };
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <ChatPanel
            key="panel"
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSend={sendMessage}
            onClose={closeChat}
          />
        ) : (
          <ChatButton key="button" onClick={handleOpenChat} />
        )}
      </AnimatePresence>
    </>
  );
}
