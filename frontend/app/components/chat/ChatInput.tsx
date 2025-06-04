'use client';
import { motion } from 'framer-motion';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  isRateLimited: boolean;
  timeRemaining: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ChatInput({
  input,
  isLoading,
  isRateLimited,
  timeRemaining,
  onInputChange,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className="border-neon-purple bg-cyber-darker/90 border-t p-4">
      <form onSubmit={onSubmit} className="flex gap-4">
        <div className="relative flex-1">
          <span className="text-neon-purple absolute top-1/2 left-4 -translate-y-1/2">{`>`}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={
              isRateLimited ? `Rate limit exceeded ${timeRemaining}` : 'Ask CeceBot a question...'
            }
            className="border-neon-purple focus:border-neon-blue focus:ring-neon-blue w-full rounded-full border bg-black/30 py-3 pr-6 pl-8 text-gray-300 transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading || isRateLimited}
          />
        </div>
        <motion.button
          type="submit"
          className="bg-cyber-primary text-neon-purple border-neon-purple hover:shadow-neon-purple rounded-full border px-8 py-3 transition-shadow disabled:cursor-not-allowed disabled:opacity-50"
          whileHover={{ scale: isRateLimited ? 1 : 1.05 }}
          whileTap={{ scale: isRateLimited ? 1 : 0.95 }}
          disabled={isLoading || !input.trim() || isRateLimited}
        >
          {isRateLimited ? `Wait ${timeRemaining}` : 'Send'}
        </motion.button>
      </form>
    </div>
  );
}
