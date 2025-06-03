'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import TerminalHeader from './TerminalHeader';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    if (!input.trim() || isLoading) return;

    (document.activeElement as HTMLElement)?.blur();

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    scrollToBottom(); // Scroll after user message

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      setMessages((prev) => {
        const updated = [...prev, { text: data.answer, sender: 'bot' as const }];
        // Wait for DOM update
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

        {/* Input Form */}
        <div className="border-neon-purple bg-cyber-darker/90 border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="relative flex-1">
              <span className="text-neon-purple absolute top-1/2 left-4 -translate-y-1/2">{`>`}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask CeceBot a question..."
                className="border-neon-purple focus:border-neon-blue focus:ring-neon-blue w-full rounded-full border bg-black/30 py-3 pr-6 pl-8 text-gray-300 transition-colors focus:ring-1 focus:outline-none"
                disabled={isLoading}
              />
            </div>
            <motion.button
              type="submit"
              className="bg-cyber-primary text-neon-purple border-neon-purple hover:shadow-neon-purple rounded-full border px-8 py-3 transition-shadow disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !input.trim()}
            >
              Send
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
