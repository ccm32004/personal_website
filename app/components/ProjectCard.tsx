'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const CyberpunkIcon = ({ tech }: { tech: string[] }) => {
  // Determine primary color based on technology
  const primaryColor = tech.includes('Python') ? '#4B8BBE' : 
                      tech.includes('React') ? '#61DAFB' : 
                      tech.includes('Next.js') ? '#000000' : 
                      '#9D4EDD';

  return (
    <div className="relative h-full w-full">
      {/* Animated hexagon background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-20">
          <motion.path
            d="M60 10L100 30V90L60 110L20 90V30L60 10Z"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          {/* Tech-specific icon */}
          {tech.includes('Python') ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill={primaryColor}>
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z"/>
            </svg>
          ) : tech.includes('React') ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill={primaryColor}>
              <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.469zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.578l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.139s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.26c.48 1.039.877 2.06 1.182 3.046 2.674-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046z"/>
            </svg>
          ) : tech.includes('Next.js') ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill={primaryColor}>
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.92 14.48h-6.86v-.07L15.07 6h2.09l-6.54 14.48h-.07l-3.7-8.05h2.16l2.91 6.05z"/>
            </svg>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill={primaryColor}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          )}
        </motion.div>
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute h-24 w-24 rounded-full border border-neon-purple/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute h-32 w-32 rounded-full border border-neon-blue/20"
          animate={{
            scale: [1.1, 1.3, 1.1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Glitch effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-neon-blue/5"
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          repeatDelay: 5,
        }}
      />
    </div>
  );
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="group bg-cyber-darker relative h-[480px] w-full overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Header Section - Either Image or Decorative */}
      <div className="relative h-56">
        {project.image ? (
          // Image with overlay
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Multi-layer overlay for enhanced ombre effect */}
            <div className="absolute inset-0">
              {/* Top glow */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neon-purple/10 to-transparent" />
              
              {/* Bottom darker gradient - reduced opacity */}
              <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-cyber-darker/60 via-transparent to-transparent" />
              
              {/* Subtle side vignette - reduced opacity */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cyber-darker/20 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cyber-darker/20 to-transparent" />
              
              {/* Additional cyberpunk effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-neon-purple/0 via-neon-blue/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                initial={false}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              />
            </div>
          </>
        ) : (
          // Decorative Header with new CyberpunkIcon
          <>
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />
            
            {/* New Cyberpunk Icon */}
            <CyberpunkIcon tech={project.technologies} />

            {/* Overlay gradient */}
            <div className="from-cyber-darker absolute inset-0 bg-gradient-to-t to-transparent opacity-30" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex h-[calc(100%-14rem)] flex-col justify-between p-6">
        <div className="space-y-4">
          {/* Title */}
          <motion.h3
            className="font-cyber text-neon-blue text-xl"
            whileHover={{ x: 5, textShadow: '0 0 8px #00FFF5' }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-300 line-clamp-4">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="bg-cyber-primary/30 text-neon-purple border-neon-purple/50 rounded-full border px-2 py-1 text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neon-blue/10 text-neon-blue border-neon-blue hover:bg-neon-blue/20 flex-1 rounded border px-4 py-2 text-center transition-colors"
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
            className="bg-neon-purple/10 text-neon-purple border-neon-purple hover:bg-neon-purple/20 flex-1 rounded border px-4 py-2 text-center transition-colors"
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
