import { fills, type FillKey } from '../content/site';

export function FillChip({ id, compact = false }: { id: FillKey; compact?: boolean }) {
  const item = fills[id];
  return (
    <span className={`fill-chip${compact ? ' fill-chip--compact' : ''}`} title={`${item.prompt} (${item.path})`}>
      <span aria-hidden="true" className="fill-chip__mark">+</span>
      {item.label}
    </span>
  );
}
