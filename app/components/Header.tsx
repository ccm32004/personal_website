'use client';
import { motion } from 'framer-motion';
import { useState, useEffect} from 'react';
import FloatingParticles from './Particles';

export default function Header() {
  const [firstLine, setFirstLine] = useState('');
  const [secondLine, setSecondLine] = useState('');
  const fullFirstLine = "Hi, I'm Cece!";
  const fullSecondLine = "Software Developer";
  const [isFirstLineDone, setIsFirstLineDone] = useState(false);
  const [isSecondLineDone, setIsSecondLineDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let isTypingFirstLine = true;

    const typeInterval = setInterval(() => {
      if (isTypingFirstLine) {
        if (currentIndex < fullFirstLine.length) {
          setFirstLine(fullFirstLine.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          isTypingFirstLine = false;
          currentIndex = 0;
          setIsFirstLineDone(true);

          // Start second line after a pause
          setTimeout(() => {
            const secondLineInterval = setInterval(() => {
              if (currentIndex < fullSecondLine.length) {
                setSecondLine(fullSecondLine.slice(0, currentIndex + 1));
                currentIndex++;
              } else {
                setIsSecondLineDone(true);
                clearInterval(secondLineInterval);
              }
            }, 100);
          }, 500);

          clearInterval(typeInterval);
        }
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  // Cursor blink animation
  useEffect(() => {
    if (isSecondLineDone) return; // stop blinking after everything is done

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [isSecondLineDone]);

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cyber-black">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full border-r border-neon-blue/30" />
            ))}
          </div>
          <div className="absolute inset-0 grid grid-rows-12 gap-4 opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full border-b border-neon-blue/30" />
            ))}
          </div>
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-neon-purple/5 to-transparent"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          
          {/* Floating particles */}
          <FloatingParticles />
          

          </div>
        </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-cyber mb-4 text-neon-blue relative flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative text-glow-blue">
            <span>{firstLine}</span>
            {!isFirstLineDone && showCursor && <span className="ml-1">|</span>}
          </div>
          {isFirstLineDone && (
            <div className="relative mt-4 text-neon-purple text-glow-purple text-2xl md:text-3xl">
              <span>{secondLine}</span>
              {!isSecondLineDone && showCursor && <span className="ml-1">|</span>}
            </div>
          )}
        </motion.h1>
        <motion.div 
          className="w-24 h-1 bg-neon-blue shadow-neon-blue mt-8"
          animate={{
            boxShadow: ['0 0 10px #00FFF5', '0 0 20px #00FFF5', '0 0 10px #00FFF5'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="text-neon-blue text-glow-blue text-sm text-center">Scroll Down</div>
        <motion.div
          className="w-6 h-6 border-b-2 border-r-2 border-neon-blue transform rotate-45 mt-2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </header>
  );
}
