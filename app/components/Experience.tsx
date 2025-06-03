'use client';
import { motion } from 'framer-motion';
import { experiences } from '../data/experiences';
import AnimatedExperienceItem from './AnimatedExperienceItem';

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

        <div className="relative space-y-12">
          {/* Vertical connecting line */}
          <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transform">
            <motion.div
              className="from-neon-purple via-neon-purple h-full w-full bg-gradient-to-b to-transparent"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {experiences.map((experience, index) => (
            <AnimatedExperienceItem
              key={experience.company}
              title={experience.title}
              company={experience.company}
              date={experience.period}
              description={experience.description.join('\n')}
              technologies={experience.technologies}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
