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
        <motion.h2
          variants={itemVariants}
          className="font-cyber text-neon-purple text-glow-purple mb-12 text-3xl md:text-4xl"
        >
          About Me
        </motion.h2>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <motion.div className="space-y-6 text-lg" variants={itemVariants}>
            <motion.p className="text-gray-300" variants={itemVariants}>
              Hey there! I'm a software developer passionate about building beautiful, functional,
              and user-friendly applications. With a strong foundation in modern web technologies, I
              love creating solutions that make a difference.
            </motion.p>
            <motion.p className="text-gray-300" variants={itemVariants}>
              When I'm not coding, you can find me exploring new technologies, contributing to
              open-source projects, or sharing my knowledge with the developer community.
            </motion.p>
            <motion.div className="flex gap-4 pt-6" variants={itemVariants}>
              <motion.button
                className="bg-cyber-primary border-neon-blue text-neon-blue hover:shadow-neon-blue rounded border px-6 py-3 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.button>
              <motion.button
                className="bg-cyber-primary border-neon-purple text-neon-purple hover:shadow-neon-purple rounded border px-6 py-3 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PhotoGallery />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
