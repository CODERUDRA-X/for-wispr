import { motion, useReducedMotion } from 'motion/react';

export function SplitText({ text, className = '', as = 'span' }: { text: string; className?: string; as?: 'span' | 'div' }) {
  const reduce = useReducedMotion();
  const Tag = as === 'div' ? motion.div : motion.span;
  return <Tag className={`split-text ${className}`} aria-label={text} initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : .035 } } }}>
    {text.split(' ').map((word, index) => <motion.span key={`${word}-${index}`} aria-hidden="true" className="split-text__word" variants={{ hidden: { y: reduce ? 0 : '105%', opacity: reduce ? 1 : 0 }, visible: { y: 0, opacity: 1, transition: { duration: reduce ? 0 : .55, ease: [.22, 1, .36, 1] } } }}>{word}{index < text.split(' ').length - 1 ? '\u00a0' : ''}</motion.span>)}
  </Tag>;
}
