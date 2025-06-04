'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCardWrapper from './ProjectCardWrapper';

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
        <div className="mb-12 flex gap-4">{/* same filter buttons as before */}</div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCardWrapper key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
