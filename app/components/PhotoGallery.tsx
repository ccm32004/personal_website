'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    gradient: 'from-neon-blue via-purple-600 to-neon-pink',
    alt: 'Coding in action',
    emoji: '👩‍💻',
  },
  {
    gradient: 'from-neon-purple via-cyber-primary to-neon-blue',
    alt: 'Speaking at tech conferences',
    emoji: '🎤',
  },
  {
    gradient: 'from-neon-pink via-purple-600 to-neon-blue',
    alt: 'Building projects',
    emoji: '🚀',
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
          <div
            className={`absolute inset-0 bg-gradient-to-br ${images[currentIndex].gradient} flex items-center justify-center`}
          >
            <div className="text-center">
              <span className="mb-4 block text-6xl">{images[currentIndex].emoji}</span>
              <span className="font-cyber text-lg text-white">{images[currentIndex].alt}</span>
            </div>
          </div>
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
