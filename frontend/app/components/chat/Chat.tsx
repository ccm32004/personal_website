'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div className="mx-auto w-full max-w-3xl">
      <motion.div
        className="border-neon-purple/50 relative flex h-[520px] flex-col overflow-hidden border bg-black/80 shadow-[0_0_40px_rgba(157,78,221,0.12)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-neon-blue/70 absolute top-0 left-0 z-20 h-7 w-7 border-t-2 border-l-2" />
        <div className="border-neon-purple/70 absolute right-0 bottom-0 z-20 h-7 w-7 border-r-2 border-b-2" />
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 245, 0.35) 3px)',
          }}
        />

        <TerminalHeader />

        <div
          ref={messagesContainerRef}
          className="relative z-[1] flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.length === 0 && (
            <div className="font-mono space-y-1 text-xs text-gray-500">
              <p>
                <span className="text-neon-blue">[boot]</span> cecebot kernel v1.0
              </p>
              <p>
                <span className="text-neon-blue">[ok]</span> rag index mounted
              </p>
              <p>
                <span className="text-neon-blue">[ok]</span> awaiting query
              </p>
              <p className="pt-3 text-gray-400">
                <span className="text-neon-purple">{'>'}</span> ask about projects, skills,
                experience
              </p>
            </div>
          )}
          <AnimatePresence>
            {messages.map((message, index) => (
              <ChatMessage key={index} text={message.text} sender={message.sender} />
            ))}
            {isLoading && <ChatMessage text="thinking..." sender="bot" />}
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
