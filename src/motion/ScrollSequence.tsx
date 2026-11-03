import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollSequence({ children, className = '', pin = false, end = '+=120%' }: { children: ReactNode; className?: string; pin?: boolean; end?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(node, { y: 18, opacity: .7 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: node, start: 'top 78%', end, scrub: .5, pin, pinSpacing: pin } });
    }, node);
    return () => ctx.revert();
  }, [end, pin]);
  return <div ref={ref} className={className}>{children}</div>;
}
