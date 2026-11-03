import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type SectionIntroProps = {
  kicker: string;
  title: ReactNode;
  body?: string;
  number?: string;
};

export function SectionIntro({ kicker, title, body, number }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <div className="section-intro__meta">
        <span className="eyebrow">{kicker}</span>
        {number && <span className="mono muted">/{number}</span>}
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h1>
      {body && <p>{body}</p>}
    </div>
  );
}
