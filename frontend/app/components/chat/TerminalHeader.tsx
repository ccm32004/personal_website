'use client';
import { useState } from 'react';
import HealthLegendModal from './HealthLegendModal';

export default function TerminalHeader() {
  const [legendOpen, setLegendOpen] = useState(false);

  return (
    <>
      <div className="border-neon-blue/30 bg-black/80 flex items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="bg-neon-pink/80 h-2.5 w-2.5 rounded-full" />
            <span className="bg-neon-yellow/80 h-2.5 w-2.5 rounded-full" />
            <span className="bg-neon-blue/80 h-2.5 w-2.5 rounded-full" />
          </div>
          <p className="font-mono text-[12px] tracking-wide text-neon-blue">
            cece@cecebot<span className="text-gray-500">:</span>
            <span className="text-neon-purple">~/chat</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLegendOpen(true)}
          aria-label="What the status colors mean"
          className="font-mono border-neon-blue/40 text-neon-blue hover:border-neon-blue hover:bg-neon-blue/10 flex h-5 w-5 items-center justify-center rounded-full border text-[11px]"
        >
          ?
        </button>
      </div>
      {legendOpen && <HealthLegendModal onClose={() => setLegendOpen(false)} />}
    </>
  );
}
