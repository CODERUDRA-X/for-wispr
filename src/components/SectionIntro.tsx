import { motion } from 'motion/react';

export function SectionIntro({ kicker, title, body, number }: { kicker: string; title: string; body?: string; number?: string }) {
  return (
    <div className="section-intro">
      <div className="section-intro__meta"><span className="eyebrow">{kicker}</span>{number && <span className="mono muted">/{number}</span>}</div>
      <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>{title}</motion.h1>
      {body && <p>{body}</p>}
    </div>
  );
}
