'use client';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatMessage({ text, sender }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {sender === 'bot' && (
        <div className="bg-neon-purple/20 border-neon-purple mr-2 flex h-8 w-8 items-center justify-center rounded-full border">
          <FaRobot className="text-neon-purple" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          sender === 'user'
            ? 'bg-neon-purple/20 border-neon-purple border text-right'
            : 'bg-neon-blue/20 border-neon-blue border'
        }`}
      >
        <p className="whitespace-pre-wrap text-gray-300">{text}</p>
      </div>
    </motion.div>
  );
}
