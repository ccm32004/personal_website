'use client';
import { FaRobot } from 'react-icons/fa';
import Chat from './Chat';

export default function ChatSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Ombre background */}
      <div className="bg-gradient-radial from-neon-purple/50 via-neon-blue/60 to-cyber-darker absolute inset-0"></div>
      <div className="via-neon-purple/30 absolute inset-0 bg-gradient-to-br from-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-center gap-4">
          <FaRobot className="text-neon-purple text-4xl" />
          <h2 className="font-cyber text-neon-purple text-glow-purple text-3xl md:text-4xl">
            Chat with CeceBot
          </h2>
        </div>
        <Chat />
      </div>
    </section>
  );
}
