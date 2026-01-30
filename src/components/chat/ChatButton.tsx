import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const pulseVariants = {
  pulse: {
    boxShadow: [
      '0 0 0 0 rgba(45, 80, 22, 0.4)',
      '0 0 0 12px rgba(45, 80, 22, 0)',
    ],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      className="fixed bottom-6 right-6 w-14 h-14 max-md:w-12 max-md:h-12 rounded-full bg-gradient-to-br from-forest-600 to-forest-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-forest-500/50 transition-shadow z-50 flex items-center justify-center"
      aria-label="Open chat assistant"
      aria-expanded={false}
    >
      <motion.div variants={pulseVariants} animate="pulse" className="absolute inset-0 rounded-full" />
      <MessageCircle className="w-6 h-6 max-md:w-5 max-md:h-5 relative z-10" />
    </motion.button>
  );
}
