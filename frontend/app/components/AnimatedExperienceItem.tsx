'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ExperienceItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
  technologies: string[];
  isLeft?: boolean;
}

export default function AnimatedExperienceItem({
  title,
  company,
  date,
  description,
  technologies,
  isLeft = true,
}: ExperienceItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`relative w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        {/* Glowing dot */}
        <div
          className={`absolute top-0 ${isLeft ? 'right-0 md:-right-3' : 'left-0 md:-left-3'} h-6 w-6`}
        >
          <div className="bg-neon-purple shadow-glow-purple absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full" />
        </div>

        {/* Content */}
        <div className="bg-cyber-darker/80 border-neon-purple/30 rounded-lg border p-6 shadow-lg backdrop-blur-sm">
          <h3 className="font-cyber text-neon-purple mb-2 text-xl">{title}</h3>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-neon-blue font-mono">{company}</span>
            <span className="text-sm text-gray-400">{date}</span>
          </div>
          <p className="mb-4 text-gray-300">{description}</p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="bg-cyber-primary/30 text-neon-purple border-neon-purple/50 rounded-full border px-2 py-1 text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 10px rgba(157, 78, 221, 0.3)',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
