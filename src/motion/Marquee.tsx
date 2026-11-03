import { useEffect, useState, type CSSProperties } from 'react';

export function Marquee({ children }: { children: string }) {
  const [speed, setSpeed] = useState(1);
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let raf = 0;
    const update = () => {
      const now = performance.now();
      const delta = Math.abs(window.scrollY - lastY);
      const elapsed = Math.max(16, now - lastTime);
      const velocity = delta / elapsed;
      setSpeed(Math.min(2.6, 1 + velocity * .85));
      lastY = window.scrollY; lastTime = now;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, []);
  return <div className="velocity-marquee" style={{ '--marquee-speed': speed } as CSSProperties} aria-hidden="true"><div>{Array.from({ length: 4 }, (_, i) => <span key={i}>{children}　✳　</span>)}</div></div>;
}
