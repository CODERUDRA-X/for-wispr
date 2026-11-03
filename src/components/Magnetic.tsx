import { useRef, type ReactNode, type PointerEvent } from 'react';

export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * .12;
    const y = (event.clientY - rect.top - rect.height / 2) * .12;
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)'; };
  return <span ref={ref} className={`magnetic ${className}`} onPointerMove={onMove} onPointerLeave={reset}>{children}</span>;
}
