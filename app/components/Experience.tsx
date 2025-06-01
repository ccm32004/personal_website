'use client';
import { motion } from 'framer-motion';
import { experiences } from '../data/experiences';
import TimelineItem from './TimelineItem';

export default function Experience() {
  return (
    <section className="bg-cyber-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="font-cyber text-neon-blue text-glow-blue mb-12 text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {experiences.map((experience, index) => (
            <TimelineItem key={experience.company} experience={experience} index={index} />
          ))}

          {/* Final timeline line gradient */}
          <div className="from-neon-blue via-neon-blue/50 absolute top-0 left-0 h-full w-px bg-gradient-to-b to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
