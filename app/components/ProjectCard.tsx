'use client';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group bg-cyber-darker relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div
          className={`from-neon-blue via-neon-purple to-neon-pink flex h-full w-full items-center justify-center bg-gradient-to-br text-6xl`}
        >
          {/* Placeholder until real images are added */}
          🚀
        </div>

        {/* Overlay */}
        <div className="from-cyber-darker absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        {/* Title */}
        <motion.h3
          className="font-cyber text-neon-blue text-xl"
          whileHover={{ x: 5, textShadow: '0 0 8px #00FFF5' }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className="line-clamp-3 text-gray-300">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              className="bg-cyber-primary text-neon-purple border-neon-purple rounded-full border px-2 py-1 text-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neon-blue/10 text-neon-blue border-neon-blue hover:bg-neon-blue/20 rounded border px-4 py-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
          )}
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neon-purple/10 text-neon-purple border-neon-purple hover:bg-neon-purple/20 rounded border px-4 py-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
        </div>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <motion.div
          className="bg-neon-blue/20 text-neon-blue border-neon-blue absolute top-4 right-4 rounded-full border px-3 py-1 text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          Featured
        </motion.div>
      )}
    </motion.div>
  );
}
