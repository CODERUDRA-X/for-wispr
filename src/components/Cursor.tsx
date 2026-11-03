import { useEffect, useState } from 'react';

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [state, setState] = useState('');
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (event: PointerEvent) => setPos({ x: event.clientX, y: event.clientY });
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const match = target?.closest('[data-cursor]');
      setState(match?.getAttribute('data-cursor') || (target?.closest('a,button') ? 'open' : ''));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over); };
  }, []);
  return <div aria-hidden="true" className={`custom-cursor ${state ? `is-${state}` : ''}`} style={{ transform: `translate3d(${pos.x}px,${pos.y}px,0)` }} />;
}
