import type { CSSProperties } from 'react';

export function Waveform({ active = false, pulse = 0 }: { active?: boolean; pulse?: number }) {
  return <div className={`live-waveform${active ? ' is-active' : ''}`} aria-hidden="true" style={{ '--wave-pulse': pulse % 7 } as CSSProperties}>
    {Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--bar': (index * 7 + pulse * 3) % 13 } as CSSProperties} />)}
  </div>;
}
