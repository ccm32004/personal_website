'use client';
import { useState } from 'react';
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
  const [topIndex, setTopIndex] = useState(0);
  const behindIndex = (topIndex + 1) % images.length;

  return (
    <div className="relative mx-auto w-full max-w-sm pt-4 pb-4">
      <div className="border-neon-purple/40 bg-cyber-darker absolute top-7 left-10 right-[-18px] aspect-[4/3] rotate-[7deg] overflow-hidden border opacity-55">
        <Image
          src={images[behindIndex].src}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </div>

      <button
        type="button"
        className="group relative z-10 block w-full cursor-pointer"
        onClick={() => setTopIndex((current) => (current + 1) % images.length)}
        aria-label="Show the next photo"
      >
        <div className="relative aspect-[4/3] overflow-hidden border border-transparent transition-all duration-200 group-hover:-translate-y-2">
          <div
            aria-hidden="true"
            className="absolute -inset-px opacity-90"
            style={{
              background:
                'linear-gradient(120deg, #9D4EDD, #00FFF5, #FF2E63, #9D4EDD)',
              backgroundSize: '220% 220%',
            }}
          />
          <div className="bg-cyber-darker absolute inset-[2px] overflow-hidden">
            <Image
              src={images[topIndex].src}
              alt={images[topIndex].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            <div className="from-neon-purple/20 pointer-events-none absolute inset-0 bg-gradient-to-tr via-transparent to-neon-blue/10" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 245, 0.45) 3px)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60"
              style={{ animation: 'holo-sheen 4.5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </button>

      <p className="font-doodle text-neon-purple mt-5 -rotate-[6deg] text-lg lg:hidden">
        click to flip thru the stack
      </p>
    </div>
  );
}
