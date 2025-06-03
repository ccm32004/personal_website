'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingParticles() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ Only generate particles after client mount
  const particles = useMemo(() => {
    if (!hasMounted) return [];
    return Array.from({ length: 100 }).map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
    }));
  }, [hasMounted]);

  if (!hasMounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="bg-neon-blue absolute h-1 w-1 rounded-full"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ y: '-100%', opacity: 0 }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
