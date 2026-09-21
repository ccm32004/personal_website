'use client';

export default function CursorLight({
  light,
}: {
  light: { x: number; y: number } | null;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
      style={{
        opacity: light ? 1 : 0,
        background: light
          ? `radial-gradient(circle 270px at ${light.x}px ${light.y}px, rgba(157, 78, 221, 0.3), rgba(0, 255, 245, 0.1) 42%, transparent 68%)`
          : 'transparent',
      }}
    />
  );
}
