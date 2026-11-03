import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, MessageSquareText } from 'lucide-react';
import { askItems } from '../content/site';
import { ProceduralBackdrop } from '../motion/generators';
import { SectionIntro } from '../components/SectionIntro';
import { FillChip } from '../components/FillChip';

export function Ask() {
  const [selected, setSelected] = useState(0);
  const answer = askItems[selected] ?? askItems[0]!;
  return <div className="page interior-page ask-page"><ProceduralBackdrop seed={155} kind="grid" className="page-backdrop" />
    <section className="section-pad page-topline"><span className="eyebrow">ASK ME / 06</span><span className="mono">NO AI API / PRE-WRITTEN ANSWERS</span></section>
    <section className="section-pad"><SectionIntro kicker="SIX QUESTIONS A HIRING TEAM MAY ASK" title={<>No rehearsed<br /><i>mystique.</i></>} body="Tap a question. The answers are written from the supplied facts. Where the brief is missing proof or detail, the missing piece is called out." number="06" /></section>
    <section className="section-pad ask-interface"><div className="ask-question-list"><div className="eyebrow">PICK A QUESTION</div>{askItems.map((item, index) => <button key={item.question} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)}><span className="mono">0{index + 1}</span><strong>{item.question}</strong><ArrowUpRight size={16} /></button>)}</div><div className="ask-answer" aria-live="polite"><div className="ask-answer__top"><span className="eyebrow"><MessageSquareText size={14} /> RESPONSE / 0{selected + 1}</span><span className="mono">CRX / DIRECT</span></div><AnimatePresence mode="wait"><motion.div key={answer.question} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .28 }}><h2>{answer.question}</h2><p>{answer.answer}</p>{'fill' in answer && answer.fill && <div className="ask-fill"><span className="eyebrow">STILL NEEDS YOUR INPUT</span><FillChip id={answer.fill} /></div>}</motion.div></AnimatePresence><p className="micro-note">These are draft answers, not scripts to memorize. Replace the fill chips with specific evidence before using this site in a hiring conversation.</p></div></section>
  </div>;
}
