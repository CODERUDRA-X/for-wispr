import { ArrowUpRight, Github, Linkedin, Globe, Code2, ExternalLink } from 'lucide-react';
import { identity, links } from '../content/site';
import { ProceduralBackdrop } from '../motion/generators';
import { SectionIntro } from '../components/SectionIntro';
import { FillChip } from '../components/FillChip';

export function Contact() {
  const socials = [
    { label: 'LinkedIn', url: links.linkedin, icon: Linkedin, note: 'Professional updates and work' },
    { label: 'GitHub', url: links.github, icon: Github, note: 'Code and repositories' },
    { label: 'X', url: links.x, icon: Globe, note: 'Short-form thoughts and builds' },
    { label: 'Hashnode', url: links.hashnode, icon: Code2, note: 'Technical writing' },
    { label: 'Kaggle', url: links.kaggle, icon: ExternalLink, note: 'Data and ML work' },
  ];
  return <div className="page interior-page contact-page"><ProceduralBackdrop seed={187} kind="peaks" className="page-backdrop" />
    <section className="section-pad page-topline"><span className="eyebrow">CONTACT / 07</span><span className="mono">LAST FRAME / NEXT CONVERSATION</span></section>
    <section className="section-pad"><SectionIntro kicker="LOGISTICS, NOT THEATRE" title={<>Let's talk.<br /><i>Let's be specific.</i></>} body="I am a B.Tech student at United Institute of Technology, Prayagraj, looking for an internship track where building and growth meet." number="CRX" /></section>
    <section className="section-pad logistics-grid"><div className="logistics-primary"><span className="eyebrow">CURRENT BASE</span><h2>Prayagraj,<br /><i>India.</i></h2><p>{identity.degree}<br />{identity.institute}<br />Affiliated to {identity.affiliation}</p><div className="logistics-tags"><span>INTERNSHIP TRACK</span><span>AI / SOFTWARE / GROWTH</span></div></div><div className="logistics-details"><div className="logistics-row"><span className="eyebrow">AVAILABILITY</span><FillChip id="availability" /></div><div className="logistics-row"><span className="eyebrow">BANGALORE PLAN</span><FillChip id="bangalore-plan" /></div><div className="logistics-row"><span className="eyebrow">EMAIL / DIRECT CONTACT</span><p className="muted">A verified email address has not been supplied. Use LinkedIn to start the conversation.</p></div></div></section>
    <section className="section-pad contact-links"><div className="contact-links__head"><span className="eyebrow">ELSEWHERE ON THE INTERNET</span><span className="mono">REAL LINKS / NO PLACEHOLDERS</span></div>{socials.map(({ label, url, icon: Icon, note }, index) => <a href={url} target="_blank" rel="noreferrer" key={label}><span className="contact-link-index mono">0{index + 1}</span><Icon size={20} /><strong>{label}</strong><small>{note}</small><ArrowUpRight className="contact-arrow" size={18} /></a>)}<a href={links.community} target="_blank" rel="noreferrer"><span className="contact-link-index mono">06</span><Globe size={20} /><strong>Gemini Builders Community</strong><small>Community home</small><ArrowUpRight className="contact-arrow" size={18} /></a></section>
    <section className="section-pad contact-closer"><div className="eyebrow">CODERUDRA-X / BUILD. BREAK. REBUILD.</div><h2>Good work starts<br />with a <i>conversation.</i></h2><a href={links.linkedin} target="_blank" rel="noreferrer" className="button button--primary">Message on LinkedIn <ArrowUpRight size={16} /></a></section>
  </div>;
}
