'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  {
    src: '/images/profile1.png',
    alt: 'Coding at my desk',
  },
  {
    src: '/images/profile2.png',
    alt: 'more hiking in nature',
  },
  {
    src: '/images/profile3.png',
    alt: 'Hiking in nature',
  },
];

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="bg-cyber-darker relative aspect-[4/3] w-full overflow-hidden rounded-lg">
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="bg-cyber-primary/50 text-neon-blue hover:bg-cyber-primary/80 absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full p-2 transition-colors"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="bg-cyber-primary/50 text-neon-blue hover:bg-cyber-primary/80 absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full p-2 transition-colors"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          {images[currentIndex].src ? (
            <div className="relative h-full w-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Cyberpunk overlay effects */}
              <div className="absolute inset-0">
                {/* Top glow */}
                <div className="from-neon-purple/10 absolute inset-x-0 top-0 h-16 bg-gradient-to-b to-transparent" />

                {/* Bottom darker gradient */}
                <div className="from-cyber-darker/60 absolute inset-x-0 bottom-0 h-full bg-gradient-to-t via-transparent to-transparent" />

                {/* Side vignettes */}
                <div className="from-cyber-darker/20 absolute inset-y-0 left-0 w-24 bg-gradient-to-r to-transparent" />
                <div className="from-cyber-darker/20 absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent" />
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <span className="font-cyber text-neon-blue text-lg">Image not found</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-neon-blue shadow-neon-blue' : 'bg-cyber-primary'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
