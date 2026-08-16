import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import { ChatPanel } from './ChatPanel';
import { useChat } from '@/hooks/useChat';

interface ChatConversationProps {
  onClose: () => void;
}

/**
 * Everything the chat needs once it is actually opened: the message history, the
 * send mutation, and react-query itself.
 *
 * This module is the lazy boundary for the whole chatbot. `ChatWidget` renders
 * only the launcher button until the visitor opens the chat, so react-query
 * (~28 kB) and the panel UI stay out of the initial download on every route.
 * The provider lives here rather than in `main.tsx` for the same reason —
 * the chat is react-query's only consumer in this app.
 */
export function ChatConversation({ onClose }: ChatConversationProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatConversationInner onClose={onClose} />
      {/* Moved here with the provider; in dev it appears once the chat opens. */}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

function ChatConversationInner({ onClose }: ChatConversationProps) {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <ChatPanel
      messages={messages}
      isLoading={isLoading}
      error={error}
      onSend={sendMessage}
      onClose={onClose}
    />
  );
}
