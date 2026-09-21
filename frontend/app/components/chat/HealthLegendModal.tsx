'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function HealthLegendModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="health-legend-title"
        className="border-neon-purple/50 bg-cyber-darker relative w-full max-w-md border p-6 shadow-[0_0_40px_rgba(157,78,221,0.16)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-neon-blue/70 absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2" />
        <div className="border-neon-purple/70 absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2" />

        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-neon-blue/70 uppercase">
              SYS // HEALTH
            </p>
            <h3
              id="health-legend-title"
              className="font-cyber text-neon-purple text-glow-purple mt-1 text-xl"
            >
              Status legend
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-gray-400 hover:text-neon-blue text-xs tracking-widest uppercase"
          >
            close
          </button>
        </div>

        <p className="font-mono mb-5 text-xs leading-relaxed text-gray-400">
          The terminal pings <span className="text-neon-blue">GET /</span> on CeceBot&apos;s backend.
          If that health check replies <span className="text-gray-200">{'{ status: "ok" }'}</span>,
          the bot is up. It retries every 30 seconds, including after the server wakes from sleep.
        </p>

        <ul className="font-mono space-y-3 text-xs tracking-wide text-gray-300">
          <li className="flex items-start gap-3">
            <span className="bg-neon-blue shadow-neon-blue mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" />
            <span>
              <span className="text-neon-blue">ONLINE</span> — health check succeeded. You can chat.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-neon-yellow mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" />
            <span>
              <span className="text-neon-yellow">SYNC</span> — still checking, or waking a sleeping
              server.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-neon-pink shadow-neon-pink mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" />
            <span>
              <span className="text-neon-pink">OFFLINE</span> — no healthy response. The bot may be
              down.
            </span>
          </li>
        </ul>
      </div>
    </div>,
    document.body,
  );
}
