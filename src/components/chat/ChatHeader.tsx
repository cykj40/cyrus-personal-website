import { X, Bot } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="h-14 bg-gradient-to-r from-ocean-600 to-ocean-700 text-white px-4 rounded-t-2xl flex items-center justify-between border-b border-ocean-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Cyrus's AI Assistant</h3>
          <p className="text-xs text-white/80">Ask me anything about my work</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
        aria-label="Close chat"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
