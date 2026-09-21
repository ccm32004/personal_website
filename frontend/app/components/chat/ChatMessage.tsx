'use client';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatMessage({ text, sender }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="font-mono text-sm leading-relaxed"
    >
      {sender === 'user' ? (
        <p className="text-gray-200">
          <span className="text-neon-blue">guest@cecebot</span>
          <span className="text-gray-500">:</span>
          <span className="text-neon-purple">~</span>
          <span className="text-gray-500">$ </span>
          {text}
        </p>
      ) : (
        <p className="text-gray-300">
          <span className="text-neon-purple">cecebot</span>
          <span className="text-gray-500"> ▸ </span>
          <span className="whitespace-pre-wrap">{text}</span>
        </p>
      )}
    </motion.div>
  );
}
