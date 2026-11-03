import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Zap } from 'lucide-react';
import { formatLocalDate, parseHinglishTime } from '../lib/hinglishParser';

export function AegisVisual() {
  const [disagreement, setDisagreement] = useState(62);
  const [reconverged, setReconverged] = useState(false);
  const consensus = Math.round(Math.max(42, Math.min(96, 94 - disagreement * .58 + (reconverged ? 8 : 0))));
  const agents = [
    { name: 'SCOUT', role: 'observe', vote: disagreement > 70 ? 'HOLD' : 'GO', x: '11%', y: '24%' },
    { name: 'RISK', role: 'challenge', vote: disagreement > 44 ? 'REVIEW' : 'GO', x: '70%', y: '16%' },
    { name: 'CRITIC', role: 'verify', vote: disagreement > 30 ? 'REVIEW' : 'GO', x: '18%', y: '68%' },
    { name: 'COMMANDER', role: 'decide', vote: consensus > 75 ? 'CONSENSUS' : 'WAIT', x: '70%', y: '67%' },
  ];
  return <div className="aegis-visual">
    <div className="visual-topline"><span className="eyebrow">INTERACTIVE SYSTEM MAP</span><span className="mono">4 AGENT COGNITIVE MESH</span></div>
    <div className="aegis-canvas">
      <svg className="aegis-lines" viewBox="0 0 700 360" aria-hidden="true"><path d="M120 105 L350 180 L520 80 M350 180 L130 275 M350 180 L520 265"/><path d="M130 275 Q350 350 520 265" strokeDasharray="4 8" /></svg>
      <div className="aegis-core"><span>SHARED</span><strong>{consensus}%</strong><small>AGREEMENT</small></div>
      {agents.map((agent, index) => <motion.div key={agent.name} className={`agent-node agent-node--${index + 1}`} style={{ left: agent.x, top: agent.y }} animate={{ y: reconverged ? [0, -5, 0] : 0 }} transition={{ duration: .6, delay: index * .07 }}><span className="agent-dot" /><span className="mono">{agent.name}</span><strong>{agent.vote}</strong><small>{agent.role}</small></motion.div>)}
      <div className="aegis-packet">DISAGREEMENT / {disagreement}</div>
    </div>
    <div className="visual-control"><label htmlFor="disagreement">DRAG TO INJECT DISAGREEMENT <strong>{disagreement}%</strong></label><input data-cursor="drag" id="disagreement" type="range" min="0" max="100" value={disagreement} onChange={e => { setDisagreement(Number(e.target.value)); setReconverged(false); }} /><button className="button button--small" onClick={() => { setDisagreement(18); setReconverged(true); }}><Zap size={14} /> Re-run consensus</button></div>
    <p className="micro-note">Conceptual interaction only. The visual demonstrates an agreement state; it does not run the AEGIS-SWARM model or reproduce production agent decisions.</p>
  </div>;
}

export function VidyutVisual() {
  const [scan, setScan] = useState(0);
  return <div className="vidyut-visual">
    <div className="visual-topline"><span className="eyebrow">INSPECTION EXPLAINER</span><span className="mono">GRID / SCAN SIMULATION</span></div>
    <div className="power-scene">
      <svg viewBox="0 0 760 350" role="img" aria-label="Procedural power transmission pylon and wires with illustrative damage detection boxes">
        <defs><linearGradient id="skyFade" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#20201b"/><stop offset="1" stopColor="#111214"/></linearGradient></defs>
        <rect width="760" height="350" fill="url(#skyFade)"/><path d="M0 288 L760 288" stroke="#605e57" strokeOpacity=".5" />
        <g fill="none" stroke="#b9b4a7" strokeWidth="3" strokeLinejoin="round"><path d="M300 320 L370 35 L440 320 M320 235 L420 235 M333 180 L407 180 M345 130 L395 130 M355 85 L385 85 M370 35 L370 18 M300 320 L440 320"/><path d="M320 235 L420 180 L333 180 L407 235 M333 180 L420 130 L345 130 L395 180 M345 130 L395 85 L355 85 L385 130" strokeWidth="1.8"/><path d="M260 100 L480 100 M235 144 L505 144 M215 185 L525 185" strokeWidth="5"/><path d="M260 100 Q120 120 0 135 M480 100 Q610 120 760 135 M235 144 Q100 165 0 178 M505 144 Q640 165 760 178 M215 185 Q100 205 0 224 M525 185 Q660 205 760 224" strokeWidth="1.6"/></g>
        <g fill="#ffb020" stroke="#ffb020" strokeWidth="1.2" opacity=".85"><circle cx="246" cy="170" r="3"/><circle cx="510" cy="102" r="3"/><circle cx="535" cy="214" r="3"/></g>
        {scan > 26 && <g className="damage-box" fill="none" stroke="#ffb020" strokeWidth="2"><rect x="227" y="157" width="42" height="32"/><path d="M227 150 V157 H234 M269 196 V189 H262"/><rect x="492" y="88" width="36" height="28" opacity=".65"/></g>}
        {scan > 68 && <g className="damage-box" fill="none" stroke="#ffb020" strokeWidth="2"><rect x="517" y="198" width="36" height="30"/><path d="M517 191 V198 H524 M553 235 V228 H546"/></g>}
        <path d={`M${Math.max(0, scan * 7.6)} 0 V350`} stroke="#ffb020" strokeWidth="2" strokeOpacity=".7" strokeDasharray="6 7" />
      </svg>
      <div className="scan-tag">SCAN {String(Math.round(scan)).padStart(2, '0')}%</div>
    </div>
    <div className="visual-control"><label htmlFor="scan-slider">REVEAL THE DETECTION LAYER <strong>{scan}%</strong></label><input data-cursor="drag" id="scan-slider" type="range" min="0" max="100" value={scan} onChange={e => setScan(Number(e.target.value))} /></div>
    <div className="recall-strip"><div><strong>99.2%</strong><span>DAMAGE RECALL</span></div><p>Owner-supplied project metric. Boxes above are an illustrative visual, not predictions from the trained model.</p></div>
  </div>;
}

export function VanshikaVisual() {
  const [input, setInput] = useState('2 ghante baad chai');
  const result = useMemo(() => parseHinglishTime(input), [input]);
  const examples = ['2 ghante baad chai', 'kal subah meeting', 'parso raat call'];
  return <div className="vanshika-visual">
    <div className="visual-topline"><span className="eyebrow">RULE-BASED LANGUAGE DEMO</span><span className="mono">NO LLM / CLIENT-SIDE</span></div>
    <label className="parser-label" htmlFor="hinglish-input">SAY IT LIKE YOU WOULD TEXT IT</label>
    <div className="parser-input-row"><input id="hinglish-input" value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 2 ghante baad chai" /><ArrowDownRight size={20} /></div>
    <div className={`parser-output${result.ok ? ' is-valid' : ' is-invalid'}`}><span className="eyebrow">PARSED TIMESTAMP</span><strong>{result.ok ? formatLocalDate(result.date) : 'No reliable parse'}</strong><p>{result.explanation}</p></div>
    <div className="parser-examples"><span className="mono">TRY</span>{examples.map(example => <button key={example} onClick={() => setInput(example)}>{example}</button>)}</div>
    <p className="micro-note">Supported tokens: ghante, minute, kal, parso, baad, subah, shaam, raat. It is a small rule set, not natural-language understanding. It does not resolve dates, calendars, time zones, or arbitrary sentence structures.</p>
  </div>;
}
