'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import PhotoGallery from './PhotoGallery';
import CursorLight from './CursorLight';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [light, setLight] = useState<{ x: number; y: number } | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pt-8 pb-16 md:px-12"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setLight({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
      }}
      onMouseLeave={() => setLight(null)}
    >
      <CursorLight light={light} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 40%, rgba(157, 78, 221, 0.16), transparent 60%), radial-gradient(ellipse 55% 45% at 80% 30%, rgba(0, 255, 245, 0.1), transparent 58%), radial-gradient(ellipse 40% 40% at 70% 80%, rgba(255, 46, 99, 0.08), transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 245, 0.55) 3px)',
        }}
      />

      <motion.div
        className="relative z-20 mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <p className="font-mono mb-1 text-[11px] tracking-[0.28em] text-neon-blue/70 uppercase">
                USR // CECE
              </p>
              <h2 className="font-cyber text-neon-purple text-glow-purple text-3xl md:text-4xl">
                About Me
              </h2>
            </motion.div>

            <motion.div
              className="max-w-md space-y-5 text-base leading-relaxed text-gray-300 md:text-lg"
              variants={itemVariants}
            >
              <p>
        Hi! I&apos;m Cece, a CS student who likes building backend systems,
        distributed pipelines, and tools that make complicated things feel a little
        simpler. I like digging into how systems behave, finding what&apos;s slowing
        them down, and making them better.
      </p>

        <p>
          When I&apos;m not staring at code, I&apos;m probably hiking, reading, doing
          pilates, or spending my money online shopping.
        </p>
            </motion.div>

            <div className="text-neon-purple pointer-events-none relative z-30 hidden pt-2 lg:flex justify-end">
              <div className="relative w-fit translate-x-8">
                <p className="font-doodle -rotate-[6deg] text-xl leading-none whitespace-nowrap">
                  click to flip thru the stack
                </p>
                <svg
                  className="absolute top-1 left-[100%] h-14 w-28 overflow-visible"
                  viewBox="0 0 96 56"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 44 C 28 40, 58 22, 86 10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M70 6 L 90 8 L 78 22"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="relative lg:pl-8">
            <PhotoGallery />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
