'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chat() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: query.trim(),
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add bot message
      const botMessage: Message = {
        id: Date.now(),
        text: data.answer,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Add error message
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Sorry, I had trouble processing that. Please try again!',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="bg-cyber-dark rounded-lg border border-neon-purple shadow-lg flex flex-col h-[600px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-gray-500 italic text-center">
              Ask me anything about Cece! I know about her projects, skills, interests, and more.
            </div>
          )}
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-neon-purple/20 border border-neon-purple flex items-center justify-center mr-2">
                    <FaRobot className="text-neon-purple" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-neon-purple/20 border border-neon-purple text-right'
                      : 'bg-neon-blue/20 border border-neon-blue'
                  }`}
                >
                  <p className="text-gray-300 whitespace-pre-wrap">{message.text}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-neon-purple/20 border border-neon-purple flex items-center justify-center mr-2">
                  <FaRobot className="text-neon-purple" />
                </div>
                <motion.div
                  className="bg-neon-blue/20 border border-neon-blue rounded-2xl px-4 py-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <p className="text-neon-blue">CeceBot is thinking...</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input form */}
        <div className="p-4 border-t border-neon-purple">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask CeceBot a question..."
              className="flex-1 bg-black/30 text-gray-300 rounded-full px-6 py-3 border border-neon-purple focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue transition-colors"
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              className="bg-cyber-primary text-neon-purple border border-neon-purple rounded-full px-8 py-3 hover:shadow-neon-purple transition-shadow disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !query.trim()}
            >
              Send
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 