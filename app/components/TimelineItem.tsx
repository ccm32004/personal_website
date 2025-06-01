'use client';
import { motion } from 'framer-motion';
import type { Experience } from '../data/experiences';

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export default function TimelineItem({ experience, index }: TimelineItemProps) {
  return (
    <div className="relative pb-12 pl-8">
      {/* Fixed timeline line */}
      <motion.div
        className="from-neon-blue absolute top-0 left-0 h-full w-px bg-gradient-to-b to-transparent"
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      />

      {/* Fixed timeline dot */}
      <motion.div
        className="bg-neon-blue shadow-neon-blue absolute top-0 left-[-4px] h-2 w-2 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: index * 0.2,
        }}
        whileHover={{ scale: 1.5 }}
      />

      {/* Animated content */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <motion.div
          className="hover:bg-cyber-primary/10 space-y-3 rounded-lg p-6 transition-colors"
          whileHover={{ x: 10 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <motion.h3
              className="font-cyber text-neon-blue text-xl"
              whileHover={{ x: 5, textShadow: '0 0 8px #00FFF5' }}
            >
              {experience.title}
            </motion.h3>
            <span className="text-sm text-gray-400">@ {experience.company}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{experience.location}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
            <span>{experience.period}</span>
          </div>

          <ul className="space-y-2">
            {experience.description.map((item, i) => (
              <motion.li
                key={i}
                className="border-l border-transparent pl-4 text-gray-300 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                whileHover={{ x: 5, color: '#fff' }}
              >
                • {item}
              </motion.li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="bg-cyber-primary text-neon-purple border-neon-purple hover:bg-neon-purple hover:text-cyber-black rounded-full border px-3 py-1 text-sm transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.2 + i * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 10px rgba(157, 78, 221, 0.5)',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
