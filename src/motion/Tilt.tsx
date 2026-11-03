import { useRef, type PointerEvent, type ReactNode } from 'react';

export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientY - rect.top) / rect.height - .5;
    const y = (event.clientX - rect.left) / rect.width - .5;
    event.currentTarget.style.transform = `perspective(900px) rotateX(${x * -5}deg) rotateY(${y * 6}deg)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'; };
  return <div ref={ref} className={`tilt-surface ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}
