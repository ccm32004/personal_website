'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

function usePageSize() {
  const [size, setSize] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) {
        setSize(1);
      } else if (window.innerWidth < 1024) {
        setSize(2);
      } else {
        setSize(3);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}

export default function Projects() {
  const pageSize = usePageSize();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const visible = projects.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const goTo = (next: number) => {
    const wrapped = (next + pageCount) % pageCount;
    setDirection(next > page ? 1 : -1);
    setPage(wrapped);
  };

  return (
    <section className="relative overflow-hidden bg-cyber-black px-6 py-24 md:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(157, 78, 221, 0.14), transparent 70%), radial-gradient(ellipse 40% 35% at 80% 60%, rgba(0, 255, 245, 0.08), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 245, 0.5) 3px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-mono mb-3 text-center text-[11px] tracking-[0.28em] text-neon-blue/70 uppercase">
          BUILD // PROJECTS
        </p>
        <motion.h2
          className="font-cyber text-neon-purple text-glow-purple mb-10 text-center text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={() => goTo(safePage - 1)}
            aria-label="Previous projects"
            className="font-mono text-neon-blue hover:text-neon-purple shrink-0 px-1 text-3xl leading-none transition-colors"
          >
            ‹
          </button>

          <div className="relative min-h-[520px] flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${safePage}-${pageSize}`}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => goTo(safePage + 1)}
            aria-label="Next projects"
            className="font-mono text-neon-blue hover:text-neon-purple shrink-0 px-1 text-3xl leading-none transition-colors"
          >
            ›
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show projects page ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === safePage
                  ? 'bg-neon-blue shadow-neon-blue w-6'
                  : 'bg-neon-purple/40 hover:bg-neon-purple w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
