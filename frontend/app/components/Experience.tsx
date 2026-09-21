'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { experiences } from '../data/experiences';
import AnimatedExperienceItem from './AnimatedExperienceItem';
import CursorLight from './CursorLight';

export default function Experience() {
  const [light, setLight] = useState<{ x: number; y: number } | null>(null);

  return (
    <section
      className="relative overflow-hidden bg-cyber-black px-6 py-24 md:px-12"
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

      <div className="relative z-20 mx-auto max-w-xl">
        <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono mb-2 text-[11px] tracking-[0.28em] text-neon-blue/70 uppercase">
              LOG // {String(experiences.length).padStart(2, '0')} ENTRIES
            </p>
            <motion.h2
              className="font-cyber text-neon-blue text-glow-blue text-3xl md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Experience
            </motion.h2>
          </div>
          <p className="font-doodle text-neon-purple -rotate-3 text-xl">
            a few chapters from the journey...
          </p>
        </div>

        <div className="relative">
          {experiences.map((experience, index) => (
            <AnimatedExperienceItem
              key={experience.company}
              index={index}
              title={experience.title}
              company={experience.company}
              location={experience.location}
              date={experience.period}
              description={experience.description.join('\n')}
              technologies={experience.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
