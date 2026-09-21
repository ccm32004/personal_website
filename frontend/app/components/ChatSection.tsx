'use client';
import Chat from './chat/Chat';
import StatusDot from './StatusDot';
import useBackendStatus from '../hooks/useBackendStatus';

export default function ChatSection() {
  const status = useBackendStatus();

  return (
    <section className="relative overflow-hidden pt-12 pb-24">
      <div className="from-neon-purple/20 via-cyber-black absolute inset-0 bg-gradient-to-b to-cyber-black" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col items-center gap-3">
          <p className="font-mono text-[11px] tracking-[0.28em] text-neon-blue/70 uppercase">
            SYS // CECEBOT
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="font-cyber text-neon-purple text-glow-purple text-3xl md:text-4xl">
              Chat with CeceBot
            </h2>
            <StatusDot status={status} />
          </div>
        </div>
        <Chat />
      </div>
    </section>
  );
}
