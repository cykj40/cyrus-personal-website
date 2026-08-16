import { motion } from 'framer-motion';

interface ChatButtonProps {
  onClick: () => void;
  /** Warm the lazily-loaded chat panel chunk before the click lands. */
  onPrefetch?: () => void;
}

export function ChatButton({ onClick, onPrefetch }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      onTouchStart={onPrefetch}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 border-none bg-transparent p-0 cursor-pointer focus:outline-none"
      // Starts with the button's own visible text so the accessible name is a
      // superset of it (WCAG 2.5.3 "Label in Name"); the decorative ✦ is not
      // part of the name.
      aria-label="Ask me about Cyrus — open chat assistant"
    >
      {/* Speech bubble */}
      <div className="speech-bubble">
        Ask me about Cyrus <span aria-hidden="true">✦</span>
      </div>

      {/* Robot button circle */}
      <div className="robot-btn">
        <svg
          className="robot-svg"
          viewBox="0 0 32 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g className="body-bob">
            {/* Head */}
            <rect x="10" y="7" width="12" height="10" rx="2.5" fill="white" opacity="0.92" />
            {/* Antenna stem */}
            <line x1="16" y1="7" x2="16" y2="4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            {/* Antenna tip */}
            <circle cx="16" cy="3.5" r="1.5" fill="white" opacity="0.7" />
            {/* Left eye */}
            <g className="eye-blink" style={{ transformOrigin: '13px 13px' }}>
              <circle cx="13" cy="13" r="2" fill="rgb(var(--color-pine-deep))" />
              <circle cx="13" cy="12.5" r="0.7" fill="white" opacity="0.9" />
            </g>
            {/* Right eye */}
            <g className="eye-blink" style={{ transformOrigin: '19px 13px' }}>
              <circle cx="19" cy="13" r="2" fill="rgb(var(--color-pine-deep))" />
              <circle cx="19" cy="12.5" r="0.7" fill="white" opacity="0.9" />
            </g>
            {/* Body */}
            <rect x="8" y="18" width="16" height="11" rx="3" fill="white" opacity="0.92" />
            {/* Smile */}
            <path d="M13 23.5 Q16 25.5 19 23.5" stroke="rgb(var(--color-pine-deep))" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Left leg */}
            <rect x="10" y="29" width="4" height="5" rx="1.5" fill="white" opacity="0.75" />
            {/* Right leg */}
            <rect x="18" y="29" width="4" height="5" rx="1.5" fill="white" opacity="0.75" />
            {/* Left arm — waves */}
            <g className="arm-wave">
              <rect x="1" y="19" width="7" height="3" rx="1.5" fill="white" opacity="0.8" />
            </g>
            {/* Right arm — static */}
            <rect x="24" y="19" width="7" height="3" rx="1.5" fill="white" opacity="0.8" />
          </g>
        </svg>
      </div>
    </motion.button>
  );
}
