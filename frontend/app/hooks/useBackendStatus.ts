'use client';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export type BackendStatus = 'checking' | 'online' | 'offline';

export default function useBackendStatus() {
  const [status, setStatus] = useState<BackendStatus>('checking');

  useEffect(() => {
    let cancelled = false;

    const ping = async (timeoutMs: number) => {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(BACKEND_URL, {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('unhealthy');
        }
        const data = (await response.json().catch(() => ({}))) as { status?: string };
        if (!cancelled) {
          setStatus(data.status === 'ok' || response.ok ? 'online' : 'offline');
        }
      } catch {
        if (!cancelled) {
          setStatus('offline');
        }
      } finally {
        window.clearTimeout(timer);
      }
    };

    ping(45000);
    const interval = window.setInterval(() => ping(8000), 30000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return status;
}
