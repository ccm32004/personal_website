'use client';
import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
};

export default function FloatingParticles({
  light,
}: {
  light: { x: number; y: number } | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef(light);
  lightRef.current = light;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const particles: Particle[] = [];

    const spawn = () => {
      particles.length = 0;
      for (let i = 0; i < 90; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.12 - Math.random() * 0.22,
          size: Math.random() * 1.4 + 0.7,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) spawn();
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const cursor = lightRef.current;

      ctx.fillStyle = 'rgba(0, 255, 245, 0.88)';
      ctx.shadowColor = 'rgba(0, 255, 245, 0.7)';
      ctx.shadowBlur = 8;

      for (const particle of particles) {
        if (cursor) {
          const dx = cursor.x - particle.x;
          const dy = cursor.y - particle.y;
          const dist = Math.hypot(dx, dy) || 1;
          const radius = 320;

          if (dist < radius) {
            const pull = (1 - dist / radius) * 1.35;
            particle.vx += (dx / dist) * pull;
            particle.vy += (dy / dist) * pull;
            particle.vx += (-dy / dist) * pull * 0.22;
            particle.vy += (dx / dist) * pull * 0.22;
          }

          if (dist < 32) {
            particle.vx -= (dx / dist) * 0.8;
            particle.vy -= (dy / dist) * 0.8;
          }
        } else {
          particle.vx += (particle.homeX - particle.x) * 0.003;
          particle.vy += (particle.homeY - particle.y) * 0.003 - 0.012;
        }

        particle.vx *= 0.86;
        particle.vy *= 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (!cursor) {
          if (particle.y < -4) particle.y = height + 4;
          if (particle.y > height + 4) particle.y = -4;
          if (particle.x < -4) particle.x = width + 4;
          if (particle.x > width + 4) particle.x = -4;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const header = canvas.closest('header');
    const onMove = (event: PointerEvent) => {
      const bounds = header?.getBoundingClientRect();
      if (!bounds) return;
      lightRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
    };
    const onLeave = () => {
      lightRef.current = null;
    };
    header?.addEventListener('pointermove', onMove);
    header?.addEventListener('pointerleave', onLeave);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      header?.removeEventListener('pointermove', onMove);
      header?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}
