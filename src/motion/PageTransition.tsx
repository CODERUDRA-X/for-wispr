import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div className="page-transition" initial={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 10% 0)', opacity: .5 }} animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }} exit={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 100% 0)', opacity: .6 }} transition={{ duration: reduce ? 0 : .42, ease: [.76, 0, .24, 1] }}>{children}</motion.div>;
}
