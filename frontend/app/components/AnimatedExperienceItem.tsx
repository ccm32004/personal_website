'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ExperienceItemProps {
  index: number;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  technologies: string[];
}

export default function AnimatedExperienceItem({
  index,
  title,
  company,
  location,
  date,
  description,
  technologies,
}: ExperienceItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 * index }}
      className="relative grid grid-cols-[12px_1fr] gap-4"
    >
      <div className="relative flex flex-col items-center">
        <div className="border-neon-blue bg-neon-blue/30 shadow-neon-blue z-10 mt-5 h-2.5 w-2.5 rotate-45 border" />
        <div className="from-neon-purple via-neon-purple/70 mt-1 w-px flex-1 bg-gradient-to-b to-neon-purple/30" />
      </div>

      <article className="border-neon-purple/35 bg-cyber-darker/70 hover:border-neon-blue hover:shadow-neon-purple/40 relative mb-6 overflow-hidden border px-4 py-3.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1">
        <div className="border-neon-blue/70 absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2" />
        <div className="border-neon-purple/70 absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 245, 0.35) 3px)',
          }}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-cyber text-neon-purple text-glow-purple text-lg tracking-wide uppercase">
              {company}
            </h3>
            <span className="font-mono shrink-0 pt-1 text-[10px] text-gray-400">{date}</span>
          </div>
          <p className="font-mono mt-1 text-[10px] tracking-[0.14em] text-neon-blue/80 uppercase">
            {title} · {location}
          </p>

          <p className="mt-2.5 text-sm leading-relaxed text-gray-300">{description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="border-neon-blue/40 bg-cyber-black/60 font-mono text-neon-blue px-2 py-0.5 text-[10px] tracking-widest uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
