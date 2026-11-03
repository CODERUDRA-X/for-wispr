import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chapters, links, type FillKey } from '../content/site';
import { ProceduralBackdrop } from '../motion/generators';
import { SectionIntro } from '../components/SectionIntro';
import { FillChip } from '../components/FillChip';

gsap.registerPlugin(ScrollTrigger);

const chapterFills: Record<string, { wrong?: FillKey; learned?: FillKey; next?: FillKey }> = {
  origin: { wrong: 'origin-flop' },
  builder: { wrong: 'builder-flop', learned: 'builder-learned', next: 'builder-next' },
  community: { learned: 'ideathon-learning', next: 'community-change' },
  scale: { wrong: 'scale-flop', learned: 'scale-learned', next: 'scale-next' },
  now: { learned: 'now-learned', next: 'now-next' },
};

export function Thread() {
  const wrap = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState('origin');
  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const progress = el.querySelector('.thread-progress__fill');
    const ctx = gsap.context(() => {
      gsap.to(progress, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 25%', end: 'bottom 75%', scrub: .5 } });
      gsap.utils.toArray<HTMLElement>('.chapter-card').forEach((card) => gsap.fromTo(card, { opacity: .48, x: 22 }, { opacity: 1, x: 0, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none reverse' } }));
    }, el);
    return () => ctx.revert();
  }, []);
  return <div className="page interior-page thread-page"><ProceduralBackdrop seed={21} kind="waves" className="page-backdrop" />
    <div className="section-pad page-topline"><span className="eyebrow">THE LONG VERSION / 01</span><span className="mono">A TIMELINE OF REVISIONS</span></div>
    <section className="section-pad"><SectionIntro kicker="THE THREAD / FIVE CHAPTERS" title={<>I did the thing.<br /><i>Then I learned.</i></>} body="A useful career story is not a sequence of perfect outcomes. It is a sequence of decisions, evidence, and course corrections." number="05" /></section>
    <div className="thread-layout section-pad" ref={wrap}>
      <aside className="thread-rail"><div className="thread-rail__sticky"><span className="eyebrow">THE BUILD LOG</span><div className="thread-progress"><i className="thread-progress__fill" /></div><div className="thread-rail__list">{chapters.map((chapter) => <button key={chapter.id} className={expanded === chapter.id ? 'active' : ''} onClick={() => { setExpanded(chapter.id); document.getElementById(`chapter-${chapter.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}><span className="mono">{chapter.number}</span>{chapter.title}</button>)}</div><p className="mono muted">SCROLL / OPEN A CHAPTER</p></div></aside>
      <div className="thread-chapters">{chapters.map((chapter) => {
        const fills = chapterFills[chapter.id] || {};
        const isOpen = expanded === chapter.id;
        return <article className={`chapter-card${isOpen ? ' is-expanded' : ''}`} id={`chapter-${chapter.id}`} key={chapter.id}>
          <button className="chapter-card__toggle" onClick={() => setExpanded(isOpen ? '' : chapter.id)} aria-expanded={isOpen}>
            <span className="chapter-num">{chapter.number}</span><span className="chapter-heading"><small className="eyebrow">{chapter.eyebrow}</small><strong>{chapter.title}</strong></span><ChevronDown className="chapter-chevron" size={19} />
          </button>
          <div className="chapter-card__body" hidden={!isOpen}>
            <div className="chapter-column"><span className="eyebrow">WHAT I DID</span><ul>{chapter.did.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div className="chapter-column"><span className="eyebrow">WHAT WENT WRONG</span>{chapter.wrong ? <p>{chapter.wrong}</p> : fills.wrong ? <FillChip id={fills.wrong} /> : <p className="muted">No specific failure supplied for this chapter.</p>}</div>
            <div className="chapter-column"><span className="eyebrow">WHAT I LEARNED</span>{chapter.learned ? <p>{chapter.learned}</p> : fills.learned ? <FillChip id={fills.learned} /> : <p className="muted">Not written yet.</p>}</div>
            <div className="chapter-column"><span className="eyebrow">WHAT I DID NEXT</span>{chapter.next ? <p>{chapter.next}</p> : fills.next ? <FillChip id={fills.next} /> : <p className="muted">Not written yet.</p>}</div>
            {chapter.id === 'community' && <div className="chapter-extra"><p>How the Vibe Coding Hack reached 600+ attendees:</p><FillChip id="vibe-how" /><p>Next community target:</p><FillChip id="community-target" /></div>}
            {chapter.id === 'scale' && <div className="chapter-extra"><p>Operations / logistics title and ownership:</p><FillChip id="scale-role" /></div>}
          </div>
        </article>;
      })}</div>
    </div>
    <section className="section-pad thread-end"><p className="eyebrow">THE NEXT CHAPTER IS NOT WRITTEN YET</p><h2>Let's make the<br /><i>next loop sharper.</i></h2><Link to="/campaigns" className="button button--line">See what I'd test at Wispr Flow <ArrowUpRight size={16} /></Link></section>
    <section className="section-pad thread-footnote"><span>REFERENCE / PROJECT EVIDENCE</span><a href={links.ecspl} target="_blank" rel="noreferrer">VidyutNetra reference <ArrowUpRight size={13} /></a><a href={links.github} target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={13} /></a></section>
  </div>;
}
