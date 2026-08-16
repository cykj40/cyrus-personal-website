import { useCallback, useEffect, useState } from 'react';

const STORAGE_OPEN_KEY = 'chat-is-open';

/**
 * Whether the chat widget is open, persisted across navigations for the session.
 *
 * Deliberately separate from `useChat`: this is the one piece of chat state the
 * eagerly-loaded widget shell needs in order to decide whether to render the
 * launcher button or pull down the conversation chunk. Everything else — the
 * message list, the API call, react-query — lives behind that lazy boundary.
 */
export function useChatOpenState() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(STORAGE_OPEN_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem(STORAGE_OPEN_KEY, String(isOpen));
    } catch (error) {
      console.error('Failed to save chat open state:', error);
    }
  }, [isOpen]);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  return { isOpen, openChat, closeChat };
}
