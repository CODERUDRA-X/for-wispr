import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { identity, links } from '../content/site';
import { Preloader } from './Preloader';
import { Cursor } from './Cursor';
import { useSmoothScroll } from '../motion/useSmoothScroll';

const navigation = [
  { to: '/', label: 'Home', num: '00' }, { to: '/thread', label: 'The Thread', num: '01' },
  { to: '/builds', label: 'Builds', num: '02' }, { to: '/community', label: 'Community', num: '03' },
  { to: '/campaigns', label: 'Campaigns', num: '04' }, { to: '/voice', label: 'Voice receipts', num: '05' },
  { to: '/ask', label: 'Ask me', num: '06' }, { to: '/contact', label: 'Contact', num: '07' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const longPressTimer = useRef<number | null>(null);
  const logoLongPressed = useRef(false);
  const location = useLocation();
  useSmoothScroll();
  useEffect(() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }, [location.pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <Preloader /><Cursor />
    <header className="site-header">
      <Link to="/" className="brand" aria-label="CODERUDRA-X home; long press to re-seed this page's procedural background" title="Long-press to re-seed the current page background" onPointerDown={() => { logoLongPressed.current = false; longPressTimer.current = window.setTimeout(() => { logoLongPressed.current = true; window.dispatchEvent(new Event('crx-reroll')); }, 650); }} onPointerUp={() => { if (longPressTimer.current !== null) window.clearTimeout(longPressTimer.current); }} onPointerLeave={() => { if (longPressTimer.current !== null) window.clearTimeout(longPressTimer.current); }} onClick={event => { if (logoLongPressed.current) { event.preventDefault(); logoLongPressed.current = false; } }}><span className="brand-mark">C<span>R</span>X</span><span className="brand-divider" /><span className="brand-caption">BUILD. BREAK.<br />REBUILD.</span></Link>
      <div className="header-right"><span className="availability"><i /> OPEN TO INTERNSHIP CONVERSATIONS</span><button className={`menu-toggle${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen} aria-controls="site-menu">{menuOpen ? 'CLOSE' : 'MENU'} <span>{menuOpen ? <X size={17} /> : <span className="menu-lines"><i /><i /></span>}</span></button></div>
    </header>
    <AnimatePresence>
      {menuOpen && <motion.nav id="site-menu" className="menu-overlay" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .55, ease: [.76, 0, .24, 1] }} aria-label="Main navigation">
        <div className="menu-overlay__top"><span className="eyebrow">NAVIGATE THE BUILD LOG</span><span className="mono muted">{identity.location.toUpperCase()}</span></div>
        <div className="menu-grid">{navigation.map((item, index) => <motion.div key={item.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06 + index * .045, duration: .45 }}><NavLink to={item.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `menu-link${isActive ? ' active' : ''}`}><span className="mono menu-link__num">{item.num}</span><span>{item.label}</span><ArrowUpRight size={22} /></NavLink></motion.div>)}</div>
        <div className="menu-overlay__bottom"><span>BUILT IN PRAYAGRAJ. MADE TO TRAVEL.</span><span className="mono">CRX / 2026</span></div>
      </motion.nav>}
    </AnimatePresence>
    <main id="main-content" tabIndex={-1}>{children}</main>
    <nav className="persistent-footer-strip" aria-label="Quick links"><span>CRX / 2026</span><a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a><a href={links.github} target="_blank" rel="noreferrer">GITHUB</a><a href={links.x} target="_blank" rel="noreferrer">X</a><Link to="/contact">CONTACT ↗</Link></nav>
    <footer className="site-footer"><div className="footer-top"><Link to="/" className="footer-wordmark">CRX<span>®</span></Link><p>Built by voice. Edited by hand.<br />Still a work in progress.</p><Link to="/contact" className="footer-mail">CONTACT <ArrowUpRight size={15} /></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {identity.alias}</span><div className="footer-links"><a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a><a href={links.x} target="_blank" rel="noreferrer">X</a><a href={links.github} target="_blank" rel="noreferrer">GITHUB</a><Link to="/contact">CONTACT ↗</Link></div><span className="mono">BUILD. BREAK. REBUILD.</span></div></footer>
  </>;
}
