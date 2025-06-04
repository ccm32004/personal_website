'use client';
import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CyberpunkFooter() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  // ✅ Store randomized light positions on client side only
  const [lightPositions, setLightPositions] = useState<{ left: string; top: string }[]>([]);

  useEffect(() => {
    const positions = Array.from({ length: 60 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${20 + Math.random() * 60}%`,
    }));
    setLightPositions(positions);
  }, []);

  return (
    <footer ref={footerRef} className="relative h-48 w-full overflow-hidden">
      {/* Ombre Background */}
      <div className="from-neon-purple/25 via-cyber-darker to-cyber-black absolute inset-0 bg-gradient-to-t" />

      {/* City Skyline */}
      <div className="absolute bottom-0 h-full w-full">
        <svg className="h-full w-full" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet">
          {/* Left and center buildings go here */}
          <g id="buildings">
            <motion.path
              d="M-10,300 L-10,175 L10,175 L10,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.48)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.48)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: -0.2, ease: 'easeInOut' }}
            />

            <motion.path
              d="M-50,300 L-50,145 L-30,145 L-30,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.54)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.54)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: -0.4, ease: 'easeInOut' }}
            />

            <motion.path
              d="M-90,300 L-90,160 L-80,160 L-80,140 L-70,140 L-70,160 L-60,160 L-60,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.5)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.5)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: -0.6, ease: 'easeInOut' }}
            />

            <motion.path
              d="M-130,300 L-130,180 L-110,180 L-110,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.46)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.46)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: -0.8, ease: 'easeInOut' }}
            />

            <motion.path
              d="M-170,300 L-170,140 L-150,140 L-150,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.6)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.6)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: -1.0, ease: 'easeInOut' }}
            />

            <motion.path
              d="M50,300 L50,162 L70,162 L70,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.52)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.52)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.0, ease: 'easeInOut' }}
            />

            <motion.path
              d="M92,300 L92,157 L112,157 L112,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.5)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.5)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.2, ease: 'easeInOut' }}
            />

            <motion.path
              d="M139,300 L139,150 L145,150 L145,111 L153,111 L153,150 L159,150 L159,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.57)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.57)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
            />

            <motion.path
              d="M181,300 L181,173 L187,173 L187,151 L195,151 L195,173 L201,173 L201,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.59)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.59)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
            />

            <motion.path
              d="M221,300 L221,212 L251,212 L251,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.55)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.55)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
            />

            <motion.path
              d="M281,300 L281,179 L287,179 L287,157 L295,157 L295,179 L301,179 L301,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.67)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.67)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 1.0, ease: 'easeInOut' }}
            />

            <motion.path
              d="M325,300 L325,203 L334,203 L334,172 L346,172 L346,203 L355,203 L355,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.65)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.65)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 1.2, ease: 'easeInOut' }}
            />

            <motion.path
              d="M376,300 L376,209 L416,209 L416,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.5)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.5)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 1.4, ease: 'easeInOut' }}
            />

            <motion.path
              d="M438,300 L438,275 L468,275 L468,300"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.61)"
              strokeWidth="2"
              className="drop-shadow-[0_0_3px_rgba(157,78,221,0.61)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 1.6, ease: 'easeInOut' }}
            />
            <motion.path
              d="M498,300 L498,278 L518,260 L538,278 L538,300 Z"
              fill="transparent"
              stroke="rgba(157, 78, 221, 0.67)"
              strokeWidth="2"
              className="drop-shadow-[0_0_4px_rgba(157,78,221,0.67)]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: 1.8, ease: 'easeInOut' }}
            />
          </g>

          {/* Mirror the buildings for the right side */}
          <use href="#buildings" transform="translate(1200,0) scale(-1,1)" />
        </svg>

        {/* Neon city lights */}
        <div className="absolute inset-0">
          {lightPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="bg-neon-purple absolute h-0.5 w-0.5 rounded-full shadow-[0_0_2px_rgba(157,78,221,0.8)]"
              style={pos}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: Math.random() * 2 + 1,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end pb-6">
        <motion.p
          className="text-neon-purple/80 font-cyber mb-3 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          © {currentYear} Cece Ma. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
