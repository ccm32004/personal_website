import { useState, useEffect } from 'react';

interface RateLimitState {
  isRateLimited: boolean;
  timeRemaining: string;
  handleRateLimit: (retryAfter: number) => void;
}

export function useRateLimit(): RateLimitState {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<number | null>(null);

  useEffect(() => {
    if (rateLimitResetTime && Date.now() >= rateLimitResetTime) {
      setIsRateLimited(false);
      setRateLimitResetTime(null);
    }

    const timer = setInterval(() => {
      if (rateLimitResetTime && Date.now() >= rateLimitResetTime) {
        setIsRateLimited(false);
        setRateLimitResetTime(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLimitResetTime]);

  const handleRateLimit = (retryAfter: number) => {
    setIsRateLimited(true);
    setRateLimitResetTime(Date.now() + (retryAfter * 1000));
  };

  const getTimeRemaining = () => {
    if (!rateLimitResetTime) return '';
    const seconds = Math.ceil((rateLimitResetTime - Date.now()) / 1000);
    return seconds > 0 ? `(${seconds}s)` : '';
  };

  return {
    isRateLimited,
    timeRemaining: getTimeRemaining(),
    handleRateLimit
  };
} 