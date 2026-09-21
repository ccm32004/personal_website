'use client';
import type { BackendStatus } from '../hooks/useBackendStatus';

const labels: Record<BackendStatus, string> = {
  checking: 'SYNC',
  online: 'ONLINE',
  offline: 'OFFLINE',
};

const dots: Record<BackendStatus, string> = {
  checking: 'bg-neon-yellow animate-pulse',
  online: 'bg-neon-blue shadow-neon-blue animate-pulse',
  offline: 'bg-neon-pink shadow-neon-pink',
};

export default function StatusDot({ status }: { status: BackendStatus }) {
  return (
    <span className="font-mono inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-gray-400 uppercase">
      <span className={`h-2.5 w-2.5 rounded-full ${dots[status]}`} aria-hidden="true" />
      <span>{labels[status]}</span>
    </span>
  );
}
