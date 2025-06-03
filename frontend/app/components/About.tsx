'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PhotoGallery from './PhotoGallery';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={sectionRef} className="px-6 py-24 md:px-12">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="bg-cyber-darker/60 border-neon-purple/40 shadow-neon-purple/10 relative grid gap-12 rounded-lg border p-10 backdrop-blur-sm lg:grid-cols-[1.2fr_1fr]">
          {/* Floating HUD corner line */}
          <div className="border-neon-purple/60 absolute -top-2 -left-2 h-10 w-10 border-t-2 border-l-2"></div>
          <div className="border-neon-purple/60 absolute -right-2 -bottom-2 h-10 w-10 border-r-2 border-b-2"></div>

          {/* Text Panel */}
          <div className="space-y-8">
            <motion.h2
              variants={itemVariants}
              className="font-cyber text-neon-purple text-glow-purple text-3xl md:text-4xl"
            >
              About Me
            </motion.h2>

            <motion.div
              className="space-y-5 text-base leading-relaxed text-gray-300 md:text-lg"
              variants={itemVariants}
            >
              <motion.p variants={itemVariants}>
              Hey! I'm Cece — a full-stack software dev who loves building cool stuff that actually works! 
              </motion.p>
              <motion.p variants={itemVariants}>
              When I'm not squashing bugs or shipping features, I'm usually out hiking forest trails, finding ways to mash my hobbies with tech, or doing a little retail therapy (read: shopping as debugging for the soul).
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div className="flex gap-4 pt-4" variants={itemVariants}>
              <motion.a
                href="https://drive.google.com/file/d/1omt57mkqwoD0qgg7NLhsFuKZk-sTQJb-/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyber-primary border-neon-blue text-neon-blue hover:shadow-neon-blue group flex items-center gap-2 rounded border px-6 py-3 font-mono uppercase transition-all hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.a>
              <motion.button
                className="bg-cyber-primary border-neon-purple text-neon-purple hover:shadow-neon-purple rounded border px-6 py-3 font-mono uppercase transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </motion.div>
          </div>

          {/* Holographic Photo Panel */}
          <motion.div
            variants={itemVariants}
            className="border-neon-blue/30 to-cyber-dark/60 shadow-neon-blue/10 relative rounded-xl border bg-gradient-to-br from-black/30 p-2 shadow-inner backdrop-blur-sm"
          >
            <div className="border-neon-purple/20 pointer-events-none absolute top-0 left-0 h-full w-full rounded-xl border"></div>
            <PhotoGallery />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
