import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics/react';
import { ChatButton } from './ChatButton';
import { useChatOpenState } from '@/hooks/useChatOpenState';

// The panel, the message history, the API client and react-query together come
// to ~38 kB minified and are needed by nobody who does not open the chat. They
// load on the first open; `prefetchChatConversation` warms the chunk on hover so
// the panel is already in cache by the time the click lands.
const importChatConversation = () => import('./ChatConversation');
const ChatConversation = lazy(() =>
  importChatConversation().then((m) => ({ default: m.ChatConversation }))
);

let chatConversationPrefetched = false;
const prefetchChatConversation = () => {
  if (chatConversationPrefetched) return;
  chatConversationPrefetched = true;
  void importChatConversation();
};

export function ChatWidget() {
  const { isOpen, openChat, closeChat } = useChatOpenState();

  const handleOpenChat = () => {
    track('chatbot_open');
    openChat();
  };

  // The chat was left open in a previous navigation this session — start
  // fetching the panel immediately rather than waiting on Suspense.
  useEffect(() => {
    if (isOpen) prefetchChatConversation();
  }, [isOpen]);

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
          <Suspense key="panel" fallback={null}>
            <ChatConversation onClose={closeChat} />
          </Suspense>
        ) : (
          <ChatButton
            key="button"
            onClick={handleOpenChat}
            onPrefetch={prefetchChatConversation}
          />
        )}
      </AnimatePresence>
    </>
  );
}
