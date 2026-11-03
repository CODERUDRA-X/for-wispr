import { useEffect, useState, type ReactNode } from 'react';

function random(seed: number) {
  let value = seed >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}

export function layeredWaves(seed: number): ReactNode {
  const rand = random(seed);
  const paths = Array.from({ length: 5 }, (_, index) => {
    const base = 170 + index * 42;
    let d = `M0 ${base}`;
    for (let x = 0; x <= 900; x += 90) d += ` Q${x + 40} ${base + (rand() - .5) * 75} ${x + 90} ${base + (rand() - .5) * 50}`;
    return <path key={index} d={`${d} L900 560 L0 560 Z`} fill="none" stroke="currentColor" strokeOpacity={.16 - index * .018} strokeWidth="1.2" />;
  });
  return <svg viewBox="0 0 900 560" preserveAspectRatio="none" aria-hidden="true">{paths}</svg>;
}

export function blobScene(seed: number): ReactNode {
  const rand = random(seed);
  return <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => {
    const x = 70 + rand() * 760; const y = 55 + rand() * 450; const rx = 30 + rand() * 110; const ry = 24 + rand() * 75;
    return <ellipse key={index} cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${Math.round(rand() * 50 - 25)} ${x} ${y})`} fill="none" stroke="currentColor" strokeOpacity={.1 + rand() * .11} strokeWidth="1" />;
  })}</svg>;
}

export function lowPolyGrid(seed: number): ReactNode {
  const rand = random(seed);
  const points: Array<[number, number]> = [];
  for (let row = 0; row < 7; row += 1) for (let col = 0; col < 13; col += 1) points.push([col * 75 + (rand() - .5) * 20, row * 92 + (rand() - .5) * 20]);
  const lines = points.map((point, index) => {
    const right = index % 13 < 12 ? points[index + 1] : undefined;
    const down = points[index + 13];
    const diagonal = index % 13 < 12 ? points[index + 14] : undefined;
    return <g key={index}>{right && <line x1={point[0]} y1={point[1]} x2={right[0]} y2={right[1]} />}{down && <line x1={point[0]} y1={point[1]} x2={down[0]} y2={down[1]} />}{diagonal && <line x1={point[0]} y1={point[1]} x2={diagonal[0]} y2={diagonal[1]} />}</g>;
  });
  return <svg viewBox="0 0 900 560" preserveAspectRatio="none" aria-hidden="true" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="1">{lines}</svg>;
}

export function peaks(seed: number): ReactNode {
  const rand = random(seed);
  const points = Array.from({ length: 17 }, (_, index) => `${index * 57},${280 - rand() * 210}`).join(' ');
  return <svg viewBox="0 0 900 560" preserveAspectRatio="none" aria-hidden="true"><polyline points={`0,340 ${points} 900,340`} fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="1.2"/><polyline points={`0,420 ${Array.from({ length: 17 }, (_, index) => `${index * 57},${390 - rand() * 110}`).join(' ')} 900,420`} fill="none" stroke="currentColor" strokeOpacity=".09" strokeWidth="1"/></svg>;
}

export type BackdropKind = 'waves' | 'blobs' | 'grid' | 'peaks';
export function ProceduralBackdrop({ seed, kind = 'waves', className = '' }: { seed: number; kind?: BackdropKind; className?: string }) {
  const [activeSeed, setActiveSeed] = useState(seed);
  useEffect(() => { const reroll = () => setActiveSeed(current => current + 997); window.addEventListener('crx-reroll', reroll); return () => window.removeEventListener('crx-reroll', reroll); }, []);
  const scene = kind === 'blobs' ? blobScene(activeSeed) : kind === 'grid' ? lowPolyGrid(activeSeed) : kind === 'peaks' ? peaks(activeSeed) : layeredWaves(activeSeed);
  return <div className={`procedural-backdrop procedural-backdrop--${kind} ${className}`}>{scene}</div>;
}
