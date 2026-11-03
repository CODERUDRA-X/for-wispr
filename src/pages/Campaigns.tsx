import { useState, type PointerEvent } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { campaigns } from '../content/site';
import { ProceduralBackdrop } from '../motion/generators';
import { SectionIntro } from '../components/SectionIntro';
import { Spotlight } from '../components/Spotlight';

export function Campaigns() {
  const [flipped, setFlipped] = useState<string[]>([]);
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const rx = ((event.clientY - rect.top) / rect.height - .5) * -5;
    const ry = ((event.clientX - rect.left) / rect.width - .5) * 6;
    event.currentTarget.style.setProperty('--tilt-x', `${rx}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${ry}deg`);
  };
  const resetTilt = (event: PointerEvent<HTMLElement>) => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg'); };
  const toggle = (id: string) => setFlipped(list => list.includes(id) ? list.filter(v => v !== id) : [...list, id]);
  return <div className="page interior-page campaigns-page"><ProceduralBackdrop seed={106} kind="blobs" className="page-backdrop" />
    <section className="section-pad page-topline"><span className="eyebrow">GROWTH PROPOSALS / 04</span><span className="mono">PLANS ≠ RESULTS</span></section>
    <section className="section-pad"><SectionIntro kicker="THE WISPR FLOW PITCH" title={<>Make voice feel<br /><i>like a habit.</i></>} body="Three campaign concepts built from campus operations, creator distribution, and a challenge people can actually complete. Every metric below is a proposed measure—not a result." number="03" /></section>
    <section className="section-pad campaign-cards">{campaigns.map((campaign, index) => {
      const isFlipped = flipped.includes(campaign.id);
      return <Spotlight key={campaign.id} className={`campaign-card-wrap campaign-card-wrap--${index + 1}`}><article className={`campaign-card${isFlipped ? ' is-flipped' : ''}`} onPointerMove={tilt} onPointerLeave={resetTilt}>
        <div className="campaign-card__front"><div className="campaign-card__top"><span className="mono">{campaign.tag}</span><span className="mono">TARGET / PROPOSAL</span></div><div className="campaign-card__front-body"><span className="campaign-card__ordinal">0{index + 1}</span><h2>{campaign.title}</h2><p>{campaign.subtitle}</p></div><button className="campaign-flip" onClick={() => toggle(campaign.id)} aria-expanded={isFlipped}>FLIP FOR THE PLAN <ArrowUpRight size={15} /></button></div>
        <div className="campaign-card__back"><div className="campaign-card__top"><span className="mono">{campaign.tag}</span><button className="icon-button" onClick={() => toggle(campaign.id)} aria-label="Return to card front"><RotateCcw size={16} /></button></div><div className="campaign-details"><div><span className="eyebrow">GOAL</span><p>{campaign.goal}</p></div><div><span className="eyebrow">CHANNEL</span><p>{campaign.channel}</p></div><div><span className="eyebrow">METRIC / PROPOSED</span><p>{campaign.metric}</p></div><div><span className="eyebrow">FIRST 7 DAYS</span><ol>{campaign.week.map((step, i) => <li key={step}><span className="mono">0{i + 1}</span>{step}</li>)}</ol></div></div></div>
      </article></Spotlight>;
    })}</section>
    <section className="section-pad campaign-principle"><span className="eyebrow">THE OPERATING PRINCIPLE</span><h2>Don't scale a<br /><i>guess.</i></h2><p>Start with one campus loop, measure installs and week-four activity, and only expand the channels that produce retained use. Reach alone is not the outcome.</p></section>
  </div>;
}
