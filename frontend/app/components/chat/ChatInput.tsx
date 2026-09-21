'use client';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  isRateLimited: boolean;
  timeRemaining: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ChatInput({
  input,
  isLoading,
  isRateLimited,
  timeRemaining,
  onInputChange,
  onSubmit,
}: ChatInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-neon-blue/30 bg-black/80 flex items-center gap-3 border-t px-3 py-2.5"
    >
      <span className="font-mono shrink-0 text-sm text-neon-blue">
        guest@cecebot<span className="text-gray-500">:</span>
        <span className="text-neon-purple">~</span>
        <span className="text-gray-500">$</span>
      </span>
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={isRateLimited ? `rate limit ${timeRemaining}` : 'ask about cece...'}
        className="font-mono caret-neon-blue placeholder:text-gray-600 flex-1 bg-transparent text-sm text-gray-200 outline-none disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isLoading || isRateLimited}
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="font-mono border-neon-purple/50 text-neon-purple hover:border-neon-blue hover:text-neon-blue shrink-0 border px-3 py-1 text-[10px] tracking-[0.22em] uppercase disabled:cursor-not-allowed disabled:opacity-40"
        disabled={isLoading || !input.trim() || isRateLimited}
      >
        {isRateLimited ? `WAIT ${timeRemaining}` : 'EXEC'}
      </button>
    </form>
  );
}
