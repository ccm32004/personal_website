'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

type Filter = 'all' | 'featured';

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.featured);

  return (
    <section className="bg-cyber-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="font-cyber text-neon-purple text-glow-purple mb-8 text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        {/* Filter Buttons */}
        <div className="mb-12 flex gap-4">
          <motion.button
            className={`rounded-full border px-6 py-2 ${
              filter === 'all'
                ? 'bg-neon-purple text-cyber-black border-neon-purple'
                : 'border-neon-purple text-neon-purple hover:bg-neon-purple/20'
            } transition-colors`}
            onClick={() => setFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </motion.button>
          <motion.button
            className={`rounded-full border px-6 py-2 ${
              filter === 'featured'
                ? 'bg-neon-blue text-cyber-black border-neon-blue'
                : 'border-neon-blue text-neon-blue hover:bg-neon-blue/20'
            } transition-colors`}
            onClick={() => setFilter('featured')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Featured
          </motion.button>
        </div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
