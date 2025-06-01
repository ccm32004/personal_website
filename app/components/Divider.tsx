'use client';
import { motion } from 'framer-motion';

export default function Divider() {
  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        className="via-neon-blue h-px bg-gradient-to-r from-transparent to-transparent"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: 1,
          boxShadow: ['0 0 10px #00FFF5', '0 0 20px #00FFF5', '0 0 10px #00FFF5'],
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
