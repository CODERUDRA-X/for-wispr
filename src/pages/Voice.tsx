import { useState, type CSSProperties } from 'react';
import { ProceduralBackdrop } from '../motion/generators';
import { SectionIntro } from '../components/SectionIntro';
import { FillChip } from '../components/FillChip';

export function Voice() {
  const [mix, setMix] = useState(50);
  return <div className="page interior-page voice-page"><ProceduralBackdrop seed={132} kind="waves" className="page-backdrop" />
    <section className="section-pad page-topline"><span className="eyebrow">VOICE RECEIPTS / 05</span><span className="mono">RAW → EDITED</span></section>
    <section className="section-pad"><SectionIntro kicker="THE VOICE RECEIPTS" title={<>A voice note is<br /><i>not a final draft.</i></>} body="Speech gets the thought out quickly. Editing makes it useful to someone else. This page is reserved for a real raw excerpt and its cleaned version; neither was provided, so I will not manufacture a fake receipt." number="02" /></section>
    <section className="section-pad receipt-section"><div className="receipt-topline"><span className="eyebrow">SCRUB BETWEEN ORIGINAL AND EDIT</span><span className="mono">0% RAW / 100% CLEAN</span></div><div className="receipt-compare" style={{ '--mix': `${mix}%` } as CSSProperties}>
      <article className="receipt-pane receipt-pane--raw" style={{ opacity: 1 - mix / 140 }}><span className="receipt-label">01 / RAW SPOKEN RAMBLE</span><h3>What was actually said.</h3><div className="receipt-fill"><FillChip id="voice-raw" /></div><p className="micro-note">No real transcript supplied. This panel intentionally stays blank rather than inventing a quote.</p></article>
      <article className="receipt-pane receipt-pane--clean" style={{ opacity: .2 + mix / 125 }}><span className="receipt-label">02 / CLEANED VERSION</span><h3>What someone else can use.</h3><div className="receipt-fill"><FillChip id="voice-clean" /></div><p className="micro-note">The edit must preserve the speaker’s meaning, not rewrite their personality.</p></article>
    </div><div className="receipt-slider"><label htmlFor="receipt-mix">RAW <input data-cursor="drag" id="receipt-mix" type="range" min="0" max="100" value={mix} onChange={e => setMix(Number(e.target.value))} /> CLEAN</label><strong>{mix}%</strong></div></section>
    <section className="section-pad voice-honesty"><div><span className="eyebrow">ONE THING VOICE CAN GET WRONG</span><h2>Recognition is not<br /><i>understanding.</i></h2></div><p>Speech input can mishear accents, names, technical terms, or mixed-language phrases. A fast transcript still needs human review. The browser demo on Home shows the mechanics; it does not prove that every voice interaction is frictionless.</p></section>
  </div>;
}
