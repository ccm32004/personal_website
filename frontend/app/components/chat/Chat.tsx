'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TerminalHeader from './TerminalHeader';
import { useRateLimit } from '../../hooks/useRateLimit';
import { BACKEND_URL } from '../../config';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isRateLimited, timeRemaining, handleRateLimit } = useRateLimit();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!input.trim() || isLoading || isRateLimited) return;

    (document.activeElement as HTMLElement)?.blur();

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    scrollToBottom();

    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });

      if (response.status === 429) {
        const data = await response.json();
        handleRateLimit(data.retry_after);
        setMessages((prev) => {
          const updated = [
            ...prev,
            {
              text:
                data.message ||
                "You're sending messages too quickly! Please wait a moment before trying again. ✨",
              sender: 'bot' as const,
            },
          ];
          setTimeout(scrollToBottom, 100);
          return updated;
        });
        return;
      }

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      setMessages((prev) => {
        const updated = [...prev, { text: data.answer, sender: 'bot' as const }];
        setTimeout(scrollToBottom, 100);
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [
          ...prev,
          { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' as const },
        ];
        setTimeout(scrollToBottom, 100);
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <motion.div
        className="bg-cyber-dark/80 border-neon-purple relative flex h-[600px] flex-col overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TerminalHeader />

        {/* Messages Container */}
        <div ref={messagesContainerRef} className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 italic">
              <span className="text-neon-purple">{`>`}</span> Ask me anything about Cece! I know
              about her projects, skills, interests, and more.
            </div>
          )}
          <AnimatePresence>
            {messages.map((message, index) => (
              <ChatMessage key={index} text={message.text} sender={message.sender} />
            ))}
            {isLoading && <ChatMessage text="Thinking..." sender="bot" />}
          </AnimatePresence>
        </div>

        <ChatInput
          input={input}
          isLoading={isLoading}
          isRateLimited={isRateLimited}
          timeRemaining={timeRemaining}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      </motion.div>
    </div>
  );
}
