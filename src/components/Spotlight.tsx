import type { CSSProperties, PointerEvent, ReactNode } from 'react';

export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };
  return <div className={`spotlight ${className}`} onPointerMove={move} style={{ '--spot-x': '50%', '--spot-y': '50%' } as CSSProperties}>{children}</div>;
}
