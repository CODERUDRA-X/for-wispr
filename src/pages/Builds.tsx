import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ExternalLink } from 'lucide-react';
import { builds, arsenal, links } from '../content/site';
import { ProceduralBackdrop } from '../motion/generators';
import { SectionIntro } from '../components/SectionIntro';
import { Spotlight } from '../components/Spotlight';
import { FillChip } from '../components/FillChip';
import { AegisVisual, VidyutVisual, VanshikaVisual } from '../components/BuildVisuals';

export function Builds() {
  const [arsenalOpen, setArsenalOpen] = useState(false);
  return <div className="page interior-page builds-page"><ProceduralBackdrop seed={48} kind="grid" className="page-backdrop" />
    <section className="section-pad page-topline"><span className="eyebrow">SELECTED WORK / 02</span><span className="mono">3 BUILDS / 3 DIFFERENT PROBLEMS</span></section>
    <section className="section-pad"><SectionIntro kicker="THE BUILDS" title={<>Make it work.<br /><i>Then make it hold.</i></>} body="Three projects. Three different kinds of uncertainty. Each visual below is an explainer for the underlying idea—not a fake live demo of a production model." number="03" /></section>
    <section className="build-block build-block--aegis section-pad" id="aegis"><div className="build-meta"><span className="mono">{builds[0].number} / {builds[0].category}</span><span className="build-status">CONSENSUS SYSTEM</span></div><div className="build-heading"><h2>{builds[0].name}</h2><p>{builds[0].pitch}</p></div><Spotlight className="build-visual-shell"><AegisVisual /></Spotlight><div className="build-bottom"><div className="build-facts">{builds[0].facts.map(f => <span key={f}>{f}</span>)}</div><div className="build-links"><FillChip id="aegis-repo" /><a href={links.github} target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={14} /></a></div></div></section>
    <section className="build-block build-block--vidyut section-pad" id="vidyutnetra"><div className="build-meta"><span className="mono">{builds[1].number} / {builds[1].category}</span><span className="build-status">INFRASTRUCTURE VISION</span></div><div className="build-heading"><h2>{builds[1].name}</h2><p>{builds[1].pitch}</p></div><Spotlight className="build-visual-shell"><VidyutVisual /></Spotlight><div className="build-bottom"><div className="build-facts">{builds[1].facts.map(f => <span key={f}>{f}</span>)}</div><div className="build-links"><a href={builds[1].repo} target="_blank" rel="noreferrer">Reference site <ExternalLink size={14} /></a></div></div></section>
    <section className="build-block build-block--vanshika section-pad" id="vanshika"><div className="build-meta"><span className="mono">{builds[2].number} / {builds[2].category}</span><span className="build-status">HINGLISH → TIMESTAMP</span></div><div className="build-heading"><h2>{builds[2].name}</h2><p>{builds[2].pitch}</p></div><Spotlight className="build-visual-shell"><VanshikaVisual /></Spotlight><div className="build-bottom"><div className="build-facts">{builds[2].facts.map(f => <span key={f}>{f}</span>)}</div><div className="build-links"><FillChip id="vanshika-repo" /></div></div></section>
    <section className="section-pad arsenal-section"><button className="arsenal-toggle" onClick={() => setArsenalOpen(v => !v)} aria-expanded={arsenalOpen}><span><span className="eyebrow">THE REST OF THE WORK</span><strong>Arsenal <small>— curated, not dumped</small></strong></span><ChevronDown className={arsenalOpen ? 'rotated' : ''} /></button>{arsenalOpen && <div className="arsenal-grid"><div><span className="eyebrow">HACKATHONS</span>{arsenal.hackathons.map(v => <p key={v}>{v}</p>)}</div><div><span className="eyebrow">INTERNSHIPS</span>{arsenal.internships.map(v => <p key={v}>{v}</p>)}</div><div><span className="eyebrow">PROJECTS</span>{arsenal.projects.map(v => <p key={v}>{v}</p>)}</div><div><span className="eyebrow">OPEN SOURCE</span>{arsenal.openSource.map(v => <p key={v}>{v}</p>)}<a href={links.github} target="_blank" rel="noreferrer">See GitHub <ArrowUpRight size={13} /></a></div></div>}</section>
    <section className="section-pad page-end-callout"><p className="eyebrow">BUILD LOG, NOT A PRODUCT CATALOGUE</p><h2>Want the messy<br /><i>details?</i></h2><Link to="/thread" className="button button--line">Read The Thread <ArrowUpRight size={16} /></Link></section>
  </div>;
}
