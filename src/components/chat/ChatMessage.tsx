import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-pine-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-ridge-500 text-white'
            : 'bg-pine-50 text-pine-900'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>

      {isUser && <div className="w-8 flex-shrink-0" />}
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-pine-600 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="bg-pine-50 rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-pine-600"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-pine-600"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-pine-600"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
